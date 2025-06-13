'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // TODO : 스크롤 시 색상 지정이 안됨 ㅠㅠ
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3, h4')) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0.1 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const showToc = (items: TocEntry[]) =>
    items.map((item) => (
      <div key={item.id} className="space-y-2">
        <Link
          href={`#${item.id}`}
          onClick={() => setActiveId(item.id || null)}
          className={`block transition-colors ${
            activeId === item.id
              ? 'font-bold text-blue-600'
              : 'text-muted-foreground hover:text-blue-400'
          }`}
        >
          ▪{item.value}
        </Link>

        {item.children && item.children?.length > 0 && (
          <div className="space-y-2 pl-4">{showToc(item.children)}</div>
        )}
      </div>
    ));

  return <nav>{showToc(toc)}</nav>;
}
