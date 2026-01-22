import type { Metadata, Viewport } from 'next'
import { Header, Footer } from '@/components/layout'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLd'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: 'Cethos | Professional Translation Services',
    template: '%s | Cethos',
  },
  description: 'Expert translation services in 200+ languages. Life sciences, certified, business, software localization, and multimedia translation with precision and speed.',
  keywords: ['translation services', 'localization', 'language services', 'certified translation', 'life sciences translation', 'software localization'],
  authors: [{ name: 'Cethos Solutions Inc.' }],
  creator: 'Cethos Solutions Inc.',
  metadataBase: new URL('https://cethos.com'),
  icons: {
    icon: [
      { url: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_favicon_cethosAsset%202.svg', type: 'image/svg+xml' },
    ],
    apple: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_favicon_cethosAsset%202.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cethos.com',
    siteName: 'Cethos',
    title: 'Cethos | Professional Translation Services',
    description: 'Expert translation services in 200+ languages with precision and speed.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cethos Solutions Inc.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cethos | Professional Translation Services',
    description: 'Expert translation services in 200+ languages with precision and speed.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
      </head>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
