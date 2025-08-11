import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/slices/checkoutSlice';
import CheckoutStepper from '../components/CheckoutStepper';
import { CreditCard, Truck } from 'lucide-react'; // Assuming COD icon might be a truck

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redirect if shipping address is not set
  const { shippingAddress } = useSelector((state) => state.checkout);
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  // Get the currently saved payment method to pre-fill the form
  const { paymentMethod: currentMethod } = useSelector((state) => state.checkout);
  
  const [paymentMethod, setPaymentMethod] = useState(currentMethod || 'COD');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <CheckoutStepper currentStep={1} /> {/* Step 2 is index 1 */}

      <div className="mt-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Payment Method</h1>
        
        <form onSubmit={submitHandler} className="space-y-6">
          <fieldset>
            <legend className="text-lg font-medium sr-only">Select a payment method</legend>
            <div className="space-y-4">
              
              {/* Cash on Delivery Option */}
              <label className="flex items-center gap-4 p-4 border dark:border-gray-700 rounded-lg has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/50 has-[:checked]:border-blue-500 transition-colors cursor-pointer">
                <input 
                  id="cod" 
                  name="paymentMethod" 
                  type="radio" 
                  value="COD" 
                  checked={paymentMethod === 'COD'} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <Truck className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="font-medium text-gray-800 dark:text-gray-100">Cash on Delivery (COD)</span>
              </label>

              {/* Razorpay / Card Option */}
              <label className="flex items-center gap-4 p-4 border dark:border-gray-700 rounded-lg has-[:checked]:bg-blue-50 dark:has-[:checked]:bg-blue-900/50 has-[:checked]:border-blue-500 transition-colors cursor-pointer">
                <input 
                  id="razorpay" 
                  name="paymentMethod" 
                  type="radio" 
                  value="Razorpay" 
                  checked={paymentMethod === 'Razorpay'} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                />
                <CreditCard className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                <span className="font-medium text-gray-800 dark:text-gray-100">Pay with Razorpay or Card</span>
              </label>

              {/* Add other payment options like Stripe here */}
            </div>
          </fieldset>

          <button type="submit" className="w-full btn-primary !py-3 !text-base !mt-8">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;