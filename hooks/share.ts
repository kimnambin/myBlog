import { useEffect, useState } from 'react';

export const useShare = () => {
  const clipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('복사되었습니다.');
      console.log('클릭s');
    } catch (err) {
      console.error('복사 실패:', err);
    }
  };

  return { clipboard };
};
