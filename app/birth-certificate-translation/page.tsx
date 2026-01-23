import { Metadata } from 'next'
import BirthCertificatePageContent from './BirthCertificatePageContent'

export const metadata: Metadata = {
  title: 'Birth Certificate Translation Calgary | IRCC Certified | Same-Day | Cethos',
  description: 'Certified birth certificate translation for IRCC. PR, citizenship, spousal sponsorship. Same-day service Calgary. 95+ languages. 100% acceptance guarantee. Call (587) 600-0786.',
  keywords: ['birth certificate translation', 'certified birth certificate translation', 'IRCC birth certificate', 'Calgary birth certificate translation', 'same-day birth certificate translation'],
  alternates: {
    canonical: 'https://cethos.com/birth-certificate-translation',
  },
  openGraph: {
    title: 'Birth Certificate Translation Calgary | IRCC Certified | Same-Day | Cethos',
    description: 'Certified birth certificate translation for IRCC. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/birth-certificate-translation',
  },
}

export default function BirthCertificateTranslationPage() {
  return <BirthCertificatePageContent />
}
