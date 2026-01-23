import { Metadata } from 'next'
import PRCitizenshipPageContent from './PRCitizenshipPageContent'

export const metadata: Metadata = {
  title: 'PR & Citizenship Translation Calgary | IRCC Certified | Cethos',
  description: 'Certified translations for permanent residence & Canadian citizenship applications. All IRCC documents translated same-day. 100% acceptance guarantee. Call (587) 600-0786.',
  keywords: ['PR translation', 'citizenship translation', 'permanent residence translation', 'IRCC document translation', 'Canadian citizenship translation'],
  alternates: {
    canonical: 'https://cethos.com/pr-citizenship-translation',
  },
  openGraph: {
    title: 'PR & Citizenship Translation Calgary | IRCC Certified | Cethos',
    description: 'Certified translations for permanent residence & Canadian citizenship applications. Same-day service.',
    url: 'https://cethos.com/pr-citizenship-translation',
  },
}

export default function PRCitizenshipTranslationPage() {
  return <PRCitizenshipPageContent />
}
