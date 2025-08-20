'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { LuLayoutGrid } from 'react-icons/lu';
import { TbLayoutList } from 'react-icons/tb';
import { useLayout } from '@/hooks/layout';
import { cn } from '@/lib/utils';
import GridCard from '../(blogView)/GridCard';
import FlexCard from '../(blogView)/FlexCard';
import Title from '../(blogView)/Title';
import BlogListSkeleton from '../(loading)/BlogListSkeleton';

export default function PostList({ category }: { category: string }) {
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['posts', category],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const query = new URLSearchParams();
      if (category) {
        const decodedCategory = decodeURIComponent(category);

        if (typeof category === 'string') query.append('category', decodedCategory);
      }

      if (pageParam) query.append('startCursor', pageParam);
      query.append('pageSize', '6');

      const res = await fetch(`/api/blog?${query.toString()}`, {
        cache: 'no-store',
      });
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const { basic, handleClick } = useLayout();

  // TODO : 조회수 못가져옴... (id값을 한번에 받아서 그런 듯 각각으로 수정하기)
  const ids =
    data?.pages.flatMap((page) => page.posts.map((post: { id: string }) => post.id)) ?? [];
  const idList = ids?.join(',');

  const { data: hintsData, isLoading: searchLoading } = useQuery({
    queryKey: ['hintsData', idList],
    queryFn: async () => {
      const res = await fetch(`/api/blog/getHits?ids=${idList}`);
      if (!res.ok) {
        throw new Error('데이터를 가져오는 중 오류 발생');
      }

      return res.json();
    },
  });

  console.log('Hints Data:', hintsData);

  return (
    <>
      <div className="mt-2.5 mb-6.5 flex w-full justify-between text-xl font-bold ">
        <Title category={category} />
        <aside className="align-center ml-12 flex items-center gap-2">
          <LuLayoutGrid
            className={cn('iconSize', basic && 'text-hover pointer-events-none')}
            onClick={handleClick}
          />
          <TbLayoutList
            className={cn('iconSize', basic ? '' : 'text-hover pointer-events-none')}
            onClick={handleClick}
          />
        </aside>
      </div>

      {isLoading ? (
        <div className="-m-4 flex flex-wrap">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className={`${basic ? 'flex w-1/2 sm:w-1/2 lg:w-1/4' : 'flex w-full flex-col'}`}
            >
              <BlogListSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={data?.pages.flatMap((page) => page.posts).length ?? 0}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader
          className="-m-4 flex flex-wrap"
        >
          {data?.pages
            .flatMap((page) => page.posts)
            .map((v: any) => (
              <div
                key={v.id}
                className={`${basic ? 'flex w-1/2 sm:w-1/2 lg:w-1/4 p-2' : 'flex w-full flex-col'}`}
              >
                {basic ? (
                  <div className="hover:text-hover w-[8ch] flex-1 truncate overflow-hidden font-bold whitespace-nowrap duration-500">
                    <GridCard data={v} />
                  </div>
                ) : (
                  <div className="hover:text-hover flex-1 truncate overflow-hidden font-bold whitespace-nowrap duration-500">
                    <FlexCard data={v} />
                  </div>
                )}
              </div>
            ))}
        </InfiniteScroll>
      )}
    </>
  );
}
