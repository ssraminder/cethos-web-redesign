import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import ClinicianReviewContent from './ClinicianReviewContent'

export const metadata: Metadata = {
  title: 'Clinician Review in Linguistic Validation | ISPOR & PROMIS Methodology',
  description: 'In-country clinician review as part of ISPOR- and PROMIS/FACIT-guided linguistic validation. Qualified physicians verify medical terminology and conceptual equivalence for PRO, ClinRO, ObsRO, and PerfO instruments.',
  keywords: ['clinician review', 'linguistic validation', 'ISPOR clinician review', 'PROMIS translation', 'FACIT methodology', 'expert review', 'COA translation', 'conceptual equivalence', 'in-country clinician'],
  openGraph: {
    title: 'Clinician Review in Linguistic Validation',
    description: 'ISPOR- and PROMIS/FACIT-guided clinician review by qualified in-country physicians for clinical outcome assessment translations.',
    url: 'https://cethos.com/services/lifesciences/linguistic-validation/clinician-review',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/linguistic-validation/clinician-review',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Clinician Review in Linguistic Validation",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "In-country clinician review within ISPOR- and PROMIS/FACIT-guided linguistic validation, confirming medical terminology accuracy and conceptual equivalence of clinical outcome assessment translations.",
  "areaServed": "Worldwide",
  "serviceType": "Clinician Review",
  "isPartOf": {
    "@type": "Service",
    "name": "Linguistic Validation Services",
    "url": "https://cethos.com/services/lifesciences/linguistic-validation"
  }
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Linguistic Validation", "item": "https://cethos.com/services/lifesciences/linguistic-validation" },
    { "@type": "ListItem", "position": 5, "name": "Clinician Review", "item": "https://cethos.com/services/lifesciences/linguistic-validation/clinician-review" }
  ]
}

const faqs = [
  { question: 'Is clinician review required under ISPOR and PROMIS?', answer: 'Both methodologies build in a medical-expert step. The ISPOR Principles of Good Practice call for review by an in-country clinician to confirm medical terminology and conceptual equivalence, while the PROMIS/FACIT methodology includes an expert review step in which bilingual clinical experts assess the reconciled translation. Clinician review is a standard, expected part of a rigorous linguistic validation.' },
  { question: 'What qualifications do your clinician reviewers have?', answer: 'Following ISPOR guidance, our in-country clinician reviewers hold an M.D. or the relevant equivalent in the target country, have at least two years of experience diagnosing or treating the study population, and possess native-language proficiency and advanced medical terminology in the target language.' },
  { question: 'How is clinician review different from cognitive debriefing?', answer: 'Cognitive debriefing tests comprehension with patients from the target population, while clinician review is a medical-expert assessment of clinical accuracy and appropriate terminology. They are complementary steps: the clinician confirms the translation is medically sound, and cognitive debriefing confirms patients understand it as intended.' },
  { question: 'Where does clinician review fall in the linguistic validation workflow?', answer: 'Clinician review is performed on a near-final, reconciled translation, typically after back-translation review and around cognitive debriefing, and before final proofreading. The clinician issues a report of proposed changes that the forward and back-translation teams reconcile before finalization.' },
  { question: 'Do you support PROMIS universal translations?', answer: 'Yes. For PROMIS, Neuro-QoL, and NIH Toolbox instruments we follow the FACIT universal translation approach, producing a single language version appropriate across countries by involving in-country clinical experts from each relevant region during review.' },
  { question: 'What does the clinician provide at the end of the review?', answer: 'You receive a documented clinician review report detailing proposed changes and the clinical rationale, the annotated or revised translation, and a full audit trail suitable for regulatory submission.' },
]

export default function ClinicianReviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <FAQJsonLd faqs={faqs} />
      <ClinicianReviewContent />
    </>
  )
}
