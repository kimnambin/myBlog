'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import { serialize } from 'next-mdx-remote/serialize';

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

export default function GetPosting({ source }: MdxContentProps) {
  return <MDXRemote {...source} />;
}

export async function fetchMDXContent(markdown: string) {
  const mdxOptions = {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, rehypeSanitize, rehypePrettyCode],
  };

  const serializedSource = await serialize(markdown, { mdxOptions });

  return serializedSource;
}
