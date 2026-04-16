import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import CognitiveDebriefingContent from './CognitiveDebriefingContent'

export const metadata: Metadata = {
  title: 'Cognitive Debriefing Services | ISPOR-Compliant Patient Interviews',
  description: 'Professional cognitive debriefing services with 1,000+ trained moderators in 150+ languages. ISPOR-compliant patient interviews for PRO, ClinRO, ObsRO validation. FDA & EMA accepted.',
  keywords: ['cognitive debriefing', 'linguistic validation', 'PRO validation', 'patient interviews', 'ISPOR guidelines', 'clinical outcome assessment'],
  openGraph: {
    title: 'Cognitive Debriefing Services',
    description: 'ISPOR-compliant cognitive debriefing with 1,000+ trained moderators in 150+ languages.',
    url: 'https://cethos.com/services/lifesciences/cognitive-debriefing',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/cognitive-debriefing',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cognitive Debriefing Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "ISPOR-compliant cognitive debriefing services for linguistic validation of clinical outcome assessments.",
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
    { "@type": "ListItem", "position": 4, "name": "Cognitive Debriefing", "item": "https://cethos.com/services/lifesciences/cognitive-debriefing" }
  ]
}

const faqs = [
  { question: 'How many cognitive debriefing participants are needed per language?', answer: 'ISPOR guidelines recommend 5-8 participants per language for cognitive debriefing interviews to ensure adequate assessment of patient comprehension and cultural appropriateness.' },
  { question: 'What interview formats are available for cognitive debriefing?', answer: 'We offer video call, telephone, and in-person cognitive debriefing interviews depending on your study requirements, participant population, and geographic locations.' },
  { question: 'How long does cognitive debriefing take?', answer: 'Cognitive debriefing typically takes 2-4 weeks depending on the number of languages, participant recruitment complexity, and interview scheduling requirements.' },
  { question: 'Can you recruit specialized patient populations?', answer: 'Yes, we have extensive experience recruiting pediatric patients (ages 5-17), geriatric populations, rare disease patients, and individuals with cognitive impairment.' },
  { question: 'Is cognitive debriefing required by FDA and EMA?', answer: 'Yes, both FDA and EMA require cognitive debriefing as part of linguistic validation to demonstrate content validity for translated clinical outcome assessments.' },
]

export default function CognitiveDebriefingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <FAQJsonLd faqs={faqs} />
      <CognitiveDebriefingContent />
    </>
  )
}
