'use client';

import dynamic from 'next/dynamic';
import SkeletonUI from '../(loading)/skeletonUI';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';

const ShowPosting = dynamic(() => import('./ShowPosting'), {
  loading: () => <SkeletonUI />, 
  ssr: false,
});

const ShowPostingWrapper = ({ source }: { source: MDXRemoteSerializeResult }) => {
  return <ShowPosting source={source} />;
};

export default ShowPostingWrapper;
