import { getPosts } from '@/lib/notion';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const posts = await getPosts();

  return NextResponse.json({ posts });
}
