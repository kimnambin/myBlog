import Link from 'next/link';

const Header = () => {
  return (
    <header className="top-0 z-50 mx-auto flex border-b">
      <div className="container mx-auto flex h-14 w-[90%] items-center px-4">
        <Link href="/" className="text-xl font-semibold">
          <span className="font-bold">나니 블로그</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/" className="hover:text-primary font-medium">
            <span className="font-bold">홈</span>
          </Link>
          <Link href="/blog" className="hover:text-primary font-medium">
            <span className="font-bold">블로그</span>
          </Link>
          <Link href="#" className="hover:text-primary font-medium">
            <span className="font-bold">소개</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
