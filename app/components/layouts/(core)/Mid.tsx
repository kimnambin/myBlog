import { PostProps } from '../../../../types/blog/blogPost';
import Link from 'next/link';
import Image from "next/legacy/image";
import Loading from '../(loading)/loading';
import { useLoading } from '../../../../hooks/loading';

// import dynamic from 'next/dynamic';
// const MdxContent = dynamic(() => import('../../../components/layouts/(core)/Mdx.tsx'), {
//   ssr: false,
// });

const Post = ({ data }: { data: PostProps }) => {
  const { isLoading, handleClick } = useLoading();

  // TODO : 맨 마지막 게시글이 footer에 닿음

  return (
    <div>
      {isLoading && <Loading text={'게시글 보러 가는 중...'} />}
      <Link
        href={`/blog/${data.category?.slice(0, 1)}/${data.title}`}
        onClick={handleClick}
        prefetch
      >
        <h1>{data.title ?? '제목을 불러올 수 없음'}</h1>
        <div className="relative w-full pb-[61.8%]">
          <Image
            src={data.coverImage || '/img/main.jpg'}
            layout="fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            objectFit="cover"
            alt="main img"
            priority
          />
        </div>
      </Link>
    </div>
  );
};

export default Post;
