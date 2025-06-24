import { useSideFn } from '@/hooks/sideFn';
import { CategoryProps } from '@/types/blog/blogPost';
import React from 'react';

const Title = ({ category }: { category: string }) => {
  const { queryLoading, getcategoryList } = useSideFn();

  const categorys = getcategoryList?.categorys;

  const categoryData =
    category.length > 0 && categorys
      ? categorys.find((v: CategoryProps) => v.name === category)
      : null;

  if (!categorys || categorys.length === 0 || queryLoading) {
    return <span className="ml-[5%] text-sm sm:ml-0 sm:text-lg">로딩 중...</span>;
  }

  return (
    <span className="ml-[5%] text-sm sm:ml-0 sm:text-lg">
      {categoryData ? (
        <>
          {categoryData.name}
          <span className="ml-2 text-[#ef402f]">{categoryData.count}개</span>
        </>
      ) : (
        <>
          {categorys[0].name}
          <span className="ml-2 text-[#ef402f]">{categorys[0].count}개</span>
        </>
      )}
    </span>
  );
};

export default Title;
