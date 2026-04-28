/**
 * Combines multiple image files (JPEG/PNG) into a single multi-page PDF.
 * Each image becomes a full-size page preserving its original dimensions.
 *
 * pdf-lib is dynamically imported so it isn't pulled into the public bundle
 * for routes that mount the host form without ever combining images.
 */
export async function combineImagesToPdf(
  images: File[],
  filename: string
): Promise<File> {
  if (images.length === 0) {
    throw new Error('No images to combine');
  }

  const { PDFDocument } = await import('pdf-lib');
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
