// import React from 'react';
// import { TOKEN, DATABASE_ID } from '../../../config';
// import { Client, PageObjectResponse } from '@notionhq/client';
// import { PostProps } from '@/types/blog/blogPost';
// import PostList from '../posting/[...slug]';
// import { isFullPage } from '@notionhq/client/build/src/helpers';

// const Project = ({ data, dataId }: { data: PostProps[]; dataId: string[] }) => {
//   console.log('블로그 데이터 확인하기', data);
//   console.log(dataId);
//   return (
//     <div className="mb-10 flex min-h-screen flex-col items-center justify-center px-5 py-24">
//       <h1 className="text-2xl font-bold sm:text-3xl">총 게시글 : {data.length}</h1>

//       <div className="xs : m-6 grid w-full grid-cols-1 gap-8 py-10 md:grid-cols-2">
//         {data.map((v) => (
//           <div key={Number(v.post_id)}>
//             <PostList data={v} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Project;

// // 빌드 타입에 호출
// export async function getStaticProps() {
//   const notion = new Client({ auth: TOKEN });
//   const databaseId: string | undefined = DATABASE_ID;

//   let response;

//   if (databaseId) {
//     response = await notion.databases.query({
//       database_id: databaseId,
//       sorts: [{ property: 'created_at', direction: 'descending' }],
//     });

//     const data = response.results.filter(isFullPage).map((data) => data.properties);
//     const dataId = response.results.filter(isFullPage).map((data) => data.id);

//     // const comments = await Promise.all(
//     //   response.results.map(async (page) => {
//     //     const commentResponse = await notion.comments.list({ block_id: page.id });
//     //     return { pageId: page.id, comments: commentResponse.results };
//     //   })
//     // );

//     return {
//       props: {
//         data,
//         dataId,
//       },
//     };
//   }
// }
