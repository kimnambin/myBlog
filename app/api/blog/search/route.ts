// import { getDetailPost } from '@/lib/notion';

// export async function GET(req: Request) {
//   try {
//     const url = new URL(req.url);
//     const title = url.pathname.split('/').pop();

//     if (!title) {
//       return new Response(JSON.stringify({ error: '제목이 필요합니다.' }), {
//         status: 400,
//       });
//     }

//     const result = await getDetailPost(title);

//     return Response.json({ result });
//   } catch (error) {
//     console.error('데이터를 가져오는 중 오류 발생:', error);
//     return new Response(JSON.stringify({ error: '데이터를 불러올 수 없습니다.' }), {
//       status: 500,
//     });
//   }
// }
