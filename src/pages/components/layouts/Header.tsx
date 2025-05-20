import Link from 'next/link';
import DarkModeBtn from './DarkModeBtn';

const Header = () => {
  return (
    <header className="top-0 z-50 mx-auto flex border-b">
      <div className="container mx-auto flex h-14 w-[90%] items-center px-4">
        <Link href="/" className="text-xl font-semibold">
          <span className="hover:text-hover font-bold">나니 블로그</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/" className="hover:text-hover font-medium">
            <span className="font-bold">홈</span>
          </Link>
          <Link href="/blog" className="hover:text-hover font-medium">
            <span className="font-bold">블로그</span>
          </Link>
          <DarkModeBtn />
        </nav>
      </div>
    </header>
  );
};

export default Header;
