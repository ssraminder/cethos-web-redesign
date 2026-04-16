import { Metadata } from 'next'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import ManufacturingPageContent from './ManufacturingPageContent'

export const metadata: Metadata = {
  title: 'Manufacturing Translation Services | Technical & Industrial',
  description: 'Expert manufacturing translation for technical manuals, safety docs, quality systems & machinery documentation. ISO compliant. 50+ languages. Industry specialists.',
  keywords: ['manufacturing translation', 'technical manual translation', 'industrial translation', 'machinery documentation', 'ISO translation', 'quality documentation translation'],
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
    answer: 'We translate technical manuals, user guides, safety documentation, MSDS sheets, ISO quality documents, training materials, engineering specifications, equipment documentation, and patents.',
  },
  {
    question: 'Do you work with CAD and technical drawings?',
    answer: 'Yes, we can extract and translate text from CAD files, technical drawings, and engineering diagrams. We work with common formats including AutoCAD, SolidWorks, and other CAD software.',
  },
  {
    question: 'Are your translations ISO compliant?',
    answer: 'Yes, our translations support ISO 9001, ISO 14001, and other quality management standards. We follow ISO 17100 translation quality standards and maintain full traceability.',
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
