import { PostProps } from '@/types/blog/blogPost';
import Link from 'next/link';
import Image from 'next/image';

const PostList = ({ id, data }: { id: string; data: PostProps }) => {
  //만약 id로 댓글 조회하는 api 추가해야함

  return (
    <div className="rounded-md bg-slate-400 p-6">
      <Link href={`/posting/${id}`}>
        <h1>{data.title?.title[0]?.plain_text ?? 'dd'}</h1>
        <Image
          src={data.img?.rich_text[0]?.href ?? '/img/main.jpg'}
          width={150}
          height={150}
          alt="main img"
        />
      </Link>
    </div>
  );
};

export default PostList;
