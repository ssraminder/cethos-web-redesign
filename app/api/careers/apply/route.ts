import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { getRole } from '@/lib/careers'

const Brevo = require('@getbrevo/brevo')

export const maxDuration = 60
export const dynamic = 'force-dynamic'

const CV_BUCKET = 'careers-applications'
const VIDEO_BUCKET = 'careers-videos'

// Files are uploaded directly from the browser to private Storage buckets
// (Netlify functions cap request bodies at ~6 MB, far below video size). This
// handler receives JSON with the resulting storage paths, validates, inserts the
// application row (service role), and notifies the recruiting inbox.
export async function POST(req: Request) {
  try {
    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (e) {
      console.error('[careers/apply] supabase init error:', e)
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
    }

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    const str = (k: string) => (typeof body[k] === 'string' ? (body[k] as string).trim() : '')

    const role_slug = str('role_slug')
    const role = getRole(role_slug)
    const role_title = str('role_title') || role?.title || null

    const full_name = str('full_name')
    const email = str('email')
    const country = str('country')
    const years_experience = str('years_experience')
    const screening_experience = str('screening_experience')
    const screening_hours = str('screening_hours')
    const about_you = str('about_you')
    const resume_path = str('resume_path')
    const video_path = str('video_path')
    const consent_privacy = body['consent_privacy'] === true || body['consent_privacy'] === 'true'

    const missing: string[] = []
    if (!role_slug || !role) missing.push('role')
    if (!full_name) missing.push('full name')
    if (!email) missing.push('email')
    if (!country) missing.push('country')
    if (!years_experience) missing.push('years of experience')
    if (!screening_experience) missing.push('relevant experience')
    if (!screening_hours) missing.push('schedule willingness')
    if (!about_you) missing.push('about you')
    if (!resume_path) missing.push('résumé / CV')
    if (!video_path) missing.push('intro video')
    if (!consent_privacy) missing.push('privacy consent')
    if (missing.length) {
      return NextResponse.json({ error: `Missing or invalid: ${missing.join(', ')}.` }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 })
    }

    // Uploaded paths must live under this role's prefix (defends against arbitrary
    // path injection from the client).
    if (!resume_path.startsWith(`${role_slug}/`) || !video_path.startsWith(`${role_slug}/`)) {
      return NextResponse.json({ error: 'Invalid upload reference.' }, { status: 400 })
    }

    const compRaw = str('expected_comp_amount')
    const compNum = compRaw ? Number(compRaw.replace(/[^0-9.]/g, '')) : null
    const expected_comp_amount = compNum != null && Number.isFinite(compNum) ? compNum : null

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
      phone: str('phone') || null,
      city: str('city') || null,
      country,
      linkedin_url: str('linkedin_url') || null,
      years_experience,
      resume_bucket: CV_BUCKET,
      resume_path,
      video_bucket: VIDEO_BUCKET,
      video_path,
      screening_experience,
      screening_hours,
      expected_comp_amount,
      expected_comp_currency: str('expected_comp_currency') || null,
      about_you,
      how_heard: str('how_heard') || null,
      referral_source: str('referral_source').slice(0, 80) || null,
      additional_notes: str('additional_notes') || null,
      consent_privacy: true,
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
      // Best-effort cleanup of the orphaned uploads.
      await supabase.storage.from(CV_BUCKET).remove([resume_path])
      await supabase.storage.from(VIDEO_BUCKET).remove([video_path])
      return NextResponse.json({ error: 'Could not submit application. Please try again.' }, { status: 500 })
    }

    try {
      const recipients =
        process.env.CAREERS_EMAIL_RECIPIENTS?.split(',') || ['office@cethoscorp.com']
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
            ${row.referral_source ? `<p><strong>Referral source:</strong> ${esc(row.referral_source)}</p>` : ''}
            <p style="margin-top:16px;"><strong>Relevant experience:</strong><br>${esc(screening_experience)}</p>
            <p><strong>Shifted-schedule willingness:</strong><br>${esc(screening_hours)}</p>
            <p><strong>About them:</strong><br>${esc(about_you)}</p>
            ${row.additional_notes ? `<p><strong>Notes:</strong><br>${esc(row.additional_notes)}</p>` : ''}
            <p style="color:#6b7280; font-size:13px; margin-top:20px;">CV + intro video attached to the application. View in the portal → Employment Applications. ID: ${inserted?.id}</p>
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
    return NextResponse.json({ error: 'Failed to submit application. Please try again.' }, { status: 500 })
  }
}
