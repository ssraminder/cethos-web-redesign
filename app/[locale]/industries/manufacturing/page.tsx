import { Metadata } from 'next'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import ManufacturingPageContent from './ManufacturingPageContent'

export const metadata: Metadata = {
  title: 'Manufacturing Translation Services | Technical & Industrial',
  description: 'Expert manufacturing translation for technical manuals, safety docs, quality systems & machinery documentation. Rigorous multi-step quality process. 50+ languages. Industry specialists.',
  keywords: ['manufacturing translation', 'technical manual translation', 'industrial translation', 'machinery documentation', 'quality documentation translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/manufacturing',
  },
  openGraph: {
    title: 'Manufacturing Translation Services',
    description: 'Expert manufacturing translation for technical manuals, safety documentation, and quality systems.',
    url: 'https://cethos.com/industries/manufacturing',
  },
}

const faqs = [
  {
    question: 'What manufacturing documents do you translate?',
    answer: 'We translate technical manuals, user guides, safety documentation, MSDS sheets, quality management documents, training materials, engineering specifications, equipment documentation, and patents.',
  },
  {
    question: 'Do you work with CAD and technical drawings?',
    answer: 'Yes, we can extract and translate text from CAD files, technical drawings, and engineering diagrams. We work with common formats including AutoCAD, SolidWorks, and other CAD software.',
  },
  {
    question: 'How do you ensure translation quality?',
    answer: 'Every project follows a rigorous multi-step process — translation, editing, and proofreading by separate qualified linguists — supporting your quality management and traceability requirements with full documentation and audit trails.',
  },
  {
    question: 'Can you handle safety-critical content?',
    answer: 'Yes, we have extensive experience with safety documentation, warning labels, MSDS sheets, and compliance content. Our translators understand the critical nature of safety communications.',
  },
  {
    question: 'Do you support machine translation for technical content?',
    answer: 'We offer MT post-editing for appropriate content types, combined with human review to ensure technical accuracy. We can advise on the best approach for your content and quality requirements.',
  },
]

export default function ManufacturingPage() {
  return (
    <>
      <ServiceJsonLd
        name="Manufacturing Translation Services"
        description="Expert manufacturing translation for technical manuals, safety documentation, and quality systems."
        url="https://cethos.com/industries/manufacturing"
      />
      <FAQJsonLd faqs={faqs} />
      <ManufacturingPageContent />
    </>
  )
}
