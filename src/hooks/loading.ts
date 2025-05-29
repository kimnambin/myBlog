import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      setIsLoading(false);
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return {
    isLoading,
    handleClick,
  };
};
