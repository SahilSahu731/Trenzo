import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from '../store/slices/themeSlice';
import { Sun, Moon, Laptop } from 'lucide-react';

const ThemeToggle = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  
  // Create a ref for the dropdown container
  const dropdownRef = useRef(null);

  const handleThemeChange = (newTheme) => {
    dispatch(setTheme(newTheme));
    setIsDropdownOpen(false);
  };

  // Effect to handle closing dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ThemeIcon = theme === 'dark' ? Moon : Sun;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="p-2.5 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Toggle theme"
      >
        <ThemeIcon size={22} strokeWidth={2.25} />
      </button>

      {/* Dropdown Menu with Transition */}
      <div
        className={`origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-out ${
          isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <button onClick={() => handleThemeChange('light')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
          <Sun size={16} /> Light
        </button>
        <button onClick={() => handleThemeChange('dark')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
          <Moon size={16} /> Dark
        </button>
        <button onClick={() => handleThemeChange('system')} className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2">
          <Laptop size={16} /> System
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;