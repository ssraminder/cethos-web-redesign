import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data: locales, error } = await supabase
      .from('cethosweb_locales')
      .select('id, language_name, country_name, locale_code')
      .order('language_name')

    if (error) {
      console.error('Locales fetch error:', error)
      throw error
    }

    // Format locales for display
    const formattedLocales = locales.map(locale => ({
      id: locale.id,
      value: locale.locale_code,
      label: locale.country_name
        ? `${locale.language_name} (${locale.country_name})`
        : locale.language_name,
      languageName: locale.language_name,
      countryName: locale.country_name,
    }))

    return NextResponse.json({ locales: formattedLocales })
  } catch (error) {
    console.error('Error fetching locales:', error)
    return NextResponse.json(
      { error: 'Failed to fetch locales' },
      { status: 500 }
    )
  }
}
