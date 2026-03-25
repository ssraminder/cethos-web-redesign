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
    ];
  },
}

module.exports = nextConfig
