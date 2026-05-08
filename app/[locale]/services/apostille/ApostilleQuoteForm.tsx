'use client'

// Apostille consultation form — 3-step intake that hands off to a Cal.com
// picker for the actual booking. As of the May 2026 redesign this form ALWAYS
// books a consultation; the previous "quote" mode was dropped because the
// quote price is determined on the call after document review. The callback
// path lives in ApostilleCallbackModal (separate component, opened from the
// hero left-side CTA).

import { useState, useCallback, useEffect, useRef, Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Loader2, ArrowRight, ArrowLeft, ChevronDown, X } from 'lucide-react'
import { getAdTrackingPayload } from '@/lib/ad-tracking'
import { trackGenerateLead, type ConsultPlacement } from '@/lib/tracking'
import { ApostilleConsultEmbed } from './ApostilleConsultEmbed'

interface ApostilleQuoteFormProps {
  formLocation?: string
  consultPlacement?: ConsultPlacement
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
]
const OTHER_OPTION = 'Other'

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

const STEPS = [
  { num: 1, label: 'Documents' },
  { num: 2, label: 'Shipping' },
  { num: 3, label: 'Contact' },
]

export function ApostilleQuoteForm({
  formLocation = 'apostille-services',
  consultPlacement = 'hero',
}: ApostilleQuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1)

  // Step 1
  const [documentTypes, setDocumentTypes] = useState<string[]>([])
  const [otherDocumentType, setOtherDocumentType] = useState('')
  const [docDropdownOpen, setDocDropdownOpen] = useState(false)
  const docDropdownRef = useRef<HTMLDivElement>(null)
  const [issuingProvince, setIssuingProvince] = useState('')
  const [numDocuments, setNumDocuments] = useState('1')
  const [destinationCountry, setDestinationCountry] = useState('')

  // Close doc-type dropdown on outside click
  useEffect(() => {
    if (!docDropdownOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (docDropdownRef.current && !docDropdownRef.current.contains(e.target as Node)) {
        setDocDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [docDropdownOpen])

  const otherSelected = documentTypes.includes(OTHER_OPTION)

  // Step 2
  const [dropoffMode, setDropoffMode] = useState<'calgary_office' | 'courier' | ''>('')
  const [needsNotarization, setNeedsNotarization] = useState(false)
  const [needsTranslation, setNeedsTranslation] = useState(false)

  // Step 3
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
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

  const validateStep1 = (): boolean => {
    const next: Record<string, string> = {}
    if (documentTypes.length === 0) next.documentTypes = 'Select at least one document type.'
    if (otherSelected && !otherDocumentType.trim()) next.otherDocumentType = 'Please specify the document type.'
    if (!issuingProvince) next.issuingProvince = 'Select the issuing province or authority.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateStep2 = (): boolean => {
    // Shipping is purely informational for the consultation — never blocks.
    setErrors({})
    return true
  }

  const validateStep3 = (): boolean => {
    const next: Record<string, string> = {}
    if (!fullName.trim()) next.fullName = 'Please enter your name.'
    if (!email.trim()) next.email = 'Please enter your email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email.'
    if (!phone.trim()) next.phone = 'Please enter your phone number.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goNext = () => {
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 2 && !validateStep2()) return
    setCurrentStep((s) => Math.min(3, s + 1))
  }

  const goBack = () => {
    setErrors({})
    setCurrentStep((s) => Math.max(1, s - 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep3() || isSubmitting) return

    setIsSubmitting(true)
    setErrors({})

    try {
      const adTracking = getAdTrackingPayload()
      const resolvedDocTypes = otherSelected
        ? [...documentTypes.filter((t) => t !== OTHER_OPTION), `Other: ${otherDocumentType.trim()}`]
        : documentTypes
      const res = await fetch('/api/apostille-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          document_types: resolvedDocTypes,
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
          lead_type: 'consult',
          consult_method: 'book',
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || data?.message || 'Submission failed.')
      }

      trackGenerateLead('quote', 'Apostille Consult Lead', 'apostille_consult')
      setSubmitSuccess(true)
    } catch (err: any) {
      setErrors({ submit: err?.message || 'Something went wrong. Please try again.' })
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    const provinceLabel = PROVINCES.find((p) => p.value === issuingProvince)?.label || issuingProvince
    const resolvedDocs = otherSelected
      ? [...documentTypes.filter((t) => t !== OTHER_OPTION), otherDocumentType.trim() ? `Other: ${otherDocumentType.trim()}` : 'Other']
      : documentTypes
    return (
      <ApostilleConsultEmbed
        fullName={fullName.trim()}
        email={email.trim()}
        phone={phone.trim()}
        documentTypes={resolvedDocs}
        issuingProvinceLabel={provinceLabel}
        destinationCountry={destinationCountry.trim()}
        numDocuments={numDocuments}
        needsNotarization={needsNotarization}
        needsTranslation={needsTranslation}
        additionalNotes={additionalNotes.trim()}
        placement={consultPlacement}
        onBookingToQuoteClick={() => {
          // After-booking "while you wait, start your apostille quote" used to
          // re-enter the quote flow. Quote mode is gone now — close the success
          // panel so the user is back at the form (which is the same intake).
          setSubmitSuccess(false)
          setCurrentStep(3)
        }}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold text-[#0C2340] mb-1">Book a Free 15-Min Consultation</h3>
      <p className="text-gray-600 text-sm mb-5">
        Three quick steps about your case — then pick a time. No quote needed; we&apos;ll review your documents on the call and confirm the right path.
      </p>

      {/* Step indicator */}
      <div className="flex items-center justify-center mb-6">
        {STEPS.map((step, idx) => {
          const isActive = currentStep === step.num
          const isComplete = currentStep > step.num
          return (
            <Fragment key={step.num}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    isComplete
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-[#0891B2] text-white'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isComplete ? <CheckCircle className="w-4 h-4" /> : step.num}
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${
                    isActive ? 'text-[#0891B2]' : isComplete ? 'text-green-600' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`w-16 sm:w-24 h-0.5 mx-3 mb-5 transition-colors ${
                    isComplete ? 'bg-green-500' : 'bg-slate-200'
                  }`}
                />
              )}
            </Fragment>
          )
        })}
      </div>

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

      {/* STEP 1: DOCUMENTS */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Document Type(s) <span className="text-red-500">*</span>
              </label>
              <div ref={docDropdownRef} className="relative">
                <button
                  type="button"
                  onClick={() => setDocDropdownOpen((v) => !v)}
                  className={`w-full px-3 py-2.5 border rounded-lg bg-white flex items-center justify-between gap-2 text-[16px] sm:text-sm text-left transition ${
                    errors.documentTypes ? 'border-red-300' : 'border-slate-300'
                  } focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10`}
                >
                  <span className={`truncate ${documentTypes.length === 0 ? 'text-slate-400' : 'text-slate-900'}`}>
                    {documentTypes.length === 0
                      ? 'Select document types…'
                      : documentTypes.length <= 2
                      ? documentTypes.join(', ')
                      : `${documentTypes.length} selected: ${documentTypes.slice(0, 2).join(', ')} +${documentTypes.length - 2}`}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform ${docDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {docDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                      className="absolute z-50 mt-1 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg max-h-[280px] overflow-y-auto"
                    >
                      {[...DOCUMENT_TYPES, OTHER_OPTION].map((type) => {
                        const selected = documentTypes.includes(type)
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleDocumentType(type)}
                            className="w-full text-left px-3 py-2.5 text-[16px] sm:text-sm hover:bg-slate-50 active:bg-slate-100 flex items-center gap-2 transition-colors"
                          >
                            <span
                              className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                                selected ? 'bg-[#0891B2] border-[#0891B2]' : 'border-slate-300 bg-white'
                              }`}
                            >
                              {selected && (
                                <svg viewBox="0 0 16 16" fill="none" className="w-3 h-3 text-white">
                                  <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            <span className={selected ? 'text-[#0891B2] font-medium' : 'text-slate-700'}>{type}</span>
                          </button>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {documentTypes.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {documentTypes.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-[#E0F2FE] text-[#0891B2] border border-[#0891B2]/20"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => toggleDocumentType(t)}
                        className="hover:bg-[#0891B2]/10 rounded-full p-0.5"
                        aria-label={`Remove ${t}`}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {errors.documentTypes && <p className="text-xs text-red-600 mt-1">{errors.documentTypes}</p>}

              <AnimatePresence>
                {otherSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.15 }}
                    className="mt-3 overflow-hidden"
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Specify document type <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={otherDocumentType}
                      onChange={(e) => {
                        setOtherDocumentType(e.target.value)
                        setErrors((prev) => {
                          const next = { ...prev }
                          delete next.otherDocumentType
                          return next
                        })
                      }}
                      placeholder="e.g. Passport, Adoption Decree, Trade License…"
                      className={`w-full px-3 py-2.5 border rounded-lg text-[16px] sm:text-sm ${
                        errors.otherDocumentType ? 'border-red-300' : 'border-slate-300'
                      } focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10`}
                      autoComplete="off"
                    />
                    {errors.otherDocumentType && <p className="text-xs text-red-600 mt-1">{errors.otherDocumentType}</p>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Issuing Province / Authority <span className="text-red-500">*</span>
                </label>
                <select
                  value={issuingProvince}
                  onChange={(e) => {
                    setIssuingProvince(e.target.value)
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.issuingProvince
                      return next
                    })
                  }}
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
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Number of Documents</label>
                <input
                  type="number"
                  min={1}
                  value={numDocuments}
                  onChange={(e) => setNumDocuments(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[16px] sm:text-sm focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Destination Country</label>
              <input
                type="text"
                value={destinationCountry}
                onChange={(e) => setDestinationCountry(e.target.value)}
                placeholder="e.g. Germany, India, UAE"
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-[16px] sm:text-sm focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold transition-colors"
              >
                Next: Shipping <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: SHIPPING */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-5">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                How will you send your documents? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDropoffMode('calgary_office')
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.dropoffMode
                      return next
                    })
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    dropoffMode === 'calgary_office'
                      ? 'border-[#0891B2] bg-[#E0F2FE]'
                      : 'border-slate-200 hover:border-[#0891B2]'
                  }`}
                >
                  <p className="font-semibold text-[#0C2340]">Calgary drop-off</p>
                  <p className="text-xs text-slate-600 mt-1">421 7 Avenue SW, Floor 30. Saves the inbound courier cost.</p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDropoffMode('courier')
                    setErrors((prev) => {
                      const next = { ...prev }
                      delete next.dropoffMode
                      return next
                    })
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-colors ${
                    dropoffMode === 'courier'
                      ? 'border-[#0891B2] bg-[#E0F2FE]'
                      : 'border-slate-200 hover:border-[#0891B2]'
                  }`}
                >
                  <p className="font-semibold text-[#0C2340]">Prepaid courier from my city</p>
                  <p className="text-xs text-slate-600 mt-1">We email you a Purolator label. Drop at any counter, fully tracked.</p>
                </button>
              </div>
              {errors.dropoffMode && <p className="text-xs text-red-600 mt-1">{errors.dropoffMode}</p>}
            </div>

            <div className="mb-5 space-y-2">
              <p className="text-sm font-medium text-slate-700 mb-1">Add-ons (optional)</p>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsNotarization}
                  onChange={(e) => setNeedsNotarization(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0891B2] focus:ring-[#0891B2]"
                />
                I need notarization before apostille
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={needsTranslation}
                  onChange={(e) => setNeedsTranslation(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-[#0891B2] focus:ring-[#0891B2]"
                />
                I also need certified translation
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold transition-colors"
              >
                Next: Contact <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: CONTACT */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
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

            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={goBack}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                  isSubmitting ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#0891B2] hover:bg-[#06B6D4]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    Continue to Booking <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-600">
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />Hague Convention</span>
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />Tracked courier both ways</span>
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />From $149</span>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 text-center">
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
