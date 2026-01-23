import { Metadata } from 'next'
import PunjabiTranslationContent from './PunjabiTranslationContent'

export const metadata: Metadata = {
  title: 'Punjabi Translation Calgary | Gurmukhi Certified | IRCC Accepted | Cethos',
  description: 'Certified Punjabi translation for IRCC. Gurmukhi script, Punjab documents, birth certificates, marriage certificates. Same-day service Calgary. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/punjabi-translation-calgary',
  },
  openGraph: {
    title: 'Punjabi Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified Punjabi and Gurmukhi translation for IRCC. Native Punjabi translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/punjabi-translation-calgary',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function PunjabiTranslationCalgaryPage() {
  return <PunjabiTranslationContent />
}
