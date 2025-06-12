import React from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';

const NoContent = () => {
  return (
    <div className="my-8 flex flex-col items-center justify-center gap-4">
      <Image
        src={'/img/noposts.png'}
        width={500}
        height={500}
        className="rounded-lg"
        alt="main img"
        priority
      />
      <p className="mt-2 text-2xl font-bold">아직 게시글이 없어요!</p>
      <Link href="/" className="mt-1.5 flex items-center gap-2 text-blue-700 decoration-solid">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NoContent;
