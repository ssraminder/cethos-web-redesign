import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import MedicalDevicesContent from './MedicalDevicesContent'

export const metadata: Metadata = {
  title: 'Medical Device Translation | EU MDR/IVDR Compliance',
  description: 'Specialized medical device translation for EU MDR/IVDR compliance. IFUs, UDI labels, technical documentation, and clinical evaluation reports across 150+ languages.',
  keywords: ['medical device translation', 'EU MDR translation', 'IVDR translation', 'IFU translation', 'UDI label translation', 'medical device documentation'],
  openGraph: {
    title: 'Medical Device Translation Services',
    description: 'Expert medical device translation for EU MDR/IVDR compliance and global market access.',
    url: 'https://cethos.com/services/lifesciences/medical-devices',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/medical-devices',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Medical Device Translation Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "Professional translation of medical device documentation for EU MDR/IVDR compliance and global regulatory submissions.",
  "areaServed": "Worldwide",
  "serviceType": "Medical Device Translation"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Medical Devices", "item": "https://cethos.com/services/lifesciences/medical-devices" }
  ]
}

const faqs = [
  { question: 'Which EU languages are required for medical device labeling?', answer: 'EU MDR requires device labeling and IFUs to be provided in the official language(s) of each member state where the device is marketed. This can include up to 24 official EU languages depending on your target markets. We can help you determine the required languages for your distribution strategy.' },
  { question: 'Do you translate clinical evaluation reports (CERs)?', answer: 'Yes, we translate clinical evaluation reports and other technical documentation required for EU MDR compliance. Our translators have experience with medical device terminology and understand the regulatory context of these documents.' },
  { question: 'Can you handle updates to existing IFUs?', answer: 'Yes, we maintain translation memories and terminology databases for each client to ensure consistency between original translations and updates. This also makes the process more efficient and cost-effective for ongoing IFU revisions.' },
  { question: 'What is your turnaround time for IFU translation?', answer: 'Standard turnaround for IFU translation is 5-7 business days depending on document length and number of languages. We offer expedited services for urgent timelines. Contact us with your specific requirements for a customized quote.' },
]

export default function MedicalDevicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <FAQJsonLd faqs={faqs} />
      <MedicalDevicesContent />
    </>
  )
}
