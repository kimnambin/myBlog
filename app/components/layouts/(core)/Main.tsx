import React from 'react';
import PostList from './PostList';
import BrowerSide from '../(side)/BroswerSide';
import { ParameterProps } from '@/types/blog/blogPost';

const Main = ({ category }: ParameterProps) => {
  const hascategory = category || '';

  return (
    <main className="z-50 mt-[30px] mb-6.5 flex w-full">
      <div className="container mx-auto flex w-full sm:px-4">
        <div className="flex flex-[3] flex-col ">
          <PostList category={decodeURIComponent(hascategory)} />
        </div>
        <div className="hidden-side ml-auto hidden h-full flex-col items-center gap-4 sm:flex">
          <div className="flex h-full flex-col justify-between">
            <BrowerSide />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
