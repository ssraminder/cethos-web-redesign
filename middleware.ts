import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match all paths except: _next, embed, api, admin, static files
  matcher: ['/((?!_next|embed|api|admin|favicon|.*\\..*).*)'],
}
