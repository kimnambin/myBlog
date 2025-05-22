import { PostProps } from '@/types/blog/blogPost';

const PostList = ({ id, data }: { id: string; data: PostProps }) => {
  console.log(data);

  //만약 id로 댓글 조회하는 api 추가해야함

  // 기능은 달라진 거 없는데 댓글 조회 api가 있다는 거랑 파일 구조 변경함

  return (
    <div className="rounded-md bg-slate-400 p-6">
      <h1>{data.title?.title[0]?.plain_text ?? 'dd'}</h1>
      <p>{data.subtitle?.rich_text[0]?.plain_text ?? '22'}</p>
    </div>
  );
};

export default PostList;
