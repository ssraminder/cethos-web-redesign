# Cethos Google Ads Audit — Continuation Prompt

Copy everything below into a new Claude Code chat (in the same `D:\cethos\main_web` directory):

---

## Context

I'm continuing a Google Ads audit for Cethos Solutions. The previous session wrapped up:

✅ **Already done in prior session:**
- Fixed gtag/OCI conversion tracking (5 historic conversions = $502 backfilled to Google Ads)
- Paused Calgary Oaths - Commissioner of Oaths campaign
- Cleaned up 132 zombie driver's license keywords + added 13 new + URL routing
- Built apostille landing page at `app/[locale]/services/apostille/`
- Created new "Apostille Services - Canada" campaign (PAUSED, $30/day, 20 keywords) — campaign ID `23822426779`
- Removed 15 of 16 stale paused campaigns (one trial campaign needs manual UI removal)
- Deployed enhanced Supabase edge function `google-integrations` v25 with full SpyFu + Google Ads support

## Available infrastructure

- **Supabase edge function:** `https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/google-integrations`
- **Anon key (in `.env.local`):** `NEXT_PUBLIC_SUPABASE_ANON_KEY` — use as Bearer token
- **Google Ads access:** Customer ID `6316159162` (cethos_solutions), MCC `5680605007` (login_customer_id env var)
- **SpyFu access:** Working via `spyfu` platform, country defaults to `CA`
- **GA4 property:** `520428738`, **GSC site:** `https://cethos.com/`

## Edge function actions you'll use

```bash
# Pattern
curl -X POST "https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/google-integrations" \
  -H "Authorization: Bearer <ANON_KEY>" \
  -H "Content-Type: application/json" \
  -d '{"platform":"gads","action":"<action>","params":{...}}'

# Useful gads actions: query, list_campaigns, campaign_performance, search_terms,
# keyword_performance, list_accessible_customers, forecast_keywords, keyword_ideas,
# mutate_conversion_actions, mutate

# Useful spyfu actions: paid_serps, most_successful_ppc, new_ppc_keywords,
# domain_ad_history, keyword_ad_history, domain_stats, seo_competitors,
# ppc_competitors, keyword_expansions, request, diag

# Useful gsc/ga/gbp/gtm/psi/crux platforms also available
```

## Tasks to complete (in order)

### 1. PRIMARY: Resurrect "Life Sciences - Clinical Trial Translation" campaign

**Campaign ID:** `23723394671`
**Current status:** PAUSED, never spent ($0 lifetime)
**Existing structure (paused):**
- Ad group: "Clinical Trial Translation" — 1 ad pointing to `https://cethos.com/life-sciences`
  - Sample headlines: "Clinical Trial Translation", "FDA-Compliant Translation", "Life Sciences Experts"
- Ad group: "Pharmaceutical Regulatory Translation" — 1 ad
  - Sample headlines: "Pharma Regulatory Translation", "FDA Submission Translation"

**What to do:**
1. Verify `https://cethos.com/life-sciences` returns 200 and is the right landing page (it should redirect to `/services/lifesciences` or be a valid page — check both)
2. Audit keywords currently in those 2 ad groups (likely none since lifetime spend = $0). Use:
   ```json
   {"platform":"gads","action":"query","params":{"customer":"cethos_solutions","query":"SELECT ad_group_criterion.keyword.text, ad_group_criterion.keyword.match_type, ad_group_criterion.status, ad_group.name FROM keyword_view WHERE campaign.id = 23723394671"}}
   ```
3. If no/few keywords, **propose a keyword set** based on:
   - Run SpyFu `keyword_expansions` with `query: "clinical trial translation"`, `keywordSearchType: "Transactions"`, `country: "CA"` — and `country: "US"` (life sciences clients are often US-based)
   - Run SpyFu `keyword_expansions` with `query: "fda submission translation"`, type Questions
   - Use Google Ads `forecast_keywords` for the proposed set with `geo_targets: ["geoTargetConstants/2124"]` (Canada) and `["geoTargetConstants/2840"]` (US)
4. Show the user the proposed keyword + budget plan, get explicit confirmation, then add keywords to the existing ad groups
5. **Leave campaign PAUSED** unless user says enable. Life sciences is high-value B2B — consider $50-75/day budget.

**Important:** Life sciences keywords have very high CPCs ($15-50). The campaign needs careful targeting. Use SpyFu's competitor analysis (`ppc_competitors` for `cethos.com`) to find life sciences-specific competitors.

### 2. SECONDARY: Audit "Calgary Translation Agency" ad group

This is **the second-biggest spender** in the account: $2,530 over 90 days, $92 CPA (vs $50 account average). Inside `Cethos Translation Services` campaign (ID `21865659820`).

Tasks:
- Pull keyword spend data for that ad group specifically (filter by `ad_group.name = 'Calgary Translation Agency'`)
- Identify zero-conversion / high-CPA keywords
- Check landing page — currently routes to `/services/certified` (generic). Should it route to a Calgary-specific page like `/services/certified/edmonton-translation-agency` exists; might need to build `/services/certified/calgary-translation-agency` or use the locations page
- Propose either: (a) keyword cleanup, (b) new dedicated page + URL routing, (c) leave for now
- Get explicit confirmation before any mutations

### 3. TERTIARY: Resume "IRCC Immigration Translation" ad group

Inside `Cethos Translation Services` campaign. Currently PAUSED. Was running until recently with 66 imp / $25 in 90 days — small but worth resuming.

Tasks:
- Verify the ad group ad URL points to `https://cethos.com/services/certified/immigration-translation-services` (this dedicated page exists)
- Re-enable the ad group (`ad_group:mutate` with status ENABLED)
- Verify keywords are still active
- Get explicit confirmation before enabling

## Important constraints

- **All destructive Google Ads mutations require EXPLICIT user confirmation with exact phrasing.** The previous session pattern was: agent presents specific list of items, user replies with exact phrase like "Add the X keywords as listed" or "Remove the X campaigns from the cethos_solutions Google Ads account".
- **New campaigns always start PAUSED.** User enables after reviewing.
- **Do NOT enable any campaigns** without explicit user confirmation.
- **The apostille campaign is currently PAUSED** waiting for the apostille landing page to be deployed to production.

## Database context

The `quotes` table has `gclid`, `gbraid`, `wbraid`, `ad_click_time`, `utm_*` columns. The OCI pipeline (`ads_offline_conversions` table → `push-ads-conversions` edge function) auto-uploads conversions to Google Ads via cron. Already verified working — 5 backfilled conversions uploaded successfully.

## Now, please proceed with task 1 (Life Sciences resurrection)

Start by verifying the landing page, then audit existing keywords, then propose a plan with explicit confirmation needed before any keyword adds.
