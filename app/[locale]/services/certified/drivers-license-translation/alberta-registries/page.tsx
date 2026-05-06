import { Metadata } from 'next'
import AlbertaRegistriesContent from './AlbertaRegistriesContent'

export const metadata: Metadata = {
  title: "Driver's License Translation for Alberta Registries | Calgary, Lethbridge & Edmonton | Cethos",
  description:
    "Certified driver's license translations for Alberta Registries in Calgary, Lethbridge, and Edmonton. Same-day service available. Trusted by registry offices across Alberta. From $35.",
  keywords: [
    "driver's license translation Alberta Registries",
    "license translation Calgary registry",
    "license translation Lethbridge registry",
    "license translation Edmonton registry",
    "Alberta registry certified translation",
    "foreign driver's license translation Alberta",
    "Service Alberta translation",
    "Alberta registry approved translation",
  ],
  alternates: {
    canonical: 'https://cethos.com/services/certified/drivers-license-translation/alberta-registries',
  },
  openGraph: {
    title: "Driver's License Translation for Alberta Registries | Calgary, Lethbridge & Edmonton",
    description:
      "Certified translations accepted by Alberta Registries. Trusted partners across Calgary, Lethbridge, and Edmonton. Same-day available.",
    url: 'https://cethos.com/services/certified/drivers-license-translation/alberta-registries',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

export default function AlbertaRegistriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: "Driver's License Translation for Alberta Registries",
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
            areaServed: [
              { '@type': 'City', name: 'Calgary', containedInPlace: { '@type': 'Province', name: 'Alberta' } },
              { '@type': 'City', name: 'Lethbridge', containedInPlace: { '@type': 'Province', name: 'Alberta' } },
              { '@type': 'City', name: 'Edmonton', containedInPlace: { '@type': 'Province', name: 'Alberta' } },
            ],
            serviceType: 'Certified Translation',
            offers: {
              '@type': 'Offer',
              price: '35.00',
              priceCurrency: 'CAD',
            },
          }),
        }}
      />
      <AlbertaRegistriesContent />
    </>
  )
}
