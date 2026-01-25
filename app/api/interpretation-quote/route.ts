import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const Brevo = require('@getbrevo/brevo')

// Route segment config
export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  console.log('[API Interpretation Quote] Request received at:', new Date().toISOString())

  try {
    // Validate Supabase connection
    let supabase
    try {
      supabase = createServerSupabaseClient()
      console.log('[API Interpretation Quote] Supabase client created')
    } catch (supabaseError) {
      console.error('[API Interpretation Quote] Supabase init error:', supabaseError)
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    // Parse formData
    let formData
    try {
      formData = await req.formData()
      console.log('[API Interpretation Quote] FormData keys:', Array.from(formData.keys()))
    } catch (parseError) {
      console.error('[API Interpretation Quote] FormData parse error:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse form data.' },
        { status: 400 }
      )
    }

    // Extract form data
    const rawData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      companyName: formData.get('companyName') as string || '',
      formLocation: formData.get('formLocation') as string,
      interpretationType: formData.get('interpretationType') as string,
      industry: formData.get('industry') as string,
      sourceLanguage: formData.get('sourceLanguage') as string,
      targetLanguages: JSON.parse(formData.get('targetLanguages') as string || '[]'),
      eventDate: formData.get('eventDate') as string,
      eventTime: formData.get('eventTime') as string || '',
      duration: formData.get('duration') as string,
      eventLocation: formData.get('eventLocation') as string || '',
      isRemote: formData.get('isRemote') === 'true',
      platform: formData.get('platform') as string || '',
      additionalNotes: formData.get('additionalNotes') as string || '',
      sourceLanguageLabel: formData.get('sourceLanguageLabel') as string,
      targetLanguageLabels: JSON.parse(formData.get('targetLanguageLabels') as string || '[]'),
    }

    console.log('[API Interpretation Quote] Raw data parsed:', {
      fullName: rawData.fullName,
      email: rawData.email,
      interpretationType: rawData.interpretationType,
      industry: rawData.industry,
      targetLanguagesCount: rawData.targetLanguages?.length,
    })

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'interpretationType', 'industry', 'sourceLanguage', 'eventDate', 'duration']
    const missingFields = requiredFields.filter(field => !rawData[field as keyof typeof rawData])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    if (rawData.targetLanguages.length === 0) {
      return NextResponse.json(
        { error: 'At least one target language is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(rawData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Prepare database record
    const dbData = {
      service_type: 'interpretation',
      full_name: rawData.fullName,
      email: rawData.email,
      phone: rawData.phone,
      company_name: rawData.companyName || null,
      source_language: rawData.sourceLanguage,
      target_languages: rawData.targetLanguages,
      additional_notes: rawData.additionalNotes || null,
      service_data: {
        formLocation: rawData.formLocation,
        interpretationType: rawData.interpretationType,
        industry: rawData.industry,
        eventDate: rawData.eventDate,
        eventTime: rawData.eventTime || null,
        duration: rawData.duration,
        eventLocation: rawData.eventLocation || null,
        isRemote: rawData.isRemote,
        platform: rawData.platform || null,
      },
    }

    // Save to database
    console.log('[API Interpretation Quote] Saving to database...')
    const { data: quote, error: dbError } = await supabase
      .from('cethosweb_quote_submissions')
      .insert(dbData)
      .select()
      .single()

    if (dbError) {
      console.error('[API Interpretation Quote] Database error:', dbError)
      throw new Error(`Failed to save quote submission: ${dbError.message}`)
    }
    console.log('[API Interpretation Quote] Quote saved with ID:', quote?.id)

    // Format labels for email
    const interpretationTypeLabels: Record<string, string> = {
      'on-site': 'On-Site Interpretation',
      'opi': 'Over-the-Phone (OPI)',
      'vri': 'Video Remote (VRI)',
      'simultaneous': 'Simultaneous/Conference',
      'consecutive': 'Consecutive Interpretation',
      'asl': 'ASL / Sign Language',
    }

    const industryLabels: Record<string, string> = {
      'healthcare': 'Healthcare / Medical',
      'legal': 'Legal / Court',
      'business': 'Business / Corporate',
      'government': 'Government',
      'conferences': 'Conferences / Events',
      'education': 'Education',
    }

    const durationLabels: Record<string, string> = {
      '1-hour': '1 Hour',
      '2-hours': '2 Hours',
      'half-day': 'Half Day (4 hours)',
      'full-day': 'Full Day (8 hours)',
      'multi-day': 'Multi-Day Event',
      'ongoing': 'Ongoing / Recurring',
    }

    const platformLabels: Record<string, string> = {
      'zoom': 'Zoom',
      'teams': 'Microsoft Teams',
      'webex': 'Webex',
      'google-meet': 'Google Meet',
      'phone': 'Phone Call',
      'other': 'Other',
    }

    // Send email notification
    const emailRecipients = process.env.QUOTE_EMAIL_RECIPIENTS?.split(',') || ['info@cethos.com']
    console.log('[API Interpretation Quote] Sending email to:', emailRecipients)

    try {
      const apiInstance = new Brevo.TransactionalEmailsApi()
      apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

      const formattedDate = rawData.eventDate
        ? new Date(rawData.eventDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        : 'TBD'

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Interpretation Quote Request</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0C2340 0%, #0891B2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">New Interpretation Quote Request</h1>
            <p style="color: #E0F2FE; margin: 10px 0 0 0; font-size: 14px;">
              ${interpretationTypeLabels[rawData.interpretationType] || rawData.interpretationType} | ${industryLabels[rawData.industry] || rawData.industry}
            </p>
          </div>

          <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Contact Information</h2>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${rawData.fullName}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${rawData.email}" style="color: #0891B2;">${rawData.email}</a></p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${rawData.phone}</p>
              ${rawData.companyName ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${rawData.companyName}</p>` : ''}
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Service Details</h2>
              <p style="margin: 8px 0;"><strong>Interpretation Type:</strong> ${interpretationTypeLabels[rawData.interpretationType] || rawData.interpretationType}</p>
              <p style="margin: 8px 0;"><strong>Industry:</strong> ${industryLabels[rawData.industry] || rawData.industry}</p>
              <p style="margin: 8px 0;"><strong>Source Language:</strong> ${rawData.sourceLanguageLabel || rawData.sourceLanguage}</p>
              <p style="margin: 8px 0;"><strong>Target Languages:</strong> ${rawData.targetLanguageLabels.join(', ') || rawData.targetLanguages.join(', ')}</p>
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Event Details</h2>
              <p style="margin: 8px 0;"><strong>Event Date:</strong> ${formattedDate}</p>
              ${rawData.eventTime ? `<p style="margin: 8px 0;"><strong>Start Time:</strong> ${rawData.eventTime}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Duration:</strong> ${durationLabels[rawData.duration] || rawData.duration}</p>
              <p style="margin: 8px 0;"><strong>Format:</strong> ${rawData.isRemote ? 'Remote / Virtual' : 'On-Site'}</p>
              ${rawData.isRemote && rawData.platform ? `<p style="margin: 8px 0;"><strong>Platform:</strong> ${platformLabels[rawData.platform] || rawData.platform}</p>` : ''}
              ${!rawData.isRemote && rawData.eventLocation ? `<p style="margin: 8px 0;"><strong>Location:</strong> ${rawData.eventLocation}</p>` : ''}
            </div>

            ${rawData.additionalNotes ? `
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Additional Notes</h2>
              <p style="margin: 0; white-space: pre-wrap;">${rawData.additionalNotes}</p>
            </div>
            ` : ''}

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">Quote ID: ${quote.id}</p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Edmonton' })}</p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Form Location: ${rawData.formLocation}</p>
            </div>
          </div>
        </body>
        </html>
      `

      const sendSmtpEmail = new Brevo.SendSmtpEmail()
      sendSmtpEmail.subject = `New Interpretation Quote - ${interpretationTypeLabels[rawData.interpretationType] || rawData.interpretationType} - ${rawData.fullName}`
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.sender = { name: 'Cethos Website', email: 'noreply@cethos.com' }
      sendSmtpEmail.to = emailRecipients.map((email: string) => ({ email: email.trim() }))
      sendSmtpEmail.replyTo = { email: rawData.email }

      await apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log('[API Interpretation Quote] Email sent successfully')
    } catch (emailError: unknown) {
      const emailErr = emailError as Error
      console.error('[API Interpretation Quote] Email send error:', emailErr.message)
      // Don't fail the request if email fails - the quote was saved
    }

    console.log('[API Interpretation Quote] Success! Returning response')
    return NextResponse.json({ success: true, id: quote.id })
  } catch (error: unknown) {
    const err = error as Error
    console.error('[API Interpretation Quote] ERROR:', err.message)
    console.error('[API Interpretation Quote] Stack:', err.stack)
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
