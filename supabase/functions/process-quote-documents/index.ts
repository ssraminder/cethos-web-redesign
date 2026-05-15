// ============================================================================
// process-quote-documents v1.7 (Multi-page bundle discount)
// Date: 2026-05-04
// Changes from v1.6:
//   - Auto multi-page bundle discount applied via quote_adjustments before
//     recalculate_quote_from_groups RPC fires.
//     Tier 1 (active): 2 billable pages → flat $95 (saves $15 vs $55/pg).
//     Conditions: language_multiplier === 1.0, no partner override.
//     Reason code: 'auto_multi_page_bundle_2p' (auto-managed: deleted +
//     re-inserted on every recalc so changes propagate).
// Previous changes (v1.6):
//   - Fix D: Per-file billable_pages / page_count ratio check
//     If ratio exceeds app_settings.billable_page_ratio_threshold (default 1.5),
//     tag file as review_required with reason 'high_billable_ratio'
//     and log a descriptive message with actual vs threshold ratio
// Previous changes (v1.5):
//   - Fix C: Log WARNING when KB query returns 0 entries (silent failure detection)
//   - Fix C: Log KB context size per-file before calling Claude
// Previous changes (v1.4):
//   - chat_screenshot document type added to classification prompt
//   - price_multiplier KB override: applies discount to lineTotal after calculation
//   - skip_multi_language_review KB override: bypasses multi-language review flag
//   - Phase 4 grouping: max_tokens bumped 1000 → 2000
//   - Phase 4 grouping: post-Claude validation ensures ALL files assigned
//   - Minimum 1 billable page enforced at edge function level
// Previous changes (v1.3):
//   - Partner pricing override: reads quotes.base_rate_override
// ============================================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { PDFDocument } from "https://esm.sh/pdf-lib@1.17.1";

// ============================================================================
// CONSTANTS
// ============================================================================

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const MAX_PAGES_PER_CHUNK = 10;
const MAX_CHUNK_SIZE_BYTES = 15 * 1024 * 1024;
const OCR_CONFIDENCE_THRESHOLD = 0.85;
const AI_CONFIDENCE_THRESHOLD = 0.85;
const SECONDARY_LANGUAGE_THRESHOLD = 20;
const WORDS_PER_PAGE_DEFAULT = 225;
const BASE_RATE_DEFAULT = 65.0;
const KB_CONTEXT_MAX_CHARS = 4000;
const BILLABLE_RATIO_THRESHOLD_DEFAULT = 1.5;
const LOW_BILLABLE_RATIO_THRESHOLD_DEFAULT = 0.35;
const HIGH_ORDER_VALUE_THRESHOLD_DEFAULT = 500.0;

const COMPLEXITY_MULTIPLIERS: Record<string, number> = {
  easy: 1.0,
  medium: 1.15,
  hard: 1.25,
};

const SUPPORTED_MIME_TYPES = new Set([
  "application/pdf",
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/tiff",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
]);

const PDF_MIME_TYPES = new Set(["application/pdf"]);

const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/tiff",
]);

// ============================================================================
// HELPER: Auto multi-page bundle discount
// ----------------------------------------------------------------------------
// Tier table — when total billable_pages across all non-excluded groups
// matches a tier exactly, charge the bundle price instead of pages × base_rate.
// Append more entries here when more bundles are approved.
// ============================================================================

// Percentage-tier discount (replaces fixed-price bundle).
// Tier list MUST be ordered by minPages DESC so the largest applicable
// tier wins. 2.0 ≤ billable < 3.0 → 5%, 3.0+ → 10%.
const MULTI_PAGE_DISCOUNTS: Array<{ minPages: number; percentOff: number }> = [
  { minPages: 3.0, percentOff: 10 },
  { minPages: 2.0, percentOff: 5 },
];

async function applyMultiPageBundleDiscount(
  supabaseAdmin: any,
  quoteId: string,
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

    const { data: quote } = await supabaseAdmin
      .from("quotes")
      .select("id, source_language_id, base_rate_override")
      .eq("id", quoteId)
      .single();
    if (!quote) return;

    // Skip when partner override is active — they have their own pricing
    if (quote.base_rate_override) return;

    // Skip when source language is non-standard (premium-language stack)
    let langMult = 1.0;
    if (quote.source_language_id) {
      const { data: lang } = await supabaseAdmin
        .from("languages")
        .select("price_multiplier")
        .eq("id", quote.source_language_id)
        .single();
      langMult = parseFloat(lang?.price_multiplier ?? "1.0");
    }
    if (langMult !== 1.0) return;

    // Sum total billable pages across groups (recalculate_quote_from_groups
    // sources its totals from the same table, so we stay in lockstep)
    const { data: groups } = await supabaseAdmin
      .from("quote_document_groups")
      .select("billable_pages, base_rate")
      .eq("quote_id", quoteId);
    if (!groups || groups.length === 0) return;

    const totalBillable = groups.reduce(
      (s: number, g: any) => s + parseFloat(g.billable_pages ?? "0"),
      0,
    );
    const representativeRate = groups.reduce(
      (max: number, g: any) =>
        Math.max(max, parseFloat(g.base_rate ?? "0")),
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

// ============================================================================
// HELPER: Recalculate quote totals with retry and verification
// ============================================================================

async function recalculateQuoteTotalsWithRetry(
  supabaseAdmin: any,
  quoteId: string,
  maxRetries: number = 3
): Promise<boolean> {
  // Apply auto multi-page bundle discount first so the SQL recalc rolls it up
  await applyMultiPageBundleDiscount(supabaseAdmin, quoteId);

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      if (attempt === 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }

      const { error: rpcError } = await supabaseAdmin.rpc(
        "recalculate_quote_from_groups",
        { p_quote_id: quoteId }
      );

      if (rpcError) {
        console.error(`  ⚠️ RPC attempt ${attempt}/${maxRetries} failed:`, rpcError.message);
        if (attempt === maxRetries) {
          console.error(`  ❌ All RPC retries exhausted for quote ${quoteId}`);
          return false;
        }
        continue;
      }

      const { data: verifyQuote, error: verifyError } = await supabaseAdmin
        .from("quotes")
        .select("subtotal")
        .eq("id", quoteId)
        .single();

      if (verifyError) {
        console.error(`  ⚠️ Verification query failed:`, verifyError.message);
        continue;
      }

      const subtotal = parseFloat(verifyQuote?.subtotal || "0");

      if (subtotal > 0) {
        console.log(`  ✅ Quote totals verified: subtotal = $${subtotal.toFixed(2)} (attempt ${attempt})`);
        return true;
      }

      const { data: groups } = await supabaseAdmin
        .from("quote_document_groups")
        .select("id, line_total")
        .eq("quote_id", quoteId);

      const groupTotal = (groups || []).reduce(
        (sum: number, g: any) => sum + parseFloat(g.line_total || "0"),
        0
      );

      if (groupTotal === 0) {
        console.log(`  ⚠️ Groups also show $0 total — trigger may not have completed (attempt ${attempt})`);
        continue;
      }

      console.log(`  ⚠️ Groups total $${groupTotal.toFixed(2)} but quote subtotal is $0 — retrying (attempt ${attempt})`);
    } catch (err: any) {
      console.error(`  ⚠️ RPC attempt ${attempt} exception:`, err.message);
      if (attempt === maxRetries) return false;
    }
  }

  return false;
}

// ============================================================================
// HELPER: Normalize language code
// ============================================================================

function normalizeLanguageCode(code: string): string {
  if (!code) return '';
  return code.split('-')[0].split('_')[0].toLowerCase();
}

// ============================================================================
// HELPER: Notify staff
// ============================================================================

async function notifyStaffReviewRequired(
  quoteId: string,
  quoteNumber: string
): Promise<void> {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) return;

    const response = await fetch(
      `${supabaseUrl}/functions/v1/send-staff-notification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${serviceRoleKey}`,
        },
        body: JSON.stringify({
          quote_id: quoteId,
          trigger_type: "review_required",
          quote_number: quoteNumber,
        }),
      }
    );

    console.log(`  📧 Staff notification sent: ${response.status}`);
  } catch (notifError) {
    console.error("  ⚠️ Staff notification failed (non-blocking):", notifError);
  }
}

// ============================================================================
// TYPES
// ============================================================================

interface QuoteFile {
  id: string;
  quote_id: string;
  original_filename: string;
  storage_path: string;
  file_size: number;
  mime_type: string;
  ai_processing_status: string;
}

interface ProcessingResult {
  fileId: string;
  filename: string;
  status: "completed" | "review_required" | "failed";
  reasons: string[];
  pageCount: number;
  wordCount: number;
  translatableWordCount: number;
  ocrConfidence: number;
  aiConfidence: number;
  ocrBatchFileId?: string;
}

interface LanguageBreakdown {
  code: string;
  name: string;
  estimated_word_count: number;
  percentage: number;
}

interface ClaudeAnalysis {
  language: {
    primary: { code: string; name: string; confidence: number };
    all_detected: LanguageBreakdown[];
    total_word_count: number;
  };
  documentType: {
    type: string;
    confidence: number;
    other?: string;
  };
  complexity: {
    level: string;
    confidence: number;
    factors: string[];
  };
  holder: {
    name: string;
    name_normalized: string;
    dob: string;
    document_number: string;
    issuing_country: string;
    confidence: number;
  };
  translatable_word_count: number;
}

interface KBEntry {
  id: string;
  entry_type: string;
  category: string;
  source_language: string | null;
  target_language: string | null;
  document_type: string | null;
  title: string;
  knowledge_text: string;
  override_field: string | null;
  override_value: string | null;
  override_confidence: number | null;
  priority: number;
  is_active: boolean;
  source: string;
}

interface KBOverrideResult {
  appliedOverrideIds: string[];
  overridesLog: string[];
  priceMultiplier: number;
  skipMultiLanguageReview: boolean;
}

interface BilingualCheckResult {
  isExpected: boolean;
  detectedSecondary: string | null;
  expectedLanguages: string[];
  kbEntryId: string | null;
  kbEntryTitle: string | null;
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }

  const startTime = Date.now();

  try {
    const { quoteId } = await req.json();
    if (!quoteId) {
      return new Response(
        JSON.stringify({ error: "quoteId is required" }),
        { status: 400, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    console.log(`\n${"=".repeat(60)}`);
    console.log(`process-quote-documents v1.7 — Quote: ${quoteId}`);
    console.log(`${"=".repeat(60)}`);

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // ========================================================================
    // LOAD QUOTE + SETTINGS
    // ========================================================================

    const { data: quote, error: quoteError } = await supabaseAdmin
      .from("quotes")
      .select(`
        id,
        quote_number,
        source_language_id,
        target_language_id,
        processing_status,
        status,
        base_rate_override,
        partner_id,
        partner_code
      `)
      .eq("id", quoteId)
      .single();

    if (quoteError || !quote) {
      console.error("❌ Quote not found:", quoteError);
      return new Response(
        JSON.stringify({ error: "Quote not found" }),
        { status: 404, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    let sourceLanguageCode = "";
    let sourceLanguageName = "";
    if (quote.source_language_id) {
      const { data: srcLang } = await supabaseAdmin
        .from("languages")
        .select("code, name")
        .eq("id", quote.source_language_id)
        .single();
      if (srcLang) {
        sourceLanguageCode = srcLang.code;
        sourceLanguageName = srcLang.name;
      }
    }

    const { data: settingsRows } = await supabaseAdmin
      .from("app_settings")
      .select("setting_key, setting_value")
      .in("setting_key", [
        "base_rate_per_page",
        "words_per_page",
        "base_rate",
        "billable_page_ratio_threshold",  // v1.6
        "low_billable_ratio_threshold",   // v1.9
        "high_order_value_threshold",     // v1.9
      ]);

    const settings: Record<string, string> = {};
    (settingsRows || []).forEach((s: any) => {
      settings[s.setting_key] = s.setting_value;
    });

    const wordsPerPage = parseFloat(settings["words_per_page"] || String(WORDS_PER_PAGE_DEFAULT));
    const appBaseRate = parseFloat(settings["base_rate_per_page"] || settings["base_rate"] || String(BASE_RATE_DEFAULT));
    const baseRate = quote.base_rate_override
      ? parseFloat(String(quote.base_rate_override))
      : appBaseRate;

    // v1.6: Load ratio threshold from settings, fall back to constant
    const billableRatioThreshold = parseFloat(
      settings["billable_page_ratio_threshold"] || String(BILLABLE_RATIO_THRESHOLD_DEFAULT)
    );
    // v1.9: Low-billable-ratio + high-order-value review thresholds
    const lowBillableRatioThreshold = parseFloat(
      settings["low_billable_ratio_threshold"] || String(LOW_BILLABLE_RATIO_THRESHOLD_DEFAULT)
    );
    const highOrderValueThreshold = parseFloat(
      settings["high_order_value_threshold"] || String(HIGH_ORDER_VALUE_THRESHOLD_DEFAULT)
    );

    console.log(`📋 Source language: ${sourceLanguageName || "(not set)"} (${sourceLanguageCode || "?"})`);
    console.log(`📋 Words/page: ${wordsPerPage}, Base rate: $${baseRate}${quote.base_rate_override ? ` (partner override)` : ""}`);
    console.log(`📋 Billable ratio thresholds: low<${lowBillableRatioThreshold}x, high>${billableRatioThreshold}x`);
    console.log(`📋 High order value threshold: $${highOrderValueThreshold.toFixed(2)}`);
    if (quote.partner_code) console.log(`🤝 Partner quote: ${quote.partner_code}`);

    // ========================================================================
    // PHASE 0: FILE CONSOLIDATION
    // ========================================================================

    console.log(`\n--- PHASE 0: File Consolidation ---`);

    const { data: pendingFiles, error: filesError } = await supabaseAdmin
      .from("quote_files")
      .select("id, quote_id, original_filename, storage_path, file_size, mime_type, ai_processing_status")
      .eq("quote_id", quoteId)
      .eq("ai_processing_status", "pending")
      .is("deleted_at", null);

    if (filesError || !pendingFiles || pendingFiles.length === 0) {
      console.log("⚠️ No pending files found. Setting quote_ready.");
      await supabaseAdmin
        .from("quotes")
        .update({ processing_status: "quote_ready" })
        .eq("id", quoteId);
      return new Response(
        JSON.stringify({ success: true, message: "No files to process" }),
        { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    const pdfFiles: QuoteFile[] = [];
    const nonPdfFiles: QuoteFile[] = [];
    const unsupportedFiles: QuoteFile[] = [];

    for (const file of pendingFiles) {
      if (PDF_MIME_TYPES.has(file.mime_type)) {
        pdfFiles.push(file);
      } else if (SUPPORTED_MIME_TYPES.has(file.mime_type)) {
        nonPdfFiles.push(file);
      } else {
        unsupportedFiles.push(file);
      }
    }

    console.log(`  📄 PDFs: ${pdfFiles.length}, Non-PDFs: ${nonPdfFiles.length}, Unsupported: ${unsupportedFiles.length}`);

    for (const file of unsupportedFiles) {
      await supabaseAdmin
        .from("quote_files")
        .update({ ai_processing_status: "review_required" })
        .eq("id", file.id);
      console.log(`  ⚠️ Unsupported format: ${file.original_filename} (${file.mime_type})`);
    }

    let combinedPdfFile: QuoteFile | null = null;

    if (nonPdfFiles.length > 0) {
      console.log(`  🔄 Consolidating ${nonPdfFiles.length} non-PDF file(s)...`);

      try {
        const combinedPdf = await PDFDocument.create();
        const processedSourceIds: string[] = [];

        for (const file of nonPdfFiles) {
          try {
            const { data: fileData, error: downloadError } = await supabaseAdmin
              .storage
              .from("quote-files")
              .download(file.storage_path);

            if (downloadError || !fileData) {
              console.error(`  ❌ Failed to download ${file.original_filename}:`, downloadError);
              await supabaseAdmin
                .from("quote_files")
                .update({ ai_processing_status: "review_required" })
                .eq("id", file.id);
              continue;
            }

            const fileBytes = new Uint8Array(await fileData.arrayBuffer());

            if (IMAGE_MIME_TYPES.has(file.mime_type)) {
              let image;
              if (file.mime_type === "image/png") {
                image = await combinedPdf.embedPng(fileBytes);
              } else {
                image = await combinedPdf.embedJpg(fileBytes);
              }
              const page = combinedPdf.addPage([image.width, image.height]);
              page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
              processedSourceIds.push(file.id);
            } else if (file.mime_type.includes("wordprocessingml")) {
              const text = await extractDocxText(fileBytes);
              addTextPage(combinedPdf, text, file.original_filename);
              processedSourceIds.push(file.id);
            } else if (file.mime_type.includes("spreadsheetml") || file.mime_type === "text/csv") {
              const text = file.mime_type === "text/csv"
                ? new TextDecoder().decode(fileBytes)
                : await extractXlsxText(fileBytes);
              addTextPage(combinedPdf, text, file.original_filename);
              processedSourceIds.push(file.id);
            }
          } catch (fileErr: any) {
            console.error(`  ❌ Failed to process ${file.original_filename}:`, fileErr.message);
            await supabaseAdmin
              .from("quote_files")
              .update({ ai_processing_status: "review_required" })
              .eq("id", file.id);
          }
        }

        if (combinedPdf.getPageCount() > 0) {
          const combinedBytes = await combinedPdf.save();
          const combinedPath = `quotes/${quoteId}/combined_${Date.now()}.pdf`;

          const { error: uploadError } = await supabaseAdmin
            .storage
            .from("quote-files")
            .upload(combinedPath, new Uint8Array(combinedBytes), { contentType: "application/pdf" });

          if (!uploadError) {
            const { data: combinedRecord, error: recordError } = await supabaseAdmin
              .from("quote_files")
              .insert({
                quote_id: quoteId,
                original_filename: `combined_documents.pdf`,
                storage_path: combinedPath,
                file_size: combinedBytes.byteLength,
                mime_type: "application/pdf",
                ai_processing_status: "pending",
                is_combined: true,
                source_file_ids: processedSourceIds,
              })
              .select()
              .single();

            if (!recordError && combinedRecord) {
              combinedPdfFile = combinedRecord;
              console.log(`  ✅ Combined PDF created: ${combinedPdf.getPageCount()} pages`);
              for (const sourceId of processedSourceIds) {
                await supabaseAdmin
                  .from("quote_files")
                  .update({ ai_processing_status: "skipped" })
                  .eq("id", sourceId);
              }
            }
          }
        }
      } catch (consolidationError) {
        console.error("  ❌ File consolidation failed:", consolidationError);
        for (const file of nonPdfFiles) {
          await supabaseAdmin
            .from("quote_files")
            .update({ ai_processing_status: "review_required" })
            .eq("id", file.id);
        }
      }
    }

    const filesToProcess: QuoteFile[] = [...pdfFiles];
    if (combinedPdfFile) filesToProcess.push(combinedPdfFile);

    console.log(`  📄 Files to OCR: ${filesToProcess.length}`);

    if (filesToProcess.length === 0) {
      await setFinalQuoteStatus(supabaseAdmin, quoteId, [], unsupportedFiles.length > 0 || nonPdfFiles.length > 0);
      if (unsupportedFiles.length > 0 || nonPdfFiles.length > 0) {
        await notifyStaffReviewRequired(quoteId, quote.quote_number);
      }
      return new Response(
        JSON.stringify({ success: true, message: "No processable files" }),
        { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    // ========================================================================
    // PHASE 1: CREATE OCR BATCH
    // ========================================================================

    console.log(`\n--- PHASE 1: Create OCR Batch ---`);

    const { data: batch, error: batchError } = await supabaseAdmin
      .from("ocr_batches")
      .insert({
        quote_id: quoteId,
        status: "processing",
        total_files: filesToProcess.length,
        completed_files: 0,
        failed_files: 0,
        total_pages: 0,
        total_words: 0,
        staff_name: "system",
        staff_email: "auto@cethos.com",
        notes: `Auto-processing for quote ${quoteId}`,
      })
      .select()
      .single();

    if (batchError || !batch) {
      console.error("❌ Failed to create batch:", batchError);
      throw new Error("Failed to create OCR batch");
    }

    console.log(`  ✅ Batch created: ${batch.id}`);

    const { data: analysisJob, error: jobError } = await supabaseAdmin
      .from("ocr_ai_analysis_jobs")
      .insert({
        batch_id: batch.id,
        status: "processing",
        selected_file_ids: filesToProcess.map((f) => f.id),
        total_files: filesToProcess.length,
        completed_files: 0,
        failed_files: 0,
        is_background: false,
        created_by_name: "system",
        created_by_email: "auto@cethos.com",
      })
      .select()
      .single();

    if (jobError || !analysisJob) {
      console.error("⚠️ Failed to create analysis job record:", jobError);
    } else {
      console.log(`  ✅ Analysis job created: ${analysisJob.id}`);
    }

    // ========================================================================
    // PHASE 2 & 3: OCR + AI ANALYSIS (per file)
    // ========================================================================

    const processingResults: ProcessingResult[] = [];

    const { data: promptRow } = await supabaseAdmin
      .from("ai_prompts")
      .select("prompt_text")
      .eq("prompt_key", "document_classification_v37")
      .eq("is_active", true)
      .single();

    const classificationPrompt = promptRow?.prompt_text || getDefaultClassificationPrompt();

    if (promptRow?.prompt_text) {
      console.log(`  📝 Prompt: document_classification_v37 loaded from DB`);
    } else {
      console.log(`  ⚠️ Prompt: document_classification_v37 NOT found in DB — using hardcoded fallback`);
    }

    let allKBEntries: KBEntry[] = [];

    try {
      let kbQuery = supabaseAdmin
        .from("ai_knowledge_base")
        .select("*")
        .eq("is_active", true)
        .order("priority", { ascending: false });

      if (sourceLanguageCode) {
        const normalizedCode = normalizeLanguageCode(sourceLanguageCode);
        kbQuery = kbQuery.or(`source_language.is.null,source_language.eq.${normalizedCode}`);
      }

      const { data: kbData, error: kbError } = await kbQuery;

      if (kbError) {
        console.error("  ❌ KB query FAILED:", kbError.message);
      } else {
        allKBEntries = (kbData || []) as KBEntry[];
      }
    } catch (kbErr: any) {
      console.error("  ❌ KB query EXCEPTION:", kbErr.message);
    }

    const contextEntries = allKBEntries.filter((e) => e.entry_type === "context");
    const overrideEntries = allKBEntries.filter((e) => e.entry_type === "override");

    if (allKBEntries.length === 0) {
      console.error(`  🚨 KB EMPTY WARNING: 0 entries loaded from ai_knowledge_base. Claude prompt will have NO KB context. Check: (1) is_active=true rows exist, (2) source_language filter not too restrictive, (3) DB connection healthy. Quote: ${quoteId}`);
    } else {
      console.log(`  📚 KB entries loaded: ${allKBEntries.length} total (${contextEntries.length} context, ${overrideEntries.length} override)`);
    }

    const kbContext = buildKnowledgeBaseContext(contextEntries);

    if (kbContext.length > 0) {
      console.log(`  📚 KB context built: ${kbContext.length} chars from ${contextEntries.length} context entries`);
    } else {
      console.log(`  ⚠️ KB context is EMPTY — no context entries will be injected into Claude prompt`);
    }

    let googleAccessToken: string;
    try {
      googleAccessToken = await getGoogleAccessToken();
    } catch (authErr) {
      console.error("❌ Google auth failed:", authErr);
      for (const file of filesToProcess) {
        await supabaseAdmin
          .from("quote_files")
          .update({ ai_processing_status: "review_required" })
          .eq("id", file.id);
      }
      await setFinalQuoteStatus(supabaseAdmin, quoteId, [], true);
      await notifyStaffReviewRequired(quoteId, quote.quote_number);
      return new Response(
        JSON.stringify({ success: false, error: "Google auth failed" }),
        { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
      );
    }

    for (const file of filesToProcess) {
      console.log(`\n--- Processing: ${file.original_filename} ---`);
      const fileStartTime = Date.now();
      const reviewReasons: string[] = [];
      let fileStatus: "completed" | "review_required" | "failed" = "completed";

      await supabaseAdmin
        .from("quote_files")
        .update({ ai_processing_status: "processing" })
        .eq("id", file.id);

      const { data: batchFile, error: batchFileError } = await supabaseAdmin
        .from("ocr_batch_files")
        .insert({
          batch_id: batch.id,
          quote_file_id: file.id,
          filename: file.original_filename,
          storage_path: file.storage_path,
          status: "pending",
          file_size: file.file_size,
          queued_at: new Date().toISOString(),
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (batchFileError || !batchFile) {
        console.error(`  ❌ Failed to create batch file record:`, batchFileError);
        fileStatus = "failed";
        reviewReasons.push("ocr_failed");
        processingResults.push({
          fileId: file.id,
          filename: file.original_filename,
          status: fileStatus,
          reasons: reviewReasons,
          pageCount: 0,
          wordCount: 0,
          translatableWordCount: 0,
          ocrConfidence: 0,
          aiConfidence: 0,
        });
        await supabaseAdmin
          .from("quote_files")
          .update({ ai_processing_status: "review_required" })
          .eq("id", file.id);
        continue;
      }

      // ====================================================================
      // PHASE 2: OCR
      // ====================================================================

      let ocrText = "";
      let totalWordCount = 0;
      let totalPageCount = 0;
      let avgOcrConfidence = 0;
      const pageResults: Array<{
        pageNumber: number;
        wordCount: number;
        characterCount: number;
        rawText: string;
        confidence: number;
      }> = [];

      try {
        const { data: pdfData, error: pdfDownloadError } = await supabaseAdmin
          .storage
          .from("quote-files")
          .download(file.storage_path);

        if (pdfDownloadError || !pdfData) {
          throw new Error(`Download failed: ${pdfDownloadError?.message || "No data"}`);
        }

        const pdfBytes = new Uint8Array(await pdfData.arrayBuffer());
        const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
        totalPageCount = pdfDoc.getPageCount();
        console.log(`  📄 Pages: ${totalPageCount}`);

        const chunks = await splitPdfIntoChunks(pdfBytes, pdfDoc, totalPageCount);
        console.log(`  📦 Chunks: ${chunks.length}`);

        let pageOffset = 0;

        for (let chunkIdx = 0; chunkIdx < chunks.length; chunkIdx++) {
          const chunk = chunks[chunkIdx];

          if (chunk.bytes.length > MAX_CHUNK_SIZE_BYTES) {
            console.log(`  ⚠️ Chunk ${chunkIdx + 1} too large`);
            reviewReasons.push("file_too_large");
            fileStatus = "review_required";
            for (let p = 0; p < chunk.pageCount; p++) {
              pageResults.push({
                pageNumber: pageOffset + p + 1,
                wordCount: 0, characterCount: 0,
                rawText: "[CHUNK TOO LARGE — SKIPPED]", confidence: 0,
              });
            }
            pageOffset += chunk.pageCount;
            continue;
          }

          try {
            const ocrResult = await callDocumentAI(googleAccessToken, chunk.bytes, sourceLanguageCode);
            for (let p = 0; p < ocrResult.pages.length; p++) {
              const page = ocrResult.pages[p];
              pageResults.push({
                pageNumber: pageOffset + p + 1,
                wordCount: page.wordCount,
                characterCount: page.characterCount,
                rawText: (page.text || "").substring(0, 50000),
                confidence: page.confidence,
              });
              ocrText += page.text + "\n\n";
              totalWordCount += page.wordCount;
            }
            console.log(`    ✅ Chunk ${chunkIdx + 1}: ${ocrResult.pages.length} pages, ${ocrResult.totalWords} words`);
          } catch (ocrError: any) {
            console.error(`    ❌ OCR failed for chunk ${chunkIdx + 1}:`, ocrError.message);
            reviewReasons.push("ocr_failed");
            fileStatus = "review_required";
            for (let p = 0; p < chunk.pageCount; p++) {
              pageResults.push({
                pageNumber: pageOffset + p + 1,
                wordCount: 0, characterCount: 0,
                rawText: `[OCR ERROR: ${ocrError.message}]`, confidence: 0,
              });
            }
          }
          pageOffset += chunk.pageCount;
        }

        const confidenceValues = pageResults.filter((p) => p.confidence > 0).map((p) => p.confidence);
        avgOcrConfidence = confidenceValues.length > 0
          ? confidenceValues.reduce((a, b) => a + b, 0) / confidenceValues.length
          : 0;

        console.log(`  📊 OCR: ${totalPageCount} pages, ${totalWordCount} words, confidence: ${avgOcrConfidence.toFixed(3)}`);

        if (avgOcrConfidence > 0 && avgOcrConfidence < OCR_CONFIDENCE_THRESHOLD) {
          console.log(`  ⚠️ Low OCR confidence: ${avgOcrConfidence.toFixed(3)}`);
          reviewReasons.push("low_ocr_confidence");
          fileStatus = "review_required";
        }
      } catch (ocrPhaseError: any) {
        console.error(`  ❌ OCR phase failed:`, ocrPhaseError.message);
        reviewReasons.push(
          ocrPhaseError.message?.includes("encrypt") || ocrPhaseError.message?.includes("password")
            ? "file_unreadable" : "ocr_failed"
        );
        fileStatus = "review_required";
      }

      if (pageResults.length > 0) {
        const batchResultRecords = pageResults.map((p) => ({
          file_id: batchFile.id,
          page_number: p.pageNumber,
          word_count: p.wordCount,
          character_count: p.characterCount,
          raw_text: p.rawText,
          confidence_score: p.confidence || null,
        }));

        await supabaseAdmin.from("ocr_batch_results").insert(batchResultRecords);
        await supabaseAdmin.from("quote_pages").delete().eq("quote_file_id", file.id);

        const quotePageRecords = pageResults.map((p) => ({
          quote_file_id: file.id,
          page_number: p.pageNumber,
          word_count: p.wordCount,
          ocr_raw_text: p.rawText,
          ocr_confidence: p.confidence || null,
        }));

        await supabaseAdmin.from("quote_pages").insert(quotePageRecords);
      }

      await supabaseAdmin
        .from("ocr_batch_files")
        .update({
          status: fileStatus === "failed" ? "failed" : "completed",
          page_count: totalPageCount,
          word_count: totalWordCount,
          processing_time_ms: Date.now() - fileStartTime,
          completed_at: new Date().toISOString(),
          error_message: reviewReasons.length > 0 ? reviewReasons.join(", ") : null,
        })
        .eq("id", batchFile.id);

      // ====================================================================
      // PHASE 3: AI ANALYSIS
      // ====================================================================

      console.log(`\n  --- Phase 3: AI Analysis ---`);

      if (kbContext.length > 0) {
        console.log(`  📚 Injecting KB context into Claude prompt: ${kbContext.length} chars, ${contextEntries.length} entries, ${overrideEntries.length} overrides`);
      } else {
        console.log(`  🚨 NO KB CONTEXT for this file — Claude will analyse without knowledge base guidance. File: ${file.original_filename}`);
      }

      let analysis: ClaudeAnalysis | null = null;
      let translatableWordCount = totalWordCount;
      let aiConfidence = 0;
      let fileKBEntriesApplied: string[] = [];
      let priceMultiplier = 1.0;
      let skipMultiLanguageReview = false;

      if (ocrText.trim().length > 0 && fileStatus !== "failed") {
        try {
          analysis = await callClaudeAnalysis(
            ocrText, classificationPrompt, kbContext,
            sourceLanguageCode, sourceLanguageName, totalWordCount
          );

          if (analysis) {
            // Only fold in confidences Claude actually returned.
            // Earlier `|| 0` fallback treated a missing field as zero
            // confidence — Claude commonly omits language.primary.confidence
            // (because the language is obvious from OCR), and that single
            // omission dragged aiConfidence to 0 → false-positive review
            // on every otherwise-fine document.
            const reported = [
              analysis.language.primary.confidence,
              analysis.documentType.confidence,
              analysis.complexity.confidence,
            ].filter((c): c is number => typeof c === "number" && c > 0);
            aiConfidence = reported.length > 0 ? Math.min(...reported) : 1.0;

            console.log(`  📊 AI: type=${analysis.documentType.type}, complexity=${analysis.complexity.level}, confidence=${aiConfidence.toFixed(3)}`);

            const overrideResult = applyKBOverrides(
              analysis, overrideEntries, sourceLanguageCode, analysis.documentType.type
            );

            priceMultiplier = overrideResult.priceMultiplier;
            skipMultiLanguageReview = overrideResult.skipMultiLanguageReview;

            if (overrideResult.appliedOverrideIds.length > 0) {
              console.log(`  📚 KB overrides applied: ${overrideResult.appliedOverrideIds.length}`);
              for (const log of overrideResult.overridesLog) {
                console.log(`    → ${log}`);
              }
              fileKBEntriesApplied.push(...overrideResult.appliedOverrideIds);
            }

            if (priceMultiplier !== 1.0) {
              console.log(`  💸 Price multiplier: ${priceMultiplier} (${((1 - priceMultiplier) * 100).toFixed(0)}% discount)`);
            }
            if (skipMultiLanguageReview) {
              console.log(`  ✅ Multi-language review suppressed by KB override`);
            }

            fileKBEntriesApplied.push(...contextEntries.map((e) => e.id));

            if (sourceLanguageCode && analysis.language.all_detected?.length > 0) {
              const sourceEntry = analysis.language.all_detected.find(
                (l) => normalizeLanguageCode(l.code) === normalizeLanguageCode(sourceLanguageCode)
              );
              if (sourceEntry) {
                translatableWordCount = sourceEntry.estimated_word_count;
                console.log(`  📊 Translatable (${sourceLanguageCode}): ${translatableWordCount} of ${totalWordCount} total`);
              } else {
                translatableWordCount = analysis.translatable_word_count || totalWordCount;
              }
            } else {
              translatableWordCount = analysis.translatable_word_count || totalWordCount;
            }

            if (aiConfidence < AI_CONFIDENCE_THRESHOLD) {
              console.log(`  ⚠️ Low AI confidence: ${aiConfidence.toFixed(3)}`);
              if (!reviewReasons.includes("low_ai_confidence")) reviewReasons.push("low_ai_confidence");
              fileStatus = "review_required";
            }

            const secondaryPercentage = calculateSecondaryLanguagePercentage(
              analysis.language.all_detected,
              sourceLanguageCode || analysis.language.primary.code
            );

            if (secondaryPercentage > SECONDARY_LANGUAGE_THRESHOLD) {
              if (skipMultiLanguageReview) {
                console.log(`  ✅ Multi-language (${secondaryPercentage.toFixed(1)}%) suppressed by KB override for ${analysis.documentType.type}`);
              } else {
                const bilingualCheck = checkExpectedSecondaryLanguage(
                  overrideEntries, sourceLanguageCode,
                  analysis.language.all_detected, analysis.language.primary.code
                );

                if (bilingualCheck.isExpected) {
                  console.log(`  ✅ Bilingual OK: secondary ${bilingualCheck.detectedSecondary} is expected (${secondaryPercentage.toFixed(1)}%, KB: ${bilingualCheck.kbEntryTitle})`);
                  if (bilingualCheck.kbEntryId) fileKBEntriesApplied.push(bilingualCheck.kbEntryId);
                } else {
                  console.log(`  ⚠️ Multi-language document: secondary = ${secondaryPercentage.toFixed(1)}%`);
                  if (!reviewReasons.includes("multi_language_document")) reviewReasons.push("multi_language_document");
                  fileStatus = "review_required";
                }
              }
            }
          }
        } catch (aiError: any) {
          console.error(`  ❌ AI analysis failed:`, aiError.message);
          reviewReasons.push("ai_analysis_failed");
          fileStatus = "review_required";
        }
      } else if (fileStatus !== "failed") {
        console.log(`  ⚠️ No OCR text available for AI analysis`);
        reviewReasons.push("ai_analysis_failed");
        fileStatus = "review_required";
      }

      // ====================================================================
      // PRICING CALCULATION
      // ====================================================================

      const complexityLevel = analysis?.complexity.level || "easy";
      const complexityMult = COMPLEXITY_MULTIPLIERS[complexityLevel] || 1.0;

      let languageMultiplier = 1.0;
      const detectedLangCode = analysis?.language.primary.code || sourceLanguageCode;
      if (detectedLangCode) {
        const { data: exactMatch } = await supabaseAdmin
          .from("languages")
          .select("multiplier")
          .eq("code", detectedLangCode)
          .eq("is_active", true)
          .single();

        if (exactMatch?.multiplier) {
          languageMultiplier = parseFloat(exactMatch.multiplier);
        } else {
          const baseCode = normalizeLanguageCode(detectedLangCode);
          const { data: baseMatch } = await supabaseAdmin
            .from("languages")
            .select("multiplier")
            .ilike("code", `${baseCode}%`)
            .eq("is_active", true)
            .limit(1)
            .single();
          if (baseMatch?.multiplier) languageMultiplier = parseFloat(baseMatch.multiplier);
        }
      }

      const rawBillable = Math.ceil((translatableWordCount / wordsPerPage) * complexityMult * 10) / 10;
      const billablePages = Math.max(rawBillable, 1.0);
      const effectiveRate = Math.ceil(baseRate * languageMultiplier / 2.5) * 2.5;
      const lineTotal = billablePages * effectiveRate;
      const finalLineTotal = Math.round(lineTotal * priceMultiplier * 100) / 100;

      console.log(`  💰 Pricing: ${translatableWordCount}w → ${billablePages} pages × $${effectiveRate.toFixed(2)} = $${lineTotal.toFixed(2)}${priceMultiplier !== 1.0 ? ` → $${finalLineTotal.toFixed(2)} (${((1-priceMultiplier)*100).toFixed(0)}% discount)` : ""}`);

      // ====================================================================
      // v1.6: BILLABLE PAGE RATIO CHECK
      // Flag if billable_pages / physical_page_count exceeds threshold
      // Only applies when we have at least 1 physical page
      // ====================================================================

      if (totalPageCount > 0) {
        const billableRatio = billablePages / totalPageCount;
        if (billableRatio > billableRatioThreshold) {
          const ratioStr = billableRatio.toFixed(2);
          const msg = `High billable ratio: '${file.original_filename}' has ${billablePages} billable pages from ${totalPageCount} physical pages (${ratioStr}x ratio, threshold ${billableRatioThreshold}x) — possible word count inflation from watermarks, repeated boilerplate, or dense OCR noise`;
          console.warn(`  🚨 ${msg}`);
          if (!reviewReasons.includes("high_billable_ratio")) {
            reviewReasons.push("high_billable_ratio");
          }
          fileStatus = "review_required";
        } else if (billableRatio < lowBillableRatioThreshold) {
          // v1.9: Catch suspiciously sparse documents (e.g. 10 physical pages → 3
          // billable). Customer may expect every page translated; flag for staff to
          // confirm scope before quoting.
          const ratioPct = (billableRatio * 100).toFixed(0);
          const thresholdPct = (lowBillableRatioThreshold * 100).toFixed(0);
          const msg = `Low billable ratio: '${file.original_filename}' has ${billablePages} billable pages from ${totalPageCount} physical pages (${ratioPct}%, threshold ${thresholdPct}%) — many pages may be blank, duplicates, or non-translatable; staff should confirm scope with customer`;
          console.warn(`  🚨 ${msg}`);
          if (!reviewReasons.includes("low_billable_ratio")) {
            reviewReasons.push("low_billable_ratio");
          }
          fileStatus = "review_required";
        } else {
          console.log(`  ✅ Billable ratio OK: ${(billablePages / totalPageCount).toFixed(2)}x (low ${lowBillableRatioThreshold}x — high ${billableRatioThreshold}x)`);
        }
      }

      // ====================================================================
      // WRITE AI ANALYSIS RESULTS
      // ====================================================================

      const secondaryPct = analysis
        ? calculateSecondaryLanguagePercentage(
            analysis.language.all_detected,
            sourceLanguageCode || analysis.language.primary.code
          )
        : 0;

      const analysisRow: any = {
        quote_id: quoteId,
        quote_file_id: file.id,
        ocr_provider: "google_document_ai",
        ocr_confidence: avgOcrConfidence || null,
        ocr_raw_text: ocrText.substring(0, 100000),
        detected_language: analysis?.language.primary.code || sourceLanguageCode || null,
        language_name: analysis?.language.primary.name || sourceLanguageName || null,
        language_confidence: analysis?.language.primary.confidence ?? null,
        detected_document_type: analysis?.documentType.type || null,
        document_type_other: analysis?.documentType.other || null,
        document_type_confidence: analysis?.documentType.confidence || null,
        assessed_complexity: complexityLevel,
        complexity_confidence: analysis?.complexity.confidence || null,
        complexity_multiplier: complexityMult,
        word_count: totalWordCount,
        page_count: totalPageCount,
        translatable_word_count: translatableWordCount,
        detected_languages: analysis?.language.all_detected || null,
        is_multi_language: secondaryPct > 0,
        secondary_language_percentage: secondaryPct,
        billable_pages: billablePages,
        base_rate: effectiveRate,
        line_total: finalLineTotal,
        extracted_holder_name: analysis?.holder.name || null,
        extracted_holder_name_normalized: analysis?.holder.name_normalized || null,
        extracted_holder_dob: analysis?.holder.dob || null,
        extracted_document_number: analysis?.holder.document_number || null,
        extracted_issuing_country: analysis?.holder.issuing_country || null,
        holder_extraction_confidence: analysis?.holder.confidence || null,
        processing_status: fileStatus === "completed" ? "completed" : "review_required",
        processing_time_ms: Date.now() - fileStartTime,
        llm_provider: "anthropic",
        llm_model: "claude-sonnet-4-20250514",
        kb_entries_applied: fileKBEntriesApplied.length > 0 ? fileKBEntriesApplied : null,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertError } = await supabaseAdmin
        .from("ai_analysis_results")
        .upsert(analysisRow, { onConflict: "quote_file_id" });

      if (upsertError) {
        console.error(`  ❌ Failed to upsert ai_analysis_results:`, upsertError);
        await supabaseAdmin.from("ai_analysis_results").insert(analysisRow);
      }

      try {
        await updateKBAnalytics(supabaseAdmin, allKBEntries.map((e) => e.id), fileKBEntriesApplied);
      } catch (analyticsErr: any) {
        console.error(`  ⚠️ KB analytics update failed:`, analyticsErr.message);
      }

      if (analysisJob) {
        const ocrAnalysisRow: any = {
          job_id: analysisJob.id,
          batch_id: batch.id,
          file_id: batchFile.id,
          original_filename: file.original_filename,
          detected_document_type: analysis?.documentType.type || null,
          document_type_confidence: analysis?.documentType.confidence || null,
          detected_language: analysis?.language.primary.code || sourceLanguageCode || null,
          assessed_complexity: complexityLevel,
          complexity_confidence: analysis?.complexity.confidence || null,
          ocr_word_count: totalWordCount,
          ocr_page_count: totalPageCount,
          translatable_word_count: translatableWordCount,
          detected_languages: analysis?.language.all_detected || null,
          is_multi_language: secondaryPct > 0,
          secondary_language_percentage: secondaryPct,
          billable_pages: billablePages,
          pricing_base_rate: effectiveRate,
          processing_status: fileStatus === "completed" ? "completed" : "review_required",
          processing_time_ms: Date.now() - fileStartTime,
          error_message: reviewReasons.length > 0 ? reviewReasons.join(", ") : null,
        };
        await supabaseAdmin.from("ocr_ai_analysis").insert(ocrAnalysisRow);
      }

      await supabaseAdmin
        .from("quote_files")
        .update({ ai_processing_status: fileStatus === "completed" ? "completed" : "review_required" })
        .eq("id", file.id);

      processingResults.push({
        fileId: file.id,
        filename: file.original_filename,
        status: fileStatus,
        reasons: reviewReasons,
        pageCount: totalPageCount,
        wordCount: totalWordCount,
        translatableWordCount: translatableWordCount,
        ocrConfidence: avgOcrConfidence,
        aiConfidence: aiConfidence,
        ocrBatchFileId: batchFile.id,
      });

      console.log(`  ✅ File complete: ${file.original_filename} → ${fileStatus} (${(Date.now() - fileStartTime)}ms)`);
    }

    // ========================================================================
    // PHASE 4: DOCUMENT GROUPING
    // ========================================================================

    console.log(`\n--- PHASE 4: Document Grouping ---`);
    const completedResults = processingResults.filter((r) => r.status === "completed" || r.status === "review_required");

    if (completedResults.length > 0) {
      let groupingLangMultiplier = 1.0;
      const detectedCode = completedResults[0]?.fileId
        ? (await supabaseAdmin
            .from("ai_analysis_results")
            .select("detected_language")
            .eq("quote_file_id", completedResults[0].fileId)
            .single()
          ).data?.detected_language
        : sourceLanguageCode;

      const langCodeForGrouping = detectedCode || sourceLanguageCode;
      if (langCodeForGrouping) {
        const { data: langRow } = await supabaseAdmin
          .from("languages")
          .select("multiplier")
          .eq("code", langCodeForGrouping)
          .eq("is_active", true)
          .single();
        if (langRow?.multiplier) {
          groupingLangMultiplier = parseFloat(langRow.multiplier);
        } else {
          const baseCode = normalizeLanguageCode(langCodeForGrouping);
          const { data: baseMatch } = await supabaseAdmin
            .from("languages")
            .select("multiplier")
            .ilike("code", `${baseCode}%`)
            .eq("is_active", true)
            .limit(1)
            .single();
          if (baseMatch?.multiplier) groupingLangMultiplier = parseFloat(baseMatch.multiplier);
        }
      }

      try {
        await performDocumentGrouping(
          supabaseAdmin, quoteId, completedResults,
          baseRate, groupingLangMultiplier, wordsPerPage
        );
        console.log(`  ✅ Document grouping complete`);
      } catch (groupError: any) {
        console.error(`  ❌ Document grouping failed:`, groupError.message);
      }
    } else {
      console.log(`  ⏭️ Skipped — no completed files to group`);
    }

    // ========================================================================
    // PHASE 5: FINAL STATUS + STAFF NOTIFICATION
    // ========================================================================

    console.log(`\n--- PHASE 5: Final Status ---`);

    const hasReviewRequired = processingResults.some((r) => r.status === "review_required");
    const hasUnsupported = unsupportedFiles.length > 0;

    const allReasons = [
      ...new Set(
        processingResults
          .flatMap((r) => r.reasons)
          .concat(unsupportedFiles.length > 0 ? ["unsupported_format"] : [])
      ),
    ];

    let anyReviewRequired = hasReviewRequired || hasUnsupported;
    const totalPagesProcessed = processingResults.reduce((sum, r) => sum + r.pageCount, 0);
    const totalWordsProcessed = processingResults.reduce((sum, r) => sum + r.wordCount, 0);
    const completedCount = processingResults.filter((r) => r.status === "completed").length;
    const failedCount = processingResults.filter((r) => r.status !== "completed").length;

    // v1.9: High-order-value review trigger — runs after recalc so quote.total
    // reflects the volume-discount-adjusted final number.
    try {
      const { data: priceCheck } = await supabaseAdmin
        .from("quotes")
        .select("total")
        .eq("id", quoteId)
        .single();
      const finalTotal = parseFloat(priceCheck?.total ?? "0");
      if (finalTotal > highOrderValueThreshold) {
        console.warn(
          `  🚨 High order value: $${finalTotal.toFixed(2)} > $${highOrderValueThreshold.toFixed(2)} — flagging for review`,
        );
        if (!allReasons.includes("high_value_order")) allReasons.push("high_value_order");
        anyReviewRequired = true;
      }
    } catch (e: any) {
      console.error("  ⚠️ High-order-value check failed (non-blocking):", e?.message);
    }

    await supabaseAdmin
      .from("ocr_batches")
      .update({
        status: "completed",
        completed_files: completedCount,
        failed_files: failedCount,
        total_pages: totalPagesProcessed,
        total_words: totalWordsProcessed,
        completed_at: new Date().toISOString(),
      })
      .eq("id", batch.id);

    if (analysisJob) {
      await supabaseAdmin
        .from("ocr_ai_analysis_jobs")
        .update({
          status: anyReviewRequired ? "partial" : "completed",
          completed_files: completedCount,
          failed_files: failedCount,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", analysisJob.id);
    }

    if (anyReviewRequired) {
      console.log(`  🔶 Review required. Reasons: ${allReasons.join(", ")}`);
      await supabaseAdmin
        .from("quotes")
        .update({
          processing_status: "review_required",
          review_required_reasons: allReasons,
        })
        .eq("id", quoteId);
      await notifyStaffReviewRequired(quoteId, quote.quote_number);
    } else {
      console.log(`  ✅ All files completed successfully`);
      await supabaseAdmin
        .from("quotes")
        .update({ processing_status: "quote_ready" })
        .eq("id", quoteId);
    }

    const totalTime = Date.now() - startTime;
    console.log(`\n${"=".repeat(60)}`);
    console.log(`✅ Done in ${totalTime}ms. Files: ${processingResults.length}, Completed: ${completedCount}, Review: ${failedCount}`);
    console.log(`${"=".repeat(60)}\n`);

    return new Response(
      JSON.stringify({
        success: true, quoteId, batchId: batch.id,
        filesProcessed: processingResults.length,
        completed: completedCount, reviewRequired: failedCount,
        reviewReasons: allReasons, processingTimeMs: totalTime,
      }),
      { headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("❌ Fatal error:", err);
    try {
      const { quoteId } = await new Response(req.body).json().catch(() => ({}));
      if (quoteId) {
        const supabaseAdmin = createClient(
          Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
        );
        await supabaseAdmin
          .from("quotes")
          .update({ processing_status: "review_required", review_required_reasons: ["processing_error"] })
          .eq("id", quoteId);
        await notifyStaffReviewRequired(quoteId, "").catch(() => {});
      }
    } catch (_) {}
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...CORS_HEADERS, "Content-Type": "application/json" } }
    );
  }
});

// ============================================================================
// HELPER: Split PDF into chunks
// ============================================================================

async function splitPdfIntoChunks(
  originalBytes: Uint8Array,
  pdfDoc: PDFDocument,
  totalPages: number
): Promise<Array<{ bytes: Uint8Array; pageCount: number; startPage: number }>> {
  if (totalPages <= MAX_PAGES_PER_CHUNK) {
    return [{ bytes: originalBytes, pageCount: totalPages, startPage: 1 }];
  }
  const chunks: Array<{ bytes: Uint8Array; pageCount: number; startPage: number }> = [];
  for (let start = 0; start < totalPages; start += MAX_PAGES_PER_CHUNK) {
    const end = Math.min(start + MAX_PAGES_PER_CHUNK, totalPages);
    const pageIndices = Array.from({ length: end - start }, (_, i) => start + i);
    const chunkDoc = await PDFDocument.create();
    const copiedPages = await chunkDoc.copyPages(pdfDoc, pageIndices);
    copiedPages.forEach((page) => chunkDoc.addPage(page));
    const chunkBytes = await chunkDoc.save();
    chunks.push({ bytes: new Uint8Array(chunkBytes), pageCount: end - start, startPage: start + 1 });
  }
  return chunks;
}

// ============================================================================
// HELPER: Google Document AI
// ============================================================================

interface DocumentAIPageResult {
  text: string; wordCount: number; characterCount: number; confidence: number;
}
interface DocumentAIResult {
  pages: DocumentAIPageResult[]; totalWords: number; fullText: string;
}

async function callDocumentAI(
  accessToken: string, pdfBytes: Uint8Array, languageHint: string
): Promise<DocumentAIResult> {
  const projectId = Deno.env.get("GOOGLE_CLOUD_PROJECT") || "cethos-automation";
  const processorId = Deno.env.get("DOCUMENT_AI_PROCESSOR_ID") || "d6b4b832ed57ef43";
  const location = "us";
  const base64Content = uint8ArrayToBase64(pdfBytes);
  const requestBody: any = { rawDocument: { content: base64Content, mimeType: "application/pdf" } };
  if (languageHint) {
    requestBody.processOptions = { ocrConfig: { hints: { languageHints: [languageHint] } } };
  }
  const url = `https://us-documentai.googleapis.com/v1/projects/${projectId}/locations/${location}/processors/${processorId}:process`;
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Document AI error (${response.status}): ${errorText}`);
  }
  const result = await response.json();
  const document = result.document;
  if (!document) throw new Error("Document AI returned empty document");
  const fullText = document.text || "";
  const pages: DocumentAIPageResult[] = [];
  let totalWords = 0;
  if (document.pages) {
    for (let i = 0; i < document.pages.length; i++) {
      const page = document.pages[i];
      let pageText = "";
      if (page.layout?.textAnchor?.textSegments) {
        for (const segment of page.layout.textAnchor.textSegments) {
          const startIdx = parseInt(segment.startIndex || "0");
          const endIdx = parseInt(segment.endIndex || "0");
          pageText += fullText.substring(startIdx, endIdx);
        }
      }
      const words = pageText.trim().split(/\s+/).filter((w: string) => w.length > 0);
      const wordCount = words.length;
      totalWords += wordCount;
      pages.push({ text: pageText, wordCount, characterCount: pageText.length, confidence: page.layout?.confidence || 0 });
    }
  }
  if (pages.length === 0 && fullText.length > 0) {
    const words = fullText.trim().split(/\s+/).filter((w: string) => w.length > 0);
    totalWords = words.length;
    pages.push({ text: fullText, wordCount: totalWords, characterCount: fullText.length, confidence: 0.9 });
  }
  return { pages, totalWords, fullText };
}

// ============================================================================
// HELPER: Google Auth
// ============================================================================

async function getGoogleAccessToken(): Promise<string> {
  const credentialsJson = Deno.env.get("GOOGLE_APPLICATION_CREDENTIALS_JSON");
  if (!credentialsJson) throw new Error("GOOGLE_APPLICATION_CREDENTIALS_JSON not configured");
  const credentials = JSON.parse(credentialsJson);
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600, iat: now,
  };
  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const unsignedToken = `${headerB64}.${payloadB64}`;
  const privateKey = credentials.private_key;
  const pemContents = privateKey
    .replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s/g, "");
  let binaryKey;
  try { binaryKey = Uint8Array.from(atob(pemContents), (c: string) => c.charCodeAt(0)); }
  catch (_e) { throw new Error("Invalid private key format in service account credentials"); }
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8", binaryKey, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]
  );
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, encoder.encode(unsignedToken));
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  const jwt = `${unsignedToken}.${signatureB64}`;
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });
  const tokenData = await tokenResponse.json();
  if (!tokenData.access_token) throw new Error(`Google auth failed: ${tokenData.error_description || tokenData.error || "Unknown"}`);
  return tokenData.access_token;
}

// ============================================================================
// HELPER: Claude AI Analysis
// ============================================================================

async function callClaudeAnalysis(
  ocrText: string, classificationPrompt: string, kbContext: string,
  sourceLanguageCode: string, sourceLanguageName: string, totalWordCount: number
): Promise<ClaudeAnalysis> {
  const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
  if (!ANTHROPIC_API_KEY) throw new Error("ANTHROPIC_API_KEY not configured");

  let languageInstruction = "";
  if (sourceLanguageCode && sourceLanguageName) {
    languageInstruction = `

IMPORTANT - SOURCE LANGUAGE BILLING:
The customer has selected "${sourceLanguageName}" (${sourceLanguageCode}) as the source language.
For the "translatable_word_count" field, count ONLY words in ${sourceLanguageName}.
Exclude words in other languages from the translatable_word_count.
In the "all_detected" array, provide estimated word counts for EVERY language found.`;
  }

  const maxTextLength = 80000;
  const truncatedText = ocrText.length > maxTextLength
    ? ocrText.substring(0, maxTextLength) + "\n\n[TEXT TRUNCATED]"
    : ocrText;

  const systemPrompt = `${classificationPrompt}
${kbContext ? "\n\nKNOWLEDGE BASE CONTEXT:\n" + kbContext : ""}
${languageInstruction}

You MUST respond with valid JSON only. No markdown, no backticks, no explanation.
The JSON must match this exact structure:

{
  "language": {
    "primary": { "code": "ISO 639-1", "name": "Full name", "confidence": 0.95 },
    "all_detected": [
      { "code": "xx", "name": "Language Name", "estimated_word_count": 480, "percentage": 60 }
    ],
    "total_word_count": 800
  },
  "documentType": {
    "type": "birth_certificate",
    "confidence": 0.95,
    "other": null
  },
  "complexity": {
    "level": "easy",
    "confidence": 0.90,
    "factors": ["standard_form", "typed_text"]
  },
  "holder": {
    "name": "Full Name",
    "name_normalized": "full name",
    "dob": "1990-01-15",
    "document_number": "ABC123",
    "issuing_country": "CA",
    "confidence": 0.85
  },
  "translatable_word_count": 480
}

Document types: birth_certificate, marriage_certificate, death_certificate, divorce_decree, passport, drivers_license, national_id, id_card, diploma, transcript, degree, immigration_document, court_document, power_of_attorney, corporate_document, medical_document, financial_document, property_document, chat_screenshot, other

IMPORTANT — chat_screenshot: Use this type when the document is a screenshot of a messaging app (WhatsApp, WeChat, iMessage, Messenger, Telegram, SMS, etc.). These are characterized by speech bubbles, timestamps, contact names, app UI elements. Multiple languages in a single screenshot is normal and expected — do NOT lower confidence due to mixed languages.

Complexity levels:
- easy (1.0x): Standard forms, typed text, clear layout, chat screenshots
- medium (1.15x): Mixed handwriting/typed, multi-page, some complexity
- hard (1.25x): Dense handwriting, legal documents, complex layout, technical terms`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{
        role: "user",
        content: `Analyze this document text and provide classification:\n\nTotal OCR word count: ${totalWordCount}\n\n--- DOCUMENT TEXT ---\n${truncatedText}\n--- END ---`,
      }],
      system: systemPrompt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error (${response.status}): ${errorText}`);
  }

  const result = await response.json();
  const textContent = result.content?.find((c: any) => c.type === "text")?.text;
  if (!textContent) throw new Error("Claude returned empty response");

  const cleanJson = textContent.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

  try {
    const analysis = JSON.parse(cleanJson) as ClaudeAnalysis;
    if (!analysis.language?.primary?.code) throw new Error("Missing language.primary.code");
    if (!analysis.documentType?.type) throw new Error("Missing documentType.type");
    if (!analysis.complexity?.level) throw new Error("Missing complexity.level");
    analysis.holder = {
      name: analysis.holder?.name || "",
      name_normalized: analysis.holder?.name_normalized || (analysis.holder?.name || "").toLowerCase(),
      dob: analysis.holder?.dob || "",
      document_number: analysis.holder?.document_number || "",
      issuing_country: analysis.holder?.issuing_country || "",
      confidence: analysis.holder?.confidence || 0,
    };
    return analysis;
  } catch (parseErr: any) {
    console.error("Failed to parse Claude response:", cleanJson.substring(0, 500));
    throw new Error(`Claude response parse error: ${parseErr.message}`);
  }
}

// ============================================================================
// HELPER: Document Grouping
// ============================================================================

async function performDocumentGrouping(
  supabaseAdmin: any, quoteId: string, results: ProcessingResult[],
  baseRate: number, langMultiplier: number, wordsPerPage: number
): Promise<void> {
  const fileIds = results.map((r) => r.fileId);

  const { data: analyses } = await supabaseAdmin
    .from("ai_analysis_results")
    .select("*")
    .in("quote_file_id", fileIds);

  if (!analyses || analyses.length === 0) {
    console.log("  ⚠️ No analysis results found for grouping");
    return;
  }

  const filesSummary = analyses.map((a: any, idx: number) => ({
    index: idx + 1,
    fileId: a.quote_file_id,
    filename: results.find((r) => r.fileId === a.quote_file_id)?.filename || "unknown",
    documentType: a.detected_document_type,
    holderName: a.extracted_holder_name || "Unknown",
    holderDob: a.extracted_holder_dob || "",
    pageCount: a.page_count,
    wordCount: a.translatable_word_count || a.word_count,
    complexity: a.assessed_complexity,
  }));

  const totalFileCount = analyses.length;

  if (filesSummary.length === 1) {
    console.log("  📦 Single file — creating 1 group");
    const a = analyses[0];
    const effectiveRate = Math.ceil(baseRate * langMultiplier / 2.5) * 2.5;

    await supabaseAdmin.from("quote_page_group_assignments").delete().eq("quote_id", quoteId);
    await supabaseAdmin.from("quote_document_groups").delete().eq("quote_id", quoteId);

    const { data: group, error: groupError } = await supabaseAdmin
      .from("quote_document_groups")
      .insert({
        quote_id: quoteId,
        group_number: 1,
        group_label: `${a.detected_document_type || "Document"}${a.extracted_holder_name ? " - " + a.extracted_holder_name : ""}`,
        document_type: a.detected_document_type,
        complexity: a.assessed_complexity || "easy",
        complexity_multiplier: a.complexity_multiplier || 1.0,
        total_pages: a.page_count,
        total_word_count: a.translatable_word_count || a.word_count,
        billable_pages: a.billable_pages,
        base_rate: effectiveRate,
        line_total: (a.billable_pages || 1) * effectiveRate,
        holder_name: a.extracted_holder_name,
        holder_name_normalized: a.extracted_holder_name_normalized,
        holder_dob: a.extracted_holder_dob,
        document_number: a.extracted_document_number,
        issuing_country: a.extracted_issuing_country,
        is_ai_suggested: true,
        ai_confidence: Math.min(a.language_confidence || 1, a.document_type_confidence || 1, a.complexity_confidence || 1),
      })
      .select().single();

    if (groupError || !group) {
      console.error("  ❌ Failed to create group:", groupError);
      return;
    }

    await supabaseAdmin.from("quote_page_group_assignments").insert({
      quote_id: quoteId, group_id: group.id,
      file_id: a.quote_file_id, sequence_order: 1, assigned_by_ai: true,
    });

    await recalculateQuoteTotalsWithRetry(supabaseAdmin, quoteId);
    return;
  }

  const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
  if (!ANTHROPIC_API_KEY) {
    console.log("  ⚠️ No API key for grouping — creating 1 group per file");
    await createOneGroupPerFile(supabaseAdmin, quoteId, analyses, baseRate, langMultiplier);
    return;
  }

  const groupingPrompt = `Given these documents from a translation quote, group them by document type and person/holder.
Files in the same group should be the same type of document for the same person.
Different document types or different people = separate groups.

Files:
${JSON.stringify(filesSummary, null, 2)}

Respond with valid JSON only:
{
  "groups": [
    {
      "label": "Birth Certificate - Maria Rodriguez",
      "document_type": "birth_certificate",
      "complexity": "easy",
      "file_indices": [1, 2]
    }
  ]
}

Rules:
- EVERY file index from 1 to ${totalFileCount} must appear in exactly one group — no exceptions
- Use file_indices (1-based) matching the file index numbers above
- Label format: "[Document Type] - [Holder Name]" or just "[Document Type]" if no holder
- Keep the complexity from the individual analysis unless grouping changes it`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: groupingPrompt }],
      }),
    });

    if (!response.ok) throw new Error(`Claude grouping error: ${response.status}`);

    const result = await response.json();
    const textContent = result.content?.find((c: any) => c.type === "text")?.text;
    const cleanJson = (textContent || "").replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const groupingResult = JSON.parse(cleanJson);

    if (!groupingResult?.groups || !Array.isArray(groupingResult.groups)) {
      throw new Error("Invalid grouping response");
    }

    const allExpectedIndices = new Set(Array.from({ length: totalFileCount }, (_, i) => i + 1));
    const assignedIndices = new Set<number>();

    for (const g of groupingResult.groups) {
      for (const idx of (g.file_indices || [])) {
        assignedIndices.add(idx);
      }
    }

    const missingIndices = [...allExpectedIndices].filter((i) => !assignedIndices.has(i));

    if (missingIndices.length > 0) {
      console.log(`  ⚠️ v1.4 catch-all: ${missingIndices.length} file(s) not assigned (indices: ${missingIndices.join(", ")}) — adding to catch-all group`);
      groupingResult.groups.push({
        label: "Additional Documents",
        document_type: "other",
        complexity: "easy",
        file_indices: missingIndices,
      });
    } else {
      console.log(`  ✅ All ${totalFileCount} files assigned to groups`);
    }

    await supabaseAdmin.from("quote_page_group_assignments").delete().eq("quote_id", quoteId);
    await supabaseAdmin.from("quote_document_groups").delete().eq("quote_id", quoteId);

    const effectiveRate = Math.ceil(baseRate * langMultiplier / 2.5) * 2.5;

    for (let gIdx = 0; gIdx < groupingResult.groups.length; gIdx++) {
      const g = groupingResult.groups[gIdx];
      const groupFileIndices = (g.file_indices || []).map((i: number) => i - 1);

      let groupWordCount = 0;
      let groupPageCount = 0;
      const groupAnalyses: any[] = [];

      for (const fIdx of groupFileIndices) {
        if (fIdx >= 0 && fIdx < analyses.length) {
          const a = analyses[fIdx];
          groupWordCount += a.translatable_word_count || a.word_count || 0;
          groupPageCount += a.page_count || 0;
          groupAnalyses.push(a);
        }
      }

      const complexity = g.complexity || "easy";
      const complexMult = COMPLEXITY_MULTIPLIERS[complexity] || 1.0;
      const rawBillable = Math.ceil((groupWordCount / wordsPerPage) * complexMult * 10) / 10;
      const billablePages = Math.max(rawBillable, 1.0);
      const lineTotal = billablePages * effectiveRate;
      const firstAnalysis = groupAnalyses[0];

      const { data: group, error: groupError } = await supabaseAdmin
        .from("quote_document_groups")
        .insert({
          quote_id: quoteId,
          group_number: gIdx + 1,
          group_label: g.label || `Group ${gIdx + 1}`,
          document_type: g.document_type || firstAnalysis?.detected_document_type,
          complexity: complexity,
          complexity_multiplier: complexMult,
          total_pages: groupPageCount,
          total_word_count: groupWordCount,
          billable_pages: billablePages,
          base_rate: effectiveRate,
          line_total: lineTotal,
          holder_name: firstAnalysis?.extracted_holder_name,
          holder_name_normalized: firstAnalysis?.extracted_holder_name_normalized,
          holder_dob: firstAnalysis?.extracted_holder_dob,
          document_number: firstAnalysis?.extracted_document_number,
          issuing_country: firstAnalysis?.extracted_issuing_country,
          is_ai_suggested: true,
          ai_confidence: 0.9,
        })
        .select().single();

      if (groupError || !group) {
        console.error(`  ❌ Failed to create group ${gIdx + 1}:`, groupError);
        continue;
      }

      for (let seqIdx = 0; seqIdx < groupFileIndices.length; seqIdx++) {
        const fIdx = groupFileIndices[seqIdx];
        if (fIdx >= 0 && fIdx < analyses.length) {
          await supabaseAdmin.from("quote_page_group_assignments").insert({
            quote_id: quoteId, group_id: group.id,
            file_id: analyses[fIdx].quote_file_id,
            sequence_order: seqIdx + 1, assigned_by_ai: true,
          });
        }
      }
    }

    await recalculateQuoteTotalsWithRetry(supabaseAdmin, quoteId);

  } catch (groupErr: any) {
    console.error("  ❌ Claude grouping failed, falling back to 1 group per file:", groupErr.message);
    await createOneGroupPerFile(supabaseAdmin, quoteId, analyses, baseRate, langMultiplier);
  }
}

// ============================================================================
// HELPER: Fallback — one group per file
// ============================================================================

async function createOneGroupPerFile(
  supabaseAdmin: any, quoteId: string, analyses: any[],
  baseRate: number, langMultiplier: number
): Promise<void> {
  await supabaseAdmin.from("quote_page_group_assignments").delete().eq("quote_id", quoteId);
  await supabaseAdmin.from("quote_document_groups").delete().eq("quote_id", quoteId);
  const effectiveRate = Math.ceil(baseRate * langMultiplier / 2.5) * 2.5;
  for (let i = 0; i < analyses.length; i++) {
    const a = analyses[i];
    const { data: group } = await supabaseAdmin
      .from("quote_document_groups")
      .insert({
        quote_id: quoteId, group_number: i + 1,
        group_label: `${a.detected_document_type || "Document"}${a.extracted_holder_name ? " - " + a.extracted_holder_name : ""}`,
        document_type: a.detected_document_type,
        complexity: a.assessed_complexity || "easy",
        complexity_multiplier: a.complexity_multiplier || 1.0,
        total_pages: a.page_count,
        total_word_count: a.translatable_word_count || a.word_count,
        billable_pages: a.billable_pages,
        base_rate: effectiveRate,
        line_total: (a.billable_pages || 1) * effectiveRate,
        holder_name: a.extracted_holder_name,
        holder_name_normalized: a.extracted_holder_name_normalized,
        is_ai_suggested: true, ai_confidence: 0.85,
      })
      .select().single();
    if (group) {
      await supabaseAdmin.from("quote_page_group_assignments").insert({
        quote_id: quoteId, group_id: group.id,
        file_id: a.quote_file_id, sequence_order: 1, assigned_by_ai: true,
      });
    }
  }
  await recalculateQuoteTotalsWithRetry(supabaseAdmin, quoteId);
}

// ============================================================================
// HELPER: Set final quote status
// ============================================================================

async function setFinalQuoteStatus(
  supabaseAdmin: any, quoteId: string,
  results: ProcessingResult[], hasReviewFiles: boolean
): Promise<void> {
  const hasReview = hasReviewFiles || results.some((r) => r.status === "review_required");
  const allReasons = [...new Set(results.flatMap((r) => r.reasons))];
  if (hasReview) {
    await supabaseAdmin.from("quotes").update({
      processing_status: "review_required",
      review_required_reasons: allReasons.length > 0 ? allReasons : ["processing_error"],
    }).eq("id", quoteId);
  } else {
    await supabaseAdmin.from("quotes").update({ processing_status: "quote_ready" }).eq("id", quoteId);
  }
}

// ============================================================================
// HELPER: Calculate secondary language percentage
// ============================================================================

function calculateSecondaryLanguagePercentage(
  allDetected: LanguageBreakdown[] | undefined, primaryCode: string
): number {
  if (!allDetected || allDetected.length <= 1) return 0;
  const totalWords = allDetected.reduce((sum, l) => sum + l.estimated_word_count, 0);
  if (totalWords === 0) return 0;
  const primaryEntry = allDetected.find(
    (l) => normalizeLanguageCode(l.code) === normalizeLanguageCode(primaryCode)
  );
  const primaryWords = primaryEntry?.estimated_word_count || 0;
  return ((totalWords - primaryWords) / totalWords) * 100;
}

// ============================================================================
// HELPER: Build KB context string
// ============================================================================

function buildKnowledgeBaseContext(contextEntries: KBEntry[]): string {
  if (!contextEntries || contextEntries.length === 0) return "";
  let totalChars = 0;
  const lines: string[] = [];
  for (const entry of contextEntries) {
    const line = `[${entry.category || "General"}] ${entry.title || ""}: ${entry.knowledge_text || ""}`;
    if (totalChars + line.length > KB_CONTEXT_MAX_CHARS) {
      console.log(`  📚 KB context capped at ${lines.length} entries`);
      break;
    }
    lines.push(line);
    totalChars += line.length;
  }
  return lines.join("\n\n");
}

// ============================================================================
// HELPER: Check expected secondary language
// ============================================================================

function checkExpectedSecondaryLanguage(
  overrideEntries: KBEntry[], sourceLanguageCode: string,
  allDetected: LanguageBreakdown[] | undefined, primaryCode: string
): BilingualCheckResult {
  const result: BilingualCheckResult = {
    isExpected: false, detectedSecondary: null,
    expectedLanguages: [], kbEntryId: null, kbEntryTitle: null,
  };
  if (!allDetected || allDetected.length <= 1) return result;
  const normalizedPrimary = normalizeLanguageCode(primaryCode);
  const secondaryLanguages = allDetected
    .filter((l) => normalizeLanguageCode(l.code) !== normalizedPrimary)
    .sort((a, b) => b.estimated_word_count - a.estimated_word_count);
  if (secondaryLanguages.length === 0) return result;
  result.detectedSecondary = secondaryLanguages[0].code;
  const normalizedSource = normalizeLanguageCode(sourceLanguageCode || primaryCode);
  const bilingualEntries = overrideEntries.filter((entry) => {
    if (entry.override_field !== 'expected_secondary_language') return false;
    if (!entry.override_value) return false;
    const entryLang = entry.source_language ? normalizeLanguageCode(entry.source_language) : null;
    if (entryLang && entryLang !== normalizedSource) return false;
    return true;
  });
  if (bilingualEntries.length === 0) return result;
  bilingualEntries.sort((a, b) => {
    const aSpec = a.source_language ? 2 : 1;
    const bSpec = b.source_language ? 2 : 1;
    if (bSpec !== aSpec) return bSpec - aSpec;
    return (b.priority || 0) - (a.priority || 0);
  });
  const bestEntry = bilingualEntries[0];
  const expectedCodes = bestEntry.override_value!.split(',').map((c) => normalizeLanguageCode(c.trim()));
  result.expectedLanguages = expectedCodes;
  result.kbEntryId = bestEntry.id;
  result.kbEntryTitle = bestEntry.title;
  const normalizedSecondary = normalizeLanguageCode(secondaryLanguages[0].code);
  if (expectedCodes.includes(normalizedSecondary)) result.isExpected = true;
  return result;
}

// ============================================================================
// HELPER: Apply KB overrides
// ============================================================================

function applyKBOverrides(
  analysis: ClaudeAnalysis, overrideEntries: KBEntry[],
  sourceLanguageCode: string, detectedDocumentType: string
): KBOverrideResult {
  const appliedOverrideIds: string[] = [];
  const overridesLog: string[] = [];
  let priceMultiplier = 1.0;
  let skipMultiLanguageReview = false;

  if (!overrideEntries || overrideEntries.length === 0) {
    return { appliedOverrideIds, overridesLog, priceMultiplier, skipMultiLanguageReview };
  }

  const matchingOverrides = overrideEntries.filter((entry) => {
    if (entry.override_field === 'expected_secondary_language') return false;
    if (entry.document_type && entry.document_type !== 'any' && entry.document_type !== detectedDocumentType) return false;
    return true;
  });

  if (matchingOverrides.length === 0) {
    return { appliedOverrideIds, overridesLog, priceMultiplier, skipMultiLanguageReview };
  }

  const byField: Record<string, KBEntry[]> = {};
  for (const entry of matchingOverrides) {
    if (!entry.override_field) continue;
    if (!byField[entry.override_field]) byField[entry.override_field] = [];
    byField[entry.override_field].push(entry);
  }

  for (const [field, candidates] of Object.entries(byField)) {
    const scored = candidates.map((entry) => {
      let specificity = 1;
      if (entry.document_type && entry.document_type !== 'any') specificity = 2;
      if (entry.document_type && entry.document_type !== 'any' && entry.source_language) specificity = 3;
      return { entry, specificity };
    });
    scored.sort((a, b) => {
      if (b.specificity !== a.specificity) return b.specificity - a.specificity;
      return (b.entry.priority || 0) - (a.entry.priority || 0);
    });
    const winner = scored[0];
    if (!winner || !winner.entry.override_value) continue;
    const entry = winner.entry;

    if (field === 'price_multiplier') {
      const mult = parseFloat(entry.override_value);
      if (!isNaN(mult) && mult > 0) {
        priceMultiplier = mult;
        appliedOverrideIds.push(entry.id);
        overridesLog.push(`${entry.title}: price_multiplier = ${mult} (${((1-mult)*100).toFixed(0)}% discount)`);
      }
      continue;
    }

    if (field === 'skip_multi_language_review') {
      skipMultiLanguageReview = entry.override_value.toLowerCase() === 'true';
      appliedOverrideIds.push(entry.id);
      overridesLog.push(`${entry.title}: skip_multi_language_review = ${skipMultiLanguageReview}`);
      continue;
    }

    const oldValue = getAnalysisField(analysis, field);
    setAnalysisField(analysis, field, entry.override_value, entry.override_confidence || 0.99);
    appliedOverrideIds.push(entry.id);
    overridesLog.push(
      `${entry.title}: ${field} "${oldValue}" → "${entry.override_value}" (confidence: ${entry.override_confidence || 0.99}, specificity: ${winner.specificity})`
    );
  }

  return { appliedOverrideIds, overridesLog, priceMultiplier, skipMultiLanguageReview };
}

// ============================================================================
// HELPER: Get/Set analysis fields
// ============================================================================

function getAnalysisField(analysis: ClaudeAnalysis, field: string): string {
  switch (field) {
    case "complexity": case "assessed_complexity": return analysis.complexity.level;
    case "detected_document_type": return analysis.documentType.type;
    case "detected_language": return analysis.language.primary.code;
    default: return "(unknown field)";
  }
}

function setAnalysisField(analysis: ClaudeAnalysis, field: string, value: string, confidence: number): void {
  switch (field) {
    case "complexity": case "assessed_complexity":
      analysis.complexity.level = value;
      analysis.complexity.confidence = confidence;
      if (!analysis.complexity.factors.includes("kb_override")) analysis.complexity.factors.push("kb_override");
      break;
    case "detected_document_type":
      analysis.documentType.type = value;
      analysis.documentType.confidence = confidence;
      break;
    case "detected_language":
      analysis.language.primary.code = value;
      analysis.language.primary.confidence = confidence;
      break;
    default:
      console.log(`  ⚠️ Unknown override field: ${field} — skipping`);
  }
}

// ============================================================================
// HELPER: KB usage analytics
// ============================================================================

async function updateKBAnalytics(
  supabaseAdmin: any, matchedIds: string[], appliedIds: string[]
): Promise<void> {
  const now = new Date().toISOString();
  if (matchedIds.length > 0) {
    const { error: matchError } = await supabaseAdmin.rpc("increment_kb_matched", { p_entry_ids: matchedIds, p_timestamp: now });
    if (matchError) {
      for (const id of matchedIds) {
        await supabaseAdmin.from("ai_knowledge_base").update({ last_matched_at: now }).eq("id", id);
      }
    }
  }
  if (appliedIds.length > 0) {
    const { error: applyError } = await supabaseAdmin.rpc("increment_kb_applied", { p_entry_ids: appliedIds, p_timestamp: now });
    if (applyError) {
      for (const id of appliedIds) {
        await supabaseAdmin.from("ai_knowledge_base").update({ last_applied_at: now }).eq("id", id);
      }
    }
  }
}

// ============================================================================
// HELPER: Default classification prompt (fallback)
// ============================================================================

function getDefaultClassificationPrompt(): string {
  return `You are a certified translation document analyst. Analyze the OCR text from a document that needs translation.

Determine:
1. The primary language of the document
2. ALL languages detected with word count estimates per language
3. The document type (birth certificate, passport, diploma, chat screenshot, etc.)
4. Complexity level for translation (easy/medium/hard)
5. Document holder information (name, DOB, document number, issuing country)
6. The translatable word count (only source language words that need translation — exclude repeated boilerplate such as notary/commissioner footers, watermarks, and page headers)

Be precise with confidence scores. If uncertain, lower the confidence.`;
}

// ============================================================================
// HELPER: DOCX text extraction
// ============================================================================

async function extractDocxText(fileBytes: Uint8Array): Promise<string> {
  try {
    const text = extractTextFromZip(fileBytes, "word/document.xml");
    if (text) {
      return text
        .replace(/<w:br[^>]*>/gi, "\n").replace(/<w:tab[^>]*>/gi, "\t")
        .replace(/<\/w:p>/gi, "\n").replace(/<[^>]+>/g, "")
        .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
        .replace(/&apos;/g, "'").replace(/&quot;/g, '"').trim();
    }
    return "[DOCX text extraction failed]";
  } catch (_e) { return "[DOCX text extraction failed]"; }
}

// ============================================================================
// HELPER: XLSX text extraction
// ============================================================================

async function extractXlsxText(fileBytes: Uint8Array): Promise<string> {
  try {
    const sharedStrings = extractTextFromZip(fileBytes, "xl/sharedStrings.xml");
    const sheet1 = extractTextFromZip(fileBytes, "xl/worksheets/sheet1.xml");
    let text = "";
    if (sharedStrings) {
      const matches = sharedStrings.match(/<t[^>]*>([^<]*)<\/t>/g) || [];
      text = matches.map((m) => m.replace(/<[^>]+>/g, "")).join("\t");
    }
    if (sheet1 && !text) {
      const matches = sheet1.match(/<v>([^<]*)<\/v>/g) || [];
      text = matches.map((m) => m.replace(/<[^>]+>/g, "")).join("\t");
    }
    return text || "[XLSX text extraction failed]";
  } catch (_e) { return "[XLSX text extraction failed]"; }
}

// ============================================================================
// HELPER: ZIP reader
// ============================================================================

function extractTextFromZip(zipBytes: Uint8Array, targetFile: string): string | null {
  try {
    const decoder = new TextDecoder();
    let offset = 0;
    while (offset < zipBytes.length - 4) {
      if (zipBytes[offset] === 0x50 && zipBytes[offset+1] === 0x4b &&
          zipBytes[offset+2] === 0x03 && zipBytes[offset+3] === 0x04) {
        const compMethod = zipBytes[offset+8] | (zipBytes[offset+9] << 8);
        const compSize = zipBytes[offset+18] | (zipBytes[offset+19] << 8) | (zipBytes[offset+20] << 16) | (zipBytes[offset+21] << 24);
        const uncompSize = zipBytes[offset+22] | (zipBytes[offset+23] << 8) | (zipBytes[offset+24] << 16) | (zipBytes[offset+25] << 24);
        const nameLen = zipBytes[offset+26] | (zipBytes[offset+27] << 8);
        const extraLen = zipBytes[offset+28] | (zipBytes[offset+29] << 8);
        const nameStart = offset + 30;
        const name = decoder.decode(zipBytes.slice(nameStart, nameStart + nameLen));
        if (name === targetFile) {
          const dataStart = nameStart + nameLen + extraLen;
          const dataEnd = dataStart + (compSize > 0 ? compSize : uncompSize);
          if (compMethod === 0) return decoder.decode(zipBytes.slice(dataStart, dataEnd));
          else return null;
        }
        const entrySize = 30 + nameLen + extraLen + (compSize > 0 ? compSize : uncompSize);
        offset += entrySize;
      } else { offset++; }
    }
    return null;
  } catch (_e) { return null; }
}

// ============================================================================
// HELPER: Add text as PDF page
// ============================================================================

function addTextPage(pdfDoc: PDFDocument, text: string, filename: string): void {
  const page = pdfDoc.addPage([612, 792]);
  page.drawText(`Source: ${filename}`, { x: 50, y: 760, size: 10 });
  const lines = text.split("\n");
  let y = 730;
  const lineHeight = 14;
  const maxCharsPerLine = 80;
  for (const line of lines) {
    if (y < 50) break;
    if (line.length <= maxCharsPerLine) {
      try { page.drawText(line.replace(/[^\x20-\x7E]/g, "?"), { x: 50, y, size: 10 }); } catch (_) {}
      y -= lineHeight;
    } else {
      for (let i = 0; i < line.length; i += maxCharsPerLine) {
        if (y < 50) break;
        try { page.drawText(line.substring(i, i + maxCharsPerLine).replace(/[^\x20-\x7E]/g, "?"), { x: 50, y, size: 10 }); } catch (_) {}
        y -= lineHeight;
      }
    }
  }
}

// ============================================================================
// HELPER: Uint8Array to base64
// ============================================================================

function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 8192;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.slice(i, i + chunkSize));
  }
  return btoa(binary);
}