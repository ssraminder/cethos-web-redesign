'use client';

import { useState, useEffect } from 'react';

interface ClientLogo {
  id: string;
  display_name: string;
  urls?: {
    small: string;
    medium: string;
    large: string;
    original: string;
  };
}

interface TrustedByLogosProps {
  displayCount?: number;
  title?: string;
  subtitle?: string;
  bgClass?: string;
}

const fallbackClients: ClientLogo[] = [
  { id: '1', display_name: 'Catalent' },
  { id: '2', display_name: 'DSM' },
  { id: '3', display_name: 'Natera' },
  { id: '4', display_name: 'Cipla' },
  { id: '5', display_name: 'Nomura' },
  { id: '6', display_name: 'ENOC' },
];

export default function TrustedByLogos({
  displayCount = 6,
  title = 'Trusted by Leading Global Companies',
  subtitle,
  bgClass = 'bg-gray-50',
}: TrustedByLogosProps) {
  const [clients, setClients] = useState<ClientLogo[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    async function fetchLogos() {
      try {
        const params = new URLSearchParams();
        params.set('random', 'true');
        params.set('limit', displayCount.toString());

        const response = await fetch(`/api/logos?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch logos');

        const data = await response.json();

        if (data.logos && Array.isArray(data.logos) && data.logos.length > 0) {
          setClients(
            data.logos.map((logo: ClientLogo) => ({
              id: logo.id,
              display_name: logo.display_name,
              urls: logo.urls,
            }))
          );
          setTotalCount(data.total || 527);
        } else {
          throw new Error('No logos returned');
        }
      } catch {
        setClients(fallbackClients);
        setTotalCount(527);
      }
    }
    fetchLogos();
  }, [displayCount]);

  const displaySubtitle =
    subtitle ||
    `Join ${totalCount > 0 ? `${totalCount}+` : '500+'} enterprises who rely on Cethos for precision translation`;

  if (clients.length === 0) {
    return (
      <section className={`py-16 ${bgClass}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0C2340]">{title}</h2>
            <p className="text-gray-600 mt-2">{displaySubtitle}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {[...Array(displayCount)].map((_, i) => (
              <div key={i} className="h-16 rounded-lg border border-gray-200 bg-white animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0C2340] mb-2">
          {title}
        </h2>
        <p className="text-gray-600 mb-10">{displaySubtitle}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex items-center justify-center h-16 px-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-100 transition-colors"
            >
              {client.urls ? (
                <img
                  src={client.urls.medium}
                  srcSet={`${client.urls.small} 80w, ${client.urls.medium} 160w, ${client.urls.large} 320w`}
                  sizes="(max-width: 640px) 80px, 160px"
                  alt={client.display_name}
                  className="max-h-10 max-w-[120px] object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-700 text-center leading-tight">
                  {client.display_name}
                </span>
              )}
            </div>
          ))}
        </div>

        {totalCount > displayCount && (
          <p className="text-sm text-teal-600 font-medium">
            And {totalCount - displayCount}+ more global clients
          </p>
        )}
      </div>
    </section>
  );
}
