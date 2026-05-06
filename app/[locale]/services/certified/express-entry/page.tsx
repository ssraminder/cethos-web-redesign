import { Metadata } from 'next'
import ExpressEntryContent from './ExpressEntryContent'

export const metadata: Metadata = {
  title: 'Express Entry Translation Services Canada | IRCC Certified',
  description: 'Complete document translation for Express Entry applications. IRCC-certified translations for CRS points documentation, language test results, work experience letters, and education credentials. Same-day service.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/express-entry',
  },
  openGraph: {
    title: 'Express Entry Translation Services Canada | IRCC Certified',
    description: 'Complete document translation for Express Entry applications. IRCC-certified translations for CRS points documentation and education credentials. Same-day service.',
    url: 'https://cethos.com/services/certified/express-entry',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ExpressEntryPage() {
  return <ExpressEntryContent />
}
