import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';

// Placeholder data
const categories = ['Apparel', 'Footwear', 'Accessories', 'Electronics'];
const brands = ['Urban Explorer', 'Streetwise', 'Timeless Co.', 'AudioPhile'];

const FilterSidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* --- Overlay for mobile --- */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* --- The Sidebar --- */}
      <aside className={`fixed top-0 ${isOpen ? 'left-0' : '-left-full'} lg:static lg:left-0 w-80 lg:w-1/4 lg:flex-shrink-0 bg-white dark:bg-gray-800 lg:bg-transparent lg:dark:bg-transparent h-full lg:h-auto z-50 lg:z-auto transition-all duration-300 ease-in-out lg:pr-8`}>
        <div className="p-6 lg:p-0 h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-6 lg:mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
            <button onClick={onClose} className="lg:hidden p-2 -mr-2">
              <X />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  {cat}
                </label>
              ))}
            </div>
          </div>
          
          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <input type="range" min="0" max="1000" className="w-full" />
            </div>
            <p className="text-sm text-center mt-2">Up to ₹1000</p>
          </div>
          
          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Brand</h3>
            <div className="space-y-2">
              {brands.map(brand => (
                <label key={brand} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  {brand}
                </label>
              ))}
            </div>
          </div>
          
          <button className="w-full py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black font-semibold rounded-md">Apply Filters</button>
        </div>
      </aside>
    </>
  );
};

export default FilterSidebar;