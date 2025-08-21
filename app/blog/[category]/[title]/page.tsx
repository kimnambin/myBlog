import { getDetailPost, getPostsByCategory } from '../../../../lib/notion';
import rehypeSanitize from 'rehype-sanitize';
import { Metadata } from 'next';
import withSlugs from 'rehype-slug';
import withToc from '@stefanprobst/rehype-extract-toc';
import withTocExport from '@stefanprobst/rehype-extract-toc/mdx';
import dynamic from 'next/dynamic';
import { TocEntry } from '../../../components/layouts/(detatilBlog)/TableContent';
import { compile } from '@mdx-js/mdx';
import NotFound from '../@error/not-found';
import PostingMenu from '@/app/components/layouts/(etc)/PostingMenu';
import ShareModal from '@/app/components/layouts/(etc)/ShareModal';
import { BsCalendarDate } from 'react-icons/bs';
import { BgColor } from '@/app/components/model/category';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

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

const TableOfContents = dynamic(
  () => import('../../../components/layouts/(detatilBlog)/TableContent')
);
const MobileTableContent = dynamic(
  () => import('@/app/components/layouts/(detatilBlog)/MobileTableContent')
);

export const revalidate = 60;

const BlogPost = async ({ params }: { params: { category: string; title: string } }) => {
  const { title } = await params;

  const decodedTitle = decodeURIComponent(title);

  const { markdown, post } = await getDetailPost(decodedTitle);

  const { data } = await compile(markdown, {
    rehypePlugins: [withSlugs, rehypeSanitize, withToc, withTocExport],
  });

  if (!data) {
    <NotFound />;
  }

  return (
    <div className="mobileContent mt-3 flex w-full gap-4.5 border-b p-3">
      <div className="prose prose-neutral prose-headings:scroll-mt-[var(--header-height)] mx-auto grid w-full min-w-[80%]">
        <span className="align-center flex gap-2.5">
          {post?.category?.map((v: any) => (
            <p
              key={v}
              className="w-[85px] rounded-2xl text-center font-bold text-white transition-transform duration-500 hover:scale-105"
              style={{ backgroundColor: BgColor[v] ?? '#0264fb' }}
            >
              {v}
            </p>
          ))}
        </span>
        <h1 className="font-blod gap-2.5">{post?.title}</h1>
        <span className="mt-[-20px] mb-9 flex items-center gap-2.5">
          <BsCalendarDate className="h-6 w-6" />
          <p className="text-[0.75rem] font-bold sm:text-[1rem]">
            {post?.createdTime.slice(0, 10)}
          </p>
          <ShareModal />
        </span>

        <MDXRemote
          source={markdown}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [withSlugs, rehypeSanitize, rehypePrettyCode],
            },
          }}
        />
        {post?.id && <PostingMenu id={post.id} />}
      </div>
      <div className="flex w-52"></div>
      <nav className="TableOfContentsLink bg-muted/60 fixed top-[var(--header-height)] right-[11%] flex h-[calc(100vh-var(--header-height))] w-48 flex-col gap-2 overflow-y-auto p-5">
        <p className="cursor-pointer text-lg font-semibold">목차</p>
        <TableOfContents toc={(data?.toc ?? []) as TocEntry[]} />
      </nav>
      {/* 모바일 환경 시 */}
      <MobileTableContent
        data={{
          toc: (data?.toc ?? []) as { id: string; value: string; depth: number }[],
        }}
        post={post ?? undefined}
      />
    </div>
  );
};

export default BlogPost;
