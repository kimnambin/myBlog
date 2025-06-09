'use server';

import { PostFormState, BlogUploadProps } from '../types/blog/blogPost';
import { z } from 'zod';
import { revalidateTag } from 'next/cache';

const postSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  category: z.string().min(1, { message: '카테고리를 입력해주세요.' }),
  content: z.string().min(10, { message: '내용은 최소 10자 이상' }),
});

// 클라이언트 API 호출
async function uploadBlogToApi({ title, category, content }: BlogUploadProps) {
  const response = await fetch('/api/blog/uploadBlog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, category, content }),
  });

  if (!response.ok) {
    throw new Error('포스팅 업로드 실패');
  }

  return await response.json();
}

export async function createPostAction(prevState: PostFormState, formData: FormData) {
  const rawFormData = {
    title: formData.get('title')?.toString() ?? '',
    category: formData.get('category')?.toString() ?? '',
    content: formData.get('content')?.toString() ?? '',
  };

  const validatedFields = postSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '유효성 검사에 실패 ㅜㅜ',
      formData: rawFormData,
    };
  }

  try {
    const { title, category, content } = validatedFields.data;
    await uploadBlogToApi({ title, category, content });

    return {
      revalidateTag: 'posts',
      redirect: true,
      success: true,
    };
  } catch (e) {
    console.error('Error blog upload:', e);
    return {
      message: '포스팅 업로드 실패',
      formData: rawFormData,
    };
  }
}
