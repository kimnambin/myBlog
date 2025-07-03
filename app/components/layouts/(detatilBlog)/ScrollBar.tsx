'use client'

import React, { useEffect, useState } from 'react'

const ScrollBar = () => {

  const [scroll , setScroll] = useState(0);
  
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    setScroll(scrollPercent)
  }

  useEffect(() => {
    window.addEventListener('scroll' , handleScroll);
    return () => window.removeEventListener('scroll' , handleScroll);
  },[])

  return (
     <div
      className="fixed left-0 top-0 z-[9999] h-1 bg-blue-600 transition-all duration-200 ease-out"
      style={{ width: `${scroll}%` }}
    />
  )
}

export default ScrollBar
