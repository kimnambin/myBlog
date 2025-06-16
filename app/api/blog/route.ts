import { getPostsByCategory } from '@/lib/notion';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get('category') || '전체';
  const startCursor = searchParams.get('startCursor') || undefined;
  const pageSize = searchParams.get('pageSize');
  const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 6;

  try {
    const result = await getPostsByCategory({
      category,
      startCursor,
      pageSize: pageSizeNum,
    });
    console.log('dfsda', result);
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
