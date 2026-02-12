import { createBrowserSupabaseClient } from '@/lib/supabase'

function getSupabase() {
  try { return createBrowserSupabaseClient() } catch { return null }
}

export async function getSetting(key: string) {
  const supabase = getSupabase()
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
  const supabase = getSupabase()
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
