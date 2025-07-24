'use client';

import dynamic from 'next/dynamic';
import BlogPostSkeleton from '../(loading)/BlogPostSkeleton';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import ScrollTopBtn from '../(side)/ScrollTop';

const ShowPosting = dynamic(() => import('./ShowPosting'), {
  loading: () => <BlogPostSkeleton />,
  ssr: false,
});

const ShowPostingWrapper = ({ source }: { source: MDXRemoteSerializeResult }) => {
  return (
    <>
      <ShowPosting source={source} />
      <ScrollTopBtn />
    </>
  );
};

export default ShowPostingWrapper;
