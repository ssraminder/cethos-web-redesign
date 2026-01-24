'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle, AlertCircle } from 'lucide-react'

const documentTypes = [
  { value: 'birth-certificate', label: 'Birth Certificate' },
  { value: 'marriage-certificate', label: 'Marriage Certificate' },
  { value: 'divorce-certificate', label: 'Divorce Certificate' },
  { value: 'diploma-degree', label: 'Diploma or Degree' },
  { value: 'academic-transcript', label: 'Academic Transcript' },
  { value: 'police-clearance', label: 'Police Clearance' },
  { value: 'employment-letter', label: 'Employment Letter' },
  { value: 'bank-statement', label: 'Bank Statement' },
  { value: 'other', label: 'Other' },
]

const purposes = [
  { value: 'pr-application', label: 'PR Application' },
  { value: 'citizenship', label: 'Citizenship' },
  { value: 'spousal-sponsorship', label: 'Spousal Sponsorship' },
  { value: 'express-entry', label: 'Express Entry' },
  { value: 'wes-iqas', label: 'WES/IQAS Evaluation' },
  { value: 'study-permit', label: 'Study Permit' },
  { value: 'work-permit', label: 'Work Permit' },
  { value: 'other', label: 'Other' },
]

export function LandingQuoteForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    documentType: '',
    languageOfDocument: '',
    numberOfPages: '1',
    purpose: '',
    rushService: 'standard',
    additionalNotes: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      // Check file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB')
        return
      }
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitStatus('success')
  }

  if (submitStatus === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 border border-green-200 rounded-xl p-8 text-center"
      >
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#0C2340] mb-2">Quote Request Received!</h3>
        <p className="text-slate-600 mb-4">
          We&apos;ll review your document and send you a quote within 2 hours during business hours.
        </p>
        <p className="text-sm text-slate-500">
          Need it faster? Call us at <a href="tel:5876000786" className="text-[#0891B2] font-semibold">(587) 600-0786</a>
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-[#0C2340] mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            suppressHydrationWarning
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#0C2340] mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            suppressHydrationWarning
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#0C2340] mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          suppressHydrationWarning
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
          placeholder="(587) 123-4567"
        />
      </div>

      {/* Document Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="documentType" className="block text-sm font-medium text-[#0C2340] mb-1">
            Document Type <span className="text-red-500">*</span>
          </label>
          <select
            id="documentType"
            name="documentType"
            value={formData.documentType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white"
          >
            <option value="">Select document type</option>
            {documentTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="languageOfDocument" className="block text-sm font-medium text-[#0C2340] mb-1">
            Language of Document <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="languageOfDocument"
            name="languageOfDocument"
            value={formData.languageOfDocument}
            onChange={handleChange}
            required
            suppressHydrationWarning
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
            placeholder="e.g., Punjabi, Mandarin, Arabic"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="numberOfPages" className="block text-sm font-medium text-[#0C2340] mb-1">
            Number of Pages <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="numberOfPages"
            name="numberOfPages"
            value={formData.numberOfPages}
            onChange={handleChange}
            required
            min="1"
            suppressHydrationWarning
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-[#0C2340] mb-1">
            Purpose <span className="text-red-500">*</span>
          </label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white"
          >
            <option value="">Select purpose</option>
            {purposes.map(p => (
              <option key={p.value} value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-[#0C2340] mb-1">
          Upload Document <span className="text-red-500">*</span>
        </label>
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-[#0891B2] transition-colors">
          <input
            type="file"
            id="document"
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileChange}
            className="hidden"
            required
            suppressHydrationWarning
          />
          <label htmlFor="document" className="cursor-pointer">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            {file ? (
              <p className="text-[#0891B2] font-medium">{file.name}</p>
            ) : (
              <>
                <p className="text-slate-600">Click to upload or drag and drop</p>
                <p className="text-sm text-slate-400">JPG, PNG, PDF (max 10MB)</p>
              </>
            )}
          </label>
        </div>
      </div>

      {/* Rush Service */}
      <div>
        <label className="block text-sm font-medium text-[#0C2340] mb-2">
          Service Speed <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            formData.rushService === 'standard'
              ? 'border-[#0891B2] bg-[#E0F2FE]'
              : 'border-slate-300 hover:border-slate-400'
          }`}>
            <input
              type="radio"
              name="rushService"
              value="standard"
              checked={formData.rushService === 'standard'}
              onChange={handleChange}
              className="sr-only"
              suppressHydrationWarning
            />
            <div className="text-center">
              <div className="font-semibold text-[#0C2340]">Standard</div>
              <div className="text-sm text-slate-600">2-3 Business Days</div>
            </div>
          </label>
          <label className={`flex-1 p-4 rounded-lg border-2 cursor-pointer transition-all ${
            formData.rushService === 'same-day'
              ? 'border-[#0891B2] bg-[#E0F2FE]'
              : 'border-slate-300 hover:border-slate-400'
          }`}>
            <input
              type="radio"
              name="rushService"
              value="same-day"
              checked={formData.rushService === 'same-day'}
              onChange={handleChange}
              className="sr-only"
              suppressHydrationWarning
            />
            <div className="text-center">
              <div className="font-semibold text-[#0C2340]">Same-Day Rush</div>
              <div className="text-sm text-slate-600">+$25</div>
            </div>
          </label>
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <label htmlFor="additionalNotes" className="block text-sm font-medium text-[#0C2340] mb-1">
          Additional Notes (Optional)
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          value={formData.additionalNotes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent resize-none"
          placeholder="Any special instructions or requirements..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Submit quote request"
      >
        {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
      </button>

      <p className="text-xs text-center text-slate-500">
        By submitting, you agree to our privacy policy. We respond within 2 hours during business hours.
      </p>
    </form>
  )
}
