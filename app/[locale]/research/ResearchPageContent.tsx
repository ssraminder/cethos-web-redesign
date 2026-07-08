'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

// Public overview of the Cethos Language & Research Panel. The panel itself
// (sign-up, scheduling, honorarium handling) lives on the portal — this page
// explains the program and funnels visitors to portal.cethos.com/research-panel.
const PORTAL_PANEL_URL = 'https://portal.cethos.com/research-panel'

function panelUrl(locale: string) {
  // The portal supports more locales than the site; en/fr both exist there.
  return `${PORTAL_PANEL_URL}/${locale === 'fr' ? 'fr' : 'en'}`
}

export default function ResearchPageContent() {
  const locale = useLocale()
  const t = useTranslations('research')
  const joinUrl = panelUrl(locale)

  const steps = [1, 2, 3, 4].map((n) => ({
    n,
    title: t(`how.step${n}_title`),
    body: t(`how.step${n}_body`),
  }))

  const cards = [1, 2, 3].map((n) => ({
    title: t(`what.card${n}_title`),
    body: t(`what.card${n}_body`),
  }))

  const roles = [1, 2, 3].map((n) => ({
    title: t(`who.item${n}_title`),
    body: t(`who.item${n}_body`),
  }))

  const roadmap = [1, 2, 3, 4].map((n) => t(`roadmap.item${n}`))

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="min-h-[420px] bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#0891B2] pt-32 pb-16 flex items-center">
        <div className="container mx-auto px-4 text-center">
          <nav className="text-sm text-gray-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              {t('hero.breadcrumb_home')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{t('hero.breadcrumb')}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t('hero.title')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">{t('hero.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={joinUrl}
              className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#067a96] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('hero.cta_join')}
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center border border-white/40 hover:bg-white/10 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              {t('hero.cta_learn')}
            </a>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] text-center mb-6">{t('what.title')}</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center mb-4">{t('what.p1')}</p>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center mb-12">{t('what.p2')}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {cards.map((c) => (
              <div key={c.title} className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-[#0C2340] mb-2">{c.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] text-center mb-12">{t('how.title')}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="w-10 h-10 rounded-full bg-[#0891B2] text-white font-bold flex items-center justify-center mb-4">
                  {s.n}
                </div>
                <h3 className="font-semibold text-[#0C2340] mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm text-center mt-8">{t('how.note')}</p>
        </div>
      </section>

      {/* Who we look for */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] text-center mb-6">{t('who.title')}</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto text-center mb-12">{t('who.intro')}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((r) => (
              <div key={r.title} className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-[#0C2340] mb-2">{r.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where we're headed */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] text-center mb-6">{t('roadmap.title')}</h2>
          <p className="text-gray-600 text-lg text-center mb-10">{t('roadmap.p1')}</p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {roadmap.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-5">
                <svg className="w-5 h-5 text-[#0891B2] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust & privacy */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0C2340] mb-6">{t('trust.title')}</h2>
          <p className="text-gray-600 mb-3">{t('trust.p1')}</p>
          <p className="text-gray-600 mb-3">{t('trust.p2')}</p>
          <p className="text-gray-600">{t('trust.p3')}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#0C2340] to-[#0891B2]">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-gray-200 text-lg mb-8">{t('cta.body')}</p>
          <a
            href={joinUrl}
            className="inline-flex items-center justify-center bg-white text-[#0C2340] hover:bg-gray-100 font-semibold px-10 py-3 rounded-lg transition-colors"
          >
            {t('cta.button')}
          </a>
          <div className="mt-12 pt-8 border-t border-white/20">
            <h3 className="text-xl font-semibold text-white mb-2">{t('cta.sponsor_title')}</h3>
            <p className="text-gray-200 mb-5">{t('cta.sponsor_body')}</p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-white/50 hover:bg-white/10 text-white font-semibold px-8 py-2.5 rounded-lg transition-colors"
            >
              {t('cta.sponsor_button')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
