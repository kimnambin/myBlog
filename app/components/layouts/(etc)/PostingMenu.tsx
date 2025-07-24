'use client';

import React from 'react';
import { confirApprove } from '../../feat/menu';

const PostingMenu = ({ id }: { id: string }) => {
  const formatId = id.split('-').join('');

  const handleMenu = () => {
    const userInput = prompt('고유 번호를 입력해주세요');
    if (userInput !== null && id) {
      confirApprove({ key: userInput, id: formatId });
    }
  };
  return (
    <>
      <p onClick={handleMenu} className="mb-7"></p>
    </>
  );
};

export default PostingMenu;
