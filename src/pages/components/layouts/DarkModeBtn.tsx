import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { MdOutlineWbSunny } from 'react-icons/md';
import { IoMoonOutline } from 'react-icons/io5';

const DarkModeBtn = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const icon =
    isClient && theme === 'light' ? (
      <MdOutlineWbSunny onClick={() => setTheme('dark')} className="hover:text-hover h-7 w-7" />
    ) : (
      <IoMoonOutline onClick={() => setTheme('light')} className="hover:text-moon h-7 w-7" />
    );

  return <div>{isClient ? icon : null}</div>;
};

export default DarkModeBtn;
