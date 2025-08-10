import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  return (
    <nav className="flex items-center justify-center space-x-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ChevronLeft size={20} />
      </button>
      {[...Array(pages).keys()].map(x => (
        <button
          key={x + 1}
          onClick={() => onPageChange(x + 1)}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            page === x + 1 
              ? 'bg-blue-600 text-white' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {x + 1}
        </button>
      ))}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default Pagination;