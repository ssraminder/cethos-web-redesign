import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

const Brevo = require('@getbrevo/brevo')

export const maxDuration = 60
export const dynamic = 'force-dynamic'

const PROVINCE_LABELS: Record<string, string> = {
  AB: 'Alberta',
  BC: 'British Columbia',
  ON: 'Ontario',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland and Labrador',
  NS: 'Nova Scotia',
  PE: 'Prince Edward Island',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  YT: 'Yukon',
  federal: 'Federal (RCMP / IRCC / Federal Court)',
  unsure: 'Not sure',
}

const DROPOFF_LABELS: Record<string, string> = {
  calgary_office: 'Calgary drop-off (421 7 Avenue SW, Floor 30)',
  courier: 'Prepaid Purolator courier from my city',
}

export async function POST(req: Request) {
  console.log('[API Apostille Quote] Request received at:', new Date().toISOString())

  try {
    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (supabaseError) {
      console.error('[API Apostille Quote] Supabase init error:', supabaseError)
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    let body: any
    try {
      body = await req.json()
    } catch (parseError) {
      return NextResponse.json({ error: 'Failed to parse request body.' }, { status: 400 })
    }

    const requiredFields = ['full_name', 'email', 'phone', 'document_types', 'issuing_province']
    const missingFields = requiredFields.filter((field) => {
      const v = body[field]
      if (Array.isArray(v)) return v.length === 0
      return !v
    })

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const adTracking = body.ad_tracking || {}

    const apostilleData = {
      document_types: body.document_types,
      issuing_province: body.issuing_province,
      destination_country: body.destination_country || null,
      num_documents: body.num_documents || null,
      needs_notarization: !!body.needs_notarization,
      needs_translation: !!body.needs_translation,
      dropoff_mode: body.dropoff_mode || null,
      additional_notes: body.additional_notes || null,
    }

    const dbData = {
      service_type: 'apostille',
      full_name: body.full_name,
      email: body.email,
      phone: body.phone,
      company_name: body.company || null,
      source_language: 'n/a',
      target_languages: [],
      additional_notes: body.additional_notes || null,
      file_urls: body.file_urls || [],
      service_data: { ...apostilleData, ad_tracking: adTracking },
    }

    const { data: quote, error: dbError } = await supabase
      .from('cethosweb_quote_submissions')
      .insert(dbData)
      .select()
      .single()

    if (dbError) {
      console.error('[API Apostille Quote] Database error:', dbError)
      throw new Error(`Failed to save quote submission: ${dbError.message}`)
    }
    console.log('[API Apostille Quote] Quote saved with ID:', quote?.id)

    const documentTypesLine = Array.isArray(body.document_types)
      ? body.document_types.join(', ')
      : String(body.document_types || '')
    const provinceLabel = PROVINCE_LABELS[body.issuing_province] || body.issuing_province
    const dropoffLabel = body.dropoff_mode ? DROPOFF_LABELS[body.dropoff_mode] || body.dropoff_mode : 'Not specified'

    const emailRecipients = process.env.QUOTE_EMAIL_RECIPIENTS?.split(',') || ['info@cethos.com']

    try {
      const apiInstance = new Brevo.TransactionalEmailsApi()
      apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"><title>New Apostille Quote Request</title></head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0C2340 0%, #0891B2 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">New Apostille Quote Request</h1>
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
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Apostille Details</h2>
              <p style="margin: 8px 0;"><strong>Document Type(s):</strong> ${documentTypesLine}</p>
              <p style="margin: 8px 0;"><strong>Issuing Province / Authority:</strong> ${provinceLabel}</p>
              ${body.destination_country ? `<p style="margin: 8px 0;"><strong>Destination Country:</strong> ${body.destination_country}</p>` : ''}
              ${body.num_documents ? `<p style="margin: 8px 0;"><strong>Number of Documents:</strong> ${body.num_documents}</p>` : ''}
              <p style="margin: 8px 0;"><strong>Notarization Needed:</strong> ${body.needs_notarization ? 'Yes' : 'No'}</p>
              <p style="margin: 8px 0;"><strong>Translation Needed:</strong> ${body.needs_translation ? 'Yes' : 'No'}</p>
              <p style="margin: 8px 0;"><strong>Drop-off / Courier:</strong> ${dropoffLabel}</p>
            </div>
            ${body.additional_notes ? `
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Additional Notes</h2>
              <p style="margin: 0; white-space: pre-wrap;">${body.additional_notes}</p>
            </div>
            ` : ''}
            ${Array.isArray(body.file_urls) && body.file_urls.length > 0 ? `
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Attached Documents</h2>
              ${body.file_urls.map((u: string) => `<p style="margin: 4px 0;"><a href="${u}" style="color: #0891B2;">${u}</a></p>`).join('')}
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
      sendSmtpEmail.subject = `New Apostille Quote - ${body.full_name}`
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.sender = { name: 'Cethos Website', email: 'noreply@cethos.com' }
      sendSmtpEmail.to = emailRecipients.map((email: string) => ({ email: email.trim() }))
      sendSmtpEmail.replyTo = { email: body.email }

      await apiInstance.sendTransacEmail(sendSmtpEmail)
    } catch (emailError: unknown) {
      const emailErr = emailError as Error
      console.error('[API Apostille Quote] Email send error:', emailErr.message)
    }

    return NextResponse.json({ success: true, id: quote.id })
  } catch (error: unknown) {
    const err = error as Error
    console.error('[API Apostille Quote] ERROR:', err.message)
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
