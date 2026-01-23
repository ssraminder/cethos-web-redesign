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
import { Upload, X, FileText, AlertCircle, ChevronDown, User, Briefcase, Globe, FileUp } from 'lucide-react'
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

// Service-specific configuration
export type ServiceVariant =
  | 'general'
  | 'cognitive-debriefing'
  | 'clinician-review'
  | 'linguistic-validation'

interface LifeSciencesQuoteFormProps {
  /** Pre-selected service type */
  defaultServiceType?: string
  /** Service variant for customized fields */
  variant?: ServiceVariant
  /** Custom title for the form */
  title?: string
  /** Hide service type selector (when service is pre-determined) */
  hideServiceSelector?: boolean
}

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

// Accordion section type
interface AccordionSection {
  id: string
  title: string
  icon: React.ReactNode
  isComplete: boolean
}

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

// Cognitive Debriefing specific options
const TARGET_POPULATIONS = [
  { value: 'general', label: 'General Adult' },
  { value: 'pediatric', label: 'Pediatric' },
  { value: 'geriatric', label: 'Geriatric' },
  { value: 'rare-disease', label: 'Rare Disease' },
  { value: 'cognitive-impairment', label: 'Cognitive Impairment' },
]

const INTERVIEW_FORMATS = [
  { value: 'video', label: 'Video Call' },
  { value: 'phone', label: 'Telephone' },
  { value: 'in-person', label: 'In-Person' },
  { value: 'hybrid', label: 'Hybrid' },
]

// Clinician Review specific options
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

const TURNAROUNDS = [
  { value: 'urgent', label: 'Urgent (48-72 hours)' },
  { value: 'standard', label: 'Standard (5-7 business days)' },
  { value: 'flexible', label: 'Flexible' },
]

// Extended therapeutic areas for clinician review
const CLINICIAN_THERAPEUTIC_AREAS = [
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

export default function LifeSciencesQuoteForm({
  defaultServiceType,
  variant = 'general',
  title,
  hideServiceSelector = false,
}: LifeSciencesQuoteFormProps) {
  const [openSection, setOpenSection] = useState<string>('contact')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [locales, setLocales] = useState<Locale[]>([])
  const [localesLoading, setLocalesLoading] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  // Determine actual service type based on variant
  const getDefaultServiceType = () => {
    if (defaultServiceType) return defaultServiceType
    switch (variant) {
      case 'cognitive-debriefing':
        return 'cognitive-debriefing'
      case 'clinician-review':
        return 'clinician-review'
      case 'linguistic-validation':
        return 'linguistic-validation'
      default:
        return 'linguistic-validation'
    }
  }

  const [formData, setFormData] = useState<LifeSciencesQuoteFormData & {
    // Extended fields for specific variants
    targetPopulation?: string
    participantsPerLanguage?: number
    interviewFormat?: string
    documentType?: string
    reviewerType?: string
    specialtyRequired?: string
    turnaround?: string
  }>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    serviceType: getDefaultServiceType() as LifeSciencesQuoteFormData['serviceType'],
    therapeuticArea: '',
    studyPhase: '',
    instrumentType: '',
    sourceLanguage: '',
    targetLanguages: [],
    wordCount: undefined,
    timeline: 'standard',
    regulatoryPathway: '',
    projectDescription: '',
    // Variant-specific fields
    targetPopulation: '',
    participantsPerLanguage: 5,
    interviewFormat: '',
    documentType: '',
    reviewerType: '',
    specialtyRequired: '',
    turnaround: 'standard',
  })

  // Fetch locales on mount with debug logging
  useEffect(() => {
    const fetchLocales = async () => {
      console.log('[LifeSciencesQuoteForm] Starting locale fetch...')
      try {
        const response = await fetch('/api/locales')
        console.log('[LifeSciencesQuoteForm] Locale API response status:', response.status)
        const data = await response.json()
        console.log('[LifeSciencesQuoteForm] Locale API response data:', {
          hasLocales: !!data.locales,
          count: data.locales?.length || 0,
          source: data.source || 'unknown',
          sample: data.locales?.slice(0, 3) || []
        })
        if (data.locales) {
          setLocales(data.locales)
          console.log('[LifeSciencesQuoteForm] Locales set successfully, count:', data.locales.length)
        }
      } catch (error) {
        console.error('[LifeSciencesQuoteForm] Error fetching locales:', error)
      } finally {
        setLocalesLoading(false)
      }
    }
    fetchLocales()
  }, [])

  const updateFormData = (field: string, value: string | string[] | number | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Check if a section is complete
  const isSectionComplete = (sectionId: string): boolean => {
    switch (sectionId) {
      case 'contact':
        return !!(
          formData.fullName &&
          formData.email &&
          formData.phone &&
          formData.companyName
        )
      case 'service':
        if (variant === 'cognitive-debriefing') {
          return !!(
            formData.instrumentType &&
            formData.targetPopulation &&
            formData.interviewFormat
          )
        }
        if (variant === 'clinician-review') {
          return !!(
            formData.documentType &&
            formData.reviewerType &&
            (formData.turnaround || formData.timeline)
          )
        }
        return !!(formData.serviceType && formData.timeline)
      case 'languages':
        return !!(formData.sourceLanguage && formData.targetLanguages.length > 0)
      case 'project':
        return !!(formData.projectDescription && formData.projectDescription.length >= 10)
      default:
        return false
    }
  }

  // Get section status
  const getSections = (): AccordionSection[] => {
    return [
      {
        id: 'contact',
        title: 'Contact Information',
        icon: <User className="w-5 h-5" />,
        isComplete: isSectionComplete('contact'),
      },
      {
        id: 'service',
        title: variant === 'cognitive-debriefing'
          ? 'Study Details'
          : variant === 'clinician-review'
          ? 'Review Requirements'
          : 'Service Details',
        icon: <Briefcase className="w-5 h-5" />,
        isComplete: isSectionComplete('service'),
      },
      {
        id: 'languages',
        title: 'Languages',
        icon: <Globe className="w-5 h-5" />,
        isComplete: isSectionComplete('languages'),
      },
      {
        id: 'project',
        title: 'Project Details & Files',
        icon: <FileUp className="w-5 h-5" />,
        isComplete: isSectionComplete('project'),
      },
    ]
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Contact validation
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

    // Service validation based on variant
    if (variant === 'cognitive-debriefing') {
      if (!formData.instrumentType) {
        newErrors.instrumentType = 'Please select an instrument type'
      }
      if (!formData.targetPopulation) {
        newErrors.targetPopulation = 'Please select a target population'
      }
      if (!formData.interviewFormat) {
        newErrors.interviewFormat = 'Please select an interview format'
      }
    } else if (variant === 'clinician-review') {
      if (!formData.documentType) {
        newErrors.documentType = 'Please select a document type'
      }
      if (!formData.reviewerType) {
        newErrors.reviewerType = 'Please select a reviewer type'
      }
      if (!formData.turnaround && !formData.timeline) {
        newErrors.turnaround = 'Please select a turnaround time'
      }
    } else {
      if (!formData.serviceType) {
        newErrors.serviceType = 'Please select a service type'
      }
      if (!formData.timeline) {
        newErrors.timeline = 'Please select a timeline'
      }
    }

    // Languages validation
    if (!formData.sourceLanguage) {
      newErrors.sourceLanguage = 'Please select a source language'
    }
    if (formData.targetLanguages.length === 0) {
      newErrors.targetLanguages = 'Please select at least one target language'
    }

    // Project validation
    if (!formData.projectDescription || formData.projectDescription.length < 10) {
      newErrors.projectDescription = 'Please provide a project description (at least 10 characters)'
    }

    setErrors(newErrors)

    // Open the first section with an error
    if (Object.keys(newErrors).length > 0) {
      const errorFields = Object.keys(newErrors)
      const contactFields = ['fullName', 'email', 'phone', 'companyName', 'jobTitle']
      const serviceFields = ['serviceType', 'timeline', 'instrumentType', 'targetPopulation', 'interviewFormat', 'documentType', 'reviewerType', 'turnaround']
      const languageFields = ['sourceLanguage', 'targetLanguages']

      if (errorFields.some(f => contactFields.includes(f))) {
        setOpenSection('contact')
      } else if (errorFields.some(f => serviceFields.includes(f))) {
        setOpenSection('service')
      } else if (errorFields.some(f => languageFields.includes(f))) {
        setOpenSection('languages')
      } else {
        setOpenSection('project')
      }
    }

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
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

      // Ensure correct service type is set for variants
      if (variant === 'cognitive-debriefing') {
        submitData.set('serviceType', 'cognitive-debriefing')
      } else if (variant === 'clinician-review') {
        submitData.set('serviceType', 'clinician-review')
      }

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
    const fileErrors: string[] = []

    Array.from(selectedFiles).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        fileErrors.push(`${file.name} exceeds 10MB limit`)
      } else if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        fileErrors.push(`${file.name} has an unsupported file type`)
      } else {
        newFiles.push(file)
      }
    })

    if (fileErrors.length > 0) {
      setSubmitError(fileErrors.join('. '))
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

  const sections = getSections()

  // Accordion Section Component
  const AccordionItem = ({ section, children }: { section: AccordionSection; children: React.ReactNode }) => {
    const isOpen = openSection === section.id

    return (
      <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
        <button
          type="button"
          onClick={() => setOpenSection(isOpen ? '' : section.id)}
          className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${
            isOpen ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${section.isComplete ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-500'}`}>
              {section.isComplete ? <CheckIcon size={20} /> : section.icon}
            </div>
            <span className="font-semibold text-navy">{section.title}</span>
            {section.isComplete && (
              <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full">Complete</span>
            )}
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 border-t border-slate-100 bg-white">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

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
              Thank you for your interest in our {variant === 'cognitive-debriefing' ? 'cognitive debriefing' : variant === 'clinician-review' ? 'clinician review' : 'life sciences'} services. Our team will review your
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
          {/* Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-[#0C2340] to-[#1a3a5c]">
            <h2 className="text-xl font-bold text-white">
              {title || (variant === 'cognitive-debriefing'
                ? 'Request Cognitive Debriefing Quote'
                : variant === 'clinician-review'
                ? 'Request Clinician Review Quote'
                : 'Request a Quote')}
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Complete each section below. All fields marked with * are required.
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6" aria-label="Life sciences quote request form">
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

            {/* Section 1: Contact Information */}
            <AccordionItem section={sections[0]}>
              <div className="space-y-4">
                <p className="text-slate-600 text-sm mb-4">Tell us how to reach you.</p>
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
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    onClick={() => setOpenSection('service')}
                    disabled={!isSectionComplete('contact')}
                    showArrow
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </AccordionItem>

            {/* Section 2: Service Details */}
            <AccordionItem section={sections[1]}>
              <div className="space-y-4">
                {variant === 'cognitive-debriefing' ? (
                  // Cognitive Debriefing specific fields
                  <>
                    <p className="text-slate-600 text-sm mb-4">Tell us about your cognitive debriefing study.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Instrument Type"
                        options={[
                          { value: 'pro', label: 'PRO (Patient-Reported Outcome)' },
                          { value: 'clinro', label: 'ClinRO (Clinician-Reported Outcome)' },
                          { value: 'obsro', label: 'ObsRO (Observer-Reported Outcome)' },
                          { value: 'perfo', label: 'PerfO (Performance Outcome)' },
                          { value: 'other', label: 'Other' },
                        ]}
                        value={formData.instrumentType || ''}
                        onChange={(e) => updateFormData('instrumentType', e.target.value)}
                        error={errors.instrumentType}
                        required
                      />
                      <Select
                        label="Target Population"
                        options={TARGET_POPULATIONS}
                        value={formData.targetPopulation || ''}
                        onChange={(e) => updateFormData('targetPopulation', e.target.value)}
                        error={errors.targetPopulation}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Therapeutic Area"
                        options={therapeuticAreas.map((t) => ({ value: t.value, label: t.label }))}
                        value={formData.therapeuticArea || ''}
                        onChange={(e) => updateFormData('therapeuticArea', e.target.value)}
                        helperText="Optional"
                      />
                      <Select
                        label="Interview Format"
                        options={INTERVIEW_FORMATS}
                        value={formData.interviewFormat || ''}
                        onChange={(e) => updateFormData('interviewFormat', e.target.value)}
                        error={errors.interviewFormat}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">
                          Participants per Language
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={15}
                          value={formData.participantsPerLanguage || 5}
                          onChange={(e) => updateFormData('participantsPerLanguage', parseInt(e.target.value) || 5)}
                          className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                        <p className="text-xs text-slate-500 mt-1">ISPOR recommends 5-8 participants per language</p>
                      </div>
                      <Select
                        label="Study Phase"
                        options={studyPhases.map((p) => ({ value: p.value, label: p.label }))}
                        value={formData.studyPhase || ''}
                        onChange={(e) => updateFormData('studyPhase', e.target.value)}
                        helperText="Optional"
                      />
                    </div>
                    <Select
                      label="Timeline"
                      options={[
                        { value: 'urgent', label: 'Urgent (1-2 weeks)' },
                        { value: 'standard', label: 'Standard (3-4 weeks)' },
                        { value: 'flexible', label: 'Flexible' },
                      ]}
                      value={formData.timeline || ''}
                      onChange={(e) => updateFormData('timeline', e.target.value)}
                      error={errors.timeline}
                      required
                    />
                  </>
                ) : variant === 'clinician-review' ? (
                  // Clinician Review specific fields
                  <>
                    <p className="text-slate-600 text-sm mb-4">Tell us about your clinical review requirements.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Document Type"
                        options={DOCUMENT_TYPES}
                        value={formData.documentType || ''}
                        onChange={(e) => updateFormData('documentType', e.target.value)}
                        error={errors.documentType}
                        required
                      />
                      <Select
                        label="Reviewer Type"
                        options={REVIEWER_TYPES}
                        value={formData.reviewerType || ''}
                        onChange={(e) => updateFormData('reviewerType', e.target.value)}
                        error={errors.reviewerType}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Select
                        label="Therapeutic Area"
                        options={CLINICIAN_THERAPEUTIC_AREAS}
                        value={formData.therapeuticArea || ''}
                        onChange={(e) => updateFormData('therapeuticArea', e.target.value)}
                        helperText="Optional"
                      />
                      {formData.reviewerType === 'specialist' && (
                        <Input
                          label="Required Specialty"
                          placeholder="e.g., Oncologist, Cardiologist"
                          value={formData.specialtyRequired || ''}
                          onChange={(e) => updateFormData('specialtyRequired', e.target.value)}
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        label="Word Count (approx)"
                        type="number"
                        placeholder="e.g., 5000"
                        value={formData.wordCount || ''}
                        onChange={(e) =>
                          updateFormData('wordCount', e.target.value ? parseInt(e.target.value) : undefined)
                        }
                        helperText="Optional"
                      />
                      <Select
                        label="Turnaround"
                        options={TURNAROUNDS}
                        value={formData.turnaround || formData.timeline || ''}
                        onChange={(e) => {
                          updateFormData('turnaround', e.target.value)
                          updateFormData('timeline', e.target.value)
                        }}
                        error={errors.turnaround}
                        required
                      />
                    </div>
                  </>
                ) : (
                  // General/default service fields
                  <>
                    <p className="text-slate-600 text-sm mb-4">Tell us about your project requirements.</p>
                    {!hideServiceSelector && (
                      <Select
                        label="Service Type"
                        options={serviceTypes.map((s) => ({ value: s.value, label: s.label }))}
                        value={formData.serviceType}
                        onChange={(e) => updateFormData('serviceType', e.target.value)}
                        error={errors.serviceType}
                        required
                      />
                    )}
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
                          Timeline <span className="text-red-500">*</span>
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
                  </>
                )}
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    onClick={() => setOpenSection('languages')}
                    disabled={!isSectionComplete('service')}
                    showArrow
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </AccordionItem>

            {/* Section 3: Languages */}
            <AccordionItem section={sections[2]}>
              <div className="space-y-4">
                <p className="text-slate-600 text-sm mb-4">Select your source and target languages.</p>

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

                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    onClick={() => setOpenSection('project')}
                    disabled={!isSectionComplete('languages')}
                    showArrow
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </AccordionItem>

            {/* Section 4: Project Details & Files */}
            <AccordionItem section={sections[3]}>
              <div className="space-y-6">
                <p className="text-slate-600 text-sm mb-4">Describe your project and upload any relevant files.</p>

                {/* Project Description */}
                <Textarea
                  label="Project Description"
                  placeholder={
                    variant === 'cognitive-debriefing'
                      ? "Describe your study, the instrument being validated, patient population, and any special requirements..."
                      : variant === 'clinician-review'
                      ? "Describe the documents requiring clinical review, specific terminology concerns, and reviewer qualifications needed..."
                      : "Please describe your project, including any specific requirements, deadlines, or regulatory considerations..."
                  }
                  value={formData.projectDescription}
                  onChange={(e) => updateFormData('projectDescription', e.target.value)}
                  error={errors.projectDescription}
                  required
                />

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
              </div>
            </AccordionItem>

            {/* Submit Button */}
            <div className="mt-6 pt-6 border-t border-slate-100">
              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full sm:w-auto"
                disabled={!sections.every(s => s.isComplete)}
              >
                Submit Quote Request
              </Button>
              {!sections.every(s => s.isComplete) && (
                <p className="mt-2 text-sm text-slate-500">
                  Please complete all sections to submit your request.
                </p>
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
