'use client';

import { PostProps } from '@/types/blog/blogPost';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export const useSideFn = (category?: string) => {
  const [isClick, setIsClick] = useState<boolean>(false);

  useEffect(() => {
    const outSideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isOutside =
        isClick && !target.closest('.side-container') && !target.closest('.shareModal');

      if (isOutside) {
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

  const { data: searchData, isLoading: searchLoading } = useQuery({
    queryKey: ['searchData'],
    queryFn: async () => {
      const res = await fetch('/api/blog');
      if (!res.ok) {
        throw new Error('데이터를 가져오는 중 오류 발생');
      }

      return res.json();
    },
  });

  const { data: getcategoryList, isLoading: queryLoading } = useQuery({
    queryKey: ['getCategory'],
    queryFn: async () => {
      const res = await fetch(`/api/blog/getCategory`);
      if (!res.ok) throw new Error('데이터를 가져오는 중 오류 발생');

      return res.json();
    },
  });

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState('');

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value;
    setSearch(result);

    if (result && searchData) {
      const filteredResults = searchData.posts.filter((post: PostProps) =>
        post.title.toLowerCase().includes(result.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  return {
    isClick,
    handledropDown,
    search,
    changeSearch,
    searchLoading,
    searchResults,
    getcategoryList,
    queryLoading,
  };
};
