import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CategoryFeature = ({ category, isReversed = false }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
      {/* --- Image Column --- */}
      <div className={`w-full aspect-w-3 aspect-h-4 rounded-lg overflow-hidden shadow-2xl ${isReversed ? 'lg:order-last' : ''}`}>
        <img 
          src={category.image.secure_url}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* --- Content Column --- */}
      <div className="text-center lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          {category.name}
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          {category.description || `Explore our curated collection of the finest ${category.name.toLowerCase()}. Timeless style meets modern craftsmanship.`}
        </p>
        <Link 
          to={`/category/${category.name.toLowerCase()}`}
          className="inline-flex items-center gap-2 mt-8 px-8 py-3 text-sm font-semibold text-white bg-gray-800 dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-all transform hover:scale-105"
        >
          Shop {category.name}
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default CategoryFeature;