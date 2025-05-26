import { useRouter } from 'next/router';
import React from 'react';

const BlogPost = () => {
  const router = useRouter();
  const { category, postId } = router.query;

  if (!category || !postId) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <p>블로그 내용이여</p>
      <p>카테고리 : {category}</p>
      <p>zz:{postId}</p>
    </div>
  );
};

export default BlogPost;
