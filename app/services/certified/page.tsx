import { Metadata } from 'next'
import CertifiedTranslationContent from './CertifiedTranslationContent'

export const metadata: Metadata = {
  title: 'Translation Services Calgary | IRCC Certified | Cethos Solutions',
  description: 'Professional translation services in Calgary. IRCC certified for immigration, legal, and academic documents. Birth certificates, marriage documents, academic transcripts. Same-day service. 100% acceptance guarantee.',
  alternates: {
    canonical: 'https://cethos.com/services/certified',
  },
  openGraph: {
    title: 'Translation Services Calgary | IRCC Certified | Cethos Solutions',
    description: 'Professional translation services in Calgary. IRCC certified for immigration, legal, and academic documents. Same-day service available.',
    url: 'https://cethos.com/services/certified',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function CertifiedTranslationPage() {
  return <CertifiedTranslationContent />
}
