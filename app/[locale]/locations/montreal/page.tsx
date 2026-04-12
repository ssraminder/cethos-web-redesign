import { Metadata } from 'next';
import LocationPageTemplate from '@/components/locations/LocationPageTemplate';

export const metadata: Metadata = {
  title: "Montreal Translation Services | Services de traduction a Montreal | Cethos",
  description: "Services de traduction certifiee a Montreal. Accepte par IRCC. Traduction d'actes de naissance, certificats de mariage et documents d'immigration. 139 avis 5 etoiles. A partir de 65$.",
  alternates: {
    canonical: 'https://cethos.com/locations/montreal'
  }
};

export default function MontrealTranslationPage() {
  return (
    <LocationPageTemplate
      city="Montreal"
      province="Quebec"
      provinceCode="QC"
      h1="Montreal Translation Services"
      hasSameDay={false}
      pnpProgram="Quebec Immigration Programs (QSWP, PEQ)"
      pnpName="Quebec Skilled Worker Program and Quebec Experience Program"
      topLanguages={['French', 'Arabic', 'Spanish', 'Mandarin', 'Haitian Creole', 'Portuguese', 'Italian', 'Vietnamese', 'Romanian', 'Russian', 'Greek']}
      serviceAreas={['Downtown Montreal', 'Plateau Mont-Royal', 'NDG', 'Cote-des-Neiges', 'Verdun', 'Hochelaga', 'Rosemont', 'Villeray']}
      nearbyAreas={['Laval', 'Longueuil', 'Brossard', 'Terrebonne', 'Blainville', 'Saint-Jerome', 'Chateauguay', 'West Island']}
      uniqueFeatures={[
        'French-first approach with bilingual service',
        'Quebec immigration program expertise (QSWP, PEQ)',
        'OQLF and Bill 96 compliance knowledge',
        'Serving all Greater Montreal communities'
      ]}
      frenchContent={true}
      faqs={[
        {
          question: 'Avez-vous un bureau de traduction a Montreal? / Do you have a Montreal office?',
          answer: 'Nous servons Montreal avec livraison numerique et par courrier rapide. La plupart des clients recoivent leurs documents en 24-48 heures. / We serve Montreal with fast digital and courier delivery. Most clients receive documents within 24-48 hours.'
        },
        {
          question: "Vos traductions sont-elles acceptees pour l'immigration au Quebec?",
          answer: "Oui! Nos traductions certifiees sont acceptees pour le Programme des travailleurs qualifies du Quebec (PTQQ), le PEQ, et toutes les demandes d'IRCC."
        },
        {
          question: 'Are your translations accepted for Quebec immigration programs?',
          answer: 'Yes! Our certified translations are accepted for the Quebec Skilled Worker Program (QSWP), Quebec Experience Program (PEQ), and all IRCC applications.'
        },
        {
          question: 'Do you translate from French to English?',
          answer: 'Yes! We translate both directions: French to English and English to French, plus 200+ other languages.'
        },
        {
          question: 'Traduisez-vous les documents en creole haitien?',
          answer: "Oui! Nous traduisons le creole haitien, le francais, l'arabe, l'espagnol et plus de 200 autres langues."
        },
        {
          question: 'Do you serve Laval and the South Shore?',
          answer: 'Yes! We serve all Greater Montreal including Laval, Longueuil, Brossard, and all surrounding communities.'
        }
      ]}
    />
  );
}
