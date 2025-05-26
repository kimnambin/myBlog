// pages/index.tsx (상위 컴포넌트)
import Link from 'next/link';
import PostList from './components/layouts/Mid';
import { Client, isFullPage } from '@notionhq/client';
import { DATABASE_ID, TOKEN } from '../../config';
import { PostListProps } from '@/types/blog/blogPost';
import Side from './components/layouts/Side';
import Image from 'next/image';

export default function Home({ data }: { data: PostListProps[] }) {
  return (
    <main className="z-50 mt-[30px] flex w-full">
      <div className="container mx-auto flex w-full px-4">
        <div className="flex-[3]">
          <div className="flex w-full flex-col">
            <h1 className="mt-2.5 mb-3.5 text-xl font-bold">총 게시글 : {data.length}</h1>

            <div className="-m-4 flex flex-wrap">
              {data.map((v) => (
                <div key={v.id} className="flex w-full p-2 sm:w-1/2 lg:w-1/3">
                  <div className="mt-4 flex-1 border-4 border-gray-200 bg-white px-8 py-10 opacity-100 transition-transform duration-500 hover:scale-105">
                    <PostList id={v.id} data={v.properties} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ml-auto hidden items-center gap-4 sm:flex">
          <Side />
        </div>
      </div>
    </main>
  );
}

// 빌드 타입에 호출
export async function getStaticProps() {
  const notion = new Client({ auth: TOKEN });
  const databaseId: string | undefined = DATABASE_ID;

  let response;

  if (databaseId) {
    response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: 'created_at', direction: 'descending' }],
    });

    const data = response.results.filter(isFullPage).map((data) => data);

    return {
      props: {
        data,
      },
    };
  }

  return {
    props: {
      data: [],
    },
  };
}
