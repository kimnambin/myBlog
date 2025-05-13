import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    // domains: [
    //   'https://makeup-api.herokuapp.com/api/**',
    //   'https://d3t32hsnjxo7q6.cloudfront.net/**',
    //   'www.dior.com',
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'makeup-api.herokuapp.com',
        pathname: '/api/**',
      },
      {
        protocol: 'https',
        hostname: 'd3t32hsnjxo7q6.cloudfront.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
