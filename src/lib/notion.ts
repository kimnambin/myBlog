import { Client } from '@notionhq/client';
import type { CategoryProps, PostListProps, PostProps } from '../types/blog/blogPost';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

// 포스팅 내용 가져오기
export const getDetailPost = (page: PageObjectResponse): PostProps => {
  const { properties } = page;

  const getCoverImage = (cover: PageObjectResponse['cover']) => {
    if (!cover) return '';

    switch (cover.type) {
      case 'external':
        return cover.external.url;
      case 'file':
        return cover.file.url;
      default:
        return '';
    }
  };

  return {
    id: page.id,
    title: properties.title?.type === 'title' ? (properties.title.title[0]?.plain_text ?? '') : '',

    subtitle:
      properties.subtitle?.type === 'rich_text'
        ? (properties.subtitle.rich_text[0]?.plain_text ?? '')
        : '',

    post_id:
      properties.post_id?.type === 'rich_text'
        ? (properties.post_id.rich_text[0]?.plain_text ?? '')
        : '',

    category:
      properties.category?.type === 'multi_select'
        ? properties.category.multi_select.map((tag) => tag.name)
        : [],

    created_at:
      properties.created_at?.type === 'date' ? (properties.created_at.date?.start ?? null) : null,

    comments:
      properties.comments?.type === 'rich_text'
        ? properties.comments.rich_text.map((r) => r.plain_text)
        : [],

    likes:
      properties.likes?.type === 'rich_text'
        ? properties.likes.rich_text.map((r) => r.plain_text)
        : [],

    nickname:
      properties.nickname?.type === 'rich_text'
        ? (properties.nickname.rich_text[0]?.plain_text ?? '')
        : '',

    img:
      properties.img?.type === 'rich_text' ? properties.img.rich_text.map((r) => r.href ?? '') : [],

    coverImage: getCoverImage(page.cover),
  };
};

export const getPostBySlug = async (
  title: string
): Promise<{
  markdown: string;
  post: PostProps | null;
}> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        // {
        //   property: 'category',
        //   multi_select: {
        //     // multi_select로 변경
        //     contains: category,
        //   },
        // },
        {
          property: 'title',
          title: {
            contains: title,
          },
        },
      ],
    },
  });

  if (response.results.length === 0) {
    return {
      markdown: '',
      post: null,
    };
  }

  // 문자열을 md 형식으로 전환
  const mdBlocks = await n2m.pageToMarkdown(response.results[0].id);
  const { parent } = n2m.toMarkdownString(mdBlocks);

  return {
    markdown: parent,
    post: getDetailPost(response.results[0] as PageObjectResponse),
  };

  // return getPageMetadata(response);
};

// 포스팅 가져오기
export const getPosts = async (category?: string): Promise<PostProps[]> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,

    filter:
      category && category !== '전체'
        ? {
            property: 'category',
            multi_select: {
              contains: category,
            },
          }
        : undefined,
    sorts: [{ property: 'created_at', direction: 'descending' }],
  });

  // console.log(response.results);

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getDetailPost);
};

// 카테고리와 관련된
export const getCategorys = async (): Promise<CategoryProps[]> => {
  const posts = await getPosts();

  const tagCount = posts.reduce(
    (acc, cur) => {
      cur.category?.forEach((v) => {
        acc[v] = (acc[v] || 0) + 1;
      });
      return acc;
    },
    {} as Record<string, number>
  );

  const categorys: CategoryProps[] = Object.entries(tagCount).map(([name, count]) => ({
    id: name,
    name,
    count,
  }));

  // 전체 태그 추가
  categorys.unshift({
    id: 'all',
    name: '전체',
    count: posts.length,
  });

  const [allCategorys, ...restCategorys] = categorys;
  const sortedCategorys = restCategorys.sort((a, b) => a.name.localeCompare(b.name));

  return [allCategorys, ...sortedCategorys];
};
