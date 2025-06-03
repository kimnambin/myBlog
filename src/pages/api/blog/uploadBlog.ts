import { notion } from '../../../lib/notion';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, category, content } = req.body;

    try {
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
              rich_text: [{ text: { content: content } }],
            },
          },
        ],
      });

      res.status(200).json(response);
    } catch (error) {
      console.error('Notion upload error:', error);
      res.status(500).json({ error: 'Upload failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
