import React from 'react';
import ProductCard from '../ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProductShowcase = ({ title, subtitle, products, linkTo }) => {
  return (
    <section className="py-16 sm:py-24">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
        </div>
        <Link to={linkTo} className="hidden sm:flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
          Shop all
          <ArrowRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;