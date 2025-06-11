'use client';

// TODO : 2초 후에도 이동하지 못하는 경우가 있음....

import { useState } from 'react';

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return {
    isLoading,
    handleClick,
  };
};
