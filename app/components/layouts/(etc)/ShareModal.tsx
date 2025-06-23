'use client';

import React from 'react';
import { BiSolidShareAlt } from 'react-icons/bi';
import { FiPaperclip } from 'react-icons/fi';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';
import { useSideFn } from '@/hooks/sideFn';
import { useShare } from '@/hooks/share';

const ShareModal = () => {
  const { isClick, handledropDown } = useSideFn();
  const { clipboard } = useShare();

  return (
    <div className="relative flex items-center">
      <BiSolidShareAlt
        className={`shareIcons hover:text-hover mx-2 hover:scale-125 ${isClick ? 'hidden' : ''}`}
        onClick={handledropDown}
      />
      {isClick ? (
        <div id="shareModal" className="ml-2 flex flex-col items-start bg-white">
          <button
            className="shareContainer hover:text-hover w-[140px] border"
            onClick={(e) => clipboard()}
          >
            <FiPaperclip className="shareIcons" />
            링크 복사하기
          </button>
          <button className="shareContainer hover:text-hover w-[140px] border">
            <RiKakaoTalkFill className="shareIcons" /> 카카오톡 공유
          </button>
          <button className="shareContainer hover:text-hover w-[140px] border">
            <AiOutlineMail className="shareIcons" /> 이메일 공유
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ShareModal;
