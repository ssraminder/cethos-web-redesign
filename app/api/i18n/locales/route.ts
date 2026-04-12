import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

/**
 * Returns the list of locales that have FULLY published translations.
 * A locale is only included if it has >= 95% of English keys published.
 * English is always included as the default.
 * Cached for 5 minutes.
 */

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  fr: 'Fran\u00e7ais',
  es: 'Espa\u00f1ol',
  de: 'Deutsch',
  ja: '\u65e5\u672c\u8a9e',
  zh: '\u4e2d\u6587',
  ko: '\ud55c\uad6d\uc5b4',
  pt: 'Portugu\u00eas',
  it: 'Italiano',
  ar: '\u0627\u0644\u0639\u0631\u0628\u064a\u0629',
  ru: '\u0420\u0443\u0441\u0441\u043a\u0438\u0439',
}

const COMPLETENESS_THRESHOLD = 0.95 // 95% of English keys must be published

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY!
    )

    // Count distinct English published keys (our baseline)
    const { count: enCount } = await supabase
      .from('cethosweb_i18n_translations')
      .select('*', { count: 'exact', head: true })
      .eq('locale', 'en')
      .eq('status', 'published')

    const englishKeyCount = enCount || 0

    // Get all non-English locales with their published key counts
    const knownLocales = ['fr', 'es', 'de', 'ja', 'zh', 'ko', 'pt', 'it', 'ar', 'ru']
    const qualifiedLocales: string[] = ['en'] // English always included

    if (englishKeyCount > 0) {
      for (const locale of knownLocales) {
        const { count } = await supabase
          .from('cethosweb_i18n_translations')
          .select('*', { count: 'exact', head: true })
          .eq('locale', locale)
          .eq('status', 'published')

        const localeCount = count || 0
        const completeness = localeCount / englishKeyCount

        if (completeness >= COMPLETENESS_THRESHOLD) {
          qualifiedLocales.push(locale)
        }
      }
    }

    const locales = qualifiedLocales
      .sort((a, b) => (a === 'en' ? -1 : b === 'en' ? 1 : a.localeCompare(b)))
      .map(code => ({
        code,
        label: LOCALE_LABELS[code] || code.toUpperCase(),
        shortLabel: code.toUpperCase(),
      }))

    return NextResponse.json(
      { locales },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    )
  } catch {
    return NextResponse.json(
      { locales: [{ code: 'en', label: 'English', shortLabel: 'EN' }] },
      { headers: { 'Cache-Control': 'public, s-maxage=60' } }
    )
  }
}
