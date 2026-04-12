import { getRequestConfig } from 'next-intl/server'
import { loadMessages, isValidLocale, DEFAULT_LOCALE } from '@/lib/i18n'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = requested && isValidLocale(requested) ? requested : DEFAULT_LOCALE

  const messages = await loadMessages(locale)

  return {
    locale,
    messages,
    // Fallback: show key name wrapped in brackets for missing translations
    onError(error) {
      if (error.code === 'MISSING_MESSAGE') return
      console.error('next-intl error:', error)
    },
    getMessageFallback({ key, namespace }) {
      return `[${namespace}.${key}]`
    },
  }
})
