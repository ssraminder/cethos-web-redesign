import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import ClinicalTrialsContent from './ClinicalTrialsContent'

export const metadata: Metadata = {
  title: 'Clinical Trial Translation Services | Protocols, ICFs, CRFs | Cethos',
  description: 'Specialized clinical trial document translation including protocols, ICFs, CRFs, patient materials, and site documentation. GCP-compliant with ISO 17100 compliant processes.',
  keywords: ['clinical trial translation', 'protocol translation', 'ICF translation', 'informed consent translation', 'CRF translation', 'GCP compliant'],
  openGraph: {
    title: 'Clinical Trial Translation Services | Cethos',
    description: 'GCP-compliant clinical trial document translation for global studies across 150+ languages.',
    url: 'https://cethos.com/services/lifesciences/clinical-trials',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/clinical-trials',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Clinical Trial Translation Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "GCP-compliant translation of clinical trial documentation including protocols, informed consent forms, and patient-facing materials.",
  "areaServed": "Worldwide",
  "serviceType": "Clinical Trial Translation"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Clinical Trials", "item": "https://cethos.com/services/lifesciences/clinical-trials" }
  ]
}

const faqs = [
  { question: 'What is the typical turnaround time for ICF translation?', answer: 'Standard turnaround for informed consent form translation is 5-7 business days per language. We offer expedited services with 24-48 hour turnaround for urgent needs. Turnaround depends on document length and language pair.' },
  { question: 'Do you provide back translation for clinical trial documents?', answer: 'Yes, we provide certified back translation services for all clinical trial documents when required by your sponsor or ethics committee. Back translations are performed by independent translators who have not seen the source text.' },
  { question: 'How do you ensure consistency across multiple study amendments?', answer: 'We maintain dedicated translation memories and glossaries for each study. All amendments reference the existing TM to ensure consistent terminology and phrasing across document versions and languages.' },
  { question: 'Can you handle urgent protocol amendments?', answer: 'Yes, we have 24/7 project management support and can accommodate urgent protocol amendments with expedited turnaround. Contact us to discuss your specific timeline requirements.' },
  { question: 'Do you provide regulatory submission support?', answer: 'Yes, we provide translation certificates and documentation suitable for regulatory submission to FDA, EMA, and other regulatory agencies. All translations are performed in compliance with GCP guidelines.' },
]

export default function ClinicalTrialsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <FAQJsonLd faqs={faqs} />
      <ClinicalTrialsContent />
    </>
  )
}
