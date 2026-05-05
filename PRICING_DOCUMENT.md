# Cethos Certified Translation — Pricing Reference

**Audience:** Sales / customer support / staff-quote operators
**Author:** Engineering, 2026-05-04
**Status:** Live (matches `process-quote-documents` v1.9 + `recalculate-quote-pricing` v11 + `create-fast-quote` v3)
**Verified:** End-to-end on production through Stripe checkout (QT26-10421 through QT26-10424) on 2026-05-04.

> **YES — pricing is fundamentally based on _billable pages_.** Word count is converted to billable pages first, and everything downstream multiplies that number. This document walks through exactly how, with every multiplier, override, and edge case.

---

## 1. The core formula

```
line_total  =  billable_pages
             × effective_rate
             × price_multiplier        (per-doc-type KB override, usually 1.0)
             + certification_price     (added separately, NOT multiplied)
```

Then the quote-level total is:

```
subtotal           = sum(line_total) across all groups
+ rush_fee         (if turnaround = rush or same_day)
+ delivery_fee     (if mailed/couriered)
+ surcharge_total  (manual surcharges, e.g., wire transfer fee)
- discount_total   (manual discounts + auto multi-page bundle)
+ tax              (5% Alberta default — varies by province)
─────────────────────
= total
```

---

## 2. Billable pages — the foundation

Every quote starts here.

```
raw_billable      = ceil((translatable_word_count / words_per_page) × complexity_multiplier × 10) / 10
billable_pages    = max(raw_billable, 1.0)              # 1-page minimum
```

### Inputs

| Input | Source | Default |
|---|---|---|
| `translatable_word_count` | OCR + Claude (only words in source language; excludes watermarks, page headers, repeated boilerplate) | n/a — measured per file |
| `words_per_page` | `app_settings.words_per_page` row in DB | **225** |
| `complexity_multiplier` | Claude classifies as easy / medium / hard | see below |

### Complexity tiers

| Level | Multiplier | When Claude assigns it |
|---|---|---|
| **Easy** | **1.0×** | Standard form layouts, typed text, clear scans, **chat screenshots** |
| **Medium** | **1.15×** | Mix of handwriting and typed, multi-page, some legalese |
| **Hard** | **1.25×** | Dense handwriting, court documents, technical terms, complex tables |

### Worked examples

| Document | Words | Complexity | Calc | Billable |
|---|---|---|---|---|
| Birth certificate (typed) | 220 | easy | ceil((220/225) × 1.0 × 10)/10 = ceil(9.78)/10 = 1.0 | **1.0** |
| Marriage cert (typed) | 450 | easy | ceil((450/225) × 1.0 × 10)/10 = ceil(20)/10 = 2.0 | **2.0** |
| Court ruling (handwritten) | 600 | hard | ceil((600/225) × 1.25 × 10)/10 = ceil(33.33)/10 = 3.4 | **3.4** |
| Police clearance | 100 | easy | ceil((100/225) × 1.0 × 10)/10 = ceil(4.44)/10 = 0.5 → max(0.5, 1.0) | **1.0** |

### Important rules
- **Minimum 1.0 billable pages** — even a 50-word document costs 1.0 page.
- Output is rounded **up** to the nearest 0.1 page (so 1.05 becomes 1.1, not 1.0).
- Word count is **translatable** words only — repeated headers, watermarks, English boilerplate on a Spanish doc, etc., are excluded by the LLM.

---

## 3. Effective rate — the per-page price

```
effective_rate = ceil(base_rate × language_multiplier / 2.5) × 2.5
```

That `ceil( /2.5) × 2.5` rounds the per-page rate **up to the nearest $2.50 increment**.

### Inputs

| Input | Source | Current value |
|---|---|---|
| `base_rate` | `app_settings.base_rate` row in DB | **$55.00** (limited-time, was $65) |
| `language_multiplier` | `languages.multiplier` (or `price_multiplier`) row for the source language | varies — see table below |

### Language multipliers (sample — full list in DB `languages` table)

| Source language | Multiplier | Effective rate at $55 base |
|---|---|---|
| Spanish | 1.0× | $55 / page |
| French | 1.0× | $55 / page |
| Mandarin | 1.0× | $55 / page |
| Punjabi / Hindi / Urdu | 1.0× | $55 / page |
| Arabic | 1.0× | $55 / page |
| Korean | 1.5× | ceil(55 × 1.5 / 2.5) × 2.5 = ceil(33) × 2.5 = **$82.50** / page |
| Japanese | 1.5× | $82.50 / page |
| Tigrinya / Tagalog / rare languages | 1.25× | ceil(55 × 1.25 / 2.5) × 2.5 = ceil(27.5) × 2.5 = **$70.00** / page |

> If you're unsure what multiplier a language carries, check `languages` table or ask engineering. The customer never sees the multiplier directly — they see the per-page rate it produces.

### Per-page rate examples at $55 base

| Language mult | Raw | Rounded up to 2.5 |
|---|---|---|
| 1.0 | $55.00 | **$55.00** |
| 1.15 | $63.25 | **$65.00** |
| 1.25 | $68.75 | **$70.00** |
| 1.5 | $82.50 | **$82.50** |
| 2.0 | $110.00 | **$110.00** |

---

## 4. Auto multi-page volume discount (UPDATED — 2026-05-04)

When the **total billable pages across the quote** crosses a tier threshold **AND** the source language is standard (multiplier = 1.0) **AND** there's no partner override, the engine auto-applies a percentage-off discount on the translation subtotal.

### Active tiers

| Total billable pages | Discount | Conditions |
|---|---|---|
| **2.0 ≤ pages < 3.0** | **5% off translation subtotal** | language_mult = 1.0, no partner override |
| **3.0 ≤ pages** | **10% off translation subtotal** | language_mult = 1.0, no partner override |

The largest applicable tier wins (e.g., 3.5 pages gets 10%, not 5%).

### How it shows on the quote

A 2-page quote in standard languages produces:
- Translation subtotal: $110.00 (2.0 × $55)
- Auto-discount line: −$5.50 (`reason = 'auto_multi_page_pct_5'`)
- **Net translation: $104.50**

A 3.5-page quote in standard languages produces:
- Translation subtotal: $192.50 (3.5 × $55)
- Auto-discount line: −$19.25 (`reason = 'auto_multi_page_pct_10'`)
- **Net translation: $173.25**

### Edge cases

| Scenario | Discount applies? |
|---|---|
| 2.0 pages, English source | ✅ yes — 5% |
| 2.4 pages, Spanish source | ✅ yes — 5% (still < 3.0) |
| 3.0 pages exactly | ✅ yes — 10% |
| 3.5 pages, hard-complexity Russian | ✅ yes — 10% |
| 1.9 pages (e.g., 425 words easy) | ❌ no — below 2.0 threshold |
| 2.0 pages, Korean source (mult 1.5) | ❌ no — premium language |
| 2.0 pages, partner customer with `base_rate_override` | ❌ no — partner pricing already applied |

### Trigger points (where the discount fires automatically)

1. **Public web form** (`process-quote-documents` v1.8+) — fires on initial quote creation
2. **Staff fast-quote** (`create-fast-quote` v3+) — fires on staff-built quotes
3. **Quote-detail UI changes** (`recalculate-quote-pricing` v11+) — fires on every recalc

All three paths share identical tier logic (`MULTI_PAGE_DISCOUNTS` constant in each function).

### Tier configuration

```ts
const MULTI_PAGE_DISCOUNTS = [
  { minPages: 3.0, percentOff: 10 },  // checked first (largest tier wins)
  { minPages: 2.0, percentOff: 5 },
];
```

Append new entries here (ordered by `minPages` DESC) to add additional tiers.

---

## 5. Human-in-the-loop (HITL) review triggers (NEW — 2026-05-04)

When a quote is flagged for review, `quotes.processing_status = 'review_required'` and `quotes.review_required_reasons` holds an array of reason codes. The customer is shown the friendly explanation on `/quote/confirmation?reason=<code>`; staff sees the engineering description in admin.

### Active triggers

| Reason code | Threshold | Default | Configurable via | Customer message |
|---|---|---|---|---|
| `high_billable_ratio` | `billable_pages / page_count > X` | **1.5×** | `app_settings.billable_page_ratio_threshold` | "One or more documents have an unusually high text density…" |
| `low_billable_ratio` | `billable_pages / page_count < X` | **0.35** (35%) | `app_settings.low_billable_ratio_threshold` | "One or more of your documents has many pages with little or no translatable text…" |
| `high_value_order` | `quote.total > $X` | **$500** | `app_settings.high_order_value_threshold` | "Because your order total exceeds $500, our team is reviewing it personally…" |
| `multi_language_document` | secondary language ≥ 20% | (per-doc) | KB `skip_multi_language_review` override | "One of your documents contains multiple languages…" |
| `unsupported_format` | non-PDF/image/docx file | n/a | n/a | "One of your files is in a format we need to convert manually…" |
| `low_ocr_confidence` | OCR confidence < threshold | 0.85 | `OCR_CONFIDENCE_THRESHOLD` constant | "Some text was difficult to read clearly." |
| `low_ai_confidence` | AI classification confidence < threshold | 0.85 | `AI_CONFIDENCE_THRESHOLD` constant | "We need to verify the language/document type." |
| `processing_error` | exception during processing | n/a | n/a | "We encountered a technical issue while processing." |
| `timeout` | OCR or AI step timed out | n/a | n/a | "Our system took longer than expected to analyze your documents." |

### Trigger details

#### `high_billable_ratio` (per-file)
Fires when a single document's billable pages exceed the configured ratio of physical pages. Catches **word-count inflation** from watermarks, repeated headers, or dense OCR noise.

Example: a 1-page scan that produces 6 billable pages → ratio 6.0 → flagged.

#### `low_billable_ratio` (per-file, NEW)
Fires when a single document's billable pages fall **below** the configured ratio of physical pages. Catches **sparse documents** where customer may expect every page translated.

Example: a 12-page PDF with only 80 translatable words → 1.0 billable / 12 physical = 8.3% < 35% → flagged.

Verified: QT26-10422 (12 physical pages, 79 words → review with reason `low_billable_ratio`).

#### `high_value_order` (quote-level, NEW)
Fires when the **final total** (after volume discount, tax, etc.) exceeds the threshold. Runs **after** SQL recalc so the post-discount number is what's checked.

Example: 10.8 billable pages × $55 with 10% volume discount = $561.33 final → > $500 → flagged.

Verified: QT26-10421 (10.8 billable, total $561.33 → review with reasons `high_value_order` + `high_billable_ratio`).

### Customer-facing display

Customer reaches `/quote/confirmation?quote_id=<id>&reason=<code>` and sees:

- A green checkmark + "Your Quote is Being Reviewed" headline
- A "Why manual review?" callout with the friendly message for the reason code
- The quote number
- An ETA: "Our team will review your documents and email you a detailed quote at <email> within 4 business hours"

The map lives in [`QuoteConfirmationPage.tsx:73-101`](portal/cethos_app_figma_design_v1/client/pages/quote/QuoteConfirmationPage.tsx).

### Admin display

`AdminQuoteDetail` renders a "Review Required" banner with one card per reason. Each card shows the engineering label + description.

The map lives in [`AdminQuoteDetail.tsx:421-481`](portal/cethos_app_figma_design_v1/client/pages/admin/AdminQuoteDetail.tsx).

### Where each trigger fires (engineering)

| Trigger | File | Line range (approx) |
|---|---|---|
| `high_billable_ratio` | `process-quote-documents/index.ts` | 1157–1170 |
| `low_billable_ratio` | `process-quote-documents/index.ts` | 1171–1184 |
| `high_value_order` | `process-quote-documents/index.ts` | 1357–1376 (Phase 5, post-recalc) |
| All — final write-back | `process-quote-documents/index.ts` | 1404–1418 |

---

## 6. Document-type minimums

Some doc types have a floor charge that overrides the formula when it would produce a lower total.

| Doc type | Minimum charge | Why |
|---|---|---|
| `chat_screenshot` | **$80.00** | Chat screenshots have low word count but high formatting effort |

Logic:
```
calculated_translation_cost = billable_pages × effective_rate
if (doc_type has minimum) AND (calculated < minimum):
   translation_cost = minimum
   billable_pages   = minimum / effective_rate   # display only — recomputed for transparency
   minimum_applied  = true
```

So a 50-word WhatsApp chat ($55 calc) gets **floored to $80**.

---

## 7. Knowledge-base (KB) overrides

The `ai_knowledge_base` table can override pricing at the document-type level. Two override fields are pricing-relevant:

### `price_multiplier`
A per-doc-type discount/markup applied to `line_total` AFTER the standard calculation.

Example KB entry:
```
override_field = 'price_multiplier'
override_value = '0.85'
document_type  = 'chat_screenshot'
```
→ Chat screenshots get a 15% discount on line_total.

### `skip_multi_language_review`
Not pricing per se, but it bypasses the "multi-language document → review_required" flag, which keeps the auto-quote flow alive for doc types that legitimately have multiple languages (e.g., chat screenshots).

---

## 8. Partner pricing override

If `quotes.base_rate_override` is set (e.g., for a partner agreement), the engine uses **that value** instead of `app_settings.base_rate`. The override:
- Bypasses the standard $55 rate
- Disqualifies the multi-page bundle discount
- Is set per-quote during creation (not per-customer)

Example: A partner with negotiated $42/page rate has `base_rate_override = 42.00` on their quotes. The 2-page bundle does NOT auto-apply because they already have partner pricing.

---

## 9. Worked examples (full quote calculations)

### Example A — Single birth certificate (Spanish → English)

| Step | Value |
|---|---|
| Translatable words | 220 |
| Complexity | easy (1.0×) |
| `raw_billable` | ceil((220/225) × 1.0 × 10)/10 = 1.0 |
| `billable_pages` | max(1.0, 1.0) = **1.0** |
| Source language mult | 1.0 |
| `effective_rate` | ceil(55 × 1.0 / 2.5) × 2.5 = **$55.00** |
| `translation_cost` | 1.0 × $55.00 = **$55.00** |
| Certification (commissioner) | $20.00 |
| Subtotal | **$75.00** |
| Tax (5% AB) | $3.75 |
| **Total** | **$78.75** |

### Example B — Marriage certificate, 2 pages (Mandarin → English)

| Step | Value |
|---|---|
| Translatable words | 460 |
| Complexity | easy (1.0×) |
| `raw_billable` | ceil((460/225) × 1.0 × 10)/10 = ceil(20.44)/10 = 2.1 |
| `billable_pages` | **2.1** |
| Source language mult | 1.0 |
| `effective_rate` | **$55.00** |
| `translation_cost` (raw) | 2.1 × $55.00 = $115.50 |
| **Auto multi-page volume discount** | **−$5.78 (5% — qualifies: 2.0 ≤ 2.1 < 3.0, mult 1.0)** |
| Net translation | **$109.72** |
| Certification | $20.00 |
| Subtotal | **$129.72** |
| Tax (5%) | $6.49 |
| **Total** | **$136.21** |

> Note: Because the new tiers are threshold-based (≥ 2.0, ≥ 3.0), any document with 2.0+ billable pages qualifies — even a 2.1-page doc gets the 5% off. A 3.0+ page doc jumps to 10%.

### Example C — Korean diploma, 1 page

| Step | Value |
|---|---|
| Translatable words | 180 |
| Complexity | easy (1.0×) |
| `raw_billable` | ceil((180/225) × 1.0 × 10)/10 = ceil(8.0)/10 = 0.8 |
| `billable_pages` | max(0.8, 1.0) = **1.0** |
| Source language mult | 1.5 (Korean) |
| `effective_rate` | ceil(55 × 1.5 / 2.5) × 2.5 = ceil(33) × 2.5 = **$82.50** |
| `translation_cost` | 1.0 × $82.50 = **$82.50** |
| Certification | $20.00 |
| Subtotal | **$102.50** |
| Tax (5%) | $5.13 |
| **Total** | **$107.63** |

### Example D — WhatsApp chat screenshot (English content)

| Step | Value |
|---|---|
| Translatable words | 60 |
| Complexity | easy (1.0×) |
| `raw_billable` | ceil((60/225) × 1.0 × 10)/10 = 0.3 |
| `billable_pages` | max(0.3, 1.0) = **1.0** |
| Source language mult | 1.0 |
| `effective_rate` | $55.00 |
| Calculated cost | 1.0 × $55 = $55 |
| **Document-type minimum** | $80 (chat_screenshot floor) |
| `translation_cost` | **$80.00** (floored up) |
| `billable_pages` (display) | $80 / $55 = 1.45 (recomputed for display) |
| Certification | $20.00 |
| Subtotal | **$100.00** |
| Tax (5%) | $5.00 |
| **Total** | **$105.00** |

### Example E — Hard handwritten court document (Russian → English, 3 pages physical)

| Step | Value |
|---|---|
| Translatable words | 800 |
| Complexity | hard (1.25×) |
| `raw_billable` | ceil((800/225) × 1.25 × 10)/10 = ceil(44.44)/10 = 4.5 |
| `billable_pages` | **4.5** |
| Source language mult | 1.0 (Russian standard) |
| `effective_rate` | $55.00 |
| `translation_cost` (raw) | 4.5 × $55.00 = $247.50 |
| **Auto multi-page volume discount** | **−$24.75 (10% — qualifies: 4.5 ≥ 3.0)** |
| Net translation | **$222.75** |
| Certification | $20.00 |
| Subtotal | **$242.75** |
| Tax (5%) | $12.14 |
| **Total** | **$254.89** |

> Notice: this 3-physical-page doc became 4.5 billable pages because of the hard complexity (1.25×) inflating word/page math. The system also flags this for review if `billable_pages / page_count` ratio > 1.5× (here it's 1.5, right at the threshold).

---

## 10. Add-ons

### Certification fees

| Cert type | Price | Description |
|---|---|---|
| Commissioner of Oaths certification | $20 | Default for IRCC submissions |
| Notary certification | $35 | When notary stamp is required |
| Apostille pre-handling | varies | For documents going abroad |

> The `certification_types` table is the source of truth. Certification is added per-document, not per-page.

### Passport stamp

If the doc is a passport, the certification fee is replaced by:
- **$7 / passport stamp** (matches talberta.ca pricing)

### Rush / same-day fees

| Turnaround | Fee | Notes |
|---|---|---|
| Standard (2-3 business days) | $0 | Default |
| Rush | +30% of subtotal | Configurable in `app_settings.rush_multiplier` |
| Same-day | +100% of subtotal | Configurable in `app_settings.same_day_multiplier` |

### Delivery fees

Read from `delivery_options` table — typically:

| Method | Fee |
|---|---|
| Email (PDF) | $0 |
| Customer portal | $0 |
| Office pickup | $0 |
| Mail (Canada Post Letter) | $5–10 |
| Courier | $15–35 |

### Free scanned copy

**No charge.** Talberta.ca charges $10 for scanned copies; Cethos includes them free as a competitive differentiator.

---

## 11. Tax

| Province | Default rate | Source |
|---|---|---|
| Alberta | **5%** (GST only) | `tax_rates.rate` row WHERE region_code = 'AB' |
| Other provinces | varies (HST/PST) | `tax_rates` table |

Tax is applied **to the pre-tax total** (subtotal + rush + delivery + surcharges − discounts).

---

## 12. Quick-reference cheat sheet

For staff handling phone/email quotes:

| Customer asks | Answer |
|---|---|
| "How much for a single birth certificate?" | $55 + $20 cert = **$75 + tax** ($78.75) |
| "How much for 2 pages?" | $55 × 2 = $110, **5% volume discount = $104.50** + cert + tax (~$130.73) |
| "How much for 3+ pages?" | $55 × billable pages, **10% volume discount on translation** + cert + tax |
| "Korean documents?" | Per-page rate becomes **$82.50** (1.5× multiplier) |
| "Court docs / handwritten?" | Hard complexity = 1.25× — multiplies billable pages, not the rate |
| "Same-day?" | Doubles the subtotal (+100%) |
| "Do I need to pay extra for the scanned copy?" | **No, scanned copies are free.** Talberta charges $10 — we don't. |
| "Is notarization extra?" | $20 commissioner included. $35 if notary required. |
| "Can you match talberta.ca's $59 price?" | **We're $4 cheaper at $55** (limited time). Plus 5% off 2-page orders, 10% off 3+ pages. |
| "What's a billable page?" | 225 words = 1 page baseline. Complexity (handwriting, legalese) adds 15-25%. Minimum 1 page per document. |

---

## 13. Where the numbers live (engineering reference)

| Setting | Table | Column | Current value |
|---|---|---|---|
| Per-page rate | `app_settings` | `setting_value` WHERE `setting_key = 'base_rate'` | **55.00** |
| Words per page | `app_settings` | `setting_value` WHERE `setting_key = 'words_per_page'` | 225 |
| Min billable pages | `app_settings` | `setting_value` WHERE `setting_key = 'min_billable_pages'` | 1.0 |
| Rush multiplier | `app_settings` | `setting_value` WHERE `setting_key = 'rush_multiplier'` | 0.30 |
| Same-day multiplier | `app_settings` | `setting_value` WHERE `setting_key = 'same_day_multiplier'` | 2.00 |
| Billable ratio threshold (high) | `app_settings` | `setting_value` WHERE `setting_key = 'billable_page_ratio_threshold'` | 1.5 |
| Billable ratio threshold (low, NEW) | `app_settings` | `setting_value` WHERE `setting_key = 'low_billable_ratio_threshold'` | 0.35 |
| High-order-value threshold (NEW) | `app_settings` | `setting_value` WHERE `setting_key = 'high_order_value_threshold'` | 500.00 |
| Chat screenshot rate | `app_settings` | `setting_value` WHERE `setting_key = 'screenshot_rate'` | 12.00 |
| Chat screenshot quote min | `app_settings` | `setting_value` WHERE `setting_key = 'screenshot_quote_minimum'` | 120.00 |
| Language multipliers | `languages` | `multiplier` (or `price_multiplier`) per language | varies |
| Certification fees | `certification_types` | `price` | varies |
| Tax rate | `tax_rates` | `rate` per `region_code` | 0.05 (AB) |
| Multi-page volume discount tiers | (in code) | `MULTI_PAGE_DISCOUNTS` constant — present in all 3 edge functions | 2.0 → 5%, 3.0 → 10% |

---

## 14. What sales/CSR should NOT promise

- **Don't promise the volume discount on premium-language quotes.** Korean, Japanese, etc. don't qualify (multiplier > 1.0).
- **Don't promise the discount stacks on partner pricing.** Partners get their own rate; auto-discount is suppressed.
- **Don't quote a flat dollar number for 2 or 3 pages.** It's a percentage of the per-page subtotal — varies with word count and complexity.
- **Don't promise specific turnaround in writing without checking workload.** Same-day is best-effort and depends on translator availability.
- **Don't quote off the per-page rate alone.** Always include certification + tax. Customers comparing "$55" vs Talberta's "$59" should hear the full $78.75 vs Talberta's $61.95 + tax.

---

## 15. Change log

| Date | Change | Source |
|---|---|---|
| 2026-05-04 | Base rate $65 → **$55** (limited time) | `app_settings` row updated |
| 2026-05-04 | i18n strings updated $65 → $55 across 68 rows | `cethosweb_i18n_translations` |
| 2026-05-04 | Multi-page bundle launched: 2 pages = $95 (fixed) | `process-quote-documents` v1.7 |
| 2026-05-04 | Switched to percentage tiers: 2 pg → 5%, 3+ pg → 10%; rolled out to all 3 quote-creation paths | `process-quote-documents` v1.8, `recalculate-quote-pricing` v11, `create-fast-quote` v3 |
| 2026-05-04 | New HITL triggers: `low_billable_ratio` (default <35%) + `high_value_order` (default >$500); customer + admin friendly messages added | `process-quote-documents` v1.9, `QuoteConfirmationPage.tsx`, `AdminQuoteDetail.tsx` |
| 2026-05-04 | Free scanned copy positioning added (vs talberta's $10) | LP copy + this doc |

---

## Appendix A — Production verification log (2026-05-04)

End-to-end tests run on production through the public web form (`cethos.com/services/certified` → `portal.cethos.com/quote` → Stripe live checkout):

| Quote | Test | Billable / Phys | Subtotal | Discount | Total | Triggers fired | Result |
|---|---|---|---|---|---|---|---|
| QT26-10421 | High-value (Spanish, ~2,400 words, dense) | 10.8 / 5 | $594.00 | `auto_multi_page_pct_10` -$59.40 | $561.33 | `high_billable_ratio` + `high_value_order` | ✅ review_required |
| QT26-10422 | Low-ratio (Spanish, 79 words, 12 phys pages) | 1.0 / 12 | $55.00 | — | $57.75 | `low_billable_ratio` (8.3% < 35%) | ✅ review_required |
| QT26-10423 | 2-page volume (Spanish, 487 words, 2 phys pages) | 2.5 / 2 | $137.50 | `auto_multi_page_pct_5` -$6.88 | $137.15 | none | ✅ quote_ready |
| QT26-10424 | 3-page volume (Spanish, 728 words, 3 phys pages) | 3.8 / 3 | $209.00 | `auto_multi_page_pct_10` -$20.90 | $197.51 | none | ✅ quote_ready |

Customer-facing display verified at `/quote/confirmation?reason=<code>` for both `high_value_order` and `low_billable_ratio` reasons. Admin-facing labels verified at `/admin/quotes/<id>` for both quotes.

Test PDFs generated by `.tmp_test_pdfs/gen_review_pdfs.py` and `.tmp_test_pdfs/gen_volume_pdfs.py` (gitignored — regenerate locally if needed).

---

*Questions? Engineering owns the formula; sales owns the conversation. When in doubt, run the customer's exact word count + language through the Quick Quote tool — never quote a number you computed by hand for non-standard cases.*
