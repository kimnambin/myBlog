import { getCategorysDetail } from '@/lib/notion';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const categorys = await getCategorysDetail();

    res.status(200).json({ categorys });
  } catch (error) {
    console.error('카테고리 데이터를 가져오는 중 오류 발생:', error);
    res.status(500).json({ error: '카테고리 데이터를 불러올 수 없습니다.' });
  }
}
