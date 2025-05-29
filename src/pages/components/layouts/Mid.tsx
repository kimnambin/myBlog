import { PostProps } from '@/types/blog/blogPost';
import Link from 'next/link';
import Image from 'next/image';

import Loading from '@/pages/components/layouts/loading';
import { useLoading } from '@/hooks/loading';

const PostList = ({ data }: { data: PostProps }) => {
  const { isLoading, handleClick } = useLoading();

  return (
    <div>
      {isLoading && <Loading />}
      <Link href={`/blog/${data.category?.slice(0, 1)}/${data.title}`} onClick={handleClick}>
        <h1>{data.title ?? '제목을 불러올 수 없음'}</h1>
        <Image
          src={data.coverImage ?? '/img/main.jpg'}
          loading="lazy"
          width={150}
          height={150}
          alt="main img"
          className="h-32"
        />
      </Link>
    </div>
  );
};

export default PostList;
