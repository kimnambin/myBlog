'use client';

import Link from 'next/link';
import { DarkModeBtn } from '../../theme/DarkModeBtn';
import { GetServerSideProps } from 'next';
import { getCategorysDetail } from '../../../../lib/notion';
import Loading from '../(loading)/loading';
import Side from './Side';
import { useSideFn } from '@/hooks/sideFn';
import { useLoading } from '@/hooks/loading';

const Header = () => {
  const { isClick, handledropDown } = useSideFn();
  const { isLoading, handleClick } = useLoading();

  // TODO : main (/) 여기서 열면 괜찮은데 다른 곳에서 열면 map 오류 발생...

  return (
    <header className="flex w-full items-center justify-between border-b p-5">
      {/* {isLoading && <Loading text="페이지 이동 중..." />} */}
      <div className="ml-[10%]">
        <Link
          href="/"
          className="text-xl font-semibold"
          // onClick={handleClick}
        >
          <span className="hover:text-hover font-bold">나니 블로그</span>
        </Link>
      </div>
      <nav className="relative mr-[10%] ml-auto flex items-center gap-4">
        <Link href="/" className="hover:text-hover font-medium" onClick={handleClick}>
          <span className="hidden font-bold sm:block">홈</span>
        </Link>
        <span className="cursor-pointer font-bold" onClick={handledropDown}>
          {isClick ? '▼ 카테고리' : '▲ 카테고리'}
        </span>
        {isClick && (
          <div id="dropdown-menu" className="absolute top-11 right-0 z-100 bg-white">
            <Side />
          </div>
        )}
        <DarkModeBtn />

        <Link href="/blog/write" onClick={handleClick}>
          글쓰기
        </Link>
      </nav>
    </header>
  );
};

export default Header;

// 빌드 타입에 호출
export const getServerSideProps: GetServerSideProps = async () => {
  const categorys = await getCategorysDetail();
  return {
    props: {
      categorys,
    },
  };
};
