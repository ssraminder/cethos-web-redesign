import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// Fallback locales in case database fetch fails
const FALLBACK_LOCALES = [
  { id: '1', language_name: 'English', country_name: 'United States', locale_code: 'en-US' },
  { id: '2', language_name: 'English', country_name: 'United Kingdom', locale_code: 'en-GB' },
  { id: '3', language_name: 'Spanish', country_name: 'Spain', locale_code: 'es-ES' },
  { id: '4', language_name: 'Spanish', country_name: 'Mexico', locale_code: 'es-MX' },
  { id: '5', language_name: 'French', country_name: 'France', locale_code: 'fr-FR' },
  { id: '6', language_name: 'French', country_name: 'Canada', locale_code: 'fr-CA' },
  { id: '7', language_name: 'German', country_name: 'Germany', locale_code: 'de-DE' },
  { id: '8', language_name: 'Italian', country_name: 'Italy', locale_code: 'it-IT' },
  { id: '9', language_name: 'Portuguese', country_name: 'Brazil', locale_code: 'pt-BR' },
  { id: '10', language_name: 'Japanese', country_name: 'Japan', locale_code: 'ja-JP' },
  { id: '11', language_name: 'Chinese', country_name: 'China', locale_code: 'zh-CN' },
  { id: '12', language_name: 'Korean', country_name: 'South Korea', locale_code: 'ko-KR' },
  { id: '13', language_name: 'Arabic', country_name: 'Saudi Arabia', locale_code: 'ar-SA' },
  { id: '14', language_name: 'Russian', country_name: 'Russia', locale_code: 'ru-RU' },
  { id: '15', language_name: 'Dutch', country_name: 'Netherlands', locale_code: 'nl-NL' },
]

export async function GET() {
  console.log('[API/locales] Starting locale fetch...')
  console.log('[API/locales] Environment check:', {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET (length: ' + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length + ')' : 'NOT SET',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
  })

  try {
    const supabase = createServerSupabaseClient()
    console.log('[API/locales] Supabase client created successfully')

    console.log('[API/locales] Querying cethosweb_locales table...')
    const { data: locales, error, status, statusText } = await supabase
      .from('cethosweb_locales')
      .select('id, language_name, country_name, locale_code')
      .order('language_name')

    console.log('[API/locales] Query response:', {
      status,
      statusText,
      hasData: !!locales,
      dataCount: locales?.length || 0,
      error: error ? { message: error.message, code: error.code, details: error.details } : null
    })

    if (error) {
      console.error('[API/locales] Supabase error:', error)
      console.log('[API/locales] Using fallback locales due to error')

      // Return fallback locales with source indicator
      const formattedFallback = FALLBACK_LOCALES.map(locale => ({
        id: locale.id,
        value: locale.locale_code,
        label: locale.country_name
          ? `${locale.language_name} (${locale.country_name})`
          : locale.language_name,
        languageName: locale.language_name,
        countryName: locale.country_name,
      }))

      return NextResponse.json({
        locales: formattedFallback,
        source: 'fallback',
        reason: error.message
      })
    }

    if (!locales || locales.length === 0) {
      console.warn('[API/locales] No locales returned from database, using fallback')

      const formattedFallback = FALLBACK_LOCALES.map(locale => ({
        id: locale.id,
        value: locale.locale_code,
        label: locale.country_name
          ? `${locale.language_name} (${locale.country_name})`
          : locale.language_name,
        languageName: locale.language_name,
        countryName: locale.country_name,
      }))

      return NextResponse.json({
        locales: formattedFallback,
        source: 'fallback',
        reason: 'no_data_returned'
      })
    }

    console.log(`[API/locales] Successfully fetched ${locales.length} locales from database`)
    console.log('[API/locales] Sample locales:', locales.slice(0, 3))

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

    return NextResponse.json({
      locales: formattedLocales,
      source: 'database',
      count: formattedLocales.length
    })
  } catch (error) {
    console.error('[API/locales] Unexpected error:', error)

    // Return fallback locales
    const formattedFallback = FALLBACK_LOCALES.map(locale => ({
      id: locale.id,
      value: locale.locale_code,
      label: locale.country_name
        ? `${locale.language_name} (${locale.country_name})`
        : locale.language_name,
      languageName: locale.language_name,
      countryName: locale.country_name,
    }))

    return NextResponse.json({
      locales: formattedFallback,
      source: 'fallback',
      reason: error instanceof Error ? error.message : 'unknown_error'
    })
  }
}
