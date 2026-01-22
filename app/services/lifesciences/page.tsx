import { Metadata } from 'next'
import LifeSciencesPageContent from './LifeSciencesPageContent'

export const metadata: Metadata = {
  title: 'Life Sciences Translation Services | Linguistic Validation & Clinical Translation',
  description: 'ISPOR-compliant linguistic validation, cognitive debriefing, clinical trial translation, and regulatory affairs services. FDA, EMA, PMDA compliant. 5,000+ linguists, 1,000+ CD moderators.',
  keywords: ['life sciences translation', 'linguistic validation', 'cognitive debriefing', 'clinical trial translation', 'regulatory translation', 'pharmaceutical translation', 'PRO translation', 'COA translation'],
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences',
  },
  openGraph: {
    title: 'Life Sciences Translation Services | Cethos Solutions Inc.',
    description: 'ISPOR-compliant linguistic validation, cognitive debriefing, and clinical translation services for pharmaceutical, biotech, and medical device companies.',
    url: 'https://cethos.com/services/lifesciences',
  },
}

export default function LifeSciencesPage() {
  return <LifeSciencesPageContent />
}
