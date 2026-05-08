'use client'

import { useEffect, useRef, useState } from 'react'
import { CheckCircle, Loader2, X, AlertCircle } from 'lucide-react'
import { getAdTrackingPayload } from '@/lib/ad-tracking'
import { trackGenerateLead, trackConsultEvent, type ConsultPlacement } from '@/lib/tracking'

interface ApostilleCallbackModalProps {
  open: boolean
  onClose: () => void
  placement: ConsultPlacement
  /** Click "or pick a time on Zoom" → close modal, host scrolls to picker. */
  onSwitchToBooking?: () => void
}

const PREFERRED_TIMES = [
  { value: 'morning', label: 'Morning (9am – 12pm MT)' },
  { value: 'afternoon', label: 'Afternoon (12pm – 5pm MT)' },
  { value: 'anytime', label: 'Anytime during business hours' },
]

export function ApostilleCallbackModal({
  open,
  onClose,
  placement,
  onSwitchToBooking,
}: ApostilleCallbackModalProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [preferredTime, setPreferredTime] = useState('anytime')
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const firstFieldRef = useRef<HTMLInputElement>(null)

  // Reset state when modal closes (so it's fresh on re-open).
  useEffect(() => {
    if (!open) {
      setSuccess(false)
      setErrors({})
      setSubmitting(false)
    } else {
      // Focus first field on open
      setTimeout(() => firstFieldRef.current?.focus(), 50)
    }
  }, [open])

  // ESC closes
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && !submitting) onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, submitting, onClose])

  if (!open) return null

  function validate(): boolean {
    const next: Record<string, string> = {}
    if (!fullName.trim()) next.fullName = 'Please enter your name.'
    if (!email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email.'
    if (!phone.trim()) next.phone = 'Please enter your phone — this is how we’ll call you back.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate() || submitting) return
    setSubmitting(true)
    setErrors({})

    try {
      const adTracking = getAdTrackingPayload()
      const additionalNotes = [
        notes.trim(),
        `Preferred call time: ${
          PREFERRED_TIMES.find((t) => t.value === preferredTime)?.label || preferredTime
        }`,
      ]
        .filter(Boolean)
        .join('\n\n')

      const res = await fetch('/api/apostille-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          // Apostille consult records require document_types + issuing_province; we
          // don't ask in the callback modal (the specialist gathers on the call),
          // so send sentinel placeholders so the API's required-fields check passes.
          document_types: ['(callback — not yet specified)'],
          issuing_province: 'unsure',
          additional_notes: additionalNotes || null,
          ad_tracking: adTracking,
          source_url: typeof window !== 'undefined' ? window.location.href : '',
          form_location: 'apostille-callback-modal',
          lead_type: 'consult',
          consult_method: 'callback',
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || data?.message || 'Submission failed.')
      }

      trackGenerateLead('quote', 'Apostille Callback Requested', 'apostille_consult')
      trackConsultEvent('booking_completed', { placement, lead_type: 'apostille_consult', consult_method: 'callback' })
      setSuccess(true)
    } catch (err) {
      setErrors({ submit: (err as Error).message || 'Something went wrong. Please try again.' })
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto"
      style={{ backgroundColor: 'rgba(12, 35, 64, 0.7)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="callback-modal-title"
      onMouseDown={(e) => {
        // Click outside the dialog body closes (only if not submitting).
        if (e.target === e.currentTarget && !submitting) onClose()
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md my-8 relative"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => !submitting && onClose()}
          className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-slate-600 rounded-full disabled:opacity-50"
          aria-label="Close"
          disabled={submitting}
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 id="callback-modal-title" className="text-xl font-bold text-[#0C2340] mb-2">
              Got it!
            </h3>
            <p className="text-slate-600 mb-6">
              A Cethos apostille specialist will call you at <strong>{phone.trim()}</strong> within
              one business day (Mon–Fri, 9–5 Mountain Time).
            </p>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <h3 id="callback-modal-title" className="text-2xl font-bold text-[#0C2340] mb-1">
              Request a Callback
            </h3>
            <p className="text-slate-600 mb-5 text-sm">
              A Cethos apostille specialist will call you within one business day.
              No commitment, no quote needed.
            </p>

            {errors.submit && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{errors.submit}</p>
              </div>
            )}

            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={submitting}
                  className={`w-full px-3 py-2.5 border rounded-lg text-[16px] sm:text-sm ${
                    errors.fullName ? 'border-red-300' : 'border-slate-300'
                  } focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10`}
                  autoComplete="name"
                />
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  className={`w-full px-3 py-2.5 border rounded-lg text-[16px] sm:text-sm ${
                    errors.email ? 'border-red-300' : 'border-slate-300'
                  } focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10`}
                  autoComplete="email"
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={submitting}
                  placeholder="(587) 600-0786"
                  className={`w-full px-3 py-2.5 border rounded-lg text-[16px] sm:text-sm ${
                    errors.phone ? 'border-red-300' : 'border-slate-300'
                  } focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10`}
                  autoComplete="tel"
                />
                {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Best time to call
                </label>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  disabled={submitting}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-[16px] sm:text-sm focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
                >
                  {PREFERRED_TIMES.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Tell us about your situation (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={submitting}
                  rows={3}
                  placeholder="Documents, destination country, deadline, anything else…"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[16px] sm:text-sm focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10 resize-y"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                submitting ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#0891B2] hover:bg-[#06B6D4]'
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                'Request Callback'
              )}
            </button>

            {onSwitchToBooking && (
              <p className="mt-4 text-center text-sm text-slate-600">
                Prefer a Zoom call?{' '}
                <button
                  type="button"
                  onClick={() => {
                    onClose()
                    onSwitchToBooking()
                  }}
                  className="text-[#0891B2] hover:text-[#06B6D4] font-medium underline"
                >
                  Pick a time instead →
                </button>
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default ApostilleCallbackModal
