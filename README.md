# 폴더 구조

- `_app.tsx` : 모든 페이지의 공통 레이아웃 정의
- `_document.tsx` : HTML 문서의 구조 정의
- view : 페이지의 라우트 정의 ([id])

---

### api 호출해보기

axios 사용

---

모든 페이지 사전 렌더링

장점 => 더 좋은 퍼포먼스 , 검색엔진최적화

1. 정적 생성
2. SSR

차이점은 언제 html 파일을 생성하는 가

[정적 생성]

- 프로젝트 빌드 시점에 html 파일 생성
- getStaticProps , getStaticPaths

[서버사이드 렌더링]

- 요청 때마다 html 생성
- 항상 최신 상태 유지
- getServerSideProps

[사전 렌더링 pre-render]

기본적으로 모든 페이지 pre-render
퍼포먼스 , SEO 향상

-> 프리 렌더링을 하지 않는다면 JS가 꺼지면 화면에 아무것도 보이지 않음

- 정적 생성 : `빌드시` html 생성
  - ex) 마케팅 페이지 , 블로그 게시물 , 제품 목록 , 도움말 등등 (대부분)
- 서버 사이드 렌더링 : `요청 때마다` html 생성
  - ex) 항상 최신 상태 유지 , 관리자 페이지 , 분석차트 등등

---

### Link 특징

<Link href='' as=''>

as는 사용자가 보는 주소

---

## 환경 변수

// node js

process.env.변수명

// browser

process.env.NEXT*PUBLIC*변수명name=DEVELOPMENT

---

## 명령어

빌드 및 빌드 환경

npm run build && npm run start
