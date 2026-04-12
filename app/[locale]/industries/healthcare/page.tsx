import { Metadata } from 'next'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import HealthcarePageContent from './HealthcarePageContent'

export const metadata: Metadata = {
  title: 'Healthcare Translation Services | Medical & Patient Materials',
  description: 'Expert healthcare translation for patient materials, medical records, telehealth & clinical content. HIPAA compliant. Culturally sensitive. 100+ languages.',
  keywords: ['healthcare translation', 'medical translation', 'patient material translation', 'HIPAA translation', 'telehealth localization', 'medical record translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/healthcare',
  },
  openGraph: {
    title: 'Healthcare Translation Services | Cethos',
    description: 'Expert healthcare translation for patient materials, medical records, and telehealth platforms.',
    url: 'https://cethos.com/industries/healthcare',
  },
}

const faqs = [
  {
    question: 'Are your healthcare translations HIPAA compliant?',
    answer: 'Yes, we maintain full HIPAA compliance for all healthcare translations. This includes secure handling of PHI, BAAs with clients, encrypted file transfer, and HIPAA-trained translators.',
  },
  {
    question: 'What healthcare documents do you translate?',
    answer: 'We translate patient education materials, consent forms, medical records, discharge instructions, insurance documents, telehealth content, public health materials, and healthcare app interfaces.',
  },
  {
    question: 'Do you offer culturally adapted health content?',
    answer: 'Yes, we go beyond translation to culturally adapt health content for different populations. This includes considering health beliefs, literacy levels, and cultural sensitivities around health topics.',
  },
  {
    question: 'Can you handle urgent medical translation requests?',
    answer: 'Yes, we offer 24/7 support for urgent healthcare translations. We understand that medical situations often require immediate communication across language barriers.',
  },
  {
    question: 'Do you provide medical interpreter services?',
    answer: 'While we specialize in written translation, we can connect you with qualified medical interpreters for in-person or telehealth appointments through our partner network.',
  },
]

export default function HealthcarePage() {
  return (
    <>
      <ServiceJsonLd
        name="Healthcare Translation Services"
        description="Expert healthcare translation for patient materials, medical records, and telehealth platforms."
        url="https://cethos.com/industries/healthcare"
      />
      <FAQJsonLd faqs={faqs} />
      <HealthcarePageContent />
    </>
  )
}
