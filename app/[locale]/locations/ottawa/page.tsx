import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Ottawa Translation Services | Certified IRCC Translation | Cethos',
  description: 'Certified translation services in Ottawa-Gatineau. IRCC accepted. Birth certificate, marriage certificate & immigration document translation. 139 five-star reviews. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations/ottawa'
  }
};

export default function OttawaTranslationPage() {
  return (
    <LocationPageTemplate
      city="Ottawa"
      province="Ontario"
      provinceCode="ON"
      h1="Ottawa Translation Services"
      hasSameDay={false}
      pnpProgram="Ontario Immigrant Nominee Program (OINP)"
      pnpName="Ontario Immigrant Nominee Program"
      topLanguages={['Arabic', 'Mandarin', 'French', 'Spanish', 'Somali', 'Farsi', 'Vietnamese', 'Tagalog', 'Hindi', 'Amharic']}
      serviceAreas={['Downtown Ottawa', 'Centretown', 'The Glebe', 'Sandy Hill', 'Byward Market', 'Westboro', 'Alta Vista', 'Vanier']}
      nearbyAreas={['Gatineau', 'Kanata', 'Orleans', 'Nepean', 'Barrhaven', 'Stittsville', 'Manotick', 'Rockland']}
      uniqueFeatures={[
        'Bilingual English-French expertise',
        'Serving Ottawa-Gatineau region (Ontario & Quebec)',
        'Federal government document experience',
        'Fast digital delivery across the National Capital Region'
      ]}
      faqs={[
        {
          question: 'Do you have an Ottawa translation office?',
          answer: 'We serve Ottawa and Gatineau with fast digital and courier delivery. Most National Capital Region clients receive documents within 24-48 hours.'
        },
        {
          question: 'Do you translate both English and French documents?',
          answer: 'Yes! We offer full bilingual services, translating documents to and from English and French, plus 200+ other languages.'
        },
        {
          question: 'Are your translations accepted for Ontario PNP?',
          answer: 'Yes! Our certified translations are 100% accepted for OINP and all IRCC immigration applications.'
        },
        {
          question: 'Do you serve Gatineau and Quebec residents?',
          answer: 'Absolutely! We serve the entire Ottawa-Gatineau region, including clients on both sides of the provincial border.'
        },
        {
          question: 'Can you translate documents for federal government applications?',
          answer: 'Yes! We provide certified translations for all government purposes including citizenship, immigration, and other federal applications.'
        },
        {
          question: 'How fast can I get documents translated in Ottawa?',
          answer: 'Standard turnaround is 2-3 business days. Rush service (24-48 hours) is available for urgent deadlines.'
        }
      ]}
    />
  );
}
