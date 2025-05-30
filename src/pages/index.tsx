import { getCategorysDetail, getPostsByCategory } from '@/lib/notion';
import Side from './components/layouts/Side';
import { GetServerSideProps } from 'next';
import { CategoryProps, PostProps } from '@/types/blog/blogPost';
import PostList from './components/layouts/Mid';
import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from './components/layouts/loading';

export default function Home({
  initPosts,
  categorys,
  initHasMore,
  initNextCursor,
}: {
  initPosts: PostProps[];
  categorys: CategoryProps[];
  initHasMore: boolean;
  initNextCursor: string | null;
}) {
  const categoryCnt = categorys.find((v) => v.name === '전체')?.count ?? 0;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    initialData: {
      pages: [{ posts: initPosts, hasMore: initHasMore, nextCursor: initNextCursor }],
      pageParams: [initNextCursor],
    },
    queryFn: async ({ pageParam }) => {
      const res = await fetch(`/api/blog?startCursor=${pageParam ?? ''}&pageSize=6`, {
        // cache: 'no-store',
      });
      return res.json();
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  return (
    <main className="z-50 mt-[30px] flex w-full">
      <div className="container mx-auto flex w-full px-4">
        <div className="flex-[3]">
          <div className="flex w-full flex-col">
            <h1 className="mt-2.5 mb-3.5 text-xl font-bold">『전체』게시글 : {categoryCnt}개</h1>

            <InfiniteScroll
              dataLength={data?.pages.flatMap((page) => page.posts).length ?? 0}
              next={() => fetchNextPage()}
              hasMore={hasNextPage}
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

            {isFetchingNextPage && <Loading text={'게시글 불러오는 중...'} />}
          </div>
        </div>
        <div className="ml-auto hidden items-center gap-4 sm:flex">
          <Side categorys={categorys} />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { posts, hasMore, nextCursor } = await getPostsByCategory({ pageSize: 3 });
  const categorys = await getCategorysDetail();

  return {
    props: {
      initPosts: posts,
      categorys,
      initHasMore: hasMore,
      initNextCursor: nextCursor,
    },
  };
};
