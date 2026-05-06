import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import PharmacovigilanceContent from './PharmacovigilanceContent'

export const metadata: Metadata = {
  title: 'Pharmacovigilance Translation Services | ICSRs, PSURs, DSURs',
  description: 'Specialized pharmacovigilance translation for ICSRs, SAE reports, PSURs, DSURs, and PBRERs. Rapid turnaround for regulatory compliance. 24/7 availability.',
  keywords: ['pharmacovigilance translation', 'ICSR translation', 'PSUR translation', 'DSUR translation', 'SAE report translation', 'drug safety translation'],
  openGraph: {
    title: 'Pharmacovigilance Translation Services',
    description: 'Rapid pharmacovigilance translation for adverse event reporting and aggregate safety reports.',
    url: 'https://cethos.com/services/lifesciences/pharmacovigilance',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/pharmacovigilance',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Pharmacovigilance Translation Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "Specialized translation services for pharmacovigilance documentation including adverse event reports and aggregate safety reports.",
  "areaServed": "Worldwide",
  "serviceType": "Pharmacovigilance Translation"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Pharmacovigilance", "item": "https://cethos.com/services/lifesciences/pharmacovigilance" }
  ]
}

const faqs = [
  { question: 'What is your turnaround time for ICSR translation?', answer: 'We offer 4-hour turnaround for urgent ICSR translations to help you meet regulatory reporting timelines. Our 24/7 availability ensures we can support your PV needs around the clock, including weekends and holidays.' },
  { question: 'Do you have experience with MedDRA terminology?', answer: 'Yes, our pharmacovigilance translators are trained in MedDRA coding and maintain current terminology databases. We ensure consistent use of preferred terms across all translations to facilitate accurate safety reporting.' },
  { question: 'Can you handle high-volume ICSR translation?', answer: 'Yes, we have dedicated PV translation teams that can scale to handle high-volume adverse event reporting. We use translation memory and terminology management to ensure consistency and efficiency across large volumes.' },
  { question: 'Do you provide translation for spontaneous and solicited reports?', answer: 'Yes, we translate all types of adverse event reports including spontaneous reports from patients and healthcare providers, solicited reports from clinical trials, and reports from post-marketing surveillance activities.' },
]

export default function PharmacovigilancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      <FAQJsonLd faqs={faqs} />
      <PharmacovigilanceContent />
    </>
  )
}
