'use client';

import { useEffect, useState } from 'react';

export const useSideFn = () => {
  const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    if (isClick) {
      const time = setTimeout(() => {
        setIsClick(false);
      }, 3500);

      return () => clearTimeout(time);
    }
  }, [isClick]);

  const handledropDown = () => {
    setIsClick(!isClick);
  };

  return { isClick, handledropDown };
};
