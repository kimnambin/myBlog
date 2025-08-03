'use client';

import React from 'react';
import { BiSolidShareAlt } from 'react-icons/bi';
import { FiPaperclip } from 'react-icons/fi';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { AiOutlineMail } from 'react-icons/ai';
import { useSideFn } from '@/hooks/sideFn';
import { useShare } from '@/hooks/share';

const ShareModal = () => {
  const { isClick, handleClose } = useSideFn();
  const { clipboard, kakaoShare, xUrl } = useShare();

  return (
    <div className="flex items-center">
      <BiSolidShareAlt
        className={`shareIcons hover:text-hover mx-2 hover:scale-125 ${isClick ? 'hidden' : ''}`}
        onClick={handleClose}
      />

      {isClick ? (
        <div
          id="shareModal"
          className="shareModalContainer ml-2 flex flex-row items-start border bg-white"
        >
          <button className="shareContainer hover:text-hover w-[140px]" onClick={() => clipboard()}>
            <FiPaperclip className="shareIcons" />
            링크 복사하기
          </button>
          <button
            className="shareContainer hover:text-hover w-[140px] "
            onClick={() => kakaoShare()}
          >
            <RiKakaoTalkFill className="shareIcons" /> 카카오톡 공유
          </button>
          <a
            className="shareContainer hover:text-hover w-[140px]  no-underline"
            href={xUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineMail className="shareIcons" />
            이메일 공유
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ShareModal;
