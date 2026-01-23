import { createServerSupabaseClient } from '@/lib/supabase'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  console.log('[API Certified Quote] Request received at:', new Date().toISOString())

  try {
    // Log environment check
    console.log('[API Certified Quote] Env check:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_KEY,
      hasResendKey: !!process.env.RESEND_API_KEY,
    })

    const supabase = createServerSupabaseClient()
    console.log('[API Certified Quote] Supabase client created')

    const resend = new Resend(process.env.RESEND_API_KEY)
    console.log('[API Certified Quote] Resend client created')

    const formData = await req.formData()
    console.log('[API Certified Quote] FormData keys:', Array.from(formData.keys()))

    // Parse form data
    const rawData = {
      serviceType: formData.get('serviceType') as string || 'certified-translation',
      formLocation: formData.get('formLocation') as string || '',
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      documentType: formData.get('documentType') as string,
      languageOfDocument: formData.get('languageOfDocument') as string,
      numberOfPages: parseInt(formData.get('numberOfPages') as string) || 1,
      purpose: formData.get('purpose') as string,
      serviceSpeed: formData.get('serviceSpeed') as string || 'standard',
      additionalNotes: formData.get('additionalNotes') as string || '',
    }

    console.log('[API Certified Quote] Raw data parsed:', {
      fullName: rawData.fullName,
      email: rawData.email,
      documentType: rawData.documentType,
      formLocation: rawData.formLocation,
    })

    // Basic validation
    if (!rawData.fullName || rawData.fullName.length < 2) {
      return NextResponse.json(
        { error: 'Full name is required' },
        { status: 400 }
      )
    }
    if (!rawData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawData.email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      )
    }
    if (!rawData.phone || rawData.phone.length < 7) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Prepare database record
    const dbData = {
      service_type: rawData.serviceType,
      full_name: rawData.fullName,
      email: rawData.email,
      phone: rawData.phone,
      company_name: null, // Not collected in certified form
      job_title: null,
      source_language: rawData.languageOfDocument,
      target_languages: ['English'], // Certified translations are to English
      word_count: null,
      deadline: rawData.serviceSpeed === 'same-day' ? 'urgent' : 'standard',
      additional_notes: rawData.additionalNotes,
      service_data: {
        formLocation: rawData.formLocation,
        documentType: rawData.documentType,
        numberOfPages: rawData.numberOfPages,
        purpose: rawData.purpose,
        serviceSpeed: rawData.serviceSpeed,
      },
    }

    // Upload files to Supabase Storage
    const files = formData.getAll('files') as File[]
    const fileUrls: string[] = []
    console.log('[API Certified Quote] Files to upload:', files.length)

    for (const file of files) {
      if (file.size > 0) {
        const timestamp = Date.now()
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const fileName = `certified/${timestamp}-${safeFileName}`

        const arrayBuffer = await file.arrayBuffer()
        const fileBuffer = new Uint8Array(arrayBuffer)

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('cethosweb-quote-files')
          .upload(fileName, fileBuffer, {
            contentType: file.type,
            cacheControl: '3600',
          })

        if (!uploadError && uploadData) {
          fileUrls.push(uploadData.path)
        } else {
          console.error('File upload error:', uploadError)
        }
      }
    }

    // Save to database
    console.log('[API Certified Quote] Saving to database...')
    const { data: quote, error: dbError } = await supabase
      .from('cethosweb_quote_submissions')
      .insert({
        ...dbData,
        file_urls: fileUrls,
      })
      .select()
      .single()

    if (dbError) {
      console.error('[API Certified Quote] Database error:', dbError)
      console.error('[API Certified Quote] Database error code:', dbError.code)
      console.error('[API Certified Quote] Database error details:', dbError.details)
      throw new Error(`Failed to save quote submission: ${dbError.message}`)
    }
    console.log('[API Certified Quote] Quote saved with ID:', quote?.id)

    // Save file references
    if (quote && fileUrls.length > 0) {
      const fileRecords = fileUrls.map(path => ({
        quote_id: quote.id,
        file_name: path.split('/').pop() || '',
        storage_path: path,
      }))

      const { error: fileDbError } = await supabase
        .from('cethosweb_quote_files')
        .insert(fileRecords)

      if (fileDbError) {
        console.error('File record save error:', fileDbError)
      }
    }

    // Format labels for email
    const documentTypeLabels: Record<string, string> = {
      'birth-certificate': 'Birth Certificate',
      'marriage-certificate': 'Marriage Certificate',
      'divorce-certificate': 'Divorce Certificate',
      'diploma-degree': 'Diploma or Degree',
      'academic-transcript': 'Academic Transcript',
      'police-clearance': 'Police Clearance',
      'employment-letter': 'Employment Letter',
      'bank-statement': 'Bank Statement',
      'passport': 'Passport',
      'drivers-license': "Driver's License",
      'other': 'Other',
    }

    const purposeLabels: Record<string, string> = {
      'pr-application': 'PR Application',
      'citizenship': 'Citizenship',
      'spousal-sponsorship': 'Spousal Sponsorship',
      'express-entry': 'Express Entry',
      'wes-iqas': 'WES/IQAS Evaluation',
      'study-permit': 'Study Permit',
      'work-permit': 'Work Permit',
      'legal-court': 'Legal / Court',
      'personal': 'Personal Use',
      'other': 'Other',
    }

    // Send email notification
    const emailRecipients = process.env.QUOTE_EMAIL_RECIPIENTS?.split(',') || ['info@cethos.com']
    console.log('[API Certified Quote] Sending email to:', emailRecipients)

    try {
      await resend.emails.send({
        from: 'Cethos Quotes <quotes@cethos.com>',
        to: emailRecipients,
        replyTo: rawData.email,
        subject: `New Certified Translation Quote - ${documentTypeLabels[rawData.documentType] || rawData.documentType}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Quote Request</title>
          </head>
          <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #0C2340 0%, #1a3a5c 100%); padding: 30px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #fff; margin: 0; font-size: 24px;">New Certified Translation Quote</h1>
              <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">From: ${rawData.formLocation || 'Website'}</p>
            </div>

            <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
              ${rawData.serviceSpeed === 'same-day' ? `
              <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; color: #92400e; font-weight: bold;">RUSH ORDER - Same-Day Service Requested</p>
              </div>
              ` : ''}

              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Contact Information</h2>
                <p style="margin: 8px 0;"><strong>Name:</strong> ${rawData.fullName}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${rawData.email}" style="color: #0891B2;">${rawData.email}</a></p>
                <p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${rawData.phone}" style="color: #0891B2;">${rawData.phone}</a></p>
              </div>

              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Document Details</h2>
                <p style="margin: 8px 0;"><strong>Document Type:</strong> ${documentTypeLabels[rawData.documentType] || rawData.documentType}</p>
                <p style="margin: 8px 0;"><strong>Source Language:</strong> ${rawData.languageOfDocument}</p>
                <p style="margin: 8px 0;"><strong>Target Language:</strong> English</p>
                <p style="margin: 8px 0;"><strong>Number of Pages:</strong> ${rawData.numberOfPages}</p>
                <p style="margin: 8px 0;"><strong>Purpose:</strong> ${purposeLabels[rawData.purpose] || rawData.purpose}</p>
                <p style="margin: 8px 0;"><strong>Service Speed:</strong> ${rawData.serviceSpeed === 'same-day' ? 'Same-Day Rush (+$25)' : 'Standard (2-3 business days)'}</p>
              </div>

              ${rawData.additionalNotes ? `
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Additional Notes</h2>
                <p style="margin: 0; white-space: pre-wrap;">${rawData.additionalNotes}</p>
              </div>
              ` : ''}

              ${fileUrls.length > 0 ? `
              <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; color: #0C2340;"><strong>📎 ${fileUrls.length} file(s) attached</strong></p>
                <p style="margin: 5px 0 0 0; font-size: 14px; color: #4b5563;">Files have been uploaded to the storage bucket.</p>
              </div>
              ` : ''}

              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #6b7280; font-size: 14px; margin: 0;">Quote ID: ${quote.id}</p>
                <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Edmonton' })}</p>
              </div>
            </div>
          </body>
          </html>
        `,
      })
      console.log('[API Certified Quote] Email sent successfully')
    } catch (emailError: unknown) {
      const emailErr = emailError as Error
      console.error('[API Certified Quote] Email send error:', emailErr.message)
      console.error('[API Certified Quote] Email error stack:', emailErr.stack)
      // Don't fail the request if email fails - the quote was saved
    }

    console.log('[API Certified Quote] Success! Returning response')
    return NextResponse.json({ success: true, id: quote.id })
  } catch (error: unknown) {
    const err = error as Error
    console.error('[API Certified Quote] ERROR:', err.message)
    console.error('[API Certified Quote] Stack:', err.stack)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit quote request. Please try again.',
        message: err.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
