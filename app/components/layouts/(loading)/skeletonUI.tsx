import React from 'react';

const BlogPostSkeleton = () => {
  return (
    <div className="mobileContent mt-3 flex w-full gap-4.5 border-b p-3">
    
      <div className="w-4 rounded-full h-full skeleton" />

  
      <div className="prose prose-neutral prose-headings:scroll-mt-[var(--header-height)] mx-auto grid w-full min-w-[80%]">
      <div className="flex gap-2.5 mb-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-[85px] h-7 rounded-2xl skeleton"
            />
          ))}
        </div>

       
        <div className="h-12 w-3/4 rounded skeleton mb-6" />

      
        <div className="flex items-center gap-2.5 mb-9">
          <div className="h-6 w-6 rounded skeleton" />
          <div className="h-5 w-16 rounded skeleton" />
          <div className="h-6 w-6 rounded skeleton ml-auto" />
        </div>

      
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-4 rounded skeleton max-w-[90%]"
            />
          ))}
        </div>


        <div className="mt-6 h-10 w-32 rounded skeleton" />
      </div>


      <div className="flex w-52" />


      <nav className="TableOfContentsLink bg-muted/60 fixed top-[var(--header-height)] right-[11%] flex h-[calc(100vh-var(--header-height))] w-48 flex-col gap-2 overflow-y-auto p-5">
        <div className="h-6 w-24 rounded skeleton mb-4" />
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 w-full rounded skeleton" />
        ))}
      </nav>


      <div className="fixed right-5 bottom-15 hidden px-5 py-2 text-black max-[900px]:block">
        <details className="backdrop-blur-sm">
          <summary className="flex cursor-pointer items-center justify-between bg-black p-4 text-lg font-semibold text-white transition-colors duration-300 ease-in-out">
            <span>목차</span>
          </summary>
          <nav className="space-y-3 bg-white p-4 text-sm transition-all duration-300 ease-in-out">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 w-full rounded skeleton" />
            ))}
          </nav>
        </details>


        <div className="mt-4 h-10 w-32 rounded skeleton" />
      </div>
    </div>
  );
};

export default BlogPostSkeleton;
