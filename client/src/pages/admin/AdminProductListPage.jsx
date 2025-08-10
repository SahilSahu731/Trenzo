import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PlusCircle, Loader2 } from 'lucide-react';
import ProductTable from '../../components/admin/ProductTable';
import AddProductModal from '../../components/admin/AddProductModal';
import { 
  productRequestStart, 
  getProductsSuccess, 
  productRequestFail 
} from '../../store/slices/productSlice';
import { PRODUCT_API_URL } from '../../utils/constant';

const AdminProductListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  
  // Get the product list, loading, and error states from Redux
  const { products, loading, error } = useSelector((state) => state.products);

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(productRequestStart());
      try {
        const { data } = await axios.get(`${PRODUCT_API_URL}`);
        dispatch(getProductsSuccess(data));
      } catch (err) {
        dispatch(productRequestFail(err.response?.data?.message || 'Failed to fetch products.'));
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Products</h1>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Add, edit, and manage your store's products.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
        >
          <PlusCircle size={18} />
          Add Product
        </button>
      </div>

      {/* Conditional Rendering based on loading and error states */}
      {loading && <div className="flex justify-center items-center p-8"><Loader2 className="animate-spin" size={32} /></div>}
      {error && <div className="text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-md">{error}</div>}
      {!loading && !error && <ProductTable products={products} />}

      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AdminProductListPage;