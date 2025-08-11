import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveShippingAddress, savePaymentMethod, clearCheckout } from '../store/slices/checkoutSlice';
import { clearCartItems } from '../store/slices/cartSlice';
import { ORDER_API_URL } from '../utils/constant';
import { toast } from 'react-toastify';
import { Lock, CreditCard, Truck, Loader2, ChevronDown, Tag, ShoppingCart } from 'lucide-react';
import PaymentPage from './PaymentPage';
import ShippingPage from './ShippingPage';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState('shipping');
  const [shippingData, setShippingData] = useState(useSelector(state => state.checkout.shippingAddress));
  const [paymentMethod, setPaymentMethod] = useState(useSelector(state => state.checkout.paymentMethod));
  
  // --- NEW STATE ---
  const [isSummaryOpen, setIsSummaryOpen] = useState(false); // For mobile summary accordion
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { userInfo } = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(shippingData));
    setCurrentStep('payment');
  };
  
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    setCurrentStep('summary');
  };

  const handleApplyCoupon = () => {
    // Placeholder for coupon logic
    if (couponCode.toUpperCase() === 'DISCOUNT10') {
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code.');
    }
  };

  const placeOrderHandler = async () => { /* ... same as before ... */ };

  // --- Reusable Order Summary Component ---
  const OrderSummaryCard = () => (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-xl font-bold border-b dark:border-gray-700 pb-4">Order Summary</h2>
      <div className="space-y-2 mt-4 text-sm">
        <div className="flex justify-between"><span>Items ({cart.cartItems.reduce((acc, item) => acc + item.qty, 0)}):</span><span>${cart.itemsPrice.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Shipping:</span><span>${cart.shippingPrice.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Tax (GST):</span><span>${cart.taxPrice.toFixed(2)}</span></div>
        <div className="flex justify-between font-bold text-lg border-t dark:border-gray-700 pt-2 mt-2"><span>Total:</span><span>${cart.totalPrice.toFixed(2)}</span></div>
      </div>
      
      {/* --- NEW: Coupon Code Field --- */}
      <div className="mt-6">
        <label htmlFor="coupon" className="text-sm font-medium">Have a coupon?</label>
        <div className="mt-1 flex gap-2">
          <input type="text" id="coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon Code" className="input-style flex-grow" />
          <button type="button" onClick={handleApplyCoupon} className="btn-secondary !px-4">Apply</button>
        </div>
      </div>

      {currentStep === 'summary' && (
        <div className="mt-6">
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <button onClick={placeOrderHandler} disabled={loading} className="w-full btn-primary !py-3 flex items-center justify-center gap-2">
            {loading && <Loader2 className="animate-spin" size={20} />}
            {loading ? 'Placing Order...' : `Place Order (${paymentMethod})`}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* --- 1. NEW: Mobile Order Summary Accordion --- */}
      <div className="lg:hidden mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <button 
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            className="w-full p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart />
              <span className="font-semibold">{isSummaryOpen ? 'Hide' : 'Show'} Order Summary</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">${cart.totalPrice.toFixed(2)}</span>
              <ChevronDown className={`transition-transform ${isSummaryOpen ? 'rotate-180' : ''}`} />
            </div>
          </button>
          {isSummaryOpen && <div className="p-4 border-t dark:border-gray-700"><OrderSummaryCard /></div>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-4">
          {/* --- Step 1: Shipping --- */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-3"><Truck /> Shipping Address</h2>
              {currentStep !== 'shipping' && <button onClick={() => setCurrentStep('shipping')} className="text-sm font-medium text-blue-500 hover:underline">Edit</button>}
            </div>
            {currentStep === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="p-6 pt-0 space-y-4">
                <ShippingPage/>
              </form>
            )}
          </div>

          {/* --- Step 2: Payment --- */}
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-opacity ${currentStep === 'shipping' ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
             <div className="p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-3"><CreditCard /> Payment Method</h2>
              {currentStep === 'summary' && <button onClick={() => setCurrentStep('payment')} className="text-sm font-medium text-blue-500 hover:underline">Edit</button>}
            </div>
            {currentStep === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="p-6 pt-0 space-y-4">
                <PaymentPage/>
              </form>
            )}
          </div>
        </div>

        {/* --- 3. UPDATED: Desktop Order Summary --- */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="sticky top-28">
            <OrderSummaryCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;