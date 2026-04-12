'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, CheckCircle, Clock, Shield, Star, Globe, FileText, Users } from 'lucide-react';
import { CertifiedQuoteForm } from '@/components/forms/CertifiedQuoteForm';
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs';
import { useTranslations } from 'next-intl';

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

  const t = useTranslations('locations.template');

  // Certified subpages for internal linking
  const certifiedServices = [
    { label: t('cert_svc1'), href: '/services/certified/immigration-translation-services' },
    { label: t('cert_svc2'), href: '/services/certified/birth-certificate-translation' },
    { label: t('cert_svc3'), href: '/services/certified/marriage-certificate-translation' },
    { label: t('cert_svc4'), href: '/services/certified/academic-transcript-translation' },
    { label: t('cert_svc5'), href: '/services/certified/pr-citizenship-translation' },
    { label: t('cert_svc6'), href: '/services/certified/drivers-license-translation' }
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
    t('doc_birth'),
    t('doc_marriage'),
    t('doc_divorce'),
    t('doc_death'),
    t('doc_academic'),
    t('doc_diplomas'),
    t('doc_police'),
    t('doc_drivers'),
    t('doc_medical'),
    t('doc_bank'),
    t('doc_employment'),
    t('doc_affidavits')
  ];

  // Breadcrumb items for Breadcrumbs component (uses name/url)
  const breadcrumbItems = [
    { name: t('breadcrumb_locations'), url: '/locations' },
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
                  {t('hero_french_subtitle', { city })}
                </p>
              )}

              <p className="text-xl text-gray-300 mb-8">
                {t('hero_description', { city })}
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <CheckCircle className="w-5 h-5 text-teal-400" />
                  <span>{t('trust_ircc')}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>{t('trust_reviews')}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span>{t('trust_certified')}</span>
                </div>
                {hasSameDay ? (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-teal-400" />
                    <span>{t('trust_sameday')}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5 text-teal-400" />
                    <span>{t('trust_fast')}</span>
                  </div>
                )}
              </div>

              {/* Price Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-8">
                <span className="text-teal-400 font-semibold">{t('price_from')}</span>
                <span className="text-gray-300">{t('price_per_doc')}</span>
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
              <h2 className="text-2xl font-bold text-[#0C2340] mb-6">
                {t('get_free_quote')}
              </h2>
              <CertifiedQuoteForm formLocation={`location-${city.toLowerCase()}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Certified Translation Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
            {t('certified_heading', { city })}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p dangerouslySetInnerHTML={{ __html: t('certified_p1', { city }) }} />
            <p dangerouslySetInnerHTML={{ __html: t('certified_p2') }} />
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
              {t('certified_link')} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Immigration Translation Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
            {t('immigration_heading', { city })}
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 mb-8">
            <p dangerouslySetInnerHTML={{ __html: t('immigration_desc', { city, pnpName }) }} />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              t('immigration_express'),
              `${pnpProgram}`,
              t('immigration_family'),
              t('immigration_citizenship'),
              t('immigration_study'),
              t('immigration_work')
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
              {t('immigration_link1')} &rarr;
            </Link>
            <Link
              href="/services/certified/pr-citizenship-translation"
              className="inline-flex items-center text-[#0891B2] font-semibold hover:text-[#06B6D4] transition-colors"
            >
              {t('immigration_link2')} &rarr;
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
                {t('birth_heading', { city })}
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p dangerouslySetInnerHTML={{ __html: t('birth_p1', { city }) }} />
                <p dangerouslySetInnerHTML={{ __html: t('birth_p2') }} />
              </div>
              <div className="mt-6">
                <Link
                  href="/services/certified/birth-certificate-translation"
                  className="inline-flex items-center gap-2 bg-[#0891B2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  {t('birth_link')} &rarr;
                </Link>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-[#0C2340] mb-4">{t('popular_languages')}</h3>
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
                  {t('plus_200_more')}
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
              <h3 className="text-xl font-semibold text-[#0C2340] mb-4">{t('marriage_required_for')}</h3>
              <ul className="space-y-3">
                {[
                  t('marriage_req1'),
                  t('marriage_req2'),
                  t('marriage_req3'),
                  t('marriage_req4'),
                  t('marriage_req5')
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
                {t('marriage_heading', { city })}
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p dangerouslySetInnerHTML={{ __html: t('marriage_p1', { city }) }} />
                <p dangerouslySetInnerHTML={{ __html: t('marriage_p2') }} />
              </div>
              <div className="mt-6">
                <Link
                  href="/services/certified/marriage-certificate-translation"
                  className="inline-flex items-center gap-2 bg-[#0891B2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                >
                  <FileText className="w-5 h-5" />
                  {t('marriage_link')} &rarr;
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
            {t('documents_heading', { city })}
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl" dangerouslySetInnerHTML={{ __html: t('documents_desc', { city }) }} />

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
              {t('doc_link_academic')} &rarr;
            </Link>
            <Link
              href="/services/certified/drivers-license-translation"
              className="inline-flex items-center text-[#0891B2] font-semibold hover:text-[#06B6D4] transition-colors"
            >
              {t('doc_link_drivers')} &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#0C2340]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            {t('why_heading', { city })}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: t('why1_title'),
                description: t('why1_desc')
              },
              {
                icon: Star,
                title: t('why2_title'),
                description: t('why2_desc')
              },
              {
                icon: CheckCircle,
                title: t('why3_title'),
                description: t('why3_desc')
              },
              {
                icon: Globe,
                title: t('why4_title'),
                description: t('why4_desc')
              },
              {
                icon: Clock,
                title: hasSameDay ? t('why5_sameday_title') : t('why5_fast_title'),
                description: hasSameDay ? t('why5_sameday_desc') : t('why5_fast_desc')
              },
              {
                icon: Users,
                title: t('why6_title'),
                description: t('why6_desc')
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
              {t('pricing_heading')}
            </h2>

            <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#0891B2] rounded-2xl p-8 shadow-lg">
              <div className="text-5xl font-bold text-[#0C2340] mb-2">
                {t('pricing_amount')}
              </div>
              <div className="text-gray-600 mb-6">{t('pricing_per')}</div>

              <ul className="space-y-3 text-left max-w-xs mx-auto mb-8">
                {[
                  t('pricing_item1'),
                  t('pricing_item2'),
                  t('pricing_item3'),
                  t('pricing_item4'),
                  t('pricing_item5')
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
                {t('get_free_quote')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-12 text-center">
            {t('how_heading')}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: t('how1_title'), description: t('how1_desc') },
              { step: '2', title: t('how2_title'), description: t('how2_desc') },
              { step: '3', title: t('how3_title'), description: t('how3_desc') },
              { step: '4', title: t('how4_title'), description: t('how4_desc') }
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
            {t('languages_heading', { city })}
          </h2>
          <p className="text-lg text-gray-700 mb-8" dangerouslySetInnerHTML={{ __html: t('languages_desc', { city }) }} />

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
              {t('languages_more')}
            </span>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[#0C2340] mb-6">
            {t('areas_heading', { city })}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#0C2340] mb-4">
                {t('areas_neighborhoods', { city })}
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
                {t('areas_nearby')}
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
            {t('faq_heading')}
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
            {t('other_certified_heading')}
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
            {t('canada_heading')}
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

      {/* Other Services */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{t('more_heading', { city })}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/interpretation" className="text-[#0891B2] hover:underline">
              {t('more_interpretation')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/languages" className="text-[#0891B2] hover:underline">
              {t('more_languages')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified" className="text-[#0891B2] hover:underline">
              {t('more_certified')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/get-quote" className="text-[#0891B2] hover:underline">
              {t('more_quote')}
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#0891B2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta_heading', { city })}
          </h2>
          <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
            {t('cta_desc')}{' '}{hasSameDay ? t('cta_sameday') : t('cta_fast')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#quote-form"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0891B2] px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              {t('get_free_quote')}
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
