'use client';

import { Loader2 } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { createPostAction } from '../../../../actions/createPostAction';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '../../layouts/(etc)/Alert';
import MDEditor from '@uiw/react-md-editor';


interface FormData {
  title: string;
  category: string;
  content: string;
}

export default function WritePage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [content, setContent] = useState('');
  const [state, formAction, isPending] = useActionState(createPostAction, {
    message: '',
    errors: {},
    formData: {
      title: '',
      category: '',
      content: '',
    },
  });

  useEffect(() => {
    if (state.success || state.redirect) {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.push('/');
    }
  }, [state, queryClient, router]);

  const categories = ['전체', '기타', '코테', '회고', 'CS', 'JavaScript', 'Next.js', 'React.js'];


  return (
    <form action={formAction}>
      <div className="mx-auto w-full">
        <div className="p-6">
          {/* ✅ 메시지 출력 영역 */}
          {state?.message && (
            <Alert className={`mb-6 ${state.errors ? 'bg-red-50' : 'bg-green-50'}`}>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          
          

          {/* 제목 입력 */}
          <div className="mb-6 space-y-2">
            <div>제목</div>
            <input
              id="title"
              name="title"
              placeholder="제목을 입력해주세요"
              className="h-12 w-full rounded border px-3 text-lg"
              required
            />
            {state?.errors?.title && (
              <p className="text-sm text-red-500">{state.errors.title[0]}</p>
            )}
          </div>

          {/* 카테고리 선택 */}
          <div className="mb-6 space-y-2">
            <div>카테고리</div>
            <select
              id="category"
              name="category"
              className="h-12 w-full rounded border px-3"
              defaultValue=""
              required
            >
              <option value="" disabled>
                카테고리를 선택해주세요
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {state?.errors?.category && (
              <p className="text-sm text-red-500">{state.errors.category[0]}</p>
            )}
          </div>

          {/* 본문 입력 */}
          <div className="space-y-2">
            <div>본문</div>

            {/* 🔍 숨겨진 input 추가해서 서버에 content 전달 */}
            <input type="hidden" name="content" value={content} />

            <MDEditor
              id="content"
              height={350}
              value={content}
              onChange={(val) => setContent(val || '')}
            />

            {state?.errors?.content && (
              <p className="text-sm text-red-500">{state.errors.content[0]}</p>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="mt-6 flex justify-end gap-2">
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {isPending && (
                <Loader2 className="mr-2 inline-block h-4 w-4 animate-spin align-middle" />
              )}
              업로드
            </button>
          </div>
        </div>
      </div>
    
    </form>
    
  );
}

