import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if env vars exist
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export async function getSetting(key: string) {
  if (!supabase) return null

  try {
    const { data } = await supabase
      .from('cethosweb_settings')
      .select('value')
      .eq('key', key)
      .single()
    return data?.value
  } catch (error) {
    console.error('Failed to fetch setting:', key, error)
    return null
  }
}

export async function getTrackingSettings() {
  if (!supabase) return {}

  try {
    const { data } = await supabase
      .from('cethosweb_settings')
      .select('key, value')
      .in('key', ['gtm', 'ga4', 'google_ads'])

    return data?.reduce((acc, row) => {
      acc[row.key] = row.value
      return acc
    }, {} as Record<string, any>) || {}
  } catch (error) {
    console.error('Failed to fetch tracking settings:', error)
    return {}
  }
}
