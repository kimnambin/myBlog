// pages/index.tsx (상위 컴포넌트)
import Link from 'next/link';
import PostList from './components/layouts/Mid';
import { Client, isFullPage } from '@notionhq/client';
import { DATABASE_ID, TOKEN } from '../../config';
import { PostListProps } from '@/types/blog/blogPost';

export default function Home({ data }: { data: PostListProps[] }) {
  console.log(data);
  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">목록</h2>
          {/* <Project data={data} /> */}
          <div className="mb-10 flex min-h-screen flex-col items-center justify-center px-5 py-24">
            <h1 className="text-2xl font-bold sm:text-3xl">총 게시글 : {data.length}</h1>

            <div className="xs : m-6 grid w-full grid-cols-1 gap-8 py-10 md:grid-cols-2">
              {data.map((v) => (
                <Link href={`/posting/${v.id}`}>
                  <div key={Number(v.id)}>
                    <PostList id={v.id} data={v.properties} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
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
