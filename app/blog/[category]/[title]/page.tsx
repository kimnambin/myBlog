import { getDetailPost, getPostsByCategory } from '../../../../lib/notion';
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
import { BgColor } from '@/app/components/model/category';
import { BsCalendarDate } from 'react-icons/bs';
import ShareModal from '@/app/components/layouts/(etc)/ShareModal';
import PostingMenu from '@/app/components/layouts/(etc)/PostingMenu';
import ScrollBar from '@/app/components/layouts/(detatilBlog)/ScrollBar';
import BlogPostSkeleton from '@/app/components/layouts/(loading)/skeletonUI';
import ShowPostingWrapper from '@/app/components/layouts/(detatilBlog)/ShowPostingWrapper';


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


  return (
    <div className="mobileContent mt-3 flex w-full gap-4.5 border-b p-3">
      <ScrollBar />
      <div className="prose prose-neutral prose-headings:scroll-mt-[var(--header-height)] mx-auto grid w-full min-w-[80%]">
        <span className="align-center flex gap-2.5">
          {post?.category?.map((v) => (
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
        {/* <ShowPosting source={mdxSource} /> */}
        <ShowPostingWrapper  source={mdxSource} />
          {post?.id && <PostingMenu id={post.id} />}
      </div>

      <div className="flex w-52"></div>

      <nav className="TableOfContentsLink bg-muted/60 fixed top-[var(--header-height)] right-[11%] flex h-[calc(100vh-var(--header-height))] w-48 flex-col gap-2 overflow-y-auto p-5">
        <p className="cursor-pointer text-lg font-semibold">목차</p>
        <TableOfContents toc={data?.toc ?? []} />
      </nav>

      {/* 모바일 환경 시 */}
      <div className="fixed right-5 bottom-15 hidden px-5 py-2 text-black max-[900px]:block">
        <details className="backdrop-blur-sm">
          <summary className="flex cursor-pointer items-center justify-between bg-black p-4 text-lg font-semibold text-white transition-colors duration-300 ease-in-out">
            <span>목차</span>
          </summary>
          <nav className="space-y-3 bg-white p-4 text-sm transition-all duration-300 ease-in-out">
            <TableOfContents toc={data?.toc ?? []} />
          </nav>
        </details>
        {post?.id && <PostingMenu id={post.id} />}
      </div>
  
    </div>
  );
};

export default BlogPost;
