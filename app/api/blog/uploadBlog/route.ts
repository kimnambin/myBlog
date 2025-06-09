import { notion } from '@/lib/notion';

export async function POST(request: Request) {
  try {
    const { title, category, content } = await request.json();

    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_DATABASE_ID! },
      properties: {
        title: {
          title: [{ text: { content: title } }],
        },
        category: {
          multi_select: [{ name: category }],
        },
      },
      children: [
        {
          object: 'block',
          type: 'paragraph',
          paragraph: {
            rich_text: [{ text: { content } }],
          },
        },
      ],
    });

    return Response.json(response);
  } catch (error) {
    console.error('Notion upload error:', error);
    return new Response(JSON.stringify({ error: 'Upload failed' }), { status: 500 });
  }
}
