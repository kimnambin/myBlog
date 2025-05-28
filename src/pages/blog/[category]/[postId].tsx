import { getPostBySlug } from '@/lib/notion';
import { PostProps } from '@/types/blog/blogPost';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { category } = context.params as { category: string };
  const { markdown, post } = await getPostBySlug(category);

  return {
    props: {
      markdown,
      post,
    },
  };
}

const BlogPost = ({ markdown, post }: { markdown: string; post: PostProps | null }) => {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <div>
      <p>블로그 내용: {markdown}</p>
      <p>카테고리: {post?.category}</p>
      <p>게시물 ID: {postId}</p>

      <div className="prose prose-neutral prose-sm dark:prose-invert max-w-none">
        <MDXRemote
          source={markdown}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>
    </div>
  );
};

export default BlogPost;
