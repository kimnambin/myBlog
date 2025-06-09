'use client';

import { useParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Side from '@/app/components/layouts/(core)/Side';
import Loading from '@/app/components/layouts/(loading)/loading';
import Post from '@/app/components/layouts/(core)/Mid';
import { useEffect, useState } from 'react';
import { getCategorysDetail } from '@/lib/notion';
import { CategoryProps } from '@/types/blog/blogPost';

export default function CategoryList() {
  const { category } = useParams() as { category: string };
  const [categorys, setCategorys] = useState<CategoryProps[]>([]);

  useEffect(() => {
    async function fetchCategorys() {
      const res = await fetch('/api/blog/getCategory');
      const data = await res.json();
      setCategorys(data);
    }
    fetchCategorys();
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['category-posts', category],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const query = new URLSearchParams();

      if (typeof category === 'string') query.append('category', category);
      if (pageParam) query.append('startCursor', pageParam);
      query.append('pageSize', '6');

      const res = await fetch(`/api/blog?${query.toString()}`, {
        cache: 'no-store',
      });

      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const categoryCnt = data?.pages[0].posts.length;
  // const categoryCnt = categorys.find((v) => v.name === category)?.count || 0;

  return (
    <main className="z-50 mt-[30px] flex w-full">
      <div className="container mx-auto flex w-full px-4">
        <div className="flex flex-[3] flex-col">
          <h1 className="mt-2.5 mb-3.5 flex text-xl font-bold">
            『{decodeURIComponent(category)}』게시글 :{' '}
            <p className="ml-2 text-[#ef402f]"> {categoryCnt}개 </p>
          </h1>

          <div className="flex-1">
            <InfiniteScroll
              dataLength={data?.pages.flatMap((page) => page.posts).length ?? 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader
              // TODO : 중앙에 배치시키는 것도 좋을 듯
              endMessage={
                <p className="mt-4 text-center text-gray-500">
                  <b>더 이상 게시물이 없습니다.</b>
                </p>
              }
              className="-m-4 flex flex-wrap"
            >
              {data?.pages
                .flatMap((page) => page.posts)
                .map((v) => (
                  <div key={v.id} className="flex w-full p-2 sm:w-1/2 lg:w-1/3">
                    <div className="mt-4 flex-1 border-4 border-gray-200 bg-white px-8 py-10 opacity-100 transition-transform duration-500 hover:scale-105">
                      <Post data={v} />
                    </div>
                  </div>
                ))}
            </InfiniteScroll>
            {isFetchingNextPage && <Loading text="게시글 불러오는 중..." />}
          </div>
        </div>

        <div className="hidden-side ml-auto hidden h-full flex-col items-center gap-4 sm:flex">
          <div className="flex h-full flex-col justify-between">
            <Side />
          </div>
        </div>
      </div>
    </main>
  );
}
