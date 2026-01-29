'use client'

import { useState } from 'react'

const WEBSITE_TYPES = [
  { value: 'corporate', label: 'Corporate Website' },
  { value: 'ecommerce', label: 'E-commerce / Online Store' },
  { value: 'saas', label: 'SaaS / Web Application' },
  { value: 'blog', label: 'Blog / Content Site' },
  { value: 'landing', label: 'Landing Pages' },
  { value: 'marketing', label: 'Marketing Site' },
  { value: 'portal', label: 'Customer Portal' },
  { value: 'other', label: 'Other' },
]

const CMS_PLATFORMS = [
  { value: 'wordpress', label: 'WordPress' },
  { value: 'shopify', label: 'Shopify' },
  { value: 'wix', label: 'Wix' },
  { value: 'squarespace', label: 'Squarespace' },
  { value: 'drupal', label: 'Drupal' },
  { value: 'webflow', label: 'Webflow' },
  { value: 'custom', label: 'Custom Built' },
  { value: 'other', label: 'Other' },
]

const SOURCE_LANGUAGES = [
  { value: 'english', label: 'English' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'french', label: 'French' },
  { value: 'german', label: 'German' },
  { value: 'mandarin', label: 'Mandarin Chinese' },
  { value: 'japanese', label: 'Japanese' },
  { value: 'korean', label: 'Korean' },
  { value: 'portuguese', label: 'Portuguese' },
  { value: 'other', label: 'Other (specify in notes)' },
]

const TURNAROUND_OPTIONS = [
  { value: 'standard', label: 'Standard (5-7 business days)' },
  { value: 'rush', label: 'Rush (2-4 business days)' },
  { value: 'urgent', label: 'Urgent (24-48 hours)' },
]

interface FormData {
  websiteType: string
  cmsPlatform: string
  websiteUrl: string
  pageCount: string
  sourceLanguage: string
  targetLanguages: string
  seoOptimization: boolean
  turnaround: string
  fullName: string
  email: string
  phone: string
  company: string
  notes: string
}

export default function WebsiteQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const [formData, setFormData] = useState<FormData>({
    websiteType: '',
    cmsPlatform: '',
    websiteUrl: '',
    pageCount: '',
    sourceLanguage: '',
    targetLanguages: '',
    seoOptimization: true,
    turnaround: 'standard',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  })

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.websiteType && formData.cmsPlatform)
      case 2:
        return !!(formData.sourceLanguage && formData.targetLanguages)
      case 3:
        return !!(formData.fullName && formData.email && formData.phone)
      case 4:
        return !!formData.turnaround
      default:
        return false
    }
  }

  const nextStep = () => {
    if (isStepValid(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/general-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: 'website-localization',
          source_language: formData.sourceLanguage,
          target_languages: formData.targetLanguages.split(',').map(l => l.trim()),
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          additional_info: {
            website_type: formData.websiteType,
            cms_platform: formData.cmsPlatform,
            website_url: formData.websiteUrl,
            page_count: formData.pageCount ? parseInt(formData.pageCount) : 0,
            seo_optimization: formData.seoOptimization,
            turnaround: formData.turnaround,
            additional_notes: formData.notes,
          },
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit quote request')
      }

      setSubmitStatus('success')
      setFormData({
        websiteType: '',
        cmsPlatform: '',
        websiteUrl: '',
        pageCount: '',
        sourceLanguage: '',
        targetLanguages: '',
        seoOptimization: true,
        turnaround: 'standard',
        fullName: '',
        email: '',
        phone: '',
        company: '',
        notes: '',
      })
      setCurrentStep(1)
    } catch (error) {
      console.error('Quote submission error:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const ProgressSteps = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              step === currentStep
                ? 'bg-[#0891B2] text-white'
                : step < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step < currentStep ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              step
            )}
          </div>
          {step < 4 && (
            <div
              className={`w-8 md:w-12 h-1 mx-1 rounded ${
                step < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )

  const stepLabels = ['Website Details', 'Languages', 'Contact Info', 'Review & Submit']

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#0C2340] mb-2">Quote Request Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your request. Our team will review your website and get back to you within 2 hours during business hours.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="bg-[#0891B2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold text-[#0C2340] mb-2 text-center">Website Localization Quote</h3>
      <p className="text-gray-600 text-center mb-4 text-sm">
        Step {currentStep} of 4: {stepLabels[currentStep - 1]}
      </p>

      <ProgressSteps />

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* STEP 1: Website Details */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.websiteType}
                onChange={(e) => updateFormData('websiteType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              >
                <option value="">Select website type...</option>
                {WEBSITE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CMS/Platform <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.cmsPlatform}
                onChange={(e) => updateFormData('cmsPlatform', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              >
                <option value="">Select platform...</option>
                {CMS_PLATFORMS.map((cms) => (
                  <option key={cms.value} value={cms.value}>{cms.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => updateFormData('websiteUrl', e.target.value)}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Page Count
              </label>
              <input
                type="number"
                value={formData.pageCount}
                onChange={(e) => updateFormData('pageCount', e.target.value)}
                placeholder="e.g., 50"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Languages */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source Language <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.sourceLanguage}
                onChange={(e) => updateFormData('sourceLanguage', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              >
                <option value="">Select source language...</option>
                {SOURCE_LANGUAGES.map((lang) => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Languages <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.targetLanguages}
                onChange={(e) => updateFormData('targetLanguages', e.target.value)}
                placeholder="e.g., Spanish, French, German"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Separate multiple languages with commas</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.seoOptimization}
                  onChange={(e) => updateFormData('seoOptimization', e.target.checked)}
                  className="mt-1 w-5 h-5 text-[#0891B2] rounded focus:ring-[#0891B2]"
                />
                <div>
                  <span className="font-medium text-gray-900">Include SEO Optimization</span>
                  <p className="text-sm text-gray-500 mt-1">
                    Localized keywords, meta tags, and hreflang implementation
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 3: Contact Information */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="john@company.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(587) 600-0786"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company/Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Company name (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* STEP 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turnaround Time <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.turnaround}
                onChange={(e) => updateFormData('turnaround', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              >
                {TURNAROUND_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                rows={3}
                placeholder="Specific pages to localize, integrations, style guides..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent resize-none"
              />
            </div>

            {/* Summary */}
            <div className="bg-[#0C2340]/5 p-4 rounded-lg">
              <h4 className="font-semibold text-[#0C2340] mb-2 text-sm">Request Summary</h4>
              <div className="grid grid-cols-2 gap-1 text-sm">
                <span className="text-gray-600">Website Type:</span>
                <span className="font-medium">{WEBSITE_TYPES.find(w => w.value === formData.websiteType)?.label || '-'}</span>

                <span className="text-gray-600">Platform:</span>
                <span className="font-medium">{CMS_PLATFORMS.find(c => c.value === formData.cmsPlatform)?.label || '-'}</span>

                <span className="text-gray-600">Source Language:</span>
                <span className="font-medium">{SOURCE_LANGUAGES.find(l => l.value === formData.sourceLanguage)?.label || '-'}</span>

                <span className="text-gray-600">Target Languages:</span>
                <span className="font-medium">{formData.targetLanguages || '-'}</span>

                <span className="text-gray-600">SEO Optimization:</span>
                <span className="font-medium">{formData.seoOptimization ? 'Yes' : 'No'}</span>

                <span className="text-gray-600">Turnaround:</span>
                <span className="font-medium">{TURNAROUND_OPTIONS.find(t => t.value === formData.turnaround)?.label.split(' (')[0] || '-'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-5 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
              className="px-5 py-2.5 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          )}
        </div>
      </form>

      {/* Trust Indicators */}
      <div className="mt-5 pt-5 border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            SEO Optimized
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Response in 2hrs
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            All CMS Supported
          </span>
        </div>
      </div>
    </div>
  )
}
