import { Metadata } from 'next'
import HindiTranslationContent from './HindiTranslationContent'

export const metadata: Metadata = {
  title: 'Hindi Translation Services Canada | Devanagari Certified | IRCC Accepted',
  description: 'Certified Hindi translation for IRCC across Canada. Devanagari script, India documents, birth certificates, academic transcripts. Same-day service available. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/hindi-translation',
  },
  openGraph: {
    title: 'Hindi Translation Services Canada | IRCC Certified',
    description: 'Certified Hindi and Devanagari translation for IRCC. Native Hindi translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/hindi-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function HindiTranslationPage() {
  return <HindiTranslationContent />
}
