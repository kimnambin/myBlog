import { useEffect, useState } from 'react';

export const useShare = () => {
  const clipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('주소가 복사되었습니다!');
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  useEffect(() => {
    if (window.Kakao && window.Kakao.isInitialized?.()) return;

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
        console.log('Kakao SDK 초기화 완료');
      }
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const kakaoShare = () => {
    const Kakao = window.Kakao;
    if (!Kakao || !Kakao.isInitialized()) {
      alert('Kakao SDK가 아직 초기화되지 않았습니다.');
      return;
    }

    Kakao.share.sendCustom({
      templateId: 121765,
      templateArgs: {
        title: '나니 블로그',
        description: '개발자의 기술 스택 이야기',
      },
    });
  };

  const [xUrl, setXUrl] = useState('');

useEffect(() => {
  setXUrl(`https://twitter.com/intent/tweet?text=나니블로그&url=${window.location.href}`);
}, []);



  return { clipboard, kakaoShare, xUrl };
};
