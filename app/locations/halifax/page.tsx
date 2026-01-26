import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Halifax Translation Services | Certified IRCC Translation | Cethos',
  description: 'Certified translation services in Halifax & Nova Scotia. IRCC accepted. Birth certificate, marriage certificate & immigration document translation. 139 five-star reviews. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations/halifax'
  }
};

export default function HalifaxTranslationPage() {
  return (
    <LocationPageTemplate
      city="Halifax"
      province="Nova Scotia"
      provinceCode="NS"
      h1="Halifax Translation Services"
      hasSameDay={false}
      pnpProgram="Nova Scotia Nominee Program (NSNP) & Atlantic Immigration Program (AIP)"
      pnpName="Nova Scotia Nominee Program and Atlantic Immigration Program"
      topLanguages={['Arabic', 'Mandarin', 'Tagalog', 'Korean', 'Spanish', 'Farsi', 'French', 'Hindi', 'Urdu', 'Lebanese Arabic']}
      serviceAreas={['Downtown Halifax', 'North End', 'South End', 'West End', 'Clayton Park', 'Bedford', 'Dartmouth', 'Cole Harbour']}
      nearbyAreas={['Dartmouth', 'Bedford', 'Sackville', 'Truro', 'New Glasgow', 'Sydney', 'Moncton (NB)', 'Charlottetown (PEI)']}
      uniqueFeatures={[
        'Atlantic Immigration Program (AIP) expertise',
        'Nova Scotia Nominee Program (NSNP) experience',
        'Serving all Maritime provinces (NS, NB, PEI)',
        'Fast digital delivery across Atlantic Canada'
      ]}
      faqs={[
        {
          question: 'Do you have a Halifax translation office?',
          answer: 'We serve Halifax and all Atlantic Canada with fast digital and courier delivery. Most clients receive documents within 24-48 hours.'
        },
        {
          question: 'Are your translations accepted for Atlantic Immigration Program (AIP)?',
          answer: 'Yes! Our certified translations are 100% accepted for the Atlantic Immigration Program, Nova Scotia Nominee Program, and all IRCC applications.'
        },
        {
          question: 'Do you serve New Brunswick and PEI?',
          answer: 'Absolutely! We serve all Maritime provinces including Nova Scotia, New Brunswick, and Prince Edward Island.'
        },
        {
          question: 'What languages do you translate in Halifax?',
          answer: 'We translate from 200+ languages. Popular languages in Halifax include Arabic, Mandarin, Tagalog, Korean, and Farsi.'
        },
        {
          question: 'How fast can I get documents translated in Halifax?',
          answer: 'Standard turnaround is 2-3 business days. Rush service (24-48 hours) is available for urgent deadlines.'
        },
        {
          question: 'Can you translate documents for Dalhousie University applications?',
          answer: 'Yes! We provide certified translation for academic transcripts, diplomas, and other documents required for Maritime university applications.'
        }
      ]}
    />
  );
}
