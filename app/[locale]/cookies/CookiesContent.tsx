'use client'

import Link from 'next/link'
import { Cookie } from 'lucide-react'
import { useTranslations } from 'next-intl'

const essentialCookies = [
  { name: '__session', purposeKey: 'essential_session_purpose', durationKey: 'essential_session_duration' },
  { name: 'csrf_token', purposeKey: 'essential_csrf_purpose', durationKey: 'essential_csrf_duration' },
  { name: 'cookie_consent', purposeKey: 'essential_consent_purpose', durationKey: 'essential_consent_duration' },
]

const analyticsCookies = [
  { name: '_ga', purposeKey: 'analytics_ga_purpose', durationKey: 'analytics_ga_duration' },
  { name: '_ga_*', purposeKey: 'analytics_ga_star_purpose', durationKey: 'analytics_ga_star_duration' },
  { name: '_gid', purposeKey: 'analytics_gid_purpose', durationKey: 'analytics_gid_duration' },
]

const marketingCookies = [
  { name: '_gcl_au', purposeKey: 'marketing_gcl_purpose', durationKey: 'marketing_gcl_duration' },
  { name: '_fbp', purposeKey: 'marketing_fbp_purpose', durationKey: 'marketing_fbp_duration' },
]

export default function CookiesContent() {
  const t = useTranslations('cookies')

  const renderCookieTable = (cookies: { name: string; purposeKey: string; durationKey: string }[]) => (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#F8FAFC]">
            <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">{t('table_name')}</th>
            <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">{t('table_purpose')}</th>
            <th className="border border-[#E5E7EB] px-4 py-3 text-left text-sm font-semibold text-[#0C2340]">{t('table_duration')}</th>
          </tr>
        </thead>
        <tbody>
          {cookies.map((cookie) => (
            <tr key={cookie.name}>
              <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563] font-mono">{cookie.name}</td>
              <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563]">{t(cookie.purposeKey)}</td>
              <td className="border border-[#E5E7EB] px-4 py-3 text-sm text-[#4B5563]">{t(cookie.durationKey)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-[#0C2340] to-[#1a3a5c]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-3xl">
            <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-4">
              {t('label')}
            </p>
            <h1 className="text-[48px] font-bold text-white leading-[1.1] mb-6">
              {t('heading')}
            </h1>
            <p className="text-xl text-gray-300">
              {t('hero_description')}
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
                <p className="font-semibold text-[#0C2340] mb-2">{t('highlight_title')}</p>
                <p className="text-[#4B5563]">
                  {t('highlight_desc')}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#4B5563] mb-8">
            <strong>{t('last_updated_label')}</strong> {t('last_updated_date')}
          </p>

          <div className="prose prose-lg max-w-none">
            {/* What Are Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('what_are_cookies_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('what_are_cookies_p1')}
            </p>
            <p className="text-[#4B5563] mb-6">
              {t('what_are_cookies_p2')}
            </p>

            {/* Essential Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('essential_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('essential_desc')}
            </p>
            {renderCookieTable(essentialCookies)}

            {/* Analytics Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('analytics_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('analytics_desc')}
            </p>
            {renderCookieTable(analyticsCookies)}

            {/* Marketing Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('marketing_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('marketing_desc')}
            </p>
            {renderCookieTable(marketingCookies)}

            {/* Third-Party Cookies */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('third_party_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('third_party_desc')}
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>{t('third_party_item1')}</li>
              <li>{t('third_party_item2')}</li>
              <li>{t('third_party_item3')}</li>
            </ul>
            <p className="text-[#4B5563] mb-6">
              {t('third_party_note')}
            </p>

            {/* Managing Preferences */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('managing_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('managing_desc')}
            </p>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">{t('browser_instructions_title')}</h3>
            <p className="text-[#4B5563] mb-4">
              {t('browser_instructions_desc')}
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

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">{t('optout_title')}</h3>
            <p className="text-[#4B5563] mb-4">
              {t('optout_desc')}
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  {t('optout_ga')}
                </a>
              </li>
              <li>
                <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  {t('optout_nai')}
                </a>
              </li>
              <li>
                <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-[#0891B2] hover:text-[#06B6D4]">
                  {t('optout_daa')}
                </a>
              </li>
            </ul>

            {/* Do Not Track */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('dnt_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('dnt_desc')}
            </p>

            {/* Changes */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('changes_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('changes_desc')}
            </p>

            {/* Contact */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('contact_heading')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('contact_desc')}
            </p>
          </div>

          {/* Contact Box */}
          <div className="bg-gray-50 rounded-xl p-8 mt-8">
            <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{t('contact_title')}</h3>
            <p className="text-[#4B5563] mb-2">{t('contact_company')}</p>
            <p className="text-[#4B5563] mb-4">{t('contact_location')}</p>
            <a
              href="mailto:privacy@cethos.com"
              className="text-[#0891B2] hover:text-[#06B6D4] font-semibold transition-colors"
            >
              privacy@cethos.com
            </a>
          </div>

          {/* Related Links */}
          <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
            <p className="text-[#4B5563] mb-4">{t('related_policies')}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-[#0891B2] hover:text-[#06B6D4] font-medium">
                {t('related_privacy')}
              </Link>
              <Link href="/terms" className="text-[#0891B2] hover:text-[#06B6D4] font-medium">
                {t('related_terms')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
