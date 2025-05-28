import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
// import remarkGfm from 'remark-gfm';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      'www.notion.so',
      'images.unsplash.com',
      'https://d3t32hsnjxo7q6.cloudfront.net/**',
      'img.notionusercontent.com',
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
      {
        protocol: 'https',
        hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  // 마크다운 플로그인 추가하는 곳
  options: {
    // remarkPlugins: [remarkGfm],
    // ts-expect-error remark-gfm 타입 충돌 문제 해결
    // remarkPlugins: [['remark-gfm']],
  },
});

export default withMDX(nextConfig);
