import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-[600px] pt-32 pb-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content - 55% */}
          <div className="lg:pr-8">
            {/* Eyebrow */}
            <p className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
              Professional Translation Services
            </p>

            {/* Headline */}
            <h1 className="text-[40px] md:text-[56px] font-bold text-[#0C2340] leading-[1.1] mb-6">
              Global Communication.{' '}
              <span className="text-[#0891B2]">Local Precision.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-[#4B5563] leading-relaxed mb-8 max-w-xl">
              Expert translation services in 200+ languages. We combine human expertise with advanced technology to deliver precise, culturally-adapted content for your global audience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/get-quote"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center gap-2"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/services"
                className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors"
              >
                Our Services
              </Link>
            </div>

            {/* Trust text */}
            <div className="flex items-center gap-2 text-sm text-[#717182]">
              <Shield className="w-4 h-4 text-[#0891B2]" strokeWidth={1.5} />
              <span>ISO 17100 & ISO 9001 Compliant • Trusted by 500+ Global Enterprises</span>
            </div>
          </div>

          {/* Right content - World map illustration - 45% */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/dotted-world-map.svg"
              alt="Global network world map"
              width={500}
              height={300}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
