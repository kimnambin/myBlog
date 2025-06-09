'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function DarkModeBtn() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <button
      className="relative flex h-9 w-9 items-center justify-center rounded-md"
      onClick={toggleTheme}
      aria-label="테마 변경"
    >
      <Sun className="hover:text-hover h-7 w-7 transition-all dark:hidden" />
      <Moon className="hover:text-moon hidden h-7 w-7 transition-all dark:block" />
    </button>
  );
}
