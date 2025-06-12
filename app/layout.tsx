import '../styles/globals.css';
import { Metadata } from 'next';
import { Providers } from './providers';
import Header from './components/layouts/(core)/Header';
import Footer from './components/layouts/(core)/Footer';

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

//TODO : 하이브레이션? 오류 해결해야 함...

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="description" content="나니의 블로그입니닷" />
        <link rel="icon" href="/img/main.jpg" />
      </head>
      <body>
        <Providers>
          <Header />
          <main className="relative mx-auto flex min-h-screen w-[80%] flex-col items-center justify-start">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
