'use client';

import dynamic from 'next/dynamic';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { BgColor } from '../../model/category';

const Posting = dynamic(() => import('./GetPosting'), {
  ssr: false,
});

interface Props {
  source: MDXRemoteSerializeResult;
  category?: string[];
}

export default function ShowPosting({ source, category }: Props) {
  return (
    <>
      <div className="flex items-start gap-2">
        {category?.map((v) => (
          <p
            key={v}
            className="w-[85px] rounded-2xl text-center font-bold text-white transition-transform duration-500 hover:scale-105"
            style={{ backgroundColor: BgColor[v] ?? '#0264fb' }}
          >
            {v}
          </p>
        ))}
      </div>
      <Posting source={source} />
    </>
  );
}
