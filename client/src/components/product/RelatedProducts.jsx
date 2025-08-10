import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../ProductCard';

const RelatedProducts = ({ currentProduct }) => {
  const { products } = useSelector((state) => state.products);

  // Find other products in the same category, excluding the current one
  const related = useMemo(() => {
    if (!products || !currentProduct) return [];
    return products
      .filter(p => p.category?._id === currentProduct.category?._id && p._id !== currentProduct._id)
      .slice(0, 4);
  }, [products, currentProduct]);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;