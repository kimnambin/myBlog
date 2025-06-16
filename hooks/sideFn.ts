'use client';

import { useEffect, useState } from 'react';

export const useSideFn = () => {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      if (isClick && !(e.target as HTMLElement).closest('.side-container')) {
        setIsClick(false);
      }
    };

    document.addEventListener('click', outSideClick);

    return () => {
      document.removeEventListener('click', outSideClick);
    };
  }, [isClick]);

  const handledropDown = () => {
    setIsClick(!isClick);
  };

  // const changeSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const result = e.target.value;
  //   setSearch(result);

  //   console.log('dsadas', result);

  //   if (result) {
  //     const res = await fetch(`/api/blog/`);
  //     const data = await res.json();
  //     setSearchResults(data.result);
  //   } else {
  //     setSearchResults([]);
  //   }

  //   setSearch('');
  // };

  return {
    isClick,
    handledropDown,
    // search, changeSearch, searchResults
  };
};
