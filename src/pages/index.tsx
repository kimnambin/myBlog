import { getCategorys, getPosts } from '@/lib/notion';
// import PostList from './components/layouts/Mid';
import Side from './components/layouts/Side';
import { GetServerSideProps } from 'next';
import { CategoryProps, PostProps } from '@/types/blog/blogPost';

import dynamic from 'next/dynamic';
const PostList = dynamic(() => import('./components/layouts/Mid'), {
  loading: () => <div>Loading...</div>,
});

export default function Home({
  posts,
  categorys,
}: {
  posts: PostProps[];
  categorys: CategoryProps[];
}) {
  const categoryCnt = categorys.map((v) => {
    if (v.name == '전체') {
      return v.count;
    }
  });

  return (
    <main className="z-50 mt-[30px] flex w-full">
      <div className="container mx-auto flex w-full px-4">
        <div className="flex-[3]">
          <div className="flex w-full flex-col">
            <h1 className="mt-2.5 mb-3.5 text-xl font-bold">『전체』게시글 : {categoryCnt}개</h1>

            <div className="-m-4 flex flex-wrap">
              {posts.map((v) => (
                <div key={v.id} className="flex w-full p-2 sm:w-1/2 lg:w-1/3">
                  <div className="mt-4 flex-1 border-4 border-gray-200 bg-white px-8 py-10 opacity-100 transition-transform duration-500 hover:scale-105">
                    <PostList data={v} />
                  </div>
                </div>
              ))}
            </div>
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
  const posts = await getPosts();
  const categorys = await getCategorys();
  return {
    props: {
      posts,
      categorys,
    },
  };
};
