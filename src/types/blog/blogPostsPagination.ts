import { PostProps } from './blogPost';

export interface GetPostParams {
  category?: string;
  pageSize?: number;
  startCursor?: string;
}

export interface GetPostResponse {
  posts: PostProps[];
  hasMore: boolean;
  nextCursor: string | null;
}
