import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, CheckCircle, XCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { cartRequestFail, cartRequestStart, cartUpdateSuccess } from '../../store/slices/cartSlice';
import { CART_API_URL } from '../../utils/constant';
import axios from 'axios';

const ProductInfo = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const addToCartHandler = async () => {
    dispatch(cartRequestStart());
    try {
      const { data } = await axios.post(CART_API_URL, { productId: product._id, qty }, { withCredentials: true });
      dispatch(cartUpdateSuccess(data));
      // Optional: Show a success toast/modal
    } catch(err) {
      dispatch(cartRequestFail(err.response?.data?.message || 'Failed to add to cart.'));
    }
  };
  
  const StarRating = ({ rating, numReviews }) => (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
        ))}
      </div>
      <a href="#reviews" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">({numReviews} Reviews)</a>
    </div>
  );

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{product.brand}</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">{product.name}</h1>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-3xl text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
        <StarRating rating={product.rating} numReviews={product.numReviews} />
      </div>
      <p className="mt-6 text-base text-gray-600 dark:text-gray-300">{product.description}</p>
      
      {/* --- Actions Panel --- */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="qty" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
            <div className="relative mt-1">
              <input id="qty" type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} min="1" max={product.countInStock} className="input-style w-full text-center" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Availability</p>
            <p className={`mt-1 flex items-center gap-2 text-sm font-semibold ${product.countInStock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
              {product.countInStock > 0 ? <CheckCircle size={16} /> : <XCircle size={16} />}
              {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
            </p>
          </div>
        </div>
        <button 
          onClick={addToCartHandler}
          disabled={product.countInStock === 0}
          className="mt-6 w-full btn-primary py-3 text-base"
        >
          {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;