import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../store/slices/checkoutSlice';
import CheckoutStepper from '../components/CheckoutStepper';

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get shipping address from our new checkout slice
  const { shippingAddress } = useSelector((state) => state.checkout);
  // Get user info to pre-fill from their profile
  const { userInfo } = useSelector((state) => state.auth);

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || 'India');

  const fillFromProfile = () => {
    if (userInfo && userInfo.address) {
      setAddress(userInfo.address.street || '');
      setCity(userInfo.address.city || '');
      setPostalCode(userInfo.address.postalCode || '');
      setCountry(userInfo.address.country || 'India');
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <CheckoutStepper currentStep={0} /> {/* Step 1 is index 0 */}
      
      <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Shipping Details</h1>
          {userInfo?.address && (
            <button onClick={fillFromProfile} className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Fill from Profile
            </button>
          )}
        </div>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="address" className="block text-sm font-medium">Street Address</label>
            <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 input-style" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium">City</label>
              <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} required className="mt-1 input-style" />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium">Postal Code</label>
              <input id="postalCode" type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required className="mt-1 input-style" />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium">Country</label>
            <input id="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} required className="mt-1 input-style" />
          </div>

          <button type="submit" className="w-full btn-primary !py-3 !text-base !mt-8">
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};
export default ShippingPage;