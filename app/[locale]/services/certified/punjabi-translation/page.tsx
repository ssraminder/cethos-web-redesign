import { Metadata } from 'next'
import PunjabiTranslationContent from './PunjabiTranslationContent'

export const metadata: Metadata = {
  title: 'Punjabi Translation Services Canada | Gurmukhi Certified | IRCC Accepted',
  description: 'Certified Punjabi translation for IRCC across Canada. Gurmukhi script, Punjab documents, birth certificates, marriage certificates. Same-day service available. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/punjabi-translation',
  },
  openGraph: {
    title: 'Punjabi Translation Services Canada | IRCC Certified',
    description: 'Certified Punjabi and Gurmukhi translation for IRCC. Native Punjabi translators. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/punjabi-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function PunjabiTranslationPage() {
  return <PunjabiTranslationContent />
}
