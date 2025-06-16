'use client';

import Link from 'next/link';
import { DarkModeBtn } from '../../theme/DarkModeBtn';
import { GetServerSideProps } from 'next';
import { getCategorysDetail } from '../../../../lib/notion';
import Loading from '../(loading)/loading';
import Side from './Side';
import { useSideFn } from '@/hooks/sideFn';
import { useLoading } from '@/hooks/loading';
import { useState, useEffect } from 'react';
import { TiThMenuOutline } from 'react-icons/ti';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { isClick, handledropDown } = useSideFn();
  const { isLoadingBar, startLoading, stopLoading } = useLoading();

  const pathname = usePathname();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(pathname === '/');
    if (pathname === '/') {
      stopLoading();
    }
  }, [startLoading]);

  return (
    <header className="flex w-full items-center justify-between border-b p-5">
      <div className="ml-[10%]">
        {isLoadingBar && <Loading />}

        <Link href="/" className="text-xl font-semibold" onClick={isHome ? '' : startLoading}>
          <span className="hover:text-hover font-bold">나니 블로그</span>
        </Link>
      </div>

      <nav className="relative mr-[5%] flex items-center gap-4 sm:mr-[10%]">
        <aside className="menubar flex items-center gap-2.5">
          <div className="cursor-pointer md:hidden" onClick={handledropDown}>
            {isClick ? '✖' : <TiThMenuOutline className="h-[28px] w-[28px]" />}
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            <span className="hover:text-hover cursor-pointer font-bold" onClick={handledropDown}>
              {isClick ? '▼ 카테고리' : '▲ 카테고리'}
            </span>
            {isClick && (
              <div id="dropdown-menu" className="absolute top-11 right-0 z-100 bg-white">
                <Side />
              </div>
            )}
            <DarkModeBtn />
            <Link href="/blog/write" onClick={startLoading} className="hover:text-hover font-bold">
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
