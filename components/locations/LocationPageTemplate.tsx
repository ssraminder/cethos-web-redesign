'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, CheckCircle, Clock, Shield, Star, Globe, FileText, Users } from 'lucide-react';
import { CertifiedQuoteForm } from '@/components/forms/CertifiedQuoteForm';
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs';

interface LocationPageProps {
  city: string;
  province: string;
  provinceCode: string;
  h1: string;
  hasSameDay: boolean;
  pnpProgram: string;
  pnpName: string;
  topLanguages: string[];
  serviceAreas: string[];
  nearbyAreas: string[];
  uniqueFeatures: string[];
  faqs: { question: string; answer: string }[];
  frenchContent?: boolean;
}

export default function LocationPageTemplate({
  city,
  province,
  provinceCode,
  h1,
  hasSameDay,
  pnpProgram,
  pnpName,
  topLanguages,
  serviceAreas,
  nearbyAreas,
  uniqueFeatures,
  faqs,
  frenchContent = false
}: LocationPageProps) {

  // Certified subpages for internal linking
  const certifiedServices = [
    { label: 'Immigration Translation Services', href: '/services/certified/immigration-translation-services' },
    { label: 'Birth Certificate Translation', href: '/services/certified/birth-certificate-translation' },
    { label: 'Marriage Certificate Translation', href: '/services/certified/marriage-certificate-translation' },
    { label: 'Academic Transcript Translation', href: '/services/certified/academic-transcript-translation' },
    { label: 'PR & Citizenship Translation', href: '/services/certified/pr-citizenship-translation' },
    { label: "Driver's License Translation", href: '/services/certified/drivers-license-translation' }
  ];

  // All location pages for cross-linking
  const allLocations = [
    { label: 'Calgary', href: '/locations/calgary' },
    { label: 'Edmonton', href: '/locations/edmonton' },
    { label: 'Toronto', href: '/locations/toronto' },
    { label: 'Vancouver', href: '/locations/vancouver' },
    { label: 'Ottawa', href: '/locations/ottawa' },
    { label: 'Montreal', href: '/locations/montreal' },
    { label: 'Winnipeg', href: '/locations/winnipeg' },
    { label: 'Halifax', href: '/locations/halifax' },
    { label: 'Saskatoon', href: '/locations/saskatoon' }
  ].filter(loc => loc.label !== city);

  // Documents we translate
  const documents = [
    'Birth Certificates',
    'Marriage Certificates',
    'Divorce Decrees',
    'Death Certificates',
    'Academic Transcripts',
    'Diplomas & Degrees',
    'Police Clearance Certificates',
    "Driver's Licenses",
    'Medical Records',
    'Bank Statements',
    'Employment Letters',
    'Affidavits'
  ];

  // Breadcrumb items for Breadcrumbs component (uses name/url)
  const breadcrumbItems = [
    { name: 'Locations', url: '/locations' },
    { name: city, url: `/locations/${city.toLowerCase()}` }
  ];

  // Schema markup
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Cethos Translation Services - ${city}`,
    "description": `${city} translation services - Certified IRCC translation for immigration, birth certificates, marriage certificates`,
    "url": `https://cethos.com/locations/${city.toLowerCase()}`,
    "telephone": "(587) 600-0786",
    "email": "info@cethos.com",
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "139"
    },
    "areaServed": {
      "@type": "City",
      "name": city
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": provinceCode,
      "addressCountry": "CA"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section with Quote Form */}
      <section id="quote-form" className="bg-gradient-to-br from-[#0C2340] to-[#0a1c33] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-8 [&_a]:text-teal-400 [&_a:hover]:text-teal-300 [&_span]:text-gray-400 [&_svg]:text-gray-500" />

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {h1}
              </h1>

              {frenchContent && (
                <p className="text-xl text-teal-300 mb-4">
                  Services de traduction certifiee a {city}
                </p>
              )}

              <p className="text-xl text-gray-300 mb-8">
                Certified IRCC translation for immigration, birth certificates,
                marriage certificates & all official documents in {city}.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <span>IRCC 100% Accepted</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>139 Five-Star Reviews</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span>Certified & Notarized</span>
                </div>
                {hasSameDay ? (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-teal-400" />
                    <span>Same-Day Available</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-teal-400" />
                    <span>Fast Turnaround</span>
                  </div>
                )}
              </div>

              {/* Price Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-8">
                <span className="text-teal-400 font-semibold">From $65</span>
                <span className="text-gray-300">per document</span>
              </div>

              {/* Phone CTA */}
              <div className="flex items-center gap-4">
                <a
                  href="tel:+15876000786"
                  className="inline-flex items-center gap-2 bg-white text-[#0C2340] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  (587) 600-0786
                </a>
              </div>
            </div>

            {/* Right Column - Quote Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-6 lg:p-8">
              <h2 className="text-2xl font-bold text-[#0C2340] mb-2">
                Get a Free Quote
              </h2>
              <p className="text-gray-600 mb-6">
                Upload your document for an instant quote.
              </p>
              <CertifiedQuoteForm formLocation={`location-${city.toLowerCase()}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Certified Translation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
            Certified Translation {city} - IRCC Accepted
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              Cethos provides professional <strong>certified translation in {city}</strong> for
              all IRCC immigration applications. Our translations are 100% accepted by Immigration,
              Refugees and Citizenship Canada (IRCC) for Express Entry, Provincial Nominee Programs,
              family sponsorship, and citizenship applications.
            </p>
            <p>
              Every <strong>certified translation</strong> includes a signed certificate of accuracy,
              translator credentials, and notarization - meeting all government requirements. With
              <strong> 139 five-star Google reviews</strong>, we&apos;re trusted by thousands of immigrants
              across Canada.
            </p>
            {uniqueFeatures.length > 0 && (
              <ul className="mt-4">
                {uniqueFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="mt-8">
            <Link
              href="/services/certified"
              className="inline-flex items-center text-[#0891B2] font-semibold hover:text-[#06B6D4] transition-colors"
            >
              Learn more about our Certified Translation Services &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Immigration Translation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
            Immigration Translation {city} for PR & Citizenship
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 mb-8">
            <p>
              Our <strong>immigration translation services in {city}</strong> support all
              IRCC programs and the <strong>{pnpName}</strong>. Whether you&apos;re applying for
              permanent residence, citizenship, or a work permit, we ensure your documents
              meet all requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Express Entry',
              `${pnpProgram}`,
              'Family Sponsorship',
              'Citizenship Applications',
              'Study Permits',
              'Work Permits'
            ].map((program, index) => (
              <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                <span className="text-gray-800 font-medium">{program}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services/certified/immigration-translation-services"
              className="inline-flex items-center text-[#0891B2] font-semibold hover:text-[#06B6D4] transition-colors"
            >
              Immigration Translation Services &rarr;
            </Link>
            <Link
              href="/services/certified/pr-citizenship-translation"
              className="inline-flex items-center text-[#0891B2] font-semibold hover:text-[#06B6D4] transition-colors"
            >
              PR & Citizenship Translation &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Birth Certificate Translation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
                Birth Certificate Translation {city}
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  <strong>Birth certificate translation in {city}</strong> is required for
                  most immigration applications. IRCC requires certified translations of all
                  foreign-language birth certificates for Express Entry, family sponsorship,
                  and citizenship applications.
                </p>
                <p>
                  We translate birth certificates from <strong>200+ languages</strong> with
                  guaranteed IRCC acceptance. Each translation includes certification and
                  notarization.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/services/certified/birth-certificate-translation"
                  className="inline-flex items-center gap-2 bg-[#0891B2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Birth Certificate Translation &rarr;
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-[#0C2340] mb-4">Popular Languages</h3>
              <div className="flex flex-wrap gap-2">
                {topLanguages.slice(0, 8).map((lang, index) => (
                  <span
                    key={index}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                  >
                    {lang}
                  </span>
                ))}
                <span className="bg-[#0891B2] px-3 py-1 rounded-full text-sm text-white">
                  +200 more
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marriage Certificate Translation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold text-[#0C2340] mb-4">Required For:</h3>
              <ul className="space-y-3">
                {[
                  'Spouse Sponsorship Applications',
                  'Family Class Immigration',
                  'Name Change Documentation',
                  'Citizenship Applications',
                  'Provincial Services'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
                Marriage Certificate Translation {city}
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  <strong>Marriage certificate translation in {city}</strong> is essential
                  for spouse sponsorship and family immigration applications. We provide
                  certified translations of marriage certificates from any country.
                </p>
                <p>
                  Our translations meet all IRCC requirements for family class immigration
                  and spousal sponsorship programs.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/services/certified/marriage-certificate-translation"
                  className="inline-flex items-center gap-2 bg-[#0891B2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  Marriage Certificate Translation &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Translation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
            Document Translation {city} - All Official Documents
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl">
            We provide <strong>document translation in {city}</strong> for all types of
            official documents. Every translation is certified and notarized for government acceptance.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg"
              >
                <FileText className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                <span className="text-gray-800">{doc}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/services/certified/academic-transcript-translation"
              className="inline-flex items-center text-[#0891B2] font-semibold hover:text-[#06B6D4] transition-colors"
            >
              Academic Transcript Translation &rarr;
            </Link>
            <Link
              href="/services/certified/drivers-license-translation"
              className="inline-flex items-center text-[#0891B2] font-semibold hover:text-[#06B6D4] transition-colors"
            >
              Driver&apos;s License Translation &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#0C2340]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Why Choose Cethos in {city}?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'IRCC 100% Acceptance',
                description: 'All translations guaranteed accepted by IRCC for immigration applications.'
              },
              {
                icon: Star,
                title: '139 Five-Star Reviews',
                description: 'Trusted by thousands of immigrants across Canada.'
              },
              {
                icon: CheckCircle,
                title: 'Certified & Notarized',
                description: 'Every translation includes certification and notarization.'
              },
              {
                icon: Globe,
                title: '200+ Languages',
                description: 'We translate from virtually any language in the world.'
              },
              {
                icon: Clock,
                title: hasSameDay ? 'Same-Day Available' : 'Fast Turnaround',
                description: hasSameDay
                  ? 'Need it today? Same-day service available in Calgary.'
                  : 'Rush service available for urgent deadlines.'
              },
              {
                icon: Users,
                title: 'Expert Translators',
                description: 'Certified translators with immigration document expertise.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#0891B2] rounded-xl mb-4">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
              Certified Translation Pricing
            </h2>

            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#0891B2] rounded-2xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-[#0C2340] mb-2">
                From $65
              </div>
              <div className="text-gray-600 mb-6">per document</div>

              <ul className="space-y-3 text-left max-w-xs mx-auto mb-8">
                {[
                  'Certified translation',
                  'Notarization included',
                  'Digital + hard copy delivery',
                  'IRCC accepted',
                  '139 five-star reviews'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="#quote-form"
                className="inline-flex items-center gap-2 bg-[#0891B2] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#06B6D4] transition-colors text-lg"
              >
                Get Your Free Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-12 text-center">
            How It Works
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Upload Document', description: 'Submit your document online securely' },
              { step: '2', title: 'Get Instant Quote', description: 'Receive pricing immediately' },
              { step: '3', title: 'We Translate', description: 'Expert translation & certification' },
              { step: '4', title: 'Receive Documents', description: 'Digital delivery + mail' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0891B2] text-white text-xl font-bold rounded-full mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
            Languages We Translate in {city}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            We provide certified translation from <strong>200+ languages</strong>.
            Popular languages in {city} include:
          </p>

          <div className="flex flex-wrap gap-3">
            {topLanguages.map((lang, index) => (
              <span
                key={index}
                className="bg-gray-100 px-4 py-2 rounded-full text-gray-800 font-medium"
              >
                {lang}
              </span>
            ))}
            <span className="bg-[#0891B2] px-4 py-2 rounded-full text-white font-medium">
              + 200 more languages
            </span>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
            Service Areas in {city}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#0C2340] mb-4">
                {city} Neighborhoods
              </h3>
              <div className="flex flex-wrap gap-2">
                {serviceAreas.map((area, index) => (
                  <span
                    key={index}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0C2340] mb-4">
                Nearby Cities
              </h3>
              <div className="flex flex-wrap gap-2">
                {nearbyAreas.map((area, index) => (
                  <span
                    key={index}
                    className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Certified Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-8">
            Other Certified Translation Services
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifiedServices.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
              >
                <FileText className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                <span className="text-gray-800 group-hover:text-[#0891B2] transition-colors">
                  {service.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Serving Across Canada */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-8 text-center">
            Serving Across Canada
          </h2>

          <div className="flex flex-wrap justify-center gap-4">
            {allLocations.map((location, index) => (
              <Link
                key={index}
                href={location.href}
                className="bg-gray-100 px-6 py-3 rounded-lg text-gray-800 font-medium hover:bg-[#0891B2] hover:text-white transition-colors"
              >
                {location.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#0891B2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Get Certified Translation in {city} Today
          </h2>
          <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
            IRCC-accepted translations from $65. 139 five-star reviews.
            {hasSameDay ? ' Same-day service available.' : ' Fast turnaround.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0891B2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Get Your Free Quote
            </a>
            <a
              href="tel:+15876000786"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-lg"
            >
              <Phone className="w-5 h-5" />
              (587) 600-0786
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
