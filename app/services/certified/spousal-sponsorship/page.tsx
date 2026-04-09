import { Metadata } from 'next'
import SpousalSponsorshipContent from './SpousalSponsorshipContent'

export const metadata: Metadata = {
  title: 'Spousal Sponsorship Translation Canada | IRCC Certified | Cethos',
  description: 'Certified translation for spousal sponsorship applications. Marriage certificates, relationship evidence, police clearances, and identity documents. From $65. 100% IRCC accepted.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/spousal-sponsorship',
  },
  openGraph: {
    title: 'Spousal Sponsorship Translation Canada | IRCC Certified | Cethos',
    description: 'Certified translation for spousal sponsorship. Marriage certificates, identity documents, police clearances. From $65.',
    url: 'https://cethos.com/services/certified/spousal-sponsorship',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function SpousalSponsorshipPage() {
  return <SpousalSponsorshipContent />
}
