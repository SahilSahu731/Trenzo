import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  productRequestStart,
  getProductsSuccess,
  productRequestFail,
} from '../../store/slices/productSlice';
import { PRODUCT_API_URL } from '../../utils/constant';
import { ArrowRight, Loader2 } from 'lucide-react';
import ProductCard from '../ProductCard';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  
  // State to manage which tab is active: 'new' or 'bestsellers'
  const [activeTab, setActiveTab] = useState('new');

  useEffect(() => {
    if (products.length === 0) {
      const fetchProducts = async () => {
        dispatch(productRequestStart());
        try {
          const { data } = await axios.get(PRODUCT_API_URL);
          dispatch(getProductsSuccess(data));
        } catch (err) {
          dispatch(productRequestFail(err.response?.data?.message || 'Failed to fetch products.'));
        }
      };
      fetchProducts();
    }
  }, [dispatch, products.length]);

  // useMemo will efficiently sort/filter products only when the tab or product list changes
  const featuredProducts = useMemo(() => {
    const sortedProducts = [...products];
    
    if (activeTab === 'new') {
      // Sort by creation date, newest first
      sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (activeTab === 'bestsellers') {
      // Sort by rating, highest first
      sortedProducts.sort((a, b) => b.rating - a.rating);
    }
    
    // Return the top 4 products for the selected category
    return sortedProducts.slice(0, 4);
  }, [products, activeTab]);
  
  // Helper for tab button styling
  const tabClass = (tabName) => `px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
    activeTab === tabName 
    ? 'bg-blue-600 text-white' 
    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
  }`;

  return (
    <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Discover Our Collection</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Hand-picked for quality and style. Find what you're looking for.
          </p>
        </div>

        {/* --- INTERACTIVE TABS --- */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12">
          <button onClick={() => setActiveTab('new')} className={tabClass('new')}>New Arrivals</button>
          <button onClick={() => setActiveTab('bestsellers')} className={tabClass('bestsellers')}>Best Sellers</button>
        </div>
        
        {loading && (
          <div className="flex justify-center items-center p-8"><Loader2 className="animate-spin text-blue-500" size={48} /></div>
        )}
        {error && (
          <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-md">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} isNew={activeTab === 'new'} />
            ))}
          </div>
        )}

        {/* --- VIEW ALL BUTTON --- */}
        <div className="mt-16 text-center">
            <Link 
              to="/explore"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-gray-800 dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-all transform hover:scale-105"
            >
              View All Products
              <ArrowRight size={16} />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;