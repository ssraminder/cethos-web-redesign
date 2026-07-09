// Language variants of the /research page. en/fr are served by the site's
// next-intl routing (/research, /fr/research); the rest are standalone pages
// at /research/<lang> — the site's locale set stays en/fr, so these languages
// exist only for this page. The set mirrors the locales supported by the
// portal's research-panel signup form (client/i18n/researchPanel.ts in the
// portal repo), so every page links to a signup form in the same language.
export const PANEL_PAGE_LANGS = ['th', 'ja', 'pl', 'de', 'cs', 'it'] as const
export type PanelPageLang = (typeof PANEL_PAGE_LANGS)[number]

export function isPanelPageLang(value: string): value is PanelPageLang {
  return (PANEL_PAGE_LANGS as readonly string[]).includes(value)
}

const BASE_URL = 'https://cethos.com'

/** Absolute URL of the research page in a given language. */
export function researchUrl(lang: string): string {
  if (lang === 'en') return `${BASE_URL}/research`
  if (lang === 'fr') return `${BASE_URL}/fr/research`
  return `${BASE_URL}/research/${lang}`
}

/** Path (relative href) of the research page in a given language. */
export function researchPath(lang: string): string {
  if (lang === 'en') return '/research'
  if (lang === 'fr') return '/fr/research'
  return `/research/${lang}`
}

/** All language variants, in the order shown in the on-page language bar. */
export const RESEARCH_LANG_VARIANTS: { code: string; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pl', label: 'Polski' },
  { code: 'cs', label: 'Čeština' },
  { code: 'th', label: 'ไทย' },
  { code: 'ja', label: '日本語' },
]

/** hreflang map shared by every variant of the page. */
export function researchHreflangAlternates(): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const v of RESEARCH_LANG_VARIANTS) {
    languages[v.code] = researchUrl(v.code)
  }
  languages['x-default'] = researchUrl('en')
  return languages
}

export const OG_LOCALES: Record<string, string> = {
  en: 'en_US',
  fr: 'fr_CA',
  th: 'th_TH',
  ja: 'ja_JP',
  pl: 'pl_PL',
  de: 'de_DE',
  cs: 'cs_CZ',
  it: 'it_IT',
}
