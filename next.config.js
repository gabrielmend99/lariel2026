/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
      {
        protocol: 'https',
        hostname: 'exemplo.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hnuvptpfrrvwnacdjrme.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;