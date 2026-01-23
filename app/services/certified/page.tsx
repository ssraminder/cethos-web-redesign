import { Metadata } from 'next'
import CertifiedTranslationContent from './CertifiedTranslationContent'

export const metadata: Metadata = {
  title: 'Certified Translation Services Calgary | IRCC Accepted | Cethos',
  description: 'IRCC-certified translation services in Calgary. Birth certificates, marriage documents, academic transcripts, immigration documents. Same-day service. 100% acceptance guarantee.',
  alternates: {
    canonical: 'https://cethos.com/services/certified',
  },
  openGraph: {
    title: 'Certified Translation Services Calgary | Cethos',
    description: 'IRCC-certified translation for immigration, legal, and academic documents. Same-day service available.',
    url: 'https://cethos.com/services/certified',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function CertifiedTranslationPage() {
  return <CertifiedTranslationContent />
}
