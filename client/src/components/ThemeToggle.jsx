import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../store/slices/themeSlice';
import { Sun, Moon, Laptop } from 'lucide-react';

const ThemeToggle = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
    setIsDropdownOpen(false);
  };

  const ThemeIcon = theme === 'dark' ? Moon : Sun;

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Toggle theme"
      >
        <ThemeIcon size={22} />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
          <button
            onClick={() => handleThemeChange('light')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Sun size={16} /> Light
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Moon size={16} /> Dark
          </button>
          <button
            onClick={() => handleThemeChange('system')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <Laptop size={16} /> System
          </button>
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;