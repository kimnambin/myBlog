export interface PostListProps {
  id: string;
  properties: PostProps;
}

export interface PostProps {
  id?: string;
  title: string;
  subtitle?: string;
  category?: string[];
  coverImage?: string;
  created_at?: string | null;
  post_id?: string;
  comments?: string[];
  likes?: string[];
  nickname?: string;
  img?: string[];
}

export interface CategoryProps {
  id: string;
  name: string;
  count: number;
}
