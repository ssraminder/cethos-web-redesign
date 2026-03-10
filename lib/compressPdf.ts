import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}

const COMPRESSION_THRESHOLD_BYTES = 3 * 1024 * 1024; // 3MB
const JPEG_QUALITY = 0.80;
const RENDER_SCALE = 150 / 72; // 150 DPI

export async function compressPdfIfNeeded(file: File): Promise<File> {
  if (file.type !== 'application/pdf' || file.size < COMPRESSION_THRESHOLD_BYTES) {
    return file;
  }

  try {
    console.log(`Compressing ${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)...`);

    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const newPdf = await PDFDocument.create();

    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const viewport = page.getViewport({ scale: RENDER_SCALE });

      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d')!;

      await page.render({ canvasContext: ctx, viewport, canvas } as any).promise;

      const jpegDataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
      const jpegBase64 = jpegDataUrl.split(',')[1];
      const jpegBytes = Uint8Array.from(atob(jpegBase64), c => c.charCodeAt(0));

      const img = await newPdf.embedJpg(jpegBytes);
      const p = newPdf.addPage([viewport.width, viewport.height]);
      p.drawImage(img, { x: 0, y: 0, width: viewport.width, height: viewport.height });
    }

    const bytes = await newPdf.save();
    const compressed = new File(
      [new Uint8Array(bytes)],
      file.name,
      { type: 'application/pdf' }
    );

    console.log(`Compressed: ${(file.size / 1024 / 1024).toFixed(1)}MB → ${(compressed.size / 1024 / 1024).toFixed(1)}MB`);
    return compressed;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.warn('PDF compression failed, using original:', message);
    return file;
  }
}

export function needsCompression(file: File): boolean {
  return file.type === 'application/pdf' && file.size >= COMPRESSION_THRESHOLD_BYTES;
}
