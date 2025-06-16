import { getCategorysDetail, getPostsByCategory } from '../lib/notion';
import { Metadata } from 'next';
import PostList from './components/layouts/(core)/PostList';
import Side from './components/layouts/(core)/Side';

export const metadata: Metadata = {
  title: 'Nani Blog',
  description: '배운 것을 잊지 않기 위해 기록하는 나니의 블로그입니다.',
  alternates: {
    canonical: '/',
  },
};

const Home = async () => {
  const { posts, hasMore, nextCursor } = await getPostsByCategory();
  const categorys = await getCategorysDetail();
  const totalPosting = categorys[0].count;

  return (
    <main className="z-50 mt-[30px] mb-6.5 flex w-full">
      <div className="container mx-auto flex w-full sm:px-4">
        <div className="flex flex-[3] flex-col">
          <PostList
            posts={posts}
            initialCursor={nextCursor}
            hasMore={hasMore}
            totalPosting={totalPosting}
          />
        </div>
        <div className="hidden-side ml-auto hidden h-full flex-col items-center gap-4 sm:flex">
          <div className="flex h-full flex-col justify-between">
            <Side />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
