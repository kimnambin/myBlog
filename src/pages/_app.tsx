import { AppProps } from 'next/app';
import '../styles/globals.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import { ThemeProvider } from 'next-themes';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <ThemeProvider attribute="class">
        <Header />
        <div className="mx-auto flex min-h-screen w-[80%] flex-col items-center justify-start">
          <Component {...pageProps} />
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default MyApp;

// 페이지 전환시 레이아웃 유지
// 페이지 전환시 상태 값 유지
// 커스텀 에러 핸들링 가능
// 추가적인 데이터 페이지 주입 가능
// 글로벌 CSS를 이곳에 사용
