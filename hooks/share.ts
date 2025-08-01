import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Kakao: any;
  }
}

export const useShare = () => {
  const [isKakaoReady, setIsKakaoReady] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const clipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('주소가 복사되었습니다!');
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  useEffect(() => {
    if (window.Kakao && window.Kakao.isInitialized?.()) {
      setIsKakaoReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js';
    script.async = true;

    script.onload = () => {
      const key = process.env.NEXT_PUBLIC_KAKAO_BTN_KEY;
      if (!key) {
        console.error('Kakao 키 누락');
        return;
      }

      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(key);
        console.log('✅ Kakao SDK 초기화 완료');
      }

      setIsKakaoReady(true);
    };

    script.onerror = () => {
      console.error('Kakao SDK 로딩 실패');
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const kakaoShare = () => {
    if (isSharing) return;

    const Kakao = window.Kakao;

    if (!isKakaoReady || !Kakao || !Kakao.Share || !Kakao.Share.sendCustom) {
      alert('Kakao 공유 기능이 아직 준비되지 않았습니다.');
      return;
    }

    try {
      setIsSharing(true);

      Kakao.Share.sendCustom({
        templateId: 121765,
        templateArgs: {
          title: '나니 블로그',
          description: '개발자의 기술 스택 이야기',
        },
      });
    } catch (err) {
      console.error('Kakao 공유 오류:', err);
      alert('카카오 공유 중 오류가 발생했습니다.');
    } finally {
      setIsSharing(false);
    }
  };

  const [xUrl, setXUrl] = useState('');

  useEffect(() => {
    setXUrl(`https://twitter.com/intent/tweet?text=나니블로그&url=${window.location.href}`);
  }, []);

  return { clipboard, kakaoShare, xUrl };
};
