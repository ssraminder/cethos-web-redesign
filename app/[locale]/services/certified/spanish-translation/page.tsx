import { Metadata } from 'next'
import SpanishTranslationContent from './SpanishTranslationContent'

export const metadata: Metadata = {
  title: 'Spanish Translation Services Canada | IRCC Certified',
  description: 'Certified Spanish translation for IRCC across Canada. Latin American and Spanish documents, birth certificates, academic transcripts. Same-day service available. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/spanish-translation',
  },
  openGraph: {
    title: 'Spanish Translation Services Canada | IRCC Certified',
    description: 'Certified Spanish translation for IRCC. Native Spanish translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/spanish-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function SpanishTranslationPage() {
  return <SpanishTranslationContent />
}
