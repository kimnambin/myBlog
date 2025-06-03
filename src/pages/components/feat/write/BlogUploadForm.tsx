// TODO : 카테고리는 선택으로 수정할 것

'use client';

import { Loader2 } from 'lucide-react';
import { useActionState } from 'react';
import { createPostAction } from '@/actions/createPostAction';
import { Alert, AlertDescription } from '../../layouts/Alert';

export default function WritePage() {
  const [state, formAction, isPending] = useActionState(createPostAction, {
    message: '',
    errors: {},
    formData: {
      title: '',
      category: '',
      content: '',
    },
  });

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
            />

            {state?.errors?.title && (
              <p className="text-sm text-red-500">{state.errors.title[0]}</p>
            )}
          </div>

          {/* 카테고리 입력 */}
          <div className="mb-6 space-y-2">
            <div>카테고리</div>
            <input
              id="category"
              name="category"
              placeholder="카테고리를 입력해주세요"
              className="h-12"
            />
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
