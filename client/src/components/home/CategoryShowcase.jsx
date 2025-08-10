import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import CategoryCard from '../../components/CategoryCard'; // Assuming this component exists
import { 
  getCategoriesSuccess, 
  categoryRequestStart, 
  categoryRequestFail 
} from '../../store/slices/categorySlice';
import { CATEGORY_API_URL } from '../../utils/constant';

const CategoryShowcase = () => {
  const dispatch = useDispatch();
  // 1. Get categories and loading/error state from the Redux store
  const { categories, loading, error } = useSelector((state) => state.categories);

  // 2. Fetch categories from the API when the component mounts (if they don't already exist)
  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(categoryRequestStart());
      try {
        const { data } = await axios.get(CATEGORY_API_URL, { withCredentials: true });
        dispatch(getCategoriesSuccess(data));
      } catch (err) {
        dispatch(categoryRequestFail(err.response?.data?.message || 'Failed to fetch categories.'));
      }
    };

    if (categories.length === 0) {
      fetchCategories();
    }
  }, [dispatch, categories.length]);

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left md:text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Browse Our Collections</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            From everyday essentials to standout pieces, find your perfect match in our curated collections.
          </p>
        </div>

        {/* --- 3. Conditional Rendering for Loading, Error, and Success States --- */}
        {loading && (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="animate-spin text-blue-500" size={40} />
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-md">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* We show the first 4 categories on the homepage for a clean look */}
            {categories.slice(0, 4).map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
        
        <div className="mt-16 text-center">
            <Link 
              to="/categories"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-gray-800 dark:bg-gray-700 rounded-full shadow-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-all transform hover:scale-105"
            >
              View All Categories
              <ArrowRight size={16} />
            </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;