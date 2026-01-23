import { Metadata } from 'next'
import HindiTranslationContent from './HindiTranslationContent'

export const metadata: Metadata = {
  title: 'Hindi Translation Calgary | Devanagari Certified | IRCC Accepted | Cethos',
  description: 'Certified Hindi translation for IRCC. Devanagari script, India documents, birth certificates, academic transcripts. Same-day service Calgary. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/hindi-translation-calgary',
  },
  openGraph: {
    title: 'Hindi Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified Hindi and Devanagari translation for IRCC. Native Hindi translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/hindi-translation-calgary',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function HindiTranslationCalgaryPage() {
  return <HindiTranslationContent />
}
