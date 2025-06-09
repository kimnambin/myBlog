'use client';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from '@tanstack/react-query';
import Post from './Mid';
import Loading from '../(loading)/loading';
import { PostProps } from '@/types/blog/blogPost';

interface PostListProps {
  posts: PostProps[];
  initialCursor: string | null;
  hasMore: boolean;
  totalPosting: number;
}

export default function PostList({ posts, initialCursor, hasMore, totalPosting }: PostListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    // initialPageParam: initialCursor,
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

  return (
    <>
      <h1 className="mt-2.5 mb-3.5 flex text-xl font-bold">
        『전체』게시글 : <span className="ml-2 text-[#ef402f]">{totalPosting}개</span>
      </h1>
      <InfiniteScroll
        dataLength={data?.pages.flatMap((page) => page.posts).length ?? 0}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader
        endMessage={
          <p className="mt-4 text-center text-gray-500">
            <b>더 이상 게시물이 없습니다.</b>
          </p>
        }
        className="-m-4 flex flex-wrap"
      >
        {data?.pages
          .flatMap((page) => page.posts)
          .map((v: any) => (
            <div key={v.id} className="flex w-full p-2 sm:w-1/2 lg:w-1/3">
              <div className="mt-4 flex-1 border-4 border-gray-200 bg-white px-8 py-10 opacity-100 transition-transform duration-500 hover:scale-105">
                <Post data={v} />
              </div>
            </div>
          ))}
      </InfiniteScroll>
      {isFetchingNextPage && <Loading text="게시글 불러오는 중..." />}
    </>
  );
}
