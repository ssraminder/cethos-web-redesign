import { Metadata } from 'next'
import ResearchPageContent from './ResearchPageContent'

export const metadata: Metadata = {
  title: 'Language & Research Panel | Paid Healthcare Research | Cethos',
  description:
    'Join the Cethos Language & Research Panel: paid online interviews and focus groups with native speakers and patients that make translated health questionnaires clearer. Linguistic validation and cognitive debriefing for clinical outcome assessments, in 150+ languages.',
  keywords: [
    'research panel',
    'paid research participants',
    'cognitive debriefing',
    'linguistic validation',
    'COA translation',
    'PRO translation',
    'patient interviews',
    'healthcare research panel',
  ],
  alternates: {
    canonical: 'https://cethos.com/research',
  },
  openGraph: {
    title: 'Cethos Language & Research Panel',
    description:
      'Paid online research sessions with native speakers and patients — helping make healthcare information clearer in every language.',
    url: 'https://cethos.com/research',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ResearchPage() {
  return <ResearchPageContent />
}
