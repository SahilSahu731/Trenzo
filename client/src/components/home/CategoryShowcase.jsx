import React from 'react';
import CategoryCard from '../CategoryCard';

// --- Placeholder Data for our Categories ---
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


const CategoryShowcase = () => {
  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Browse Our Collections</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            From everyday essentials to standout pieces, find your perfect match in our curated collections.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;