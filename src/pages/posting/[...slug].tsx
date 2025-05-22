import React from 'react';
import { useRouter } from 'next/router';
import { DATABASE_ID, TOKEN } from '../../../config';
import { isFullPage } from '@notionhq/client/build/src/helpers';
import { Client } from '@notionhq/client';

const PostItem = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div className="rounded-md bg-slate-400 p-6">
      {/* <h1>{data.title?.title[0]?.plain_text ?? 'dd'}</h1>
      <p>{data.subtitle?.rich_text[0]?.plain_text ?? '22'}</p> */}
      <p> 현재 보고 있는 페이지: {Array.isArray(slug) ? slug.join('/') : slug}</p>
    </div>
  );
};

export default PostItem;

export async function getServerSideProps() {
  const notion = new Client({ auth: TOKEN });
  const databaseId: string | undefined = DATABASE_ID;

  let response;

  if (databaseId) {
    response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: `slug`,
        checkbox: {
          equals: true,
        },
      },
    });

    console.log('das', response);

    return {
      props: {},
    };
  }
}

// import React from 'react';
// import { useRouter } from 'next/router';
// import { DATABASE_ID, TOKEN } from '../../../config';
// import { Client } from '@notionhq/client';

// const PostItem = ({ data }) => {
//   const router = useRouter();
//   const { slug } = router.query;

//   return (
//     <div className="rounded-md bg-slate-400 p-6">
//       {/* 데이터 사용 예시 */}
//       <h1>{data.title?.title[0]?.plain_text ?? '제목 없음'}</h1>
//       <p>현재 보고 있는 페이지: {Array.isArray(slug) ? slug.join('/') : slug}</p>
//     </div>
//   );
// };

// export default PostItem;

// export async function getServerSideProps(context) {
//   const notion = new Client({ auth: TOKEN });
//   const databaseId = DATABASE_ID;
//   const { slug } = context.query; // slug 값 가져오기

//   let response;

//   if (databaseId && slug) {
//     response = await notion.databases.query({
//       database_id: databaseId,
//       filter: {
//         property: 'slug', // 필터의 속성을 slug로 설정
//         title: {
//           // slug가 문자열이므로 title 타입으로 필터 설정
//           equals: Array.isArray(slug) ? slug.join('/') : slug, // slug 값을 사용
//         },
//       },
//     });

//     console.log('das', response);

//     return {
//       props: {
//         data: response.results[0] || null, // 첫 번째 결과를 props로 전달
//       },
//     };
//   }

//   return {
//     props: {
//       data: null, // 데이터가 없을 경우 null 반환
//     },
//   };
// }
