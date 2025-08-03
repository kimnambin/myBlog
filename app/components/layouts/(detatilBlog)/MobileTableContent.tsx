'use client';

import React, { useState } from 'react';
import TableOfContents from '../../../components/layouts/(detatilBlog)/TableContent';
import PostingMenu from '../(etc)/PostingMenu';

interface MobileTableContentProps {
  data: {
    toc?: Array<{ id: string; value: string; depth: number }>;
  };
  post?: { id?: string } | null;
}

const MobileTableContent = ({ data, post }: MobileTableContentProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hidden max-[900px]:block fixed right-10 top-30">
      <button onClick={toggleSidebar} className="bg-black text-white p-2 rounded">
        {isOpen ? '닫기' : '목차'}
      </button>

      <nav
        className={`fixed top-[var(--header-height)] right-0 flex h-[calc(100vh-var(--header-height))] w-48 flex-col gap-2 overflow-y-auto p-5 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <p className="cursor-pointer text-lg font-semibold">목차</p>
        <TableOfContents toc={data?.toc ?? []} />
        {post?.id && <PostingMenu id={post.id} />}
      </nav>
    </div>
  );
};

export default MobileTableContent;
