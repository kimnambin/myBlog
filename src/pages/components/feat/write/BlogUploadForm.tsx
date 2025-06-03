'use client';

import { Loader2 } from 'lucide-react';
import { useActionState, useReducer } from 'react';
import { createPostAction } from '@/actions/createPostAction';
import { Alert, AlertDescription } from '../../layouts/Alert';
// import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WritePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
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
    if (state.success) {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      router.push('/');
    }
  }, [state, queryClient, router]);

  const categories = ['전체', '기타', '코테', '회고', 'CS', 'JavaScript', 'Next.js', 'React.js'];

  if (state?.redirect) {
    router.push('/'); // 리디렉션 경로
  }

  return (
    <form action={formAction}>
      <div className="mx-auto max-w-2xl">
        <div className="p-6">
          {/* 상태 메시지 표시 */}
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
              className="h-12 text-lg"
              required
            />
            {state?.errors?.title && (
              <p className="text-sm text-red-500">{state.errors.title[0]}</p>
            )}
          </div>

          {/* 카테고리 선택 */}
          <div className="mb-6 space-y-2">
            <div>카테고리</div>
            <select id="category" name="category" className="h-12" defaultValue="" required>
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
            <textarea
              id="content"
              name="content"
              placeholder="작성해주세요"
              className="min-h-[400px] resize-none"
              required
            />
            {state?.errors?.content && (
              <p className="text-sm text-red-500">{state.errors.content[0]}</p>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className="mt-6 flex justify-end gap-2">
            <button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 hidden h-4 w-4 animate-spin" />}
              업로드
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
