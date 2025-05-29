import { getCategorysDetail, getPostsByCategory } from '@/lib/notion';
import Side from './components/layouts/Side';
import { GetServerSideProps } from 'next';
import { CategoryProps, PostProps } from '@/types/blog/blogPost';
import PostList from './components/layouts/Mid';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

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
  const categoryCnt = categorys.map((v) => {
    if (v.name == '전체') {
      return v.count;
    }
  });

  const [posts, setPosts] = useState<PostProps[]>(initPosts);
  const [hasMore, setHasMore] = useState<boolean>(initHasMore);
  const [nextCursor, setNextCursor] = useState<string | null>(initNextCursor);

  const GetMorePost = async () => {
    if (!hasMore) return;

    const {
      posts: newPosts,
      hasMore: more,
      nextCursor: cursor,
    } = await getPostsByCategory({
      startCursor: nextCursor ?? undefined,
      pageSize: 6,
    });

    setPosts((prev) => [...prev, ...newPosts]);
    setHasMore(more);
    setNextCursor(cursor);
  };

  return (
    <main className="z-50 mt-[30px] flex w-full">
      <div className="container mx-auto flex w-full px-4">
        <div className="flex-[3]">
          <div className="flex w-full flex-col">
            <h1 className="mt-2.5 mb-3.5 text-xl font-bold">『전체』게시글 : {categoryCnt}개</h1>

            <InfiniteScroll
              dataLength={posts.length}
              next={GetMorePost}
              hasMore={hasMore}
              loader={<h4 className="text-center">로딩 중...</h4>}
              endMessage={
                <p className="mt-4 text-center text-gray-500">
                  <b>더 이상 게시물이 없습니다.</b>
                </p>
              }
              className="-m-4 flex flex-wrap"
            >
              {posts.map((v) => (
                <div key={v.id} className="flex w-full p-2 sm:w-1/2 lg:w-1/3">
                  <div className="mt-4 flex-1 border-4 border-gray-200 bg-white px-8 py-10 opacity-100 transition-transform duration-500 hover:scale-105">
                    <PostList data={v} />
                  </div>
                </div>
              ))}
            </InfiniteScroll>
          </div>
        </div>
        <div className="ml-auto hidden items-center gap-4 sm:flex">
          <Side categorys={categorys} />
        </div>
      </div>
    </main>
  );
}

// 빌드 타입에 호출
export const getServerSideProps: GetServerSideProps = async () => {
  const { posts, hasMore, nextCursor } = await getPostsByCategory({
    pageSize: 6,
  });
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
