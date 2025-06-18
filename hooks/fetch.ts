import { getCategorysDetail, getPostsByCategory } from '@/lib/notion';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useFetch = async () => {
  const { posts, hasMore, nextCursor } = await getPostsByCategory();
  const categorys = await getCategorysDetail();
  const totalPosting = categorys[0].count;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['posts'],
    initialPageParam: undefined,
    initialData: {
      pages: [{ posts, nextCursor: nextCursor, hasMore }],
      pageParams: [nextCursor],
    },
    queryFn: async ({ pageParam }) => {
      const res = await fetch(`/api/blog?startCursor=${pageParam ?? ''}&pageSize=6`, {
        cache: 'no-store',
      });
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  return { data, nextCursor, hasMore, totalPosting };
};
