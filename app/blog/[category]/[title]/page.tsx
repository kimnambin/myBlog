import { getDetailPost, getPostsByCategory } from '../../../../lib/notion';
import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import rehypeSanitize from 'rehype-sanitize';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { compile } from '@mdx-js/mdx';
import withSlugs from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import { serialize } from 'next-mdx-remote/serialize';
import ShowPosting from '../../../components/layouts/(detatilBlog)/ShowPosting';

export async function generateMetadata({
  params,
}: {
  // params: Promise<{ category: string }>;
  params: { title: string };
}): Promise<Metadata> {
  const { title } = await params;

  const decodedTitle = decodeURIComponent(title);

  const { post } = await getDetailPost(decodedTitle);

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
      description: '요청하신 게시글을 찾을 수 없습니다.',
    };
  }

  return {
    title: post.title,
    publisher: '나니',
    alternates: {
      canonical: `/blog/${post.category}`,
    },
    category: post.category,
    openGraph: {
      title: post.title,
      url: `/blog/${post.category}/${post.title}`,
      type: 'article',
    },
  };
}

interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

export const generateStaticParams = async () => {
  const { posts } = await getPostsByCategory();

  const paramsArray = posts.flatMap((post) =>
    post.category?.map((category) => ({
      category,
      title: post.title,
    }))
  );

  return paramsArray;
};

export const revalidate = 60;

function TableOfContentsLink({ item }: { item: TocEntry }) {
  return (
    <div className="space-y-2">
      <Link
        key={item.id}
        href={`#${item.id}`}
        className={`hover:text-foreground text-muted-foreground block font-medium transition-colors`}
      >
        {item.value}
      </Link>
      {item.children && item.children.length > 0 && (
        <div className="space-y-2 pl-4">
          {item.children.map((subItem) => (
            <TableOfContentsLink key={subItem.id} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}

const BlogPost = async ({ params }: { params: { category: string; title: string } }) => {
  const { title } = await params;

  const decodedTitle = decodeURIComponent(title);

  const { markdown, post } = await getDetailPost(decodedTitle);

  const mdxSource = await serialize(markdown);

  if (!markdown) {
    return notFound();
  }

  const { data } = await compile(markdown, {
    rehypePlugins: [withSlugs, rehypeSanitize, withToc, withTocExport],
  });

  // TODO : 디자인 개선해야 함
  return (
    <div>
      <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
        <ShowPosting source={mdxSource} />
      </div>

      <nav className="space-y-3 text-sm">
        {data?.toc?.map((item: any) => <TableOfContentsLink key={item.id} item={item} />)}
      </nav>

      {/* <GiscusComments /> */}
    </div>
  );
};

export default BlogPost;
