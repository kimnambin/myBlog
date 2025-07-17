import { Metadata } from 'next';
import Main from './components/layouts/(core)/Main';
import { Suspense } from 'react';
import Loadingbar from './components/layouts/(loading)/loading';

export const metadata: Metadata = {
  title: 'Nani Blog',
  description: '배운 것을 잊지 않기 위해 기록하는 나니의 블로그입니다.',
  alternates: {
    canonical: '/',
  },
};

 const Home = () => {
  return (
    <Suspense fallback={<Loadingbar />}>
      <Main />
    </Suspense>
  );
};

export default Home;



