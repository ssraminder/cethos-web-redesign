import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/i18n/nav-translations?locale=fr
 *
 * Returns all published translations for the 'nav' namespace for a given locale.
 * Used by the web component header/footer to translate nav labels from the DB.
 * Returns a flat { "English Text": "Translated Text" } map.
 */
export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale')

  if (!locale || locale === 'en') {
    return NextResponse.json(
      { translations: {} },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    )
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY!
    )

    // Find the 'nav' namespace
    const { data: ns } = await supabase
      .from('cethosweb_i18n_namespaces')
      .select('id')
      .eq('name', 'nav')
      .single()

    if (!ns) {
      return NextResponse.json(
        { translations: {} },
        { headers: { 'Cache-Control': 'public, s-maxage=300' } }
      )
    }

    // Fetch published translations for this locale
    const { data: rows } = await supabase
      .from('cethosweb_i18n_translations')
      .select('key, value')
      .eq('namespace_id', ns.id)
      .eq('locale', locale)
      .eq('status', 'published')
      .order('key')

    // Build the translation map: key = English text, value = translated text
    const translations: Record<string, string> = {}
    if (rows) {
      for (const row of rows) {
        translations[row.key] = row.value
      }
    }

    return NextResponse.json(
      { translations },
      { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' } }
    )
  } catch {
    return NextResponse.json(
      { translations: {} },
      { headers: { 'Cache-Control': 'public, s-maxage=60' } }
    )
  }
}
