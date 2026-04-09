/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for static logos
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lmzoyezvsjgsxveoakdr.supabase.co',
        pathname: '/storage/v1/**', // Covers both /object/ and /render/ paths
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/services/certified/edmonton-translation-agency',
        destination: '/locations/edmonton',
        permanent: true,
      },
      {
        source: '/%E6%94%AF%E6%8C%81%E7%9A%84%E8%AF%AD%E8%A8%80',
        destination: '/services/certified',
        permanent: true,
      },
      // Language page URL restructure: drop -calgary suffix
      {
        source: '/services/certified/arabic-translation-calgary',
        destination: '/services/certified/arabic-translation',
        permanent: true,
      },
      {
        source: '/services/certified/french-translation-calgary',
        destination: '/services/certified/french-translation',
        permanent: true,
      },
      {
        source: '/services/certified/hindi-translation-calgary',
        destination: '/services/certified/hindi-translation',
        permanent: true,
      },
      {
        source: '/services/certified/mandarin-translation-calgary',
        destination: '/services/certified/mandarin-translation',
        permanent: true,
      },
      {
        source: '/services/certified/punjabi-translation-calgary',
        destination: '/services/certified/punjabi-translation',
        permanent: true,
      },
      {
        source: '/services/certified/spanish-translation-calgary',
        destination: '/services/certified/spanish-translation',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
