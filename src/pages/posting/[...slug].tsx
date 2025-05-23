import React from 'react';
import { useRouter } from 'next/router';
import { DATABASE_ID, TOKEN } from '../../../config';
import { Client } from '@notionhq/client';

const PostItem = ({ data }) => {
  console.log(data.properties);
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="rounded-md bg-slate-400 p-6">
      <h1>{data.properties.title?.title[0]?.plain_text ?? '제목 없음'}</h1>
      <p>{data.properties.subtitle?.rich_text[0]?.plain_text ?? '부제 없음'}</p>
      <p>현재 보고 있는 페이지: {Array.isArray(slug) ? slug.join('/') : slug}</p>
    </div>
  );
};

export default PostItem;

// 동적 경로 생성
export async function getStaticPaths() {
  const notion = new Client({ auth: TOKEN });
  const databaseId = DATABASE_ID;

  const response = await notion.databases.query({ database_id: databaseId });
  const paths = response.results.map((item) => ({
    params: { slug: [item.id] },
  }));

  return { paths, fallback: false };
}

// 데이터 가져오기
export async function getStaticProps({ params }) {
  const notion = new Client({ auth: TOKEN });
  const databaseId = DATABASE_ID;
  const slug = params.slug[0];

  let response;

  if (databaseId) {
    response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: 'created_at', direction: 'descending' }],
    });

    const data = response.results.find((item) => item.id === slug) || null;

    return {
      props: {
        data,
      },
    };
  }

  return {
    props: {
      data: null,
    },
  };
}
