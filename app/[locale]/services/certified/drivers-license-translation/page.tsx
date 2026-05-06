import { Metadata } from 'next'
import DriversLicenseContent from './DriversLicenseContent'

export const metadata: Metadata = {
  title: "Driver's License Translation Services | Alberta Registries Approved",
  description: "Government of Alberta approved driver's license translation services. Certified translations accepted by Service Alberta, Alberta Registries, and all provincial licensing authorities. From $55, same-day available.",
  keywords: [
    "driver's license translation Alberta",
    "certified translation Service Alberta",
    "foreign license translation Canada",
    "Alberta Registry translation services",
    "driver's license translation Edmonton",
    "vehicle registration translation",
    "Government of Alberta approved translator",
  ],
  alternates: {
    canonical: 'https://cethos.com/services/certified/drivers-license-translation',
  },
  openGraph: {
    title: "Driver's License Translation | Government of Alberta Approved",
    description: 'Certified translations for Service Alberta and Alberta Registries. From $55.',
    url: 'https://cethos.com/services/certified/drivers-license-translation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function DriversLicenseTranslationPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: "Driver's License Translation Services",
            provider: {
              '@type': 'LocalBusiness',
              name: 'Cethos Solutions Inc.',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '421 7 Avenue SW, Floor 30',
                addressLocality: 'Calgary',
                addressRegion: 'AB',
                postalCode: 'T2P 4K9',
                addressCountry: 'CA',
              },
              telephone: '+1-587-600-0786',
            },
            areaServed: {
              '@type': 'State',
              name: 'Alberta',
            },
            serviceType: 'Certified Translation',
            offers: {
              '@type': 'Offer',
              price: '55.00',
              priceCurrency: 'CAD',
              priceSpecification: {
                '@type': 'PriceSpecification',
                minPrice: '55.00',
                priceCurrency: 'CAD',
              },
            },
          }),
        }}
      />
      <DriversLicenseContent />
    </>
  )
}
