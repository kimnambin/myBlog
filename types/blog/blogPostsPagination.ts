import { PostProps } from './blogPost';

export interface GetPostParams {
  category?: string;
  pageSize?: number;
  startCursor?: string;
}

export interface GetPostResponse {
  posts: PostProps[];
  sort?: string;
  hasMore: boolean;
  nextCursor?: string | null;
  initialCursor?: string | null;
  totalPosting?: number | null;
}

export interface ParamsProps {
  params: {
    category: string;
  };
}

export interface ShowPostListProps {
  posts: PostProps[];
  initialCursor: string | null;
  hasMore: boolean;
  totalPosting: number;
  category?: string;
}
