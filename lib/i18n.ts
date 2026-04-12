import { createClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Supabase client — null if env vars are missing (dev without DB)
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null

export const PUBLIC_LOCALES = ['en', 'fr'] as const
export const DEFAULT_LOCALE: Locale = 'en'
export type Locale = (typeof PUBLIC_LOCALES)[number]

export function isValidLocale(value: string): value is Locale {
  return (PUBLIC_LOCALES as readonly string[]).includes(value)
}

/**
 * Translation value with HTML flag for safe rendering.
 */
export interface TranslationValue {
  text: string
  isHtml: boolean
}

/**
 * Messages format compatible with next-intl.
 * Supports arbitrarily nested structures (namespace > section > key).
 */
export type Messages = Record<string, unknown>

/**
 * Fetch all published translations for a namespace + locale from Supabase.
 * Multi-segment keys are concatenated by segment_index order.
 * Falls back to English for any missing keys when locale !== 'en'.
 */
export const getNamespaceMessages = unstable_cache(
  async (namespace: string, locale: Locale): Promise<Record<string, string>> => {
    if (!supabase) return {}

    // Get namespace ID
    const { data: ns } = await supabase
      .from('cethosweb_i18n_namespaces')
      .select('id')
      .eq('name', namespace)
      .single()

    if (!ns) return {}

    // Fetch target locale (published only)
    const { data: rows } = await supabase
      .from('cethosweb_i18n_translations')
      .select('key, segment_index, value')
      .eq('namespace_id', ns.id)
      .eq('locale', locale)
      .eq('status', 'published')
      .order('key')
      .order('segment_index')

    const result: Record<string, string> = {}
    if (rows) {
      for (const row of rows) {
        if (result[row.key] !== undefined) {
          result[row.key] += ' ' + row.value
        } else {
          result[row.key] = row.value
        }
      }
    }

    // Fallback to English for missing keys
    if (locale !== 'en') {
      const { data: enRows } = await supabase
        .from('cethosweb_i18n_translations')
        .select('key, segment_index, value')
        .eq('namespace_id', ns.id)
        .eq('locale', 'en')
        .eq('status', 'published')
        .order('key')
        .order('segment_index')

      if (enRows) {
        const enResult: Record<string, string> = {}
        for (const row of enRows) {
          if (enResult[row.key] !== undefined) {
            enResult[row.key] += ' ' + row.value
          } else {
            enResult[row.key] = row.value
          }
        }
        // Merge: only fill in missing keys
        for (const [key, value] of Object.entries(enResult)) {
          if (result[key] === undefined) {
            result[key] = value
          }
        }
      }
    }

    return result
  },
  ['i18n-ns'],
  {
    revalidate: 60,
    tags: ['translations'],
  }
)

/**
 * Load all messages for a given locale, organized by namespace.
 * This is the function that feeds into next-intl's getRequestConfig.
 */
export async function loadMessages(locale: Locale): Promise<Messages> {
    if (!supabase) return {}

    // Get all namespaces
    const { data: namespaces } = await supabase
      .from('cethosweb_i18n_namespaces')
      .select('id, name')
      .order('sort_order')

    if (!namespaces || namespaces.length === 0) return {}

    const nsMap = new Map(namespaces.map((ns) => [ns.id, ns.name]))

    // Single bulk query for all translations in this locale
    // Supabase default limit is 1000, so paginate
    const allRows: Array<{ namespace_id: string; key: string; segment_index: number; value: string }> = []
    let offset = 0
    const pageSize = 1000
    while (true) {
      const { data: rows } = await supabase
        .from('cethosweb_i18n_translations')
        .select('namespace_id, key, segment_index, value')
        .eq('locale', locale)
        .eq('status', 'published')
        .order('namespace_id')
        .order('key')
        .order('segment_index')
        .range(offset, offset + pageSize - 1)

      if (!rows || rows.length === 0) break
      allRows.push(...rows)
      if (rows.length < pageSize) break
      offset += pageSize
    }

    // If not English, also fetch English for fallback
    if (locale !== 'en') {
      const enRows: typeof allRows = []
      let enOffset = 0
      while (true) {
        const { data: rows } = await supabase
          .from('cethosweb_i18n_translations')
          .select('namespace_id, key, segment_index, value')
          .eq('locale', 'en')
          .eq('status', 'published')
          .order('namespace_id')
          .order('key')
          .order('segment_index')
          .range(enOffset, enOffset + pageSize - 1)

        if (!rows || rows.length === 0) break
        enRows.push(...rows)
        if (rows.length < pageSize) break
        enOffset += pageSize
      }

      // Add English rows for keys missing in target locale
      const localeKeys = new Set(allRows.map((r) => `${r.namespace_id}:${r.key}:${r.segment_index}`))
      for (const row of enRows) {
        const k = `${row.namespace_id}:${row.key}:${row.segment_index}`
        if (!localeKeys.has(k)) {
          allRows.push(row)
        }
      }
    }

    // Group by namespace, concatenate multi-segment keys
    const nsMsgs = new Map<string, Record<string, string>>()
    for (const row of allRows) {
      const nsName = nsMap.get(row.namespace_id)
      if (!nsName) continue
      if (!nsMsgs.has(nsName)) nsMsgs.set(nsName, {})
      const msgs = nsMsgs.get(nsName)!
      if (msgs[row.key] !== undefined && row.segment_index > 0) {
        msgs[row.key] += ' ' + row.value
      } else {
        msgs[row.key] = row.value
      }
    }

    // Build nested message structure
    const messages: Record<string, unknown> = {}
    for (const [nsName, flatMsgs] of Array.from(nsMsgs.entries())) {
      if (Object.keys(flatMsgs).length === 0) continue

      // Convert dot-separated keys (e.g. 'hero.title') into nested objects
      const nested: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(flatMsgs)) {
        const keyParts = key.split('.')
        if (keyParts.length === 1) {
          nested[key] = value
        } else {
          let cur: Record<string, unknown> = nested
          for (let i = 0; i < keyParts.length - 1; i++) {
            if (!cur[keyParts[i]] || typeof cur[keyParts[i]] !== 'object') {
              cur[keyParts[i]] = {}
            }
            cur = cur[keyParts[i]] as Record<string, unknown>
          }
          cur[keyParts[keyParts.length - 1]] = value
        }
      }

      // Convert dot-separated namespace (e.g. 'homepage.hero') into nested object
      const parts = nsName.split('.')
      let current: Record<string, unknown> = messages
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {}
        current = current[parts[i]] as Record<string, unknown>
      }
      current[parts[parts.length - 1]] = nested
    }

    return messages as Messages
}

/**
 * Fetch localized SEO metadata for a page.
 * Falls back to English if the target locale metadata doesn't exist.
 */
export const getPageMetadata = unstable_cache(
  async (pagePath: string, locale: Locale) => {
    if (!supabase) return null

    const { data } = await supabase
      .from('cethosweb_i18n_metadata')
      .select('title, description, keywords, og_title, og_description')
      .eq('page_path', pagePath)
      .eq('locale', locale)
      .eq('status', 'published')
      .single()

    if (data) return data

    // Fallback to English
    if (locale !== 'en') {
      const { data: enData } = await supabase
        .from('cethosweb_i18n_metadata')
        .select('title, description, keywords, og_title, og_description')
        .eq('page_path', pagePath)
        .eq('locale', 'en')
        .eq('status', 'published')
        .single()

      return enData
    }

    return null
  },
  ['i18n-metadata'],
  { revalidate: 60, tags: ['translations'] }
)

/**
 * Fetch localized structured content (services, locations, industries).
 */
export const getStructuredContent = unstable_cache(
  async (contentType: string, contentKey: string, locale: Locale) => {
    if (!supabase) return null

    const { data } = await supabase
      .from('cethosweb_i18n_structured')
      .select('data')
      .eq('content_type', contentType)
      .eq('content_key', contentKey)
      .eq('locale', locale)
      .eq('status', 'published')
      .single()

    if (data) return data.data

    // Fallback to English
    if (locale !== 'en') {
      const { data: enData } = await supabase
        .from('cethosweb_i18n_structured')
        .select('data')
        .eq('content_type', contentType)
        .eq('content_key', contentKey)
        .eq('locale', 'en')
        .eq('status', 'published')
        .single()

      return enData?.data ?? null
    }

    return null
  },
  ['i18n-structured'],
  { revalidate: 60, tags: ['translations'] }
)

/**
 * Get the localized href for a path (adds /fr/ prefix for non-default locales).
 */
export function localizedHref(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path
  return `/${locale}${path}`
}
