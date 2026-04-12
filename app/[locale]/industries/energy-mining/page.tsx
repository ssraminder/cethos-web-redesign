import { Metadata } from 'next'
import EnergyMiningPageContent from './EnergyMiningPageContent'

export const metadata: Metadata = {
  title: 'Energy & Mining Translation Services | Oil & Gas | Cethos',
  description: 'Technical translation services for oil & gas, mining, and renewable energy companies. HSE documentation, regulatory filings, and technical manuals in 200+ languages. Based in Calgary, Canada.',
  keywords: ['oil and gas translation', 'energy translation services', 'mining translation', 'HSE translation', 'technical translation Calgary', 'oilfield translation', 'petroleum translation', 'energy sector translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/energy-mining',
  },
  openGraph: {
    title: 'Energy & Mining Translation Services | Cethos Solutions',
    description: 'Technical translation for global energy operations. Based in Calgary, serving oil & gas, mining, and renewable energy companies worldwide.',
    type: 'website',
    url: 'https://cethos.com/industries/energy-mining',
  },
}

export default function EnergyMiningPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Energy & Mining Translation Services",
            "provider": {
              "@type": "Organization",
              "name": "Cethos Solutions Inc.",
              "url": "https://cethos.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "421 7 Avenue SW, Floor 30",
                "addressLocality": "Calgary",
                "addressRegion": "AB",
                "postalCode": "T2P 4K9",
                "addressCountry": "CA"
              }
            },
            "serviceType": "Translation Services",
            "areaServed": "Worldwide",
            "description": "Technical translation services for oil & gas, mining, and renewable energy companies. HSE documentation, regulatory filings, technical manuals, and legal contracts in 200+ languages."
          })
        }}
      />

      <EnergyMiningPageContent />
    </>
  )
}
