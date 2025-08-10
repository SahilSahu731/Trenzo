import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { X, UploadCloud, Loader2 } from 'lucide-react';
import {
  categoryRequestStart,
  createCategorySuccess,
  categoryRequestFail,
  resetCategoryState,
} from '../../store/slices/categorySlice';
import { CATEGORY_API_URL } from '../../utils/constant'; // e.g., '/api/categories'

const AddCategoryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.categories);

  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    setName('');
    setImageFile(null);
    setImagePreview(null);
    dispatch(resetCategoryState());
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(categoryRequestStart());

    const formData = new FormData();
    formData.append('name', name);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      };
      const { data } = await axios.post(CATEGORY_API_URL, formData, config);
      dispatch(createCategorySuccess(data));
      handleClose();
    } catch (err) {
      dispatch(categoryRequestFail(err.response?.data?.message || 'Failed to create category.'));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-xl font-semibold">Add New Category</h3>
          <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Category Name</label>
              <input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Apparel" className="input-style" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category Image</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {imagePreview ? <img src={imagePreview} alt="Preview" className="mx-auto h-20 w-auto rounded-md" /> : <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />}
                  <div className="flex text-sm">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="image" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" required />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
          <div className="flex items-center justify-end p-4 gap-3 border-t">
            <button type="button" onClick={handleClose} className="btn-secondary">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex items-center">
              {loading && <Loader2 className="animate-spin mr-2" size={16} />}
              {loading ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;