import { Metadata } from 'next';
import LocationsIndexContent from './LocationsIndexContent';

export const metadata: Metadata = {
  title: 'Translation Services Across Canada | Cethos Locations',
  description: 'Certified IRCC translation services across Canada. Serving Calgary, Edmonton, Toronto, Vancouver, Ottawa, Montreal, Winnipeg, Halifax, and Saskatoon. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations'
  }
};

export default function LocationsPage() {
  return <LocationsIndexContent />;
}
