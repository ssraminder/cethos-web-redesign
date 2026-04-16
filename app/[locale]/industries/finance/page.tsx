import { Metadata } from 'next'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import FinancePageContent from './FinancePageContent'

export const metadata: Metadata = {
  title: 'Financial Translation Services | Banking & Investment',
  description: 'Expert financial translation for banking, investment, insurance & fintech. SEC/FCA compliant. Annual reports, prospectuses, fund documents. Confidential & accurate.',
  keywords: ['financial translation', 'banking translation', 'investment translation', 'SEC translation', 'annual report translation', 'fund document translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/finance',
  },
  openGraph: {
    title: 'Financial Translation Services',
    description: 'Expert financial translation for banking, investment, insurance, and fintech.',
    url: 'https://cethos.com/industries/finance',
  },
}

const faqs = [
  {
    question: 'Do you translate SEC filings and regulatory documents?',
    answer: 'Yes, we translate all SEC filings including 10-K, 10-Q, 8-K, prospectuses, and proxy statements. Our translators understand SEC disclosure requirements and financial reporting standards.',
  },
  {
    question: 'What financial documents do you specialize in?',
    answer: 'We translate annual reports, quarterly reports, fund prospectuses, KIIDs, investment research, M&A documents, loan agreements, insurance policies, and fintech applications.',
  },
  {
    question: 'How do you handle confidential financial information?',
    answer: 'We maintain strict confidentiality protocols including NDAs, encrypted communications, secure file handling, and compliance with financial industry regulations. All translators are vetted for financial work.',
  },
  {
    question: 'Can you meet tight earnings release deadlines?',
    answer: 'Yes, we offer rush services for time-sensitive financial communications. We can scale teams to handle large volume annual reports and meet your publication deadlines.',
  },
  {
    question: 'Do you have experience with cryptocurrency and fintech?',
    answer: 'Yes, we have translated content for leading fintech and cryptocurrency companies, including whitepapers, app interfaces, regulatory documents, and marketing materials.',
  },
]

export default function FinancePage() {
  return (
    <>
      <ServiceJsonLd
        name="Financial Translation Services"
        description="Expert financial translation for banking, investment, insurance, and fintech."
        url="https://cethos.com/industries/finance"
      />
      <FAQJsonLd faqs={faqs} />
      <FinancePageContent />
    </>
  )
}
