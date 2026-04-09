import { Metadata } from 'next'
import FrenchTranslationContent from './FrenchTranslationContent'

export const metadata: Metadata = {
  title: 'French Translation Calgary | Certified | IRCC Accepted | Cethos',
  description: 'Certified French translation for IRCC. Quebec, France, and African French documents. Birth certificates, academic transcripts. Same-day service Calgary. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/french-translation-calgary',
  },
  openGraph: {
    title: 'French Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified French translation for IRCC. Native French translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/french-translation-calgary',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function FrenchTranslationCalgaryPage() {
  return <FrenchTranslationContent />
}
