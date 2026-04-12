'use client'

import Link from 'next/link'
import { Shield } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function PrivacyContent() {
  const t = useTranslations('privacy')

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
              <Shield className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-1" />
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
            {/* Section 1 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section1_title')}</h2>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">{t('section1_sub1_title')}</h3>
            <p className="text-[#4B5563] mb-4">
              {t('section1_sub1_intro')}
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>{t('section1_sub1_item1')}</li>
              <li>{t('section1_sub1_item2')}</li>
              <li>{t('section1_sub1_item3')}</li>
              <li>{t('section1_sub1_item4')}</li>
              <li>{t('section1_sub1_item5')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">{t('section1_sub2_title')}</h3>
            <p className="text-[#4B5563] mb-4">
              {t('section1_sub2_intro')}
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>{t('section1_sub2_item1')}</li>
              <li>{t('section1_sub2_item2')}</li>
              <li>{t('section1_sub2_item3')}</li>
              <li>{t('section1_sub2_item4')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">{t('section1_sub3_title')}</h3>
            <p className="text-[#4B5563] mb-4">
              {t('section1_sub3_intro')}
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>{t('section1_sub3_item1')}</li>
              <li>{t('section1_sub3_item2')}</li>
              <li>{t('section1_sub3_item3')}</li>
              <li>{t('section1_sub3_item4')}</li>
              <li>{t('section1_sub3_item5')}</li>
            </ul>

            {/* Section 2 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section2_title')}</h2>
            <p className="text-[#4B5563] mb-4">
              {t('section2_intro')}
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>{t('section2_item1')}</li>
              <li>{t('section2_item2')}</li>
              <li>{t('section2_item3')}</li>
              <li>{t('section2_item4')}</li>
              <li>{t('section2_item5')}</li>
              <li>{t('section2_item6')}</li>
              <li>{t('section2_item7')}</li>
            </ul>

            {/* Section 3 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section3_title')}</h2>
            <p className="text-[#4B5563] mb-4">
              {t('section3_intro')}
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>{t('section3_item1')}</li>
              <li>{t('section3_item2')}</li>
              <li>{t('section3_item3')}</li>
              <li>{t('section3_item4')}</li>
            </ul>
            <p className="text-[#4B5563] mb-6">
              {t('section3_no_sell')}
            </p>

            {/* Section 4 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section4_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('section4_intro')}
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>{t('section4_item1')}</li>
              <li>{t('section4_item2')}</li>
              <li>{t('section4_item3')}</li>
              <li>{t('section4_item4')}</li>
              <li>{t('section4_item5')}</li>
            </ul>

            {/* Section 5 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section5_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('section5_p1')}
            </p>
            <p className="text-[#4B5563] mb-6">
              {t('section5_p2')}
            </p>

            {/* Section 6 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section6_title')}</h2>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">{t('section6_sub1_title')}</h3>
            <p className="text-[#4B5563] mb-4">
              {t('section6_sub1_intro')}
            </p>
            <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mb-6">
              <li>{t('section6_sub1_item1')}</li>
              <li>{t('section6_sub1_item2')}</li>
              <li>{t('section6_sub1_item3')}</li>
              <li>{t('section6_sub1_item4')}</li>
              <li>{t('section6_sub1_item5')}</li>
            </ul>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">{t('section6_sub2_title')}</h3>
            <p className="text-[#4B5563] mb-6">
              {t('section6_sub2_desc')}
            </p>

            <h3 className="text-xl font-semibold text-[#0C2340] mt-8 mb-3">{t('section6_sub3_title')}</h3>
            <p className="text-[#4B5563] mb-6">
              {t('section6_sub3_desc')}
            </p>

            {/* Section 7 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section7_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('section7_desc')}
            </p>

            {/* Section 8 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section8_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('section8_desc')}
            </p>

            {/* Section 9 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section9_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('section9_desc')}
            </p>

            {/* Section 10 */}
            <h2 className="text-2xl font-bold text-[#0C2340] mt-12 mb-4">{t('section10_title')}</h2>
            <p className="text-[#4B5563] mb-6">
              {t('section10_desc')}
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
        </div>
      </section>
    </main>
  )
}
