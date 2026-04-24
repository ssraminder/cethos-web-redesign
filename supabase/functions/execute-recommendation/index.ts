/**
 * execute-recommendation
 *
 * Applies a single approved recommendation. Invoked either:
 *   - by audit-cethos-health directly (auto-execute path for low/medium risk)
 *   - by /api/admin/recommendations/[id]/approve after human click-approve
 *
 * Routes the action by `action_type`:
 *   - ads_mutate     → calls google-integrations (gads mutate)
 *   - gbp_reply      → calls google-integrations (gbp reply_review)
 *   - gbp_update     → calls google-integrations (gbp update_location)
 *   - github_commit  → reads+writes a file via GitHub Contents API, commits to main
 *   - manual         → logs skipped (should never reach here from auto path)
 *
 * Every execution is idempotent at the database level: success flips
 * status='executed'; failure increments failure_count and keeps status
 * 'pending' so it can be retried manually. Rows that hit failure_count >= 5
 * are marked 'failed' to stop further retries.
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";

const GITHUB_TOKEN = Deno.env.get("GITHUB_TOKEN") || "";

const GOOGLE_INTEGRATIONS_URL = `${SUPABASE_URL}/functions/v1/google-integrations`;

const MAX_FAILURES = 5;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function callGoogle(platform: string, action: string, params: Record<string, unknown>) {
  const res = await fetch(GOOGLE_INTEGRATIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ platform, action, params }),
  });
  const text = await res.text();
  let data: any;
  try { data = JSON.parse(text); } catch { data = text; }
  return { ok: res.ok, status: res.status, data };
}

// ---------------------------------------------------------------------------
// Action handlers — each returns { ok, result }
// ---------------------------------------------------------------------------

async function handleAdsMutate(payload: any): Promise<{ ok: boolean; result: unknown }> {
  const res = await callGoogle("gads", "mutate", {
    customer: payload.customer,
    resource: payload.resource,
    operations: payload.operations,
  });
  return { ok: res.ok, result: res.data };
}

async function handleGbpReply(payload: any): Promise<{ ok: boolean; result: unknown }> {
  const res = await callGoogle("gbp", "reply_review", {
    location: payload.location_key,
    review_id: payload.review_id,
    comment: payload.comment,
  });
  return { ok: res.ok, result: res.data };
}

async function handleGbpUpdate(payload: any): Promise<{ ok: boolean; result: unknown }> {
  const res = await callGoogle("gbp", "update_location", {
    location: payload.location_key,
    updateMask: payload.update_mask,
    body: payload.body,
  });
  return { ok: res.ok, result: res.data };
}

/**
 * GitHub Contents API: read the file, make the edit, commit back.
 * Uses the `PUT /repos/{owner}/{repo}/contents/{path}` endpoint which is
 * a single atomic operation (no branch checkout needed).
 *
 * Payload shape:
 *   {
 *     kind: "file_edit",
 *     owner, repo, branch, path,
 *     old_content_snippet: string,  // exact substring that must match
 *     new_content_snippet: string,  // replacement
 *     commit_message: string
 *   }
 * Or for full-file writes:
 *   { kind: "file_write", owner, repo, branch, path, new_content: string, commit_message }
 */
async function handleGithubCommit(payload: any): Promise<{ ok: boolean; result: unknown }> {
  if (!GITHUB_TOKEN) return { ok: false, result: { error: "GITHUB_TOKEN not set" } };

  // For `high_imp_low_ctr` recs the payload comes from the audit with
  // { kind: 'meta_rewrite', page_url, target_query } but no actual diff yet.
  // We defer those until the admin UI's "prepare diff" step writes in the
  // concrete old/new snippets. For now, only `file_edit` and `file_write` run.
  if (payload.kind !== "file_edit" && payload.kind !== "file_write") {
    return { ok: false, result: { error: `github_commit kind '${payload.kind}' not yet supported in executor; prepare diff via admin UI first` } };
  }

  const { owner, repo, branch, path, commit_message } = payload;
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`;

  // Fetch current file to get its SHA + content
  const getRes = await fetch(`${apiBase}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (!getRes.ok) return { ok: false, result: { error: `GET file: ${getRes.status} ${await getRes.text()}` } };
  const current = await getRes.json();
  const currentContent = atob(current.content.replace(/\n/g, ""));

  let newContent: string;
  if (payload.kind === "file_edit") {
    if (!currentContent.includes(payload.old_content_snippet)) {
      return { ok: false, result: { error: "old_content_snippet not found in current file — contents may have drifted" } };
    }
    newContent = currentContent.replace(payload.old_content_snippet, payload.new_content_snippet);
  } else {
    newContent = payload.new_content;
  }

  const putRes = await fetch(apiBase, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `${commit_message}\n\nAuto-generated by cethos audit bot.\n\nCo-authored-by: Cethos Audit Bot <noreply@cethos.com>`,
      content: btoa(newContent),
      sha: current.sha,
      branch,
    }),
  });
  const putText = await putRes.text();
  let putData: any;
  try { putData = JSON.parse(putText); } catch { putData = putText; }
  return { ok: putRes.ok, result: putData };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const body = await req.json().catch(() => ({}));
  const recId: string | undefined = body.id;
  const invoker: string = body.invoked_by || "unknown";

  if (!recId) {
    return new Response(JSON.stringify({ error: "missing id" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Load the rec
  const { data: rec, error: fetchErr } = await supabase
    .from("recommendations")
    .select("*")
    .eq("id", recId)
    .single();

  if (fetchErr || !rec) {
    return new Response(JSON.stringify({ error: "recommendation not found" }), {
      status: 404,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Idempotency
  if (rec.status === "executed" || rec.status === "auto_executed") {
    return new Response(JSON.stringify({ already_executed: true, rec_id: recId }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (rec.status !== "pending" && rec.status !== "approved") {
    return new Response(JSON.stringify({ error: `not executable from status '${rec.status}'` }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Route by action type
  let result: { ok: boolean; result: unknown };
  switch (rec.action_type) {
    case "ads_mutate":
      result = await handleAdsMutate(rec.action_payload);
      break;
    case "gbp_reply":
      result = await handleGbpReply(rec.action_payload);
      break;
    case "gbp_update":
      result = await handleGbpUpdate(rec.action_payload);
      break;
    case "github_commit":
      result = await handleGithubCommit(rec.action_payload);
      break;
    case "manual":
      result = { ok: false, result: { error: "manual action — cannot auto-execute" } };
      break;
    default:
      result = { ok: false, result: { error: `unknown action_type ${rec.action_type}` } };
  }

  const now = new Date().toISOString();
  if (result.ok) {
    const finalStatus = invoker === "auto-executor" ? "auto_executed" : "executed";
    await supabase
      .from("recommendations")
      .update({
        status: finalStatus,
        executed_at: now,
        execution_result: result.result as object,
      })
      .eq("id", recId);
  } else {
    const newFailureCount = (rec.failure_count || 0) + 1;
    await supabase
      .from("recommendations")
      .update({
        failure_count: newFailureCount,
        execution_result: result.result as object,
        status: newFailureCount >= MAX_FAILURES ? "failed" : rec.status,
      })
      .eq("id", recId);
  }

  return new Response(JSON.stringify({
    rec_id: recId,
    ok: result.ok,
    result: result.result,
  }), {
    status: result.ok ? 200 : 500,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
