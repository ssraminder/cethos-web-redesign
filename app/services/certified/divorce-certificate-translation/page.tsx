import { Metadata } from 'next'
import DivorceCertificateContent from './DivorceCertificateContent'

export const metadata: Metadata = {
  title: 'Divorce Certificate Translation Calgary | IRCC Certified | Same-Day | Cethos',
  description: 'Certified divorce certificate translation for IRCC. Divorce decrees, separation agreements, annulments. Same-day service Calgary. 100% acceptance guarantee. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/divorce-certificate-translation',
  },
  openGraph: {
    title: 'Divorce Certificate Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified divorce decree and separation agreement translations for IRCC. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/divorce-certificate-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function DivorceCertificateTranslationPage() {
  return <DivorceCertificateContent />
}
