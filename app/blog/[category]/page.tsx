'use client';

import { useParams } from 'next/navigation';
import Loading from '@/app/components/layouts/(loading)/loading';
import PostList from '@/app/components/layouts/(core)/PostList';
import { useInfiniteQuery } from '@tanstack/react-query';

// TODO : 오류는 해결했는데.. 전체 카테고리만 가져옴...
// 여기 무엇을 넘기고 있는지... 다시 살펴보기

export default function CategoryList() {
  const { category } = useParams() as { category: string };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['posts', category],
    initialPageParam: undefined,
    queryFn: async ({ pageParam }) => {
      const query = new URLSearchParams();
      const decodedCategory = decodeURIComponent(category);

      if (typeof category === 'string') query.append('category', decodedCategory);
      if (pageParam) query.append('startCursor', pageParam);
      query.append('pageSize', '6');

      const res = await fetch(`/api/blog?${query.toString()}`, {
        cache: 'no-store',
      });

      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const totalPosting = data?.pages.reduce((acc, page) => acc + page.posts.length, 0) || 0;

  return (
    <main className="z-50 mt-[30px] mb-6.5 flex w-full">
      <div className="container mx-auto flex w-full sm:px-4">
        <div className="flex flex-[3] flex-col">
          {isLoading ? (
            <Loading />
          ) : (
            <PostList
              posts={data?.pages.flatMap((page) => page.posts) || []}
              initialCursor={data?.pages[data.pages.length - 1]?.nextCursor || null}
              hasMore={hasNextPage}
              totalPosting={totalPosting}
            />
          )}
        </div>
      </div>
    </main>
  );
}
