import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { ArrowRight } from 'lucide-react';

const BrandSpotlight = ({ brand, title, description, imageUrl, products, linkTo }) => {
  return (
    <section className="py-16 sm:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Content */}
        <div className="text-left">
          <p className="text-base font-semibold text-blue-600 dark:text-blue-400 uppercase">{brand}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="mt-8">
            <Link to={linkTo} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Shop the full collection
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Right Column: Large Image */}
        <div className="w-full h-80 lg:h-[32rem] rounded-lg overflow-hidden order-first lg:order-last">
          <img 
            src={imageUrl}
            alt={`${brand} collection`}
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default BrandSpotlight;