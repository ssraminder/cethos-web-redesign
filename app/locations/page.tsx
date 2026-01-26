import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Translation Services Across Canada | Cethos Locations',
  description: 'Certified IRCC translation services across Canada. Serving Calgary, Edmonton, Toronto, Vancouver, Ottawa, Montreal, Winnipeg, Halifax, and Saskatoon. From $65.',
  alternates: {
    canonical: 'https://cethos.com/locations'
  }
};

const locations = [
  { city: 'Calgary', province: 'Alberta', href: '/locations/calgary', hasSameDay: true, isHQ: true },
  { city: 'Edmonton', province: 'Alberta', href: '/locations/edmonton', hasSameDay: false, isHQ: false },
  { city: 'Toronto', province: 'Ontario', href: '/locations/toronto', hasSameDay: false, isHQ: false },
  { city: 'Vancouver', province: 'British Columbia', href: '/locations/vancouver', hasSameDay: false, isHQ: false },
  { city: 'Ottawa', province: 'Ontario', href: '/locations/ottawa', hasSameDay: false, isHQ: false },
  { city: 'Montreal', province: 'Quebec', href: '/locations/montreal', hasSameDay: false, isHQ: false },
  { city: 'Winnipeg', province: 'Manitoba', href: '/locations/winnipeg', hasSameDay: false, isHQ: false },
  { city: 'Halifax', province: 'Nova Scotia', href: '/locations/halifax', hasSameDay: false, isHQ: false },
  { city: 'Saskatoon', province: 'Saskatchewan', href: '/locations/saskatoon', hasSameDay: false, isHQ: false },
];

export default function LocationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0C2340] to-[#0a1c33] pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Certified Translation Across Canada
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            IRCC-accepted translation services from coast to coast.
            139 five-star reviews. From $65 per document.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((location) => (
              <Link
                key={location.href}
                href={location.href}
                className="group bg-gray-50 rounded-xl p-6 hover:bg-[#0891B2] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg group-hover:bg-white/20 transition-colors">
                    <MapPin className="w-6 h-6 text-[#0891B2] group-hover:text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-[#0C2340] group-hover:text-white mb-1">
                      {location.city}
                      {location.isHQ && (
                        <span className="ml-2 text-xs bg-[#0891B2] text-white px-2 py-0.5 rounded group-hover:bg-white group-hover:text-[#0891B2]">
                          HQ
                        </span>
                      )}
                    </h2>
                    <p className="text-gray-600 group-hover:text-gray-200">
                      {location.province}
                    </p>
                    {location.hasSameDay && (
                      <p className="text-sm text-[#0891B2] group-hover:text-teal-200 mt-2">
                        Same-day available
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0891B2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Get Your Certified Translation Today
          </h2>
          <p className="text-xl text-teal-50 mb-8">
            IRCC-accepted translations from $65. Fast turnaround. 139 five-star reviews.
          </p>
          <Link
            href="/get-quote"
            className="inline-flex items-center gap-2 bg-white text-[#0891B2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            Get Your Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
