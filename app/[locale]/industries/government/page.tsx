import { Metadata } from 'next'
import IndustryPageTemplate from '@/components/industries/IndustryPageTemplate'

export const metadata: Metadata = {
  title: 'Government & Public Sector Translation Services | Cethos',
  description: 'Certified translation for government and public sector: immigration (IRCC), courts, official languages, citizen services, and policy documents in 200+ languages. PIPEDA-compliant.',
  keywords: ['government translation', 'public sector translation', 'IRCC translation', 'court translation', 'official languages translation', 'municipal translation', 'certified government translation', 'PIPEDA translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/government',
  },
  openGraph: {
    title: 'Government & Public Sector Translation Services | Cethos Solutions',
    description: 'Certified, privacy-compliant translation for federal, provincial, and municipal government — immigration, courts, official languages, and citizen services.',
    type: 'website',
    url: 'https://cethos.com/industries/government',
  },
}

export default function GovernmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Government & Public Sector Translation Services",
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
            "areaServed": "Canada",
            "description": "Certified, privacy-compliant translation for federal, provincial, and municipal government — immigration (IRCC), courts, official languages, citizen services, and policy documents in 200+ languages."
          })
        }}
      />

      <IndustryPageTemplate base="government" />
    </>
  )
}
