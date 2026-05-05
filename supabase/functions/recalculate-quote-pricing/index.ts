// supabase/functions/recalculate-quote-pricing/index.ts
// Recalculates all pricing fields on a quote by reading from related tables.
// Single source of truth for quote-level pricing aggregation.
// Called by frontend after any change to: turnaround, delivery, certifications, adjustments.
//
// v10 (2026-05-04): Multi-page bundle discount auto-applied via quote_adjustments
//                   before adjustments are aggregated. Tier 1 (active): 2 billable
//                   pages → flat $95. Reason 'auto_multi_page_bundle_2.0p'.
//                   Conditions: language_multiplier === 1.0, no partner override.
// v9 FIX: Also recomputes and writes ai_analysis_results.line_total from
//         billable_pages × base_rate so ar.line_total never drifts from quote totals.
//
// TABLES USED:
//   - turnaround_options   (speed tiers: standard, rush, same_day)
//   - delivery_options     (shipping methods: email, portal, mail, courier)
//   - quote_certifications (quote-level certs)
//   - quote_adjustments    (surcharges and discounts — auto multi-page bundle managed here)
//   - ai_analysis_results  (document-level totals — written back to)

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ============================================================================
// MULTI-PAGE BUNDLE TIER TABLE
// Append more entries here as additional bundles are approved.
// ============================================================================
// Percentage-tier discount (replaces fixed-price bundle).
// Order by minPages DESC so the largest applicable tier wins.
const MULTI_PAGE_DISCOUNTS: Array<{ minPages: number; percentOff: number }> = [
  { minPages: 3.0, percentOff: 10 },
  { minPages: 2.0, percentOff: 5 },
];

async function applyMultiPageBundleDiscount(
  supabaseAdmin: any,
  quoteId: string,
  quote: { source_language_id?: string | null; base_rate_override?: any },
  analysisRows: Array<{ billable_pages: any; base_rate: any; is_excluded?: boolean }>,
): Promise<void> {
  try {
    // Always remove prior auto rows so the recalc reflects fresh state
    await supabaseAdmin
      .from("quote_adjustments")
      .delete()
      .eq("quote_id", quoteId)
      .like("reason", "auto_multi_page_bundle_%");
    await supabaseAdmin
      .from("quote_adjustments")
      .delete()
      .eq("quote_id", quoteId)
      .like("reason", "auto_multi_page_pct_%");

    // Skip when partner override is active
    if (quote?.base_rate_override) return;

    // Skip when source language is non-standard
    let langMult = 1.0;
    if (quote?.source_language_id) {
      const { data: lang } = await supabaseAdmin
        .from("languages")
        .select("price_multiplier, multiplier")
        .eq("id", quote.source_language_id)
        .single();
      langMult = parseFloat(lang?.price_multiplier ?? lang?.multiplier ?? "1.0");
    }
    if (langMult !== 1.0) return;

    // Sum total billable pages across non-excluded analysis rows
    const totalBillable = (analysisRows || [])
      .filter((r) => !r.is_excluded)
      .reduce((s, r) => s + (parseFloat(r.billable_pages) || 0), 0);

    const representativeRate = (analysisRows || [])
      .filter((r) => !r.is_excluded)
      .reduce(
        (max, r) => Math.max(max, parseFloat(r.base_rate) || 0),
        0,
      );

    const tier = MULTI_PAGE_DISCOUNTS.find(
      (t) => totalBillable >= t.minPages - 0.001,
    );
    if (!tier || representativeRate <= 0) return;

    const baseline = totalBillable * representativeRate;
    const discount =
      Math.round(((baseline * tier.percentOff) / 100) * 100) / 100;
    if (discount <= 0) return;

    await supabaseAdmin.from("quote_adjustments").insert({
      quote_id: quoteId,
      adjustment_type: "discount",
      value_type: "fixed",
      value: discount,
      calculated_amount: discount,
      reason: `auto_multi_page_pct_${tier.percentOff}`,
    });

    console.log(
      `  💰 Multi-page volume discount: ${totalBillable.toFixed(1)} pages → ${tier.percentOff}% off ($${discount.toFixed(2)})`,
    );
  } catch (e: any) {
    console.error(
      "  ⚠️ Multi-page bundle discount failed (non-blocking):",
      e?.message,
    );
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // ── Auth ──────────────────────────────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing authorization" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const {
      data: { user },
      error: userError,
    } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ── Parse request ────────────────────────────────────────────────────
    const { quoteId } = await req.json();

    if (!quoteId) {
      return new Response(
        JSON.stringify({ success: false, error: "quoteId required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log(`💰 Recalculating pricing for quote ${quoteId}`);

    // ====================================================================
    // Step 1: Fetch the quote (now includes source_language_id + base_rate_override)
    // ====================================================================

    const { data: quote, error: quoteError } = await supabaseAdmin
      .from("quotes")
      .select(
        "id, turnaround_option_id, turnaround_type, tax_rate, tax_rate_id, physical_delivery_option_id, service_province, source_language_id, base_rate_override"
      )
      .eq("id", quoteId)
      .single();

    if (quoteError || !quote) {
      return new Response(
        JSON.stringify({ success: false, error: "Quote not found" }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // ====================================================================
    // Step 2: Recompute and write back per-document translation costs
    //
    // CORE FIX: billable_pages and base_rate are the true source of truth.
    // We recompute line_total = billable_pages × base_rate + certification_price
    // and write it back to ai_analysis_results so it never drifts.
    // ====================================================================

    const { data: analysisRows, error: analysisError } = await supabaseAdmin
      .from("ai_analysis_results")
      .select("id, billable_pages, base_rate, certification_price, is_excluded")
      .eq("quote_id", quoteId);

    if (analysisError) {
      throw new Error(
        `Failed to fetch analysis results: ${analysisError.message}`
      );
    }

    let translationTotal = 0;
    let docCertificationTotal = 0;

    for (const row of analysisRows || []) {
      const billablePages = parseFloat(row.billable_pages) || 0;
      const baseRate = parseFloat(row.base_rate) || 0;
      const certPrice = parseFloat(row.certification_price) || 0;

      // Recompute from first principles
      const translationCost = parseFloat((billablePages * baseRate).toFixed(2));
      const newLineTotal = parseFloat((translationCost + certPrice).toFixed(2));

      // Write back the corrected line_total so the frontend document row is accurate
      const { error: arUpdateError } = await supabaseAdmin
        .from("ai_analysis_results")
        .update({
          line_total: newLineTotal,
          updated_at: new Date().toISOString(),
        })
        .eq("id", row.id);

      if (arUpdateError) {
        console.error(`⚠️ Failed to update ar row ${row.id}: ${arUpdateError.message}`);
        // Non-fatal — continue aggregating from freshly computed values
      }

      if (!row.is_excluded) {
        translationTotal += translationCost;
        docCertificationTotal += certPrice;
      }
    }

    // ====================================================================
    // Step 2.5: Auto multi-page bundle discount (NEW v10)
    // Inserts/refreshes the auto-discount row in quote_adjustments BEFORE
    // adjustments are aggregated below. The aggregator will pick it up.
    // ====================================================================

    await applyMultiPageBundleDiscount(supabaseAdmin, quoteId, quote, analysisRows || []);

    // ====================================================================
    // Step 3: Quote-level certifications
    // ====================================================================

    const { data: quoteCerts, error: quoteCertsError } = await supabaseAdmin
      .from("quote_certifications")
      .select("price, quantity")
      .eq("quote_id", quoteId);

    if (quoteCertsError) {
      console.error("⚠️ Failed to fetch quote certifications:", quoteCertsError);
    }

    let quoteCertTotal = 0;
    for (const cert of quoteCerts || []) {
      quoteCertTotal += (parseFloat(cert.price) || 0) * (cert.quantity || 1);
    }

    // ====================================================================
    // Step 4: Certification total and subtotal
    // ====================================================================

    const certificationTotal = docCertificationTotal + quoteCertTotal;
    const subtotal = parseFloat((translationTotal + certificationTotal).toFixed(2));

    // ====================================================================
    // Step 5: Turnaround / Rush fee — from turnaround_options table
    // ====================================================================

    let rushFee = 0;
    let turnaroundCode = "standard";
    let turnaroundName = "Standard";

    if (quote.turnaround_option_id) {
      const { data: turnaroundOption } = await supabaseAdmin
        .from("turnaround_options")
        .select("code, name, multiplier, fee_type, fee_value")
        .eq("id", quote.turnaround_option_id)
        .single();

      if (turnaroundOption) {
        turnaroundCode = turnaroundOption.code;
        turnaroundName = turnaroundOption.name;

        if (turnaroundOption.code !== "standard") {
          if (turnaroundOption.fee_type === "percentage") {
            const feeValue = parseFloat(turnaroundOption.fee_value) || 0;
            rushFee = parseFloat((subtotal * (feeValue / 100)).toFixed(2));
          } else {
            rushFee = parseFloat(turnaroundOption.fee_value) || 0;
          }
        }
      }
    } else if (quote.turnaround_type && quote.turnaround_type !== "standard") {
      const { data: turnaroundOption } = await supabaseAdmin
        .from("turnaround_options")
        .select("id, code, name, multiplier, fee_type, fee_value")
        .eq("code", quote.turnaround_type)
        .eq("is_active", true)
        .single();

      if (turnaroundOption) {
        turnaroundCode = turnaroundOption.code;
        turnaroundName = turnaroundOption.name;

        if (turnaroundOption.fee_type === "percentage") {
          const feeValue = parseFloat(turnaroundOption.fee_value) || 0;
          rushFee = parseFloat((subtotal * (feeValue / 100)).toFixed(2));
        } else {
          rushFee = parseFloat(turnaroundOption.fee_value) || 0;
        }
      }
    }

    // ====================================================================
    // Step 6: Delivery fee
    // ====================================================================

    let deliveryFee = 0;

    if (quote.physical_delivery_option_id) {
      const { data: deliveryOption } = await supabaseAdmin
        .from("delivery_options")
        .select("price")
        .eq("id", quote.physical_delivery_option_id)
        .single();

      if (deliveryOption) {
        deliveryFee = parseFloat(deliveryOption.price) || 0;
      }
    }

    // ====================================================================
    // Step 7: Adjustments (surcharges and discounts) — now includes auto bundle
    // ====================================================================

    const { data: adjustments, error: adjError } = await supabaseAdmin
      .from("quote_adjustments")
      .select("id, adjustment_type, value_type, value")
      .eq("quote_id", quoteId);

    if (adjError) {
      console.error("⚠️ Failed to fetch adjustments:", adjError);
    }

    let surchargeTotal = 0;
    let discountTotal = 0;

    for (const adj of adjustments || []) {
      const value = parseFloat(adj.value) || 0;
      let calculatedAmount = 0;

      if (adj.value_type === "percentage") {
        calculatedAmount = parseFloat((subtotal * (value / 100)).toFixed(2));
      } else {
        calculatedAmount = value;
      }

      await supabaseAdmin
        .from("quote_adjustments")
        .update({
          calculated_amount: calculatedAmount,
          updated_at: new Date().toISOString(),
        })
        .eq("id", adj.id);

      if (adj.adjustment_type === "surcharge") {
        surchargeTotal += calculatedAmount;
      } else if (adj.adjustment_type === "discount") {
        discountTotal += calculatedAmount;
      }
    }

    // ====================================================================
    // Step 8: Pre-tax total
    // ====================================================================

    const preTax = parseFloat(
      (
        subtotal +
        rushFee +
        deliveryFee +
        surchargeTotal -
        discountTotal
      ).toFixed(2)
    );

    // ====================================================================
    // Step 9: Tax
    // ====================================================================

    const taxRate = parseFloat(quote.tax_rate) || 0.05;
    const taxAmount = parseFloat((preTax * taxRate).toFixed(2));

    // ====================================================================
    // Step 10: Total
    // ====================================================================

    const total = parseFloat((preTax + taxAmount).toFixed(2));

    // ====================================================================
    // Step 11: Update quotes table
    // ====================================================================

    const isRush = turnaroundCode === "rush" || turnaroundCode === "same_day";

    const pricingData = {
      translation_total: parseFloat(translationTotal.toFixed(2)),
      doc_certification_total: parseFloat(docCertificationTotal.toFixed(2)),
      quote_certification_total: parseFloat(quoteCertTotal.toFixed(2)),
      certification_total: parseFloat(certificationTotal.toFixed(2)),
      subtotal: parseFloat(subtotal.toFixed(2)),
      rush_fee: rushFee,
      delivery_fee: deliveryFee,
      surcharge_total: parseFloat(surchargeTotal.toFixed(2)),
      discount_total: parseFloat(discountTotal.toFixed(2)),
      pre_tax: preTax,
      tax_rate: taxRate,
      tax_amount: taxAmount,
      total: total,
      turnaround_code: turnaroundCode,
      turnaround_name: turnaroundName,
    };

    const { error: updateError } = await supabaseAdmin
      .from("quotes")
      .update({
        subtotal: pricingData.subtotal,
        certification_total: pricingData.certification_total,
        rush_fee: pricingData.rush_fee,
        delivery_fee: pricingData.delivery_fee,
        tax_amount: pricingData.tax_amount,
        total: pricingData.total,
        is_rush: isRush,
        turnaround_type: turnaroundCode,
        surcharge_total: pricingData.surcharge_total,
        discount_total: pricingData.discount_total,
        calculated_totals: pricingData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", quoteId);

    if (updateError) {
      throw new Error(`Failed to update quote: ${updateError.message}`);
    }

    console.log(
      `✅ Quote ${quoteId} recalculated: translationTotal=$${pricingData.translation_total}, certTotal=$${pricingData.certification_total}, subtotal=$${pricingData.subtotal}, rush=$${rushFee}, delivery=$${deliveryFee}, surcharge=$${surchargeTotal}, discount=$${discountTotal}, tax=$${taxAmount}, total=$${total}`
    );

    return new Response(
      JSON.stringify({
        success: true,
        pricing: pricingData,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("❌ Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
