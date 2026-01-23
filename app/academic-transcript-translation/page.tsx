import { Metadata } from 'next'
import AcademicTranscriptPageContent from './AcademicTranscriptPageContent'

export const metadata: Metadata = {
  title: 'Diploma & Transcript Translation Calgary | WES IQAS Accepted | Cethos',
  description: 'Academic diploma & transcript translations for WES, IQAS, IRCC. Express Entry ready. Same-day service Calgary. 95+ languages. Call (587) 600-0786.',
  keywords: ['diploma translation', 'transcript translation', 'WES translation', 'IQAS translation', 'academic credential translation', 'Express Entry translation'],
  alternates: {
    canonical: 'https://cethos.com/academic-transcript-translation',
  },
  openGraph: {
    title: 'Diploma & Transcript Translation Calgary | WES IQAS Accepted | Cethos',
    description: 'Academic diploma & transcript translations for WES, IQAS, IRCC. Express Entry ready.',
    url: 'https://cethos.com/academic-transcript-translation',
  },
}

export default function AcademicTranscriptTranslationPage() {
  return <AcademicTranscriptPageContent />
}
