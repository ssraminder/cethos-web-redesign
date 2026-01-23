import { z } from 'zod'

// Service type options
export const serviceTypes = [
  { value: 'linguistic-validation', label: 'Linguistic Validation' },
  { value: 'cognitive-debriefing', label: 'Cognitive Debriefing' },
  { value: 'clinical-translation', label: 'Clinical Translation' },
  { value: 'regulatory', label: 'Regulatory Translation' },
  { value: 'pharmacovigilance', label: 'Pharmacovigilance' },
  { value: 'ecoa', label: 'eCOA/ePRO' },
  { value: 'medical-device', label: 'Medical Device' },
] as const

// Therapeutic area options
export const therapeuticAreas = [
  { value: 'oncology', label: 'Oncology' },
  { value: 'cns', label: 'CNS / Neurology' },
  { value: 'cardiology', label: 'Cardiology' },
  { value: 'respiratory', label: 'Respiratory' },
  { value: 'immunology', label: 'Immunology' },
  { value: 'rare-disease', label: 'Rare Disease' },
  { value: 'dermatology', label: 'Dermatology' },
  { value: 'gastroenterology', label: 'Gastroenterology' },
  { value: 'endocrinology', label: 'Endocrinology' },
  { value: 'infectious-disease', label: 'Infectious Disease' },
  { value: 'other', label: 'Other' },
] as const

// Study phase options
export const studyPhases = [
  { value: 'phase-1', label: 'Phase 1' },
  { value: 'phase-2', label: 'Phase 2' },
  { value: 'phase-3', label: 'Phase 3' },
  { value: 'phase-4', label: 'Phase 4' },
  { value: 'post-market', label: 'Post-Market' },
  { value: 'na', label: 'N/A' },
] as const

// Instrument type options
export const instrumentTypes = [
  { value: 'pro', label: 'PRO (Patient-Reported Outcome)' },
  { value: 'clinro', label: 'ClinRO (Clinician-Reported Outcome)' },
  { value: 'obsro', label: 'ObsRO (Observer-Reported Outcome)' },
  { value: 'perfo', label: 'PerfO (Performance Outcome)' },
  { value: 'icf', label: 'ICF (Informed Consent Form)' },
  { value: 'protocol', label: 'Protocol' },
  { value: 'ib', label: 'Investigator Brochure' },
  { value: 'ctd', label: 'CTD (Common Technical Document)' },
  { value: 'labeling', label: 'Labeling / IFU' },
  { value: 'other', label: 'Other' },
] as const

// Regulatory pathway options
export const regulatoryPathways = [
  { value: 'fda', label: 'FDA (United States)' },
  { value: 'ema', label: 'EMA (European Union)' },
  { value: 'health-canada', label: 'Health Canada' },
  { value: 'pmda', label: 'PMDA (Japan)' },
  { value: 'nmpa', label: 'NMPA (China)' },
  { value: 'mhra', label: 'MHRA (UK)' },
  { value: 'multiple', label: 'Multiple Agencies' },
  { value: 'other', label: 'Other' },
] as const

// Timeline options
export const timelineOptions = [
  { value: 'urgent', label: 'Urgent (1-3 business days)' },
  { value: 'standard', label: 'Standard (5-7 business days)' },
  { value: 'flexible', label: 'Flexible (2+ weeks)' },
] as const

// Zod validation schema
export const lifeSciencesQuoteSchema = z.object({
  // Contact information
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  companyName: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must be less than 200 characters'),
  jobTitle: z
    .string()
    .max(100, 'Job title must be less than 100 characters')
    .optional()
    .or(z.literal('')),

  // Service details
  serviceType: z.enum([
    'linguistic-validation',
    'cognitive-debriefing',
    'clinical-translation',
    'regulatory',
    'pharmacovigilance',
    'ecoa',
    'medical-device',
  ], { message: 'Please select a service type' }),
  therapeuticArea: z.enum([
    'oncology',
    'cns',
    'cardiology',
    'respiratory',
    'immunology',
    'rare-disease',
    'dermatology',
    'gastroenterology',
    'endocrinology',
    'infectious-disease',
    'other',
  ]).optional().or(z.literal('')),
  studyPhase: z.enum([
    'phase-1',
    'phase-2',
    'phase-3',
    'phase-4',
    'post-market',
    'na',
  ]).optional().or(z.literal('')),
  instrumentType: z.enum([
    'pro',
    'clinro',
    'obsro',
    'perfo',
    'icf',
    'protocol',
    'ib',
    'ctd',
    'labeling',
    'other',
  ]).optional().or(z.literal('')),

  // Languages
  sourceLanguage: z
    .string()
    .min(1, 'Please select a source language'),
  targetLanguages: z
    .array(z.string())
    .min(1, 'Please select at least one target language'),

  // Scope
  wordCount: z
    .number()
    .positive('Word count must be a positive number')
    .optional()
    .or(z.literal(0))
    .or(z.nan()),
  timeline: z.enum(['urgent', 'standard', 'flexible'], { message: 'Please select a timeline' }),
  regulatoryPathway: z.enum([
    'fda',
    'ema',
    'health-canada',
    'pmda',
    'nmpa',
    'mhra',
    'multiple',
    'other',
  ]).optional().or(z.literal('')),

  // Files & Notes
  projectDescription: z
    .string()
    .min(10, 'Please provide a project description (at least 10 characters)')
    .max(5000, 'Project description must be less than 5000 characters'),
})

export type LifeSciencesQuoteFormData = z.infer<typeof lifeSciencesQuoteSchema>

// Services that require instrument type selection
export const servicesRequiringInstrument = [
  'linguistic-validation',
  'cognitive-debriefing',
  'ecoa',
]

// Default form values
export const defaultFormValues: LifeSciencesQuoteFormData = {
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
}
