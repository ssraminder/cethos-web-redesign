import { Metadata } from 'next'
import PoliceClearanceContent from './PoliceClearanceContent'

export const metadata: Metadata = {
  title: 'Police Clearance Translation Calgary | RCMP & FBI Certified | Same-Day | Cethos',
  description: 'Certified police clearance translation for IRCC. RCMP, FBI, and international police certificates. Same-day service Calgary. 100% acceptance guarantee. Call (587) 600-0786.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/police-clearance-translation',
  },
  openGraph: {
    title: 'Police Clearance Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified police clearance and criminal record check translations for IRCC. Same-day service. 100% acceptance guarantee.',
    url: 'https://cethos.com/services/certified/police-clearance-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function PoliceClearanceTranslationPage() {
  return <PoliceClearanceContent />
}
