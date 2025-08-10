import React from 'react';

const ProductCardSkeleton = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full rounded-md animate-pulse"></div>
      <div className="mt-4 space-y-3">
        <div className="bg-gray-200 dark:bg-gray-700 h-4 w-1/3 rounded-md animate-pulse"></div>
        <div className="bg-gray-200 dark:bg-gray-700 h-6 w-3/4 rounded-md animate-pulse"></div>
        <div className="flex justify-between items-center">
          <div className="bg-gray-200 dark:bg-gray-700 h-8 w-1/2 rounded-md animate-pulse"></div>
          <div className="bg-gray-200 dark:bg-gray-700 h-4 w-1/4 rounded-md animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;