import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Calgary Translation Services | Certified IRCC Translation | Cethos',
  description: 'Certified translation services in Calgary. IRCC accepted. Birth certificate, marriage certificate & immigration document translation. 139 five-star reviews. Same-day available. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations/calgary'
  }
};

export default function CalgaryTranslationPage() {
  return (
    <LocationPageTemplate
      city="Calgary"
      province="Alberta"
      provinceCode="AB"
      h1="Calgary Translation Services"
      hasSameDay={true}
      pnpProgram="Alberta Advantage Immigration Program (AAIP)"
      pnpName="Alberta Advantage Immigration Program"
      topLanguages={['Tagalog', 'Punjabi', 'Mandarin', 'Spanish', 'Arabic', 'Hindi', 'Urdu', 'French', 'Vietnamese', 'Korean']}
      serviceAreas={['Downtown', 'Beltline', 'Kensington', 'Bridgeland', 'NE Calgary', 'NW Calgary', 'SE Calgary', 'SW Calgary', 'Mission', 'Inglewood']}
      nearbyAreas={['Airdrie', 'Cochrane', 'Okotoks', 'Chestermere', 'High River', 'Canmore', 'Banff']}
      uniqueFeatures={[
        'Headquarters location - walk-in consultations available (by appointment)',
        'Government of Alberta approved translator',
        'Same-day service available',
        'In-person document pickup available'
      ]}
      faqs={[
        {
          question: 'Where is your Calgary translation office located?',
          answer: 'Our Calgary headquarters is located at 421 7 Avenue SW, Floor 30, Calgary, AB T2P 4K9. Walk-in consultations are available by appointment.'
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
          answer: 'We translate from 200+ languages in Calgary. Popular languages include Tagalog, Punjabi, Mandarin, Spanish, Arabic, Hindi, Urdu, and French.'
        },
        {
          question: 'Can I pick up my translated documents in Calgary?',
          answer: 'Yes! You can pick up your documents at our Calgary office, or we can deliver via email and mail. Same-day pickup is available for rush orders.'
        }
      ]}
    />
  );
}
