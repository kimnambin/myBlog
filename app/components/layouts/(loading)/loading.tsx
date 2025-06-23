import React from 'react';
import '../../../../styles/animation.css';

// TODO : 로딩화면 디자인 다른거 찾아보기 + fixed 제거하고 해당하는 부분에 두는 게 좋을 듯용

const Loading = () => {
  return (
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
      <p className="mt-[10px] text-lg">😑😑</p>
    </div>
  );
};

export default Loading;
