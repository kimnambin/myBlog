export async function GET(ids: string[]) {
  try {
    const results = await Promise.all(
      ids.map(async (id) => {
        const response = await fetch(
          `https://myhits.vercel.app/api/hit/https://www.notion.so/${id}?color=blue&label=hits&size=small`
        );

        if (!response.ok) {
          throw new Error(`Network response was not ok for ID: ${id}`);
        }

        const data = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, 'image/svg+xml');
        const textElements = svgDoc.getElementsByTagName('text');
        const numbers = Array.from(textElements)
          .map((text) => text.textContent)
          .filter((text) => /^\d+$/.test(text));

        console.log(`ID: ${id}, Numbers: ${numbers}`);

        return { id, numbers };
      })
    );

    console.log(results);

    return Response.json({ results });
  } catch (error) {
    console.error('카테고리 데이터를 가져오는 중 오류 발생:', error);
    return new Response(JSON.stringify({ error: '카테고리 데이터를 불러올 수 없습니다.' }), {
      status: 500,
    });
  }
}
