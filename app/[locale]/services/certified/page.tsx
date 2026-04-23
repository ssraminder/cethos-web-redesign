import { Metadata } from 'next'
import CertifiedTranslationContent from './CertifiedTranslationContent'

export const metadata: Metadata = {
  // Title kept under ~60 chars so it isn't truncated in SERPs (prior 95-char title was
  // getting cut, contributing to the 0.34% organic CTR at position 1.2 for Calgary queries).
  title: 'Certified Translation Calgary | IRCC-Accepted from $65',
  description:
    'IRCC-accepted certified translation in Calgary — birth certificates, diplomas, marriage and immigration documents. From $65, same-day available, 100% acceptance guaranteed.',
  alternates: {
    canonical: 'https://cethos.com/services/certified',
  },
  openGraph: {
    title: 'Certified Translation Calgary | IRCC-Accepted from $65',
    description:
      'IRCC-accepted certified translation in Calgary — birth certificates, diplomas, marriage and immigration documents. From $65, same-day available, 100% acceptance guaranteed.',
    url: 'https://cethos.com/services/certified',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function CertifiedTranslationPage() {
  return <CertifiedTranslationContent />
}
