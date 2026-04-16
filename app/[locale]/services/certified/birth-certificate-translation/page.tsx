import { Metadata } from 'next'
import BirthCertificateContent from './BirthCertificateContent'

export const metadata: Metadata = {
  title: 'Birth Certificate Translation Calgary | IRCC Certified | From $65',
  description: 'IRCC-certified birth certificate translation in Calgary. Accepted for Express Entry, family sponsorship, citizenship. Notarization included. From $65. Same-day available.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/birth-certificate-translation',
  },
  openGraph: {
    title: 'Birth Certificate Translation Calgary | IRCC Certified | From $65',
    description: 'IRCC-certified birth certificate translation in Calgary. Accepted for Express Entry, family sponsorship, citizenship. Notarization included. From $65. Same-day available.',
    url: 'https://cethos.com/services/certified/birth-certificate-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function BirthCertificateTranslationPage() {
  return <BirthCertificateContent />
}
