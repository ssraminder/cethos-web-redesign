import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const Brevo = require('@getbrevo/brevo')

// Route segment config
export const maxDuration = 60
export const dynamic = 'force-dynamic'

// Service type labels for email
const SERVICE_TYPE_LABELS: Record<string, string> = {
  'business-translation': 'Business Translation',
  'legal-translation': 'Legal Translation',
  'software-localization': 'Software Localization',
  'website-localization': 'Website Localization',
  'multimedia-translation': 'Multimedia Translation',
}

export async function POST(req: Request) {
  console.log('[API General Quote] Request received at:', new Date().toISOString())

  try {
    // Validate Supabase connection
    let supabase
    try {
      supabase = createServerSupabaseClient()
      console.log('[API General Quote] Supabase client created')
    } catch (supabaseError) {
      console.error('[API General Quote] Supabase init error:', supabaseError)
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    // Parse JSON body
    let body
    try {
      body = await req.json()
      console.log('[API General Quote] Body parsed:', {
        service_type: body.service_type,
        email: body.email,
      })
    } catch (parseError) {
      console.error('[API General Quote] JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse request body.' },
        { status: 400 }
      )
    }

    // Validate required fields
    const requiredFields = ['full_name', 'email', 'phone', 'source_language', 'service_type']
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
      service_type: body.service_type,
      full_name: body.full_name,
      email: body.email,
      phone: body.phone,
      company_name: body.company || null,
      job_title: body.job_title || null,
      source_language: body.source_language,
      target_languages: body.target_languages || [],
      word_count: additionalInfo.word_count || null,
      deadline: additionalInfo.turnaround || 'standard',
      additional_notes: additionalInfo.additional_notes || null,
      file_urls: [],
      service_data: additionalInfo,
    }

    // Save to database
    console.log('[API General Quote] Saving to database...')
    const { data: quote, error: dbError } = await supabase
      .from('cethosweb_quote_submissions')
      .insert(dbData)
      .select()
      .single()

    if (dbError) {
      console.error('[API General Quote] Database error:', dbError)
      throw new Error(`Failed to save quote submission: ${dbError.message}`)
    }
    console.log('[API General Quote] Quote saved with ID:', quote?.id)

    // Build email content based on service type
    const serviceLabel = SERVICE_TYPE_LABELS[body.service_type] || body.service_type

    // Format additional details for email
    const formatAdditionalInfo = (info: Record<string, unknown>, serviceType: string) => {
      const sections: string[] = []

      switch (serviceType) {
        case 'business-translation':
          if (info.document_type) sections.push(`<p style="margin: 8px 0;"><strong>Document Type:</strong> ${info.document_type}</p>`)
          if (info.industry) sections.push(`<p style="margin: 8px 0;"><strong>Industry:</strong> ${info.industry}</p>`)
          if (info.word_count) sections.push(`<p style="margin: 8px 0;"><strong>Word Count:</strong> ${info.word_count}</p>`)
          break

        case 'legal-translation':
          if (info.document_type) sections.push(`<p style="margin: 8px 0;"><strong>Document Type:</strong> ${info.document_type}</p>`)
          if (info.practice_area) sections.push(`<p style="margin: 8px 0;"><strong>Practice Area:</strong> ${info.practice_area}</p>`)
          if (info.word_count) sections.push(`<p style="margin: 8px 0;"><strong>Word Count:</strong> ${info.word_count}</p>`)
          if (info.certified_translation) sections.push(`<p style="margin: 8px 0;"><strong>Certified Translation:</strong> Yes</p>`)
          break

        case 'software-localization':
          if (info.project_type) sections.push(`<p style="margin: 8px 0;"><strong>Project Type:</strong> ${info.project_type}</p>`)
          if (info.file_format) sections.push(`<p style="margin: 8px 0;"><strong>File Format:</strong> ${info.file_format}</p>`)
          if (info.string_count) sections.push(`<p style="margin: 8px 0;"><strong>String Count:</strong> ${info.string_count}</p>`)
          if (info.word_count) sections.push(`<p style="margin: 8px 0;"><strong>Word Count:</strong> ${info.word_count}</p>`)
          break

        case 'website-localization':
          if (info.website_type) sections.push(`<p style="margin: 8px 0;"><strong>Website Type:</strong> ${info.website_type}</p>`)
          if (info.cms_platform) sections.push(`<p style="margin: 8px 0;"><strong>CMS Platform:</strong> ${info.cms_platform}</p>`)
          if (info.website_url) sections.push(`<p style="margin: 8px 0;"><strong>Website URL:</strong> <a href="${info.website_url}" style="color: #0891B2;">${info.website_url}</a></p>`)
          if (info.page_count) sections.push(`<p style="margin: 8px 0;"><strong>Page Count:</strong> ${info.page_count}</p>`)
          if (info.seo_optimization) sections.push(`<p style="margin: 8px 0;"><strong>SEO Optimization:</strong> Yes</p>`)
          break

        case 'multimedia-translation':
          if (info.multimedia_service_type) sections.push(`<p style="margin: 8px 0;"><strong>Service Type:</strong> ${info.multimedia_service_type}</p>`)
          if (info.content_type) sections.push(`<p style="margin: 8px 0;"><strong>Content Type:</strong> ${info.content_type}</p>`)
          if (info.video_duration_minutes) sections.push(`<p style="margin: 8px 0;"><strong>Duration:</strong> ${info.video_duration_minutes} minutes</p>`)
          if (info.number_of_videos) sections.push(`<p style="margin: 8px 0;"><strong>Number of Videos:</strong> ${info.number_of_videos}</p>`)
          break
      }

      if (info.turnaround) sections.push(`<p style="margin: 8px 0;"><strong>Turnaround:</strong> ${info.turnaround}</p>`)

      return sections.join('')
    }

    // Send email notification
    const emailRecipients = process.env.QUOTE_EMAIL_RECIPIENTS?.split(',') || ['info@cethos.com']
    console.log('[API General Quote] Sending email to:', emailRecipients)

    try {
      const apiInstance = new Brevo.TransactionalEmailsApi()
      apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New ${serviceLabel} Quote Request</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0C2340 0%, #0891B2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">New ${serviceLabel} Quote Request</h1>
          </div>

          <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Contact Information</h2>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${body.full_name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${body.email}" style="color: #0891B2;">${body.email}</a></p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${body.phone}</p>
              ${body.company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${body.company}</p>` : ''}
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Service Details</h2>
              <p style="margin: 8px 0;"><strong>Service Type:</strong> ${serviceLabel}</p>
              ${formatAdditionalInfo(additionalInfo, body.service_type)}
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Language Details</h2>
              <p style="margin: 8px 0;"><strong>Source Language:</strong> ${body.source_language}</p>
              <p style="margin: 8px 0;"><strong>Target Languages:</strong> ${body.target_languages?.join(', ') || 'Not specified'}</p>
            </div>

            ${additionalInfo.additional_notes ? `
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Additional Notes</h2>
              <p style="margin: 0; white-space: pre-wrap;">${additionalInfo.additional_notes}</p>
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
      sendSmtpEmail.subject = `New ${serviceLabel} Quote - ${body.full_name}`
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.sender = { name: 'Cethos Website', email: 'noreply@cethos.com' }
      sendSmtpEmail.to = emailRecipients.map((email: string) => ({ email: email.trim() }))
      sendSmtpEmail.replyTo = { email: body.email }

      await apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log('[API General Quote] Email sent successfully')
    } catch (emailError: unknown) {
      const emailErr = emailError as Error
      console.error('[API General Quote] Email send error:', emailErr.message)
      // Don't fail the request if email fails - the quote was saved
    }

    console.log('[API General Quote] Success! Returning response')
    return NextResponse.json({ success: true, id: quote.id })
  } catch (error: unknown) {
    const err = error as Error
    console.error('[API General Quote] ERROR:', err.message)
    console.error('[API General Quote] Stack:', err.stack)
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
