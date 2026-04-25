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
const GITHUB_OWNER = Deno.env.get("GITHUB_OWNER") || "ssraminder";
const GITHUB_REPO = Deno.env.get("GITHUB_REPO") || "cethos-web-redesign";
const GITHUB_BRANCH = Deno.env.get("GITHUB_BRANCH") || "main";

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY") || "";

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
 * Resolves a cethos.com URL to the Next.js app-router file that exports its
 * `metadata` object. Returns null if we can't confidently map it.
 *
 * Examples:
 *   https://cethos.com/                            → app/[locale]/page.tsx
 *   https://cethos.com/services/certified          → app/[locale]/services/certified/page.tsx
 *   https://cethos.com/fr/services/business        → app/[locale]/services/business/page.tsx
 *   https://cethos.com/services/certified/birth... → app/[locale]/services/certified/birth.../page.tsx
 */
function urlToFilePath(pageUrl: string): string | null {
  try {
    const u = new URL(pageUrl);
    if (u.hostname !== "cethos.com" && u.hostname !== "www.cethos.com") return null;
    let path = u.pathname.replace(/\/+$/, "");
    // Strip locale prefix if present
    path = path.replace(/^\/(fr|es|de|it|pt|zh|ja|ko|ar)\b/, "");
    if (path === "") return "app/[locale]/page.tsx";
    // Disallow paths with query-like chars or file extensions
    if (/[?&=#]/.test(path)) return null;
    return `app/[locale]${path}/page.tsx`;
  } catch {
    return null;
  }
}

async function claudeRewriteMeta(input: {
  page_url: string;
  target_query: string;
  impressions: number | string;
  ctr_pct: number | string;
  avg_position: number | string;
  current_file_content: string;
}): Promise<{ title: string; description: string } | { skip: true; reason: string }> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system: "You are a senior SEO specialist for cethos.com (Canadian translation services). You rewrite page metadata to improve SERP click-through, but you refuse to rewrite a page's meta to target a query the page isn't actually about — that would mislead searchers. Accuracy to page content comes before query targeting.",
      messages: [{
        role: "user",
        content: `A Next.js page is ranking for the query "${input.target_query}" but earning low click-through. Decide whether to rewrite the <title> and <meta description>.

Page URL: ${input.page_url}
Target query: ${input.target_query}
Current stats: ${input.impressions} impressions, ${input.ctr_pct}% CTR, position ${input.avg_position}

Current file (look at metadata export + page content to judge what the page is actually about):
\`\`\`
${input.current_file_content.slice(0, 5000)}
\`\`\`

Step 1 — topical fit check. Is the target query on-topic for this page?
  - ON-TOPIC if the page is substantially about the query (e.g. "/services/certified" and query "certified translation calgary").
  - OFF-TOPIC if the page is a hub / unrelated service / home page that happens to rank incidentally (e.g. "/" ranking for "driver licence translation" — the home page isn't driver-licence specific, rewriting its meta to target that query would be wrong. The right fix is to boost the dedicated sub-page, not rewrite the home).

Step 2 — if OFF-TOPIC, respond with exactly:

skip: <one-sentence reason>

Step 3 — if ON-TOPIC, write new meta:
  - Title: 50–60 characters, lead with the target query naturally, brand suffix "| Cethos" only if it fits
  - Description: 140–160 characters, action-oriented, include target query or close variant, concrete value prop (e.g. IRCC-accepted, from $65, same-day, 100% acceptance)
  - Must be factually accurate to the current page content
  - No ALL CAPS, no emoji, no quotes around the whole string

And respond with ONLY these two lines, exactly:

title: <your title>
description: <your description>`,
      }],
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Claude API ${res.status}: ${t.slice(0, 300)}`);
  }
  const data = await res.json();
  const text = data.content.find((b: any) => b.type === "text")?.text || "";

  // Check for an off-topic refusal first
  const skipMatch = text.match(/^\s*skip\s*:\s*(.+?)\s*$/im);
  if (skipMatch) {
    return { skip: true, reason: skipMatch[1].trim() };
  }

  const titleMatch = text.match(/^\s*title\s*:\s*(.+?)\s*$/im);
  const descMatch = text.match(/^\s*description\s*:\s*(.+?)\s*$/im);
  if (!titleMatch || !descMatch) {
    throw new Error(`Claude returned unparseable output: ${text.slice(0, 200)}`);
  }
  return {
    title: titleMatch[1].trim().replace(/^['"]|['"]$/g, ""),
    description: descMatch[1].trim().replace(/^['"]|['"]$/g, ""),
  };
}

/**
 * Extracts the current title + description from a Next.js page.tsx file by
 * finding the `title: '...'` and `description: '...'` properties inside the
 * `export const metadata` block. Supports single and double quotes and
 * backticks, with escaped inner quotes tolerated.
 */
function extractCurrentMeta(fileContent: string): { title: string; description: string } | null {
  // Narrow to the metadata export block to avoid catching unrelated titles.
  const metaMatch = fileContent.match(/export\s+const\s+metadata\s*:[^=]*=\s*(\{[\s\S]*?\n\s*\})/);
  if (!metaMatch) return null;
  const block = metaMatch[1];

  const titleMatch = block.match(/title\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/);
  const descMatch = block.match(/description\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/);
  if (!titleMatch || !descMatch) return null;
  return { title: titleMatch[2], description: descMatch[2] };
}

/**
 * GitHub Contents API: read the file, make the edit, commit back.
 * Uses the `PUT /repos/{owner}/{repo}/contents/{path}` endpoint which is
 * a single atomic operation (no branch checkout needed).
 *
 * Supported `kind` values:
 *   - file_edit: replace an exact substring. Payload needs
 *     { owner, repo, branch, path, old_content_snippet, new_content_snippet, commit_message }
 *   - file_write: overwrite the whole file. Payload needs
 *     { owner, repo, branch, path, new_content, commit_message }
 *   - meta_rewrite: generated by the audit check high_imp_low_ctr. Payload is
 *     { kind: 'meta_rewrite', page_url, target_query, impressions?, ctr_pct?, avg_position? }
 *     and we (a) resolve the file, (b) extract current title/description, (c) ask
 *     Claude Sonnet for a better pair, (d) do an inline replace, (e) commit.
 */
async function handleGithubCommit(payload: any, evidence: any): Promise<{ ok: boolean; result: unknown; refused?: boolean }> {
  if (!GITHUB_TOKEN) return { ok: false, result: { error: "GITHUB_TOKEN not set" } };

  const owner = payload.owner || GITHUB_OWNER;
  const repo = payload.repo || GITHUB_REPO;
  const branch = payload.branch || GITHUB_BRANCH;

  // For meta_rewrite we compute old/new content ourselves; for the other
  // kinds we trust the caller to provide the snippets.
  let path: string;
  let commit_message: string;
  let oldSnippet: string | null = null;
  let newSnippet: string | null = null;
  let newContent: string | null = null;

  if (payload.kind === "meta_rewrite") {
    if (!ANTHROPIC_API_KEY) return { ok: false, result: { error: "ANTHROPIC_API_KEY not set — meta_rewrite needs it" } };

    const filePath = urlToFilePath(payload.page_url);
    if (!filePath) {
      return { ok: false, result: { error: `Could not resolve file path for ${payload.page_url}` } };
    }
    path = filePath;

    // Fetch current file
    const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path.split("/").map(encodeURIComponent).join("/")}`;
    const getRes = await fetch(`${apiBase}?ref=${branch}`, {
      headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
    });
    if (!getRes.ok) {
      return { ok: false, result: { error: `GET ${path}: ${getRes.status} ${await getRes.text().then((t) => t.slice(0, 200))}` } };
    }
    const current = await getRes.json();
    const currentContent = atob(current.content.replace(/\n/g, ""));

    const existing = extractCurrentMeta(currentContent);
    if (!existing) {
      return { ok: false, result: { error: `Could not locate title/description in metadata export of ${path}` } };
    }

    // Ask Claude to rewrite — or refuse if the query is off-topic for the page
    let rewrite: { title: string; description: string } | { skip: true; reason: string };
    try {
      rewrite = await claudeRewriteMeta({
        page_url: payload.page_url,
        target_query: payload.target_query,
        impressions: evidence?.impressions_30d ?? "?",
        ctr_pct: evidence?.ctr_pct ?? "?",
        avg_position: evidence?.avg_position ?? "?",
        current_file_content: currentContent,
      });
    } catch (err) {
      return { ok: false, result: { error: `Claude rewrite failed: ${(err as Error).message}` } };
    }

    // Off-topic: Claude declined the rewrite. This isn't a server error — it's
    // an intentional decision. Surface a `refused` result that the parent
    // dispatcher uses to auto-transition the rec to rejected with the reason
    // captured, so the user doesn't have to deal with it manually.
    if ("skip" in rewrite) {
      return {
        ok: false,
        refused: true,
        result: {
          refused: true,
          reason: rewrite.reason,
          page_url: payload.page_url,
          target_query: payload.target_query,
          suggestion: "The correct action is to create or boost a dedicated sub-page for the target query, not rewrite this page's meta.",
        },
      };
    }

    // Build a minimal diff — two targeted replaces, preserving the quote style
    // already in the file.
    const titleRegex = /(title\s*:\s*)(['"`])((?:\\.|(?!\2).)*)\2/;
    const descRegex = /(description\s*:\s*)(['"`])((?:\\.|(?!\2).)*)\2/;

    let updated = currentContent.replace(titleRegex, (_m, prefix, quote) => {
      const escaped = rewrite.title.replace(new RegExp(`\\\\|${quote}`, "g"), (c) => `\\${c}`);
      return `${prefix}${quote}${escaped}${quote}`;
    });
    updated = updated.replace(descRegex, (_m, prefix, quote) => {
      const escaped = rewrite.description.replace(new RegExp(`\\\\|${quote}`, "g"), (c) => `\\${c}`);
      return `${prefix}${quote}${escaped}${quote}`;
    });

    if (updated === currentContent) {
      return { ok: false, result: { error: "meta regex replace produced no changes" } };
    }
    newContent = updated;
    commit_message = `seo: rewrite meta on ${new URL(payload.page_url).pathname || "/"} for "${payload.target_query}"`;
    const commitResult = await commitToGitHub({
      owner, repo, branch, path, sha: current.sha,
      newContent, commit_message,
      extraResult: { old_title: existing.title, old_description: existing.description, new_title: (rewrite as any).title, new_description: (rewrite as any).description },
    });
    return commitResult;
  }

  if (payload.kind !== "file_edit" && payload.kind !== "file_write") {
    return { ok: false, result: { error: `github_commit kind '${payload.kind}' not supported` } };
  }

  path = payload.path;
  commit_message = payload.commit_message;
  if (payload.kind === "file_edit") {
    oldSnippet = payload.old_content_snippet;
    newSnippet = payload.new_content_snippet;
  } else {
    newContent = payload.new_content;
  }

  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path.split("/").map(encodeURIComponent).join("/")}`;
  const getRes = await fetch(`${apiBase}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
  });
  if (!getRes.ok) return { ok: false, result: { error: `GET file: ${getRes.status} ${await getRes.text()}` } };
  const current = await getRes.json();
  const currentContent = atob(current.content.replace(/\n/g, ""));

  if (payload.kind === "file_edit") {
    if (!currentContent.includes(oldSnippet!)) {
      return { ok: false, result: { error: "old_content_snippet not found in current file" } };
    }
    newContent = currentContent.replace(oldSnippet!, newSnippet!);
  }

  return await commitToGitHub({ owner, repo, branch, path, sha: current.sha, newContent: newContent!, commit_message });
}

async function commitToGitHub(args: {
  owner: string; repo: string; branch: string; path: string; sha: string;
  newContent: string; commit_message: string; extraResult?: Record<string, unknown>;
}): Promise<{ ok: boolean; result: unknown }> {
  const apiBase = `https://api.github.com/repos/${args.owner}/${args.repo}/contents/${args.path.split("/").map(encodeURIComponent).join("/")}`;
  const putRes = await fetch(apiBase, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `${args.commit_message}\n\nAuto-generated by cethos audit bot.\n\nCo-authored-by: Cethos Audit Bot <noreply@cethos.com>`,
      content: btoa(args.newContent),
      sha: args.sha,
      branch: args.branch,
    }),
  });
  const putText = await putRes.text();
  let putData: any;
  try { putData = JSON.parse(putText); } catch { putData = putText; }

  // 403 / 404 with a "Resource not accessible" message almost always means the
  // GitHub token lacks Contents: Write on this repo. Add a diagnostic that
  // tells the user exactly what perms GitHub thinks the token has, so they
  // can compare with what they expect.
  if (!putRes.ok && (putRes.status === 403 || putRes.status === 404)) {
    const diag: Record<string, unknown> = { put_status: putRes.status, put_response: putData };
    try {
      const userRes = await fetch("https://api.github.com/user", {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
      });
      if (userRes.ok) {
        const u = await userRes.json();
        diag.token_user = { login: u.login, id: u.id, type: u.type };
        diag.token_scopes_classic = userRes.headers.get("x-oauth-scopes") || "(fine-grained PAT — no x-oauth-scopes)";
      } else {
        diag.token_user = `GET /user failed: ${userRes.status}`;
      }
    } catch (e) { diag.token_user_err = (e as Error).message; }

    try {
      const repoRes = await fetch(`https://api.github.com/repos/${args.owner}/${args.repo}`, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: "application/vnd.github+json" },
      });
      if (repoRes.ok) {
        const r = await repoRes.json();
        diag.repo_visible = true;
        diag.repo_permissions_for_token = r.permissions || "(no permissions block returned)";
        diag.repo_full_name = r.full_name;
      } else {
        diag.repo_visible = false;
        diag.repo_get_status = repoRes.status;
        diag.repo_hint = "Token cannot see this repo. For fine-grained PATs: ensure ssraminder/cethos-web-redesign is in the Repository access list.";
      }
    } catch (e) { diag.repo_err = (e as Error).message; }

    return { ok: false, result: { error: "GitHub PUT 403 — token lacks Contents:Write on this repo", diagnostics: diag } };
  }

  return {
    ok: putRes.ok,
    result: {
      commit: putData?.commit ? { sha: putData.commit.sha, url: putData.commit.html_url } : putData,
      path: args.path,
      ...(args.extraResult || {}),
    },
  };
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
  let result: { ok: boolean; result: unknown; refused?: boolean };
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
      result = await handleGithubCommit(rec.action_payload, rec.evidence);
      break;
    case "manual":
      // Manual actions have no automation target — approving one means "I've
      // handled this externally, mark it done." Treat as success no-op and
      // record that the user acknowledged it rather than a bot-driven action.
      result = { ok: true, result: { manually_handled: true, acknowledged_by: invoker } };
      break;
    default:
      result = { ok: false, result: { error: `unknown action_type ${rec.action_type}` } };
  }

  const now = new Date().toISOString();

  // Special case: AI refused the action (e.g. off-topic meta rewrite). This
  // isn't a failure — it's a deliberate "this rec is wrong" decision. Auto-
  // transition the rec to rejected with the reason captured, and return 200
  // so the UI shows a friendly "auto-rejected" toast instead of an error.
  if (!result.ok && result.refused) {
    await supabase
      .from("recommendations")
      .update({
        status: "rejected",
        reviewed_at: now,
        reviewed_by: `ai-refused:${invoker}`,
        execution_result: result.result as object,
      })
      .eq("id", recId);
    return new Response(JSON.stringify({
      rec_id: recId,
      ok: true,
      auto_rejected: true,
      result: result.result,
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

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
