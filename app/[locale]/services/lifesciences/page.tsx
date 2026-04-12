import { Metadata } from 'next'
import LifeSciencesPageContent from './LifeSciencesPageContent'

export const metadata: Metadata = {
  title: 'Life Sciences Translation Services | Cethos Solutions Inc.',
  description: 'Life sciences translation including linguistic validation, cognitive debriefing, clinical trial documentation, and regulatory submissions. ISPOR-compliant methodology. FDA, EMA, Health Canada expertise.',
  keywords: ['life sciences translation', 'linguistic validation', 'cognitive debriefing', 'clinical trial translation', 'regulatory translation', 'pharmaceutical translation', 'PRO translation', 'COA translation'],
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences',
  },
  openGraph: {
    title: 'Life Sciences Translation Services | Cethos Solutions Inc.',
    description: 'Life sciences translation including linguistic validation, cognitive debriefing, clinical trial documentation, and regulatory submissions.',
    url: 'https://cethos.com/services/lifesciences',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function LifeSciencesPage() {
  return <LifeSciencesPageContent />
}
