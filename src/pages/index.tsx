import { TempData } from '@/types/tmpData';
import Link from 'next/link';

export default function Home() {
  const data: TempData[] = [
    {
      id: '1',
      title: '블로그 제목 1',
      content: '블로그 내용임',
    },
    {
      id: '2',
      title: '블로그 제목 2',
      content: '블로그 내용222임',
    },
  ];

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">목록</h2>
          {data.map((idx) => (
            <Link href={`/blog/${idx.id}`} key={idx.title} className="m-3">
              <div>{idx.title}</div>
              <p>{idx.content}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
