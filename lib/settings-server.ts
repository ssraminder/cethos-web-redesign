import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export async function getSettingServer(key: string): Promise<string | null> {
  if (!supabase) return null
  try {
    const { data } = await supabase
      .from('cethosweb_settings')
      .select('value')
      .eq('key', key)
      .single()
    return data?.value ?? null
  } catch {
    return null
  }
}
