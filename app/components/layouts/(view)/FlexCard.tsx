import { PostProps } from '@/types/blog/blogPost';
import Link from 'next/link';
import React from 'react';
import Image from 'next/legacy/image';
import { useLoading } from '@/hooks/loading';
import Loading from '../(loading)/loading';
import { BsCalendarDate } from 'react-icons/bs';
import { BgColor } from '../../model/category';

// TODO : 모바일 때 화면 이상함....

const FlexCard = ({ data }: { data: PostProps }) => {
  const { isLoading, handleClick } = useLoading();

  return (
    <>
      {isLoading && <Loading text={'게시글 보러 가는 중...'} />}

      <Link
        href={`/blog/${data.category?.slice(0, 1)}/${data.title}`}
        onClick={handleClick}
        prefetch
      >
        <div className="mt-5 flex flex-row items-start justify-between gap-4 border-b p-3.5">
          <main className="flex h-full flex-col justify-between gap-2">
            <h1 className="overflow-hidden text-sm font-bold text-ellipsis whitespace-nowrap sm:text-lg">
              {data?.title}
            </h1>

            <span className="flex flex-row flex-wrap gap-1">
              {data?.category?.map((v) => (
                <p
                  key={v}
                  className="rounded-2xl text-center text-xs font-bold text-white transition-transform duration-500 hover:scale-105 sm:text-sm"
                  style={{ backgroundColor: BgColor[v] ?? '#0264fb', padding: '2px 4px' }}
                >
                  {v}
                </p>
              ))}
            </span>

            <span className="flex flex-row items-center gap-2">
              <BsCalendarDate className="align-middle" />
              <span className="text-sm">{data?.createdTime.slice(0, 10)}</span>
            </span>
          </main>

          <div className="relative h-24 w-24 flex-shrink-0 sm:h-32 sm:w-32">
            <Image
              src={data.coverImage || '/img/main.jpg'}
              layout="fill"
              className="rounded-lg object-cover"
              alt="main img"
              priority
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default FlexCard;
