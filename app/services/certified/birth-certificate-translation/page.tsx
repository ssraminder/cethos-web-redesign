import { Metadata } from 'next'
import BirthCertificateContent from './BirthCertificateContent'

export const metadata: Metadata = {
  title: 'Birth Certificate Translation Calgary | IRCC Certified | Same-Day | Cethos',
  description: 'Certified birth certificate translation for IRCC. PR, citizenship, spousal sponsorship. Same-day service Calgary. 95+ languages. 100% acceptance guarantee. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/birth-certificate-translation',
  },
  openGraph: {
    title: 'Birth Certificate Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified birth certificate translation for IRCC. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/birth-certificate-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function BirthCertificateTranslationPage() {
  return <BirthCertificateContent />
}
