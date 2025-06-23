'use client';

import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { getCategorysDetail } from '../../../../lib/notion';
import Loading from '../(loading)/loading';
import Side from './Side';
import { useSideFn } from '@/hooks/sideFn';
import { useLoading } from '@/hooks/loading';
import { useState, useEffect } from 'react';
import { TiThMenuOutline } from 'react-icons/ti';
import { usePathname } from 'next/navigation';
import { BiLogoGithub } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';

const Header = () => {
  const { isClick, handledropDown } = useSideFn();
  const { isLoadingBar, startLoading, stopLoading } = useLoading();

  const pathname = usePathname();
  const [isHome, setIsHome] = useState<boolean>(true);

  useEffect(() => {
    setIsHome(pathname === '/');
    if (pathname === '/') {
      stopLoading();
    }
  }, [startLoading]);

  return (
    <header className="fixed z-3000 flex w-full items-center justify-between border-b bg-white p-5">
      <div className="ml-[10%]">
        {isLoadingBar && <Loading />}

        <Link
          href="/"
          className="text-xl font-semibold"
          onClick={() => (isHome ? '' : startLoading)}
        >
          <span className="hover:text-hover font-bold">나니 블로그</span>
        </Link>
      </div>
      {/* TODO : 메뉴바 나오는 거 수정해야 할 듯 좀더 큰 화면에서 나오도록 */}
      <nav className="relative mr-[5%] flex items-center gap-4 sm:mr-[10%]">
        <aside className="menubar flex items-center gap-2.5">
          <div className="hidden items-center gap-2.5 md:flex">
            {/* <Link href="/blog/write" onClick={startLoading} className="hover:text-hover font-bold">
              글쓰기
            </Link> */}
            <span className="mr-[10%] ml-auto flex items-center gap-4">
              <a
                className="hover:text-hover ml-3 text-gray-500"
                href="https://github.com/kimnambin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BiLogoGithub className="h-8 w-8" />
              </a>
              <a
                className="hover:text-hover ml-3 text-gray-500"
                href="mailto:helloword@na.com?subject=제목입니다!"
              >
                <AiOutlineMail className="h-8 w-8" />
              </a>
            </span>
          </div>
          <div className="cursor-pointer md:hidden" onClick={handledropDown}>
            {isClick ? '✖' : <TiThMenuOutline className="h-[28px] w-[28px]" />}
          </div>
          {isClick && (
            <div id="dropdown-menu" className={`bigSideWidth ${isClick ? 'open' : ''}`}>
              <Side side={true} />
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
