import { Metadata } from 'next'
import QuoteSubmittedContent from './QuoteSubmittedContent'

export const metadata: Metadata = {
  title: 'Quote Request Submitted',
  description: 'Thank you for your quote request. Our team will review your requirements and respond within 2 hours.',
  robots: { index: false, follow: false },
}

export default function QuoteSubmittedPage() {
  return <QuoteSubmittedContent />
}
