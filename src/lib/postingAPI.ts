import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.TOKEN });

export async function fetchData(databaseId) {
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [{ property: 'created_at', direction: 'descending' }],
  });

  return response.results.filter(isFullPage).map((data) => data);
}
