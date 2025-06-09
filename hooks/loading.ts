'use client';

// TODO : 이 페이지가 꼭 필요한가?? (고민)

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

    return () => {};
  }, [router]);

  return {
    isLoading,
    handleClick,
  };
};
