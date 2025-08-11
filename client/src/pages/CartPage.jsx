import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cartRequestStart, cartUpdateSuccess, cartRequestFail } from '../store/slices/cartSlice';
import { CART_API_URL } from '../utils/constant';
import { Trash2, ShoppingBag, Loader2 } from 'lucide-react';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // State for selected items (stores an array of product IDs)
  const [selectedItems, setSelectedItems] = useState([]);

  // Effect to fetch cart and select all items by default
  useEffect(() => {
    const fetchCart = async () => {
      dispatch(cartRequestStart());
      try {
        const { data } = await axios.get(CART_API_URL, { withCredentials: true });
        dispatch(cartUpdateSuccess(data));
        // By default, select all items that are fetched
        setSelectedItems(data.map(item => item.product._id));
      } catch (err) {
        dispatch(cartRequestFail(err.response?.data?.message || 'Failed to fetch cart.'));
      }
    };
    if (isAuthenticated) {
      fetchCart();
    }
  }, [dispatch, isAuthenticated]);

  // Dynamically calculate totals based ONLY on selected items
  const { selectedItemsPrice, selectedShippingPrice, selectedTaxPrice, selectedTotalPrice } = useMemo(() => {
    const activeItems = cartItems.filter(item => selectedItems.includes(item.product._id));
    
    const itemsPrice = activeItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
    const shippingPrice = itemsPrice > 1000 ? 0 : 100;
    const taxPrice = 0.18 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return { 
      selectedItemsPrice: itemsPrice, 
      selectedShippingPrice: shippingPrice, 
      selectedTaxPrice: taxPrice, 
      selectedTotalPrice: totalPrice 
    };
  }, [cartItems, selectedItems]);

  // Handler functions for managing selection
  const handleSelectItem = (productId) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(cartItems.map(item => item.product._id));
    } else {
      setSelectedItems([]);
    }
  };
  
  // Handlers for quantity change and item removal
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
      // If the removed item was selected, unselect it
      if(selectedItems.includes(productId)){
        setSelectedItems(selectedItems.filter(id => id !== productId));
      }
      const { data } = await axios.delete(`${CART_API_URL}/${productId}`, { withCredentials: true });
      dispatch(cartUpdateSuccess(data));
    } catch (err) {
      dispatch(cartRequestFail(err.response?.data?.message || 'Failed to remove item.'));
    }
  };
  
  const handleCheckout = () => {
    console.log("Proceeding to checkout with item IDs:", selectedItems);
    // In a real app, you might save selectedItems to your checkout slice here
    navigate('/checkout');
  };

  const areAllSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
      {loading && cartItems.length === 0 ? (
        <div className="flex justify-center p-8"><Loader2 className="animate-spin" size={32} /></div>
      ) : cartItems.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
          <Link to="/store" className="mt-6 inline-block btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border-b dark:border-gray-700 mb-4">
              <label className="flex items-center gap-3 text-sm font-medium">
                <input 
                  type="checkbox" 
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={areAllSelected}
                  onChange={handleSelectAll}
                />
                Select All ({selectedItems.length} / {cartItems.length} items)
              </label>
            </div>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item.product._id} className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                  <input 
                    type="checkbox" 
                    className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
                    checked={selectedItems.includes(item.product._id)}
                    onChange={() => handleSelectItem(item.product._id)}
                  />
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
          </div>
          
          <div className="lg:col-span-1">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm sticky top-28">
              <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex justify-between"><span>Items ({selectedItems.length}):</span><span>${selectedItemsPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Shipping:</span><span>${selectedShippingPrice.toFixed(2)}</span></div>
                <div className="flex justify-between"><span>Tax (GST):</span><span>${selectedTaxPrice.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Subtotal:</span><span>${selectedTotalPrice.toFixed(2)}</span></div>
              </div>
              <button 
                onClick={handleCheckout} 
                disabled={loading || selectedItems.length === 0} 
                className="w-full btn-primary mt-6"
              >
                Proceed to Checkout ({selectedItems.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;