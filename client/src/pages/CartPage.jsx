import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cartRequestStart, cartUpdateSuccess, cartRequestFail } from '../store/slices/cartSlice';
import { CART_API_URL } from '../utils/constant';
import { Trash2, ShoppingBag, Loader2 } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, itemsPrice, shippingPrice, taxPrice, totalPrice, loading, error } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchCart = async () => {
      dispatch(cartRequestStart());
      try {
        const { data } = await axios.get(CART_API_URL, { withCredentials: true });
        dispatch(cartUpdateSuccess(data));
      } catch (err) {
        dispatch(cartRequestFail(err.response?.data?.message || 'Failed to fetch cart.'));
      }
    };
    if (isAuthenticated) {
      fetchCart();
    }
  }, [dispatch, isAuthenticated]);

  const handleQtyChange = async (productId, qty) => {
    dispatch(cartRequestStart());
    try {
      const { data } = await axios.post(CART_API_URL, { productId, qty }, { withCredentials: true });
      dispatch(cartUpdateSuccess(data));
    } catch (err) {
      dispatch(cartRequestFail(err.response?.data?.message || 'Failed to update cart.'));
    }
  };

  const handleRemoveItem = async (productId) => {
    dispatch(cartRequestStart());
    try {
      const { data } = await axios.delete(`${CART_API_URL}/${productId}`, { withCredentials: true });
      dispatch(cartUpdateSuccess(data));
    } catch (err) {
      dispatch(cartRequestFail(err.response?.data?.message || 'Failed to remove item.'));
    }
  };

  const handleCheckout = () => navigate('/shipping');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      {loading && cartItems.length === 0 ? (<div className="flex justify-center p-8"><Loader2 className="animate-spin" size={32} /></div>) :
      cartItems.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
          <Link to="/store" className="mt-6 inline-block btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.product._id} className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <img src={item.product.image.secure_url} alt={item.product.name} className="w-20 h-20 rounded-md object-cover" />
                <div className="flex-grow">
                  <Link to={`/product/${item.product._id}`} className="font-semibold hover:underline">{item.product.name}</Link>
                  <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <select value={item.qty} onChange={(e) => handleQtyChange(item.product._id, Number(e.target.value))} className="input-style py-1.5">
                    {[...Array(item.product.countInStock).keys()].map(x => (<option key={x + 1} value={x + 1}>{x + 1}</option>))}
                  </select>
                  <button onClick={() => handleRemoveItem(item.product._id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full"><Trash2 size={20} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between"><p>Items:</p><p>${itemsPrice.toFixed(2)}</p></div>
                <div className="flex justify-between"><p>Shipping:</p><p>${shippingPrice.toFixed(2)}</p></div>
                <div className="flex justify-between"><p>Tax (GST):</p><p>${taxPrice.toFixed(2)}</p></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><p>Total:</p><p>${totalPrice.toFixed(2)}</p></div>
              </div>
              <button onClick={handleCheckout} disabled={loading} className="w-full btn-primary mt-6">
                {loading ? 'Updating...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;