import { Suspense } from 'react';
import Loadingbar from './loading';
import dynamic from 'next/dynamic';

const Main = dynamic(() => import('./components/layouts/(core)/Main'), {});
console.log('Main component loaded dynamically');

export default function Home() {
  return (
    <Suspense fallback={<Loadingbar />}>
      <Main />
    </Suspense>
  );
}
