import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import LinguisticValidationContent from './LinguisticValidationContent'

export const metadata: Metadata = {
  title: 'Linguistic Validation Services | ISPOR-Compliant COA Translation',
  description: 'Expert linguistic validation services following ISPOR 9-step methodology. PRO, ClinRO, ObsRO, and PerfO instrument translation for 25+ therapeutic areas. FDA & EMA compliant.',
  keywords: ['linguistic validation', 'ISPOR guidelines', 'PRO translation', 'ClinRO validation', 'COA translation', 'clinical outcome assessment', 'back translation'],
  openGraph: {
    title: 'Linguistic Validation Services',
    description: 'ISPOR-compliant linguistic validation with 5,000+ specialized linguists across 150+ languages.',
    url: 'https://cethos.com/services/lifesciences/linguistic-validation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/linguistic-validation',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Linguistic Validation Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "ISPOR-compliant linguistic validation services for clinical outcome assessments used in clinical trials and regulatory submissions.",
  "areaServed": "Worldwide",
  "serviceType": "Linguistic Validation"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Linguistic Validation", "item": "https://cethos.com/services/lifesciences/linguistic-validation" }
  ]
}

const faqs = [
  { question: 'What is the difference between linguistic validation and standard translation?', answer: 'Linguistic validation follows a rigorous multi-step process (ISPOR 9-step methodology) that includes dual forward translation, back translation, cognitive debriefing with patients, and harmonization review. Standard translation lacks these quality controls and patient input, making it unsuitable for clinical outcome assessments.' },
  { question: 'Which regulatory agencies require linguistic validation?', answer: 'FDA, EMA, PMDA, Health Canada, MHRA, and other major regulatory agencies require linguistic validation for PRO instruments used to support labeling claims in clinical trials. This includes all patient-reported outcome measures used as primary or secondary endpoints.' },
  { question: 'How long does a full linguistic validation project take?', answer: 'A typical linguistic validation project takes 6-12 weeks depending on the number of languages, instrument complexity, and cognitive debriefing requirements. We can accommodate accelerated timelines when needed.' },
  { question: 'Do you provide licensing support for validated instruments?', answer: 'Yes, we work with instrument developers and copyright holders to ensure proper licensing agreements are in place before beginning translation. We can also advise on public domain instruments and help navigate licensing requirements.' },
  { question: 'What documentation do you provide for regulatory submissions?', answer: 'We provide comprehensive linguistic validation reports including translation certificates, back translation certificates, cognitive debriefing reports, harmonization meeting minutes, and a complete audit trail suitable for regulatory submission.' },
]

export default function LinguisticValidationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <FAQJsonLd faqs={faqs} />
      <LinguisticValidationContent />
    </>
  )
}
