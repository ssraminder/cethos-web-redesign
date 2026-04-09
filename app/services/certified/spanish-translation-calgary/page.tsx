import { Metadata } from 'next'
import SpanishTranslationContent from './SpanishTranslationContent'

export const metadata: Metadata = {
  title: 'Spanish Translation Calgary | Certified | IRCC Accepted | Cethos',
  description: 'Certified Spanish translation for IRCC. Latin American and Spanish documents, birth certificates, academic transcripts. Same-day service Calgary. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/spanish-translation-calgary',
  },
  openGraph: {
    title: 'Spanish Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified Spanish translation for IRCC. Native Spanish translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/spanish-translation-calgary',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function SpanishTranslationCalgaryPage() {
  return <SpanishTranslationContent />
}
