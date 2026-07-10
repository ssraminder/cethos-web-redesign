'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, UploadCloud } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase'
import VideoField from './VideoField'
import {
  COUNTRY_OPTIONS,
  CURRENCY_OPTIONS,
  HOW_HEARD_OPTIONS,
  YEARS_EXPERIENCE_OPTIONS,
} from '@/lib/formOptions'

const MAX_CV_BYTES = 10 * 1024 * 1024 // 10 MB
const CV_BUCKET = 'careers-applications'
const VIDEO_BUCKET = 'careers-videos'

interface Props {
  roleSlug: string
  roleTitle: string
  /** True for on-site roles: swaps the shifted-schedule screening question for an on-site one. */
  onsite?: boolean
}

function extFor(file: File, fallback: string): string {
  const fromName = file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : ''
  return fromName || fallback
}

export default function FullTimeApplicationForm({ roleSlug, roleTitle, onsite }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [progress, setProgress] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [aboutWords, setAboutWords] = useState(0)

  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)

  function onCvChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCvError(null)
    const f = e.target.files?.[0] || null
    if (!f) return setCvFile(null)
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setCvError('Résumé must be a PDF.')
      e.target.value = ''
      return setCvFile(null)
    }
    if (f.size > MAX_CV_BYTES) {
      setCvError('Résumé must be 10 MB or smaller.')
      e.target.value = ''
      return setCvFile(null)
    }
    setCvFile(f)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (cvError) return
    if (!cvFile) return setCvError('Please attach your résumé (PDF).')
    if (!videoFile) {
      setError('Please add an intro video — record one or upload a file.')
      return
    }

    const supabase = createBrowserSupabaseClient()
    if (!supabase) {
      setError('Upload service is unavailable right now. Please try again later.')
      return
    }

    const formEl = e.currentTarget
    const fd = new FormData(formEl)
    // Build the JSON payload from text fields only (files are uploaded separately).
    const payload: Record<string, string> = { role_slug: roleSlug }
    fd.forEach((v, k) => {
      if (typeof v === 'string') payload[k] = v
    })
    payload['consent_privacy'] = fd.get('consent_privacy') ? 'true' : 'false'

    setSubmitting(true)
    try {
      const uid = (crypto as Crypto).randomUUID()

      setProgress('Uploading résumé…')
      const resumePath = `${roleSlug}/${uid}.pdf`
      const cvUp = await supabase.storage
        .from(CV_BUCKET)
        .upload(resumePath, cvFile, { contentType: 'application/pdf', upsert: false })
      if (cvUp.error) {
        setError('Could not upload your résumé. Please try again.')
        return
      }

      setProgress('Uploading video…')
      const videoPath = `${roleSlug}/${uid}.${extFor(videoFile, 'mp4')}`
      const vidUp = await supabase.storage
        .from(VIDEO_BUCKET)
        .upload(videoPath, videoFile, {
          contentType: videoFile.type || 'video/mp4',
          upsert: false,
        })
      if (vidUp.error) {
        await supabase.storage.from(CV_BUCKET).remove([resumePath])
        setError('Could not upload your video. Keep it under 50 MB and try again.')
        return
      }

      setProgress('Submitting…')
      payload['resume_path'] = resumePath
      payload['video_path'] = videoPath
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        await supabase.storage.from(CV_BUCKET).remove([resumePath])
        await supabase.storage.from(VIDEO_BUCKET).remove([videoPath])
        setError(json.error || 'Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
      setProgress(null)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#0C2340] mb-2">Application received</h3>
        <p className="text-[#4B5563] max-w-md mx-auto">
          Thanks for applying for <strong>{roleTitle}</strong>. Our team will review your
          application and be in touch if there&apos;s a fit.
        </p>
      </div>
    )
  }

  const labelCls = 'block text-sm font-medium text-[#0C2340] mb-1.5'
  const inputCls =
    'w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent'
  const req = <span className="text-red-500">*</span>

  return (
    <form onSubmit={onSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 space-y-6">
      <p className="text-sm text-[#4B5563]">Fields marked {req} are required.</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Personal */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="full_name">Full name {req}</label>
          <input id="full_name" name="full_name" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email {req}</label>
          <input id="email" name="email" type="email" required className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="linkedin_url">LinkedIn URL</label>
          <input id="linkedin_url" name="linkedin_url" type="url" placeholder="https://" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="city">City</label>
          <input id="city" name="city" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="country">Country {req}</label>
          <select id="country" name="country" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select your country</option>
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Role + experience */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="role_title">Role applying for {req}</label>
          <input id="role_title" name="role_title" required defaultValue={roleTitle} className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="years_experience">Years of experience {req}</label>
          <select id="years_experience" name="years_experience" required defaultValue="" className={inputCls}>
            <option value="" disabled>Select…</option>
            {YEARS_EXPERIENCE_OPTIONS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Résumé */}
      <div>
        <label className={labelCls} htmlFor="resume">Résumé / CV (PDF, max 10 MB) {req}</label>
        <label htmlFor="resume" className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:border-[#0891B2] transition-colors">
          <UploadCloud className="w-5 h-5 text-[#0891B2]" />
          <span className="text-sm text-[#4B5563] truncate">{cvFile?.name || 'Upload your PDF résumé'}</span>
        </label>
        <input id="resume" type="file" accept="application/pdf,.pdf" onChange={onCvChange} className="sr-only" />
        {cvError && <p className="text-sm text-red-600 mt-1.5">{cvError}</p>}
      </div>

      {/* Intro video — record in-browser or upload a file */}
      <div>
        <label className={labelCls}>Intro video — record or upload (max 50 MB) {req}</label>
        <VideoField onSelect={(f) => setVideoFile(f)} />
      </div>

      {/* Screening */}
      <div>
        <label className={labelCls} htmlFor="screening_experience">
          Describe your relevant experience in linguistic validation / COA / eCOA / cognitive
          debriefing / clinical-trial localization. {req}
        </label>
        <textarea id="screening_experience" name="screening_experience" required rows={4} className={inputCls} />
      </div>

      <div>
        <label className={labelCls} htmlFor="screening_hours">
          {onsite
            ? 'This role is on-site at our downtown Calgary office, Monday to Friday during regular business hours. Are you able to work on-site in Calgary, and are you legally authorized to work in Canada? Describe any constraints.'
            : 'These roles run on a shifted schedule into the evening to cover US and EU clients (e.g. regularly working into the evening, occasionally later for US afternoon / West-Coast calls). Are you able and willing to work these hours? Describe any constraints.'}{' '}
          {req}
        </label>
        <textarea id="screening_hours" name="screening_hours" required rows={3} className={inputCls} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="expected_comp_amount">Expected annual compensation</label>
          <input id="expected_comp_amount" name="expected_comp_amount" inputMode="numeric" placeholder="Amount" className={inputCls} />
        </div>
        <div>
          <label className={labelCls} htmlFor="expected_comp_currency">Currency</label>
          {/* On-site (Canada) roles are paid in CAD only; remote roles offer the full list. */}
          <select
            id="expected_comp_currency"
            name="expected_comp_currency"
            defaultValue={onsite ? 'CAD' : ''}
            className={inputCls}
          >
            {onsite ? (
              <option value="CAD">CAD — Canadian Dollar</option>
            ) : (
              <>
                <option value="">Select…</option>
                {CURRENCY_OPTIONS.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="about_you">
          Tell us something about yourself — in about 200 words. {req}
        </label>
        <textarea
          id="about_you"
          name="about_you"
          required
          rows={6}
          className={inputCls}
          onChange={(e) =>
            setAboutWords(e.target.value.trim() ? e.target.value.trim().split(/\s+/).length : 0)
          }
        />
        <p className="text-xs text-[#6B7280] mt-1.5">{aboutWords} words · aim for ~200</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="how_heard">How did you hear about us?</label>
          <select id="how_heard" name="how_heard" defaultValue="" className={inputCls}>
            <option value="">Select…</option>
            {HOW_HEARD_OPTIONS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="additional_notes">Additional notes</label>
        <textarea id="additional_notes" name="additional_notes" rows={2} className={inputCls} />
      </div>

      {/* Consent */}
      <label className="flex items-start gap-3 text-sm text-[#4B5563]">
        <input type="checkbox" name="consent_privacy" value="true" required className="mt-1 w-4 h-4 accent-[#0891B2]" />
        <span>
          I agree to the{' '}
          <a href="/privacy" target="_blank" className="text-[#0891B2] hover:underline">Privacy Policy</a>
          {' '}and consent to Cethos processing my application. {req}
        </span>
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors disabled:opacity-60"
      >
        {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
        {submitting ? progress || 'Submitting…' : 'Submit application'}
      </button>
    </form>
  )
}
