'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, X, FileText } from 'lucide-react'

interface DropdownOption {
  id: string
  value: string
  label: string
}

interface LocaleOption extends DropdownOption {
  languageName: string
  countryName: string
}

interface CertifiedQuoteFormProps {
  defaultDocumentType?: string
  formLocation: string
}

interface FormData {
  // Step 1 - Contact
  fullName: string
  email: string
  phone: string
  // Step 2 - Document
  documentType: string
  sourceLanguage: string
  targetLanguage: string
  numberOfPages: number
  purpose: string
  // Step 3 - Upload
  files: File[]
  serviceSpeed: 'standard' | 'rush' | 'same-day'
  additionalNotes: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf']

export function CertifiedQuoteForm({ defaultDocumentType, formLocation }: CertifiedQuoteFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Dropdown data state
  const [locales, setLocales] = useState<LocaleOption[]>([])
  const [documentTypes, setDocumentTypes] = useState<DropdownOption[]>([])
  const [intendedUses, setIntendedUses] = useState<DropdownOption[]>([])
  const [isLoadingDropdowns, setIsLoadingDropdowns] = useState(true)

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    documentType: defaultDocumentType || '',
    sourceLanguage: '',
    targetLanguage: '',
    numberOfPages: 1,
    purpose: '',
    files: [],
    serviceSpeed: 'standard',
    additionalNotes: '',
  })

  // Fetch dropdown data on mount
  useEffect(() => {
    async function fetchDropdownData() {
      setIsLoadingDropdowns(true)
      try {
        const [localesRes, docTypesRes, intendedUsesRes] = await Promise.all([
          fetch('/api/locales'),
          fetch('/api/document-types'),
          fetch('/api/intended-uses'),
        ])

        const [localesData, docTypesData, intendedUsesData] = await Promise.all([
          localesRes.json(),
          docTypesRes.json(),
          intendedUsesRes.json(),
        ])

        if (localesData.locales) {
          setLocales(localesData.locales)
        }
        if (docTypesData.documentTypes) {
          setDocumentTypes(docTypesData.documentTypes)
        }
        if (intendedUsesData.intendedUses) {
          setIntendedUses(intendedUsesData.intendedUses)
        }
      } catch (error) {
        console.error('Error fetching dropdown data:', error)
      } finally {
        setIsLoadingDropdowns(false)
      }
    }

    fetchDropdownData()
  }, [])

  // Auto-set target language to English if source is not English
  const handleSourceLanguageChange = (value: string) => {
    setFormData(prev => {
      const selectedLocale = locales.find(l => l.value === value)
      const isEnglish = selectedLocale?.languageName?.toLowerCase() === 'english'

      // Find an English locale for auto-setting target
      const englishLocale = locales.find(l => l.languageName?.toLowerCase() === 'english')

      return {
        ...prev,
        sourceLanguage: value,
        // Auto-set target to English if source is not English
        targetLanguage: !isEnglish && englishLocale ? englishLocale.value : prev.targetLanguage,
      }
    })
    if (errors.sourceLanguage) {
      setErrors(prev => ({ ...prev, sourceLanguage: '' }))
    }
  }

  const updateFormData = (field: keyof FormData, value: string | number | File[] | 'standard' | 'rush' | 'same-day') => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
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
      if (!formData.documentType) {
        newErrors.documentType = 'Please select a document type'
      }
      if (!formData.sourceLanguage) {
        newErrors.sourceLanguage = 'Please select the source language'
      }
      if (!formData.targetLanguage) {
        newErrors.targetLanguage = 'Please select the target language'
      }
      if (formData.numberOfPages < 1) {
        newErrors.numberOfPages = 'Number of pages must be at least 1'
      }
      if (!formData.purpose) {
        newErrors.purpose = 'Please select a purpose'
      }
    }

    if (stepNum === 3) {
      if (formData.files.length === 0) {
        newErrors.files = 'Please upload at least one document'
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

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: File[] = []
    const fileErrors: string[] = []

    Array.from(selectedFiles).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        fileErrors.push(`${file.name} exceeds 10MB limit`)
      } else if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        fileErrors.push(`${file.name} is not a supported file type (JPG, PNG, PDF only)`)
      } else {
        newFiles.push(file)
      }
    })

    if (fileErrors.length > 0) {
      setSubmitError(fileErrors.join('. '))
      setTimeout(() => setSubmitError(null), 5000)
    }

    if (newFiles.length > 0) {
      updateFormData('files', [...formData.files, ...newFiles])
      setErrors((prev) => ({ ...prev, files: '' }))
    }
  }

  const removeFile = (index: number) => {
    updateFormData('files', formData.files.filter((_, i) => i !== index))
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }, [])

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
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
      submitData.append('serviceType', 'certified-translation')
      submitData.append('formLocation', formLocation)
      submitData.append('fullName', formData.fullName)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('documentType', formData.documentType)
      submitData.append('sourceLanguage', formData.sourceLanguage)
      submitData.append('targetLanguage', formData.targetLanguage)
      submitData.append('numberOfPages', String(formData.numberOfPages))
      submitData.append('purpose', formData.purpose)
      submitData.append('serviceSpeed', formData.serviceSpeed)
      submitData.append('additionalNotes', formData.additionalNotes)

      // Also send the display labels for email
      const sourceLocale = locales.find(l => l.value === formData.sourceLanguage)
      const targetLocale = locales.find(l => l.value === formData.targetLanguage)
      submitData.append('sourceLanguageLabel', sourceLocale?.label || formData.sourceLanguage)
      submitData.append('targetLanguageLabel', targetLocale?.label || formData.targetLanguage)

      // Add files
      formData.files.forEach((file) => {
        submitData.append('files', file)
      })

      const response = await fetch('/api/certified-quote', {
        method: 'POST',
        body: submitData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request')
      }

      setIsSuccess(true)
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
    { label: 'Document Details' },
    { label: 'Upload & Review' },
  ]

  if (isSuccess) {
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
          Need it faster? Call us at{' '}
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
                    ? 'bg-[#0891B2]' // completed
                    : step === index + 1
                    ? 'bg-[#0891B2]' // current
                    : 'bg-slate-300' // upcoming
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
                  ? 'bg-[#0891B2] text-white' // completed
                  : step === index + 1
                  ? 'bg-[#0891B2] text-white' // current
                  : 'bg-slate-200 text-slate-500' // upcoming
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
          </motion.div>
        )}

        {/* Step 2 - Document */}
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
              <label htmlFor="documentType" className="block text-sm font-medium text-[#0C2340] mb-1">
                Document Type <span className="text-red-500">*</span>
              </label>
              <select
                id="documentType"
                value={formData.documentType}
                onChange={(e) => updateFormData('documentType', e.target.value)}
                disabled={isLoadingDropdowns}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white ${
                  errors.documentType ? 'border-red-500' : 'border-slate-300'
                } ${isLoadingDropdowns ? 'opacity-50 cursor-wait' : ''}`}
              >
                <option value="">{isLoadingDropdowns ? 'Loading...' : 'Select document type'}</option>
                {documentTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.documentType && <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="sourceLanguage" className="block text-sm font-medium text-[#0C2340] mb-1">
                  Source Language <span className="text-red-500">*</span>
                </label>
                <select
                  id="sourceLanguage"
                  value={formData.sourceLanguage}
                  onChange={(e) => handleSourceLanguageChange(e.target.value)}
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
                <label htmlFor="targetLanguage" className="block text-sm font-medium text-[#0C2340] mb-1">
                  Target Language <span className="text-red-500">*</span>
                </label>
                <select
                  id="targetLanguage"
                  value={formData.targetLanguage}
                  onChange={(e) => updateFormData('targetLanguage', e.target.value)}
                  disabled={isLoadingDropdowns}
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white ${
                    errors.targetLanguage ? 'border-red-500' : 'border-slate-300'
                  } ${isLoadingDropdowns ? 'opacity-50 cursor-wait' : ''}`}
                >
                  <option value="">{isLoadingDropdowns ? 'Loading...' : 'Select target language'}</option>
                  {locales.map((locale) => (
                    <option key={locale.value} value={locale.value}>
                      {locale.label}
                    </option>
                  ))}
                </select>
                {errors.targetLanguage && <p className="text-red-500 text-sm mt-1">{errors.targetLanguage}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="numberOfPages" className="block text-sm font-medium text-[#0C2340] mb-1">
                Number of Pages <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="numberOfPages"
                value={formData.numberOfPages}
                onChange={(e) => updateFormData('numberOfPages', parseInt(e.target.value) || 1)}
                min="1"
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent ${
                  errors.numberOfPages ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.numberOfPages && <p className="text-red-500 text-sm mt-1">{errors.numberOfPages}</p>}
            </div>

            <div>
              <label htmlFor="purpose" className="block text-sm font-medium text-[#0C2340] mb-1">
                Purpose <span className="text-red-500">*</span>
              </label>
              <select
                id="purpose"
                value={formData.purpose}
                onChange={(e) => updateFormData('purpose', e.target.value)}
                disabled={isLoadingDropdowns}
                className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent bg-white ${
                  errors.purpose ? 'border-red-500' : 'border-slate-300'
                } ${isLoadingDropdowns ? 'opacity-50 cursor-wait' : ''}`}
              >
                <option value="">{isLoadingDropdowns ? 'Loading...' : 'Select purpose'}</option>
                {intendedUses.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
            </div>
          </motion.div>
        )}

        {/* Step 3 - Upload */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-[#0C2340] mb-1">
                Upload Document <span className="text-red-500">*</span>
              </label>
              <div
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragging
                    ? 'border-[#0891B2] bg-[#E0F2FE]'
                    : errors.files
                    ? 'border-red-500'
                    : 'border-slate-300 hover:border-[#0891B2]'
                }`}
              >
                <input
                  type="file"
                  id="document"
                  accept=".jpg,.jpeg,.png,.pdf"
                  multiple
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
                <label htmlFor="document" className="cursor-pointer">
                  <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-600 mb-1">
                    Drag and drop files here, or <span className="text-[#0891B2] font-medium">browse</span>
                  </p>
                  <p className="text-sm text-slate-400">JPG, PNG, PDF (max 10MB each)</p>
                </label>
              </div>
              {errors.files && <p className="text-red-500 text-sm mt-1">{errors.files}</p>}

              {/* File List */}
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-[#0C2340]">{file.name}</p>
                          <p className="text-xs text-slate-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="p-1 hover:bg-slate-200 rounded transition-colors"
                      >
                        <X className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Service Speed */}
            <div>
              <label className="block text-sm font-medium text-[#0C2340] mb-2">
                Service Speed <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.serviceSpeed === 'standard'
                      ? 'border-[#0891B2] bg-[#E0F2FE]'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="serviceSpeed"
                    value="standard"
                    checked={formData.serviceSpeed === 'standard'}
                    onChange={(e) => updateFormData('serviceSpeed', e.target.value as 'standard' | 'rush' | 'same-day')}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-[#0C2340]">Standard</div>
                    <div className="text-sm text-slate-600">2-3 Business Days</div>
                  </div>
                </label>
                <label
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.serviceSpeed === 'rush'
                      ? 'border-[#0891B2] bg-[#E0F2FE]'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="serviceSpeed"
                    value="rush"
                    checked={formData.serviceSpeed === 'rush'}
                    onChange={(e) => updateFormData('serviceSpeed', e.target.value as 'standard' | 'rush' | 'same-day')}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-[#0C2340]">Rush Service</div>
                    <div className="text-sm text-slate-600">(24 Hours)</div>
                  </div>
                </label>
                <label
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.serviceSpeed === 'same-day'
                      ? 'border-[#0891B2] bg-[#E0F2FE]'
                      : 'border-slate-300 hover:border-slate-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="serviceSpeed"
                    value="same-day"
                    checked={formData.serviceSpeed === 'same-day'}
                    onChange={(e) => updateFormData('serviceSpeed', e.target.value as 'standard' | 'rush' | 'same-day')}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="font-semibold text-[#0C2340]">Same-Day</div>
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
                value={formData.additionalNotes}
                onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0891B2] focus:border-transparent resize-none"
                placeholder="Any special instructions or requirements..."
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
            {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
          </button>
        )}
      </div>

      <p className="text-xs text-center text-slate-500 pt-2">
        By submitting, you agree to our privacy policy. We respond within 2 hours during business hours.
      </p>
    </form>
  )
}
