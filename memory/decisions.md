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

### 2026-06-02 — Apostille pricing: per-order + per-document model, courier honesty
- **Decision:** Rebuilt the apostille pricing table from the old two-tier "$149 with courier / $99 drop-off" into a first-document + per-additional-document model. New prices: $159 first doc (Calgary drop-off & pickup), $200 first doc (Alberta with door-to-door courier), $159 + courier at cost (Outside Alberta), $50 each additional document. Notarization add-on ($35), Translation + Apostille bundle ($199), International courier and Embassy legalization remain quote-on-request. Replaced all "all-inclusive · domestic courier both ways" copy on the apostille page with honest language: government-side courier (to/from the Competent Authority) is included; customer-side courier is at cost ($40 round-trip in Alberta, actuals elsewhere, $0 for walk-ins). Hero `priceBadge` $149 → $159; hero `priceUnit` reworded; FAQ "Is the courier cost included?" rewritten with the 4-part breakdown; "How It Works" paragraph and final-CTA pill updated; quote-form trust badge updated; SEO meta + JSON-LD `Offer.price` updated from 149 → 159 and `minPrice` 99 → 159.
- **Rationale:** User costing model: $40 round-trip government courier (per order, sunk), $25 government fee per document, ~1 hr employee labor per appointment. The previous $99 Calgary drop-off price was below cost (~$100 cost), and the previous flat "all-inclusive both ways" copy was a margin trap for out-of-province orders where customer courier is genuinely variable. New model exposes the per-doc economics (additional docs only incur the $25 govt fee, so $50 per addl doc is high-margin) and uses Calgary walk-in as the cheap path. Same prices were applied at calgaryoaths.com (different repo, different DB) for consistency since both businesses share the same Calgary cost structure.
- **Alternatives considered:**
  - Keep "courier both ways included" and bake an average customer-courier cost into every base price: rejected — overcharges Calgary walk-ins and undercharges remote shippers; also forces the business to absorb FedEx International variance on overseas returns.
  - Raise Calgary Oaths Power of Attorney from $80 to $239 to keep "apostille included" promise: rejected — 3x price hike is too jarring for an existing service. Unbundled instead: POA stays $80 for drafting+notarization, apostille is now billed as a separate $159+ service.
- **Status:** active
- **Affects:** `app/[locale]/services/apostille/{ApostilleContent,ApostilleQuoteForm,page}.tsx` (cethos). Also `lib/data/services.ts` and `app/services/apostille-legalization/page.tsx` in the calgaryoaths repo, plus Supabase project `ogxklbdjffbhtlabwonl` (SwornNow / Calgary Oaths): `co_services.apostille-legalization.price` updated to 15900, both `co_vendor_rates` rows for that slug updated to first=15900/additional=5000.

### 2026-05-26 — DOCX uploads on the quote form: retain original + attach converted PDF
- **Decision:** Quote-form `.docx` uploads now produce TWO entries in `quote_files`: the original `.docx` (retained for archival/customer download) and a client-side converted `.pdf` (what downstream OCR/billing consumes). `process-quote-documents` Phase 0 (v1.8) detects same-stem DOCX↔PDF pairs and marks the DOCX as `ai_processing_status='skipped'` so its text is not re-extracted into the combined PDF (which would double-count billable pages). The `convert-docx-to-pdf` Supabase edge function is now version-controlled in this repo at `supabase/functions/convert-docx-to-pdf/` — previously it was referenced by `lib/convertDocxToPdf.ts` but its source was missing, and CORS preflight failures blocked DOCX uploads in production.
- **Rationale:** User reported "problem with uploading a word file. It should convert the word document into pdf as soon as it is upload, retain the original word document in storage, and use pdf for further processing." The prior implementation discarded the original `.docx` (only uploaded the PDF), and the edge function the client called wasn't deployed/wasn't returning CORS headers, breaking the upload entirely. Retaining both files keeps customer originals available without losing the PDF-first processing model. The sibling-skip in Phase 0 prevents the doubled-page bug that would otherwise result from running both files through OCR.
- **Alternatives considered:**
  - Store DOCX in a sibling "originals" path outside `quote_files`: rejected — would hide it from any portal UI that lists `quote_files` rows.
  - Show two UI rows (DOCX + PDF) on the form: rejected — visually confusing for the user.
  - Use a full HTML→PDF renderer for higher fidelity: rejected — Deno-compatible renderers are heavy; text-only PDF is sufficient for OCR/billing and matches the extraction approach `process-quote-documents` already uses internally for DOCX.
- **Status:** active. Pending: deploy `convert-docx-to-pdf` to Supabase (`supabase functions deploy convert-docx-to-pdf --no-verify-jwt`) and redeploy `process-quote-documents` v1.8.
- **Affects:** `supabase/functions/convert-docx-to-pdf/index.ts` (new), `supabase/functions/process-quote-documents/index.ts` (v1.8 Phase 0 DOCX-sibling skip), `components/forms/EmbeddedCertifiedQuoteForm.tsx` (`LocalFile` gains `originalDocxPath`/`Name`/`Size`/`MimeType`; `convertAndUploadDocx`/`convertAndUploadRefDocx` upload the original first; submit pushes both into `filesToFinalize`).

### 2026-05-07 — `cal-integrations` delegates 100% of Google config to `google-integrations` via `gads.queue_offline_conversion`
- **Decision:** Refactored `cal-integrations` to NOT read any Google env vars (no `GA_MEASUREMENT_ID`, `GA_API_SECRET`, `GADS_CONSULT_CONVERSION_ACTION`, `GADS_CONSULT_VALUE_CAD`, `SITE_BASE_URL`). Added a new `gads.queue_offline_conversion` action to `google-integrations` that takes a `lead_type` string and resolves the customer ID + conversion-action resource name + default value from a `LEAD_TYPE_CONVERSIONS` map owned in `google-integrations`. cal-integrations sends only per-booking payload (gclid/gbraid/wbraid, customer_alias, lead_type, conversion_date_time, order_id_for_upload). Initial map: `apostille_quote` → action 7586548300 / $50 CAD; `apostille_consult` → action TBD (via env `GADS_CONVERSION_ACTION_APOSTILLE_CONSULT`) / $20 CAD. Per-action env overrides supported.
- **Rationale:** User-confirmed pattern: "for Google actions, use the edge function we currently have google-integrations, it's a working edge function with all integrations possible." Centralizing means adding a new lead type only requires updating one map in one function — not adding env vars to every caller. Also removes the foot-gun of forgetting to set `GADS_CONSULT_CONVERSION_ACTION` on each function that needs it.
- **Status:** active. Pending: create the "Apostille Free Consult Lead" conversion action in Google Ads (LEAD, ONE_PER_CLICK, $20 default) and set `GADS_CONVERSION_ACTION_APOSTILLE_CONSULT` env var on `google-integrations` to its bare action ID (no resource prefix — google-integrations builds `customers/<cid>/conversionActions/<id>` itself).
- **Affects:** `supabase/functions/cal-integrations/index.ts` (slimmed, no Google env reads), `supabase/functions/google-integrations/index.ts` (new `LEAD_TYPE_CONVERSIONS` map, `getSupabaseAdmin()`, `gads.queue_offline_conversion` action).

### 2026-05-07 — Apostille consultation flow reuses existing 3-step quote form as the qualifier
- **Decision:** Add a `mode: 'quote' | 'consult'` prop to `ApostilleQuoteForm`. Consultation CTAs (hero secondary, dedicated section, sticky mobile, exit-intent) all route to the same form with `mode='consult'`. On submit, instead of showing the quote-success panel, the form's success area swaps to a Cal.com inline iframe pre-filled with everything the user already entered (name, email, phone, docs, province, destination, addons, notes). Cal.com event slug: `cethos/apostille-consult`. Wired via `NEXT_PUBLIC_CAL_LINK` env var.
- **Rationale:** A 15-minute call where the specialist starts from "tell me about your situation" wastes 7 of those 15 minutes. The existing form already collects exactly the data the specialist needs. Building a parallel Cal.com-only modal would force a second qualification flow, fragment funnel analytics (`generate_lead` vs `booking_completed` would need separate attribution paths), and miss the post-booking "while you wait, start your apostille quote →" upsell that requires the two flows to be distinct destinations. User pushback caught me proposing a separate modal first — they noted "current form already does this exact qualification" and were right.
- **Alternatives considered:**
  - Separate Cal.com-only modal triggered from each CTA: rejected — bypasses the qualification work the existing form already does.
  - Embed Cal.com mid-form between steps: rejected — Cal.com is designed as a self-contained widget and gating the calendar behind step 1 fights the tool.
- **Status:** active
- **Affects:** `app/[locale]/services/apostille/{ApostilleContent,ApostilleQuoteForm,ApostilleConsultEmbed,ApostilleStickyConsultBar,ApostilleExitIntent}.tsx`. Form submit handler now branches on `mode`; success panel renders Cal.com embed for consult, original quote-success block otherwise.

### 2026-05-07 — Apostille lead values split: quote = $50 CAD, consult = $20 CAD
- **Decision:** Differentiate Google Ads conversion value by lead type. `lib/tracking.ts` exports a `LEAD_VALUES_CAD` map; `trackGenerateLead()` accepts an optional `leadKey` so the apostille form passes `apostille_quote` ($50) or `apostille_consult` ($20) per the user's submission mode. The cal-integrations webhook also enqueues an offline conversion in `ads_offline_conversions` with `GADS_CONSULT_VALUE_CAD` (default $20) and a separate `GADS_CONSULT_CONVERSION_ACTION` resource name when a `gclid` was attached to the lead.
- **Rationale:** Consult is top-of-funnel (free call, no commitment) and converts to paid at a different rate than a direct quote request. Smart bidding on a single conversion-value signal would over-weight whichever is more abundant. Splitting them gives bidding the right signal per intent.
- **Status:** active. Pending: user must create the new "Apostille Free Consult Lead" conversion action in Google Ads (LEAD category, ONE_PER_CLICK, $20 default) and set `GADS_CONSULT_CONVERSION_ACTION` env var on Supabase. Mutation can be fired via `google-integrations.gads.mutate_conversion_actions` once values are confirmed.
- **Affects:** `lib/tracking.ts`, `app/[locale]/services/apostille/ApostilleQuoteForm.tsx`, `supabase/functions/cal-integrations/index.ts`.

### 2026-05-07 — `cal-integrations` edge function for Cal.com webhook + branded email + secure-upload deep link
- **Decision:** New edge function `supabase/functions/cal-integrations/` handles two flows in one: (a) Cal.com webhook receiver (HMAC-verified, processes `BOOKING_CREATED`/`RESCHEDULED`/`CANCELLED`), (b) internal action dispatch (`me`, `list_event_types`, `list_bookings`, `get_booking`, `list_schedules`, `list_webhooks`) auth'd via service-role bearer token. On `BOOKING_CREATED` it: matches the consult lead row in `cethosweb_quote_submissions` by email, stores Cal.com booking metadata in `service_data.cal_booking`, fires a server-side GA4 `booking_completed` event by POSTing to `google-integrations.ga4.send_event` (Measurement Protocol), enqueues an offline conversion to `ads_offline_conversions` if a `gclid` was forwarded via Cal.com `metadata[gclid]`, and sends a Cethos-branded confirmation email via Brevo with a deep link to `/secure-upload?context=apostille-consult&uid=<bookingUid>&email=<email>&name=<name>`.
- **Rationale:** Client-side `postMessage` listening for Cal.com booking confirmation is unreliable — Cal.com sends emails for users to confirm flow that completes outside our iframe. Server-side webhook + Measurement Protocol is the only reliable conversion attribution path. Co-locating email + GA4 + Google Ads attribution + secure-upload link generation in one webhook handler keeps the booking-completed flow atomic. Branded email asks the client to upload documents before the call so the specialist walks in with full context.
- **Status:** active. Pending: deploy the function (`supabase functions deploy cal-integrations`), set Supabase secrets (`CAL_API_KEY`, `CAL_WEBHOOK_SECRET`, `GA_MEASUREMENT_ID`, `GA_API_SECRET`, `GADS_CONSULT_CONVERSION_ACTION`, `GADS_CONSULT_VALUE_CAD`, `SITE_BASE_URL`), and configure the Cal.com webhook in Settings → Developer → Webhooks pointing at the function URL.
- **Affects:** new `supabase/functions/cal-integrations/index.ts`, `supabase/functions/google-integrations/index.ts` (added `ga4.send_event` action), `app/[locale]/secure-upload/SecureUploadForm.tsx` (URL-param prefill + consult-context banner).

### 2026-05-07 — Cal.com consultations are cancel-only, not reschedulable
- **Decision:** The "Free 15-Min Apostille Consultation" Cal.com event has rescheduling disabled. The branded confirmation email tells clients explicitly: "this consultation can only be cancelled — not rescheduled. If you need a different time, please cancel and book a new one."
- **Rationale:** Reschedules are a calendar-coordination tax for free consultations and a cancel-then-rebook is identical operationally without the back-and-forth. Setting expectations in the email avoids requests in inbox replies.
- **Status:** active. Configured in Cal.com event settings, not in code.
- **Affects:** Cal.com event "apostille-consult"; confirmation email copy in `cal-integrations`.

### 2026-05-07 — All Google API actions route through `google-integrations` edge function
- **Decision:** Added `ga4.send_event` (GA4 Measurement Protocol) action to the existing `google-integrations` edge function rather than calling the Measurement Protocol endpoint directly from `cal-integrations`. The new edge function delegates server-side GA4 events by POSTing to `google-integrations` with `{platform:'ga4', action:'send_event', params}`.
- **Rationale:** User-confirmed pattern: "for Google actions, use the edge function we currently have google-integrations, it's a working edge function with all integrations possible." Centralizing keeps OAuth/secret management in one place and means future Google Ads / GA4 server-side actions follow the same dispatcher pattern.
- **Status:** active.
- **Affects:** `supabase/functions/google-integrations/index.ts` (GA handler, new `send_event` case).

### 2026-05-07 — Restructure "Cethos Translation Services" Google Ads campaign: ad-group-per-landing-page + new /documents hub
- **Decision:** Split the 41-keyword "Certified Translation Services" catch-all ad group into themed ad groups, each pointing to its dedicated landing page. Built a new conversion-focused hub page at `/services/certified/documents` and a corresponding "Certified Translated Document" ad group as the landing zone for the high-converting "certified translated document" keyword. Created 5 new language ad groups (French, Hindi, Mandarin, Punjabi, Spanish) and 5 new doc-type ad groups (Divorce Certificate, Police Clearance, IQAS, WES, Express Entry) to cover existing landing pages that previously had no ads.
- **Rationale:** "certified translated document" (phrase) had a 43% conversion rate at $9.68 CPC ($22.59 CPA) — best performer in the campaign — but was buried in the 41-keyword catch-all with no bid differentiation. Meanwhile "certified translation services" (phrase) was eating $248/week at $17.78 CPC and $62 CPA. Splitting groups by intent boosts Quality Score (ad/page relevance) so smart bidding (campaign uses MAXIMIZE_CONVERSION_VALUE) has cleaner signals to optimize on. Tightened the broad "certified translation services" from phrase → exact at the same time. Also added 6 negative keywords (admiral, everest, association of translators, polish translator, bilingual translation, spanish to english) and confirmed Calgary-only geo (23 postal codes T2A–T3K + 11 neighborhoods).
- **Alternatives considered:**
  - Single bid override on the winning keyword inside the catch-all: rejected — leaves the QS-dragging mismatch between keywords and the generic landing page in place.
  - Skip the hub page, point "certified translated document" at `/services/certified`: rejected — the landing-page-relevance lift is the main lever for lowering CPC; reusing the generic hub would limit it.
- **Status:** active
- **Affects:** Campaign 21865659820 ("Cethos Translation Services") on customer 6316159162. New ad groups: Certified Translated Document (195620056785), French/Hindi/Mandarin/Punjabi/Spanish Translation Calgary (195960519243/283/323/483/523), Divorce Certificate Translation (195003082303), Police Clearance Translation (195003082463), IQAS Alberta (195003082503), WES Evaluation (195003082543), Express Entry (195003082703). New code: `app/[locale]/services/certified/documents/`. IRCC Immigration Translation ad group un-paused.

### 2026-05-07 — Path1/path2 in Google Ads RSAs is capped at 15 chars
- **Decision:** Keep RSA path components ≤ 15 characters. "police-clearance" (16 chars) fails validation with `STRING_LENGTH_TOO_LONG` even though the dest URL is `/services/certified/police-clearance-translation`.
- **Rationale:** Hit during the Phase 3 RSA batch — the police clearance ad creation failed with `Too long.` on `path1`. Used `police` instead.
- **Status:** active
- **Affects:** Future Google Ads RSA creation via `google-integrations` mutate.

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

### 2026-05-14 — Sentry client config uses `instrumentation-client.ts`, not `sentry.client.config.ts`
- **Decision:** With `@sentry/nextjs` v10 on Next 14, the browser-side Sentry init must live in `instrumentation-client.ts` at the repo root. The legacy `sentry.client.config.ts` is supported but leaks the file's contents into server prerender chunks.
- **Rationale:** Netlify build for cethos.com failed every static page (254 routes) with `TypeError: o.browserTracingIntegration is not a function` during prerender — `Sentry.browserTracingIntegration()` (browser-only) was being evaluated in server chunks. Same Next 14 build emitted Sentry's own deprecation warning recommending the rename. After `git mv sentry.client.config.ts instrumentation-client.ts`, the build compiled cleanly and progressed past prerender; the deprecation warning also disappeared. The previous revert (PR #165) was based on the incorrect belief that `instrumentation-client.ts` is Next 15-only — Sentry's plugin wires it into Next 14 just fine.
- **Alternatives considered:**
  - Keep `sentry.client.config.ts` and narrow the global-error import: would only mask the leak, not fix it.
  - Downgrade Sentry to v8: avoidable churn.
- **Status:** active
- **Affects:** `instrumentation-client.ts`, `next.config.js` (`withSentryConfig` wrapper auto-detects either filename, prefers the new one). Do NOT re-revert this rename if a future build error appears related to Sentry; investigate the new error first.
