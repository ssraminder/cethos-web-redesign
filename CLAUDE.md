# CLAUDE.md — Claude Code Project Instructions

This is the **Cethos main web** codebase — the public-facing marketing and services site for Cethos Translation Services (cethos.com). Next.js with internationalized routing under `app/[locale]/`, plus Supabase edge functions under `supabase/functions/`.

## Project memory (read at session start, update before commit)

This repository has a project-local memory system at `/memory/`:

- `memory/user.md` — primary user profile (role, context, working style)
- `memory/people.md` — team, stakeholders, vendors, clients referenced in conversations
- `memory/preferences.md` — captured preferences for code, communication, tooling
- `memory/decisions.md` — architectural, product, and business decisions with rationale

**At the start of every session:** read all four files before doing substantive work. They carry context from prior sessions that won't be in your conversation history.

**Before every `git commit`:** update the relevant memory file(s) with anything new from this session — new decisions, preferences confirmed, people introduced, or shifts in the user's context. Stage the memory updates as part of the same commit so context is version-controlled with the code.

If a memory file is stale or contradicts current reality, fix it rather than just appending.

## Marketing data integrations

This codebase doubles as the operational marketing engine. All Google Ads, GBP, GA4, GSC, GTM, PSI, PostHog, BrightLocal, and SpyFu calls route through a single Supabase edge function:

- **Endpoint:** `https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/google-integrations`
- **Source:** `supabase/functions/google-integrations/index.ts`
- **Body shape:** `{ "platform": "<gads|gbp|ga4|gsc|gtm|psi|posthog|brightlocal|spyfu>", "action": "<action_name>", "customer": "<gads_customer_alias>" (gads only), "params": { ...action_specific_args } }`
- **Auth:** `Authorization: Bearer <SUPABASE_SERVICE_ROLE_KEY>` (in `.env.local`)

Critical gotcha: action-specific arguments must be nested under `params`, not at the top level. SpyFu actions (`keyword_overview`, `related_keywords`, `serp_analysis`) silently return `{"error":"keyword required"}` if the keyword is at the top level.

Google Ads customer aliases:
- `cethos_solutions` → 6316159162 (primary translation campaigns)
- `cethos_inc` → 5680605007

When the user asks performance questions ("why is my CPC high?", "where are competitors ranking?"), pull real data from this function before answering — don't reach for generic PPC/SEO advice.

## Connected systems (different repos, same Supabase project)

The Cethos ecosystem spans three repos sharing one Supabase project (`lmzoyezvsjgsxveoakdr`):

| Repo | URL | Purpose |
|------|-----|---------|
| `cethos_app_figma_design_v1` (portal) | `portal.cethos.com` | Admin/PM portal — order management, vendor assignment |
| `cethosvendorportal` (vendor) | `vendor.cethos.com` | Vendor-facing portal — job board, file delivery |
| `main_web` (this repo) | `cethos.com` | Public marketing site + marketing edge functions |

### Vendor assignment workflow — key gotchas
- `order_workflow_steps.source_language` / `target_language` are **UUID** foreign keys to the `languages` table. `vendor_language_pairs` stores **uppercase ISO codes** ("EN", "ES-419"). Any function crossing these tables must resolve UUIDs via a `languages` lookup. UUID_RE: `/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i`
- `orders` table has **no `customer_name` column** — querying it causes a PostgREST silent error that nulls the entire response. Only select `id, order_number` (and optionally `customer_id`).
- `find-matching-vendors` v37+: falls back to showing all language-matched vendors when `vendor_rates` has no rows for a given `service_id` (Editing/Proofreading not yet set up in rates table).

### Parking lot / pending (as of 2026-05-05)
- Merge portal PR [#523](https://github.com/ssraminder/cethos_app_figma_design_v1/pull/523) and vendor PR [#53](https://github.com/ssraminder/cethosvendorportal/pull/53)
- Populate `vendor_rates` for Editing and Proofreading services
- Decide when to flip QMS gating from `warn` → `block` in `update-workflow-step`
- Customer name on vendor job cards (needs join to `profiles`/`customers`)

## Landing page inventory before recommending new pages

The `/services/certified/*` directory has 20+ keyword-specific landing pages already built (birth/marriage/divorce certificate, immigration, drivers license, IQAS, WES, express entry, language-specific pages, etc.). Before recommending net-new pages, run `ls app/[locale]/services/certified/` and confirm the gap is real.
