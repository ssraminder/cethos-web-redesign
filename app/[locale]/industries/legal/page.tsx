import { Metadata } from 'next'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import LegalIndustryPageContent from './LegalIndustryPageContent'

export const metadata: Metadata = {
  title: 'Legal Translation Services | Certified Court-Ready Translations',
  description: 'Certified legal translation for contracts, court documents, patents, depositions & litigation. ATA-certified translators. Notarization available. Confidential & secure.',
  keywords: ['legal translation', 'certified legal translation', 'court document translation', 'contract translation', 'patent translation', 'litigation translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/legal',
  },
  openGraph: {
    title: 'Legal Translation Services | Cethos',
    description: 'Certified legal translation for contracts, court documents, patents, and litigation materials.',
    url: 'https://cethos.com/industries/legal',
  },
}

const faqs = [
  {
    question: 'Are your legal translations court-certified?',
    answer: 'Yes, all our legal translations come with a certificate of accuracy and can be notarized upon request. Our translations are accepted by courts, government agencies, and legal institutions worldwide.',
  },
  {
    question: 'What legal documents do you translate?',
    answer: 'We translate contracts, court documents, depositions, patents, trademarks, corporate documents, litigation materials, immigration documents, wills, trusts, and all other legal documentation.',
  },
  {
    question: 'How do you ensure confidentiality?',
    answer: 'All our translators sign NDAs. We use encrypted file transfer, secure project management systems, and comply with attorney-client privilege requirements. We are GDPR compliant.',
  },
  {
    question: 'Do you provide translations for international arbitration?',
    answer: 'Yes, we have extensive experience with international arbitration cases, providing certified translations for ICC, LCIA, AAA, and other arbitration proceedings.',
  },
  {
    question: 'Can you handle urgent legal translation requests?',
    answer: 'Yes, we offer rush services for urgent legal matters with 24-hour turnaround available. We understand that legal deadlines are non-negotiable.',
  },
]

export default function LegalPage() {
  return (
    <>
      <ServiceJsonLd
        name="Legal Translation Services"
        description="Certified legal translation for contracts, court documents, patents, and litigation materials."
        url="https://cethos.com/industries/legal"
      />
      <FAQJsonLd faqs={faqs} />
      <LegalIndustryPageContent />
    </>
  )
}
