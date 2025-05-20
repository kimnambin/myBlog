import React from 'react';
import { useTheme } from 'next-themes';
import { MdOutlineWbSunny } from 'react-icons/md';
import { IoMoonOutline } from 'react-icons/io5';

const DarkModeBtn = () => {
  const { theme, setTheme } = useTheme();

  const icon =
    theme == 'light' ? (
      <MdOutlineWbSunny onClick={() => setTheme('dark')} className="hover:text-hover h-7 w-7" />
    ) : (
      <IoMoonOutline onClick={() => setTheme('light')} className="hover:text-moon h-7 w-7" />
    );

  return <div>{icon}</div>;
};

export default DarkModeBtn;
