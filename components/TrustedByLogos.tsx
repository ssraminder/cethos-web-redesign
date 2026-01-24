'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const LOGO_BASE_URL = 'https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/logos/';

interface Logo {
  id: string;
  filename: string;
  display_name: string;
}

interface TrustedByLogosProps {
  displayCount?: number;
  featuredOnly?: boolean;
  title?: string;
  subtitle?: string;
  bgClass?: string;
}

export default function TrustedByLogos({
  displayCount = 6,
  featuredOnly = false,
  title = "Trusted by Industry Leaders",
  subtitle = "Join 500+ global enterprises who trust Cethos for their translation needs",
  bgClass = "bg-gray-50"
}: TrustedByLogosProps) {
  const [logos, setLogos] = useState<Logo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogos() {
      try {
        const params = new URLSearchParams();
        if (featuredOnly) params.set('featured', 'true');

        const response = await fetch(`/api/logos?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch logos');

        const data = await response.json();

        // Shuffle and take only what we need to display
        const shuffled = [...data.logos].sort(() => Math.random() - 0.5);
        setLogos(shuffled.slice(0, displayCount));
        setTotalCount(data.logos.length);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching logos:', error);
        setIsLoading(false);
      }
    }
    fetchLogos();
  }, [featuredOnly, displayCount]);

  if (isLoading) {
    return (
      <section className={`py-12 ${bgClass}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#0C2340]">{title}</h2>
            <p className="text-gray-600 mt-2">{subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[...Array(displayCount)].map((_, i) => (
              <div key={i} className="aspect-[3/2] bg-white rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-12 ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0C2340]">{title}</h2>
          <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>

        {/* 2 columns mobile, 6 columns desktop */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="group relative aspect-[3/2] bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center p-4 overflow-hidden"
            >
              <div className="relative w-full h-full">
                <Image
                  src={`${LOGO_BASE_URL}${logo.filename}`}
                  alt={logo.display_name}
                  fill
                  className="object-contain p-2 filter grayscale hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 768px) 50vw, 16vw"
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xs text-center font-medium truncate">
                  {logo.display_name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          And {Math.max(0, totalCount - displayCount)}+ more global clients
        </p>
      </div>
    </section>
  );
}
