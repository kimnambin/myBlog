'use client';

import { useState } from 'react';

export const useLoading = () => {
  const [isLoadingBar, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return { isLoadingBar, startLoading, stopLoading };
};
