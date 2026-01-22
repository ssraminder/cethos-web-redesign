import { Metadata } from 'next'
import InterpretationPageContent from './InterpretationPageContent'

export const metadata: Metadata = {
  title: 'Interpretation Services | Simultaneous, Consecutive, Remote',
  description: 'Professional interpretation services including simultaneous, consecutive, over-the-phone (OPI), video remote (VRI), and escort interpretation in 200+ languages. 24/7 availability.',
  keywords: ['interpretation services', 'simultaneous interpretation', 'consecutive interpretation', 'OPI', 'VRI', 'medical interpretation', 'legal interpretation', 'conference interpretation'],
  alternates: {
    canonical: 'https://cethos.com/services/interpretation',
  },
  openGraph: {
    title: 'Interpretation Services | Cethos Solutions Inc.',
    description: 'Professional interpretation services in 200+ languages. Simultaneous, consecutive, remote, and specialized interpretation.',
    url: 'https://cethos.com/services/interpretation',
  },
}

export default function InterpretationPage() {
  return <InterpretationPageContent />
}
