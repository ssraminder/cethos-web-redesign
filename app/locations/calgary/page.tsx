import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Calgary Translation & Interpretation Services | 2 Locations | Cethos',
  description: 'Translation and interpretation services in Calgary. 2 locations: Downtown & NE Calgary. IRCC certified. Birth certificates, marriage certificates, immigration documents. 139 five-star reviews. Same-day available. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations/calgary'
  }
};

// Second location (Redstone NE) LocalBusiness schema
const redstoneJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Cethos Translation Services - Calgary NE (Redstone)',
  description: 'Certified translation services in NE Calgary. IRCC accepted. By appointment.',
  url: 'https://cethos.com/locations/calgary',
  telephone: '+1-587-600-0786',
  email: 'info@cethos.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '220 Red Sky Terrace NE',
    addressLocality: 'Calgary',
    addressRegion: 'AB',
    postalCode: 'T3N 1M9',
    addressCountry: 'CA',
  },
  areaServed: {
    '@type': 'City',
    name: 'Calgary',
  },
  priceRange: '$$',
};

export default function CalgaryTranslationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(redstoneJsonLd) }}
      />
      <LocationPageTemplate
        city="Calgary"
        province="Alberta"
        provinceCode="AB"
        h1="Translation & Interpretation Services in Calgary"
        hasSameDay={true}
        pnpProgram="Alberta Advantage Immigration Program (AAIP)"
        pnpName="Alberta Advantage Immigration Program"
        topLanguages={['Tagalog', 'Punjabi', 'Mandarin', 'Spanish', 'Arabic', 'Hindi', 'Urdu', 'French', 'Vietnamese', 'Korean']}
        serviceAreas={['Downtown', 'Beltline', 'Kensington', 'Bridgeland', 'NE Calgary', 'Redstone', 'Martindale', 'Taradale', 'Falconridge', 'Forest Lawn', 'NW Calgary', 'SE Calgary', 'SW Calgary', 'Mission', 'Inglewood', 'McKenzie Towne', 'Sundance', 'Evanston', 'Dalhousie', 'Signal Hill']}
        nearbyAreas={['Airdrie', 'Cochrane', 'Okotoks', 'Chestermere', 'High River', 'Canmore', 'Banff', 'Strathmore', 'Crossfield']}
        uniqueFeatures={[
          'Two Calgary locations — Downtown (Floor 30, 421 7 Ave SW) and NE Calgary (220 Red Sky Terrace NE)',
          'Government of Alberta approved translator',
          'Same-day service available',
          'In-person document pickup available at both locations',
          'Walk-in consultations available by appointment'
        ]}
        faqs={[
          {
            question: 'Where are your Calgary translation offices located?',
            answer: 'We have two locations in Calgary. Our downtown headquarters is at 421 7 Avenue SW, Floor 30, Calgary, AB T2P 4K9. Our NE Calgary office is at 220 Red Sky Terrace NE, Calgary, AB T3N 1M9 (by appointment). Walk-in consultations are available by appointment at both locations.'
          },
          {
            question: 'Do you offer same-day certified translation in Calgary?',
            answer: 'Yes! Calgary is our headquarters and we offer same-day certified translation service. Submit your documents by morning for same-day completion.'
          },
          {
            question: 'Is your Calgary translation service accepted by IRCC?',
            answer: 'Absolutely. Our certified translations are 100% accepted by IRCC for all immigration applications including Express Entry, family sponsorship, and citizenship.'
          },
          {
            question: 'How much does certified translation cost in Calgary?',
            answer: 'Certified translation starts from $65 per document. This includes translation, certification, and notarization. Get a free instant quote online.'
          },
          {
            question: 'What languages do you translate in Calgary?',
            answer: 'We translate from 200+ languages in Calgary. Popular languages include Tagalog, Punjabi, Mandarin, Spanish, Arabic, Hindi, Urdu, and French. Visit our language-specific pages for Arabic, French, Hindi, Mandarin, Punjabi, and Spanish translation.'
          },
          {
            question: 'Can I pick up my translated documents in Calgary?',
            answer: 'Yes! You can pick up your documents at either our downtown or NE Calgary office, or we can deliver via email and mail. Same-day pickup is available for rush orders.'
          },
          {
            question: 'Do you offer interpretation services in Calgary?',
            answer: 'Yes, we provide professional interpretation services in Calgary including on-site, over-the-phone (OPI), and video remote interpretation (VRI) in 200+ languages. Available for medical, legal, business, and conference settings.'
          }
        ]}
      />
    </>
  );
}
