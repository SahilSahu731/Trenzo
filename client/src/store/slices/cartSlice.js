import { createSlice } from '@reduxjs/toolkit';

// Helper function to perform calculations
const calculateTotals = (cartItems) => {
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.product.price * item.qty, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 100;
  const taxPrice = 0.18 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

const initialState = {
  cartItems: [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    cartRequestStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    cartRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // This single success action will handle data from get, add, and remove calls
    cartUpdateSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculateTotals(action.payload);
      state.itemsPrice = itemsPrice;
      state.shippingPrice = shippingPrice;
      state.taxPrice = taxPrice;
      state.totalPrice = totalPrice;
    },
    clearCart: (state) => {
        // This is useful to call after a user logs out
        return initialState;
    }
  },
});

export const { 
    cartRequestStart, 
    cartRequestFail, 
    cartUpdateSuccess,
    clearCart
} = cartSlice.actions;

export default cartSlice.reducer;