import { getPostsByCategory } from '@/lib/notion';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  try {
    const { category, startCursor, pageSize } = req.query;

    const categoryStr = category?.toString();
    const pageSizeNum = pageSize ? parseInt(pageSize.toString(), 10) : 6;

    const startCursorStr =
      startCursor && typeof startCursor === 'string' && startCursor !== 'undefined'
        ? startCursor
        : undefined;

    const result = await getPostsByCategory({
      category: categoryStr,
      startCursor: startCursorStr,
      pageSize: pageSizeNum,
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('API 오류:', error);
    res.status(500).json({ message: 'Failed to fetch posts', error });
  }
}
