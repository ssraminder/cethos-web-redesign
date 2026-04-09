import { Metadata } from 'next'
import MandarinTranslationContent from './MandarinTranslationContent'

export const metadata: Metadata = {
  title: 'Mandarin (Simplified Chinese) Translation Calgary | IRCC Accepted | Cethos',
  description: 'Certified Mandarin (Simplified Chinese) translation for IRCC. Chinese birth certificates, academic transcripts, hukou. Cantonese (Traditional Chinese) also available. Same-day service Calgary. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/mandarin-translation-calgary',
  },
  openGraph: {
    title: 'Mandarin (Simplified Chinese) Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified Mandarin (Simplified Chinese) translation for IRCC. Cantonese (Traditional Chinese) also available. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/mandarin-translation-calgary',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function MandarinTranslationCalgaryPage() {
  return <MandarinTranslationContent />
}
