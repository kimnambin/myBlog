import { useLoading } from '@/hooks/loading';
import { PostProps } from '@/types/blog/blogPost';
import Link from 'next/link';
import React from 'react';
import Image from 'next/legacy/image';
import Loading from '../(loading)/loading';

const GridCard = ({ data }: { data: PostProps }) => {
  const { isLoading, handleClick } = useLoading();

  {
    isLoading && <Loading text={'게시글 보러 가는 중...'} />;
  }
  return (
    <div>
      <Link
        href={`/blog/${data.category?.slice(0, 1)}/${data.title}`}
        onClick={handleClick}
        prefetch
      >
        <div className="relative w-full pb-[61.8%]">
          <Image
            src={data.coverImage || '/img/main.jpg'}
            layout="fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            objectFit="cover"
            alt="main img"
            priority
          />
        </div>
        <h1>{data.title ?? '제목을 불러올 수 없음'}</h1>
      </Link>
    </div>
  );
};

export default GridCard;
