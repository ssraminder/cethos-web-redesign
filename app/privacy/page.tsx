import { Metadata } from 'next'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Cethos',
  description: 'Learn how Cethos Solutions Inc. collects, uses, and protects your personal information. Read our comprehensive privacy policy.',
  keywords: ['privacy policy', 'data protection', 'PIPEDA', 'GDPR', 'personal information'],
  alternates: {
    canonical: 'https://cethos.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Cethos',
    description: 'Learn how Cethos Solutions Inc. collects, uses, and protects your personal information.',
    url: 'https://cethos.com/privacy',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0C2340] to-[#1a3a5c]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-3xl">
            <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-4">
              Legal
            </p>
            <h1 className="text-[48px] font-bold text-white leading-[1.1] mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-8">
          {/* Highlight Box */}
          <div className="bg-[#E0F2FE] border-l-4 border-[#0891B2] rounded-r-lg p-6 mb-12">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#0C2340] mb-2">Your Privacy Matters</p>
                <p className="text-[#4B5563]">
                  Cethos Solutions Inc. is committed to protecting your privacy and ensuring the security of your personal information. We comply with applicable privacy laws including PIPEDA (Canada) and GDPR (European Union).
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#4B5563] mb-8">
            <strong>Last Updated:</strong> January 1, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">1. Information We Collect</h2>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">Personal Information</h3>
            <p className="text-[#4B5563] mb-4">
              We collect personal information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>Name and contact information (email address, phone number, mailing address)</li>
              <li>Company name and job title</li>
              <li>Account credentials</li>
              <li>Payment and billing information</li>
              <li>Communication preferences</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">Documents and Content</h3>
            <p className="text-[#4B5563] mb-4">
              When you use our translation services, we collect:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>Source documents submitted for translation</li>
              <li>Translated documents and deliverables</li>
              <li>Project specifications and instructions</li>
              <li>Feedback and communications related to projects</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">Automatic Information</h3>
            <p className="text-[#4B5563] mb-4">
              We automatically collect certain information when you visit our website:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>IP address and device information</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or source</li>
              <li>Cookies and similar tracking technologies (see our <Link href="/cookies" className="text-[#0891B2] hover:text-[#06B6D4]">Cookie Policy</Link>)</li>
            </ul>

            {/* Section 2 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">2. How We Use Your Information</h2>
            <p className="text-[#4B5563] mb-4">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>Providing and delivering our translation and localization services</li>
              <li>Processing payments and managing your account</li>
              <li>Communicating with you about projects, updates, and support</li>
              <li>Improving our services and developing new features</li>
              <li>Analyzing website usage and optimizing user experience</li>
              <li>Complying with legal obligations and protecting our rights</li>
              <li>Marketing and promotional communications (with your consent)</li>
            </ul>

            {/* Section 3 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">3. Information Sharing and Disclosure</h2>
            <p className="text-[#4B5563] mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li><strong>Service Providers:</strong> We work with trusted linguists, translators, and technology partners who assist in delivering our services. These parties are bound by confidentiality agreements.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information when required by law, court order, or government request.</li>
              <li><strong>Protection of Rights:</strong> We may share information to protect our rights, privacy, safety, or property.</li>
            </ul>
            <p className="text-[#4B5563] mb-6">
              We do not sell your personal information to third parties for marketing purposes.
            </p>

            {/* Section 4 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">4. Data Security</h2>
            <p className="text-[#4B5563] mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>Encryption of data in transit and at rest</li>
              <li>Secure access controls and authentication</li>
              <li>Regular security assessments and audits</li>
              <li>Employee training on data protection</li>
              <li>Confidentiality agreements with all personnel and contractors</li>
            </ul>

            {/* Section 5 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">5. Data Retention</h2>
            <p className="text-[#4B5563] mb-6">
              We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. The specific retention period depends on the nature of the information and the purpose for which it was collected.
            </p>
            <p className="text-[#4B5563] mb-6">
              Project documents and translations are retained according to our document retention policy and applicable industry regulations, unless you request earlier deletion.
            </p>

            {/* Section 6 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">6. Your Privacy Rights</h2>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">All Users</h3>
            <p className="text-[#4B5563] mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">Canadian Residents (PIPEDA)</h3>
            <p className="text-[#4B5563] mb-6">
              Under the Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to access and correct your personal information held by us. You may also withdraw consent for certain processing activities. To exercise these rights, please contact our Privacy Officer.
            </p>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">European Residents (GDPR)</h3>
            <p className="text-[#4B5563] mb-6">
              If you are located in the European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR), including the right to object to processing, request restriction of processing, and lodge a complaint with a supervisory authority. Our legal basis for processing includes contractual necessity, legitimate interests, and consent.
            </p>

            {/* Section 7 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">7. International Data Transfers</h2>
            <p className="text-[#4B5563] mb-6">
              As a global translation service provider, we may transfer your information to countries outside your country of residence. When we transfer data internationally, we implement appropriate safeguards to protect your information, including standard contractual clauses and ensuring our partners maintain adequate data protection standards.
            </p>

            {/* Section 8 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-[#4B5563] mb-6">
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information promptly.
            </p>

            {/* Section 9 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">9. Changes to This Policy</h2>
            <p className="text-[#4B5563] mb-6">
              We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the &quot;Last Updated&quot; date. We encourage you to review this policy periodically.
            </p>

            {/* Section 10 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">10. Contact Us</h2>
            <p className="text-[#4B5563] mb-6">
              If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:
            </p>
          </div>

          {/* Contact Box */}
          <div className="bg-gray-50 rounded-xl p-8 mt-8">
            <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Privacy Officer</h3>
            <p className="text-[#4B5563] mb-2">Cethos Solutions Inc.</p>
            <p className="text-[#4B5563] mb-4">Calgary, Alberta, Canada</p>
            <a
              href="mailto:privacy@cethos.com"
              className="text-[#0891B2] hover:text-[#06B6D4] font-semibold transition-colors"
            >
              privacy@cethos.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
