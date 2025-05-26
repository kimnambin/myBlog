import React from 'react';

export const data = ['카테고리1', '카테고리2', '카테고리3'];

const Side = () => {
  return (
    <div className="m-auto my-0 ml-5.5 flex h-full flex-col justify-center rounded-2xl border-4 border-gray-200 p-5">
      <div className="flex flex-col p-3">
        <h2 className="font-bold">🔍제목 검색</h2>
        <input placeholder="검색어를 입력해주세요." className="rounded-1xl border-4" />
        <br />
        <h2 className="mb-3.5 font-bold">📌카테고리 검색</h2>
        {data.map((v) => (
          <p className="mb-1.5 font-bold"> {v} </p>
        ))}
      </div>

      {/* <div className="p-1 text-left">
        <h2 className="font-bold">카테고리 검색</h2>
        {data.map((v) => (
          <p> {v} </p>
        ))}
      </div> */}
    </div>
  );
};

export default Side;
