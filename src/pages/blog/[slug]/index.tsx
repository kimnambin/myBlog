import { TempData } from '@/types/tmpData';
import { useRouter } from 'next/router';
import React from 'react';

const BlogPost = async () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <p>블로그 내용이여</p>
      <p>{slug}</p>
    </div>
  );
};

export default BlogPost;
