import type { Metadata } from 'next'
import { SecureUploadForm } from './SecureUploadForm'

export const metadata: Metadata = {
  title: 'Secure Document Upload',
  description:
    'Securely send your documents to Cethos for certified translation. Your files are encrypted in transit and scanned for your protection.',
  robots: {
    // Reachable directly via shared link, but not indexed.
    index: false,
    follow: false,
  },
}

export default function SecureUploadPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-navy text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Secure Document Upload
          </h1>
          <p className="text-lg text-slate-200">
            Send your documents directly to our team for translation. Your
            files are transmitted over an encrypted connection and scanned for
            safety.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-medium p-6 sm:p-8 border border-slate-200">
            <SecureUploadForm />
          </div>

          {/* Trust copy */}
          <div className="mt-8 bg-white rounded-xl border border-slate-200 p-5 text-sm text-slate-600 space-y-2">
            <p className="font-semibold text-navy">How your data is handled</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Transmitted over HTTPS (TLS). Stored in a private, access-controlled
                bucket.
              </li>
              <li>
                Every file is scanned for malware before our team can open it.
              </li>
              <li>
                Submissions and files are retained for up to 180 days and then
                automatically deleted.
              </li>
              <li>We never share your documents with third parties.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}
