import { Metadata } from 'next'
import IqasAlbertaContent from './IqasAlbertaContent'

export const metadata: Metadata = {
  title: 'IQAS Translation Alberta | Certified Academic Translation | Cethos',
  description: 'Certified translation for IQAS credential assessment in Alberta. Academic transcripts, diplomas, and certificates. From $65. Accepted by IQAS, AINP, and Alberta employers.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/iqas-alberta',
  },
  openGraph: {
    title: 'IQAS Translation Alberta | Certified Academic Translation | Cethos',
    description: 'Certified translation for IQAS credential assessment. Academic documents for Alberta immigration. From $65.',
    url: 'https://cethos.com/services/certified/iqas-alberta',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function IqasAlbertaPage() {
  return <IqasAlbertaContent />
}
