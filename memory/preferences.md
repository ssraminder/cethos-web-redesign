# Preferences

How the user wants you to approach work in this project. Add any time the user corrects your approach OR confirms a non-obvious approach worked. Include the *why* so you can judge edge cases.

## Format
- **Rule** — short statement
  - **Why:** reason given (incident, principle, constraint)
  - **How to apply:** when/where this kicks in

## Code & implementation

- **Inventory existing pages/code before recommending new ones**
  - **Why:** On 2026-05-05 I drafted a PPC remediation plan that recommended "build dedicated landing pages for each keyword cluster" without checking the codebase. The user pushed back ("query existing pages first") and the inventory revealed 20+ specific landing pages already existed under `/services/certified/*` — the actual problem was that ads weren't connected to them. Recommending net-new work that duplicates existing assets wastes time and undermines trust in the analysis.
  - **How to apply:** Before recommending net-new pages, components, edge functions, or API integrations, run Glob/Grep to confirm what exists. State the inventory in the response so the user can see the gap (or confirm there is none).

## Communication

- **Lead with the finding, then the action — no preamble or recap**
  - **Why:** User explicitly works in auto mode and reads the diff/output rather than long English summaries. Verbose framing slows iteration.
  - **How to apply:** Open with the actual data or the actual change. Skip "let me explain what I'm about to do" intros. End-of-turn summary: one or two sentences max.

- **Use real data, not generic frameworks**
  - **Why:** User asks specific data-backed questions ("competitors pay $4 CPC, why is mine higher?") and expects answers grounded in pulled data, not generic PPC advice.
  - **How to apply:** Query Google Ads / SpyFu / GA4 / etc. via the `google-integrations` edge function before answering performance questions. Cite numbers from the actual response.

## Tooling & workflow

- **Edge function calls go via the `google-integrations` Supabase function**
  - **Why:** All marketing data integrations are centralized there with OAuth caching and consistent error handling. The body shape is `{ platform, action, params: {...} }` — `params` is required for keyword-typed actions like SpyFu's keyword_overview, related_keywords, serp_analysis.
  - **How to apply:** When pulling Ads/GBP/GA4/GSC/SpyFu/BrightLocal/PostHog data, POST to `https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/google-integrations` with the service role key. Always nest action-specific arguments inside `params`.

- **Auto mode = execute, don't ask**
  - **Why:** When auto mode is active the user has explicitly opted into autonomous execution. Asking permission for routine, low-risk steps wastes their time.
  - **How to apply:** Make reasonable assumptions and proceed for code edits, data queries, file writes, edge-function reads. Still ask for: destructive operations, force-pushes, deletions, financial commitments, sending external messages.

## Tooling & workflow (continued)

- **Git pushes directly to `main` are blocked by a session hook**
  - **Why:** A permission rule prevents `git push origin main` during sessions. Discovered 2026-05-05 when pushing vendor workflow fixes.
  - **How to apply:** Always create a feature branch (`git checkout -b fix/...`), push the branch, then open a PR via `gh pr create`. Never attempt direct main push.

## Things to avoid

- **Don't propose a 3-option plan when one option is clearly right**
  - **Why:** Slows execution; user has working-style preference for direct action.
  - **How to apply:** If analysis points to one clear best path, do that. Reserve multi-option presentations for genuine tradeoffs.
