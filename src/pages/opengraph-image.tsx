import { ImageResponse } from 'next/og';
// 이미지 크기 정의
export const size = {
  width: 1200,
  height: 630,
};
// 이미지 콘텐츠 타입 정의
export const contentType = 'img/png';

// OG 이미지 생성 함수
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom, #000000, #333333)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: 64,
            marginBottom: 40,
            fontWeight: 'bold',
          }}
        >
          나니 블로그
        </div>
        <div
          style={{
            fontSize: 32,
            maxWidth: '70%',
            textAlign: 'center',
            color: '#cccccc',
          }}
        >
          배운 것을 잊지 않기 위해 기록하는 기술 블로그입니다.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
