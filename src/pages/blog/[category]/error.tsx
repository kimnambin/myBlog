'use client';

import { useEffect } from 'react';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
        <div className="text-6xl font-bold text-red-600">500</div>
        <h1 className="text-2xl font-semibold tracking-tight">오류가 발생했습니다</h1>
        <p className="text-muted-foreground">오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
        <button onClick={() => reset?.()} className="mt-4">
          다시 시도
        </button>
      </div>
    </div>
  );
}
