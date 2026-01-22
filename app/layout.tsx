import type { Metadata } from 'next'
import { Header, Footer } from '@/components/layout'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Cethos | Professional Translation Services',
    template: '%s | Cethos',
  },
  description: 'Expert translation services in 200+ languages. Life sciences, certified, business, software localization, and multimedia translation with precision and speed.',
  keywords: ['translation services', 'localization', 'language services', 'certified translation', 'life sciences translation', 'software localization'],
  authors: [{ name: 'Cethos' }],
  creator: 'Cethos Translation Services',
  metadataBase: new URL('https://cethos.com'),
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
        alt: 'Cethos Translation Services',
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
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
