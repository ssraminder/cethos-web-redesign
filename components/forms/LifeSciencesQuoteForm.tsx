'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Card, Button, Input, Textarea, Select } from '@/components/ui'
import {
  CheckIcon,
  DocumentCheckIcon,
  GlobeNetworkIcon,
  ClockIcon,
} from '@/components/icons'
import { Upload, X, FileText, AlertCircle } from 'lucide-react'
import {
  serviceTypes,
  therapeuticAreas,
  studyPhases,
  instrumentTypes,
  regulatoryPathways,
  timelineOptions,
  servicesRequiringInstrument,
  lifeSciencesQuoteSchema,
  type LifeSciencesQuoteFormData,
} from '@/lib/validations/life-sciences-quote'

interface Locale {
  id: number
  value: string
  label: string
  languageName: string
  countryName: string | null
}

interface FormErrors {
  [key: string]: string | undefined
}

const steps = [
  { id: 1, title: 'Contact' },
  { id: 2, title: 'Service Details' },
  { id: 3, title: 'Languages & Files' },
]

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'text/plain',
]

export default function LifeSciencesQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [locales, setLocales] = useState<Locale[]>([])
  const [localesLoading, setLocalesLoading] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [formData, setFormData] = useState<LifeSciencesQuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    serviceType: 'linguistic-validation',
    therapeuticArea: '',
    studyPhase: '',
    instrumentType: '',
    sourceLanguage: '',
    targetLanguages: [],
    wordCount: undefined,
    timeline: 'standard',
    regulatoryPathway: '',
    projectDescription: '',
  })

  // Fetch locales on mount
  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const response = await fetch('/api/locales')
        const data = await response.json()
        if (data.locales) {
          setLocales(data.locales)
        }
      } catch (error) {
        console.error('Error fetching locales:', error)
      } finally {
        setLocalesLoading(false)
      }
    }
    fetchLocales()
  }, [])

  const updateFormData = (field: string, value: string | string[] | number | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      if (!formData.fullName || formData.fullName.length < 2) {
        newErrors.fullName = 'Full name is required'
      }
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required'
      }
      if (!formData.phone || formData.phone.length < 7) {
        newErrors.phone = 'Phone number is required'
      }
      if (!formData.companyName || formData.companyName.length < 2) {
        newErrors.companyName = 'Company name is required'
      }
    }

    if (step === 2) {
      if (!formData.serviceType) {
        newErrors.serviceType = 'Please select a service type'
      }
      if (!formData.timeline) {
        newErrors.timeline = 'Please select a timeline'
      }
    }

    if (step === 3) {
      if (!formData.sourceLanguage) {
        newErrors.sourceLanguage = 'Please select a source language'
      }
      if (formData.targetLanguages.length === 0) {
        newErrors.targetLanguages = 'Please select at least one target language'
      }
      if (!formData.projectDescription || formData.projectDescription.length < 10) {
        newErrors.projectDescription = 'Please provide a project description (at least 10 characters)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) {
      return
    }

    // Final validation with Zod
    const result = lifeSciencesQuoteSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: FormErrors = {}
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message
        }
      })
      setErrors(fieldErrors)
      return
    }

    setIsLoading(true)
    setSubmitError(null)

    try {
      const submitData = new FormData()

      // Add form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'targetLanguages') {
          submitData.append(key, JSON.stringify(value))
        } else if (value !== undefined && value !== null && value !== '') {
          submitData.append(key, String(value))
        }
      })

      // Add files
      files.forEach((file) => {
        submitData.append('files', file)
      })

      const response = await fetch('/api/quote', {
        method: 'POST',
        body: submitData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit quote request')
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitError(
        error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTargetLanguage = (value: string) => {
    const current = formData.targetLanguages
    if (current.includes(value)) {
      updateFormData('targetLanguages', current.filter((l) => l !== value))
    } else {
      updateFormData('targetLanguages', [...current, value])
    }
  }

  // File handling
  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return

    const newFiles: File[] = []
    const errors: string[] = []

    Array.from(selectedFiles).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} exceeds 10MB limit`)
      } else if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name} has an unsupported file type`)
      } else {
        newFiles.push(file)
      }
    })

    if (errors.length > 0) {
      setSubmitError(errors.join('. '))
      setTimeout(() => setSubmitError(null), 5000)
    }

    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files)
    }
  }, [])

  const showInstrumentType = servicesRequiringInstrument.includes(formData.serviceType)

  // Filter locales for source and target selection
  const sourceLocaleOptions = locales.map((l) => ({
    value: l.value,
    label: l.label,
  }))

  return (
    <>
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <CheckIcon size={40} className="text-teal-600" />
            </div>
            <h2 className="text-2xl font-bold text-navy mb-4">Quote Request Submitted!</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Thank you for your interest in our life sciences services. Our team will review your
              project and send you a detailed quote within 2 hours during business hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
              <div className="p-4 rounded-xl bg-slate-50">
                <DocumentCheckIcon size={24} className="mx-auto text-teal-600 mb-2" />
                <p className="text-sm text-slate-600">Quote via Email</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                <ClockIcon size={24} className="mx-auto text-teal-600 mb-2" />
                <p className="text-sm text-slate-600">Within 2 Hours</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50">
                <GlobeNetworkIcon size={24} className="mx-auto text-teal-600 mb-2" />
                <p className="text-sm text-slate-600">77 Locales</p>
              </div>
            </div>

            <Button href="/services/lifesciences" variant="secondary">
              Return to Life Sciences
            </Button>
          </Card>
        </motion.div>
      ) : (
        <Card padding="none" className="overflow-hidden">
          {/* Progress Steps */}
          <div className="px-8 py-6 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        currentStep >= step.id
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {currentStep > step.id ? <CheckIcon size={20} /> : step.id}
                    </div>
                    <span
                      className={`mt-2 text-sm ${
                        currentStep >= step.id ? 'text-teal-600 font-medium' : 'text-slate-500'
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                        currentStep > step.id ? 'bg-teal-600' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8" aria-label="Life sciences quote request form">
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{submitError}</p>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-navy mb-1">Contact Information</h2>
                    <p className="text-slate-600">Tell us how to reach you.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      placeholder="John Smith"
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                      error={errors.fullName}
                      required
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      error={errors.email}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      error={errors.phone}
                      required
                    />
                    <Input
                      label="Company Name"
                      placeholder="Your Company"
                      value={formData.companyName}
                      onChange={(e) => updateFormData('companyName', e.target.value)}
                      error={errors.companyName}
                      required
                    />
                  </div>

                  <Input
                    label="Job Title"
                    placeholder="Clinical Operations Manager"
                    value={formData.jobTitle || ''}
                    onChange={(e) => updateFormData('jobTitle', e.target.value)}
                    helperText="Optional"
                  />
                </motion.div>
              )}

              {/* Step 2: Service Details */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-navy mb-1">Service Details</h2>
                    <p className="text-slate-600">Tell us about your project requirements.</p>
                  </div>

                  <Select
                    label="Service Type"
                    options={serviceTypes.map((s) => ({ value: s.value, label: s.label }))}
                    value={formData.serviceType}
                    onChange={(e) => updateFormData('serviceType', e.target.value)}
                    error={errors.serviceType}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Therapeutic Area"
                      options={therapeuticAreas.map((t) => ({ value: t.value, label: t.label }))}
                      value={formData.therapeuticArea || ''}
                      onChange={(e) => updateFormData('therapeuticArea', e.target.value)}
                      helperText="Optional"
                    />
                    <Select
                      label="Study Phase"
                      options={studyPhases.map((p) => ({ value: p.value, label: p.label }))}
                      value={formData.studyPhase || ''}
                      onChange={(e) => updateFormData('studyPhase', e.target.value)}
                      helperText="Optional"
                    />
                  </div>

                  {showInstrumentType && (
                    <Select
                      label="Instrument Type"
                      options={instrumentTypes.map((i) => ({ value: i.value, label: i.label }))}
                      value={formData.instrumentType || ''}
                      onChange={(e) => updateFormData('instrumentType', e.target.value)}
                      helperText="Select the type of clinical outcome assessment or document"
                    />
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Regulatory Pathway"
                      options={regulatoryPathways.map((r) => ({ value: r.value, label: r.label }))}
                      value={formData.regulatoryPathway || ''}
                      onChange={(e) => updateFormData('regulatoryPathway', e.target.value)}
                      helperText="Optional"
                    />
                    <div>
                      <label className="block text-sm font-medium text-navy mb-3">
                        Timeline
                      </label>
                      <div className="space-y-2">
                        {timelineOptions.map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.timeline === option.value
                                ? 'border-teal-500 bg-teal-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="timeline"
                              value={option.value}
                              checked={formData.timeline === option.value}
                              onChange={(e) => updateFormData('timeline', e.target.value)}
                              className="sr-only"
                            />
                            <div
                              className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                                formData.timeline === option.value
                                  ? 'border-teal-500'
                                  : 'border-slate-300'
                              }`}
                            >
                              {formData.timeline === option.value && (
                                <div className="w-2 h-2 rounded-full bg-teal-500" />
                              )}
                            </div>
                            <span className="text-sm text-navy">{option.label}</span>
                          </label>
                        ))}
                      </div>
                      {errors.timeline && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.timeline}</p>
                      )}
                    </div>
                  </div>

                  <Input
                    label="Estimated Word Count"
                    type="number"
                    placeholder="e.g., 5000"
                    value={formData.wordCount || ''}
                    onChange={(e) =>
                      updateFormData('wordCount', e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    helperText="Approximate number of words (optional)"
                  />
                </motion.div>
              )}

              {/* Step 3: Languages & Files */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-navy mb-1">Languages & Files</h2>
                    <p className="text-slate-600">Select your languages and upload any reference files.</p>
                  </div>

                  {/* Source Language */}
                  <div>
                    <Select
                      label="Source Language"
                      options={sourceLocaleOptions}
                      value={formData.sourceLanguage}
                      onChange={(e) => updateFormData('sourceLanguage', e.target.value)}
                      error={errors.sourceLanguage}
                      required
                      disabled={localesLoading}
                    />
                    {localesLoading && (
                      <p className="mt-1 text-sm text-slate-500">Loading languages...</p>
                    )}
                  </div>

                  {/* Target Languages */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-3">
                      Target Languages <span className="text-red-500">*</span>
                    </label>
                    {localesLoading ? (
                      <p className="text-sm text-slate-500">Loading languages...</p>
                    ) : (
                      <>
                        <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-lg p-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {locales.map((locale) => (
                              <button
                                key={locale.id}
                                type="button"
                                onClick={() => toggleTargetLanguage(locale.value)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors ${
                                  formData.targetLanguages.includes(locale.value)
                                    ? 'bg-teal-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                              >
                                {locale.label}
                              </button>
                            ))}
                          </div>
                        </div>
                        {formData.targetLanguages.length > 0 && (
                          <p className="mt-2 text-sm text-teal-600">
                            {formData.targetLanguages.length} language(s) selected
                          </p>
                        )}
                        {errors.targetLanguages && (
                          <p className="mt-1.5 text-sm text-red-500">{errors.targetLanguages}</p>
                        )}
                      </>
                    )}
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Upload Files (Optional)
                    </label>
                    <div
                      onDragEnter={handleDragIn}
                      onDragLeave={handleDragOut}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        isDragging
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-300 hover:border-teal-400'
                      }`}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt"
                        onChange={(e) => handleFileSelect(e.target.files)}
                        className="hidden"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                        <p className="text-slate-600 mb-1">
                          Drag and drop files here, or{' '}
                          <span className="text-teal-600 font-medium">browse</span>
                        </p>
                        <p className="text-sm text-slate-400">
                          PDF, Word, Excel, Images (max 10MB each)
                        </p>
                      </label>
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-slate-500" />
                              <div>
                                <p className="text-sm font-medium text-navy">{file.name}</p>
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

                  {/* Project Description */}
                  <Textarea
                    label="Project Description"
                    placeholder="Please describe your project, including any specific requirements, deadlines, or regulatory considerations..."
                    value={formData.projectDescription}
                    onChange={(e) => updateFormData('projectDescription', e.target.value)}
                    error={errors.projectDescription}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
              {currentStep > 1 ? (
                <Button type="button" variant="secondary" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext} showArrow>
                  Continue
                </Button>
              ) : (
                <Button type="submit" isLoading={isLoading}>
                  Submit Quote Request
                </Button>
              )}
            </div>
          </form>
        </Card>
      )}

      {/* Trust indicators */}
      {!isSubmitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-slate-500 text-sm mb-4">
            Trusted by leading pharmaceutical and biotech companies
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
            <span>ISO 17100 Certified</span>
            <span>HIPAA Compliant</span>
            <span>FDA 21 CFR Part 11</span>
          </div>
        </motion.div>
      )}
    </>
  )
}
