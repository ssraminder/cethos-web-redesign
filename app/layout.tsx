import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from 'sonner'
import { CethosHeader, CethosFooter } from '@/components/layout'
import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd } from '@/components/JsonLd'
import { GoogleTagManager } from '@/components/GoogleTagManager'
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

export const metadata: Metadata = {
  title: {
    default: 'Cethos Solutions Inc. | Professional Translation Services',
    template: '%s | Cethos',
  },
  description: 'Expert translation services in 200+ languages. Specializing in life sciences, linguistic validation, clinical trials, and certified translations. ISO compliant, Calgary-based with global reach.',
  keywords: ['translation services', 'localization', 'language services', 'certified translation', 'life sciences translation', 'linguistic validation', 'clinical trial translation', 'software localization'],
  authors: [{ name: 'Cethos Solutions Inc.' }],
  creator: 'Cethos Solutions Inc.',
  metadataBase: new URL('https://cethos.com'),
  alternates: {
    canonical: 'https://cethos.com',
  },
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
    siteName: 'Cethos Solutions Inc.',
    title: 'Cethos Solutions Inc. | Professional Translation Services',
    description: 'Expert translation services in 200+ languages. Life sciences, linguistic validation, clinical trials, certified translations.',
    images: [
      {
        url: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_logo_light_bg_cethosAsset%201.svg',
        width: 1200,
        height: 630,
        alt: 'Cethos Solutions Inc.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cethos Solutions Inc. | Professional Translation Services',
    description: 'Expert translation services in 200+ languages. Life sciences, linguistic validation, clinical trials, certified translations.',
    images: ['https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_logo_light_bg_cethosAsset%201.svg'],
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
    <html lang="en" className={plusJakartaSans.className} suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Toaster position="top-right" richColors closeButton />
        <GoogleTagManager />
        <CethosHeader ctaType="login" />
        <main>{children}</main>
        <CethosFooter />
        {/* Tawk.to Live Chat Widget - lazy loaded for better LCP */}
        <Script id="tawk-to" strategy="lazyOnload">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/62477a0b2abe5b455fc31fd7/1fvjj9fse';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>
      </body>
    </html>
  )
}
