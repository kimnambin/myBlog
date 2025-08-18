'use client';

import { useParams } from 'next/navigation';
import Main from '@/app/components/layouts/(core)/Main';

// TODO : 조회수 기능 추가하기

export default function CategoryList() {
  const { category } = useParams() as { category: string };

  return <Main category={category} />;
}
