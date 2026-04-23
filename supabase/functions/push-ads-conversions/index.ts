/**
 * push-ads-conversions
 *
 * Drains the `ads_offline_conversions` queue (rows inserted by the DB trigger
 * on orders.paid_at) and uploads them to Google Ads via
 * ConversionUploadService.UploadClickConversions.
 *
 * Invoked every 15 minutes by pg_cron (see migration 006_schedule_oci_push.sql)
 * or on-demand via POST. Safe to re-run — rows are marked `uploaded` atomically
 * and skipped on subsequent calls.
 *
 * Shares the same OAuth refresh-token flow as the main `google-integrations`
 * edge function so credentials stay in one place.
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID") || "";
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET") || "";
const GOOGLE_REFRESH_TOKEN = Deno.env.get("GOOGLE_REFRESH_TOKEN") || "";
const GADS_DEVELOPER_TOKEN = Deno.env.get("GADS_DEVELOPER_TOKEN") || "";
const GADS_API_VERSION = Deno.env.get("GADS_API_VERSION") || "v23";
const GADS_LOGIN_CUSTOMER_ID = Deno.env.get("GADS_LOGIN_CUSTOMER_ID") || "";

const MAX_BATCH_SIZE = 100;
const MAX_ATTEMPTS = 5;

let cachedToken: { access_token: string; expires_at: number } | null = null;
async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expires_at - 60000) return cachedToken.access_token;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Token refresh failed (${res.status}): ${await res.text()}`);
  const data = await res.json();
  cachedToken = { access_token: data.access_token, expires_at: Date.now() + (data.expires_in || 3600) * 1000 };
  return cachedToken.access_token;
}

interface QueueRow {
  id: string;
  order_id: string | null;
  gclid: string | null;
  gbraid: string | null;
  wbraid: string | null;
  customer_id: string;
  conversion_action: string;
  conversion_date_time: string;
  conversion_value: number;
  currency_code: string;
  order_id_for_upload: string | null;
  attempts: number;
}

function toAdsDateTime(iso: string): string {
  // Google Ads wants "YYYY-MM-DD HH:MM:SS+TZ" with a space separator and a
  // numeric offset. Convert Postgres ISO (e.g. 2026-04-22T18:04:00+00:00) to
  // that format.
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  const mm = pad(d.getUTCMonth() + 1);
  const dd = pad(d.getUTCDate());
  const hh = pad(d.getUTCHours());
  const mi = pad(d.getUTCMinutes());
  const ss = pad(d.getUTCSeconds());
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}+00:00`;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // Fetch pending rows, skip ones that have failed too many times
  const { data: rows, error: fetchError } = await supabase
    .from("ads_offline_conversions")
    .select("id, order_id, gclid, gbraid, wbraid, customer_id, conversion_action, conversion_date_time, conversion_value, currency_code, order_id_for_upload, attempts")
    .eq("status", "pending")
    .lt("attempts", MAX_ATTEMPTS)
    .order("created_at", { ascending: true })
    .limit(MAX_BATCH_SIZE);

  if (fetchError) {
    return new Response(JSON.stringify({ error: fetchError.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  if (!rows || rows.length === 0) {
    return new Response(JSON.stringify({ processed: 0, message: "nothing pending" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // Group by customer_id (one API call per customer)
  const byCustomer = new Map<string, QueueRow[]>();
  for (const r of rows as QueueRow[]) {
    if (!byCustomer.has(r.customer_id)) byCustomer.set(r.customer_id, []);
    byCustomer.get(r.customer_id)!.push(r);
  }

  let token: string;
  try {
    token = await getAccessToken();
  } catch (err) {
    return new Response(JSON.stringify({ error: `token: ${(err as Error).message}` }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const summary = { processed: 0, uploaded: 0, failed: 0, partial_failures: 0 };

  for (const [customerId, customerRows] of byCustomer.entries()) {
    const conversions = customerRows.map((r) => {
      const c: Record<string, unknown> = {
        conversionAction: r.conversion_action,
        conversionDateTime: toAdsDateTime(r.conversion_date_time),
        conversionValue: Number(r.conversion_value),
        currencyCode: r.currency_code,
      };
      if (r.gclid) c.gclid = r.gclid;
      if (r.gbraid) c.gbraid = r.gbraid;
      if (r.wbraid) c.wbraid = r.wbraid;
      if (r.order_id_for_upload) c.orderId = r.order_id_for_upload.substring(0, 32);
      return c;
    });

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "developer-token": GADS_DEVELOPER_TOKEN,
    };
    if (GADS_LOGIN_CUSTOMER_ID) headers["login-customer-id"] = GADS_LOGIN_CUSTOMER_ID;

    const res = await fetch(
      `https://googleads.googleapis.com/${GADS_API_VERSION}/customers/${customerId}:uploadClickConversions`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          conversions,
          partialFailure: true,
          validateOnly: false,
        }),
      },
    );

    const text = await res.text();
    let body: any;
    try { body = JSON.parse(text); } catch { body = text; }

    const now = new Date().toISOString();

    // Top-level failure: mark all rows in this batch as failed, increment attempts
    if (!res.ok) {
      const msg = typeof body === "string" ? body : JSON.stringify(body).substring(0, 500);
      await supabase
        .from("ads_offline_conversions")
        .update({ attempts: customerRows[0].attempts + 1, last_attempt_at: now, error_message: `HTTP ${res.status}: ${msg}`, status: customerRows[0].attempts + 1 >= MAX_ATTEMPTS ? "failed" : "pending" })
        .in("id", customerRows.map((r) => r.id));
      summary.failed += customerRows.length;
      summary.processed += customerRows.length;
      continue;
    }

    // Partial failures: Google returns per-row errors inside partialFailureError
    const partialFailure = body?.partialFailureError;
    const errorsByIndex = new Map<number, string>();
    if (partialFailure?.details) {
      for (const detail of partialFailure.details) {
        for (const e of detail.errors || []) {
          const idx = e.location?.fieldPathElements?.find((f: any) => f.fieldName === "conversions")?.index ?? -1;
          if (idx >= 0) {
            errorsByIndex.set(idx, `${e.errorCode?.conversionUploadError || e.errorCode?.fieldError || "unknown"}: ${e.message}`);
          }
        }
      }
    }

    // Update rows: success or per-row failure
    for (let i = 0; i < customerRows.length; i++) {
      const row = customerRows[i];
      const err = errorsByIndex.get(i);
      if (err) {
        summary.failed += 1;
        summary.partial_failures += 1;
        await supabase
          .from("ads_offline_conversions")
          .update({
            attempts: row.attempts + 1,
            last_attempt_at: now,
            error_message: err,
            status: row.attempts + 1 >= MAX_ATTEMPTS ? "failed" : "pending",
          })
          .eq("id", row.id);
      } else {
        summary.uploaded += 1;
        await supabase
          .from("ads_offline_conversions")
          .update({
            status: "uploaded",
            uploaded_at: now,
            last_attempt_at: now,
            attempts: row.attempts + 1,
            error_message: null,
          })
          .eq("id", row.id);
      }
      summary.processed += 1;
    }
  }

  return new Response(JSON.stringify(summary), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
