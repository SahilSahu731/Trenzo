import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCartItems } from '../store/slices/cartSlice';
import { clearCheckout } from '../store/slices/checkoutSlice';
import { ORDER_API_URL } from '../utils/constant';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const PlaceOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod } = useSelector((state) => state.checkout);

    const [loading, setLoading] = useState(false);

    const placeOrderHandler = async () => {
        setLoading(true);
        try {
            const orderData = {
                // --- THIS IS THE CRITICAL FIX ---
                // We must manually create a new object for each order item,
                // pulling the details from the nested 'product' object.
                orderItems: cart.cartItems.map(item => ({
                    name: item.product.name,
                    qty: item.qty,
                    image: item.product.image.secure_url,
                    price: item.product.price,
                    product: item.product._id, // This is the reference ID
                })),
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            };

            const { data: createdOrder } = await axios.post(ORDER_API_URL, orderData, { withCredentials: true });
            
            dispatch(clearCartItems()); 
            dispatch(clearCheckout());

            navigate(`/order/${createdOrder._id}`);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to place order. Please try again.';
            toast.error(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* Shipping Details */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Shipping</h2>
                        <p><strong>Address: </strong>{shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}</p>
                    </div>
                    {/* Payment Method */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
                        <p><strong>Method: </strong>{paymentMethod}</p>
                    </div>
                    {/* Order Items */}
                    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                        <div className="space-y-4">
                            {cart.cartItems.map(item => (
                                <div key={item.product._id} className="flex items-center gap-4">
                                    <img src={item.product.image.secure_url} alt={item.product.name} className="w-16 h-16 rounded-md object-cover"/>
                                    <div className="flex-grow"><Link to={`/product/${item.product._id}`} className="font-medium hover:underline">{item.product.name}</Link></div>
                                    <div>{item.qty} x ${item.product.price.toFixed(2)} = <strong>${(item.qty * item.product.price).toFixed(2)}</strong></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Order Summary card */}
                <div className="md:col-span-1">
                    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow sticky top-28">
                        <h2 className="text-xl font-bold border-b pb-4">Order Totals</h2>
                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between"><span>Items Price:</span><span>${cart.itemsPrice.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Shipping:</span><span>${cart.shippingPrice.toFixed(2)}</span></div>
                            <div className="flex justify-between"><span>Tax:</span><span>${cart.taxPrice.toFixed(2)}</span></div>
                            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span>Total:</span><span>${cart.totalPrice.toFixed(2)}</span></div>
                        </div>
                        <button onClick={placeOrderHandler} disabled={loading || cart.cartItems.length === 0} className="w-full btn-primary mt-6 flex items-center justify-center gap-2">
                            {loading && <Loader2 className="animate-spin" size={20} />}
                            {loading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PlaceOrderPage;