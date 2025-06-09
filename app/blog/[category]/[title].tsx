import { getDetailPost } from '../../../lib/notion';
import { PostProps } from '../../../types/blog/blogPost';
import { GetServerSidePropsContext } from 'next';
import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import extractToc from '@stefanprobst/rehype-extract-toc';
import { serialize } from 'next-mdx-remote/serialize';
import { VFile } from 'vfile';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const { post } = await getDetailPost(category);

  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다',
      description: '요청하신 게시글을 찾을 수 없습니다.',
    };
  }

  return {
    title: post.title,
    // description: post.description || `${post.title} - 나니의 블로그`,
    // keywords: post.tags,
    // authors: [{ name: post.author || '나니' }],
    publisher: '나니',
    alternates: {
      canonical: `/blog/${post.category}`,
    },
    // category: post.category,
    openGraph: {
      title: post.title,
      // description: post.description,
      url: `/blog/${post.category}`,
      type: 'article',
      // publishedTime: post.date,
      // modifiedTime: post.modifiedDate,
      // authors: post.author || '짐코딩',
    },
  };
}

interface TocEntry {
  value: string;
  depth: number;
  id?: string;
  children?: Array<TocEntry>;
}

type Toc = Array<TocEntry>;

function TableOfContentsLink({ item }: { item: TocEntry }) {
  return (
    <div className="space-y-2">
      <Link
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { title } = context.params as { title: string };
  const { markdown, post } = await getDetailPost(title);

  const file = new VFile({ value: markdown });

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeSanitize)
    .use(extractToc);

  const tree = await processor.parse(file);
  await processor.run(tree, file);

  const toc = file.data.toc;

  const mdxSource = await serialize(markdown, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeSanitize, rehypePrettyCode],
    },
  });

  return {
    props: {
      mdxSource,
      post,
      toc,
    },
  };
}

const BlogPost = ({
  mdxSource,
  post,
  toc,
}: {
  mdxSource: MDXRemoteSerializeResult;
  post: PostProps | null;
  toc: Toc;
}) => {
  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* TODO : 디자인 개선해야함 */}

      <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
        <MDXRemote {...mdxSource} key={post?.post_id} />
      </div>

      <nav className="space-y-3 text-sm">
        {toc?.map((item: any) => <TableOfContentsLink key={item.id} item={item} />)}
      </nav>

      {/* <GiscusComments /> */}
    </div>
  );
};

export default BlogPost;
