'use client';

import dynamic from 'next/dynamic';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const Posting = dynamic(() => import('./GetPosting'), {
  ssr: false,
});

interface Props {
  source: MDXRemoteSerializeResult;
}

export default function ShowPosting({ source }: Props) {
  return <Posting source={source} />;
}
