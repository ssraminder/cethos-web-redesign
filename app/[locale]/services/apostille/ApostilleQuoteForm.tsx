'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2, Phone, Mail } from 'lucide-react'
import { getAdTrackingPayload } from '@/lib/ad-tracking'
import { trackGenerateLead } from '@/lib/tracking'

interface ApostilleQuoteFormProps {
  formLocation?: string
}

const DOCUMENT_TYPES = [
  'Birth Certificate',
  'Marriage Certificate',
  'Divorce Certificate / Decree',
  'Death Certificate',
  'Education Diploma / Degree',
  'Academic Transcript',
  'RCMP / Police Check',
  'Articles of Incorporation',
  'Power of Attorney',
  'Notarized Affidavit',
  'Court Order / Judgment',
  'Other',
]

const PROVINCES = [
  { value: '', label: 'Select…' },
  { value: 'AB', label: 'Alberta' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'ON', label: 'Ontario' },
  { value: 'QC', label: 'Quebec' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
  { value: 'YT', label: 'Yukon' },
  { value: 'federal', label: 'Federal (RCMP / IRCC / Federal Court)' },
  { value: 'unsure', label: 'Not sure' },
]

export function ApostilleQuoteForm({ formLocation = 'apostille-services' }: ApostilleQuoteFormProps) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [documentTypes, setDocumentTypes] = useState<string[]>([])
  const [issuingProvince, setIssuingProvince] = useState('')
  const [destinationCountry, setDestinationCountry] = useState('')
  const [numDocuments, setNumDocuments] = useState('1')
  const [needsNotarization, setNeedsNotarization] = useState(false)
  const [needsTranslation, setNeedsTranslation] = useState(false)
  const [dropoffMode, setDropoffMode] = useState<'calgary_office' | 'courier' | ''>('')
  const [additionalNotes, setAdditionalNotes] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const toggleDocumentType = useCallback((type: string) => {
    setDocumentTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
    setErrors((prev) => {
      const next = { ...prev }
      delete next.documentTypes
      return next
    })
  }, [])

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!fullName.trim()) next.fullName = 'Please enter your name.'
    if (!email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email.'
    if (!phone.trim()) next.phone = 'Please enter your phone number.'
    if (documentTypes.length === 0) next.documentTypes = 'Select at least one document type.'
    if (!issuingProvince) next.issuingProvince = 'Select the issuing province or authority.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || isSubmitting) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const adTracking = getAdTrackingPayload()
      const res = await fetch('/api/apostille-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          document_types: documentTypes,
          issuing_province: issuingProvince,
          destination_country: destinationCountry.trim() || null,
          num_documents: numDocuments ? Number(numDocuments) : null,
          needs_notarization: needsNotarization,
          needs_translation: needsTranslation,
          dropoff_mode: dropoffMode || null,
          additional_notes: additionalNotes.trim() || null,
          ad_tracking: adTracking,
          source_url: typeof window !== 'undefined' ? window.location.href : '',
          form_location: formLocation,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || data?.message || 'Submission failed.')
      }

      trackGenerateLead('apostille_quote', 'Apostille Quote Submitted')
      setSubmitSuccess(true)
    } catch (err: any) {
      setErrors({ submit: err?.message || 'Something went wrong. Please try again.' })
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="text-center py-6">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-[#0C2340] mb-2">Quote Request Received</h3>
        <p className="text-slate-600 mb-6">
          Thanks — we&apos;ll review your details and email you a confirmed price plus next steps within one business day.
        </p>
        <div className="bg-slate-50 rounded-lg p-4 text-left text-sm text-slate-700 space-y-2 mb-6">
          <p><strong>What happens next:</strong></p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>We confirm scope and exact price by email.</li>
            <li>For non-Calgary clients we email a prepaid Purolator label.</li>
            <li>You ship originals (or drop off in Calgary).</li>
            <li>We submit to the correct issuing authority and track.</li>
            <li>We courier the authenticated documents back to you.</li>
          </ol>
        </div>
        <p className="text-sm text-slate-500">
          Need to talk now?{' '}
          <a href="tel:5876000786" className="text-[#0891B2] font-medium hover:underline">(587) 600-0786</a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold text-[#0C2340] mb-1">Get Your Apostille Quote</h3>
      <p className="text-gray-600 text-sm mb-6">
        Tell us about your documents and we&apos;ll confirm scope, turnaround, and exact price within one business day.
      </p>

      <AnimatePresence>
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{errors.submit}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact */}
      <div className="space-y-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isSubmitting}
            className={`w-full px-3 py-2.5 border rounded-lg text-[16px] sm:text-sm ${
              errors.fullName ? 'border-red-300' : 'border-slate-300'
            } focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10`}
            autoComplete="name"
          />
          {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              className={`w-full px-3 py-2.5 border rounded-lg text-[16px] sm:text-sm ${
                errors.phone ? 'border-red-300' : 'border-slate-300'
              } focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10`}
              autoComplete="tel"
            />
            {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Document Types */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Document Type(s) <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {DOCUMENT_TYPES.map((type) => {
            const selected = documentTypes.includes(type)
            return (
              <button
                key={type}
                type="button"
                onClick={() => toggleDocumentType(type)}
                disabled={isSubmitting}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  selected
                    ? 'bg-[#0891B2] text-white border-[#0891B2]'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-[#0891B2]'
                } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {type}
              </button>
            )
          })}
        </div>
        {errors.documentTypes && <p className="text-xs text-red-600 mt-1">{errors.documentTypes}</p>}
      </div>

      {/* Issuing Province + Destination + Count */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Issuing Province / Authority <span className="text-red-500">*</span>
          </label>
          <select
            value={issuingProvince}
            onChange={(e) => setIssuingProvince(e.target.value)}
            disabled={isSubmitting}
            className={`w-full px-3 py-2.5 border rounded-lg bg-white text-[16px] sm:text-sm ${
              errors.issuingProvince ? 'border-red-300' : 'border-slate-300'
            } focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10`}
          >
            {PROVINCES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          {errors.issuingProvince && <p className="text-xs text-red-600 mt-1">{errors.issuingProvince}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Destination Country</label>
          <input
            type="text"
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            disabled={isSubmitting}
            placeholder="e.g. Germany, India, UAE"
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[16px] sm:text-sm focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Number of Documents</label>
          <input
            type="number"
            min={1}
            value={numDocuments}
            onChange={(e) => setNumDocuments(e.target.value)}
            disabled={isSubmitting}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[16px] sm:text-sm focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Drop-off / Courier</label>
          <select
            value={dropoffMode}
            onChange={(e) => setDropoffMode(e.target.value as 'calgary_office' | 'courier' | '')}
            disabled={isSubmitting}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-[16px] sm:text-sm focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
          >
            <option value="">Select…</option>
            <option value="calgary_office">Calgary drop-off (in person)</option>
            <option value="courier">Prepaid courier from my city</option>
          </select>
        </div>
      </div>

      {/* Add-ons */}
      <div className="mb-5 space-y-2">
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={needsNotarization}
            onChange={(e) => setNeedsNotarization(e.target.checked)}
            disabled={isSubmitting}
            className="w-4 h-4 rounded border-slate-300 text-[#0891B2] focus:ring-[#0891B2]"
          />
          I need notarization before apostille
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={needsTranslation}
            onChange={(e) => setNeedsTranslation(e.target.checked)}
            disabled={isSubmitting}
            className="w-4 h-4 rounded border-slate-300 text-[#0891B2] focus:ring-[#0891B2]"
          />
          I also need certified translation
        </label>
      </div>

      {/* Notes */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Additional Notes (optional)</label>
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          disabled={isSubmitting}
          rows={3}
          placeholder="Deadline, special instructions, embassy requirements…"
          className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[16px] sm:text-sm focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
          isSubmitting ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#0891B2] hover:bg-[#06B6D4]'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Get Apostille Quote<span className="text-lg">→</span>
          </>
        )}
      </button>

      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-600">
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />Hague Convention</span>
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />Tracked courier both ways</span>
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />From $149</span>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-600">
          Prefer to talk?{' '}
          <a href="tel:5876000786" className="text-[#0891B2] font-medium hover:underline">(587) 600-0786</a>{' '}
          or{' '}
          <a href="mailto:info@cethos.com" className="text-[#0891B2] font-medium hover:underline">info@cethos.com</a>
        </p>
      </div>
    </form>
  )
}

export default ApostilleQuoteForm
