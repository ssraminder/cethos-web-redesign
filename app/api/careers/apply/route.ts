import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import { getRole } from '@/lib/careers'

const Brevo = require('@getbrevo/brevo')

export const maxDuration = 60
export const dynamic = 'force-dynamic'

const MAX_CV_BYTES = 10 * 1024 * 1024 // 10 MB
const BUCKET = 'careers-applications'

export async function POST(req: Request) {
  try {
    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (e) {
      console.error('[careers/apply] supabase init error:', e)
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    const form = await req.formData()
    const get = (k: string) => {
      const v = form.get(k)
      return typeof v === 'string' ? v.trim() : ''
    }

    const role_slug = get('role_slug')
    const role = getRole(role_slug)
    const role_title = get('role_title') || role?.title || null

    const full_name = get('full_name')
    const email = get('email')
    const country = get('country')
    const years_experience = get('years_experience')
    const screening_experience = get('screening_experience')
    const screening_hours = get('screening_hours')
    const about_you = get('about_you')
    const consent_privacy = get('consent_privacy') === 'true'
    const resume = form.get('resume')

    // Required-field validation
    const missing: string[] = []
    if (!role_slug || !role) missing.push('role')
    if (!full_name) missing.push('full name')
    if (!email) missing.push('email')
    if (!country) missing.push('country')
    if (!years_experience) missing.push('years of experience')
    if (!screening_experience) missing.push('relevant experience')
    if (!screening_hours) missing.push('schedule willingness')
    if (!about_you) missing.push('about you')
    if (!consent_privacy) missing.push('privacy consent')
    if (!(resume instanceof File) || resume.size === 0) missing.push('résumé / CV')
    if (missing.length) {
      return NextResponse.json(
        { error: `Missing or invalid: ${missing.join(', ')}.` },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
    }

    const cv = resume as File
    if (cv.type !== 'application/pdf' && !cv.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ error: 'Résumé must be a PDF.' }, { status: 400 })
    }
    if (cv.size > MAX_CV_BYTES) {
      return NextResponse.json({ error: 'Résumé must be 10 MB or smaller.' }, { status: 400 })
    }

    // Upload CV to the private bucket (service role).
    const resume_path = `${role_slug}/${randomUUID()}.pdf`
    const buffer = Buffer.from(await cv.arrayBuffer())
    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(resume_path, buffer, { contentType: 'application/pdf', upsert: false })
    if (uploadErr) {
      console.error('[careers/apply] CV upload error:', uploadErr)
      return NextResponse.json({ error: 'Could not upload résumé. Please try again.' }, { status: 500 })
    }

    const compRaw = get('expected_comp_amount')
    const expected_comp_amount = compRaw ? Number(compRaw.replace(/[^0-9.]/g, '')) : null

    const ip_address =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      null
    const user_agent = req.headers.get('user-agent') || null

    const row = {
      role_slug,
      role_title,
      full_name,
      email,
      phone: get('phone') || null,
      city: get('city') || null,
      country,
      linkedin_url: get('linkedin_url') || null,
      years_experience,
      resume_bucket: BUCKET,
      resume_path,
      screening_experience,
      screening_hours,
      expected_comp_amount: Number.isFinite(expected_comp_amount as number) ? expected_comp_amount : null,
      expected_comp_currency: get('expected_comp_currency') || null,
      about_you,
      how_heard: get('how_heard') || null,
      additional_notes: get('additional_notes') || null,
      consent_privacy,
      status: 'new',
      source: 'careers-web',
      ip_address,
      user_agent,
    }

    const { data: inserted, error: dbError } = await supabase
      .from('fulltime_applications')
      .insert(row)
      .select('id')
      .single()

    if (dbError) {
      console.error('[careers/apply] insert error:', dbError)
      // Best-effort cleanup of the orphaned upload.
      await supabase.storage.from(BUCKET).remove([resume_path])
      return NextResponse.json({ error: 'Could not submit application. Please try again.' }, { status: 500 })
    }

    // Notify the recruiting inbox (non-fatal).
    try {
      const recipients =
        process.env.CAREERS_EMAIL_RECIPIENTS?.split(',') ||
        ['office@cethoscorp.com']
      const apiInstance = new Brevo.TransactionalEmailsApi()
      apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)
      const esc = (s: string) => String(s).replace(/</g, '&lt;').replace(/>/g, '&gt;')
      const htmlContent = `
        <div style="font-family: 'Segoe UI', sans-serif; line-height:1.6; color:#333; max-width:640px; margin:0 auto;">
          <div style="background:linear-gradient(135deg,#0C2340,#0891B2); padding:24px; border-radius:12px 12px 0 0;">
            <h1 style="color:#fff; margin:0; font-size:20px;">New full-time application</h1>
            <p style="color:#cbd5e1; margin:6px 0 0;">${esc(role_title || role_slug)}</p>
          </div>
          <div style="background:#fff; padding:24px; border:1px solid #e5e7eb; border-top:none; border-radius:0 0 12px 12px;">
            <p><strong>Name:</strong> ${esc(full_name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
            <p><strong>Location:</strong> ${esc([row.city, country].filter(Boolean).join(', '))}</p>
            <p><strong>Experience:</strong> ${esc(years_experience)}</p>
            ${expected_comp_amount != null ? `<p><strong>Expected comp:</strong> ${esc(String(expected_comp_amount))} ${esc(row.expected_comp_currency || '')}</p>` : ''}
            ${row.linkedin_url ? `<p><strong>LinkedIn:</strong> ${esc(row.linkedin_url)}</p>` : ''}
            <p style="margin-top:16px;"><strong>Relevant experience:</strong><br>${esc(screening_experience)}</p>
            <p><strong>Shifted-schedule willingness:</strong><br>${esc(screening_hours)}</p>
            <p><strong>About them:</strong><br>${esc(about_you)}</p>
            ${row.additional_notes ? `<p><strong>Notes:</strong><br>${esc(row.additional_notes)}</p>` : ''}
            <p style="color:#6b7280; font-size:13px; margin-top:20px;">View in the portal → Employment Applications. Application ID: ${inserted?.id}</p>
          </div>
        </div>`
      const sendSmtpEmail = new Brevo.SendSmtpEmail()
      sendSmtpEmail.subject = `New full-time application — ${role_title || role_slug} — ${full_name}`
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.sender = { name: 'Cethos Careers', email: 'noreply@cethos.com' }
      sendSmtpEmail.to = recipients.map((e: string) => ({ email: e.trim() }))
      sendSmtpEmail.replyTo = { email }
      await apiInstance.sendTransacEmail(sendSmtpEmail)
    } catch (emailErr) {
      console.error('[careers/apply] email error (non-fatal):', (emailErr as Error).message)
    }

    return NextResponse.json({ success: true, id: inserted?.id })
  } catch (error) {
    console.error('[careers/apply] ERROR:', (error as Error).message)
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again.' },
      { status: 500 },
    )
  }
}
