import { Metadata } from 'next'
import IqasAlbertaContent from './IqasAlbertaContent'

export const metadata: Metadata = {
  title: 'IQAS Translation Services Alberta | Credential Evaluation | Cethos',
  description: 'Certified translations for IQAS credential evaluations in Alberta. IRCC and Government of Alberta approved. Academic transcripts, diplomas, and professional credentials. Same-day available from $65.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/iqas-alberta',
  },
  openGraph: {
    title: 'IQAS Translation Services Alberta | Credential Evaluation | Cethos',
    description: 'Certified translations for IQAS credential evaluations in Alberta. IRCC and Government of Alberta approved. Academic transcripts, diplomas, and professional credentials. From $65.',
    url: 'https://cethos.com/services/certified/iqas-alberta',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function IqasAlbertaPage() {
  return <IqasAlbertaContent />
}
