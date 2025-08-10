import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import {
  productRequestStart,
  createProductSuccess,
  productRequestFail,
  resetProductState
} from '../../store/slices/productSlice';
import {
  getCategoriesSuccess,
  categoryRequestStart,
  categoryRequestFail
} from '../../store/slices/categorySlice';
import { PRODUCT_API_URL, CATEGORY_API_URL } from '../../utils/constant';

const AddProductModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading: productLoading, error: productError } = useSelector((state) => state.products);
  const { categories, loading: categoriesLoading } = useSelector((state) => state.categories);

  const [productData, setProductData] = useState({
    name: '',
    price: '',
    brand: '',
    category: '',
    countInStock: '',
    description: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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
    if (isOpen && categories.length === 0) {
      fetchCategories();
    }
  }, [isOpen, categories.length, dispatch]);

  const handleChange = (e) => {
    setProductData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    setProductData({ name: '', price: '', brand: '', category: '', countInStock: '', description: '' });
    setImageFile(null);
    setImagePreview(null);
    dispatch(resetProductState());
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(productRequestStart());

    const formData = new FormData();
    for (const key in productData) {
      formData.append(key, productData[key]);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      dispatch(productRequestFail('Product image is required.'));
      return;
    }

    try {
      const config = {
        headers: {}, // Do NOT set 'Content-Type' for multipart/form-data
        withCredentials: true,
      };
      
      const { data } = await axios.post(`${PRODUCT_API_URL}`, formData, config);
      
      dispatch(createProductSuccess(data));
      handleClose();
      
    } catch (err) {
      dispatch(productRequestFail(err.response?.data?.message || 'Failed to create product.'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh]">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Add New Product</h3>
          <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 120px)' }}>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input name="name" value={productData.name} onChange={handleChange} placeholder="Product Name" className="input-style" required />
              <input name="brand" value={productData.brand} onChange={handleChange} placeholder="Brand" className="input-style" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input name="price" type="number" value={productData.price} onChange={handleChange} placeholder="Price" className="input-style" required />
              <input name="countInStock" type="number" value={productData.countInStock} onChange={handleChange} placeholder="Count in Stock" className="input-style" required />
              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="input-style"
                required
                disabled={categoriesLoading}
              >
                <option value="" disabled>
                  {categoriesLoading ? 'Loading...' : 'Select a category'}
                </option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <textarea name="description" value={productData.description} onChange={handleChange} placeholder="Product Description" rows="4" className="input-style"></textarea>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Product Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-auto rounded-md object-contain"/>
                  ) : (
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <div className="flex text-sm text-gray-600 dark:text-gray-400">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" required/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
                </div>
              </div>
            </div>
            {productError && <p className="text-red-500 text-sm text-center">{productError}</p>}
          </div>
          <div className="flex items-center justify-end p-4 gap-3 border-t border-gray-200 dark:border-gray-700">
            <button type="button" onClick={handleClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={productLoading} className="btn-primary flex items-center">
              {productLoading && <Loader2 className="animate-spin mr-2" size={16} />}
              {productLoading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;