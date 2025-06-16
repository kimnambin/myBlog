'use client';

import { CategoryResponse } from '../../../../types/blog/blogPost';
import Link from 'next/link';
import { BgColor } from '../../model/category';
import { useLoading } from '../../../../hooks/loading';
import { useSideFn } from '../../../../hooks/sideFn';
import Loading from '../(loading)/loading';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

const Side = () => {
  const { isLoadingBar, startLoading } = useLoading();
  // const { search, changeSearch, searchResults } = useSideFn();

  // TODO : 큰 화면 일땐 디자인 수정
  const { data: categoryData, isLoading: queryLoading } = useQuery<CategoryResponse>({
    queryKey: ['getCategory'],
    queryFn: async () => {
      const res = await fetch('/api/blog/getCategory');
      if (!res.ok) {
        throw new Error('데이터를 가져오는 중 오류 발생');
      }

      return res.json();
    },
  });

  const { data: searchData, isLoading: searchLoading } = useQuery({
    queryKey: ['searchData'],
    queryFn: async () => {
      const res = await fetch('/api/blog');
      if (!res.ok) {
        throw new Error('데이터를 가져오는 중 오류 발생');
      }

      return res.json();
    },
  });

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value;
    setSearch(result);

    if (result && searchData) {
      const filteredResults = searchData.posts.filter((post) =>
        post.title.toLowerCase().includes(result.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

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
          {searchResults.map((post) => (
            <Link
              href={`/blog/${post.category[0]}/${decodeURIComponent(post.title)}`}
              onClick={startLoading}
            >
              <li key={post.id} className="border-2 border-gray-200">
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

export default Side;
