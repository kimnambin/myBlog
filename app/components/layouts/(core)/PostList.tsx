'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from '@tanstack/react-query';
import Loading from '../(loading)/loading';
import { PostProps } from '@/types/blog/blogPost';
import { LuLayoutGrid } from 'react-icons/lu';
import { TbLayoutList } from 'react-icons/tb';
import { useLayout } from '@/hooks/layout';
import { cn } from '@/lib/utils';
import GridCard from '../(blogView)/GridCard';
import FlexCard from '../(blogView)/FlexCard';

interface PostListProps {
  posts: PostProps[];
  initialCursor: string | null;
  hasMore: boolean;
  totalPosting: number;
}

export default function PostList({ posts, initialCursor, hasMore, totalPosting }: PostListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['posts'],
    initialPageParam: undefined,
    initialData: {
      pages: [{ posts, nextCursor: initialCursor, hasMore }],
      pageParams: [initialCursor],
    },
    queryFn: async ({ pageParam }) => {
      const res = await fetch(`/api/blog?startCursor=${pageParam ?? ''}&pageSize=6`, {
        cache: 'no-store',
      });
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const { basic, handleClick } = useLayout();

  return (
    <>
      <div className="mt-2.5 mb-6.5 flex w-full justify-between text-xl font-bold">
        <span className="ml-[5%] text-sm sm:ml-0 sm:text-lg">
          전체<span className="ml-2 text-[#ef402f]">{totalPosting}개</span>
        </span>
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
        <Loading />
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
                className={`${basic ? 'flex w-1/2 sm:w-1/2 lg:w-1/4' : 'flex w-full flex-col'}`}
              >
                {basic ? (
                  <div className="hover:text-hover mt-4 ml-4 w-[8ch] flex-1 truncate overflow-hidden font-bold whitespace-nowrap duration-500">
                    <GridCard data={v} />
                  </div>
                ) : (
                  <div className="hover:text-hover ml-4 flex-1 truncate overflow-hidden font-bold whitespace-nowrap duration-500">
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
