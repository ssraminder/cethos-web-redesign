import { Metadata } from 'next'
import CanadianPageContent from './CanadianPageContent'

export const metadata: Metadata = {
  title: 'Canadian Translation Services | Quebec French, Bill 96, Health Canada',
  description: 'Specialized Canadian translation services including Quebec French (OQLF compliance), Bill 96 compliance, Health Canada submissions, government translation, and Indigenous language services.',
  keywords: ['Canadian French translation', 'Quebec translation', 'Bill 96 compliance', 'Health Canada translation', 'OQLF compliance', 'Indigenous language translation', 'CAN/CGSB translation'],
  alternates: {
    canonical: 'https://cethos.com/services/canadian',
  },
  openGraph: {
    title: 'Canadian Translation Services | Cethos Solutions Inc.',
    description: 'Quebec French, Bill 96 compliance, Health Canada submissions, and Indigenous language services.',
    url: 'https://cethos.com/services/canadian',
  },
}

export default function CanadianPage() {
  return <CanadianPageContent />
}
