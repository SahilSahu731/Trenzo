import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { 
  getCategoriesSuccess, 
  categoryRequestStart, 
  categoryRequestFail 
} from '../store/slices/categorySlice';
import { CATEGORY_API_URL } from '../utils/constant';
import { Loader2 } from 'lucide-react';
import CategoryFeature from '../components/categories/CategoryFeature'; // Import our new component

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categories);

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

  if (loading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 size={48} className="animate-spin text-blue-500" /></div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* --- Page Header --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            All Collections
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400">
            Every piece in our store is part of a thoughtfully curated collection.
          </p>
        </div>

        {/* --- Alternating Feature Sections --- */}
        <div className="space-y-20">
          {categories.map((category, index) => (
            <CategoryFeature 
              key={category._id}
              category={category}
              isReversed={index % 2 !== 0} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;