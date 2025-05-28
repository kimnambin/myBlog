import { getPostBySlug } from '@/lib/notion';
import { PostProps } from '@/types/blog/blogPost';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import Link from 'next/link';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import extractToc from '@stefanprobst/rehype-extract-toc';
import { serialize } from 'next-mdx-remote/serialize';
import { VFile } from 'vfile';

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
  const { markdown, post } = await getPostBySlug(title);

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

  console.log(mdxSource);

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
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div>
      {/* <p>카테고리: {post?.category.join(', ')}</p> */}

      <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none">
        <MDXRemote {...mdxSource} key={post?.post_id} />
      </div>

      <nav className="space-y-3 text-sm">
        {toc?.map((item: any) => <TableOfContentsLink key={item.id} item={item} />)}
      </nav>
    </div>
  );
};

export default BlogPost;
