'use client'

import { useCallback } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { WEBCHAT_DEFAULTS, type WebchatKey } from './strings'

/**
 * Copy lookup for the chat widget: DB-backed next-intl namespace `webchat`
 * first, bundled defaults (strings.ts) when a key hasn't been seeded yet.
 */
export function useWebchatCopy() {
  const t = useTranslations('webchat')
  const locale = useLocale()

  return useCallback(
    (key: WebchatKey, vars?: Record<string, string>): string => {
      if (t.has(key)) return t(key, vars)
      const fallback = WEBCHAT_DEFAULTS[locale === 'fr' ? 'fr' : 'en'][key]
      return vars ? fallback.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? '') : fallback
    },
    [t, locale],
  )
}
