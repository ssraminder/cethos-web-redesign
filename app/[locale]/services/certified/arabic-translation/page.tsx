import { Metadata } from 'next'
import ArabicTranslationContent from './ArabicTranslationContent'

export const metadata: Metadata = {
  title: 'Arabic Translation Services Canada | IRCC Certified',
  description: 'Certified Arabic translation for IRCC across Canada. Arabic script expertise, birth certificates, marriage contracts, academic transcripts. Same-day service available. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/arabic-translation',
  },
  openGraph: {
    title: 'Arabic Translation Services Canada | IRCC Certified',
    description: 'Certified Arabic translation for IRCC. Native Arabic translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/arabic-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ArabicTranslationPage() {
  return <ArabicTranslationContent />
}
