import React from 'react';
import { BiLogoGithub } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="body-font flex w-full items-center justify-between bg-gray-100 p-5 text-gray-600">
      <a className="title-font ml-[10%] flex items-center justify-center font-medium text-gray-900">
        <span className="ml-3 text-xl font-bold">Nani Blog</span>
      </a>
      <p className="mt-4 hidden text-sm text-gray-500 sm:mt-0 sm:ml-6 sm:block">© 2025</p>
      <span className="mr-[10%] ml-auto flex items-center gap-4">
        <a
          className="hover:text-hover ml-3 text-gray-500"
          href="https://github.com/kimnambin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BiLogoGithub className="h-8 w-8" />
        </a>
        <a
          className="hover:text-hover ml-3 text-gray-500"
          href="mailto:helloword@na.com?subject=제목입니다!"
        >
          <AiOutlineMail className="h-8 w-8" />
        </a>
      </span>
    </footer>
  );
};

export default Footer;
