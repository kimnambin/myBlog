import { CategoryProps } from '@/types/blog/blogPost';
import Link from 'next/link';

const BgColor: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  'Next.js': '#000000',
  'React.js': '#61DAFB',
  회고: '#006600',
  트러블슈팅: '#EC1C24',
  코테: '#F38020',
  기타: '#F56565',
};

const Side = ({ categorys }: { categorys: CategoryProps[] }) => {
  return (
    <div className="m-auto my-0 ml-5.5 flex h-full flex-col justify-center rounded-2xl border-4 border-gray-200 p-5">
      <div className="flex flex-col p-3">
        <h2 className="font-bold">🔍제목 검색</h2>
        <input placeholder="검색어를 입력해주세요." className="rounded-1xl border-4" />
        <br />
        <h2 className="font-bold">📌카테고리 검색</h2>

        <div className="grid grid-cols-[repeat(2,_1fr)] gap-1.5">
          {categorys.map((v) => (
            <Link href={v.name == '전체' ? '/' : `/blog/${v.name}/`}>
              <p
                className="mb-1.5 rounded-2xl text-center font-bold text-white transition-transform duration-500 hover:scale-105"
                key={v.id}
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
