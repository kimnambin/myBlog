'use client';

import { useParams } from 'next/navigation';
import Main from '@/app/components/layouts/(core)/Main';

export default function CategoryList() {
  const { category } = useParams() as { category: string };

  return <Main category={category} />;
}
