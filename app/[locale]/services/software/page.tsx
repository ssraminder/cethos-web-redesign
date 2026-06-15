import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import SoftwarePageContent from './SoftwarePageContent'

export const metadata: Metadata = {
  title: 'Software Localization Services | Cethos Solutions Inc.',
  description:
    'Expert software localization services. Adapt your apps, websites, and digital products for global markets. UI/UX localization, documentation, and QA testing.',
  alternates: {
    canonical: 'https://cethos.com/services/software',
  },
  openGraph: {
    title: 'Software Localization Services | Cethos Solutions Inc.',
    description:
      'Expert software localization services. Adapt your apps, websites, and digital products for global markets. UI/UX localization, documentation, and QA testing.',
    url: 'https://cethos.com/services/software',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

const faqs = [
  { question: 'What file formats do you support?', answer: 'We work with 40+ formats including JSON, XLIFF, PO/POT, RESX, .strings, ARB, YAML, and Markdown — extracting only translatable strings while preserving code and placeholders.' },
  { question: 'Can you integrate with our CI/CD pipeline?', answer: 'Yes. We integrate with platforms like Crowdin, Lokalise, Phrase, GitHub, and GitLab so localization runs automatically as part of your release workflow.' },
  { question: 'How do you handle context for UI strings?', answer: 'We use screenshots, in-context previews, and developer notes so translators can see where each string appears, avoiding layout breaks and mistranslations.' },
  { question: 'What is continuous localization?', answer: 'As new or changed strings are committed, they are automatically queued for translation and returned quickly, keeping every locale in sync with your main branch.' },
  { question: 'Do you test the localized build?', answer: 'Yes. Our QA and linguistic testing checks for truncation, character encoding, broken placeholders, pluralization, and right-to-left rendering before release.' },
  { question: 'How fast is turnaround?', answer: 'Turnaround depends on volume, but continuous localization typically returns new strings within 24-72 hours; rush options are available.' },
]

export default function SoftwareLocalizationPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <SoftwarePageContent />
    </>
  )
}
