import { Metadata } from 'next'
import SpousalSponsorshipContent from './SpousalSponsorshipContent'

export const metadata: Metadata = {
  title: 'Spousal Sponsorship Translation Services | IRCC Certified',
  description: 'IRCC-certified translations for spousal and partner sponsorship applications. Marriage certificates, relationship evidence, police certificates, and identity documents. 100% acceptance guarantee. From $65.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/spousal-sponsorship',
  },
  openGraph: {
    title: 'Spousal Sponsorship Translation Services | IRCC Certified',
    description: 'IRCC-certified translations for spousal and partner sponsorship applications. Marriage certificates, relationship evidence, police certificates, and identity documents. From $65.',
    url: 'https://cethos.com/services/certified/spousal-sponsorship',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function SpousalSponsorshipPage() {
  return <SpousalSponsorshipContent />
}
