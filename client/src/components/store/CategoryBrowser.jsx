import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder data for categories
const categories = [
  { 
    name: 'Apparel', 
    imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    linkTo: '/store/apparel' 
  },
  { 
    name: 'Footwear', 
    imageUrl: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    linkTo: '/store/footwear' 
  },
  { 
    name: 'Accessories', 
    imageUrl: 'https://images.pexels.com/photos/3618545/pexels-photo-3618545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    linkTo: '/store/accessories' 
  },
  { 
    name: 'Home Goods', 
    imageUrl: 'https://images.pexels.com/photos/6489083/pexels-photo-6489083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    linkTo: '/store/home-goods' 
  },
];

const CategoryBrowser = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Shop by Category</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Find exactly what you're looking for.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {categories.map(category => (
          <Link to={category.linkTo} key={category.name} className="group relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-wider">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBrowser;