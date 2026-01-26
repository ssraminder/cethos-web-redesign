import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: 'Winnipeg Translation Services | Certified IRCC Translation | Cethos',
  description: 'Certified translation services in Winnipeg. IRCC accepted for Manitoba PNP & immigration. Birth certificate & marriage certificate translation. 139 five-star reviews. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations/winnipeg'
  }
};

export default function WinnipegTranslationPage() {
  return (
    <LocationPageTemplate
      city="Winnipeg"
      province="Manitoba"
      provinceCode="MB"
      h1="Winnipeg Translation Services"
      hasSameDay={false}
      pnpProgram="Manitoba Provincial Nominee Program (MPNP)"
      pnpName="Manitoba Provincial Nominee Program"
      topLanguages={['Tagalog', 'Punjabi', 'Mandarin', 'Ukrainian', 'German', 'Hindi', 'Arabic', 'French', 'Vietnamese', 'Spanish']}
      serviceAreas={['Downtown Winnipeg', 'St. Boniface', 'West End', 'North End', 'St. Vital', 'Transcona', 'St. James', 'River Heights']}
      nearbyAreas={['Brandon', 'Steinbach', 'Portage la Prairie', 'Selkirk', 'Winkler', 'Morden', 'Thompson']}
      uniqueFeatures={[
        "Manitoba PNP expertise (one of Canada's most popular provincial programs)",
        'Strong Tagalog and Filipino language services',
        'Ukrainian document translation expertise',
        'Fast digital delivery across Manitoba'
      ]}
      faqs={[
        {
          question: 'Do you have a Winnipeg translation office?',
          answer: 'We serve Winnipeg with fast digital and courier delivery. Most Manitoba clients receive documents within 24-48 hours.'
        },
        {
          question: 'Are your translations accepted for Manitoba PNP (MPNP)?',
          answer: 'Yes! Our certified translations are 100% accepted for the Manitoba Provincial Nominee Program and all IRCC applications.'
        },
        {
          question: 'Do you translate Filipino/Tagalog documents?',
          answer: "Absolutely! We have extensive expertise in Tagalog and other Filipino languages, serving Winnipeg's large Filipino community."
        },
        {
          question: 'What documents do I need for MPNP?',
          answer: 'Common documents include birth certificates, marriage certificates, police clearances, academic credentials, and employment references. All foreign-language documents need certified translation.'
        },
        {
          question: 'Do you translate Ukrainian documents?',
          answer: "Yes! We have strong expertise in Ukrainian document translation, serving Manitoba's Ukrainian community."
        },
        {
          question: 'How fast can I get documents translated in Winnipeg?',
          answer: 'Standard turnaround is 2-3 business days. Rush service (24-48 hours) is available for urgent deadlines.'
        }
      ]}
    />
  );
}
