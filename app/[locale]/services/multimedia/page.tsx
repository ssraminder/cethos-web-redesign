import { Metadata } from 'next'
import { FAQJsonLd } from '@/components/JsonLd'
import MultimediaPageContent from './MultimediaPageContent'

export const metadata: Metadata = {
  title: 'Multimedia Translation Services | Cethos Solutions Inc.',
  description:
    'Video subtitling, voiceover, dubbing, and multimedia adaptation services for global content reach. Professional multimedia localization in 200+ languages.',
  alternates: {
    canonical: 'https://cethos.com/services/multimedia',
  },
  openGraph: {
    title: 'Multimedia Translation Services | Cethos Solutions Inc.',
    description:
      'Video subtitling, voiceover, dubbing, and multimedia adaptation services for global content reach. Professional multimedia localization in 200+ languages.',
    url: 'https://cethos.com/services/multimedia',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

const faqs = [
  { question: 'What subtitle and caption formats do you deliver?', answer: 'We deliver SRT, VTT, TTML, DFXP, and EBU-STL, plus burned-in (open) captions on request.' },
  { question: 'Do you offer voiceover and dubbing?', answer: 'Yes. We provide voiceover, UN-style, and full lip-sync dubbing using professional native-speaking voice talent across 200+ languages.' },
  { question: 'Can you localize eLearning content?', answer: 'Yes. We localize SCORM 1.2 and SCORM 2004 courses, including on-screen text, narration, quizzes, and embedded media.' },
  { question: 'How do you ensure subtitle timing and readability?', answer: 'We follow reading-speed and line-length standards (such as characters-per-second limits) so subtitles are comfortable to read and synced to the audio.' },
  { question: 'Do you handle on-screen text and graphics?', answer: 'Yes. We localize on-screen titles, lower-thirds, and graphics, and can re-render them or supply text for your editors.' },
  { question: 'What source files do you need?', answer: 'Ideally the source video plus any existing scripts or caption files. We can also work from the final video alone and transcribe from scratch.' },
]

export default function MultimediaTranslationPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <MultimediaPageContent />
    </>
  )
}
