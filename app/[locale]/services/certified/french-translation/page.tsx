import { Metadata } from 'next'
import FrenchTranslationContent from './FrenchTranslationContent'

export const metadata: Metadata = {
  title: 'French Translation Services Canada | IRCC Certified',
  description: 'Certified French translation for IRCC across Canada. Quebec, France, and African French documents. Birth certificates, academic transcripts. Same-day service available. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/french-translation',
  },
  openGraph: {
    title: 'French Translation Services Canada | IRCC Certified',
    description: 'Certified French translation for IRCC. Native French translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/french-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function FrenchTranslationPage() {
  return <FrenchTranslationContent />
}
