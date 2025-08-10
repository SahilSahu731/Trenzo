import React, { useState } from 'react';
import ProductReviews from './ProductReviews'; // We'll use the component from before

const ProductDetailsTabs = ({ product, currentUser }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabClass = (tabName) => `px-4 py-2.5 font-semibold text-sm rounded-md transition-colors ${
    activeTab === tabName 
    ? 'bg-blue-600 text-white' 
    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
  }`;

  return (
    <div id="reviews" className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-700 mb-6">
        <button onClick={() => setActiveTab('description')} className={tabClass('description')}>Description</button>
        <button onClick={() => setActiveTab('specs')} className={tabClass('specs')}>Specifications</button>
        <button onClick={() => setActiveTab('reviews')} className={tabClass('reviews')}>Reviews ({product.reviews.length})</button>
      </div>
      <div className="py-6">
        {activeTab === 'description' && (
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{product.description}</p>
        )}
        {/* {activeTab === 'specs' && (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="font-semibold text-gray-600 dark:text-gray-400">Brand</div>
            <div>{product.brand}</div>
            <div className="font-semibold text-gray-600 dark:text-gray-400">Category</div>
            <div>{product.category.name}</div>
            <div className="font-semibold text-gray-600 dark:text-gray-400">Origin</div>
            <div>Kanpur, India</div>
            <div className="font-semibold text-gray-600 dark:text-gray-400">Material</div>
            <div>High-Quality Leather</div>
          </div>
        )} */}
        {activeTab === 'reviews' && (
          <ProductReviews product={product} productId={product._id} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
};

export default ProductDetailsTabs;