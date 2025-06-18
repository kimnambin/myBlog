'use client';

import { PostProps } from '../../../../types/blog/blogPost';
import Link from 'next/link';
import { BgColor } from '../../model/category';
import { useLoading } from '../../../../hooks/loading';
import Loading from '../(loading)/loading';
import { useSideFn } from '@/hooks/sideFn';

const MobileSide = () => {
  const { isLoadingBar, startLoading } = useLoading();
  const { search, changeSearch, searchResults, queryLoading, categoryData } = useSideFn();

  return (
    <div
      className={`side-container border-grey-200 z-[1000] flex w-full flex-col justify-center border-b-4`}
    >
      <div className="mx-[10%] flex flex-col p-3">
        <h2 className="font-bold">🔍제목 검색</h2>
        <input
          placeholder="검색어를 입력해주세요."
          className="rounded-1xl border-4"
          onChange={changeSearch}
          value={search}
        />
        <ul>
          {searchResults.map((post: PostProps) => (
            <Link
              href={`/blog/${post.category[0]}/${decodeURIComponent(post.title)}`}
              onClick={startLoading}
              key={post.title}
            >
              <li key={post.title} className="border-2 border-gray-200">
                {post.title.length > 10 ? `${post.title.slice(0, 11)}...` : post.title}
              </li>
            </Link>
          ))}
        </ul>
        <br />
        <h2 className="mb-2 font-bold">📌카테고리 검색</h2>
        {queryLoading && <Loading />}
        {isLoadingBar ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-[repeat(2,_1fr)] gap-1.5">
            {categoryData?.categorys?.slice(1).map((v) => (
              <Link href={`/blog/${v.name}/`} key={v.id} onClick={startLoading}>
                <p
                  className="mb-1.5 rounded-2xl text-center font-bold text-white transition-transform duration-500 hover:scale-105"
                  style={{ backgroundColor: BgColor[v.name] || '#0264fb' }}
                >
                  {v.name}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSide;
