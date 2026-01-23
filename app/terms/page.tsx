import { Metadata } from 'next'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Cethos',
  description: 'Read the terms and conditions governing the use of Cethos Solutions Inc. translation and localization services.',
  keywords: ['terms of service', 'terms and conditions', 'translation agreement', 'service agreement'],
  alternates: {
    canonical: 'https://cethos.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | Cethos',
    description: 'Read the terms and conditions governing the use of Cethos Solutions Inc. translation and localization services.',
    url: 'https://cethos.com/terms',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-xl text-gray-300">
              Please read these terms carefully before using our services.
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
              <FileText className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#0C2340] mb-2">Agreement to Terms</p>
                <p className="text-[#4B5563]">
                  By using Cethos Solutions Inc.&apos;s services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#4B5563] mb-8">
            <strong>Effective Date:</strong> January 1, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">1. Services</h2>
            <p className="text-[#4B5563] mb-6">
              Cethos Solutions Inc. (&quot;Cethos,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides professional translation, localization, interpretation, and related language services (&quot;Services&quot;). These Terms of Service govern your use of our Services and constitute a binding agreement between you (&quot;Client,&quot; &quot;you,&quot; or &quot;your&quot;) and Cethos.
            </p>

            {/* Section 2 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">2. Ordering and Acceptance</h2>
            <p className="text-[#4B5563] mb-4">
              Orders for Services may be placed through our website, email, or other agreed-upon channels. Each order is subject to acceptance by Cethos. An order is accepted when we provide written confirmation, including a quote or project agreement specifying:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>Scope of Services and deliverables</li>
              <li>Language pairs and target formats</li>
              <li>Delivery timeline and milestones</li>
              <li>Pricing and payment terms</li>
              <li>Any special requirements or instructions</li>
            </ul>
            <p className="text-[#4B5563] mb-6">
              Your acceptance of the quote or project agreement, whether by written confirmation, payment of deposit, or submission of source materials, constitutes your agreement to these Terms of Service.
            </p>

            {/* Section 3 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">3. Client Responsibilities</h2>
            <p className="text-[#4B5563] mb-4">
              To enable us to provide high-quality Services, you agree to:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>Provide accurate and complete source materials in agreed formats</li>
              <li>Supply reference materials, glossaries, and style guides as applicable</li>
              <li>Respond promptly to queries and requests for clarification</li>
              <li>Designate a point of contact for project communications</li>
              <li>Review and approve deliverables within agreed timeframes</li>
              <li>Ensure you have the right to have the content translated</li>
            </ul>

            {/* Section 4 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">4. Delivery and Acceptance</h2>
            <p className="text-[#4B5563] mb-6">
              We will deliver completed work by the agreed deadline. Delivery is deemed complete upon transmission of the deliverables to you via email or other agreed method. You will have a review period of ten (10) business days from delivery to inspect the work and notify us of any issues. If no notice is received within this period, the deliverables are deemed accepted.
            </p>

            {/* Section 5 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">5. Revisions and Quality</h2>
            <p className="text-[#4B5563] mb-6">
              We are committed to delivering high-quality work that meets your specifications. If you identify errors or issues with the delivered work that represent a deviation from the agreed specifications, please notify us within the review period. We will correct verifiable errors at no additional charge. Requests for revisions beyond the original scope, changes to specifications, or preference-based changes may be subject to additional fees.
            </p>

            {/* Section 6 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">6. Payment Terms</h2>
            <p className="text-[#4B5563] mb-4">
              Payment terms are Net 30 days from the invoice date unless otherwise agreed in writing. We accept payment by:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>Bank transfer (wire transfer)</li>
              <li>Credit card</li>
              <li>Other methods as agreed</li>
            </ul>
            <p className="text-[#4B5563] mb-6">
              For new clients or large projects, we may require a deposit of up to 50% before commencing work. Late payments may be subject to interest charges of 1.5% per month on the outstanding balance.
            </p>

            {/* Section 7 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">7. Confidentiality</h2>
            <p className="text-[#4B5563] mb-6">
              We treat all client materials and information as confidential. We maintain strict confidentiality protocols and require all translators and staff to sign non-disclosure agreements. We will not disclose, share, or use your materials or information for any purpose other than providing the agreed Services, unless required by law or with your prior written consent.
            </p>

            {/* Section 8 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">8. Intellectual Property</h2>
            <p className="text-[#4B5563] mb-6">
              You retain all intellectual property rights in your source materials. Upon full payment, you will own all intellectual property rights in the translated deliverables. We may retain copies of completed work for quality assurance and internal reference purposes, subject to confidentiality obligations. Translation memories and glossaries developed during projects may be retained by Cethos for use in future projects for you.
            </p>

            {/* Section 9 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">9. Limitation of Liability</h2>
            <p className="text-[#4B5563] mb-6">
              To the maximum extent permitted by law, Cethos&apos;s total liability for any claim arising from or related to our Services shall not exceed the total fees paid by you for the specific project giving rise to the claim. In no event shall Cethos be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, data, or business opportunities, regardless of whether we were advised of the possibility of such damages.
            </p>

            {/* Section 10 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">10. Indemnification</h2>
            <p className="text-[#4B5563] mb-6">
              You agree to indemnify, defend, and hold harmless Cethos and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including reasonable legal fees) arising from: (a) your breach of these Terms; (b) your violation of any third-party rights, including intellectual property rights; or (c) the content of your source materials.
            </p>

            {/* Section 11 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">11. Cancellation</h2>
            <p className="text-[#4B5563] mb-4">
              You may cancel an order by providing written notice. Cancellation fees apply as follows:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li><strong>Standard Projects:</strong> 25% of the remaining project value for work not yet completed</li>
              <li><strong>Rush Projects:</strong> 50% of the remaining project value for work not yet completed</li>
            </ul>
            <p className="text-[#4B5563] mb-6">
              Work completed prior to cancellation is fully billable. We reserve the right to cancel or suspend work if you fail to provide required materials, payment, or approvals in a timely manner.
            </p>

            {/* Section 12 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">12. Force Majeure</h2>
            <p className="text-[#4B5563] mb-6">
              Neither party shall be liable for delays or failures in performance resulting from circumstances beyond its reasonable control, including but not limited to natural disasters, acts of government, war, terrorism, labor disputes, internet or telecommunications failures, or pandemics. In such events, the affected party shall notify the other party promptly and make reasonable efforts to mitigate the impact.
            </p>

            {/* Section 13 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">13. Governing Law</h2>
            <p className="text-[#4B5563] mb-6">
              These Terms of Service shall be governed by and construed in accordance with the laws of the Province of Alberta, Canada, without regard to its conflict of law principles. Any disputes arising from or related to these Terms or our Services shall be subject to the exclusive jurisdiction of the courts of Alberta, Canada.
            </p>

            {/* Section 14 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">14. Changes to Terms</h2>
            <p className="text-[#4B5563] mb-6">
              We may update these Terms of Service from time to time. Material changes will be posted on our website with an updated effective date. Your continued use of our Services after such changes constitutes acceptance of the updated terms. We encourage you to review these Terms periodically.
            </p>

            {/* Section 15 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">15. Contact Information</h2>
            <p className="text-[#4B5563] mb-6">
              If you have questions about these Terms of Service, please contact us:
            </p>
          </div>

          {/* Contact Box */}
          <div className="bg-gray-50 rounded-xl p-8 mt-8">
            <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Legal Department</h3>
            <p className="text-[#4B5563] mb-2">Cethos Solutions Inc.</p>
            <p className="text-[#4B5563] mb-4">Calgary, Alberta, Canada</p>
            <a
              href="mailto:legal@cethos.com"
              className="text-[#0891B2] hover:text-[#06B6D4] font-semibold transition-colors"
            >
              legal@cethos.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
