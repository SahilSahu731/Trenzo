import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PlusCircle, Loader2, Edit, Trash2 } from 'lucide-react';
import AddCategoryModal from '../../components/admin/AddCategoryModal';
import { 
  categoryRequestStart, 
  getCategoriesSuccess, 
  categoryRequestFail 
} from '../../store/slices/categorySlice';
import { CATEGORY_API_URL } from '../../utils/constant';

const AdminCategoryListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    fetchCategories();
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Categories</h1>
          <p className="mt-1 text-gray-500">Add, edit, and manage your store's categories.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex  items-center gap-2"
        >
          <PlusCircle size={18} />
          Add Category
        </button>
      </div>

      {loading && <div className="flex justify-center p-8"><Loader2 className="animate-spin" size={32} /></div>}
      {error && <div className="text-red-500 bg-red-100 p-4 rounded-md">{error}</div>}
      
      {!loading && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Created At</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600/20">
                  <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <img src={cat.image.secure_url} alt={cat.name} className="w-10 h-10 rounded-md object-cover" />
                      {cat.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">{new Date(cat.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-md"><Edit size={18} /></button>
                      <button className="p-2 text-red-600 hover:bg-red-100 rounded-md"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddCategoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AdminCategoryListPage;