'use client';

// TODO : 다른 곳을 클릭해도 닫히고 열리는 걸로 구현해야 할 듯...
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
