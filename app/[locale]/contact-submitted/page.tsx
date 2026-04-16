import { Metadata } from 'next'
import ContactSubmittedContent from './ContactSubmittedContent'

export const metadata: Metadata = {
  title: 'Message Sent',
  description: 'Thank you for contacting us. We will respond within 2 hours.',
  robots: { index: false, follow: false },
}

export default function ContactSubmittedPage() {
  return <ContactSubmittedContent />
}
