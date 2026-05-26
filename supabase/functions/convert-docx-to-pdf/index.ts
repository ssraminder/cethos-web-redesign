// ============================================================================
// convert-docx-to-pdf v1.0
// Date: 2026-05-26
// ----------------------------------------------------------------------------
// Accepts a multipart/form-data POST with a `file` field containing a DOCX,
// extracts text content and wraps it into a multi-page PDF using pdf-lib.
// Returns the PDF bytes as application/pdf.
//
// Used by EmbeddedCertifiedQuoteForm.tsx so that browsers can render/preview
// the document as PDF immediately on upload. The original DOCX is retained
// separately in storage by the caller — this function does NOT touch storage.
//
// Conversion fidelity: text-only (no images, no formatting). The downstream
// OCR/billing pipeline only needs text content, so this is intentional.
// ============================================================================

import { serve } from "https://deno.land/std@0.208.0/http/server.ts";
import { PDFDocument, StandardFonts } from "https://esm.sh/pdf-lib@1.17.1";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Max-Age": "86400",
};

const DOCX_MIME =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

// ZIP-entry reader (same lightweight implementation used by
// process-quote-documents — avoids pulling in a full ZIP lib).
function extractTextFromZip(
  zipBytes: Uint8Array,
  targetFile: string,
): string | null {
  try {
    const decoder = new TextDecoder();
    let offset = 0;
    while (offset < zipBytes.length - 4) {
      if (
        zipBytes[offset] === 0x50 &&
        zipBytes[offset + 1] === 0x4b &&
        zipBytes[offset + 2] === 0x03 &&
        zipBytes[offset + 3] === 0x04
      ) {
        const compMethod = zipBytes[offset + 8] | (zipBytes[offset + 9] << 8);
        const compSize =
          zipBytes[offset + 18] |
          (zipBytes[offset + 19] << 8) |
          (zipBytes[offset + 20] << 16) |
          (zipBytes[offset + 21] << 24);
        const uncompSize =
          zipBytes[offset + 22] |
          (zipBytes[offset + 23] << 8) |
          (zipBytes[offset + 24] << 16) |
          (zipBytes[offset + 25] << 24);
        const nameLen = zipBytes[offset + 26] | (zipBytes[offset + 27] << 8);
        const extraLen = zipBytes[offset + 28] | (zipBytes[offset + 29] << 8);
        const nameStart = offset + 30;
        const name = decoder.decode(
          zipBytes.slice(nameStart, nameStart + nameLen),
        );
        if (name === targetFile) {
          const dataStart = nameStart + nameLen + extraLen;
          const dataEnd = dataStart + (compSize > 0 ? compSize : uncompSize);
          if (compMethod === 0) {
            return decoder.decode(zipBytes.slice(dataStart, dataEnd));
          }
          // Deflate-compressed entry — decompress via DecompressionStream.
          const compressed = zipBytes.slice(dataStart, dataEnd);
          // Synchronous fallback path: returning null here causes the caller
          // to bail; we instead use the async helper below for deflate.
          return null;
        }
        const entrySize =
          30 + nameLen + extraLen + (compSize > 0 ? compSize : uncompSize);
        offset += entrySize;
      } else {
        offset++;
      }
    }
    return null;
  } catch (_e) {
    return null;
  }
}

// Async variant that handles deflate-compressed entries.
async function extractTextFromZipAsync(
  zipBytes: Uint8Array,
  targetFile: string,
): Promise<string | null> {
  try {
    const decoder = new TextDecoder();
    let offset = 0;
    while (offset < zipBytes.length - 4) {
      if (
        zipBytes[offset] === 0x50 &&
        zipBytes[offset + 1] === 0x4b &&
        zipBytes[offset + 2] === 0x03 &&
        zipBytes[offset + 3] === 0x04
      ) {
        const compMethod = zipBytes[offset + 8] | (zipBytes[offset + 9] << 8);
        const compSize =
          zipBytes[offset + 18] |
          (zipBytes[offset + 19] << 8) |
          (zipBytes[offset + 20] << 16) |
          (zipBytes[offset + 21] << 24);
        const uncompSize =
          zipBytes[offset + 22] |
          (zipBytes[offset + 23] << 8) |
          (zipBytes[offset + 24] << 16) |
          (zipBytes[offset + 25] << 24);
        const nameLen = zipBytes[offset + 26] | (zipBytes[offset + 27] << 8);
        const extraLen = zipBytes[offset + 28] | (zipBytes[offset + 29] << 8);
        const nameStart = offset + 30;
        const name = decoder.decode(
          zipBytes.slice(nameStart, nameStart + nameLen),
        );
        if (name === targetFile) {
          const dataStart = nameStart + nameLen + extraLen;
          const dataEnd = dataStart + (compSize > 0 ? compSize : uncompSize);
          const slice = zipBytes.slice(dataStart, dataEnd);
          if (compMethod === 0) {
            return decoder.decode(slice);
          }
          if (compMethod === 8) {
            // Raw deflate stream (no zlib header). DecompressionStream supports
            // "deflate-raw" in modern Deno.
            const stream = new Response(
              new Blob([slice]).stream().pipeThrough(
                new DecompressionStream("deflate-raw"),
              ),
            );
            const buf = new Uint8Array(await stream.arrayBuffer());
            return decoder.decode(buf);
          }
          return null;
        }
        const entrySize =
          30 + nameLen + extraLen + (compSize > 0 ? compSize : uncompSize);
        offset += entrySize;
      } else {
        offset++;
      }
    }
    return null;
  } catch (_e) {
    return null;
  }
}

async function extractDocxText(fileBytes: Uint8Array): Promise<string> {
  // Try uncompressed read first (cheap), then async deflate path.
  let raw = extractTextFromZip(fileBytes, "word/document.xml");
  if (!raw) raw = await extractTextFromZipAsync(fileBytes, "word/document.xml");
  if (!raw) return "";
  return raw
    .replace(/<w:br[^>]*>/gi, "\n")
    .replace(/<w:tab[^>]*>/gi, "\t")
    .replace(/<\/w:p>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .trim();
}

async function buildPdfFromText(text: string): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pageWidth = 612;
  const pageHeight = 792;
  const marginX = 50;
  const marginTop = 60;
  const marginBottom = 50;
  const fontSize = 11;
  const lineHeight = 14;
  const maxCharsPerLine = 95;

  const sanitize = (s: string) => s.replace(/[^\x20-\x7E\t]/g, "?");
  const lines: string[] = [];
  for (const rawLine of (text || "").split("\n")) {
    const line = sanitize(rawLine.replace(/\t/g, "    "));
    if (line.length <= maxCharsPerLine) {
      lines.push(line);
    } else {
      for (let i = 0; i < line.length; i += maxCharsPerLine) {
        lines.push(line.substring(i, i + maxCharsPerLine));
      }
    }
  }

  if (lines.length === 0) lines.push("(empty document)");

  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - marginTop;

  for (const line of lines) {
    if (y < marginBottom) {
      page = pdf.addPage([pageWidth, pageHeight]);
      y = pageHeight - marginTop;
    }
    try {
      page.drawText(line, { x: marginX, y, size: fontSize, font });
    } catch (_) {
      // Skip lines that fail to encode rather than blowing up the whole doc.
    }
    y -= lineHeight;
  }

  return await pdf.save();
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: CORS_HEADERS });
  }

  if (req.method !== "POST") {
    return jsonError("Method not allowed", 405);
  }

  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return jsonError("Expected multipart/form-data", 400);
    }

    const form = await req.formData();
    const fileEntry = form.get("file");
    if (!fileEntry || !(fileEntry instanceof File)) {
      return jsonError("Missing `file` field", 400);
    }

    const filename = fileEntry.name || "document.docx";
    const lowerName = filename.toLowerCase();

    // Reject legacy .doc; only .docx (zip-based OOXML) is supported.
    if (lowerName.endsWith(".doc") && !lowerName.endsWith(".docx")) {
      return jsonError(
        "Legacy .doc format is not supported. Please save the file as .docx and re-upload.",
        415,
      );
    }
    if (
      !lowerName.endsWith(".docx") &&
      fileEntry.type &&
      fileEntry.type !== DOCX_MIME
    ) {
      return jsonError("Only .docx files are supported", 415);
    }

    const bytes = new Uint8Array(await fileEntry.arrayBuffer());
    const text = await extractDocxText(bytes);

    const pdfBytes = await buildPdfFromText(text);

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename.replace(
          /\.docx?$/i,
          ".pdf",
        )}"`,
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Conversion failed";
    console.error("convert-docx-to-pdf error:", message);
    return jsonError(message, 500);
  }
});
