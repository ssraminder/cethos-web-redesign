import { Metadata } from 'next'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import TechnologyPageContent from './TechnologyPageContent'

export const metadata: Metadata = {
  title: 'Technology Translation & Software Localization Services',
  description: 'Expert technology translation for software, apps, documentation, APIs & technical content. Continuous localization. 100+ languages. Agile-friendly workflows.',
  keywords: ['technology translation', 'software localization', 'technical translation', 'IT translation', 'app localization', 'API documentation translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/technology',
  },
  openGraph: {
    title: 'Technology Translation & Software Localization',
    description: 'Expert technology translation and software localization for apps, documentation, and technical content.',
    url: 'https://cethos.com/industries/technology',
  },
}

const faqs = [
  {
    question: 'Do you integrate with development workflows?',
    answer: 'Yes, we integrate with GitHub, GitLab, Bitbucket, and popular CI/CD pipelines. We support continuous localization workflows with automated string extraction and delivery.',
  },
  {
    question: 'What file formats do you support?',
    answer: 'We support all common formats including JSON, YAML, XML, PO/POT, XLIFF, iOS strings, Android XML, React i18n, and proprietary formats. Our engineers can work with your existing localization infrastructure.',
  },
  {
    question: 'Can you handle UI/UX localization?',
    answer: 'Yes, our linguists are trained in UI/UX best practices. We consider text expansion, character limits, and cultural UI conventions to ensure your localized app provides an excellent user experience.',
  },
  {
    question: 'What is your approach to technical terminology?',
    answer: 'We maintain technology-specific glossaries and use translation memory to ensure consistency. Our linguists have backgrounds in software development, IT, and technical writing.',
  },
  {
    question: 'Do you offer localization testing?',
    answer: 'Yes, we provide linguistic testing (LQA) to verify translations in context, check for truncation issues, and ensure cultural appropriateness of the localized product.',
  },
]

export default function TechnologyPage() {
  return (
    <>
      <ServiceJsonLd
        name="Technology Translation & Software Localization Services"
        description="Expert technology translation and software localization for apps, documentation, and technical content."
        url="https://cethos.com/industries/technology"
      />
      <FAQJsonLd faqs={faqs} />
      <TechnologyPageContent />
    </>
  )
}
