/**
 * Sends a DOCX file to the Supabase Edge Function for server-side PDF conversion.
 */
export async function convertDocxToPdf(file: File): Promise<File> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error('Supabase configuration missing');
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
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`DOCX conversion failed: ${errorText}`);
  }

  const pdfBuffer = await response.arrayBuffer();
  const pdfName = file.name.replace(/\.docx$/i, '.pdf');

  return new File([pdfBuffer], pdfName, { type: 'application/pdf' });
}
