'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Calendar, Clock, MapPin, X } from 'lucide-react'

interface LocaleOption {
  id: string
  value: string
  label: string
  languageName: string
  countryName: string
}

interface InterpretationQuoteFormProps {
  formLocation: string
  defaultServiceType?: string
}

interface FormData {
  // Step 1 - Contact
  fullName: string
  email: string
  phone: string
  companyName: string
  // Step 2 - Interpretation Details
  serviceType: string
  industry: string
  sourceLanguage: string
  targetLanguages: string[]
  // Step 3 - Event Details
  eventDate: string
  eventTime: string
  duration: string
  eventLocation: string
  isRemote: boolean
  platform: string
  additionalNotes: string
}

const SERVICE_TYPES = [
  { value: 'on-site', label: 'On-Site Interpretation' },
  { value: 'opi', label: 'Over-the-Phone (OPI)' },
  { value: 'vri', label: 'Video Remote (VRI)' },
  { value: 'simultaneous', label: 'Simultaneous/Conference' },
  { value: 'consecutive', label: 'Consecutive Interpretation' },
  { value: 'asl', label: 'ASL / Sign Language' },
]

const INDUSTRIES = [
  { value: 'healthcare', label: 'Healthcare / Medical' },
  { value: 'legal', label: 'Legal / Court' },
  { value: 'business', label: 'Business / Corporate' },
  { value: 'government', label: 'Government' },
  { value: 'conferences', label: 'Conferences / Events' },
  { value: 'education', label: 'Education' },
]

const DURATION_OPTIONS = [
  { value: '1-hour', label: '1 Hour' },
  { value: '2-hours', label: '2 Hours' },
  { value: 'half-day', label: 'Half Day (4 hours)' },
  { value: 'full-day', label: 'Full Day (8 hours)' },
  { value: 'multi-day', label: 'Multi-Day Event' },
  { value: 'ongoing', label: 'Ongoing / Recurring' },
]

const PLATFORMS = [
  { value: 'zoom', label: 'Zoom' },
  { value: 'teams', label: 'Microsoft Teams' },
  { value: 'webex', label: 'Webex' },
  { value: 'google-meet', label: 'Google Meet' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'other', label: 'Other' },
]

export function InterpretationQuoteForm({ formLocation, defaultServiceType }: InterpretationQuoteFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Dropdown data state
  const [locales, setLocales] = useState<LocaleOption[]>([])
  const [isLoadingDropdowns, setIsLoadingDropdowns] = useState(true)

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceType: defaultServiceType || '',
    industry: '',
    sourceLanguage: '',
    targetLanguages: [],
    eventDate: '',
    eventTime: '',
    duration: '',
    eventLocation: '',
    isRemote: false,
    platform: '',
    additionalNotes: '',
  })

  // Fetch dropdown data on mount
  useEffect(() => {
    async function fetchDropdownData() {
      setIsLoadingDropdowns(true)
      try {
        const response = await fetch('/api/locales')
        const data = await response.json()
        if (data.locales) {
          setLocales(data.locales)
        }
      } catch (error) {
        console.error('Error fetching locales:', error)
      } finally {
        setIsLoadingDropdowns(false)
      }
    }

    fetchDropdownData()
  }, [])

  const updateFormData = (field: keyof FormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const handleTargetLanguageToggle = (locale: string) => {
    setFormData((prev) => {
      const newTargets = prev.targetLanguages.includes(locale)
        ? prev.targetLanguages.filter((l) => l !== locale)
        : [...prev.targetLanguages, locale]
      return { ...prev, targetLanguages: newTargets }
    })
    if (errors.targetLanguages) {
      setErrors((prev) => ({ ...prev, targetLanguages: '' }))
    }
  }

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {}

    if (stepNum === 1) {
      if (!formData.fullName.trim() || formData.fullName.length < 2) {
        newErrors.fullName = 'Full name is required'
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required'
      }
      if (!formData.phone.trim() || formData.phone.length < 7) {
        newErrors.phone = 'Phone number is required'
      }
    }

    if (stepNum === 2) {
      if (!formData.serviceType) {
        newErrors.serviceType = 'Please select a service type'
      }
      if (!formData.industry) {
        newErrors.industry = 'Please select an industry'
      }
      if (!formData.sourceLanguage) {
        newErrors.sourceLanguage = 'Please select the source language'
      }
      if (formData.targetLanguages.length === 0) {
        newErrors.targetLanguages = 'Please select at least one target language'
      }
    }

    if (stepNum === 3) {
      if (!formData.eventDate) {
        newErrors.eventDate = 'Please select an event date'
      }
      if (!formData.duration) {
        newErrors.duration = 'Please select a duration'
      }
      if (!formData.isRemote && !formData.eventLocation) {
        newErrors.eventLocation = 'Please provide a location or select remote'
      }
      if (formData.isRemote && !formData.platform) {
        newErrors.platform = 'Please select a platform for remote interpretation'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 3))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(3)) {
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const submitData = new FormData()

      // Add form fields
      submitData.append('serviceType', 'interpretation')
      submitData.append('formLocation', formLocation)
      submitData.append('fullName', formData.fullName)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('companyName', formData.companyName)
      submitData.append('interpretationType', formData.serviceType)
      submitData.append('industry', formData.industry)
      submitData.append('sourceLanguage', formData.sourceLanguage)
      submitData.append('targetLanguages', JSON.stringify(formData.targetLanguages))
      submitData.append('eventDate', formData.eventDate)
      submitData.append('eventTime', formData.eventTime)
      submitData.append('duration', formData.duration)
      submitData.append('eventLocation', formData.eventLocation)
      submitData.append('isRemote', String(formData.isRemote))
      submitData.append('platform', formData.platform)
      submitData.append('additionalNotes', formData.additionalNotes)

      // Add labels for email
      const sourceLocale = locales.find((l) => l.value === formData.sourceLanguage)
      submitData.append('sourceLanguageLabel', sourceLocale?.label || formData.sourceLanguage)

      const targetLabels = formData.targetLanguages.map((t) => {
        const locale = locales.find((l) => l.value === t)
        return locale?.label || t
      })
      submitData.append('targetLanguageLabels', JSON.stringify(targetLabels))

      const response = await fetch('/api/interpretation-quote', {
        method: 'POST',
        body: submitData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request')
      }

      setIsSuccess(true)

      // Track conversion
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'form_submit', {
          event_category: 'interpretation_quote',
          event_label: formLocation,
        })
      }
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError(
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { label: 'Contact Info' },
    { label: 'Service Details' },
    { label: 'Event Details' },
  ]

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#0C2340] mb-2">Request Received!</h3>
        <p className="text-slate-600 mb-4">
          We&apos;ll review your interpretation request and get back to you within 2 hours during business hours.
        </p>
        <p className="text-sm text-slate-500">
          Need immediate assistance? Call us at{' '}
          <a href="tel:5876000786" className="text-[#0891B2] font-semibold">
            (587) 600-0786
          </a>
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step Indicator */}
      <div className="mb-8">
        {/* Mobile: Simplified dots + step name */}
        <div className="sm:hidden flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  step > index + 1
                    ? 'bg-[#0891B2]'
                    : step === index + 1
                    ? 'bg-[#0891B2]'
                    : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
          <div className="text-center">
            <div className="font-semibold text-[#0C2340]">{steps[step - 1].label}</div>
            <div className="text-sm text-slate-500">Step {step} of {steps.length}</div>
          </div>
        </div>

        {/* Desktop: Full step indicator with labels */}
        <div className="hidden sm:flex items-center justify-between">
          {steps.map((s, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                ${step > index + 1
                  ? 'bg-[#0891B2] text-white'
                  : step === index + 1
                  ? 'bg-[#0891B2] text-white'
                  : 'bg-slate-200 text-slate-500'
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs text-slate-600 mt-2 text-center">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{submitError}</p>
        </motion.div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Step 1 - Contact */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-[#0C2340] mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent ${
                  errors.fullName ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="Your full name"
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#0C2340] mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#0C2340] mb-1">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="(587) 123-4567"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-[#0C2340] mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={(e) => updateFormData('companyName', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                placeholder="Your company (optional)"
              />
            </div>
          </motion.div>
        )}

        {/* Step 2 - Service Details */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-[#0C2340] mb-1">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                id="serviceType"
                value={formData.serviceType}
                onChange={(e) => updateFormData('serviceType', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white ${
                  errors.serviceType ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select service type</option>
                {SERVICE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-[#0C2340] mb-1">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                id="industry"
                value={formData.industry}
                onChange={(e) => updateFormData('industry', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white ${
                  errors.industry ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind.value} value={ind.value}>
                    {ind.label}
                  </option>
                ))}
              </select>
              {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
            </div>

            <div>
              <label htmlFor="sourceLanguage" className="block text-sm font-medium text-[#0C2340] mb-1">
                Source Language <span className="text-red-500">*</span>
              </label>
              <select
                id="sourceLanguage"
                value={formData.sourceLanguage}
                onChange={(e) => updateFormData('sourceLanguage', e.target.value)}
                disabled={isLoadingDropdowns}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white ${
                  errors.sourceLanguage ? 'border-red-500' : 'border-slate-300'
                } ${isLoadingDropdowns ? 'opacity-50 cursor-wait' : ''}`}
              >
                <option value="">{isLoadingDropdowns ? 'Loading...' : 'Select source language'}</option>
                {locales.map((locale) => (
                  <option key={locale.value} value={locale.value}>
                    {locale.label}
                  </option>
                ))}
              </select>
              {errors.sourceLanguage && <p className="text-red-500 text-sm mt-1">{errors.sourceLanguage}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0C2340] mb-2">
                Target Languages <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-slate-500 mb-3">Select all languages you need interpretation for</p>
              <div className="max-h-48 overflow-y-auto border border-slate-300 rounded-lg p-3 space-y-2">
                {isLoadingDropdowns ? (
                  <p className="text-slate-500 text-sm">Loading languages...</p>
                ) : (
                  locales.map((locale) => (
                    <label
                      key={locale.value}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        formData.targetLanguages.includes(locale.value)
                          ? 'bg-[#E0F2FE]'
                          : 'hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.targetLanguages.includes(locale.value)}
                        onChange={() => handleTargetLanguageToggle(locale.value)}
                        className="w-4 h-4 text-[#0891B2] rounded focus:ring-[#0891B2]"
                      />
                      <span className="text-sm text-[#0C2340]">{locale.label}</span>
                    </label>
                  ))
                )}
              </div>
              {formData.targetLanguages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.targetLanguages.map((lang) => {
                    const locale = locales.find((l) => l.value === lang)
                    return (
                      <span
                        key={lang}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[#E0F2FE] text-[#0891B2] rounded-full text-sm"
                      >
                        {locale?.label || lang}
                        <button
                          type="button"
                          onClick={() => handleTargetLanguageToggle(lang)}
                          className="hover:text-[#0C2340]"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )
                  })}
                </div>
              )}
              {errors.targetLanguages && <p className="text-red-500 text-sm mt-1">{errors.targetLanguages}</p>}
            </div>
          </motion.div>
        )}

        {/* Step 3 - Event Details */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-[#0C2340] mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="eventDate"
                  value={formData.eventDate}
                  onChange={(e) => updateFormData('eventDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent ${
                    errors.eventDate ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
              </div>

              <div>
                <label htmlFor="eventTime" className="block text-sm font-medium text-[#0C2340] mb-1">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Start Time
                </label>
                <input
                  type="time"
                  id="eventTime"
                  value={formData.eventTime}
                  onChange={(e) => updateFormData('eventTime', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-[#0C2340] mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <select
                id="duration"
                value={formData.duration}
                onChange={(e) => updateFormData('duration', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white ${
                  errors.duration ? 'border-red-500' : 'border-slate-300'
                }`}
              >
                <option value="">Select duration</option>
                {DURATION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
            </div>

            {/* Remote Toggle */}
            <div className="p-4 bg-slate-50 rounded-lg">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isRemote}
                  onChange={(e) => {
                    updateFormData('isRemote', e.target.checked)
                    if (e.target.checked) {
                      updateFormData('eventLocation', '')
                    } else {
                      updateFormData('platform', '')
                    }
                  }}
                  className="w-5 h-5 text-[#0891B2] rounded focus:ring-[#0891B2]"
                />
                <span className="font-medium text-[#0C2340]">This is a remote/virtual event</span>
              </label>
            </div>

            {formData.isRemote ? (
              <div>
                <label htmlFor="platform" className="block text-sm font-medium text-[#0C2340] mb-1">
                  Platform <span className="text-red-500">*</span>
                </label>
                <select
                  id="platform"
                  value={formData.platform}
                  onChange={(e) => updateFormData('platform', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white ${
                    errors.platform ? 'border-red-500' : 'border-slate-300'
                  }`}
                >
                  <option value="">Select platform</option>
                  {PLATFORMS.map((plat) => (
                    <option key={plat.value} value={plat.value}>
                      {plat.label}
                    </option>
                  ))}
                </select>
                {errors.platform && <p className="text-red-500 text-sm mt-1">{errors.platform}</p>}
              </div>
            ) : (
              <div>
                <label htmlFor="eventLocation" className="block text-sm font-medium text-[#0C2340] mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Event Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="eventLocation"
                  value={formData.eventLocation}
                  onChange={(e) => updateFormData('eventLocation', e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent ${
                    errors.eventLocation ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="City, State/Province, Country"
                />
                {errors.eventLocation && <p className="text-red-500 text-sm mt-1">{errors.eventLocation}</p>}
              </div>
            )}

            <div>
              <label htmlFor="additionalNotes" className="block text-sm font-medium text-[#0C2340] mb-1">
                Additional Notes
              </label>
              <textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent resize-none"
                placeholder="Any special requirements, subject matter expertise needed, equipment requirements..."
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        {step > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Request Quote'}
          </button>
        )}
      </div>

      <p className="text-xs text-center text-slate-500 pt-2">
        By submitting, you agree to our privacy policy. We respond within 2 hours during business hours.
      </p>
    </form>
  )
}

