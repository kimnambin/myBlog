import { getPostsByCategory } from '@/lib/notion';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const { category, startCursor, pageSize } = req.query;
  console.log('Request query:', req.query);

  const result = await getPostsByCategory({
    category: category?.toString(),
    startCursor: startCursor?.toString(),
    pageSize: pageSize ? parseInt(pageSize.toString(), 10) : 6,
  });

  res.status(200).json(result);
}
