import React from 'react';
import { TOKEN, DATABASE_ID } from '../../../config';
import { Client, PageObjectResponse } from '@notionhq/client';
import { PostProps } from '@/types/blog/blogPost';
import PostList from '../components/posting/PostList';
import { isFullPage } from '@notionhq/client/build/src/helpers';

const Project = ({ data }: { data: PostProps[] }) => {
  return (
    <div>
      <p className="text-red-500">프로젝트 페이지로 이용할 예정입니닷</p>
      <h1>총 프로젝트 : {data.length}</h1>

      {data.map((v) => (
        <div key={Number(v.post_id)}>
          <PostList data={v} />
        </div>
      ))}
    </div>
  );
};

export default Project;

// 빌드 타입에 호출
export async function getStaticProps() {
  const notion = new Client({ auth: TOKEN });
  const databaseId: string | undefined = DATABASE_ID;

  let response;

  if (databaseId) {
    response = await notion.databases.query({
      database_id: databaseId,

      sorts: [
        {
          property: 'created_at',
          direction: 'descending',
        },
      ],
    });

    const data = response.results.filter(isFullPage).map((data) => data.properties);

    return {
      props: {
        data,
      },
    };
  }
}
