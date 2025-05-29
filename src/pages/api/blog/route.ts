import { getCategorysDetail } from '@/lib/notion';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const posts = await getCategorysDetail();

  return NextResponse.json({ posts });
}
