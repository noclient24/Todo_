 const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div
        className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 border-t-transparent"
        aria-label="Loading"
      />
      <h2 className="text-gray-900 dark:text-white mt-4 text-lg font-medium">
        Loading...
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mt-1">
        Your adventure is about to begin
      </p>
    </div>
  );
};

export default Loading