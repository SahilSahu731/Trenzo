import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { 
  getProductsSuccess, 
  productRequestStart, 
  productRequestFail 
} from '../store/slices/productSlice';
import { PRODUCT_API_URL } from '../utils/constant';

import CategoryBrowser from '../components/store/CategoryBrowser';
import ProductShowcase from '../components/store/ProductShowcase';
import { Loader2 } from 'lucide-react';

const Store = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    // We still fetch all products once to populate the different sections
    const fetchProducts = async () => {
      dispatch(productRequestStart());
      try {
        const { data } = await axios.get(PRODUCT_API_URL);
        dispatch(getProductsSuccess(data));
      } catch (err) {
        dispatch(productRequestFail(err.response?.data?.message || 'Failed to fetch products.'));
      }
    };
    if (products.length === 0) {
      fetchProducts();
    }
  }, [dispatch, products.length]);

  // Use useMemo to efficiently create curated lists from the main product data
  const newArrivals = useMemo(() => {
    return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);
  }, [products]);
  
  const bestSellers = useMemo(() => {
    return [...products].sort((a, b) => (b.rating * b.numReviews) - (a.rating * a.numReviews)).slice(0, 4);
  }, [products]);

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 size={48} className="animate-spin text-blue-500" /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* --- Store Page Header --- */}
      <div className="relative bg-gray-800 py-24 sm:py-32">
        <img src="https://images.pexels.com/photos/3768005/pexels-photo-3768005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">The Collection</h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-200">
            Curated pieces, timeless style. Discover your new favorite.
          </p>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryBrowser />
        
        <div className="border-t border-gray-200 dark:border-gray-700">
          <ProductShowcase 
            title="New Arrivals"
            subtitle="The latest additions to our collection."
            products={newArrivals}
            linkTo="/new-arrivals" // Link to a future dedicated page
          />
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700">
          <ProductShowcase 
            title="Best Sellers"
            subtitle="Tried, tested, and loved by our community."
            products={bestSellers}
            linkTo="/best-sellers" // Link to a future dedicated page
          />
        </div>
      </div>
    </div>
  );
};

export default Store;