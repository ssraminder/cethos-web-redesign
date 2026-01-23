import { Metadata } from 'next'
import PRCitizenshipContent from './PRCitizenshipContent'

export const metadata: Metadata = {
  title: 'PR & Citizenship Translation Calgary | Complete Document Package | Cethos',
  description: 'Complete translation packages for PR and citizenship applications. All documents translated: birth, marriage, diplomas, police clearance. Bundle pricing available.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/pr-citizenship-translation',
  },
  openGraph: {
    title: 'PR & Citizenship Translation Packages | Cethos',
    description: 'Complete document translation for permanent residence and citizenship applications.',
    url: 'https://cethos.com/services/certified/pr-citizenship-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function PRCitizenshipTranslationPage() {
  return <PRCitizenshipContent />
}
