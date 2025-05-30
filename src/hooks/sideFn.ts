import { getCategorys } from '@/lib/notion';
import { CategoryProps } from '@/types/blog/blogPost';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

export const useSideFn = () => {
  const [isClick, setIsClick] = useState<boolean>(false);

  const handledropDown = () => {
    setIsClick(!isClick);
  };

  return { isClick, handledropDown };
};
