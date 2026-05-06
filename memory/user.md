# User

Primary user of this codebase: who they are, their role, what they're responsible for, and what helps you collaborate well with them.

## Identity
- **Name:** Raminder Shah
- **GitHub:** ssraminder
- **Email:** ss.raminder@gmail.com
- **Company:** Cethos Translation Services (cethos.com) — HQ Calgary, AB

## Role & responsibilities
- Owner/operator of Cethos Translation Services. Operates two Google Ads accounts: `cethos_solutions` (6316159162) and `cethos_inc` (5680605007).
- Owns marketing strategy and budget — actively monitors PPC spend, competitor positioning, organic SEO. Reads Google Ads, SpyFu, BrightLocal, GA4, GSC, and PostHog data directly.
- Treats this codebase as both the public site AND the operational marketing engine: edge functions in `supabase/functions/` connect Google Ads, GBP, GA4, GSC, SpyFu, BrightLocal, PostHog, and run weekly audits (`audit-cethos-health`).

## Domain knowledge
- Strong on PPC fundamentals (CPC, Quality Score, conversion attribution) — comes to sessions with specific competitor benchmarks ("competitors are paying $4 CPC for certified translators") rather than generic asks.
- Knows the translation industry deeply — IRCC certification requirements, CTTIC/ATIO, immigration document workflows.
- Comfortable with the codebase architecture — knows there are edge functions, knows Supabase is the backend.

## Working style
- **Auto mode** is his default: wants execution, not deliberation. When he says "do X", do it — don't propose a 3-option plan.
- **Research-first**: asks Claude to query existing pages/data BEFORE recommending changes. He caught me recommending "create new landing pages" when 20+ already existed. Always inventory first.
- Concise updates preferred. State the finding, the action, and what's next — no recap paragraphs.

## Active focus
- **2026-05 (marketing):** Bringing Google Ads CPC down for translation keywords (current $9-18, target ~$4 competitor benchmark). Keyword-level Final URL remapping via Google Ads API implemented.
- **2026-05 (product):** Vendor assignment workflow — admin portal (`portal.cethos.com`, repo `cethos_app_figma_design_v1`) and vendor portal (`vendor.cethos.com`, repo `cethosvendorportal`). Core loop: PM finds vendors → offers/assigns steps → vendor accepts → delivers → PM approves. Multiple E2E bugs fixed across two sessions (see decisions.md).

## Parking lot / pending issues
- **Populate `vendor_rates` for Editing and Proofreading** — currently empty; find-matching-vendors falls back to showing all language-matched vendors without rate info. PM must set rates manually at assignment.
- **Customer name on vendor job cards** — `orders.customer_name` doesn't exist. If PMs want their name visible to vendors, need a join to `profiles` or `customers` table in `vendor-get-jobs`.
- **Merge open PRs:** portal [#523](https://github.com/ssraminder/cethos_app_figma_design_v1/pull/523) and vendor [#53](https://github.com/ssraminder/cethosvendorportal/pull/53).
- **QMS gating mode** — `update-workflow-step` v23 is deployed with QMS checks in `warn` mode (writes audit rows, never blocks). Decision needed on when to flip to `block` mode.
- **Initial search uses UUID for language filter** — Find Vendor dialog fires `doSearch` on open before `loadOptions` resolves UUIDs to ISO codes. The edge function handles it, but the first search technically sends UUIDs. Negligible in practice but worth noting.
- **Sentry CETHOS-PORTAL-CLIENT-2** (stale env from old Netlify deploy referencing `kwwbyczqtjduscjupknf`) — will self-resolve once old deployment expires.
