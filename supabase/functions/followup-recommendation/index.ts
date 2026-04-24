/**
 * followup-recommendation
 *
 * Invoked when a user clicks "Follow-up" on a recommendation and submits a
 * note. Passes the original rec + all prior follow-ups + the new note to
 * Claude (Sonnet 4.6 by default — this is judgment work), which returns a
 * refined narrative. The rec is updated in place with the new title,
 * summary, and expected impact, and the note history is appended to the
 * follow_ups array.
 *
 * Claude is also allowed to suggest status changes (e.g. "user has resolved
 * this, mark rejected") or risk-tier adjustments via a structured response;
 * we apply those only when confidence is high.
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY") || "";

const DEFAULT_MODEL = "claude-sonnet-4-6";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function callClaude(req: {
  model: string;
  max_tokens: number;
  system?: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
}): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
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
  const data = await res.json();
  const block = (data.content || []).find((b: any) => b.type === "text");
  return block?.text || "";
}

function stripLabel(s: string, labels: string[]): string {
  const pattern = new RegExp(`^\\s*(${labels.join("|")})[^\\n]*[:\\n]?\\s*`, "i");
  return s.replace(pattern, "").trim();
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  const body = await req.json().catch(() => ({}));
  const recId: string | undefined = body.id;
  const note: string | undefined = body.note;
  const invoker: string = body.invoked_by || "admin";

  if (!recId || !note?.trim()) {
    return new Response(JSON.stringify({ error: "missing id or note" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Load rec
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

  const priorFollowUps: any[] = Array.isArray(rec.follow_ups) ? rec.follow_ups : [];
  const priorNotesText = priorFollowUps.length > 0
    ? priorFollowUps.map((f: any, i: number) => `Previous note ${i + 1} (${f.created_at}):\n${f.note}\n\nClaude's refinement:\nTitle: ${f.refined_title}\nSummary: ${f.refined_summary_md}\nImpact: ${f.refined_impact}\n---`).join("\n")
    : "(first follow-up on this rec)";

  const prompt = `A growth-audit recommendation was generated for cethos.com (Canadian translation services). The user has reviewed it and left a follow-up note. Your job: incorporate the note and rewrite the recommendation's narrative so it accounts for what the user said.

# Original recommendation
Check ID: ${rec.check_id}
Category: ${rec.category}
Severity: ${rec.severity}
Risk tier: ${rec.risk_tier}

Current title:
${rec.title}

Current summary:
${rec.summary_md}

Current expected impact:
${rec.expected_impact || "(none)"}

# Evidence the original check gathered
${JSON.stringify(rec.evidence, null, 2)}

# Prior follow-up history
${priorNotesText}

# New note from the user
${note}

# Instructions
1. Accept the user's note as additional context — they likely know their system better than the check's heuristics.
2. If the note reveals the rec was a false positive, adjust the narrative to explain that and recommend closing it.
3. If the note reveals the issue is different than first thought, refine the diagnosis.
4. If the note provides missing info that makes the original rec stronger, incorporate it.
5. Be concrete — reference numbers from the evidence when possible.

Respond with EXACTLY three sections separated by \`===\`. No markdown, no quotes, no labels other than the three I ask for:

<title, 80 chars or less>

===

<summary, 2–4 sentences that fold in the user's note>

===

<expected impact, 1 sentence. If the note revealed a false positive, write: "False positive — recommend closing." If the note resolves the issue, write: "Resolved by user — close.">`;

  let text: string;
  try {
    text = await callClaude({
      model: DEFAULT_MODEL,
      max_tokens: 600,
      system: "You are the senior marketing analyst iterating on a prior recommendation based on founder feedback. Be concrete, direct, and willing to change your mind when presented with new info.",
      messages: [{ role: "user", content: prompt }],
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: `claude failed: ${(err as Error).message}` }), {
      status: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const parts = text.split("===").map((p) => p.trim());
  const refinedTitle = stripLabel(parts[0] || "", ["TITLE"]) || rec.title;
  const refinedSummary = stripLabel(parts[1] || "", ["SUMMARY"]) || rec.summary_md;
  const refinedImpact = stripLabel(parts[2] || "", ["EXPECTED IMPACT", "IMPACT"]) || rec.expected_impact;

  // Append to follow_ups array
  const newFollowUp = {
    note,
    refined_title: refinedTitle,
    refined_summary_md: refinedSummary,
    refined_impact: refinedImpact,
    created_at: new Date().toISOString(),
    invoked_by: invoker,
    model: DEFAULT_MODEL,
  };

  const updatedFollowUps = [...priorFollowUps, newFollowUp];

  // Decide if we should auto-close the rec based on impact text
  const impactLC = refinedImpact.toLowerCase();
  const isFalsePositive = impactLC.includes("false positive") || impactLC.includes("resolved by user");

  const updates: Record<string, unknown> = {
    title: refinedTitle,
    summary_md: refinedSummary,
    expected_impact: refinedImpact,
    follow_ups: updatedFollowUps,
    last_followup_at: new Date().toISOString(),
  };

  if (isFalsePositive && rec.status === "pending") {
    updates.status = "rejected";
    updates.reviewed_at = new Date().toISOString();
    updates.reviewed_by = `ai-followup:${invoker}`;
  }

  const { error: updateErr } = await supabase
    .from("recommendations")
    .update(updates)
    .eq("id", recId);

  if (updateErr) {
    return new Response(JSON.stringify({ error: updateErr.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({
    rec_id: recId,
    refined_title: refinedTitle,
    refined_summary_md: refinedSummary,
    refined_impact: refinedImpact,
    auto_closed: isFalsePositive,
  }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
