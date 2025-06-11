'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

export default function GetPosting({ source }: MdxContentProps) {
  return (
    <MDXRemote
      {...source}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeSlug, rehypeSanitize, rehypePrettyCode],
        },
      }}
    />
  );
}
