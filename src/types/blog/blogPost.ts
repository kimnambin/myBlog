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
    rich_text: { plain_text: string } | null;
  };

  comments?: {
    rich_text: { plain_text: string } | null;
  };

  likes?: {
    rich_text: { plain_text: string } | null;
  };

  nickname?: {
    rich_text: { plain_text: string } | null;
  };

  img?: {
    rich_text: { plain_text: string } | null;
  };
}

interface RichText {
  type: string;
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

interface Title {
  id: string;
  type: 'title';
  title: RichText[];
}

interface RichTextProperty {
  id: string;
  type: 'rich_text';
  rich_text: RichText[];
}

interface PostListProps {
  subtitle: RichTextProperty;
  img: RichTextProperty;
  post_id: RichTextProperty;
  nickname: RichTextProperty;
  created_at: RichTextProperty;
  category: RichTextProperty;
  comments: RichTextProperty;
  content: RichTextProperty;
  likes: RichTextProperty;
  title: Title;
}
