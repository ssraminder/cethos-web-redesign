import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { Toaster } from 'sonner'
import { CethosHeader, CethosFooter } from '@/components/layout'
import PublicLayoutWrapper from '@/components/layout/PublicLayoutWrapper'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLd'
import { GoogleTagManager } from '@/components/GoogleTagManager'
import { getSettingServer } from '@/lib/settings-server'
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

const DEFAULT_OG_IMAGE_FALLBACK = 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/og-image-cethos.jpg'

export async function generateMetadata(): Promise<Metadata> {
  const ogImageUrl = await getSettingServer('default_og_image') || DEFAULT_OG_IMAGE_FALLBACK

  return {
    title: {
      default: 'Cethos Solutions Inc. | Professional Translation Services',
      template: '%s | Cethos',
    },
    description: 'Expert translation services in 200+ languages. Specializing in life sciences, linguistic validation, clinical trials, and certified translations. ISO 17100 compliant. Serving Canada and clients worldwide.',
    keywords: ['translation services', 'localization', 'language services', 'certified translation', 'life sciences translation', 'linguistic validation', 'clinical trial translation', 'software localization'],
    authors: [{ name: 'Cethos Solutions Inc.' }],
    creator: 'Cethos Solutions Inc.',
    metadataBase: new URL('https://cethos.com'),
    alternates: {
      canonical: 'https://cethos.com',
      languages: {
        'en': 'https://cethos.com',
        'x-default': 'https://cethos.com',
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/final_favicon_cethosAsset%202.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-touch-icon.png',
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
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Cethos Solutions — Professional Translation Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Cethos Solutions Inc. | Professional Translation Services',
      description: 'Expert translation services in 200+ languages. Life sciences, linguistic validation, clinical trials, certified translations.',
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
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
        {/* LocalBusinessJsonLd rendered on individual pages (homepage, locations, contact) — not site-wide */}
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Toaster position="top-right" richColors closeButton />
        <GoogleTagManager />
        <PublicLayoutWrapper
          header={<CethosHeader ctaType="login" />}
          footer={<CethosFooter />}
        >
          {children}
        </PublicLayoutWrapper>
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
