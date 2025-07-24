'use client';

import React, { useEffect, useState } from 'react';

const ScrollBar = () => {
  const [scroll, setScroll] = useState<number>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScroll(scrollPercent);
  };

  useEffect(() => {
    if (isMounted) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      className="fixed left-0 top-0 z-[9999] h-1 bg-blue-600 transition-all duration-200 ease-out"
      style={{ width: `${scroll}%` }}
    ></div>
  );
};

export default ScrollBar;
