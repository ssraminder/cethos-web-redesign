import { createClient, SupabaseClient } from '@supabase/supabase-js'

let automationsClient: SupabaseClient | null = null

export function createCethosAutomationsClient(): SupabaseClient {
  if (automationsClient) return automationsClient

  const supabaseUrl = process.env.CETHOS_AUTOMATIONS_URL
  const supabaseServiceKey = process.env.CETHOS_AUTOMATIONS_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Cethos Automations Supabase environment variables (CETHOS_AUTOMATIONS_URL, CETHOS_AUTOMATIONS_SERVICE_ROLE_KEY)'
    )
  }

  automationsClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
  return automationsClient
}
