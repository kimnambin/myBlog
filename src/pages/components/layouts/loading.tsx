import React from 'react';
import { createPortal } from 'react-dom';
import '../../../styles/animation.css';

const Loading: React.FC<{ text: string | null }> = ({ text }) => {
  if (typeof window === 'undefined') return null;
  // SSR 방지

  return createPortal(
    <div className="fixed top-1/2 left-1/2 z-[100] w-[260px] -translate-x-1/2 -translate-y-1/2 transform border border-gray-300 bg-white p-5 text-center shadow-md">
      <div className="flex justify-center space-x-1 pt-3">
        <i
          className="animate-scaleBounce inline-block h-[10px] w-[10px] rounded-full bg-[#00a5e5]"
          style={{ animationDelay: '0s' }}
        ></i>
        <i
          className="animate-scaleBounce inline-block h-[10px] w-[10px] rounded-full bg-[#00a5e5]"
          style={{ animationDelay: '0.1s' }}
        ></i>
        <i
          className="animate-scaleBounce inline-block h-[10px] w-[10px] rounded-full bg-[#00a5e5]"
          style={{ animationDelay: '0.2s' }}
        ></i>
      </div>
      {text ? (
        <p className="mt-[10px] text-lg">{text}</p>
      ) : (
        <p className="mt-[10px] text-lg"> Loading...</p>
      )}
    </div>,
    document.body
  );
};

export default Loading;
