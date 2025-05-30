'use server';

import { blogUpload } from '../lib/notion';

export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const content = formData.get('content') as string;

  await blogUpload({ title, category, content });

  console.log('성공!!');
}
