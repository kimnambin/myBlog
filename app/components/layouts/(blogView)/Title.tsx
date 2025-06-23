import { useSideFn } from '@/hooks/sideFn';
import { CategoryProps } from '@/types/blog/blogPost';
import React from 'react';

const Title = ({ category }: { category: string }) => {
  const { queryLoading, getcategoryList } = useSideFn();
  console.log('getcategoryList', getcategoryList.categorys[0].name);

  const categoryData =
    category !== ''
      ? getcategoryList.categorys.find((v: CategoryProps) => v.name === category)
      : '';

  return (
    <span className="ml-[5%] text-sm sm:ml-0 sm:text-lg">
      {categoryData ? (
        <>
          {categoryData.name}
          <span className="ml-2 text-[#ef402f]">{categoryData.count}개</span>
        </>
      ) : (
        <>
          {getcategoryList.categorys[0].name}
          <span className="ml-2 text-[#ef402f]">{getcategoryList.categorys[0].count}개</span>
        </>
      )}
    </span>
  );
};

export default Title;
