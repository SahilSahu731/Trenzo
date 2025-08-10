import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setCredentials, profileRequestStart, profileRequestFail, profileRequestSuccess } from '../../store/slices/authSlices';
import { AUTH_API_URL } from '../../utils/constant'; // Assuming you have this constant

const EditProfilePage = () => {
  const dispatch = useDispatch();
  
  // Get all relevant state from the single 'auth' slice
  const { userInfo, profileLoading, profileError } = useSelector(state => state.auth);

  // Local state for the form itself
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
    },
  });
  const [successMessage, setSuccessMessage] = useState('');

  // When userInfo from Redux loads/changes, populate the form
  useEffect(() => {
    if (userInfo) {
      setFormData({
        name: userInfo.name || '',
        email: userInfo.email || '',
        phoneNumber: userInfo.phoneNumber || '',
        address: {
          street: userInfo.address?.street || '',
          city: userInfo.address?.city || '',
          state: userInfo.address?.state || '',
          postalCode: userInfo.address?.postalCode || '',
        },
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle nested address fields
    if (name.startsWith('address.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    dispatch(profileRequestStart());
    try {
      const config = { 
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true 
      };
      
      const { data } = await axios.put(`${AUTH_API_URL}/profile/edit`, formData, config);
      
      // On success, dispatch setCredentials to update the global state
      dispatch(profileRequestSuccess(data));
      dispatch(setCredentials(data));
      setSuccessMessage('Profile updated successfully!');
      
    } catch (err) {
      dispatch(profileRequestFail(err.response?.data?.message || 'Failed to update profile.'));
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 input-style" />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
            <input type="tel" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 input-style" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input type="email" name="email" id="email" value={formData.email} disabled className="mt-1 input-style cursor-not-allowed bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Address Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Address</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street</label>
                <input type="text" name="address.street" id="street" value={formData.address.street} onChange={handleChange} className="mt-1 input-style" />
            </div>
             <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
                <input type="text" name="address.city" id="city" value={formData.address.city} onChange={handleChange} className="mt-1 input-style" />
            </div>
            <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">State / Province</label>
                <input type="text" name="address.state" id="state" value={formData.address.state} onChange={handleChange} className="mt-1 input-style" />
            </div>
            <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Postal Code</label>
                <input type="text" name="address.postalCode" id="postalCode" value={formData.address.postalCode} onChange={handleChange} className="mt-1 input-style" />
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-4 pt-4">
          {profileError && <p className="text-sm text-red-500">{profileError}</p>}
          {successMessage && <p className="text-sm text-green-500">{successMessage}</p>}
          <button
            type="submit"
            disabled={profileLoading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
          >
            {profileLoading && <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>}
            {profileLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;