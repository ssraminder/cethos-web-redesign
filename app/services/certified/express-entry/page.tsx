import { Metadata } from 'next'
import ExpressEntryContent from './ExpressEntryContent'

export const metadata: Metadata = {
  title: 'Express Entry Document Translation | IRCC Certified | Cethos',
  description: 'Certified document translation for Express Entry applications. Birth certificates, police clearances, education credentials, and more. From $65. 100% IRCC acceptance guarantee.',
  alternates: {
    canonical: 'https://cethos.com/services/certified/express-entry',
  },
  openGraph: {
    title: 'Express Entry Document Translation | IRCC Certified | Cethos',
    description: 'Certified document translation for Express Entry. All documents IRCC requires. From $65. Same-day available.',
    url: 'https://cethos.com/services/certified/express-entry',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function ExpressEntryPage() {
  return <ExpressEntryContent />
}
