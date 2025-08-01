const BlogListSkeleton = () => {
  return (
    <div className="animate-pulse flex items-center space-x-4 p-4">
      <div className="h-16 w-16 bg-gray-300 rounded"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default BlogListSkeleton;
