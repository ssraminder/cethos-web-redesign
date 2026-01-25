import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const Brevo = require('@getbrevo/brevo')

// Route segment config
export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  console.log('[API Transcription Quote] Request received at:', new Date().toISOString())

  try {
    // Validate Supabase connection
    let supabase
    try {
      supabase = createServerSupabaseClient()
      console.log('[API Transcription Quote] Supabase client created')
    } catch (supabaseError) {
      console.error('[API Transcription Quote] Supabase init error:', supabaseError)
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    // Parse JSON body
    let body
    try {
      body = await req.json()
      console.log('[API Transcription Quote] Body parsed:', {
        service_type: body.service_type,
        transcription_type: body.additional_info?.transcription_type,
        email: body.email,
      })
    } catch (parseError) {
      console.error('[API Transcription Quote] JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse request body.' },
        { status: 400 }
      )
    }

    // Validate required fields
    const requiredFields = ['full_name', 'email', 'phone', 'source_language']
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Extract additional info
    const additionalInfo = body.additional_info || {}

    // Prepare database record
    const dbData = {
      service_type: body.service_type || 'transcription',
      full_name: body.full_name,
      email: body.email,
      phone: body.phone,
      company_name: body.company || null,
      job_title: body.job_title || null,
      source_language: body.source_language,
      target_languages: body.target_languages || [],
      word_count: null, // Not applicable for transcription - duration is used instead
      deadline: additionalInfo.turnaround || 'standard', // Map turnaround to deadline field
      additional_notes: additionalInfo.additional_details || null,
      file_urls: [], // Files are mentioned in service_data, not uploaded directly
      service_data: {
        transcription_type: additionalInfo.transcription_type,
        legal_sub_type: additionalInfo.legal_sub_type || null,
        audio_format: additionalInfo.audio_format,
        duration_minutes: additionalInfo.duration_minutes,
        speaker_count: additionalInfo.speaker_count || null,
        transcription_style: additionalInfo.transcription_style,
        output_format: additionalInfo.output_format,
        turnaround: additionalInfo.turnaround,
        needs_translation: additionalInfo.needs_translation || false,
        file_count: additionalInfo.file_count || 0,
        file_names: additionalInfo.file_names || [],
      },
    }

    // Save to database
    console.log('[API Transcription Quote] Saving to database...')
    const { data: quote, error: dbError } = await supabase
      .from('cethosweb_quote_submissions')
      .insert(dbData)
      .select()
      .single()

    if (dbError) {
      console.error('[API Transcription Quote] Database error:', dbError)
      throw new Error(`Failed to save quote submission: ${dbError.message}`)
    }
    console.log('[API Transcription Quote] Quote saved with ID:', quote?.id)

    // Format labels for email
    const transcriptionTypeLabels: Record<string, string> = {
      'legal': 'Legal Transcription',
      'medical': 'Medical Transcription',
      'business': 'Business / Corporate',
      'academic': 'Academic / Research',
      'media': 'Media / Podcast',
      'insurance': 'Insurance / Claims',
      'transcription-translation': 'Transcription + Translation',
      'other': 'Other',
    }

    const legalSubTypeLabels: Record<string, string> = {
      'deposition': 'Deposition / Examination',
      'court-hearing': 'Court Hearing',
      'trial': 'Trial Proceedings',
      'arbitration': 'Arbitration / Mediation',
      'witness-statement': 'Witness Statement / Interview',
      'legal-dictation': 'Legal Dictation',
      'surveillance': 'Surveillance / Wiretap Audio',
      'administrative': 'Administrative Hearing',
      'other': 'Other Legal',
    }

    const transcriptionStyleLabels: Record<string, string> = {
      'verbatim': 'Verbatim (Every word, fillers included)',
      'clean-verbatim': 'Clean Verbatim (Edited for readability)',
      'intelligent': 'Intelligent Verbatim (Summarized)',
    }

    const outputFormatLabels: Record<string, string> = {
      'word': 'Microsoft Word (.docx)',
      'pdf': 'PDF (Searchable)',
      'txt': 'Plain Text (.txt)',
      'timestamped': 'Time-Stamped Transcript',
      'legal-format': 'Legal Format (Line-Numbered)',
      'ascii': 'ASCII (Litigation Software)',
      'other': 'Other',
    }

    const turnaroundLabels: Record<string, string> = {
      'standard': 'Standard (3-5 Business Days)',
      'rush': 'Rush (24-48 Hours)',
      'same-day': 'Same-Day',
      'overnight': 'Overnight (Next Morning)',
      'flexible': 'Flexible / Contact Me',
    }

    const audioFormatLabels: Record<string, string> = {
      'mp3': 'MP3',
      'mp4': 'MP4 (Video)',
      'wav': 'WAV / AIFF',
      'wma': 'WMA / WMV',
      'mov': 'MOV / M4A',
      'digital': 'Digital Recording',
      'cassette': 'Cassette / VHS',
      'dvd': 'DVD',
      'streaming': 'Streaming URL',
      'court-system': 'Court Recording System (FTR, JAVS)',
      'other': 'Other',
    }

    // Format duration
    const durationMinutes = additionalInfo.duration_minutes || 0
    const hours = Math.floor(durationMinutes / 60)
    const minutes = durationMinutes % 60
    const formattedDuration = hours > 0
      ? `${hours} hour(s) ${minutes > 0 ? `${minutes} minute(s)` : ''}`
      : `${minutes} minute(s)`

    // Send email notification
    const emailRecipients = process.env.QUOTE_EMAIL_RECIPIENTS?.split(',') || ['info@cethos.com']
    console.log('[API Transcription Quote] Sending email to:', emailRecipients)

    try {
      const apiInstance = new Brevo.TransactionalEmailsApi()
      apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

      const transcriptionType = additionalInfo.transcription_type || 'unknown'
      const serviceLabel = transcriptionTypeLabels[transcriptionType] || transcriptionType

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Transcription Quote Request</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0C2340 0%, #0891B2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">New Transcription Quote Request</h1>
            <p style="color: #E0F2FE; margin: 10px 0 0 0; font-size: 14px;">
              ${serviceLabel}${additionalInfo.legal_sub_type ? ` - ${legalSubTypeLabels[additionalInfo.legal_sub_type] || additionalInfo.legal_sub_type}` : ''}
            </p>
          </div>

          <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Contact Information</h2>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${body.full_name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${body.email}" style="color: #0891B2;">${body.email}</a></p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${body.phone}</p>
              ${body.company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${body.company}</p>` : ''}
              ${body.job_title ? `<p style="margin: 8px 0;"><strong>Job Title:</strong> ${body.job_title}</p>` : ''}
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Transcription Details</h2>
              <p style="margin: 8px 0;"><strong>Service Type:</strong> ${serviceLabel}</p>
              ${additionalInfo.legal_sub_type ? `<p style="margin: 8px 0;"><strong>Legal Document Type:</strong> ${legalSubTypeLabels[additionalInfo.legal_sub_type] || additionalInfo.legal_sub_type}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Audio Format:</strong> ${audioFormatLabels[additionalInfo.audio_format] || additionalInfo.audio_format || 'Not specified'}</p>
              <p style="margin: 8px 0;"><strong>Duration:</strong> ${formattedDuration}</p>
              ${additionalInfo.speaker_count ? `<p style="margin: 8px 0;"><strong>Number of Speakers:</strong> ${additionalInfo.speaker_count}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Transcription Style:</strong> ${transcriptionStyleLabels[additionalInfo.transcription_style] || additionalInfo.transcription_style}</p>
              <p style="margin: 8px 0;"><strong>Output Format:</strong> ${outputFormatLabels[additionalInfo.output_format] || additionalInfo.output_format}</p>
              <p style="margin: 8px 0;"><strong>Turnaround:</strong> ${turnaroundLabels[additionalInfo.turnaround] || additionalInfo.turnaround}</p>
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Language Details</h2>
              <p style="margin: 8px 0;"><strong>Source Language:</strong> ${body.source_language}</p>
              <p style="margin: 8px 0;"><strong>Translation Required:</strong> ${additionalInfo.needs_translation ? 'Yes' : 'No'}</p>
              ${additionalInfo.needs_translation && body.target_languages?.length > 0 ? `<p style="margin: 8px 0;"><strong>Target Language(s):</strong> ${body.target_languages.join(', ')}</p>` : ''}
            </div>

            ${additionalInfo.file_count > 0 ? `
            <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #0C2340;"><strong>📎 ${additionalInfo.file_count} file(s) mentioned</strong></p>
              ${additionalInfo.file_names?.length > 0 ? `<p style="margin: 5px 0 0 0; font-size: 14px; color: #4b5563;">Files: ${additionalInfo.file_names.join(', ')}</p>` : ''}
            </div>
            ` : ''}

            ${additionalInfo.additional_details ? `
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Additional Details</h2>
              <p style="margin: 0; white-space: pre-wrap;">${additionalInfo.additional_details}</p>
            </div>
            ` : ''}

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">Quote ID: ${quote.id}</p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Edmonton' })}</p>
            </div>
          </div>
        </body>
        </html>
      `

      const sendSmtpEmail = new Brevo.SendSmtpEmail()
      sendSmtpEmail.subject = `New Transcription Quote - ${serviceLabel} - ${body.full_name}`
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.sender = { name: 'Cethos Website', email: 'noreply@cethos.com' }
      sendSmtpEmail.to = emailRecipients.map((email: string) => ({ email: email.trim() }))
      sendSmtpEmail.replyTo = { email: body.email }

      await apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log('[API Transcription Quote] Email sent successfully')
    } catch (emailError: unknown) {
      const emailErr = emailError as Error
      console.error('[API Transcription Quote] Email send error:', emailErr.message)
      // Don't fail the request if email fails - the quote was saved
    }

    console.log('[API Transcription Quote] Success! Returning response')
    return NextResponse.json({ success: true, id: quote.id })
  } catch (error: unknown) {
    const err = error as Error
    console.error('[API Transcription Quote] ERROR:', err.message)
    console.error('[API Transcription Quote] Stack:', err.stack)
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
