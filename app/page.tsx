import { Metadata } from 'next';
import Main from './components/layouts/(core)/Main';

export const metadata: Metadata = {
  title: 'Nani Blog',
  description: '배운 것을 잊지 않기 위해 기록하는 나니의 블로그입니다.',
  alternates: {
    canonical: '/',
  },
};

const Home = async () => {
  return <Main />;
};

export default Home;
