import React from 'react';
import { BiLogoGithub } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="body-font text-gray-600">
      <div className="bg-gray-100">
        <div className="container mx-auto flex w-[90%] flex-col items-center px-5 py-6 sm:flex-row">
          <a className="title-font flex items-center justify-center font-medium text-gray-900 md:justify-start">
            <span className="ml-3 text-xl font-bold">나니의 블로그</span>
          </a>
          <p className="mt-4 text-sm text-gray-500 sm:mt-0 sm:ml-6">© 2025</p>
          <span className="mt-4 inline-flex justify-center sm:mt-0 sm:ml-auto sm:justify-start">
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
