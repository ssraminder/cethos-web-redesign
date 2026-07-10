import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  // English uses no prefix (cethos.com/services), French uses /fr/ prefix
  localePrefix: 'as-needed',
  // Never auto-redirect based on the NEXT_LOCALE cookie or Accept-Language:
  // one visit to any /fr page used to pin the browser to French for every
  // subsequent unprefixed URL (cethos.com/apply -> /fr/apply). Unprefixed
  // URLs always serve English; French stays reachable via explicit /fr links.
  localeDetection: false,
  localeCookie: false,
})

// Localized navigation helpers (Link, redirect, usePathname, useRouter)
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
