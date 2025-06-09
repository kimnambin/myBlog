import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['www.notion.so', 'images.unsplash.com', 'img.notionusercontent.com', 'www.dior.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'makeup-api.herokuapp.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],

  experimental: {
    serverActions: {
      bodySizeLimit: '1mb',
      allowedOrigins: ['*'],
    },
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
