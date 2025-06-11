import { AppProps } from 'next/app';
import '../styles/globals.css';

import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';

import Header from '@/app/components/layouts/(core)/Header';
import Footer from '@/app/components/layouts/(core)/Footer';
import { Providers } from '@/app/providers';

// TODO : 폰트 적용 예시
// import { Geist, Geist_Mono } from 'next/font/google';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: {
    template: '%s | 나니의 블로그',
    default: '나니 블로그',
  },
  description: '배운 것을 잊지 않기 위해 기록하는 기술 블로그입니다.',
  keywords: ['Next.js', '프론트엔드', '웹개발', 'React.js', 'CS', '개발자'],
  authors: [{ name: '나니의 블로그', url: 'https://github.com/kimnambin/myBlog' }],
  creator: '나니',
  publisher: '나니',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },

  // metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
  alternates: {
    canonical: '/',
  },
  other: {
    google: 'notranslate',
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <Providers>
          <Header />
          <div className="relative mx-auto flex min-h-screen w-[80%] flex-col items-center justify-start">
            <Component {...pageProps} />
          </div>
        </Providers>

        <Footer />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
