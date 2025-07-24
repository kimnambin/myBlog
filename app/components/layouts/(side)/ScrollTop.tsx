'use-client';

import React from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollTopBtn = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      className="fixed bottom-25 left-10 sm:right-50 sm:left-auto cursor-pointer"
      onClick={scrollToTop}
    >
      <FaArrowCircleUp className="w-12 h-12 hover:text" />
    </div>
  );
};

export default ScrollTopBtn;
