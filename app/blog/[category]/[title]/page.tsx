import { getDetailPost, getPostsByCategory } from '../../../../lib/notion';
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
import TableOfContents from '../../../components/layouts/(detatilBlog)/TableContent';

export async function generateMetadata({
  params,
}: {
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
    category: post.category?.[0],
    openGraph: {
      title: post.title,
      url: `/blog/${post.category}/${post.title.slice(0, 11)}`,
      type: 'article',
    },
  };
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

const BlogPost = async ({ params }: { params: { category: string; title: string } }) => {
  const { title } = await params;

  const decodedTitle = decodeURIComponent(title);

  const { markdown, post } = await getDetailPost(decodedTitle);

  const mdxSource = await serialize(markdown, {
    mdxOptions: {
      rehypePlugins: [withSlugs, rehypeSanitize, withToc, withTocExport],
    },
  });

  if (!markdown) {
    return notFound();
  }

  const { data } = await compile(markdown, {
    rehypePlugins: [withSlugs, rehypeSanitize, withToc, withTocExport],
  });

  //  TODO : 디자인 -> 목차 부분 디자인 개선하기!!

  return (
    <div className="mobileContent flex w-full gap-6 border-b p-5">
      <div className="prose prose-neutral dark:prose-invert prose-headings:scroll-mt-[var(--header-height)] max-w-none flex-1">
        <ShowPosting source={mdxSource} category={post?.category} />
      </div>

      <div className="flex w-52"></div>

      <nav className="TableOfContentsLink dark:prose-invert fixed top-[var(--header-height)] right-[10%] z-[1000] flex h-[calc(100vh-var(--header-height))] w-64 flex-col gap-2 overflow-y-auto p-5">
        <p className="cursor-pointer text-lg font-semibold">목차</p>
        <TableOfContents toc={data?.toc ?? []} />
      </nav>

      {/* 모바일 환경 시 */}
      <div className="fixed right-10 bottom-15 hidden rounded-full px-5 py-2 text-black max-[900px]:block">
        <details className="bg-muted/60 rounded-lg p-4 backdrop-blur-sm">
          <summary className="cursor-pointer text-lg font-semibold">목차</summary>
          <nav className="mt-3 space-y-3 text-sm">
            <TableOfContents toc={data?.toc ?? []} />
          </nav>
        </details>
      </div>
    </div>
  );
};

export default BlogPost;
