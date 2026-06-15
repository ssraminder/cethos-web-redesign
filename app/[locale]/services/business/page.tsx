import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import BusinessPageContent from './BusinessPageContent'

export const metadata: Metadata = {
  title: 'Business Translation Services | Cethos Solutions Inc.',
  description:
    'Professional business translation services in 200+ languages. Annual reports, marketing materials, corporate communications, and more. Rigorous multi-step quality process.',
  alternates: {
    canonical: 'https://cethos.com/services/business',
  },
  openGraph: {
    title: 'Business Translation Services | Cethos Solutions Inc.',
    description:
      'Professional business translation services in 200+ languages. Annual reports, marketing materials, corporate communications, and more. Rigorous multi-step quality process.',
    url: 'https://cethos.com/services/business',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

const faqs = [
  { question: 'What types of business documents do you translate?', answer: 'Annual reports, financial statements, marketing materials, corporate communications, training content, websites, and internal documents, among others.' },
  { question: 'How do you keep terminology consistent?', answer: 'We build and maintain client-specific glossaries and translation memories so terminology and brand voice stay consistent across every project.' },
  { question: 'Is my confidential information secure?', answer: 'Yes. We use encrypted file transfer, sign NDAs, and follow PIPEDA- and GDPR-aligned data-handling practices.' },
  { question: 'Can you match our brand voice across languages?', answer: 'Yes. We adapt tone and style for each market while preserving your brand voice, and can work with your in-country reviewers.' },
  { question: 'What is your quality process?', answer: 'Every project follows a multi-step TEP workflow — translation, editing, and proofreading by separate qualified linguists.' },
  { question: 'What are your turnaround times?', answer: 'Standard throughput is roughly 2,000-3,000 words per day per linguist; we scale teams and offer rush service for tight deadlines.' },
]

export default function BusinessTranslationPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <BusinessPageContent />
    </>
  )
}
