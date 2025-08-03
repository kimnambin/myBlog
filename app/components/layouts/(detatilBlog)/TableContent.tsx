'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h2, h3, h4')) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '0px 0px -50% 0px', threshold: 0.1 }
    );

    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleScroll = () => {
    const headings = Array.from(document.querySelectorAll('h2, h3, h4'));
    for (const heading of headings) {
      const rect = heading.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        setActiveId(heading.id);
        break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const showToc = (items: TocEntry[]) =>
    items.map((item) => (
      <div key={item.id} className="space-y-2">
        <Link
          href={`#${item.id}`}
          onMouseDown={() => setActiveId(item.id || null)}
          className={`block transition-colors ${
            activeId === item.id
              ? 'font-bold text-blue-600'
              : 'text-muted-foreground hover:text-blue-400'
          }`}
        >
          ▪{item.value.slice(0, 11)}
        </Link>

        {item.children && item.children.length > 0 && (
          <div className="space-y-2 pl-4">{showToc(item.children)}</div>
        )}
      </div>
    ));

  return <nav>{showToc(toc)}</nav>;
}
