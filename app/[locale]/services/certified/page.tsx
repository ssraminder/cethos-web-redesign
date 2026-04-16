import { Metadata } from 'next'
import CertifiedTranslationContent from './CertifiedTranslationContent'

export const metadata: Metadata = {
  title: 'Certified Translation Services Calgary | IRCC Accepted | From $65',
  description: "Calgary's top-rated certified translation service. 100% IRCC accepted, notarization included, same-day available. Birth certificates, immigration documents, 95+ languages. From $65.",
  alternates: {
    canonical: 'https://cethos.com/services/certified',
  },
  openGraph: {
    title: 'Certified Translation Services Calgary | IRCC Accepted | From $65',
    description: "Calgary's top-rated certified translation service. 100% IRCC accepted, notarization included, same-day available. Birth certificates, immigration documents, 95+ languages. From $65.",
    url: 'https://cethos.com/services/certified',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function CertifiedTranslationPage() {
  return <CertifiedTranslationContent />
}
