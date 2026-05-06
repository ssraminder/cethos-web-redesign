import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import RegulatoryAffairsContent from './RegulatoryAffairsContent'

export const metadata: Metadata = {
  title: 'Regulatory Affairs Translation | CTD, SmPC, PIL Translation',
  description: 'Expert regulatory translation for CTD Modules 1-5, SmPCs, PILs, and IMP labels. FDA, EMA, PMDA, Health Canada submissions. ISO 17100 compliant processes.',
  keywords: ['regulatory translation', 'CTD translation', 'SmPC translation', 'PIL translation', 'FDA submission', 'EMA submission', 'regulatory affairs'],
  openGraph: {
    title: 'Regulatory Affairs Translation',
    description: 'Expert translation for global regulatory submissions to FDA, EMA, PMDA, and other agencies.',
    url: 'https://cethos.com/services/lifesciences/regulatory-affairs',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/regulatory-affairs',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Regulatory Affairs Translation Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "Professional translation of regulatory documentation for global drug, biologic, and medical device submissions.",
  "areaServed": "Worldwide",
  "serviceType": "Regulatory Translation"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Regulatory Affairs", "item": "https://cethos.com/services/lifesciences/regulatory-affairs" }
  ]
}

const faqs = [
  { question: 'Do you translate full CTD dossiers?', answer: 'Yes, we translate complete CTD dossiers including all five modules. We also handle partial translations, updates, and variations. Our translators have extensive experience with the technical and scientific content in each module.' },
  { question: 'How do you ensure regulatory compliance in translations?', answer: 'Our regulatory translators are trained in the specific requirements of each target agency. We use agency-specific terminology databases, adhere to QRD templates where applicable, and maintain consistency with previously approved texts.' },
  { question: 'Can you handle urgent regulatory submissions?', answer: 'Yes, we offer expedited services for urgent regulatory submissions with turnaround as fast as 48 hours depending on document length and complexity. Our 24/7 project management ensures continuous progress on critical timelines.' },
  { question: 'Do you provide certified translations for regulatory submissions?', answer: 'Yes, all regulatory translations include translation certificates suitable for submission to FDA, EMA, and other regulatory agencies. We maintain complete audit trails and documentation as required.' },
]

export default function RegulatoryAffairsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <FAQJsonLd faqs={faqs} />
      <RegulatoryAffairsContent />
    </>
  )
}
