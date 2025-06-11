'use client';

import Link from 'next/link';
import { DarkModeBtn } from '../../theme/DarkModeBtn';
import { GetServerSideProps } from 'next';
import { getCategorysDetail } from '../../../../lib/notion';
import Loading from '../(loading)/loading';
import Side from './Side';
import { useSideFn } from '@/hooks/sideFn';
import { useLoading } from '@/hooks/loading';
import { useState } from 'react';
import { TiThMenuOutline } from 'react-icons/ti';

const Header = () => {
  const { isClick, handledropDown } = useSideFn();
  const { isLoading, handleClick } = useLoading();

  // TODO : loading 페이지 찾아보기

  return (
    <header className="flex w-full items-center justify-between border-b p-5">
      {isLoading && <Loading text="페이지 이동 중..." />}
      <div className="ml-[10%]">
        <Link href="/" className="text-xl font-semibold" onClick={handleClick}>
          <span className="hover:text-hover font-bold">나니 블로그</span>
        </Link>
      </div>

      <nav className="relative mr-[10%] ml-auto flex items-center gap-4">
        <aside className="menubar flex items-center gap-2.5">
          <div className="cursor-pointer md:hidden" onClick={handledropDown}>
            {isClick ? '✖' : <TiThMenuOutline className="h-[28px] w-[28px]" />}
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
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
          </div>

          {isClick && (
            <div className="absolute top-11 right-0 z-100 bg-white md:hidden">
              <Side />
            </div>
          )}
        </aside>
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
