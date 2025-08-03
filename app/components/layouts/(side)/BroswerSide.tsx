'use client';

import { CategoryProps, PostProps } from '../../../../types/blog/blogPost';
import Link from 'next/link';
import { BgColor } from '../../model/category';
import { useLoading } from '../../../../hooks/loading';

import { useSideFn } from '@/hooks/sideFn';
import Loading from '@/app/loading';

const BrowerSide = () => {
  const { isLoadingBar, startLoading } = useLoading();
  const { search, changeSearch, searchLoading, searchResults, queryLoading, getcategoryList } =
    useSideFn();

  return (
    <div
      className={`side-container z-[1000] ml-5.5 flex flex-col justify-center rounded-2xl border-4 border-gray-200 p-5`}
    >
      <div className="flex flex-col p-3">
        <h2 className="font-bold">🔍제목 검색</h2>
        <input
          placeholder="검색어를 입력해주세요."
          className="rounded-1xl border-4"
          onChange={changeSearch}
          value={search}
        />

        <ul>
          {isLoadingBar ? (
            <Loading />
          ) : (
            searchResults.map((post: PostProps) => (
              <Link
                href={`/blog/${post.category[0]}/${decodeURIComponent(post.title)}`}
                onMouseDown={startLoading}
                key={post.id}
              >
                <li className="border-2 border-gray-200">
                  {post.title.length > 10 ? `${post.title.slice(0, 11)}...` : post.title}
                </li>
              </Link>
            ))
          )}
        </ul>

        <br />
        <h2 className="mb-2 font-bold">📌카테고리 검색</h2>

        {queryLoading && <Loading />}
        {isLoadingBar ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-[repeat(2,_1fr)] gap-1.5">
            {getcategoryList?.categorys?.slice(1).map((v: CategoryProps) => (
              <Link
                href={`/blog/${encodeURIComponent(v.name)}/`}
                key={v.id}
                onMouseDown={startLoading}
              >
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

export default BrowerSide;
