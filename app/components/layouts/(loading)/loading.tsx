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
      } top-0 left-0 z-[100] flex h-full w-full items-center justify-center bg-white/70 backdrop-blur-sm`}
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
