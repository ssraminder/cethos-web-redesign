import { createClient } from '@supabase/supabase-js'

// Server-side Supabase client (for API routes)
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

// Client-side Supabase client (for fetching locales in browser)
export function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Database types
export interface Locale {
  id: number
  language_name: string
  country_name: string
  locale_code: string
  language_code: string
  native_display_name: string | null
  is_common: boolean
  is_active: boolean
}

export interface DocumentType {
  id: string
  code: string
  name: string
  description: string | null
  is_active: boolean
  sort_order: number | null
}

export interface IntendedUse {
  id: string
  code: string
  name: string
  description: string | null
  typical_complexity: string | null
  is_active: boolean
  sort_order: number | null
}

export interface QuoteSubmission {
  id: string
  service_type: string
  full_name: string
  email: string
  phone: string
  company_name: string
  job_title: string | null
  source_language: string
  target_languages: string[]
  word_count: number | null
  deadline: string
  additional_notes: string
  service_data: Record<string, unknown>
  file_urls: string[]
  created_at: string
}

export interface QuoteFile {
  id: string
  quote_id: string
  file_name: string
  storage_path: string
  created_at: string
}
