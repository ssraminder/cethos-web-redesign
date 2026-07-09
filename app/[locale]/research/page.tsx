import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getNamespaceMessages, isValidLocale } from '@/lib/i18n'
import ResearchPageView from './ResearchPageView'
import { researchHreflangAlternates, researchUrl, OG_LOCALES } from './panelLocales'

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params
  if (!isValidLocale(locale)) return {}

  const msgs = await getNamespaceMessages('research', locale)
  const title = msgs['meta.title'] || 'Language & Research Panel | Paid Healthcare Research | Cethos'
  const description =
    msgs['meta.description'] ||
    'Join the Cethos Language & Research Panel: paid online interviews and focus groups with native speakers and patients that make translated health questionnaires clearer. Linguistic validation and cognitive debriefing for clinical outcome assessments, in 150+ languages.'

  return {
    // Absolute: the seeded meta.title already ends in "| Cethos"; the layout's
    // "%s | Cethos" template would double it.
    title: { absolute: title },
    description,
    keywords: [
      'research panel',
      'paid research participants',
      'cognitive debriefing',
      'linguistic validation',
      'COA translation',
      'PRO translation',
      'patient interviews',
      'healthcare research panel',
    ],
    alternates: {
      canonical: researchUrl(locale),
      languages: researchHreflangAlternates(),
    },
    openGraph: {
      title: msgs['hero.title'] || 'Cethos Language & Research Panel',
      description,
      url: researchUrl(locale),
      siteName: 'Cethos Solutions Inc.',
      type: 'website',
      locale: OG_LOCALES[locale],
    },
  }
}

export default async function ResearchPage({ params }: { params: { locale: string } }) {
  const { locale } = params
  if (!isValidLocale(locale)) notFound()

  const msgs = await getNamespaceMessages('research', locale)
  return <ResearchPageView msgs={msgs} lang={locale} homeHref={locale === 'fr' ? '/fr' : '/'} />
}
