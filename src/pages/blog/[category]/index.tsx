import { getCategorysDetail, getPostsByCategory } from '@/lib/notion';
import PostList from '@/pages/components/layouts/Mid';
import Side from '@/pages/components/layouts/Side';
import { CategoryProps } from '@/types/blog/blogPost';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/pages/components/layouts/loading';

export default function CategoryList({ categorys }: { categorys: CategoryProps[] }) {
  const router = useRouter();
  const { category } = router.query;

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

  const categoryCnt = categorys.map((v) => {
    if (v.name == category) {
      return v.count;
    }
  });

  return (
    <main className="z-50 mt-[30px] flex w-full">
      <div className="container mx-auto flex w-full px-4">
        <div className="flex flex-[3] flex-col">
          <h1 className="mt-2.5 mb-3.5 flex text-xl font-bold">
            『{category}』게시글 : <p className="ml-2 text-[#ef402f]">{categoryCnt}개</p>
          </h1>

          <div className="flex-1">
            <InfiniteScroll
              dataLength={data?.pages.flatMap((page) => page.posts).length ?? 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
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
                .map((v) => (
                  <div key={v.id} className="flex w-full p-2 sm:w-1/2 lg:w-1/3">
                    <div className="mt-4 flex-1 border-4 border-gray-200 bg-white px-8 py-10 opacity-100 transition-transform duration-500 hover:scale-105">
                      <PostList data={v} />
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

export const getServerSideProps: GetServerSideProps = async () => {
  const categorys = await getCategorysDetail();
  const { posts, hasMore, nextCursor } = await getPostsByCategory();
  return {
    props: {
      posts,
      categorys,
      initHasMore: hasMore,
      initNextCursor: nextCursor,
    },
  };
};
