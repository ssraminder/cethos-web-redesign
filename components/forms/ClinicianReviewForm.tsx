'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { trackQuoteSubmission } from '@/lib/tracking'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

interface Locale {
  id: string
  language_name: string
  country_name: string
  locale_code: string
}

const FALLBACK_LOCALES: Locale[] = [
  { id: '1', language_name: 'English', country_name: 'United States', locale_code: 'en-US' },
  { id: '2', language_name: 'English', country_name: 'United Kingdom', locale_code: 'en-GB' },
  { id: '3', language_name: 'Spanish', country_name: 'Spain', locale_code: 'es-ES' },
  { id: '4', language_name: 'Spanish', country_name: 'Mexico', locale_code: 'es-MX' },
  { id: '5', language_name: 'French', country_name: 'France', locale_code: 'fr-FR' },
  { id: '6', language_name: 'French', country_name: 'Canada', locale_code: 'fr-CA' },
  { id: '7', language_name: 'German', country_name: 'Germany', locale_code: 'de-DE' },
  { id: '8', language_name: 'Italian', country_name: 'Italy', locale_code: 'it-IT' },
  { id: '9', language_name: 'Portuguese', country_name: 'Brazil', locale_code: 'pt-BR' },
  { id: '10', language_name: 'Japanese', country_name: 'Japan', locale_code: 'ja-JP' },
  { id: '11', language_name: 'Chinese', country_name: 'China', locale_code: 'zh-CN' },
  { id: '12', language_name: 'Korean', country_name: 'South Korea', locale_code: 'ko-KR' },
  { id: '13', language_name: 'Arabic', country_name: 'Saudi Arabia', locale_code: 'ar-SA' },
  { id: '14', language_name: 'Russian', country_name: 'Russia', locale_code: 'ru-RU' },
  { id: '15', language_name: 'Dutch', country_name: 'Netherlands', locale_code: 'nl-NL' },
]

const DOCUMENT_TYPES = [
  { value: 'pro', label: 'PRO Instrument' },
  { value: 'clinro', label: 'ClinRO Instrument' },
  { value: 'protocol', label: 'Clinical Protocol' },
  { value: 'icf', label: 'Informed Consent Form (ICF)' },
  { value: 'labeling', label: 'Product Labeling (SmPC/PIL)' },
  { value: 'safety', label: 'Safety Documentation' },
  { value: 'patient-materials', label: 'Patient Education Materials' },
  { value: 'ifu', label: 'Medical Device IFU' },
  { value: 'other', label: 'Other' },
]

const REVIEWER_TYPES = [
  { value: 'physician', label: 'Physician (MD/DO)' },
  { value: 'pharmd', label: 'PharmD' },
  { value: 'nurse', label: 'Specialist Nurse' },
  { value: 'specialist', label: 'Subject Matter Specialist' },
  { value: 'any', label: 'Any Qualified Clinician' },
]

const THERAPEUTIC_AREAS = [
  { value: 'oncology', label: 'Oncology & Hematology' },
  { value: 'cns', label: 'CNS/Neurology' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'respiratory', label: 'Respiratory' },
  { value: 'immunology', label: 'Immunology' },
  { value: 'rare-disease', label: 'Rare Disease' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'gastroenterology', label: 'Gastroenterology' },
  { value: 'endocrinology', label: 'Endocrinology & Diabetes' },
  { value: 'psychiatry', label: 'Psychiatry' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
  { value: 'nephrology', label: 'Nephrology' },
  { value: 'rheumatology', label: 'Rheumatology' },
  { value: 'infectious-disease', label: 'Infectious Disease' },
  { value: 'other', label: 'Other' },
]

const TURNAROUNDS = [
  { value: 'urgent', label: 'Urgent (48-72 hours)' },
  { value: 'standard', label: 'Standard (5-7 business days)' },
  { value: 'flexible', label: 'Flexible' },
]

export function ClinicianReviewForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [locales, setLocales] = useState<Locale[]>(FALLBACK_LOCALES)
  const [selectedTargets, setSelectedTargets] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    documentType: '',
    therapeuticArea: '',
    reviewerType: '',
    specialtyRequired: '',
    numberOfLanguages: 1,
    wordCount: '',
    turnaround: '',
    sourceLanguage: '',
    projectDescription: '',
  })

  useEffect(() => {
    async function fetchLocales() {
      if (!supabase) return

      try {
        const { data, error } = await supabase
          .from('cethosweb_locales')
          .select('id, language_name, country_name, locale_code')
          .order('language_name')

        if (error) throw error
        if (data && data.length > 0) {
          setLocales(data)
        }
      } catch (err) {
        console.error('Failed to fetch locales, using fallback:', err)
      }
    }
    fetchLocales()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
  }

  const handleTargetToggle = (localeCode: string) => {
    setSelectedTargets(prev =>
      prev.includes(localeCode)
        ? prev.filter(c => c !== localeCode)
        : [...prev, localeCode]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.companyName) {
      setError('Please fill in all required contact fields.')
      setIsSubmitting(false)
      return
    }

    if (!formData.documentType || !formData.reviewerType || !formData.turnaround) {
      setError('Please fill in all required service fields.')
      setIsSubmitting(false)
      return
    }

    if (!formData.sourceLanguage || selectedTargets.length === 0) {
      setError('Please select source and at least one target language.')
      setIsSubmitting(false)
      return
    }

    if (!formData.projectDescription) {
      setError('Please provide a project description.')
      setIsSubmitting(false)
      return
    }

    try {
      const submitData = new FormData()
      submitData.append('serviceType', 'clinician-review')

      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          submitData.append(key, String(value))
        }
      })

      submitData.append('targetLanguages', JSON.stringify(selectedTargets))

      files.forEach(file => {
        submitData.append('files', file)
      })

      const response = await fetch('/api/quote', {
        method: 'POST',
        body: submitData,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Submission failed')
      }

      setIsSuccess(true)
      trackQuoteSubmission('clinician-review', 'landing-page')
    } catch (err: any) {
      console.error('Form submission error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-[#0C2340] mt-4">Thank You!</h3>
        <p className="text-gray-600 mt-2">We&apos;ve received your request and will get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Service Details */}
      <div>
        <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Service Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Document Type *</label>
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            >
              <option value="">Select document type...</option>
              {DOCUMENT_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer Type *</label>
            <select
              name="reviewerType"
              value={formData.reviewerType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            >
              <option value="">Select reviewer type...</option>
              {REVIEWER_TYPES.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Therapeutic Area</label>
            <select
              name="therapeuticArea"
              value={formData.therapeuticArea}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            >
              <option value="">Select therapeutic area...</option>
              {THERAPEUTIC_AREAS.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          {formData.reviewerType === 'specialist' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Required Specialty</label>
              <input
                type="text"
                name="specialtyRequired"
                value={formData.specialtyRequired}
                onChange={handleChange}
                placeholder="e.g., Oncologist, Cardiologist"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Word Count (approx)</label>
            <input
              type="number"
              name="wordCount"
              value={formData.wordCount}
              onChange={handleChange}
              placeholder="e.g., 5000"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Turnaround *</label>
            <select
              name="turnaround"
              value={formData.turnaround}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            >
              <option value="">Select turnaround...</option>
              {TURNAROUNDS.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div>
        <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Languages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source Language *</label>
            <select
              name="sourceLanguage"
              value={formData.sourceLanguage}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            >
              <option value="">Select source language...</option>
              {locales.map(locale => (
                <option key={locale.id} value={locale.locale_code}>
                  {locale.language_name} ({locale.country_name})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Languages</label>
            <input
              type="number"
              name="numberOfLanguages"
              value={formData.numberOfLanguages}
              onChange={handleNumberChange}
              min={1}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Languages *</label>
          <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {locales.map(locale => (
                <label key={locale.id} className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedTargets.includes(locale.locale_code)}
                    onChange={() => handleTargetToggle(locale.locale_code)}
                    className="rounded border-gray-300 text-[#0891B2] focus:ring-[#0891B2]"
                  />
                  <span>{locale.language_name} ({locale.country_name})</span>
                </label>
              ))}
            </div>
          </div>
          {selectedTargets.length > 0 && (
            <p className="text-sm text-[#0891B2] mt-2 font-medium">{selectedTargets.length} language(s) selected</p>
          )}
        </div>
      </div>

      {/* Project Description */}
      <div>
        <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Project Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description *</label>
            <textarea
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
              placeholder="Describe the documents requiring clinical review, specific terminology concerns, and reviewer qualifications needed..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Documents (Optional)</label>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#0891B2]/10 file:text-[#0891B2] file:font-medium hover:file:bg-[#0891B2]/20"
            />
            {files.length > 0 && (
              <p className="text-sm text-gray-600 mt-1">{files.length} file(s) selected</p>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting || selectedTargets.length === 0}
        className="w-full bg-[#0891B2] hover:bg-[#06B6D4] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors"
      >
        {isSubmitting ? 'Submitting...' : 'Request Quote'}
      </button>
    </form>
  )
}
