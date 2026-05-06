import { Metadata } from 'next'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import PharmaceuticalPageContent from './PharmaceuticalPageContent'

export const metadata: Metadata = {
  title: 'Pharmaceutical Translation Services | Clinical & Regulatory',
  description: 'FDA, EMA & PMDA compliant pharmaceutical translation. Clinical trials, IFUs, SPCs, PILs, regulatory submissions. ISO 17100 Compliant. 50+ pharma clients worldwide.',
  keywords: ['pharmaceutical translation', 'clinical trial translation', 'FDA translation', 'regulatory translation', 'medical translation', 'pharma localization'],
  alternates: {
    canonical: 'https://cethos.com/industries/pharmaceutical',
  },
  openGraph: {
    title: 'Pharmaceutical Translation Services',
    description: 'FDA, EMA & PMDA compliant pharmaceutical translation services for global clinical trials and regulatory submissions.',
    url: 'https://cethos.com/industries/pharmaceutical',
  },
}

const faqs = [
  {
    question: 'What pharmaceutical documents do you translate?',
    answer: 'We translate all pharmaceutical documentation including clinical trial protocols, informed consent forms, investigator brochures, regulatory submissions (CTD, NDA, MAA), product labeling (SPCs, PILs, IFUs), pharmacovigilance reports, CMC documentation, and marketing materials.',
  },
  {
    question: 'Are your translations FDA and EMA compliant?',
    answer: 'Yes, all our pharmaceutical translations comply with FDA, EMA, PMDA, NMPA, and other regulatory requirements. We follow ICH guidelines and are ISO 17100 and ISO 9001 compliant. Our linguists are trained in regulatory requirements specific to each market.',
  },
  {
    question: 'Do you have experience with clinical trial translations?',
    answer: 'Yes, we have supported over 500 clinical trials across 40+ therapeutic areas. Our services include translation of protocols, ICFs, CRFs, patient diaries, and all trial-related documentation. We offer back-translation and reconciliation services as required.',
  },
  {
    question: 'What is your turnaround time for regulatory submissions?',
    answer: 'Standard turnaround is 2,000-3,000 words per day. For urgent submissions, we offer rush services with 24-hour and 48-hour turnaround options. We can scale teams for large volume submissions to meet your regulatory deadlines.',
  },
  {
    question: 'How do you ensure terminology consistency across documents?',
    answer: 'We use translation memory (TM) technology and maintain client-specific terminology databases. Each project has a dedicated terminology manager who ensures consistency across all documents and languages throughout the product lifecycle.',
  },
]

const breadcrumbItems = [
  { name: 'Industries', url: '/industries' },
  { name: 'Pharmaceutical', url: '/industries/pharmaceutical' },
]

export default function PharmaceuticalPage() {
  return (
    <>
      <ServiceJsonLd
        name="Pharmaceutical Translation Services"
        description="FDA, EMA & PMDA compliant pharmaceutical translation for clinical trials and regulatory submissions."
        url="https://cethos.com/industries/pharmaceutical"
      />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <PharmaceuticalPageContent />
    </>
  )
}
