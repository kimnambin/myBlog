'use client';

// TODO : 고도화해야함

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
