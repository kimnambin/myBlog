import { Client } from '@notionhq/client';
import type { CategoryProps, PostListProps, PostProps } from '../types/blog/blogPost';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

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
    .map((page) => {
      const { properties, id, cover } = page;

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
        id,
        title:
          properties.title?.type === 'title' ? (properties.title.title[0]?.plain_text ?? '') : '',

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
          properties.created_at?.type === 'date'
            ? (properties.created_at.date?.start ?? null)
            : null,

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
          properties.img?.type === 'rich_text'
            ? properties.img.rich_text.map((r) => r.href ?? '')
            : [],

        coverImage: getCoverImage(cover),
      };
    });
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
