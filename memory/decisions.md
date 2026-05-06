# Decisions

Architectural, product, and business decisions made in this project — with rationale, so future sessions don't relitigate settled questions.

## Format
Append new entries at the top (newest first). For each:

```
### YYYY-MM-DD — Short decision title
- **Decision:** what was chosen
- **Rationale:** why
- **Alternatives considered:** what was rejected and why
- **Status:** active | superseded by [date] | reverted
- **Affects:** which parts of the codebase or product this touches
```

If a decision is later reversed or refined, mark the old one **superseded** rather than deleting — the history matters.

## Decisions

### 2026-05-05 — Vendor workflow: language IDs are UUIDs in DB but ISO codes in vendor tables
- **Decision:** Treat the UUID ↔ ISO code mismatch as a permanent schema quirk to work around in edge functions and UI, not something to fix at the schema level.
- **Rationale:** `order_workflow_steps.source_language`/`target_language` store UUID foreign keys to the `languages` table. `vendor_language_pairs` stores uppercase ISO codes ("EN", "ES-419"). Changing either side would require a migration touching thousands of rows and multiple functions. The UUID_RE regex (`/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i`) + a `languages` table lookup is the established resolution pattern.
- **Alternatives considered:** Migrate `order_workflow_steps` to store ISO codes — deferred, high blast radius.
- **Status:** active
- **Affects:** `find-matching-vendors` (v36+), `vendor-get-jobs` (v36+), `OrderWorkflowSection.tsx` (language filter + resolved lang state)

### 2026-05-05 — `orders` table has no `customer_name` column
- **Decision:** Query `orders` as `select("id, order_number")` only. Never include `customer_name`.
- **Rationale:** The column doesn't exist — PostgREST returns an error silently, making the entire `orders` response null, which causes `order_number` to be null everywhere. Customer identity (if needed) must come from a join to `profiles` or `customers`.
- **Status:** active
- **Affects:** `vendor-get-jobs`, any other function that queries `orders`

### 2026-05-05 — Service rate filter fallback in find-matching-vendors
- **Decision:** If `vendor_rates` has no rows for the given `service_id` and no `max_rate` filter is set, skip the rate filter and return all language-matched vendors.
- **Rationale:** New services (Editing, Proofreading) have no rates in `vendor_rates` yet. Without the fallback, the endpoint returns 0 vendors for these services, blocking PM assignment even when qualified vendors exist. PMs can still set rates manually at assignment time.
- **Status:** active
- **Affects:** `find-matching-vendors` (v37+)

### 2026-05-05 — Map Google Ads keywords to existing keyword-specific landing pages
- **Decision:** Set keyword-level Final URLs in Google Ads to route each keyword to its matching existing landing page (e.g. `marriage certificate translation` → `/services/certified/marriage-certificate-translation`), rather than the generic `/services/certified` hub everyone currently lands on.
- **Rationale:** Audit of past 12 months of cethos_solutions Google Ads data showed every translation-campaign ad sends 100% of traffic to `https://cethos.com/services/certified` — the generic hub. Quality Scores on core keywords sit at 4-5 ("certified translator", "translation services near me", "canadian certified translator", "marriage certificate translation") with "Below Average" predicted CTR, driving CPCs of $9-18 vs the $4 competitor benchmark. The site already has 20+ specific landing pages built under `/services/certified/*` — they just weren't connected to the ads.
- **Alternatives considered:**
  - Build new landing pages: rejected — they already exist.
  - Improve ad copy / Quality Score via headlines: useful but secondary; ad copy is already strong (15 headlines, IRCC, "139 reviews", $55 pricing).
  - Switch bidding strategy first: deferred — Quality Score has to come up first or any bidding strategy will overpay.
- **Status:** active
- **Affects:** Google Ads campaigns "Cethos Translation Services" and (within that) ad groups "Certified Translation Services" and "Calgary Translation Agency" on customer 6316159162. Implemented via the `mutate` action on the `gads` platform of the `google-integrations` edge function.

### 2026-05-05 — Use existing /locations/calgary for Calgary-geo keywords; do NOT clone Edmonton page
- **Decision:** Route Calgary-geo translation keywords (`translation services Calgary`, `certified translation services calgary`, `certified translator Calgary`, `translation calgary`, `document translation calgary`) to the existing `/locations/calgary` page rather than creating a parallel `/services/certified/calgary-translation-agency` page modeled on Edmonton.
- **Rationale:** `/locations/calgary` is already comprehensive — uses LocationPageTemplate, lists service areas (Downtown, Beltline, NE/NW/SE/SW), nearby cities (Airdrie, Cochrane, Okotoks…), has Calgary-specific FAQs and HQ address. The Edmonton parallel page exists because Edmonton is a *remote* service location with no physical office; Calgary is HQ with walk-in consultations, so the same "remote-only" framing doesn't apply.
- **Alternatives considered:**
  - Clone Edmonton structure: rejected — would duplicate content and split SEO authority.
- **Status:** active
- **Affects:** Calgary keyword routing in Google Ads.

### 2026-05-05 — Audit / observability stack uses single Supabase edge function `google-integrations`
- **Decision:** All Google Ads, GBP, GA4, GSC, GTM, PSI, PostHog, BrightLocal, and SpyFu calls route through one edge function (`supabase/functions/google-integrations/index.ts`), dispatched on `{ platform, action, params }` body shape.
- **Rationale:** Single point for OAuth refresh-token caching (60s buffer), uniform error/CORS handling, and one place for the audit cron (`audit-cethos-health`) to compose multi-platform queries. Already in place when 2026-05-05 PPC audit ran.
- **Status:** active (pre-existing — documenting for future sessions).
- **Affects:** all marketing/analytics integrations.
