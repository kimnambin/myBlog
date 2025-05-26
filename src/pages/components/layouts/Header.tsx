import Link from 'next/link';
import DarkModeBtn from './DarkModeBtn';
import { useSideFn } from '@/hooks/sideFn';
import { data } from './Side';

const Header = () => {
  const { isClick, handleCategory } = useSideFn();

  return (
    <header className="flex w-full items-center justify-between border-b p-5">
      <div className="ml-[10%]">
        <Link href="/" className="text-xl font-semibold">
          <span className="hover:text-hover font-bold">나니 블로그</span>
        </Link>
      </div>
      <nav className="relative mr-[10%] ml-auto flex items-center gap-4">
        {' '}
        {/* relative 추가 */}
        <Link href="/" className="hover:text-hover font-medium">
          <span className="hidden font-bold sm:block">홈</span>
        </Link>
        <span className="cursor-pointer font-bold" onClick={handleCategory}>
          {isClick ? '▼ 카테고리' : '▲ 카테고리'}
        </span>
        {isClick && (
          <div
            id="dropdown-menu"
            className="absolute top-11 right-0 z-100 w-56 rounded-md bg-white shadow-lg ring-1 ring-black dark:bg-[#1E2028]" // z-10 추가
          >
            {data.map((v) => (
              <p className="block px-4 py-2 text-sm text-black hover:bg-gray-100 dark:text-white dark:hover:bg-[#252731]">
                {' '}
                {v}
              </p>
            ))}
          </div>
        )}
        <DarkModeBtn />
      </nav>
    </header>
  );
};

export default Header;
