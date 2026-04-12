import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  // English uses no prefix (cethos.com/services), French uses /fr/ prefix
  localePrefix: 'as-needed',
})

// Localized navigation helpers (Link, redirect, usePathname, useRouter)
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
