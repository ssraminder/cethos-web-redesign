import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// Fallback languages in case database fetch fails
const FALLBACK_LANGUAGES = [
  { id: '1', language_name: 'Spanish', native_name: 'Español' },
  { id: '2', language_name: 'French', native_name: 'Français' },
  { id: '3', language_name: 'German', native_name: 'Deutsch' },
  { id: '4', language_name: 'Italian', native_name: 'Italiano' },
  { id: '5', language_name: 'Portuguese', native_name: 'Português' },
  { id: '6', language_name: 'Japanese', native_name: '日本語' },
  { id: '7', language_name: 'Chinese', native_name: '中文' },
  { id: '8', language_name: 'Korean', native_name: '한국어' },
  { id: '9', language_name: 'Arabic', native_name: 'العربية' },
  { id: '10', language_name: 'Russian', native_name: 'Русский' },
  { id: '11', language_name: 'Dutch', native_name: 'Nederlands' },
  { id: '12', language_name: 'Hindi', native_name: 'हिन्दी' },
  { id: '13', language_name: 'Punjabi', native_name: 'ਪੰਜਾਬੀ' },
  { id: '14', language_name: 'Tagalog', native_name: 'Tagalog' },
  { id: '15', language_name: 'Vietnamese', native_name: 'Tiếng Việt' },
  { id: '16', language_name: 'Polish', native_name: 'Polski' },
  { id: '17', language_name: 'Ukrainian', native_name: 'Українська' },
  { id: '18', language_name: 'Turkish', native_name: 'Türkçe' },
  { id: '19', language_name: 'Thai', native_name: 'ไทย' },
  { id: '20', language_name: 'Greek', native_name: 'Ελληνικά' },
]

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // Query unique languages from the locales table
    const { data: locales, error } = await supabase
      .from('cethosweb_locales')
      .select('id, language_name, native_name')
      .order('language_name')

    if (error || !locales || locales.length === 0) {
      console.error('[API/languages] Error or no data:', error)
      return NextResponse.json(FALLBACK_LANGUAGES)
    }

    // Get unique languages by language_name
    const uniqueLanguages = locales.reduce((acc: typeof locales, locale) => {
      if (!acc.find(l => l.language_name === locale.language_name)) {
        acc.push(locale)
      }
      return acc
    }, [])

    return NextResponse.json(uniqueLanguages)
  } catch (error) {
    console.error('[API/languages] Unexpected error:', error)
    return NextResponse.json(FALLBACK_LANGUAGES)
  }
}
