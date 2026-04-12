import { Metadata } from 'next'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import GamingPageContent from './GamingPageContent'

export const metadata: Metadata = {
  title: 'Video Game Localization Services | Gaming Translation',
  description: 'Expert video game localization for AAA & indie games. In-game text, UI, voiceover, subtitles & marketing. 50+ languages. Culturalization & LQA included.',
  keywords: ['game localization', 'video game translation', 'game translation services', 'gaming localization', 'game culturalization', 'game LQA'],
  alternates: {
    canonical: 'https://cethos.com/industries/gaming',
  },
  openGraph: {
    title: 'Video Game Localization Services | Cethos',
    description: 'Expert video game localization for AAA and indie games with culturalization and LQA.',
    url: 'https://cethos.com/industries/gaming',
  },
}

const faqs = [
  {
    question: 'What game localization services do you offer?',
    answer: 'We offer full game localization including in-game text, UI strings, dialogue, subtitles, voiceover recording, marketing materials, store listings, and player support content.',
  },
  {
    question: 'Do you provide culturalization services?',
    answer: 'Yes, we go beyond translation to adapt content for cultural appropriateness. This includes adjusting humor, references, imagery, and gameplay elements for different markets.',
  },
  {
    question: 'What is your LQA process?',
    answer: 'Our Linguistic Quality Assurance (LQA) includes in-context review, functionality testing, and cultural verification. We test on actual devices to ensure translations work within your game.',
  },
  {
    question: 'Can you handle live games with frequent updates?',
    answer: 'Yes, we support live ops localization with rapid turnaround for events, updates, and patches. We integrate with your content management systems for continuous delivery.',
  },
  {
    question: 'Do you work with indie developers?',
    answer: 'Absolutely! We work with studios of all sizes, from indie developers to AAA publishers. Our flexible services scale to match your project needs and budget.',
  },
]

export default function GamingPage() {
  return (
    <>
      <ServiceJsonLd
        name="Video Game Localization Services"
        description="Expert video game localization for AAA and indie games with culturalization and LQA."
        url="https://cethos.com/industries/gaming"
      />
      <FAQJsonLd faqs={faqs} />
      <GamingPageContent />
    </>
  )
}
