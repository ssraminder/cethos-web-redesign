import { Metadata } from 'next'
import ArabicTranslationContent from './ArabicTranslationContent'

export const metadata: Metadata = {
  title: 'Arabic Translation Calgary | Certified | IRCC Accepted | Cethos',
  description: 'Certified Arabic translation for IRCC. Arabic script expertise, birth certificates, marriage contracts, academic transcripts. Same-day service Calgary. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/arabic-translation-calgary',
  },
  openGraph: {
    title: 'Arabic Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified Arabic translation for IRCC. Native Arabic translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/arabic-translation-calgary',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ArabicTranslationCalgaryPage() {
  return <ArabicTranslationContent />
}
