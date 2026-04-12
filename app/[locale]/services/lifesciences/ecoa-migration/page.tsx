import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import EcoaMigrationContent from './EcoaMigrationContent'

export const metadata: Metadata = {
  title: 'eCOA Migration Services | ePRO Platform Translation | Cethos',
  description: 'Expert eCOA migration and ePRO platform translation services. Screenshot review, audio recording, IVRS localization, and format adaptation for clinical trials.',
  keywords: ['eCOA migration', 'ePRO translation', 'electronic COA', 'IVRS translation', 'screenshot review', 'clinical trial technology'],
  openGraph: {
    title: 'eCOA Migration Services | Cethos',
    description: 'Professional eCOA migration and ePRO platform translation for clinical outcome assessment digitization.',
    url: 'https://cethos.com/services/lifesciences/ecoa-migration',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/ecoa-migration',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "eCOA Migration Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "Professional eCOA migration services for adapting paper-based clinical outcome assessments to electronic platforms.",
  "areaServed": "Worldwide",
  "serviceType": "eCOA Migration"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "eCOA Migration", "item": "https://cethos.com/services/lifesciences/ecoa-migration" }
  ]
}

const faqs = [
  { question: 'What is the difference between eCOA migration and standard translation?', answer: 'eCOA migration involves additional steps beyond translation including character count optimization, screenshot review to verify proper display, and format localization for dates, times, and numbers. Standard translation does not account for the technical constraints of electronic platforms.' },
  { question: 'Do you provide audio recording for IVRS systems?', answer: 'Yes, we provide professional audio recording services for Interactive Voice Response Systems (IVRS) and audio-assisted ePRO applications. All recordings are performed by native speakers with clear diction and appropriate pacing for patient comprehension.' },
  { question: 'How do you handle character limits in eCOA platforms?', answer: 'We work within specified character limits during the translation process. When translations naturally exceed limits, we provide alternative phrasings that preserve meaning while fitting the display constraints. All solutions are documented in our deliverables.' },
  { question: 'Can you work directly with our eCOA vendor?', answer: 'Yes, we have established workflows with all major eCOA platform providers. We can receive files directly from your vendor, upload translations to their systems, and coordinate screenshot review and audio recording deliverables.' },
]

export default function EcoaMigrationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <FAQJsonLd faqs={faqs} />
      <EcoaMigrationContent />
    </>
  )
}
