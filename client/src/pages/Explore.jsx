import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { 
  getProductsSuccess, 
  productRequestStart, 
  productRequestFail 
} from '../store/slices/productSlice';
import { PRODUCT_API_URL } from '../utils/constant';

import FilterSidebar from '../components/store/FilterSidebar';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import Pagination from '../components/store/Pagination';
import { SlidersHorizontal } from 'lucide-react';

const Explore = () => {
  const dispatch = useDispatch();
  
  // Get product and pagination data from Redux
  const { products, loading, error, page, pages, total } = useSelector((state) => state.products);
  
  // State for all filters
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [category, setCategory] = useState(''); // Example filter state
  // Add more states for other filters like brand, price, etc.

  // This effect re-fetches products whenever a filter or page number changes
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(productRequestStart());
      try {
        // Construct the API URL with query parameters
        const params = new URLSearchParams();
        params.append('pageNumber', pageNumber);
        if (category) params.append('category', category);
        // Append other filters here
        
        const { data } = await axios.get(`${PRODUCT_API_URL}?${params.toString()}`);
        dispatch(getProductsSuccess(data));
      } catch (err) {
        dispatch(productRequestFail(err.response?.data?.message || 'Failed to fetch products.'));
      }
    };
    fetchProducts();
  }, [dispatch, pageNumber, category]); // Dependency array includes all filters

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">All Products</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
          Find your next favorite item from our complete collection.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />

        <main className="w-full">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">{total} Products Found</p>
            <div className="flex items-center gap-4">
              <select className="input-style text-sm py-2 bg-white dark:bg-gray-800">
                <option>Sort by Latest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <button onClick={() => setIsFilterOpen(true)} className="lg:hidden p-2 rounded-md border dark:border-gray-600">
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>

          {error && <div className="text-red-500 bg-red-100 p-4 rounded-md">{error}</div>}
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {loading 
              ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />) 
              : products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
            }
          </div>

          <div className="mt-12">
            <Pagination page={page} pages={pages} onPageChange={handlePageChange} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Explore;