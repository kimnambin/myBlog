import { CategoryProps } from '@/types/blog/blogPost';
import Link from 'next/link';
import { BgColor } from '../category';
import { useLoading } from '@/hooks/loading';
import Loading from './loading';

const Side = ({ categorys }: { categorys: CategoryProps[] }) => {
  const { isLoading, handleClick } = useLoading();

  return (
    <div className="ml-5.5 flex flex-col justify-center rounded-2xl border-4 border-gray-200 p-5">
      <div className="flex flex-col p-3">
        <h2 className="font-bold">🔍제목 검색</h2>
        <input placeholder="검색어를 입력해주세요." className="rounded-1xl border-4" />
        <br />
        <h2 className="font-bold">📌카테고리 검색</h2>

        {isLoading && <Loading text="페이지 이동 중..." />}
        <div className="grid grid-cols-[repeat(2,_1fr)] gap-1.5">
          {categorys.map((v) => (
            <Link
              href={v.name == '전체' ? '/' : `/blog/${v.name}/`}
              key={v.id}
              onClick={handleClick}
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
      </div>
    </div>
  );
};

export default Side;
