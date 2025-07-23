import { PostProps } from '@/types/blog/blogPost';
import Link from 'next/link';
import React from 'react';
import Image from 'next/legacy/image';
import { useLoading } from '@/hooks/loading';
import { BsCalendarDate } from 'react-icons/bs';
import { BgColor } from '../../model/category';

const FlexCard = ({ data }: { data: PostProps }) => {
  const { isLoadingBar, startLoading } = useLoading();

  return (
    <>
      
      <Link
        href={`/blog/${data.category?.slice(0, 1)}/${encodeURIComponent(data.title)}`}
        prefetch
        onClick={startLoading}
      >
        <div className="my-5 flex transform flex-row items-start justify-between gap-4 border-b">
          <main className="flex h-full w-2/3 flex-col justify-between gap-1">
            <h1 className="overflow-hidden text-xs font-bold text-ellipsis whitespace-nowrap sm:text-lg">
              {data?.title.slice(0, 16)}
            </h1>
            <span className="flex flex-row flex-wrap gap-1">
              {data?.category?.map((v) => (
                <p
                  key={v}
                  className="overflow-hidden rounded-2xl text-center text-xs font-bold text-white transition-transform duration-500 hover:scale-105 sm:text-sm"
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
              src={data.img || '/img/main.webp'}
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
