import { PostProps } from '@/types/blog/blogPost';
import React from 'react';

const PostList = ({ data }: { data: PostProps }) => {
  return (
    <div className="rounded-md bg-slate-400 p-6">
      <h1>{data.title?.title[0]?.plain_text ?? 'dd'}</h1>
      <p>{data.subtitle?.rich_text[0]?.plain_text ?? '22'}</p>
      <p></p>
    </div>
  );
};

export default PostList;
