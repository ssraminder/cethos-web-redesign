import { Metadata } from 'next'
import AcademicTranscriptContent from './AcademicTranscriptContent'

export const metadata: Metadata = {
  title: 'Academic Transcript Translation Calgary | WES IQAS Certified | Cethos',
  description: 'Certified academic transcript translation for WES, IQAS, Express Entry. Diplomas, degrees, transcripts. Same-day service Calgary. 100% acceptance guarantee.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/academic-transcript-translation',
  },
  openGraph: {
    title: 'Academic Transcript Translation Calgary | WES IQAS Certified | Cethos',
    description: 'Certified academic transcript translation for WES, IQAS, Express Entry. Same-day service.',
    url: 'https://cethos.com/services/certified/academic-transcript-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function AcademicTranscriptTranslationPage() {
  return <AcademicTranscriptContent />
}
