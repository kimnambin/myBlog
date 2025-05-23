// pages/index.tsx (상위 컴포넌트)
import Link from 'next/link';
import PostList from './components/layouts/Mid';
import { Client, isFullPage } from '@notionhq/client';
import { DATABASE_ID, TOKEN } from '../../config';
import { PostListProps } from '@/types/blog/blogPost';
import Side from './components/layouts/Side';

export default function Home({ data }: { data: PostListProps[] }) {
  return (
    <main className="z-50 mx-auto mt-[-160px] flex w-full">
      <div className="container mx-auto flex w-full items-center px-4">
        <div className="flex-[3]">
          <div className="flex w-full flex-col">
            <h1 className="mb-3.5 text-xl font-bold">총 게시글 : {data.length}</h1>

            <div className="grid grid-cols-2 gap-1.5">
              {data.map((v) => (
                <div key={v.id} className="transition-transform duration-500 hover:scale-105">
                  <PostList id={v.id} data={v.properties} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-4">
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
