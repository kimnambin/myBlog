'use client';
// TODO : 이게 클라이언크 컴포넌트인지 고민해봐야 할 듯...

import { CategoryResponse } from '../../../../types/blog/blogPost';
import Link from 'next/link';
import { BgColor } from '../../model/category';
import { useLoading } from '../../../../hooks/loading';
import Loading from '../(loading)/loading';
import { useQuery } from '@tanstack/react-query';

const Side = () => {
  const { isLoading, handleClick } = useLoading();

  // TODO : 최적화 방법이 있는 지 나중에 확인 ㄱㄱ
  const { data, isLoading: queryLoading } = useQuery<CategoryResponse>({
    queryKey: ['getCategory'],
    queryFn: async () => {
      const res = await fetch('/api/blog/getCategory');
      if (!res.ok) {
        throw new Error('데이터를 가져오는 중 오류 발생');
      }

      return res.json();
    },
  });

  // TODO : 검색 기능 구현해야 함

  return (
    <div className="ml-5.5 flex flex-col justify-center rounded-2xl border-4 border-gray-200 p-5">
      <div className="flex flex-col p-3">
        <h2 className="font-bold">🔍제목 검색</h2>
        <input placeholder="검색어를 입력해주세요." className="rounded-1xl border-4" />
        <br />
        <h2 className="mb-2 font-bold">📌카테고리 검색</h2>

        {/* TODO : 이동이 넘 느림 */}
        {isLoading && <Loading text="페이지 이동 중..." />}
        <div className="grid grid-cols-[repeat(2,_1fr)] gap-1.5">
          {data?.categorys?.slice(1).map((v) => (
            <Link href={`/blog/${v.name}/`} key={v.id} onClick={handleClick}>
              <p
                className="mb-1.5 rounded-2xl text-center font-bold text-white transition-transform duration-500 hover:scale-105"
                style={{ backgroundColor: BgColor[v.name] || '#0264fb' }}
              >
                {v.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Side;
