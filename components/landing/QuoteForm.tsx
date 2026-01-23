'use client'

import { useState, useRef } from 'react'
import { Upload, Check, ArrowRight } from 'lucide-react'

const documentTypes = [
  { value: 'birth-certificate', label: 'Birth Certificate' },
  { value: 'marriage-certificate', label: 'Marriage Certificate' },
  { value: 'divorce-certificate', label: 'Divorce Certificate' },
  { value: 'diploma-degree', label: 'Diploma/Degree' },
  { value: 'academic-transcript', label: 'Academic Transcript' },
  { value: 'police-clearance', label: 'Police Clearance' },
  { value: 'employment-letter', label: 'Employment Letter' },
  { value: 'bank-statement', label: 'Bank Statement' },
  { value: 'other', label: 'Other' },
]

const purposeOptions = [
  { value: 'pr-application', label: 'PR Application' },
  { value: 'citizenship', label: 'Citizenship' },
  { value: 'spousal-sponsorship', label: 'Spousal Sponsorship' },
  { value: 'express-entry', label: 'Express Entry' },
  { value: 'wes-iqas', label: 'WES/IQAS' },
  { value: 'study-permit', label: 'Study Permit' },
  { value: 'work-permit', label: 'Work Permit' },
  { value: 'other', label: 'Other' },
]

interface QuoteFormProps {
  defaultDocumentType?: string
  defaultPurpose?: string
}

export function QuoteForm({ defaultDocumentType, defaultPurpose }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center" id="quote-form">
        <div className="w-16 h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-[#0891B2]" strokeWidth={2} />
        </div>
        <h3 className="text-2xl font-bold text-[#0C2340] mb-2">Quote Request Received!</h3>
        <p className="text-[#4B5563] mb-6">
          Thank you! We&apos;ll send your free quote within 2 hours.
        </p>
        <a
          href="tel:+15876000786"
          className="inline-flex items-center gap-2 text-[#0891B2] font-semibold hover:text-[#06B6D4]"
        >
          Need it faster? Call (587) 600-0786
        </a>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8" id="quote-form">
      <h3 className="text-2xl font-bold text-[#0C2340] mb-2">Get Your Free Quote</h3>
      <p className="text-[#4B5563] mb-6">We&apos;ll respond within 2 hours</p>

      <form onSubmit={handleSubmit} className="space-y-5" aria-label="Quote request form">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[#0C2340] mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[#0C2340] placeholder:text-slate-400 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:outline-none transition-colors"
            placeholder="Your full name"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#0C2340] mb-1.5">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[#0C2340] placeholder:text-slate-400 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:outline-none transition-colors"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#0C2340] mb-1.5">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[#0C2340] placeholder:text-slate-400 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:outline-none transition-colors"
              placeholder="(587) 000-0000"
            />
          </div>
        </div>

        {/* Document Type */}
        <div>
          <label htmlFor="documentType" className="block text-sm font-medium text-[#0C2340] mb-1.5">
            Document Type *
          </label>
          <select
            id="documentType"
            name="documentType"
            required
            defaultValue={defaultDocumentType || ''}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[#0C2340] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:outline-none transition-colors"
          >
            <option value="">Select document type</option>
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Language & Pages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-[#0C2340] mb-1.5">
              Language of Document *
            </label>
            <input
              type="text"
              id="language"
              name="language"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[#0C2340] placeholder:text-slate-400 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:outline-none transition-colors"
              placeholder="e.g., Punjabi, Mandarin"
            />
          </div>
          <div>
            <label htmlFor="pages" className="block text-sm font-medium text-[#0C2340] mb-1.5">
              Number of Pages *
            </label>
            <input
              type="number"
              id="pages"
              name="pages"
              min="1"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[#0C2340] placeholder:text-slate-400 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:outline-none transition-colors"
              placeholder="1"
            />
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-[#0C2340] mb-1.5">
            Upload Document *
          </label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full px-4 py-6 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-center cursor-pointer hover:border-[#0891B2] hover:bg-[#E0F2FE]/30 transition-colors"
          >
            <input
              ref={fileInputRef}
              type="file"
              name="document"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="hidden"
              required
            />
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" strokeWidth={1.5} />
            {fileName ? (
              <p className="text-[#0891B2] font-medium">{fileName}</p>
            ) : (
              <>
                <p className="text-[#4B5563]">Click to upload or drag and drop</p>
                <p className="text-sm text-slate-400">JPG, PNG, PDF (max 10MB)</p>
              </>
            )}
          </div>
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-[#0C2340] mb-1.5">
            Purpose *
          </label>
          <select
            id="purpose"
            name="purpose"
            required
            defaultValue={defaultPurpose || ''}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[#0C2340] focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:outline-none transition-colors"
          >
            <option value="">Select purpose</option>
            {purposeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rush Service */}
        <div>
          <label className="block text-sm font-medium text-[#0C2340] mb-2">
            Rush Service *
          </label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-[#0891B2] transition-colors">
              <input
                type="radio"
                name="rushService"
                value="standard"
                defaultChecked
                className="w-4 h-4 text-[#0891B2] focus:ring-[#0891B2]"
              />
              <span className="text-[#0C2340]">Standard (1-2 business days)</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-[#0891B2] transition-colors">
              <input
                type="radio"
                name="rushService"
                value="same-day"
                className="w-4 h-4 text-[#0891B2] focus:ring-[#0891B2]"
              />
              <span className="text-[#0C2340]">Same-Day Rush (+$25)</span>
            </label>
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-[#0C2340] mb-1.5">
            Additional Notes (Optional)
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-[#0C2340] placeholder:text-slate-400 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/20 focus:outline-none transition-colors resize-y"
            placeholder="Any special requirements or questions..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Get My Free Quote
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
