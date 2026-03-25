import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Message Sent | Cethos Solutions Inc.',
  description: 'Thank you for contacting us. We will respond within 2 hours.',
  robots: { index: false, follow: false },
}

export default function ContactSubmittedPage() {
  return (
    <section className="pt-20 min-h-screen bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
      <div className="max-w-[600px] mx-auto px-8 py-24 text-center">
        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
          Message Sent!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for contacting us. We&apos;ll respond within 2 hours during business hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
          >
            Send Another Message
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  )
}
