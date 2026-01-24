import { Metadata } from 'next'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy | Cethos',
  description: 'Learn about how Cethos Solutions Inc. uses cookies and similar tracking technologies on our website.',
  keywords: ['cookie policy', 'cookies', 'tracking', 'privacy', 'website cookies'],
  alternates: {
    canonical: 'https://cethos.com/cookies',
  },
  openGraph: {
    title: 'Cookie Policy | Cethos',
    description: 'Learn about how Cethos Solutions Inc. uses cookies and similar tracking technologies on our website.',
    url: 'https://cethos.com/cookies',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

const essentialCookies = [
  {
    name: '__session',
    purpose: 'Maintains your session state across page requests',
    duration: 'Session',
  },
  {
    name: 'csrf_token',
    purpose: 'Protects against cross-site request forgery attacks',
    duration: 'Session',
  },
  {
    name: 'cookie_consent',
    purpose: 'Stores your cookie consent preferences',
    duration: '1 year',
  },
]

const analyticsCookies = [
  {
    name: '_ga',
    purpose: 'Google Analytics - Distinguishes unique users',
    duration: '2 years',
  },
  {
    name: '_ga_*',
    purpose: 'Google Analytics - Maintains session state',
    duration: '2 years',
  },
  {
    name: '_gid',
    purpose: 'Google Analytics - Distinguishes users',
    duration: '24 hours',
  },
]

const marketingCookies = [
  {
    name: '_gcl_au',
    purpose: 'Google Ads - Stores conversion data',
    duration: '90 days',
  },
  {
    name: '_fbp',
    purpose: 'Facebook - Stores and tracks visits across websites',
    duration: '90 days',
  },
]

export default function CookiePolicyPage() {
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
              Cookie Policy
            </h1>
            <p className="text-xl text-gray-300">
              This policy explains how we use cookies and similar technologies on our website.
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
              <Cookie className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-[#0C2340] mb-2">About Cookies</p>
                <p className="text-[#4B5563]">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By continuing to use our website, you consent to our use of cookies in accordance with this policy.
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#4B5563] mb-8">
            <strong>Last Updated:</strong> January 1, 2026
          </p>

          <div className="prose prose-lg max-w-none">
            {/* What Are Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">What Are Cookies?</h2>
            <p className="text-[#4B5563] mb-6">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide information to website owners, and enable certain features. Cookies can be &quot;persistent&quot; (remaining on your device until deleted) or &quot;session&quot; (deleted when you close your browser).
            </p>
            <p className="text-[#4B5563] mb-6">
              We also use similar technologies such as pixels, beacons, and local storage, which function similarly to cookies. References to &quot;cookies&quot; in this policy include these similar technologies.
            </p>

            {/* Essential Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">Essential Cookies</h2>
            <p className="text-[#4B5563] mb-6">
              These cookies are necessary for the website to function properly and cannot be disabled. They are typically set in response to actions you take, such as logging in or filling out forms.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">Cookie Name</th>
                    <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">Purpose</th>
                    <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {essentialCookies.map((cookie) => (
                    <tr key={cookie.name}>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563] font-mono">{cookie.name}</td>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563]">{cookie.purpose}</td>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563]">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Analytics Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">Analytics Cookies</h2>
            <p className="text-[#4B5563] mb-6">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">Cookie Name</th>
                    <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">Purpose</th>
                    <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsCookies.map((cookie) => (
                    <tr key={cookie.name}>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563] font-mono">{cookie.name}</td>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563]">{cookie.purpose}</td>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563]">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Marketing Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">Marketing Cookies</h2>
            <p className="text-[#4B5563] mb-6">
              These cookies are used to track visitors across websites and display ads that are relevant and engaging for individual users.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">Cookie Name</th>
                    <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">Purpose</th>
                    <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {marketingCookies.map((cookie) => (
                    <tr key={cookie.name}>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563] font-mono">{cookie.name}</td>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563]">{cookie.purpose}</td>
                      <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563]">{cookie.duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Third-Party Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">Third-Party Cookies</h2>
            <p className="text-[#4B5563] mb-6">
              Some cookies are placed by third-party services that appear on our pages. We do not control these third-party cookies. The third parties that set these cookies may use them to track your online activity across different websites. Key third-party services we use include:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li><strong>Google Analytics:</strong> Web analytics service that tracks and reports website traffic</li>
              <li><strong>Google Ads:</strong> Advertising platform for conversion tracking and remarketing</li>
              <li><strong>Facebook/Meta:</strong> Social media platform for advertising and analytics</li>
            </ul>
            <p className="text-[#4B5563] mb-6">
              Please refer to these third parties&apos; privacy policies for more information about their data practices.
            </p>

            {/* Managing Preferences */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-[#4B5563] mb-6">
              Most web browsers allow you to control cookies through their settings. You can typically find these settings in the &quot;Options&quot; or &quot;Preferences&quot; menu of your browser. Please note that disabling certain cookies may affect the functionality of our website.
            </p>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">Browser-Specific Instructions</h3>
            <p className="text-[#4B5563] mb-4">
              Learn how to manage cookies in your browser:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  Apple Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">Opt-Out Tools</h3>
            <p className="text-[#4B5563] mb-4">
              You can also opt out of certain third-party cookies using these tools:
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  Google Analytics Opt-out Browser Add-on
                </a>
              </li>
              <li>
                <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  Network Advertising Initiative Opt-out
                </a>
              </li>
              <li>
                <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  Digital Advertising Alliance Opt-out
                </a>
              </li>
            </ul>

            {/* Do Not Track */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">Do Not Track</h2>
            <p className="text-[#4B5563] mb-6">
              Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites that you do not want to be tracked. Because there is no uniform standard for how websites should respond to DNT signals, our website does not currently respond to DNT browser signals. However, you can use the cookie management options described above to control tracking.
            </p>

            {/* Changes */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">Changes to This Policy</h2>
            <p className="text-[#4B5563] mb-6">
              We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. We will post any changes on this page and update the &quot;Last Updated&quot; date above.
            </p>

            {/* Contact */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">Contact Us</h2>
            <p className="text-[#4B5563] mb-6">
              If you have questions about our use of cookies, please contact us:
            </p>
          </div>

          {/* Contact Box */}
          <div className="bg-gray-50 rounded-xl p-8 mt-8">
            <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Privacy Team</h3>
            <p className="text-[#4B5563] mb-2">Cethos Solutions Inc.</p>
            <p className="text-[#4B5563] mb-4">Calgary, Alberta, Canada</p>
            <a
              href="mailto:privacy@cethos.com"
              className="text-[#0891B2] hover:text-[#06B6D4] font-semibold transition-colors"
            >
              privacy@cethos.com
            </a>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
            <p className="text-[#4B5563] mb-4">Related Policies:</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-[#0891B2] hover:text-[#06B6D4] font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#0891B2] hover:text-[#06B6D4] font-medium">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
