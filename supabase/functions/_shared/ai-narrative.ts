/**
 * Claude-assisted narrative writer for audit recommendations.
 *
 * Takes deterministic check output + raw evidence, returns human-readable
 * title / summary / expected-impact strings. Also generates the executive
 * summary for the weekly digest.
 *
 * Uses Haiku for per-recommendation narrative (fast, cheap, ~$0.005 each)
 * and Sonnet for the exec summary (better synthesis across the whole report).
 */

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY") || "";
const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

interface ClaudeMessageRequest {
  model: string;
  max_tokens: number;
  system?: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}

interface ClaudeMessageResponse {
  content: Array<{ type: string; text: string }>;
  stop_reason: string;
  usage: { input_tokens: number; output_tokens: number };
}

async function callClaude(req: ClaudeMessageRequest): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error("ANTHROPIC_API_KEY not set");
  }
  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(req),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${t.substring(0, 500)}`);
  }
  const data: ClaudeMessageResponse = await res.json();
  const block = data.content.find((b) => b.type === "text");
  return block?.text || "";
}

/**
 * Write the narrative for one recommendation (title + summary + expected impact).
 * Input is the deterministic check result; output is human-readable prose.
 */
export async function writeRecommendationNarrative(input: {
  check_id: string;
  category: string;
  severity: string;
  evidence: Record<string, unknown>;
  action_description: string;
  model?: string;
}): Promise<{ title: string; summary_md: string; expected_impact: string }> {
  const model = input.model || "claude-haiku-4-5-20251001";

  const prompt = `You are a concise marketing operations analyst writing a recommendation for the cethos.com (Canadian translation services company) weekly growth audit. Write for a pragmatic founder/marketer — no fluff, no corporate voice.

Check that fired: ${input.check_id}
Category: ${input.category}
Severity: ${input.severity}

Evidence (JSON):
${JSON.stringify(input.evidence, null, 2)}

Proposed change: ${input.action_description}

Write THREE fields. Use plain text, no markdown lists, no bold/italic, no quotes. Reply with ONLY these three sections separated by \`===\`:

TITLE (under 80 chars, specific, no prefix like "Recommendation:"):
<title>

===

SUMMARY (2–3 sentences, explains why this matters using the evidence numbers):
<summary>

===

EXPECTED IMPACT (1 sentence, concrete — e.g. "Saves ~$54/mo at current volume" or "Recovers ~80 organic clicks/mo if CTR normalizes to 15%"):
<impact>`;

  const text = await callClaude({
    model,
    max_tokens: 400,
    system: "You are a senior PPC / SEO analyst writing for the founder of a small Canadian translation services company. Be concrete, evidence-based, and brief.",
    messages: [{ role: "user", content: prompt }],
  });

  const parts = text.split("===").map((p) => p.trim());
  const title = parts[0]?.replace(/^TITLE[^:]*:\s*/i, "").trim() || "Unnamed recommendation";
  const summary = parts[1]?.replace(/^SUMMARY[^:]*:\s*/i, "").trim() || "";
  const impact = parts[2]?.replace(/^EXPECTED IMPACT[^:]*:\s*/i, "").trim() || "";

  return { title, summary_md: summary, expected_impact: impact };
}

/**
 * Write the executive summary that sits at the top of the digest email.
 * Input: all recommendations generated this run, grouped.
 */
export async function writeExecutiveSummary(input: {
  recommendations: Array<{
    title: string;
    category: string;
    severity: string;
    risk_tier: string;
    expected_impact: string;
    auto_executed: boolean;
  }>;
  period_label: string;
  model?: string;
}): Promise<string> {
  const model = input.model || "claude-sonnet-4-6";

  if (input.recommendations.length === 0) {
    return "No new issues detected this cycle. All checks passed.";
  }

  const prompt = `Write a 3–5 sentence executive summary for the cethos.com weekly growth audit digest (${input.period_label}).

${input.recommendations.length} recommendations were generated. ${input.recommendations.filter((r) => r.auto_executed).length} were auto-executed (low-risk). The rest are pending review at /admin/ai-recommendations.

Recommendations:
${input.recommendations.map((r, i) => `${i + 1}. [${r.severity}/${r.risk_tier}/${r.category}${r.auto_executed ? "/AUTO-EXECUTED" : ""}] ${r.title} — ${r.expected_impact}`).join("\n")}

Write plain prose, no markdown. Lead with the biggest-impact item or the most urgent. Be concrete. No bullet lists. This is the first thing the founder reads in the morning.`;

  return await callClaude({
    model,
    max_tokens: 500,
    system: "You are the senior marketing analyst for a small Canadian translation services company. You write the weekly executive summary. Be direct and action-oriented.",
    messages: [{ role: "user", content: prompt }],
  });
}

/**
 * Draft a review reply for an unreplied Google Business Profile review.
 * Tone matches existing cethos replies (warm, professional, short).
 */
export async function draftReviewReply(input: {
  review_comment: string;
  star_rating: number;
  reviewer_name: string;
  location_name: string;
  model?: string;
}): Promise<string> {
  const model = input.model || "claude-haiku-4-5-20251001";

  const prompt = `Draft a reply to this Google Business Profile review for ${input.location_name} (a cethos.com translation services location in Canada).

Reviewer: ${input.reviewer_name}
Rating: ${input.star_rating}/5
Review: ${input.review_comment}

Guidelines:
- 2–4 sentences, warm but professional
- Address the reviewer by first name if one is given
- For 5-star: thank sincerely, briefly mention what was great (language pair, service type) if the review did
- For 4-star: thank, acknowledge any concern, invite them to reach out
- For 1-3 star: acknowledge the issue, take responsibility without over-promising, give a contact path (email hello@cethos.com)
- Never include fake specifics (don't invent order numbers, dates, etc.)
- No quotes, no markdown, no emojis
- Sign off with "— The Cethos team" on a new line

Reply:`;

  return await callClaude({
    model,
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });
}
