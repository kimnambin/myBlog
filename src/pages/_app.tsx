import { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';
import { Providers } from './providers';

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
  title: '나니의 블로그',
  description: '나니의 기술 블로그입니닷',
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <Header categorys={pageProps.categorys} />
        <Providers>
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
