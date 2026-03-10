import { PDFDocument } from 'pdf-lib';

/**
 * Combines multiple image files (JPEG/PNG) into a single multi-page PDF.
 * Each image becomes a full-size page preserving its original dimensions.
 */
export async function combineImagesToPdf(
  images: File[],
  filename: string
): Promise<File> {
  if (images.length === 0) {
    throw new Error('No images to combine');
  }

  const pdfDoc = await PDFDocument.create();
  let successCount = 0;

  for (const image of images) {
    try {
      const bytes = new Uint8Array(await image.arrayBuffer());
      const isJpeg = image.type === 'image/jpeg';
      const embedded = isJpeg
        ? await pdfDoc.embedJpg(bytes)
        : await pdfDoc.embedPng(bytes);

      const page = pdfDoc.addPage([embedded.width, embedded.height]);
      page.drawImage(embedded, {
        x: 0,
        y: 0,
        width: embedded.width,
        height: embedded.height,
      });
      successCount++;
    } catch (err) {
      console.warn(`Failed to embed image "${image.name}", skipping:`, err);
    }
  }

  if (successCount === 0) {
    throw new Error('All images failed to embed into PDF');
  }

  const pdfBytes = await pdfDoc.save();
  return new File([new Uint8Array(pdfBytes)], filename, {
    type: 'application/pdf',
  });
}
