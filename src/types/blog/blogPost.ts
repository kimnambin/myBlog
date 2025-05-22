export interface PostListProps {
  id: string;
  properties: PostProps;
}

export interface PostProps {
  title: {
    title: { plain_text: string }[];
  };
  subtitle?: {
    rich_text: { plain_text: string }[];
  };
  category?: {
    select: { name: string } | null;
  };
  created_at?: {
    date: { start: string } | null;
  };
  post_id?: {
    rich_text: { plain_text: string }[];
  };

  comments?: {
    rich_text: { plain_text: string }[];
  };

  likes?: {
    rich_text: { plain_text: string }[];
  };

  nickname?: {
    rich_text: { plain_text: string }[];
  };

  img?: {
    rich_text: { href: string }[];
  };
}
