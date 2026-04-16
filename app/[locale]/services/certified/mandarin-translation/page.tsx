import { Metadata } from 'next'
import MandarinTranslationContent from './MandarinTranslationContent'

export const metadata: Metadata = {
  title: 'Mandarin Chinese Translation Canada | IRCC Certified',
  description: 'Certified Mandarin (Simplified Chinese) translation for IRCC across Canada. Chinese birth certificates, academic transcripts, hukou. Cantonese (Traditional Chinese) also available. Same-day service available. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/mandarin-translation',
  },
  openGraph: {
    title: 'Mandarin Chinese Translation Canada | IRCC Certified',
    description: 'Certified Mandarin (Simplified Chinese) translation for IRCC. Cantonese (Traditional Chinese) also available. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/mandarin-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function MandarinTranslationPage() {
  return <MandarinTranslationContent />
}
