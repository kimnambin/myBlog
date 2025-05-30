'use client';

import { Loader2 } from 'lucide-react';
import { createPostAction } from '../../../actions/blogUpload';

export default function WritePage() {
  return (
    <form action={createPostAction}>
      <div className="mx-auto max-w-2xl">
        <div className="p-6">
          {/* 제목 입력 */}
          <div className="mb-6 space-y-2">
            <div>제목</div>
            <input
              id="title"
              name="title"
              placeholder="제목을 입력해주세요"
              className="h-12 text-lg"
            />
          </div>

          {/* 태그 입력 */}
          <div className="mb-6 space-y-2">
            <div>카테고리</div>
            <input
              id="category"
              name="category"
              placeholder="카테고리를 입력해주세요"
              className="h-12"
            />
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
          </div>

          {/* 버튼 영역 */}
          <div className="mt-6 flex justify-end gap-2">
            <button type="submit">
              <Loader2 className="mr-2 hidden h-4 w-4 animate-spin" />
              발행하기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
