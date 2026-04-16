import { Metadata } from 'next'
import WesEvaluationContent from './WesEvaluationContent'

export const metadata: Metadata = {
  title: 'WES Certified Translation Services | Express Entry & PNP',
  description: 'IRCC-certified translations for WES credential evaluations. Accepted for Express Entry, Provincial Nominee Programs, and academic admissions across Canada. From $65. Same-day available.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/wes-evaluation',
  },
  openGraph: {
    title: 'WES Certified Translation Services | Express Entry & PNP',
    description: 'IRCC-certified translations for WES credential evaluations. Accepted for Express Entry, Provincial Nominee Programs, and academic admissions across Canada. From $65.',
    url: 'https://cethos.com/services/certified/wes-evaluation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function WesEvaluationPage() {
  return <WesEvaluationContent />
}
