import React from 'react';
import Image from 'next/legacy/image';

interface isFixed {
  isFixed?: boolean;
}

const Loadingbar = ({ isFixed }: isFixed) => {
  return (
    <div
      className={`${
        isFixed ? 'fixed' : 'absolute'
      } top-1/2 left-1/2 z-[100] flex h-full w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center bg-white/70 backdrop-blur-sm`}
    >
      <div className="relative h-[120px] w-[120px] overflow-hidden rounded-lg">
        <Image
          src="/img/loadingImg.png"
          alt="loading image"
          width={80}
          height={80}
          className="animate-spin rounded-lg object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Loadingbar;
