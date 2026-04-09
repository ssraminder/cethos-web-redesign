import { Metadata } from 'next'
import MandarinTranslationContent from './MandarinTranslationContent'

export const metadata: Metadata = {
  title: 'Mandarin Chinese Translation Calgary | Certified | IRCC Accepted | Cethos',
  description: 'Certified Mandarin Chinese translation for IRCC. Simplified and Traditional Chinese documents, birth certificates, academic transcripts. Same-day service Calgary. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/mandarin-translation-calgary',
  },
  openGraph: {
    title: 'Mandarin Chinese Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified Mandarin Chinese translation for IRCC. Native Chinese translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/mandarin-translation-calgary',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function MandarinTranslationCalgaryPage() {
  return <MandarinTranslationContent />
}
