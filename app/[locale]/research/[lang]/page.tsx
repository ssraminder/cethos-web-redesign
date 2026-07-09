import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getNamespaceMessages } from '@/lib/i18n'
import ResearchPageView from '../ResearchPageView'
import {
  PANEL_PAGE_LANGS,
  isPanelPageLang,
  researchHreflangAlternates,
  researchUrl,
  OG_LOCALES,
} from '../panelLocales'

// Standalone language variants of the research page (/research/th, /research/ja,
// /research/pl, /research/de, /research/cs, /research/it). These languages are
// NOT site locales — only this page exists in them, matching the languages the
// portal's research-panel signup form supports. en/fr use the regular locale
// routes, so /research/en and /research/fr redirect there.
export function generateStaticParams() {
  return PANEL_PAGE_LANGS.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; lang: string }
}): Promise<Metadata> {
  const { lang } = params
  if (!isPanelPageLang(lang)) return {}

  const msgs = await getNamespaceMessages('research', lang)
  const title = msgs['meta.title'] || 'Language & Research Panel | Paid Healthcare Research | Cethos'
  const description =
    msgs['meta.description'] ||
    'Join the Cethos Language & Research Panel: paid online interviews and focus groups with native speakers and patients that make translated health questionnaires clearer.'

  return {
    // Absolute: the seeded meta.title already ends in "| Cethos"; the layout's
    // "%s | Cethos" template would double it.
    title: { absolute: title },
    description,
    alternates: {
      canonical: researchUrl(lang),
      languages: researchHreflangAlternates(),
    },
    openGraph: {
      title: msgs['hero.title'] || 'Cethos Language & Research Panel',
      description,
      url: researchUrl(lang),
      siteName: 'Cethos Solutions Inc.',
      type: 'website',
      locale: OG_LOCALES[lang],
    },
  }
}

export default async function ResearchLangPage({
  params,
}: {
  params: { locale: string; lang: string }
}) {
  const { locale, lang } = params

  // The language pages live only under the default locale (/research/<lang>);
  // /fr/research/<lang> would duplicate content.
  if (locale !== 'en') redirect(`/research/${lang}`)
  if (lang === 'en') redirect('/research')
  if (lang === 'fr') redirect('/fr/research')
  if (!isPanelPageLang(lang)) notFound()

  const msgs = await getNamespaceMessages('research', lang)
  return <ResearchPageView msgs={msgs} lang={lang} homeHref="/" />
}
