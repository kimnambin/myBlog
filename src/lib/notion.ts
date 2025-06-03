import { Client } from '@notionhq/client';
import type {
  CategoryProps,
  PostListProps,
  PostProps,
  BlogUploadProps,
} from '../types/blog/blogPost';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { NotionToMarkdown } from 'notion-to-md';
import { GetPostParams, GetPostResponse } from '@/types/blog/blogPostsPagination';

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

if (typeof window !== 'undefined') {
  throw new Error('❌ Notion API는 클라이언트에서 사용할 수 없습니다.');
}

const n2m = new NotionToMarkdown({ notionClient: notion });

// 전체 블로그 내용 가져오기
export const getAllPost = (page: PageObjectResponse): PostProps => {
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

// 블로그 상세 정보 가져오기
export const getDetailPost = async (
  title: string
): Promise<{
  markdown: string;
  post: PostProps | null;
}> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
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
    post: getAllPost(response.results[0] as PageObjectResponse),
  };

  // return getPageMetadata(response);
};

// 카테고리 별 포스팅 가져오기
export const getPostsByCategory = async ({
  category,
  pageSize = 50, // TODO : 나중에 데이터가 많아지면 어떻게 해야하지...
  startCursor,
}: GetPostParams = {}): Promise<GetPostResponse> => {
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

    page_size: pageSize,
    start_cursor: startCursor,
  });

  // console.log(response.results);

  const posts = response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getAllPost);

  return {
    posts,
    hasMore: response.has_more,
    nextCursor: response.next_cursor,
  };
};

// 카테고리 별 블로그 갯수
export const getCategorysDetail = async (category?: string): Promise<CategoryProps[]> => {
  const { posts } = await getPostsByCategory({ pageSize: 100 });

  const tagCount = posts.reduce(
    (acc, cur) => {
      // cur.category?.forEach((v) => {
      //   acc[v] = (acc[v] || 0) + 1;
      // });
      if (!category || cur.category?.includes(category)) {
        cur.category?.forEach((v) => {
          acc[v] = (acc[v] || 0) + 1;
        });
      }
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
