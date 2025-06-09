import { getPostsByCategory } from '@/lib/notion';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get('category') || undefined;
  const startCursor = searchParams.get('startCursor') || undefined;
  const pageSize = searchParams.get('pageSize');
  const pageSizeNum = pageSize ? parseInt(pageSize, 10) : 6;

  try {
    const result = await getPostsByCategory({
      category,
      startCursor,
      pageSize: pageSizeNum,
    });

    return Response.json(result);
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch posts' }), {
      status: 500,
    });
  }
}
