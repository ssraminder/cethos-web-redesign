import { Metadata } from 'next'
import CareersContent from './CareersContent'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join our global team of language professionals. Explore career opportunities at Cethos Solutions Inc. in translation, project management, quality assurance, and more.',
  keywords: ['translation careers', 'language jobs', 'translator positions', 'localization careers', 'remote translation jobs'],
  alternates: {
    canonical: 'https://cethos.com/careers',
  },
  openGraph: {
    title: 'Careers',
    description: 'Join our global team of language professionals. Explore career opportunities at Cethos Solutions Inc.',
    url: 'https://cethos.com/careers',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function CareersPage() {
  return <CareersContent />
}
