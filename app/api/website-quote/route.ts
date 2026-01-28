import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const Brevo = require('@getbrevo/brevo')

// Route segment config
export const maxDuration = 60
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  console.log('[API Website Quote] Request received at:', new Date().toISOString())

  try {
    // Validate Supabase connection
    let supabase
    try {
      supabase = createServerSupabaseClient()
      console.log('[API Website Quote] Supabase client created')
    } catch (supabaseError) {
      console.error('[API Website Quote] Supabase init error:', supabaseError)
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    // Parse JSON body
    let rawData
    try {
      rawData = await req.json()
      console.log('[API Website Quote] JSON data received:', {
        fullName: rawData.fullName,
        email: rawData.email,
        websiteUrl: rawData.websiteUrl,
        targetLanguagesCount: rawData.targetLanguages?.length,
      })
    } catch (parseError) {
      console.error('[API Website Quote] JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse request data.' },
        { status: 400 }
      )
    }

    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'websiteUrl', 'sourceLanguage', 'estimatedPageCount', 'projectTimeline']
    const missingFields = requiredFields.filter(field => !rawData[field as keyof typeof rawData])

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    if (!rawData.targetLanguages || rawData.targetLanguages.length === 0) {
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
      service_type: 'website-localization',
      full_name: rawData.fullName,
      email: rawData.email,
      phone: rawData.phone,
      company_name: rawData.companyName || null,
      job_title: null,
      source_language: rawData.sourceLanguage,
      target_languages: rawData.targetLanguages,
      word_count: null, // Will be estimated based on pages
      deadline: rawData.projectTimeline,
      additional_notes: rawData.additionalNotes || null,
      file_urls: [],
      service_data: {
        formLocation: rawData.formLocation,
        websiteUrl: rawData.websiteUrl,
        estimatedPageCount: rawData.estimatedPageCount,
        cmsPlatform: rawData.cmsPlatform || null,
        projectTimeline: rawData.projectTimeline,
        additionalServices: rawData.additionalServices || [],
      },
    }

    // Save to database
    console.log('[API Website Quote] Saving to database...')
    const { data: quote, error: dbError } = await supabase
      .from('cethosweb_quote_submissions')
      .insert(dbData)
      .select()
      .single()

    if (dbError) {
      console.error('[API Website Quote] Database error:', dbError)
      throw new Error(`Failed to save quote submission: ${dbError.message}`)
    }
    console.log('[API Website Quote] Quote saved with ID:', quote?.id)

    // Format labels for email
    const pageCountLabels: Record<string, string> = {
      '1-10': '1-10 pages',
      '11-50': '11-50 pages',
      '51-100': '51-100 pages',
      '101-500': '101-500 pages',
      '500+': '500+ pages',
      'unknown': 'Not sure',
    }

    const timelineLabels: Record<string, string> = {
      'urgent': 'Urgent (1-2 weeks)',
      'standard': 'Standard (2-4 weeks)',
      'flexible': 'Flexible (1-2 months)',
      'planning': 'Just planning',
    }

    const cmsLabels: Record<string, string> = {
      'wordpress': 'WordPress',
      'drupal': 'Drupal',
      'joomla': 'Joomla',
      'shopify': 'Shopify',
      'woocommerce': 'WooCommerce',
      'magento': 'Magento',
      'webflow': 'Webflow',
      'wix': 'Wix',
      'squarespace': 'Squarespace',
      'react': 'React/Next.js',
      'vue': 'Vue/Nuxt.js',
      'custom': 'Custom CMS',
      'other': 'Other',
    }

    const additionalServiceLabels: Record<string, string> = {
      'seo-optimization': 'SEO Optimization',
      'cms-integration': 'CMS Integration',
      'hreflang-setup': 'Hreflang Setup',
      'content-updates': 'Ongoing Content Updates',
      'rtl-support': 'RTL Language Support',
      'qa-testing': 'QA & Functional Testing',
    }

    // Send email notification
    const emailRecipients = process.env.QUOTE_EMAIL_RECIPIENTS?.split(',') || ['info@cethos.com']
    console.log('[API Website Quote] Sending email to:', emailRecipients)

    try {
      const apiInstance = new Brevo.TransactionalEmailsApi()
      apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

      const additionalServicesText = rawData.additionalServices && rawData.additionalServices.length > 0
        ? rawData.additionalServices.map((s: string) => additionalServiceLabels[s] || s).join(', ')
        : 'None selected'

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Website Localization Quote Request</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0C2340 0%, #0891B2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">New Website Localization Quote</h1>
            <p style="color: #E0F2FE; margin: 10px 0 0 0; font-size: 14px;">
              ${pageCountLabels[rawData.estimatedPageCount] || rawData.estimatedPageCount} | ${rawData.targetLanguages.length} language(s)
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
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Website Details</h2>
              <p style="margin: 8px 0;"><strong>Website URL:</strong> <a href="${rawData.websiteUrl}" style="color: #0891B2;" target="_blank">${rawData.websiteUrl}</a></p>
              <p style="margin: 8px 0;"><strong>Source Language:</strong> ${rawData.sourceLanguageLabel || rawData.sourceLanguage}</p>
              <p style="margin: 8px 0;"><strong>Target Languages:</strong> ${rawData.targetLanguageLabels?.join(', ') || rawData.targetLanguages.join(', ')}</p>
              <p style="margin: 8px 0;"><strong>Estimated Pages:</strong> ${pageCountLabels[rawData.estimatedPageCount] || rawData.estimatedPageCount}</p>
              ${rawData.cmsPlatform ? `<p style="margin: 8px 0;"><strong>CMS Platform:</strong> ${cmsLabels[rawData.cmsPlatform] || rawData.cmsPlatform}</p>` : ''}
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Project Details</h2>
              <p style="margin: 8px 0;"><strong>Timeline:</strong> ${timelineLabels[rawData.projectTimeline] || rawData.projectTimeline}</p>
              <p style="margin: 8px 0;"><strong>Additional Services:</strong> ${additionalServicesText}</p>
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
      sendSmtpEmail.subject = `New Website Localization Quote - ${pageCountLabels[rawData.estimatedPageCount] || rawData.estimatedPageCount} - ${rawData.fullName}`
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.sender = { name: 'Cethos Website', email: 'noreply@cethos.com' }
      sendSmtpEmail.to = emailRecipients.map((email: string) => ({ email: email.trim() }))
      sendSmtpEmail.replyTo = { email: rawData.email }

      await apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log('[API Website Quote] Email sent successfully')
    } catch (emailError: unknown) {
      const emailErr = emailError as Error
      console.error('[API Website Quote] Email send error:', emailErr.message)
      // Don't fail the request if email fails - the quote was saved
    }

    console.log('[API Website Quote] Success! Returning response')
    return NextResponse.json({ success: true, id: quote.id })
  } catch (error: unknown) {
    const err = error as Error
    console.error('[API Website Quote] ERROR:', err.message)
    console.error('[API Website Quote] Stack:', err.stack)
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
