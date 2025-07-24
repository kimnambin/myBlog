import { Suspense } from 'react';
import Loadingbar from './loading';
import dynamic from 'next/dynamic';

const Main = dynamic(() => import('./components/layouts/(core)/Main'), {});

export default function Home() {
  return (
    <Suspense fallback={<Loadingbar />}>
      <Main />
    </Suspense>
  );
}
