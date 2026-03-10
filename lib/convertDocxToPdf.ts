/**
 * Sends a DOCX file to the Supabase Edge Function for server-side PDF conversion.
 * Note: Only .docx files are supported. Legacy .doc files must be re-saved as .docx first.
 */
export async function convertDocxToPdf(file: File): Promise<File> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error('Supabase configuration missing');
  }

  // Reject legacy .doc early with a helpful message
  const nameLower = file.name.toLowerCase();
  if (nameLower.endsWith('.doc') && !nameLower.endsWith('.docx')) {
    throw new Error(
      'Legacy .doc format is not supported. Please save the file as .docx and re-upload.'
    );
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `${supabaseUrl}/functions/v1/convert-docx-to-pdf`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${anonKey}` },
      body: formData,
    }
  );

  if (!response.ok) {
    let message = 'DOCX conversion failed';
    try {
      const body = await response.json();
      if (body?.error) message = body.error;
    } catch {
      const text = await response.text().catch(() => '');
      if (text) message = text;
    }
    throw new Error(message);
  }

  const pdfBuffer = await response.arrayBuffer();
  const pdfName = file.name.replace(/\.docx?$/i, '.pdf');

  return new File([pdfBuffer], pdfName, { type: 'application/pdf' });
}
