import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import { Toaster } from 'sonner'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { CethosHeader, CethosFooter } from '@/components/layout'
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLdServer'
import { GoogleTagManager } from '@/components/GoogleTagManager'
import { getSettingServer } from '@/lib/settings-server'
import { isValidLocale, type Locale } from '@/lib/i18n'

const DEFAULT_OG_IMAGE_FALLBACK = 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/og-image-cethos.jpg'

// Generate static params for all supported locales (enables static rendering)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = params

  if (!isValidLocale(locale)) return {}

  const ogImageUrl = await getSettingServer('default_og_image') || DEFAULT_OG_IMAGE_FALLBACK

  const isDefault = locale === 'en'
  const baseUrl = 'https://cethos.com'

  return {
    title: {
      default: 'Cethos Solutions Inc. | Professional Translation Services',
      template: '%s | Cethos',
    },
    description: 'Expert translation services in 200+ languages. Specializing in life sciences, linguistic validation, clinical trials, and certified translations. ISO 17100 compliant. Serving Canada and clients worldwide.',
    keywords: ['translation services', 'localization', 'language services', 'certified translation', 'life sciences translation', 'linguistic validation', 'clinical trial translation', 'software localization'],
    authors: [{ name: 'Cethos Solutions Inc.' }],
    creator: 'Cethos Solutions Inc.',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: isDefault ? baseUrl : `${baseUrl}/fr`,
      languages: {
        'en': baseUrl,
        'fr': `${baseUrl}/fr`,
        'x-default': baseUrl,
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
      locale: isDefault ? 'en_US' : 'fr_CA',
      url: isDefault ? baseUrl : `${baseUrl}/fr`,
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = params

  // Guard: reject unsupported locales (prevents /de/ rendering with <html lang="de">)
  if (!isValidLocale(locale)) {
    notFound()
  }

  // Enable static rendering for this locale
  setRequestLocale(locale)

  // Load messages for next-intl
  const messages = await getMessages()

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <Toaster position="top-right" richColors closeButton />
      <GoogleTagManager />
      <NextIntlClientProvider messages={messages}>
        <CethosHeader ctaType="login" locale={locale} />
        <main>{children}</main>
        <CethosFooter locale={locale} />
      </NextIntlClientProvider>
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
    </>
  )
}
