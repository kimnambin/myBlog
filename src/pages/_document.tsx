import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko" className="scroll-smooth" suppressHydrationWarning>
      <Head>
        <meta name="description" content="나니의 블로그입니닷" />
        <link rel="icon" href="/img/main.jpg" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
