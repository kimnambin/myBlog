import { useState } from 'react';

export const useSideFn = () => {
  const [isClick, setIsClick] = useState<boolean>(false);

  const handleCategory = () => {
    setIsClick(!isClick);
    console.log('클릭됨');
  };

  return { isClick, handleCategory };
};
