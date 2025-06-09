import { getCategorysDetail } from '@/lib/notion';

export async function GET() {
  try {
    const categorys = await getCategorysDetail();

    return Response.json({ categorys });
  } catch (error) {
    console.error('카테고리 데이터를 가져오는 중 오류 발생:', error);
    return new Response(JSON.stringify({ error: '카테고리 데이터를 불러올 수 없습니다.' }), {
      status: 500,
    });
  }
}
