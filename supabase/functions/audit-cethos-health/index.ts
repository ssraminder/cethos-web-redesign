/**
 * audit-cethos-health
 *
 * Weekly (Mondays 8am UTC) comprehensive health audit for cethos.com. Also
 * runs daily in "alerts only" mode to catch urgent regressions.
 *
 * Flow:
 *   1. Create an audit_runs row
 *   2. Run each check deterministically; every hit creates/upserts a
 *      recommendation row via the `upsert_recommendation` RPC
 *   3. AI writes the per-recommendation narrative (title/summary/impact)
 *   4. Low-risk recs auto-execute inline by calling execute-recommendation
 *   5. AI writes the executive summary
 *   6. Brevo sends the digest email to configured recipients
 *
 * The gathering code talks to the google-integrations edge function (same
 * project) rather than calling Google APIs directly, so credential caching
 * and retry stay in one place.
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";
import { writeRecommendationNarrative, writeExecutiveSummary, draftReviewReply } from "../_shared/ai-narrative.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") || "";
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") || "";

const GOOGLE_INTEGRATIONS_URL = `${SUPABASE_URL}/functions/v1/google-integrations`;
const EXECUTE_RECOMMENDATION_URL = `${SUPABASE_URL}/functions/v1/execute-recommendation`;

const ADMIN_RECOMMENDATIONS_URL = "https://cethos.com/admin/ai-recommendations";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function callGoogle(platform: string, action: string, params: Record<string, unknown> = {}): Promise<any> {
  const res = await fetch(GOOGLE_INTEGRATIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ platform, action, params }),
  });
  const text = await res.text();
  try {
    return { status: res.status, data: JSON.parse(text) };
  } catch {
    return { status: res.status, data: text };
  }
}

interface AuditSettings {
  enabled: boolean;
  auto_execute_low_risk: boolean;
  auto_execute_medium_risk: boolean;
  digest_recipients: string[];
  alert_cpa_spike_multiplier: number;
  alert_indexing_drop_pct: number;
  alert_conversion_drought_h: number;
  github_owner: string;
  github_repo: string;
  github_branch: string;
  claude_narrative_model: string;
  claude_summary_model: string;
}

async function loadSettings(supabase: any): Promise<AuditSettings> {
  const { data } = await supabase.from("ai_audit_settings").select("key, value");
  const map: Record<string, any> = {};
  for (const row of data || []) map[row.key] = row.value;
  return {
    enabled: map.enabled ?? true,
    auto_execute_low_risk: map.auto_execute_low_risk ?? true,
    auto_execute_medium_risk: map.auto_execute_medium_risk ?? false,
    digest_recipients: map.digest_recipients ?? ["raminder@cethos.com"],
    alert_cpa_spike_multiplier: map.alert_cpa_spike_multiplier ?? 1.5,
    alert_indexing_drop_pct: map.alert_indexing_drop_pct ?? 10,
    alert_conversion_drought_h: map.alert_conversion_drought_h ?? 72,
    github_owner: map.github_owner ?? "ssraminder",
    github_repo: map.github_repo ?? "cethos-web-redesign",
    github_branch: map.github_branch ?? "main",
    claude_narrative_model: map.claude_narrative_model ?? "claude-haiku-4-5-20251001",
    claude_summary_model: map.claude_summary_model ?? "claude-sonnet-4-6",
  };
}

interface CreatedRec {
  id: string;
  title: string;
  category: string;
  severity: string;
  risk_tier: string;
  expected_impact: string;
  auto_executed: boolean;
}

async function createRecommendation(
  supabase: any,
  audit_run_id: string,
  args: {
    check_id: string;
    category: string;
    risk_tier: "low" | "medium" | "high";
    severity: "critical" | "high" | "medium" | "low";
    action_type: string;
    action_payload: Record<string, unknown>;
    action_description: string;
    evidence: Record<string, unknown>;
    dedupe_key?: string | null;
    model?: string;
  },
): Promise<CreatedRec | null> {
  let narrative;
  try {
    narrative = await writeRecommendationNarrative({
      check_id: args.check_id,
      category: args.category,
      severity: args.severity,
      evidence: args.evidence,
      action_description: args.action_description,
      model: args.model,
    });
  } catch (err) {
    // Fall back to a minimal deterministic narrative if AI call fails — we'd
    // rather persist a rec than lose it because of an AI hiccup.
    console.error("AI narrative failed, using fallback:", err);
    narrative = {
      title: `[${args.check_id}] ${args.severity.toUpperCase()}`,
      summary_md: `Automated check \`${args.check_id}\` fired. See evidence for details.`,
      expected_impact: "",
    };
  }

  const { data, error } = await supabase.rpc("upsert_recommendation", {
    p_audit_run_id: audit_run_id,
    p_check_id: args.check_id,
    p_category: args.category,
    p_risk_tier: args.risk_tier,
    p_severity: args.severity,
    p_title: narrative.title,
    p_summary_md: narrative.summary_md,
    p_expected_impact: narrative.expected_impact,
    p_evidence: args.evidence,
    p_action_type: args.action_type,
    p_action_payload: args.action_payload,
    p_dedupe_key: args.dedupe_key ?? null,
  });

  if (error) {
    console.error("upsert_recommendation failed:", error);
    return null;
  }

  return {
    id: data,
    title: narrative.title,
    category: args.category,
    severity: args.severity,
    risk_tier: args.risk_tier,
    expected_impact: narrative.expected_impact,
    auto_executed: false,
  };
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

/**
 * CHECK 1: Wasted-spend keywords.
 * Google Ads keyword that spent >$30 with 0 conversions in last 30 days.
 * Action: pause the keyword. Risk tier: low (reversible, small blast).
 */
async function checkWastedSpendKeywords(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];
  const res = await callGoogle("gads", "query", {
    customer: "cethos_solutions",
    query: `
      SELECT campaign.id, campaign.name, ad_group.id, ad_group.name,
             ad_group_criterion.criterion_id, ad_group_criterion.keyword.text,
             ad_group_criterion.keyword.match_type,
             metrics.cost_micros, metrics.conversions, metrics.clicks
      FROM keyword_view
      WHERE campaign.status = 'ENABLED'
        AND ad_group_criterion.status = 'ENABLED'
        AND segments.date DURING LAST_30_DAYS
    `,
  });
  if (!Array.isArray(res.data)) return recs;

  for (const batch of res.data) {
    for (const row of batch.results || []) {
      const cost = Number(row.metrics?.costMicros || 0) / 1e6;
      const conv = Number(row.metrics?.conversions || 0);
      if (cost <= 30 || conv > 0) continue;

      const kw = row.adGroupCriterion?.keyword?.text || "";
      const cid = row.adGroupCriterion?.criterionId;
      const agId = row.adGroup?.id;
      const campName = row.campaign?.name || "";

      const rec = await createRecommendation(supabase, audit_run_id, {
        check_id: "wasted_spend_keyword",
        category: "ads_keyword",
        risk_tier: "low",
        severity: cost > 100 ? "high" : "medium",
        evidence: {
          campaign_name: campName,
          ad_group_name: row.adGroup?.name,
          keyword: kw,
          match_type: row.adGroupCriterion?.keyword?.matchType,
          last_30d_cost_cad: cost.toFixed(2),
          last_30d_clicks: Number(row.metrics?.clicks || 0),
          last_30d_conversions: conv,
        },
        action_description: `Pause keyword "${kw}" (${row.adGroupCriterion?.keyword?.matchType}) in ad group "${row.adGroup?.name}" — spent $${cost.toFixed(2)} with 0 conversions in the last 30 days.`,
        action_type: "ads_mutate",
        action_payload: {
          resource: "adGroupCriteria",
          customer: "cethos_solutions",
          operations: [{
            update: { resourceName: `customers/6316159162/adGroupCriteria/${agId}~${cid}`, status: "PAUSED" },
            updateMask: "status",
          }],
        },
        dedupe_key: `wasted_spend_keyword:${cid}`,
        model: settings.claude_narrative_model,
      });
      if (rec) recs.push(rec);
    }
  }
  return recs;
}

/**
 * CHECK 2: High impressions, low CTR at good position.
 * GSC query with >100 impressions at pos < 3 with CTR < 5% suggests the SERP
 * snippet (title/description) is failing to earn clicks despite ranking well.
 * Action: generate a meta rewrite PR. Risk tier: medium (affects ranking).
 */
async function checkHighImpLowCtr(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];
  const end = new Date();
  const start = new Date(Date.now() - 30 * 86400_000);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const res = await callGoogle("gsc", "search_analytics", {
    start_date: fmt(start),
    end_date: fmt(end),
    dimensions: ["query", "page"],
    row_limit: 200,
  });
  if (!res.data?.rows) return recs;

  for (const row of res.data.rows) {
    const [query, page] = row.keys;
    const imp = row.impressions;
    const ctr = row.ctr;
    const pos = row.position;
    if (imp < 100) continue;
    if (pos >= 3) continue;
    if (ctr >= 0.05) continue;

    const rec = await createRecommendation(supabase, audit_run_id, {
      check_id: "high_imp_low_ctr",
      category: "seo_meta",
      risk_tier: "medium",
      severity: imp > 500 ? "high" : "medium",
      evidence: {
        query,
        page,
        impressions_30d: imp,
        clicks_30d: row.clicks,
        ctr_pct: (ctr * 100).toFixed(2),
        avg_position: pos.toFixed(1),
      },
      action_description: `Rewrite <title> and <meta description> on ${page} to improve the SERP snippet for "${query}" (currently ranking pos ${pos.toFixed(1)} with ${(ctr * 100).toFixed(2)}% CTR across ${imp} impressions).`,
      action_type: "github_commit",
      action_payload: {
        kind: "meta_rewrite",
        page_url: page,
        target_query: query,
        // Actual file edit computed at execution time by execute-recommendation
        // since path resolution needs the Next.js app router conventions.
      },
      dedupe_key: `high_imp_low_ctr:${query}:${page}`,
      model: settings.claude_narrative_model,
    });
    if (rec) recs.push(rec);
  }
  return recs;
}

/**
 * CHECK 3: Unreplied GBP reviews older than 48h.
 * Action: post a reply drafted by Claude. Risk tier: low if 4+ star, medium otherwise.
 */
async function checkUnrepliedReviews(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];
  const locations = ["apostille", "translation", "interpretation"]; // cethos-owned only
  const cutoff = Date.now() - 48 * 3600_000;

  for (const loc of locations) {
    const res = await callGoogle("gbp", "get_reviews", { location: loc, pageSize: 50 });
    const reviews = res.data?.reviews || [];
    for (const r of reviews) {
      if (r.reviewReply) continue;
      const updatedAt = new Date(r.updateTime).getTime();
      if (updatedAt > cutoff) continue; // younger than 48h, give a grace period

      const stars = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }[r.starRating as string] || 0;
      const reviewer = r.reviewer?.displayName || "Customer";
      const comment = r.comment || "(no comment)";

      let replyText = "";
      try {
        replyText = await draftReviewReply({
          review_comment: comment,
          star_rating: stars,
          reviewer_name: reviewer,
          location_name: loc,
          model: settings.claude_narrative_model,
        });
      } catch (err) {
        console.error("draftReviewReply failed:", err);
        continue; // skip this one rather than post a bad reply
      }

      const rec = await createRecommendation(supabase, audit_run_id, {
        check_id: "unreplied_review_48h",
        category: "gbp_reply",
        risk_tier: stars >= 4 ? "low" : "medium",
        severity: stars <= 3 ? "high" : "medium",
        evidence: {
          location: loc,
          reviewer,
          star_rating: stars,
          review_comment: comment.substring(0, 500),
          review_id: r.reviewId,
          updated_time: r.updateTime,
          drafted_reply: replyText,
        },
        action_description: `Post this reply to ${reviewer}'s ${stars}-star review at ${loc} (unreplied for >48h):\n\n"${replyText}"`,
        action_type: "gbp_reply",
        action_payload: {
          location_key: loc,
          review_id: r.reviewId,
          comment: replyText,
        },
        dedupe_key: `unreplied_review:${r.reviewId}`,
        model: settings.claude_narrative_model,
      });
      if (rec) recs.push(rec);
    }
  }
  return recs;
}

// ---------------------------------------------------------------------------
// Auto-execute low-risk recs inline
// ---------------------------------------------------------------------------

async function autoExecute(rec: CreatedRec): Promise<boolean> {
  try {
    const res = await fetch(EXECUTE_RECOMMENDATION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ id: rec.id, invoked_by: "auto-executor" }),
    });
    return res.ok;
  } catch (err) {
    console.error("autoExecute failed:", err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Digest email via Brevo
// ---------------------------------------------------------------------------

async function sendDigest(
  recipients: string[],
  execSummary: string,
  recs: CreatedRec[],
  auditRunId: string,
  autoExecutedCount: number,
): Promise<void> {
  if (!BREVO_API_KEY || recipients.length === 0) return;

  const pending = recs.filter((r) => !r.auto_executed);
  const autoDone = recs.filter((r) => r.auto_executed);

  const subject = pending.length > 0
    ? `Cethos audit — ${pending.length} action${pending.length === 1 ? "" : "s"} need review`
    : `Cethos audit — ${autoExecutedCount} low-risk fixes applied`;

  const html = `
<div style="font-family: -apple-system, Segoe UI, sans-serif; max-width: 680px; margin: 0 auto; padding: 24px; color: #0C2340;">
  <h1 style="font-size: 20px; margin: 0 0 16px;">Cethos.com weekly audit</h1>
  <p style="font-size: 14px; line-height: 1.6; color: #4B5563;">${escapeHtml(execSummary)}</p>

  ${autoDone.length > 0 ? `
  <h2 style="font-size: 16px; margin: 28px 0 12px; color: #059669;">✓ Auto-applied (${autoDone.length})</h2>
  <ul style="font-size: 13px; padding-left: 20px; color: #4B5563;">
    ${autoDone.map((r) => `<li style="margin-bottom: 6px;"><strong>${escapeHtml(r.title)}</strong><br><span style="color: #6B7280;">${escapeHtml(r.expected_impact)}</span></li>`).join("")}
  </ul>` : ""}

  ${pending.length > 0 ? `
  <h2 style="font-size: 16px; margin: 28px 0 12px; color: #DC2626;">⚠ Needs review (${pending.length})</h2>
  <ul style="font-size: 13px; padding-left: 20px; color: #4B5563;">
    ${pending.slice(0, 10).map((r) => `<li style="margin-bottom: 8px;"><strong>${escapeHtml(r.title)}</strong><br><span style="color: #6B7280;">[${r.severity}] ${escapeHtml(r.expected_impact)}</span></li>`).join("")}
  </ul>
  ${pending.length > 10 ? `<p style="font-size: 13px; color: #6B7280;">…and ${pending.length - 10} more.</p>` : ""}

  <div style="margin: 28px 0;">
    <a href="${ADMIN_RECOMMENDATIONS_URL}?run=${auditRunId}" style="background: #0891B2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-size: 14px;">Review &amp; approve →</a>
  </div>` : ""}

  <hr style="border: none; border-top: 1px solid #E5E7EB; margin: 32px 0 16px;">
  <p style="font-size: 11px; color: #9CA3AF;">Audit run ID: ${auditRunId}</p>
</div>`;

  await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { email: "noreply@cethos.com", name: "Cethos Audit Bot" },
      to: recipients.map((email) => ({ email })),
      subject,
      htmlContent: html,
    }),
  });
}

function escapeHtml(s: string): string {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
  const trigger = body.trigger || "manual";
  const checksOnly = body.checks_only || "all";

  const settings = await loadSettings(supabase);
  if (!settings.enabled) {
    return new Response(JSON.stringify({ skipped: true, reason: "kill_switch_on" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Create audit run
  const { data: runRow, error: runErr } = await supabase
    .from("audit_runs")
    .insert({ trigger, status: "running", metadata: { checks_only: checksOnly } })
    .select("id")
    .single();
  if (runErr) {
    return new Response(JSON.stringify({ error: runErr.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const runId = runRow.id;

  // Run checks
  const allRecs: CreatedRec[] = [];
  const failures: string[] = [];
  let checksRun = 0;

  const allChecks = [
    { name: "wasted_spend_keywords", fn: checkWastedSpendKeywords },
    { name: "high_imp_low_ctr", fn: checkHighImpLowCtr },
    { name: "unreplied_reviews", fn: checkUnrepliedReviews },
  ];

  for (const check of allChecks) {
    checksRun++;
    try {
      const recs = await check.fn(supabase, runId, settings);
      allRecs.push(...recs);
    } catch (err) {
      failures.push(`${check.name}: ${(err as Error).message}`);
      console.error(`Check ${check.name} failed:`, err);
    }
  }

  // Auto-execute low-risk (and medium if enabled)
  let autoExecutedCount = 0;
  for (const rec of allRecs) {
    const shouldAuto = (rec.risk_tier === "low" && settings.auto_execute_low_risk) ||
                       (rec.risk_tier === "medium" && settings.auto_execute_medium_risk);
    if (!shouldAuto) continue;
    const ok = await autoExecute(rec);
    if (ok) {
      rec.auto_executed = true;
      autoExecutedCount++;
    }
  }

  // Executive summary + digest
  let execSummary = "";
  try {
    execSummary = await writeExecutiveSummary({
      recommendations: allRecs,
      period_label: new Date().toISOString().slice(0, 10),
      model: settings.claude_summary_model,
    });
  } catch (err) {
    execSummary = `${allRecs.length} recommendations generated, ${autoExecutedCount} auto-executed.`;
    console.error("exec summary failed:", err);
  }

  if (allRecs.length > 0) {
    await sendDigest(settings.digest_recipients, execSummary, allRecs, runId, autoExecutedCount);
  }

  // Finalize audit_runs row
  await supabase
    .from("audit_runs")
    .update({
      completed_at: new Date().toISOString(),
      status: failures.length === 0 ? "completed" : "partial",
      checks_run: checksRun,
      checks_passed: checksRun - failures.length,
      checks_failed: failures.length,
      recommendations_created: allRecs.length,
      auto_executed_count: autoExecutedCount,
      executive_summary_md: execSummary,
      error_message: failures.length ? failures.join("; ") : null,
    })
    .eq("id", runId);

  return new Response(JSON.stringify({
    audit_run_id: runId,
    recommendations: allRecs.length,
    auto_executed: autoExecutedCount,
    pending: allRecs.length - autoExecutedCount,
    failures,
  }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
