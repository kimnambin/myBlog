'use client';

// TODO : 고도화해야함

import { useState } from 'react';

export const useLoading = () => {
  const [isLoadingBar, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  return { isLoadingBar, startLoading, stopLoading };
};

// 'use client';

// import { useState, useEffect } from 'react';
// import { usePathname } from 'next/navigation';
// import Loading from './Loading'; // 로딩 UI 컴포넌트

// export default function LoadingGuard() {
//   const [isLoading, setIsLoading] = useState(false);
//   const pathname = usePathname();

//   useEffect(() => {
//     setIsLoading(true);

//     const timeout = setTimeout(() => {
//       setIsLoading(false);
//     }, 500); // ⏱️ 최소 로딩 시간 조절 (필수 아님)

//     return () => clearTimeout(timeout);
//   }, [pathname]); // 경로 변경 시 호출

//   return isLoading ? <Loading /> : null;
// }
