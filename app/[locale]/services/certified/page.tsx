import { Metadata } from 'next'
import CertifiedTranslationContent from './CertifiedTranslationContent'

export const metadata: Metadata = {
  title: 'Certified Translation Services Across Canada | From $65 | IRCC Accepted | Cethos',
  description: 'IRCC-certified translation services across Canada. Immigration, legal, and academic documents. Birth certificates, marriage documents, academic transcripts. Same-day service. 100% acceptance guarantee.',
  alternates: {
    canonical: 'https://cethos.com/services/certified',
  },
  openGraph: {
    title: 'Certified Translation Services Across Canada | From $65 | IRCC Accepted | Cethos',
    description: 'IRCC-certified translation services across Canada. Immigration, legal, and academic documents. Same-day service available. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function CertifiedTranslationPage() {
  return <CertifiedTranslationContent />
}
