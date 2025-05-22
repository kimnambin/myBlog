import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'www.notion.so',
      'images.unsplash.com',
      'https://d3t32hsnjxo7q6.cloudfront.net/**',
      'www.dior.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'makeup-api.herokuapp.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'notion',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
