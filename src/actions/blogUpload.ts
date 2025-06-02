'use server';

import { PostFormState } from '@/types/blog/blogPost';
import { blogUpload } from '../lib/notion';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해주세요.' }),
  category: z.string().min(1, { message: '카테고리를 입력해주세요.' }),
  content: z.string().min(10, { message: '내용은 최소 10자 이상' }),
});

export async function createPostAction(prevState: PostFormState, formData: FormData) {
  const rawFormData = {
    title: String(formData.get('title')),
    category: String(formData.get('category')),
    content: String(formData.get('content')),
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

    await blogUpload({
      title,
      category,
      content,
    });

    return {
      message: '포스팅 업로드 완료!!',
    };
  } catch (e) {
    console.error('Error blog upload:', e);
    return {
      message: '포스팅 업로드 실패',
      formData: rawFormData,
    };
  }
}
