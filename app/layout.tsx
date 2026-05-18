import type { Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { PostHogProvider } from '@/components/PostHogProvider'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import './globals.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0C2340',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={DEFAULT_LOCALE} className={plusJakartaSans.className} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
