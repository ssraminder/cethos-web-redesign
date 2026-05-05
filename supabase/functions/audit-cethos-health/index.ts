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

// Campaigns whose final URLs point to a different brand. This audit is
// scoped to cethos.com only — anything explicitly outside that scope is
// excluded from Ads-level checks.
const EXCLUDED_CAMPAIGN_NAME_PATTERNS = [
  'Calgary Oaths',  // calgaryoaths.com — separate brand in the same Ads customer
] as const

const CAMPAIGN_SCOPE_SQL = EXCLUDED_CAMPAIGN_NAME_PATTERNS
  .map((p) => `AND campaign.name NOT LIKE '%${p}%'`)
  .join(" ")

async function callGoogle(platform: string, action: string, params: Record<string, unknown> = {}): Promise<any> {
  // Use service-role for inter-function calls — anon JWT verification has been
  // intermittently failing with 401 in this project's edge runtime.
  const bearer = SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;
  const res = await fetch(GOOGLE_INTEGRATIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer}`,
      apikey: bearer,
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
        ${CAMPAIGN_SCOPE_SQL}
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
          current_state: {
            status: "ENABLED",
            cost_30d: `$${cost.toFixed(2)} CAD`,
            conversions_30d: conv,
          },
          expected_after: {
            status: "PAUSED",
            cost_savings_30d: `$${cost.toFixed(2)} CAD`,
            risk: "Zero conversion impact (already at 0 conv)",
          },
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
        current_state: {
          ctr: `${(ctr * 100).toFixed(2)}%`,
          clicks_30d: row.clicks,
          impressions_30d: imp,
          avg_position: pos.toFixed(1),
        },
        expected_after: {
          ctr_target: `≥ 5.0% (industry baseline at pos ${pos.toFixed(1)})`,
          incremental_clicks_30d: Math.round(imp * (0.05 - ctr)),
          confidence: "Medium — depends on rewrite quality",
        },
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

/**
 * CHECK 4: Conversion drought.
 * No primary conversion events in the last N hours (default 72). Points to a
 * tracking break or dead landing pages. Alert-only — not auto-fixable.
 */
async function checkConversionDrought(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];
  const hoursBack = settings.alert_conversion_drought_h;
  const startDate = new Date(Date.now() - hoursBack * 3600_000).toISOString().slice(0, 10);
  const endDate = new Date().toISOString().slice(0, 10);

  const res = await callGoogle("ga", "run_report", {
    start_date: startDate,
    end_date: endDate,
    dimensions: ["eventName"],
    metrics: ["eventCount"],
    limit: 50,
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
  });

  if (!res.data?.rows) return recs;

  const events: Record<string, number> = {};
  for (const row of res.data.rows) {
    events[row.dimensionValues[0].value] = Number(row.metricValues[0].value);
  }

  // Events that map 1:1 to a real GA4 event *name*. `generate_lead` is a
  // dataLayer push name, not a GA4 event name, so we don't look for it here
  // (GTM renames it to `quote_lead` before it reaches GA4 on this site).
  const primaryEvents = ["purchase", "quote_lead"];
  const missing = primaryEvents.filter((e) => !events[e] || events[e] === 0);
  if (missing.length === 0) return recs;

  const rec = await createRecommendation(supabase, audit_run_id, {
    check_id: "conversion_drought",
    category: "ads_keyword", // using ads_keyword since there's no "alert" category
    risk_tier: "high", // alerts should not auto-execute
    severity: "critical",
    evidence: {
      hours_checked: hoursBack,
      missing_events: missing,
      all_event_counts_last_period: events,
    },
    action_description: `No ${missing.join(", ")} events received in the last ${hoursBack}h. Likely a tracking break — verify dataLayer pushes, GTM container publish, and landing-page consent gating.`,
    action_type: "manual",
    action_payload: { reason: "tracking investigation required" },
    dedupe_key: `conversion_drought:${missing.join(",")}`,
    model: settings.claude_narrative_model,
  });
  if (rec) recs.push(rec);
  return recs;
}

/**
 * CHECK 5: CPA spike (7d vs 30d).
 * If a campaign's 7-day CPA exceeds 30-day CPA by a configured multiplier,
 * alert. Could be bid-strategy misbehavior, landing-page issue, or seasonal.
 * Alert-only — diagnosis needed before any auto-fix.
 */
async function checkCpaSpike(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];

  const q = async (dateRange: string) => {
    const res = await callGoogle("gads", "query", {
      customer: "cethos_solutions",
      query: `
        SELECT campaign.id, campaign.name,
               metrics.cost_micros, metrics.conversions
        FROM campaign
        WHERE campaign.status = 'ENABLED'
          AND segments.date DURING ${dateRange}
          ${CAMPAIGN_SCOPE_SQL}
      `,
    });
    const totals: Record<string, { name: string; cost: number; conv: number }> = {};
    if (Array.isArray(res.data)) {
      for (const batch of res.data) {
        for (const row of batch.results || []) {
          const id = String(row.campaign.id);
          totals[id] = totals[id] || { name: row.campaign.name, cost: 0, conv: 0 };
          totals[id].cost += Number(row.metrics?.costMicros || 0) / 1e6;
          totals[id].conv += Number(row.metrics?.conversions || 0);
        }
      }
    }
    return totals;
  };

  const last7 = await q("LAST_7_DAYS");
  const last30 = await q("LAST_30_DAYS");
  const multiplier = settings.alert_cpa_spike_multiplier;

  for (const [id, seven] of Object.entries(last7)) {
    const thirty = last30[id];
    if (!thirty) continue;
    if (seven.conv < 3 || thirty.conv < 10) continue; // not enough signal

    const cpa7 = seven.cost / seven.conv;
    const cpa30 = thirty.cost / thirty.conv;
    if (cpa7 <= cpa30 * multiplier) continue;

    const rec = await createRecommendation(supabase, audit_run_id, {
      check_id: "cpa_spike_7d_vs_30d",
      category: "ads_bid",
      risk_tier: "high",
      severity: "high",
      evidence: {
        campaign_id: id,
        campaign_name: seven.name,
        cpa_7d_cad: cpa7.toFixed(2),
        cpa_30d_cad: cpa30.toFixed(2),
        multiplier: (cpa7 / cpa30).toFixed(2),
        cost_7d: seven.cost.toFixed(2),
        conv_7d: seven.conv.toFixed(1),
      },
      action_description: `Investigate "${seven.name}" — 7-day CPA $${cpa7.toFixed(2)} is ${(cpa7 / cpa30).toFixed(1)}× the 30-day CPA $${cpa30.toFixed(2)}. Look for recent landing-page changes, bid-strategy drift, or competitor pressure via auction insights.`,
      action_type: "manual",
      action_payload: { reason: "needs human diagnosis" },
      dedupe_key: `cpa_spike:${id}`,
      model: settings.claude_narrative_model,
    });
    if (rec) recs.push(rec);
  }
  return recs;
}

/**
 * CHECK 6: Search term missing as negative.
 * Search term that spent >$20 with zero conversions in 30d. Adding it as an
 * exact negative stops further waste. Low risk since negatives are easily
 * removed if they turn out to be too broad.
 */
async function checkSearchTermNegatives(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];

  const res = await callGoogle("gads", "query", {
    customer: "cethos_solutions",
    query: `
      SELECT campaign.id, campaign.name,
             search_term_view.search_term, search_term_view.status,
             metrics.cost_micros, metrics.clicks, metrics.conversions
      FROM search_term_view
      WHERE campaign.status = 'ENABLED'
        AND segments.date DURING LAST_30_DAYS
        ${CAMPAIGN_SCOPE_SQL}
      LIMIT 500
    `,
  });

  if (!Array.isArray(res.data)) return recs;

  for (const batch of res.data) {
    for (const row of batch.results || []) {
      const cost = Number(row.metrics?.costMicros || 0) / 1e6;
      const conv = Number(row.metrics?.conversions || 0);
      if (cost < 20 || conv > 0) continue;

      const term = row.searchTermView?.searchTerm || "";
      const status = row.searchTermView?.status || "";
      // NONE = search term that matched but isn't itself a keyword. EXCLUDED = already negative.
      if (status !== "NONE") continue;
      // Avoid branded terms
      if (/\bcethos\b/i.test(term)) continue;

      const campId = row.campaign.id;
      const campName = row.campaign.name;

      const rec = await createRecommendation(supabase, audit_run_id, {
        check_id: "search_term_missing_negative",
        category: "ads_negative",
        risk_tier: "low",
        severity: cost > 50 ? "high" : "medium",
        evidence: {
          campaign_name: campName,
          search_term: term,
          last_30d_cost_cad: cost.toFixed(2),
          last_30d_clicks: Number(row.metrics?.clicks || 0),
          last_30d_conversions: conv,
        },
        action_description: `Add "${term}" as a phrase-match negative on "${campName}" — it consumed $${cost.toFixed(2)} with 0 conversions in 30 days and isn't itself a keyword.`,
        action_type: "ads_mutate",
        action_payload: {
          resource: "campaignCriteria",
          customer: "cethos_solutions",
          operations: [{
            create: {
              campaign: `customers/6316159162/campaigns/${campId}`,
              negative: true,
              keyword: { text: term, matchType: "PHRASE" },
            },
          }],
        },
        dedupe_key: `search_term_negative:${campId}:${term}`,
        model: settings.claude_narrative_model,
      });
      if (rec) recs.push(rec);
    }
  }
  return recs;
}

/**
 * CHECK 7: Brand-query leak into non-brand campaign.
 * Search term containing "cethos" that showed up in a non-brand campaign.
 * These should be captured by the Brand campaign only (lower CPC, higher CTR).
 * Fix: add as cross-campaign negative. Low risk.
 */
async function checkBrandLeak(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];

  const res = await callGoogle("gads", "query", {
    customer: "cethos_solutions",
    query: `
      SELECT campaign.id, campaign.name, search_term_view.search_term,
             metrics.cost_micros, metrics.clicks, metrics.conversions
      FROM search_term_view
      WHERE campaign.status = 'ENABLED'
        AND segments.date DURING LAST_30_DAYS
        ${CAMPAIGN_SCOPE_SQL}
      LIMIT 500
    `,
  });

  if (!Array.isArray(res.data)) return recs;

  for (const batch of res.data) {
    for (const row of batch.results || []) {
      const term = (row.searchTermView?.searchTerm || "").toLowerCase();
      if (!/\bcethos\b/.test(term)) continue;
      const campName: string = row.campaign.name || "";
      if (/brand/i.test(campName)) continue; // already in the Brand campaign — fine

      const campId = row.campaign.id;
      const cost = Number(row.metrics?.costMicros || 0) / 1e6;

      const rec = await createRecommendation(supabase, audit_run_id, {
        check_id: "brand_leak_non_brand_campaign",
        category: "ads_negative",
        risk_tier: "low",
        severity: "medium",
        evidence: {
          campaign_name: campName,
          search_term: term,
          last_30d_cost_cad: cost.toFixed(2),
          last_30d_clicks: Number(row.metrics?.clicks || 0),
          last_30d_conversions: Number(row.metrics?.conversions || 0),
        },
        action_description: `Add "${term}" as phrase-match negative on "${campName}" — branded query leaked into a non-brand campaign where it costs more per click than the dedicated Brand campaign would pay.`,
        action_type: "ads_mutate",
        action_payload: {
          resource: "campaignCriteria",
          customer: "cethos_solutions",
          operations: [{
            create: {
              campaign: `customers/6316159162/campaigns/${campId}`,
              negative: true,
              keyword: { text: term, matchType: "PHRASE" },
            },
          }],
        },
        dedupe_key: `brand_leak:${campId}:${term}`,
        model: settings.claude_narrative_model,
      });
      if (rec) recs.push(rec);
    }
  }
  return recs;
}

/**
 * CHECK 8: Budget starvation.
 * Campaign losing >20% of impression share due to budget AND has positive
 * ROAS (conversions exist). Recommend +25% daily budget. Medium risk — needs
 * a click to approve.
 */
async function checkBudgetStarvation(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];

  const res = await callGoogle("gads", "query", {
    customer: "cethos_solutions",
    query: `
      SELECT campaign.id, campaign.name, campaign_budget.amount_micros, campaign_budget.resource_name,
             metrics.search_budget_lost_impression_share, metrics.cost_micros, metrics.conversions
      FROM campaign
      WHERE campaign.status = 'ENABLED'
        AND segments.date DURING LAST_30_DAYS
        ${CAMPAIGN_SCOPE_SQL}
    `,
  });

  if (!Array.isArray(res.data)) return recs;

  for (const batch of res.data) {
    for (const row of batch.results || []) {
      const lostIS = Number(row.metrics?.searchBudgetLostImpressionShare || 0);
      const conv = Number(row.metrics?.conversions || 0);
      if (lostIS <= 0.20 || conv < 5) continue;

      const id = String(row.campaign.id);
      const name = row.campaign.name;
      const budgetMicros = Number(row.campaignBudget?.amountMicros || 0);
      const currentBudget = budgetMicros / 1e6;
      const newBudget = Math.round(currentBudget * 1.25 * 100) / 100;
      const budgetResource = row.campaignBudget?.resourceName;
      if (!budgetResource) continue;

      const rec = await createRecommendation(supabase, audit_run_id, {
        check_id: "budget_starvation",
        category: "ads_budget",
        risk_tier: "medium",
        severity: lostIS > 0.40 ? "high" : "medium",
        evidence: {
          campaign_name: name,
          search_budget_lost_impression_share_pct: (lostIS * 100).toFixed(1),
          conversions_30d: conv.toFixed(1),
          current_daily_budget_cad: currentBudget.toFixed(2),
          proposed_daily_budget_cad: newBudget.toFixed(2),
          current_state: {
            daily_budget: `$${currentBudget.toFixed(2)} CAD`,
            lost_is_budget: `${(lostIS * 100).toFixed(1)}%`,
            conversions_30d: conv.toFixed(1),
          },
          expected_after: {
            daily_budget: `$${newBudget.toFixed(2)} CAD (+25%)`,
            recovered_impression_share: `~${(lostIS * 25).toFixed(1)}% of lost share`,
            projected_monthly_incremental_conversions: ((conv / 30) * 30 * 0.25).toFixed(1),
            projected_monthly_incremental_spend: `$${((newBudget - currentBudget) * 30).toFixed(0)} CAD`,
          },
        },
        action_description: `Raise "${name}" daily budget from $${currentBudget.toFixed(2)} to $${newBudget.toFixed(2)} (+25%). Campaign is losing ${(lostIS * 100).toFixed(0)}% of impressions to budget cap while converting ${conv.toFixed(1)} times in 30 days.`,
        action_type: "ads_mutate",
        action_payload: {
          resource: "campaignBudgets",
          customer: "cethos_solutions",
          operations: [{
            update: {
              resourceName: budgetResource,
              amountMicros: String(Math.round(newBudget * 1e6)),
            },
            updateMask: "amount_micros",
          }],
        },
        dedupe_key: `budget_starvation:${id}`,
        model: settings.claude_narrative_model,
      });
      if (rec) recs.push(rec);
    }
  }
  return recs;
}

/**
 * CHECK 9: GBP posts staleness.
 * If a location's latest post is older than 30 days, recommend creating one.
 * Manual action — AI-drafted post copy requires approval before publish.
 */
async function checkGbpPostsStaleness(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];
  const locations = ["apostille", "translation", "interpretation"];
  const cutoff = Date.now() - 30 * 86400_000;

  for (const loc of locations) {
    const res = await callGoogle("gbp", "get_posts", { location: loc, pageSize: 5 });
    const posts = res.data?.localPosts || [];
    const newest = posts[0];
    const newestTime = newest?.updateTime ? new Date(newest.updateTime).getTime() : 0;

    if (newestTime > cutoff) continue; // fresh enough

    const rec = await createRecommendation(supabase, audit_run_id, {
      check_id: "gbp_posts_stale_30d",
      category: "gbp_post",
      risk_tier: "medium",
      severity: "medium",
      evidence: {
        location: loc,
        latest_post_time: newest?.updateTime || "(none)",
        days_since_last_post: newestTime ? Math.floor((Date.now() - newestTime) / 86400_000) : null,
      },
      action_description: `Create a new GBP post for ${loc} — last post was ${newestTime ? Math.floor((Date.now() - newestTime) / 86400_000) + " days ago" : "never"}. Active posts signal freshness to Google and bump local pack CTR.`,
      action_type: "manual",
      action_payload: { location_key: loc, reason: "needs human copy + CTA choice" },
      dedupe_key: `gbp_posts_stale:${loc}`,
      model: settings.claude_narrative_model,
    });
    if (rec) recs.push(rec);
  }
  return recs;
}

/**
 * CHECK 10: SpyFu — keywords that fell off rankings.
 * Pull lost-rankings list for cethos.com (CA market). Anything we used to
 * rank for that's now off page 1+ becomes a manual SEO rec.
 */
async function checkSpyfuLostRankings(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];
  const res = await callGoogle("spyfu", "lost_rankings", {
    domain: "cethos.com",
    country_code: "CA",
    page_size: 25,
  });
  const rows = res.data?.results || [];
  if (!rows.length) return recs;

  // Score by lost organic value: prior search volume × prior rank quality
  const scored = rows
    .filter((r: any) => r.searchVolume && r.searchVolume >= 30) // ignore tiny terms
    .sort((a: any, b: any) => (b.searchVolume || 0) - (a.searchVolume || 0))
    .slice(0, 5); // top 5 only — don't flood the digest

  for (const row of scored) {
    const keyword = row.keyword;
    const volume = row.searchVolume;
    const rec = await createRecommendation(supabase, audit_run_id, {
      check_id: "spyfu_lost_rankings",
      category: "seo_meta",
      risk_tier: "medium",
      severity: volume > 200 ? "high" : "medium",
      evidence: {
        keyword,
        prior_search_volume: volume,
        keyword_difficulty: row.keywordDifficulty,
        country: "CA",
        source: "spyfu",
        current_state: {
          rank: row.rank ?? "off page 1",
          rank_change: row.rankChange ?? null,
          seo_clicks: row.seoClicks ?? 0,
          search_volume: volume,
        },
        expected_after: {
          rank_target: "Top 10 (page 1)",
          potential_clicks: Math.round(volume * 0.03), // ~3% CTR for pos 4-10
          investment: "Page refresh + internal links + content depth",
          timeline: "4-8 weeks",
        },
      },
      action_description: `Cethos lost organic rankings for "${keyword}" (${volume}/mo CA searches, KD ${row.keywordDifficulty ?? "?"}). Investigate page-level cause: indexing, content depth, internal links, or competitor takeover. Consider refreshing the targeting page or building a new one.`,
      action_type: "manual",
      action_payload: { kind: "lost_ranking_review", keyword, country: "CA" },
      dedupe_key: `spyfu_lost:${keyword}`,
      model: settings.claude_narrative_model,
    });
    if (rec) recs.push(rec);
  }
  return recs;
}

/**
 * CHECK 11: BrightLocal — fresh negative reviews across managed locations.
 * Pulls latest reviews from the BrightLocal Reputation Manager report and
 * flags any 1-2 star review from the last 14 days as a manual rec so the
 * team can triage outside Google's GBP API.
 */
async function checkBrightlocalNegativeReviews(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];
  const reportsRes = await callGoogle("brightlocal", "reputation_reports", {});
  const reports = reportsRes.data?.reports || [];
  if (!reports.length) return recs;

  const cutoff = Date.now() - 14 * 86400_000;

  for (const report of reports) {
    const reportId = report.report_id;
    const reviewsRes = await callGoogle("brightlocal", "reviews", { report_id: reportId });
    const reviews = reviewsRes.data?.reviews || reviewsRes.data?.results || [];
    for (const r of reviews) {
      const stars = Number(r.rating || r.star_rating || 0);
      if (!stars || stars > 2) continue;
      const reviewDate = r.published_date || r.review_date || r.created_at;
      const reviewTime = reviewDate ? new Date(reviewDate).getTime() : 0;
      if (!reviewTime || reviewTime < cutoff) continue;

      const reviewId = r.review_id || r.id || `${reviewTime}`;
      const directory = r.directory || r.source || "unknown";
      const reviewer = r.reviewer || r.author || "Customer";
      const comment = r.review || r.comment || "(no comment)";

      const rec = await createRecommendation(supabase, audit_run_id, {
        check_id: "brightlocal_negative_review",
        category: "gbp_reply",
        risk_tier: "medium",
        severity: stars === 1 ? "high" : "medium",
        evidence: {
          report_id: reportId,
          location_name: report.report_name,
          directory,
          stars,
          reviewer,
          comment: comment.slice(0, 500),
          posted_at: reviewDate,
          source: "brightlocal",
          current_state: {
            review_status: "Unanswered",
            rating: `${stars} ★`,
            posted: reviewDate,
            directory,
          },
          expected_after: {
            review_status: "Replied within 24h",
            sentiment_recovery: "60-80% of unhappy reviewers update rating after a thoughtful reply",
            local_pack_impact: "Positive — reply rate is a confirmed local SEO signal",
          },
        },
        action_description: `New ${stars}-star review on ${directory} for ${report.report_name}: "${comment.slice(0, 200)}${comment.length > 200 ? "…" : ""}". Triage and reply within 24h — negative reviews compound on local pack ranking.`,
        action_type: "manual",
        action_payload: { kind: "negative_review_triage", review_id: reviewId, directory, report_id: reportId },
        dedupe_key: `bl_neg_review:${directory}:${reviewId}`,
        model: settings.claude_narrative_model,
      });
      if (rec) recs.push(rec);
    }
  }
  return recs;
}

/**
 * CHECK 12: PostHog — quote-funnel completion rate.
 * Counts pageviews on /quote vs the quote_submitted event over 7 days. If
 * conversion drops below 0.5% (a deliberately conservative floor) we surface
 * it for review so the team can investigate broken JS, form regressions, or
 * traffic-quality shifts.
 */
async function checkPostHogQuoteFunnel(supabase: any, audit_run_id: string, settings: AuditSettings): Promise<CreatedRec[]> {
  const recs: CreatedRec[] = [];
  const res = await callGoogle("posthog", "quote_funnel", { days: 7 });
  if (!res.data) return recs;

  // Handler returns either { steps: [...] } or raw HogQL rows depending on
  // implementation — accept both shapes.
  const data = res.data.results || res.data;
  let pageviews = 0;
  let submissions = 0;

  if (Array.isArray(data)) {
    for (const row of data) {
      if (row.step === "pageview" || row.event === "$pageview") pageviews = row.count ?? row.value ?? pageviews;
      if (row.step === "submit" || row.event === "quote_submitted") submissions = row.count ?? row.value ?? submissions;
    }
  } else if (typeof data === "object") {
    pageviews = data.quote_pageviews || data.pageviews || 0;
    submissions = data.quote_submissions || data.submissions || 0;
  }

  if (pageviews < 50) return recs; // not enough volume to draw conclusions
  const rate = submissions / pageviews;
  if (rate >= 0.005) return recs; // ≥ 0.5% is fine

  const rec = await createRecommendation(supabase, audit_run_id, {
    check_id: "posthog_quote_funnel_low",
    category: "site_code",
    risk_tier: "high",
    severity: rate < 0.001 ? "critical" : "high",
    evidence: {
      window_days: 7,
      quote_pageviews: pageviews,
      quote_submissions: submissions,
      conversion_rate_pct: (rate * 100).toFixed(3),
      threshold_pct: "0.5",
      current_state: {
        funnel_rate: `${(rate * 100).toFixed(2)}%`,
        pageviews_7d: pageviews,
        submissions_7d: submissions,
      },
      expected_after: {
        funnel_rate_target: "≥ 0.5% (industry baseline for translation/services)",
        incremental_quotes_7d: Math.max(0, Math.round(pageviews * 0.005) - submissions),
        next_action: "PostHog session recordings + GA4/Ads conversion tag check",
      },
      source: "posthog",
    },
    action_description: `Quote funnel converting ${(rate * 100).toFixed(2)}% (${submissions}/${pageviews}) over the last 7 days — below 0.5% floor. Check PostHog session recordings for /quote, verify form submit handler, and confirm GA4/Ads conversion tags still fire.`,
    action_type: "manual",
    action_payload: { kind: "funnel_investigation", page: "/quote" },
    dedupe_key: `posthog_quote_funnel:${new Date().toISOString().slice(0, 10)}`,
    model: settings.claude_narrative_model,
  });
  if (rec) recs.push(rec);
  return recs;
}

// ---------------------------------------------------------------------------
// Performance metrics gathering (numbers section of digest)
// ---------------------------------------------------------------------------

interface MetricCompare {
  current: number;
  previous: number;
  delta_pct: number | null; // null when prev = 0
  delta_abs: number;
}

interface WeeklyMetrics {
  period: { current_label: string; previous_label: string; days: number };
  google_ads: {
    spend: MetricCompare;
    clicks: MetricCompare;
    impressions: MetricCompare;
    conversions: MetricCompare;
    conversion_value: MetricCompare;
    ctr_pct: MetricCompare;
    avg_cpc: MetricCompare;
    cost_per_conversion: MetricCompare;
    conversion_rate_pct: MetricCompare;
    search_impression_share_pct: MetricCompare;
    search_top_impression_share_pct: MetricCompare;
    search_absolute_top_impression_share_pct: MetricCompare;
    search_lost_is_budget_pct: MetricCompare;
    search_lost_is_rank_pct: MetricCompare;
  };
  auction_insights: Array<{
    domain: string;
    impression_share_pct: number;
    overlap_rate_pct: number;
    position_above_rate_pct: number;
    top_of_page_rate_pct: number;
    abs_top_of_page_rate_pct: number;
    outranking_share_pct: number;
  }>;
  ga4: {
    sessions: MetricCompare;
    active_users: MetricCompare;
    engaged_sessions: MetricCompare;
    conversions: MetricCompare;
    avg_engagement_time_s: MetricCompare;
  };
  gsc: {
    clicks: MetricCompare;
    impressions: MetricCompare;
    ctr_pct: MetricCompare;
    avg_position: MetricCompare;
  };
  gbp: Array<{
    location: string;
    profile_views: MetricCompare;
    direction_requests: MetricCompare;
    phone_calls: MetricCompare;
    website_clicks: MetricCompare;
  }>;
  posthog: {
    pageviews: MetricCompare;
    sessions: MetricCompare;
    quote_pageviews: MetricCompare;
    quote_submits: MetricCompare;
    quote_conv_rate_pct: MetricCompare;
  };
  brightlocal: Array<{
    location_id: number;
    location_name: string;
    avg_rating: number | null;
    total_reviews: number | null;
  }>;
  spyfu: {
    avg_organic_rank: number | null;
    total_organic_keywords: number | null;
    monthly_organic_clicks: number | null;
    monthly_organic_value_usd: number | null;
    top_seo_competitors: string[];
  };
}

const num = (v: any, def = 0): number => {
  const n = typeof v === "string" ? parseFloat(v) : Number(v);
  return Number.isFinite(n) ? n : def;
};

const compare = (current: number, previous: number): MetricCompare => ({
  current,
  previous,
  delta_pct: previous === 0 ? null : ((current - previous) / previous) * 100,
  delta_abs: current - previous,
});

const fmtDate = (d: Date): string => d.toISOString().slice(0, 10);

async function gatherWeeklyMetrics(_supabase: any): Promise<WeeklyMetrics | null> {
  try {
    const now = new Date();
    const days = 7;
    const curEnd = now;
    const curStart = new Date(now.getTime() - days * 86400_000);
    const prevEnd = new Date(curStart.getTime() - 1 * 86400_000);
    const prevStart = new Date(prevEnd.getTime() - days * 86400_000);

    const period = {
      current_label: `${fmtDate(curStart)} → ${fmtDate(curEnd)}`,
      previous_label: `${fmtDate(prevStart)} → ${fmtDate(prevEnd)}`,
      days,
    };

    // ---------- Google Ads ----------
    // Two queries:
    //   1. customer-level totals for spend/clicks/impr/conv (scalar metrics)
    //   2. campaign-level for impression share metrics (top/abs-top IS only
    //      compatible with campaign resource), then weight-average by
    //      impressions to produce a single account-level number.
    const adsScopeSql = `AND campaign.name NOT LIKE '%Calgary Oaths%'`;
    void adsScopeSql; // kept for future per-campaign extensions

    const adsAgg = async (start: Date, end: Date) => {
      // Query 1: scalar totals at customer level
      const totalsRes = await callGoogle("gads", "query", {
        customer: "cethos_solutions",
        query: `
          SELECT
            metrics.cost_micros,
            metrics.clicks,
            metrics.impressions,
            metrics.conversions,
            metrics.conversions_value
          FROM customer
          WHERE segments.date BETWEEN '${fmtDate(start)}' AND '${fmtDate(end)}'
        `,
      });
      let cost = 0, clicks = 0, impressions = 0, conv = 0, convVal = 0;
      const totalsBatches = Array.isArray(totalsRes.data) ? totalsRes.data : [];
      for (const batch of totalsBatches) {
        for (const row of batch.results || []) {
          const m = row.metrics || {};
          cost += num(m.costMicros) / 1e6;
          clicks += num(m.clicks);
          impressions += num(m.impressions);
          conv += num(m.conversions);
          convVal += num(m.conversionsValue);
        }
      }

      // Query 2: campaign-level for IS metrics (weight by impressions)
      const isRes = await callGoogle("gads", "query", {
        customer: "cethos_solutions",
        query: `
          SELECT
            campaign.id,
            metrics.impressions,
            metrics.search_impression_share,
            metrics.search_top_impression_share,
            metrics.search_absolute_top_impression_share,
            metrics.search_budget_lost_impression_share,
            metrics.search_rank_lost_impression_share
          FROM campaign
          WHERE segments.date BETWEEN '${fmtDate(start)}' AND '${fmtDate(end)}'
            AND campaign.advertising_channel_type = 'SEARCH'
            AND campaign.name NOT LIKE '%Calgary Oaths%'
        `,
      });
      let isWSum = 0, isTopWSum = 0, isAbsTopWSum = 0, lostBudgetWSum = 0, lostRankWSum = 0, weight = 0;
      const isBatches = Array.isArray(isRes.data) ? isRes.data : [];
      for (const batch of isBatches) {
        for (const row of batch.results || []) {
          const m = row.metrics || {};
          const w = num(m.impressions);
          if (w <= 0) continue;
          // IS values come back as 0..1. Some accounts return -1 or values >1
          // for "below threshold"; clamp to 0..1.
          const cap = (v: any) => Math.max(0, Math.min(1, num(v)));
          if (m.searchImpressionShare !== undefined && m.searchImpressionShare !== null) {
            isWSum += cap(m.searchImpressionShare) * w;
            isTopWSum += cap(m.searchTopImpressionShare) * w;
            isAbsTopWSum += cap(m.searchAbsoluteTopImpressionShare) * w;
            lostBudgetWSum += cap(m.searchBudgetLostImpressionShare) * w;
            lostRankWSum += cap(m.searchRankLostImpressionShare) * w;
            weight += w;
          }
        }
      }
      const wAvgPct = (s: number) => (weight > 0 ? (s / weight) * 100 : 0);

      const ctr = impressions > 0 ? (clicks / impressions) * 100 : 0;
      const avgCpc = clicks > 0 ? cost / clicks : 0;
      const cpa = conv > 0 ? cost / conv : 0;
      const convRate = clicks > 0 ? (conv / clicks) * 100 : 0;
      return {
        cost, clicks, impressions, conv, convVal, ctr, avgCpc, cpa, convRate,
        is: wAvgPct(isWSum), isTop: wAvgPct(isTopWSum), isAbsTop: wAvgPct(isAbsTopWSum),
        lostBudget: wAvgPct(lostBudgetWSum), lostRank: wAvgPct(lostRankWSum),
      };
    };

    const [adsCur, adsPrev] = await Promise.all([
      adsAgg(curStart, curEnd),
      adsAgg(prevStart, prevEnd),
    ]);

    // ---------- Auction Insights (top competitor overlap) ----------
    let auction_insights: WeeklyMetrics["auction_insights"] = [];
    try {
      const aiQuery = `
        SELECT
          ad_group_criterion.keyword.text,
          metrics.search_impression_share
        FROM keyword_view
        WHERE segments.date BETWEEN '${fmtDate(curStart)}' AND '${fmtDate(curEnd)}'
          AND metrics.impressions > 100
        LIMIT 1`;
      // The actual auction-insight resource name in v23 is auction_insight_domain.
      // If that isn't queryable through our wrapper we fall back gracefully.
      const aiRes = await callGoogle("gads", "query", {
        customer: "cethos_solutions",
        query: `
          SELECT
            domain.name,
            metrics.auction_insight_search_impression_share,
            metrics.auction_insight_search_overlap_rate,
            metrics.auction_insight_search_position_above_rate,
            metrics.auction_insight_search_top_of_page_rate,
            metrics.auction_insight_search_absolute_top_of_page_rate,
            metrics.auction_insight_search_outranking_share
          FROM auction_insight_domain
          WHERE segments.date BETWEEN '${fmtDate(curStart)}' AND '${fmtDate(curEnd)}'
          ORDER BY metrics.auction_insight_search_impression_share DESC
          LIMIT 10
        `,
      });
      const aiRows: any[] = [];
      for (const batch of (Array.isArray(aiRes.data) ? aiRes.data : [])) {
        for (const row of batch.results || []) aiRows.push(row);
      }
      auction_insights = aiRows.map((row: any) => ({
        domain: row.domain?.name || "(unknown)",
        impression_share_pct: num(row.metrics?.auctionInsightSearchImpressionShare) * 100,
        overlap_rate_pct: num(row.metrics?.auctionInsightSearchOverlapRate) * 100,
        position_above_rate_pct: num(row.metrics?.auctionInsightSearchPositionAboveRate) * 100,
        top_of_page_rate_pct: num(row.metrics?.auctionInsightSearchTopOfPageRate) * 100,
        abs_top_of_page_rate_pct: num(row.metrics?.auctionInsightSearchAbsoluteTopOfPageRate) * 100,
        outranking_share_pct: num(row.metrics?.auctionInsightSearchOutrankingShare) * 100,
      }));
      void aiQuery; // silence unused
    } catch (err) {
      console.error("auction_insights query failed (non-fatal):", err);
    }

    // ---------- GA4 ----------
    // run_report expects params.start_date / params.end_date as strings
    // and params.metrics as a plain string array (the handler wraps each
    // entry in {name}).
    const gaAgg = async (start: Date, end: Date) => {
      const r = await callGoogle("ga", "run_report", {
        start_date: fmtDate(start),
        end_date: fmtDate(end),
        dimensions: [],
        metrics: ["sessions", "activeUsers", "engagedSessions", "conversions", "averageSessionDuration"],
        limit: 1,
      });
      const totals = r.data?.totals?.[0]?.metricValues || r.data?.rows?.[0]?.metricValues || [];
      return {
        sessions: num(totals[0]?.value),
        active: num(totals[1]?.value),
        engaged: num(totals[2]?.value),
        conv: num(totals[3]?.value),
        avgEngage: num(totals[4]?.value),
      };
    };
    const [gaCur, gaPrev] = await Promise.all([
      gaAgg(curStart, curEnd),
      gaAgg(prevStart, prevEnd),
    ]);

    // ---------- GSC ----------
    const gscAgg = async (start: Date, end: Date) => {
      const r = await callGoogle("gsc", "search_analytics", {
        start_date: fmtDate(start),
        end_date: fmtDate(end),
        dimensions: [],
        row_limit: 1,
      });
      const row = r.data?.rows?.[0];
      return {
        clicks: num(row?.clicks),
        impressions: num(row?.impressions),
        ctr: num(row?.ctr) * 100,
        position: num(row?.position),
      };
    };
    const [gscCur, gscPrev] = await Promise.all([
      gscAgg(curStart, curEnd),
      gscAgg(prevStart, prevEnd),
    ]);

    // ---------- GBP (per location) ----------
    // get_multi_metrics expects start_date/end_date as {year, month, day}.
    // Returns a multiDailyMetricTimeSeries with daily values to be summed.
    const gbp: WeeklyMetrics["gbp"] = [];
    const locations = ["apostille", "translation", "interpretation"];
    const dateObj = (d: Date) => ({ year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() });
    const gbpAgg = async (loc: string, start: Date, end: Date) => {
      const r = await callGoogle("gbp", "get_multi_metrics", {
        location: loc,
        start_date: dateObj(start),
        end_date: dateObj(end),
        metrics: [
          "BUSINESS_IMPRESSIONS_DESKTOP_MAPS",
          "BUSINESS_IMPRESSIONS_MOBILE_MAPS",
          "BUSINESS_IMPRESSIONS_DESKTOP_SEARCH",
          "BUSINESS_IMPRESSIONS_MOBILE_SEARCH",
          "BUSINESS_DIRECTION_REQUESTS",
          "CALL_CLICKS",
          "WEBSITE_CLICKS",
        ],
      });
      // Response shape: { multiDailyMetricTimeSeries: [{ dailyMetricTimeSeries: [{ dailyMetric, timeSeries: { datedValues: [{value}] } }] }] }
      const series = r.data?.multiDailyMetricTimeSeries?.[0]?.dailyMetricTimeSeries || [];
      const totals: Record<string, number> = {};
      for (const m of series) {
        const key = m.dailyMetric;
        const dv = m.timeSeries?.datedValues || [];
        totals[key] = dv.reduce((s: number, v: any) => s + num(v.value), 0);
      }
      return {
        views: (totals.BUSINESS_IMPRESSIONS_DESKTOP_MAPS || 0) +
               (totals.BUSINESS_IMPRESSIONS_MOBILE_MAPS || 0) +
               (totals.BUSINESS_IMPRESSIONS_DESKTOP_SEARCH || 0) +
               (totals.BUSINESS_IMPRESSIONS_MOBILE_SEARCH || 0),
        directions: totals.BUSINESS_DIRECTION_REQUESTS || 0,
        calls: totals.CALL_CLICKS || 0,
        clicks: totals.WEBSITE_CLICKS || 0,
      };
    };
    for (const loc of locations) {
      try {
        const [cur, prev] = await Promise.all([
          gbpAgg(loc, curStart, curEnd),
          gbpAgg(loc, prevStart, prevEnd),
        ]);
        gbp.push({
          location: loc,
          profile_views: compare(cur.views, prev.views),
          direction_requests: compare(cur.directions, prev.directions),
          phone_calls: compare(cur.calls, prev.calls),
          website_clicks: compare(cur.clicks, prev.clicks),
        });
      } catch (err) {
        console.error(`gbp metrics for ${loc} failed:`, err);
      }
    }

    // ---------- PostHog ----------
    const phAgg = async (start: Date, end: Date) => {
      const r = await callGoogle("posthog", "query", {
        query: `
          SELECT
            countIf(event = '$pageview') AS pageviews,
            count(DISTINCT \$session_id) AS sessions,
            countIf(event = '$pageview' AND properties.\$current_url LIKE '%/quote%') AS quote_pv,
            countIf(event = 'quote_submitted') AS quote_submits
          FROM events
          WHERE timestamp >= toDateTime('${fmtDate(start)}')
            AND timestamp < toDateTime('${fmtDate(end)} 23:59:59')
        `,
      });
      const row = r.data?.results?.[0] || [];
      return {
        pv: num(row[0]),
        sessions: num(row[1]),
        quotePv: num(row[2]),
        quoteSubmits: num(row[3]),
      };
    };
    let phCur = { pv: 0, sessions: 0, quotePv: 0, quoteSubmits: 0 };
    let phPrev = { pv: 0, sessions: 0, quotePv: 0, quoteSubmits: 0 };
    try {
      [phCur, phPrev] = await Promise.all([
        phAgg(curStart, curEnd),
        phAgg(prevStart, prevEnd),
      ]);
    } catch (err) {
      console.error("posthog metrics failed:", err);
    }
    const phRate = (s: number, p: number) => (p > 0 ? (s / p) * 100 : 0);

    // ---------- BrightLocal (review summary per location) ----------
    const brightlocal: WeeklyMetrics["brightlocal"] = [];
    try {
      const repRes = await callGoogle("brightlocal", "reputation_reports", {});
      const reports = repRes.data?.reports || [];
      for (const rep of reports) {
        let avg: number | null = null;
        let total: number | null = null;
        try {
          const sumRes = await callGoogle("brightlocal", "_raw", {
            method: "GET",
            path: `/v4/rf/${rep.report_id}/reviews-count`,
          });
          total = num(sumRes.data?.total_reviews ?? sumRes.data?.count, NaN);
          if (!Number.isFinite(total!)) total = null;
          avg = num(sumRes.data?.average_rating, NaN);
          if (!Number.isFinite(avg!)) avg = null;
        } catch {
          // ignore — leave nulls
        }
        brightlocal.push({
          location_id: rep.location_id,
          location_name: rep.report_name,
          avg_rating: avg,
          total_reviews: total,
        });
      }
    } catch (err) {
      console.error("brightlocal review summary failed:", err);
    }

    // ---------- SpyFu (domain stats + competitors) ----------
    let spyfuStats: WeeklyMetrics["spyfu"] = {
      avg_organic_rank: null,
      total_organic_keywords: null,
      monthly_organic_clicks: null,
      monthly_organic_value_usd: null,
      top_seo_competitors: [],
    };
    try {
      const sfRes = await callGoogle("spyfu", "domain_stats", {
        domain: "cethos.com",
        country_code: "CA",
      });
      const r0 = sfRes.data?.results?.[0];
      if (r0) {
        spyfuStats.avg_organic_rank = num(r0.averageOrganicRank, NaN);
        if (!Number.isFinite(spyfuStats.avg_organic_rank!)) spyfuStats.avg_organic_rank = null;
        spyfuStats.total_organic_keywords = num(r0.totalOrganicResults);
        spyfuStats.monthly_organic_clicks = num(r0.monthlyOrganicClicks);
        spyfuStats.monthly_organic_value_usd = num(r0.monthlyOrganicValue);
      }
      const compRes = await callGoogle("spyfu", "top_seo_competitors", {
        domain: "cethos.com",
        country_code: "CA",
        page_size: 5,
      });
      spyfuStats.top_seo_competitors = (compRes.data?.results || [])
        .map((c: any) => c.domain)
        .filter(Boolean);
    } catch (err) {
      console.error("spyfu stats failed:", err);
    }

    return {
      period,
      google_ads: {
        spend: compare(adsCur.cost, adsPrev.cost),
        clicks: compare(adsCur.clicks, adsPrev.clicks),
        impressions: compare(adsCur.impressions, adsPrev.impressions),
        conversions: compare(adsCur.conv, adsPrev.conv),
        conversion_value: compare(adsCur.convVal, adsPrev.convVal),
        ctr_pct: compare(adsCur.ctr, adsPrev.ctr),
        avg_cpc: compare(adsCur.avgCpc, adsPrev.avgCpc),
        cost_per_conversion: compare(adsCur.cpa, adsPrev.cpa),
        conversion_rate_pct: compare(adsCur.convRate, adsPrev.convRate),
        search_impression_share_pct: compare(adsCur.is, adsPrev.is),
        search_top_impression_share_pct: compare(adsCur.isTop, adsPrev.isTop),
        search_absolute_top_impression_share_pct: compare(adsCur.isAbsTop, adsPrev.isAbsTop),
        search_lost_is_budget_pct: compare(adsCur.lostBudget, adsPrev.lostBudget),
        search_lost_is_rank_pct: compare(adsCur.lostRank, adsPrev.lostRank),
      },
      auction_insights,
      ga4: {
        sessions: compare(gaCur.sessions, gaPrev.sessions),
        active_users: compare(gaCur.active, gaPrev.active),
        engaged_sessions: compare(gaCur.engaged, gaPrev.engaged),
        conversions: compare(gaCur.conv, gaPrev.conv),
        avg_engagement_time_s: compare(gaCur.avgEngage, gaPrev.avgEngage),
      },
      gsc: {
        clicks: compare(gscCur.clicks, gscPrev.clicks),
        impressions: compare(gscCur.impressions, gscPrev.impressions),
        ctr_pct: compare(gscCur.ctr, gscPrev.ctr),
        avg_position: compare(gscCur.position, gscPrev.position),
      },
      gbp,
      posthog: {
        pageviews: compare(phCur.pv, phPrev.pv),
        sessions: compare(phCur.sessions, phPrev.sessions),
        quote_pageviews: compare(phCur.quotePv, phPrev.quotePv),
        quote_submits: compare(phCur.quoteSubmits, phPrev.quoteSubmits),
        quote_conv_rate_pct: compare(
          phRate(phCur.quoteSubmits, phCur.quotePv),
          phRate(phPrev.quoteSubmits, phPrev.quotePv),
        ),
      },
      brightlocal,
      spyfu: spyfuStats,
    };
  } catch (err) {
    console.error("gatherWeeklyMetrics failed:", err);
    return null;
  }
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

// Map recommendation category → top-level platform bucket shown in the email.
const CATEGORY_TO_PLATFORM: Record<string, { label: string; color: string }> = {
  ads_keyword: { label: "Google Ads", color: "#0EA5E9" },
  ads_negative: { label: "Google Ads", color: "#0EA5E9" },
  ads_bid: { label: "Google Ads", color: "#0EA5E9" },
  ads_budget: { label: "Google Ads", color: "#0EA5E9" },
  seo_meta: { label: "Search Console / SEO", color: "#10B981" },
  seo_sitemap: { label: "Search Console / SEO", color: "#10B981" },
  seo_jsonld: { label: "Search Console / SEO", color: "#10B981" },
  gbp_profile: { label: "Google Business Profile", color: "#F59E0B" },
  gbp_reply: { label: "Google Business Profile", color: "#F59E0B" },
  gbp_post: { label: "Google Business Profile", color: "#F59E0B" },
  site_code: { label: "Site / GA4", color: "#8B5CF6" },
};

const PLATFORM_ORDER = [
  "Google Ads",
  "Search Console / SEO",
  "Google Business Profile",
  "Site / GA4",
];

interface DigestRow {
  title: string;
  expected_impact: string | null;
  severity: string;
  risk_tier: string;
  category: string;
  status: string;
  auto_executed: boolean;
}

// --- Number formatting & WoW delta helpers used by the Performance Snapshot ---

const fmtNum = (v: number, opts?: { decimals?: number; prefix?: string; suffix?: string; abbrev?: boolean }): string => {
  if (!Number.isFinite(v)) return "—";
  const decimals = opts?.decimals ?? (Math.abs(v) < 10 ? 2 : Math.abs(v) < 100 ? 1 : 0);
  let n = v;
  let suffix = opts?.suffix || "";
  if (opts?.abbrev) {
    if (Math.abs(v) >= 1_000_000) { n = v / 1_000_000; suffix = "M" + suffix; }
    else if (Math.abs(v) >= 1_000) { n = v / 1_000; suffix = "k" + suffix; }
  }
  return `${opts?.prefix || ""}${n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
};

// Render a delta cell with up/down arrow and color. `direction` says whether
// "higher current" is good (+1) or bad (-1).
const deltaCell = (m: MetricCompare, direction: 1 | -1): string => {
  if (m.delta_pct === null) {
    return `<span style="color:#94A3B8;font-size:11px;">—</span>`;
  }
  const isImprovement = (m.delta_pct > 0 && direction === 1) || (m.delta_pct < 0 && direction === -1);
  const isFlat = Math.abs(m.delta_pct) < 0.5;
  const color = isFlat ? "#64748B" : isImprovement ? "#059669" : "#DC2626";
  const arrow = isFlat ? "→" : m.delta_pct > 0 ? "▲" : "▼";
  return `<span style="color:${color};font-weight:600;font-size:11px;">${arrow} ${Math.abs(m.delta_pct).toFixed(1)}%</span>`;
};

const metricRow = (label: string, m: MetricCompare, valueFmt: (v: number) => string, direction: 1 | -1): string => `
  <tr>
    <td style="padding:6px 10px;font-size:12px;color:#64748B;border-bottom:1px solid #F1F5F9;">${escapeHtml(label)}</td>
    <td style="padding:6px 10px;font-size:13px;font-weight:600;color:#0C2340;border-bottom:1px solid #F1F5F9;text-align:right;">${valueFmt(m.current)}</td>
    <td style="padding:6px 10px;font-size:11px;color:#94A3B8;border-bottom:1px solid #F1F5F9;text-align:right;">${valueFmt(m.previous)}</td>
    <td style="padding:6px 10px;border-bottom:1px solid #F1F5F9;text-align:right;">${deltaCell(m, direction)}</td>
  </tr>`;

const sectionTable = (title: string, color: string, rows: string): string => `
  <h3 style="font-size:13px;margin:18px 0 6px;padding:5px 10px;background:${color}15;border-left:3px solid ${color};color:${color};font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">
    ${escapeHtml(title)}
  </h3>
  <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:white;border:1px solid #E5E7EB;border-radius:4px;">
    <thead>
      <tr style="background:#F8FAFC;">
        <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:left;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Metric</th>
        <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">This week</th>
        <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Last week</th>
        <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Δ</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;

function renderPerformanceSnapshot(m: WeeklyMetrics): string {
  const usd = (v: number) => fmtNum(v, { prefix: "$", decimals: 2 });
  const usdAbbr = (v: number) => fmtNum(v, { prefix: "$", abbrev: true, decimals: 1 });
  const intC = (v: number) => fmtNum(v, { decimals: 0 });
  const intCAbbr = (v: number) => fmtNum(v, { abbrev: true, decimals: 1 });
  const pct = (v: number) => fmtNum(v, { suffix: "%", decimals: 2 });
  const sec = (v: number) => `${fmtNum(v, { decimals: 1 })}s`;
  const float2 = (v: number) => fmtNum(v, { decimals: 2 });

  // --- Google Ads ---
  const adsRows = [
    metricRow("Spend", m.google_ads.spend, usd, -1),
    metricRow("Conversions", m.google_ads.conversions, intC, 1),
    metricRow("Cost / Conv (CPA)", m.google_ads.cost_per_conversion, usd, -1),
    metricRow("Conversion rate", m.google_ads.conversion_rate_pct, pct, 1),
    metricRow("CTR", m.google_ads.ctr_pct, pct, 1),
    metricRow("Avg CPC", m.google_ads.avg_cpc, usd, -1),
    metricRow("Clicks", m.google_ads.clicks, intCAbbr, 1),
    metricRow("Impressions", m.google_ads.impressions, intCAbbr, 1),
    metricRow("Search Impr Share", m.google_ads.search_impression_share_pct, pct, 1),
    metricRow("Top-of-Page Rate", m.google_ads.search_top_impression_share_pct, pct, 1),
    metricRow("Abs Top-of-Page Rate", m.google_ads.search_absolute_top_impression_share_pct, pct, 1),
    metricRow("Lost IS (Budget)", m.google_ads.search_lost_is_budget_pct, pct, -1),
    metricRow("Lost IS (Rank)", m.google_ads.search_lost_is_rank_pct, pct, -1),
  ].join("");

  // --- Auction Insights table ---
  let auctionHtml = "";
  if (m.auction_insights && m.auction_insights.length > 0) {
    const rows = m.auction_insights.map((c) => `
      <tr>
        <td style="padding:6px 10px;font-size:12px;color:#0C2340;font-weight:500;border-bottom:1px solid #F1F5F9;">${escapeHtml(c.domain)}</td>
        <td style="padding:6px 10px;font-size:12px;text-align:right;border-bottom:1px solid #F1F5F9;">${pct(c.impression_share_pct)}</td>
        <td style="padding:6px 10px;font-size:12px;text-align:right;border-bottom:1px solid #F1F5F9;">${pct(c.overlap_rate_pct)}</td>
        <td style="padding:6px 10px;font-size:12px;text-align:right;border-bottom:1px solid #F1F5F9;">${pct(c.position_above_rate_pct)}</td>
        <td style="padding:6px 10px;font-size:12px;text-align:right;border-bottom:1px solid #F1F5F9;">${pct(c.top_of_page_rate_pct)}</td>
        <td style="padding:6px 10px;font-size:12px;text-align:right;border-bottom:1px solid #F1F5F9;">${pct(c.abs_top_of_page_rate_pct)}</td>
        <td style="padding:6px 10px;font-size:12px;text-align:right;border-bottom:1px solid #F1F5F9;">${pct(c.outranking_share_pct)}</td>
      </tr>`).join("");
    auctionHtml = `
  <h3 style="font-size:13px;margin:18px 0 6px;padding:5px 10px;background:#0EA5E915;border-left:3px solid #0EA5E9;color:#0EA5E9;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">
    Auction Insights — competitor overlap
  </h3>
  <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:white;border:1px solid #E5E7EB;border-radius:4px;">
    <thead><tr style="background:#F8FAFC;">
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:left;font-weight:600;text-transform:uppercase;">Domain</th>
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;">Impr Share</th>
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;">Overlap</th>
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;">Pos Above</th>
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;">Top of Pg</th>
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;">Abs Top</th>
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;">Outranking</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
  }

  // --- GA4 ---
  const gaRows = [
    metricRow("Sessions", m.ga4.sessions, intCAbbr, 1),
    metricRow("Active users", m.ga4.active_users, intCAbbr, 1),
    metricRow("Engaged sessions", m.ga4.engaged_sessions, intCAbbr, 1),
    metricRow("Conversions", m.ga4.conversions, intC, 1),
    metricRow("Avg engagement", m.ga4.avg_engagement_time_s, sec, 1),
  ].join("");

  // --- GSC ---
  const gscRows = [
    metricRow("Clicks", m.gsc.clicks, intCAbbr, 1),
    metricRow("Impressions", m.gsc.impressions, intCAbbr, 1),
    metricRow("CTR", m.gsc.ctr_pct, pct, 1),
    metricRow("Avg position", m.gsc.avg_position, float2, -1),
  ].join("");

  // --- GBP per location ---
  const gbpHtml = m.gbp.map((g) => sectionTable(`GBP · ${g.location}`, "#F59E0B", [
    metricRow("Profile views", g.profile_views, intCAbbr, 1),
    metricRow("Direction requests", g.direction_requests, intC, 1),
    metricRow("Phone calls", g.phone_calls, intC, 1),
    metricRow("Website clicks", g.website_clicks, intC, 1),
  ].join(""))).join("");

  // --- PostHog ---
  const phRows = [
    metricRow("Pageviews", m.posthog.pageviews, intCAbbr, 1),
    metricRow("Sessions", m.posthog.sessions, intCAbbr, 1),
    metricRow("/quote pageviews", m.posthog.quote_pageviews, intC, 1),
    metricRow("Quote submissions", m.posthog.quote_submits, intC, 1),
    metricRow("Quote conv rate", m.posthog.quote_conv_rate_pct, pct, 1),
  ].join("");

  // --- BrightLocal review summary ---
  let brightHtml = "";
  if (m.brightlocal && m.brightlocal.length > 0) {
    const rows = m.brightlocal.map((b) => `
      <tr>
        <td style="padding:6px 10px;font-size:12px;color:#0C2340;border-bottom:1px solid #F1F5F9;">${escapeHtml(b.location_name || String(b.location_id))}</td>
        <td style="padding:6px 10px;font-size:13px;font-weight:600;text-align:right;border-bottom:1px solid #F1F5F9;">${b.avg_rating !== null ? b.avg_rating.toFixed(2) + " ★" : "—"}</td>
        <td style="padding:6px 10px;font-size:13px;font-weight:600;text-align:right;border-bottom:1px solid #F1F5F9;">${b.total_reviews ?? "—"}</td>
      </tr>`).join("");
    brightHtml = `
  <h3 style="font-size:13px;margin:18px 0 6px;padding:5px 10px;background:#F59E0B15;border-left:3px solid #F59E0B;color:#F59E0B;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">
    BrightLocal — reviews per location
  </h3>
  <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:white;border:1px solid #E5E7EB;border-radius:4px;">
    <thead><tr style="background:#F8FAFC;">
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:left;font-weight:600;text-transform:uppercase;">Location</th>
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;">Avg rating</th>
      <th style="padding:6px 10px;font-size:10px;color:#94A3B8;text-align:right;font-weight:600;text-transform:uppercase;">Total reviews</th>
    </tr></thead>
    <tbody>${rows}</tbody>
  </table>`;
  }

  // --- SpyFu ---
  let spyfuHtml = "";
  const sf = m.spyfu;
  if (sf.avg_organic_rank !== null || sf.total_organic_keywords !== null) {
    const compList = sf.top_seo_competitors.length > 0
      ? `<div style="font-size:12px;color:#475569;margin-top:6px;">Top SEO competitors: <strong>${sf.top_seo_competitors.map(escapeHtml).join(", ")}</strong></div>`
      : "";
    spyfuHtml = `
  <h3 style="font-size:13px;margin:18px 0 6px;padding:5px 10px;background:#10B98115;border-left:3px solid #10B981;color:#10B981;font-weight:600;text-transform:uppercase;letter-spacing:0.4px;">
    SpyFu — organic snapshot
  </h3>
  <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:white;border:1px solid #E5E7EB;border-radius:4px;">
    <tr>
      <td style="padding:6px 10px;font-size:12px;color:#64748B;border-bottom:1px solid #F1F5F9;">Avg organic rank</td>
      <td style="padding:6px 10px;font-size:13px;font-weight:600;text-align:right;border-bottom:1px solid #F1F5F9;">${sf.avg_organic_rank !== null ? sf.avg_organic_rank.toFixed(1) : "—"}</td>
    </tr>
    <tr>
      <td style="padding:6px 10px;font-size:12px;color:#64748B;border-bottom:1px solid #F1F5F9;">Total organic keywords</td>
      <td style="padding:6px 10px;font-size:13px;font-weight:600;text-align:right;border-bottom:1px solid #F1F5F9;">${sf.total_organic_keywords ?? "—"}</td>
    </tr>
    <tr>
      <td style="padding:6px 10px;font-size:12px;color:#64748B;border-bottom:1px solid #F1F5F9;">Monthly organic clicks</td>
      <td style="padding:6px 10px;font-size:13px;font-weight:600;text-align:right;border-bottom:1px solid #F1F5F9;">${sf.monthly_organic_clicks !== null ? fmtNum(sf.monthly_organic_clicks) : "—"}</td>
    </tr>
    <tr>
      <td style="padding:6px 10px;font-size:12px;color:#64748B;">Monthly organic value</td>
      <td style="padding:6px 10px;font-size:13px;font-weight:600;text-align:right;">${sf.monthly_organic_value_usd !== null ? usdAbbr(sf.monthly_organic_value_usd) : "—"}</td>
    </tr>
  </table>${compList}`;
  }

  return `
<div style="background:#F8FAFC;padding:14px 16px;border-radius:6px;margin-bottom:24px;">
  <div style="font-size:11px;color:#64748B;text-transform:uppercase;letter-spacing:0.5px;font-weight:600;margin-bottom:2px;">Performance Snapshot</div>
  <div style="font-size:12px;color:#94A3B8;">${escapeHtml(m.period.current_label)} <span style="color:#CBD5E1;">vs</span> ${escapeHtml(m.period.previous_label)}</div>
</div>
${sectionTable("Google Ads", "#0EA5E9", adsRows)}
${auctionHtml}
${sectionTable("GA4 — site analytics", "#8B5CF6", gaRows)}
${sectionTable("Search Console", "#10B981", gscRows)}
${gbpHtml}
${sectionTable("PostHog — product analytics", "#A855F7", phRows)}
${brightHtml}
${spyfuHtml}
`;
}

async function sendDigest(
  supabase: any,
  recipients: string[],
  execSummary: string,
  recsThisRun: CreatedRec[],
  auditRunId: string,
  autoExecutedCount: number,
  metrics: WeeklyMetrics | null,
): Promise<void> {
  if (!BREVO_API_KEY || recipients.length === 0) return;

  // Fetch ALL currently-active recs (pending or auto_executed in this run)
  // so the email shows the full platform picture, not just what changed.
  const { data: activeRows } = await supabase
    .from("recommendations")
    .select("title, expected_impact, severity, risk_tier, category, status")
    .in("status", ["pending", "auto_executed", "executed"])
    .gt("expires_at", new Date().toISOString())
    .order("severity", { ascending: true })
    .limit(200);

  const allRows: DigestRow[] = (activeRows || []).map((r: any) => ({
    title: r.title,
    expected_impact: r.expected_impact,
    severity: r.severity,
    risk_tier: r.risk_tier,
    category: r.category,
    status: r.status,
    auto_executed: r.status === "auto_executed",
  }));

  // Split pending vs auto-done (auto-done filtered to this-run only so the
  // "✓ Just applied" section reflects what the cron actually did right now).
  const autoDoneThisRun = recsThisRun.filter((r) => r.auto_executed).map((r) => ({
    title: r.title,
    expected_impact: r.expected_impact,
    severity: r.severity,
    risk_tier: r.risk_tier,
    category: r.category,
    status: "auto_executed",
    auto_executed: true,
  }));

  const pendingAll = allRows.filter((r) => r.status === "pending");

  // Group pending by platform
  const byPlatform = new Map<string, DigestRow[]>();
  for (const r of pendingAll) {
    const p = CATEGORY_TO_PLATFORM[r.category]?.label || "Other";
    if (!byPlatform.has(p)) byPlatform.set(p, []);
    byPlatform.get(p)!.push(r);
  }

  const sevBadge = (sev: string) => {
    const colors: Record<string, string> = {
      critical: "#DC2626", high: "#EA580C", medium: "#CA8A04", low: "#64748B",
    };
    return `<span style="display:inline-block;background:${colors[sev] || "#64748B"};color:white;font-size:10px;font-weight:700;padding:2px 6px;border-radius:3px;text-transform:uppercase;letter-spacing:0.5px;">${escapeHtml(sev)}</span>`;
  };

  // Pull rec evidence so we can render Before / After per row.
  const recIdsToFetch = recsThisRun.map((r) => r.id);
  const evidenceMap = new Map<string, any>();
  if (recIdsToFetch.length > 0) {
    const { data: evRows } = await supabase
      .from("recommendations")
      .select("id, title, evidence")
      .in("id", recIdsToFetch);
    for (const row of evRows || []) evidenceMap.set(row.title, row.evidence || {});
  }

  const renderBeforeAfter = (evidence: any): string => {
    if (!evidence) return "";
    const cur = evidence.current_state || evidence.before;
    const exp = evidence.expected_after || evidence.after || evidence.expected;
    if (!cur && !exp) return "";
    const fmt = (obj: any) =>
      Object.entries(obj || {})
        .map(([k, v]) => `<strong>${escapeHtml(k)}:</strong> ${escapeHtml(String(v))}`)
        .join(" · ");
    const beforeHtml = cur ? `<div style="font-size:11px;color:#94A3B8;margin-top:3px;"><span style="color:#64748B;font-weight:600;">Before:</span> ${fmt(cur)}</div>` : "";
    const afterHtml = exp ? `<div style="font-size:11px;color:#059669;margin-top:1px;"><span style="font-weight:600;">Expected after:</span> ${fmt(exp)}</div>` : "";
    return beforeHtml + afterHtml;
  };

  const platformSection = (platform: string, rows: DigestRow[]) => {
    const meta = PLATFORM_ORDER.includes(platform)
      ? { label: platform, color: Object.values(CATEGORY_TO_PLATFORM).find((p) => p.label === platform)?.color || "#64748B" }
      : { label: platform, color: "#64748B" };
    return `
  <h3 style="font-size:14px;margin:20px 0 10px;padding:6px 10px;background:${meta.color}15;border-left:3px solid ${meta.color};color:${meta.color};font-weight:600;">
    ${escapeHtml(meta.label)} · ${rows.length}
  </h3>
  <ul style="list-style:none;padding:0;margin:0;">
    ${rows.map((r) => {
      const ev = evidenceMap.get(r.title);
      return `
    <li style="padding:10px 12px;border-bottom:1px solid #F1F5F9;font-size:13px;line-height:1.5;">
      <div style="margin-bottom:3px;">${sevBadge(r.severity)}&nbsp;<strong style="color:#0C2340;">${escapeHtml(r.title)}</strong></div>
      ${r.expected_impact ? `<div style="color:#6B7280;font-size:12px;">→ ${escapeHtml(r.expected_impact)}</div>` : ""}
      ${renderBeforeAfter(ev)}
    </li>`;
    }).join("")}
  </ul>`;
  };

  const subject = pendingAll.length > 0
    ? `Cethos audit — ${pendingAll.length} action${pendingAll.length === 1 ? "" : "s"} need review`
    : `Cethos audit — ${autoExecutedCount} low-risk fixes applied`;

  const platformSectionsHtml = PLATFORM_ORDER
    .filter((p) => byPlatform.has(p))
    .map((p) => platformSection(p, byPlatform.get(p)!))
    .join("");
  const otherPlatforms = [...byPlatform.keys()].filter((p) => !PLATFORM_ORDER.includes(p));
  const otherHtml = otherPlatforms.map((p) => platformSection(p, byPlatform.get(p)!)).join("");

  const performanceHtml = metrics ? renderPerformanceSnapshot(metrics) : "";

  const html = `
<div style="font-family:-apple-system,Segoe UI,sans-serif;max-width:760px;margin:0 auto;padding:24px;color:#0C2340;">
  <h1 style="font-size:22px;margin:0 0 16px;">Cethos.com audit · ${new Date().toISOString().slice(0, 10)}</h1>

  <div style="background:#F8FAFC;border-radius:6px;padding:14px 18px;margin-bottom:24px;border-left:3px solid #0891B2;">
    <p style="font-size:14px;line-height:1.6;color:#334155;margin:0;">${escapeHtml(execSummary)}</p>
  </div>

  ${performanceHtml}

  <h2 style="font-size:18px;margin:32px 0 12px;color:#0C2340;border-bottom:2px solid #E5E7EB;padding-bottom:6px;">Action Plan</h2>

  ${autoDoneThisRun.length > 0 ? `
  <h2 style="font-size:16px;margin:24px 0 10px;color:#059669;">✓ Just auto-applied (${autoDoneThisRun.length})</h2>
  <ul style="list-style:none;padding:0;margin:0 0 24px;">
    ${autoDoneThisRun.map((r) => `
    <li style="padding:8px 10px;border-bottom:1px solid #F1F5F9;font-size:13px;line-height:1.5;">
      <strong style="color:#0C2340;">${escapeHtml(r.title)}</strong>
      ${r.expected_impact ? `<div style="color:#6B7280;font-size:12px;margin-top:2px;">→ ${escapeHtml(r.expected_impact)}</div>` : ""}
    </li>
    `).join("")}
  </ul>` : ""}

  ${pendingAll.length > 0 ? `
  <h2 style="font-size:16px;margin:24px 0 8px;color:#DC2626;">⚠ Pending review (${pendingAll.length})</h2>
  <p style="font-size:12px;color:#6B7280;margin:0 0 12px;">Grouped by platform. Each row shows severity and expected impact.</p>
  ${platformSectionsHtml}
  ${otherHtml}

  <div style="margin:24px 0 12px;">
    <a href="${ADMIN_RECOMMENDATIONS_URL}?run=${auditRunId}" style="background:#0891B2;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">
      Review &amp; approve →
    </a>
  </div>` : `
  <p style="font-size:14px;color:#059669;margin:24px 0;">No pending items — you are all caught up.</p>`}

  <hr style="border:none;border-top:1px solid #E5E7EB;margin:28px 0 12px;">
  <p style="font-size:11px;color:#9CA3AF;">Audit run ID: ${auditRunId} · This audit is scoped to cethos.com only (Calgary Oaths and other brands are excluded)</p>
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

  // Alert-tier checks run on both weekly + daily-alert invocations.
  // Deep-analysis checks only on weekly (or explicit manual).
  const alertChecks = [
    { name: "conversion_drought", fn: checkConversionDrought },
    { name: "cpa_spike", fn: checkCpaSpike },
  ];
  const deepChecks = [
    { name: "wasted_spend_keywords", fn: checkWastedSpendKeywords },
    { name: "high_imp_low_ctr", fn: checkHighImpLowCtr },
    { name: "unreplied_reviews", fn: checkUnrepliedReviews },
    { name: "search_term_negatives", fn: checkSearchTermNegatives },
    { name: "brand_leak", fn: checkBrandLeak },
    { name: "budget_starvation", fn: checkBudgetStarvation },
    { name: "gbp_posts_staleness", fn: checkGbpPostsStaleness },
    { name: "spyfu_lost_rankings", fn: checkSpyfuLostRankings },
    { name: "brightlocal_negative_reviews", fn: checkBrightlocalNegativeReviews },
    { name: "posthog_quote_funnel", fn: checkPostHogQuoteFunnel },
  ];
  const allChecks = checksOnly === "alerts" ? alertChecks : [...alertChecks, ...deepChecks];

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

  // Gather all-source performance numbers (WoW deltas, IS, auction insights,
  // GA4/GSC/GBP/PostHog/BrightLocal/SpyFu) for the digest's Performance Snapshot.
  // Failure here is non-fatal — we still send the action-plan portion.
  let metrics: WeeklyMetrics | null = null;
  try {
    metrics = await gatherWeeklyMetrics(supabase);
  } catch (err) {
    console.error("metrics gathering failed:", err);
  }

  // Always send the digest — even a zero-rec run should reassure the user
  // "all checks passed" and show current active recs across platforms.
  await sendDigest(supabase, settings.digest_recipients, execSummary, allRecs, runId, autoExecutedCount, metrics);

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
