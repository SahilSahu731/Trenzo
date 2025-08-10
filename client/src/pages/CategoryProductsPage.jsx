import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Loader2 } from 'lucide-react';
import { CATEGORY_API_URL, PRODUCT_API_URL } from '../utils/constant';

const CategoryProductsPage = () => {
  // Get the category name from the URL (e.g., 'apparel')
  const { categoryName } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch both category details and products in parallel
        const categoryRes = await axios.get(`${CATEGORY_API_URL}/${categoryName}`);
        const productsRes = await axios.get(`${PRODUCT_API_URL}/category/${categoryName}`);
        
        setCategory(categoryRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load data for this category.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryName]); // Re-run this effect if the categoryName in the URL changes

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 size={48} className="animate-spin text-blue-500" /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* --- 1. The Big Image Header --- */}
      {category && (
        <div className="relative bg-gray-800 h-80">
          <img src={category.image.secure_url} alt={category.name} className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{category.name}</h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200">
              {products.length} {products.length === 1 ? 'item' : 'items'} found
            </p>
          </div>
        </div>
      )}

      {/* --- 2. The Product Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No products found in this category yet.</h3>
            <p className="text-gray-500 mt-2">Check back soon for new arrivals!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProductsPage;