import { Metadata } from 'next'
import CertifiedTranslationContent from './CertifiedTranslationContent'

export const metadata: Metadata = {
  // Title kept under ~60 chars so it isn't truncated in SERPs (prior 95-char title was
  // getting cut, contributing to the 0.34% organic CTR at position 1.2 for Calgary queries).
  title: 'Certified Translator Calgary | IRCC-Accepted from $55',
  description:
    'Need a certified translator in Calgary? IRCC-accepted translations for immigration, diplomas & birth certificates. From $55, same-day available, 100% acceptance guaranteed.',
  alternates: {
    canonical: 'https://cethos.com/services/certified',
  },
  openGraph: {
    title: 'Certified Translator Calgary | IRCC-Accepted from $55',
    description:
      'IRCC-accepted certified translator in Calgary — birth certificates, diplomas, marriage and immigration documents. From $55, same-day available, 100% acceptance guaranteed.',
    url: 'https://cethos.com/services/certified',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function CertifiedTranslationPage() {
  return <CertifiedTranslationContent />
}
