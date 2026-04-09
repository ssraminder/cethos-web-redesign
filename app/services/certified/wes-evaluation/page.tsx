import { Metadata } from 'next'
import WesEvaluationContent from './WesEvaluationContent'

export const metadata: Metadata = {
  title: 'WES Certified Translation Canada | ECA for Express Entry | Cethos',
  description: 'Certified translation for WES credential evaluation. Academic transcripts, diplomas, and degree certificates translated for ECA. From $65. IRCC accepted. Same-day available.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/wes-evaluation',
  },
  openGraph: {
    title: 'WES Certified Translation Canada | ECA for Express Entry | Cethos',
    description: 'Certified translation for WES credential evaluation. Academic transcripts and diplomas. From $65. IRCC accepted.',
    url: 'https://cethos.com/services/certified/wes-evaluation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function WesEvaluationPage() {
  return <WesEvaluationContent />
}
