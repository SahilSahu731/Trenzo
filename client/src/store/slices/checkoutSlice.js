import { createSlice } from '@reduxjs/toolkit';

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: 'COD', // Set Cash on Delivery as the default
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },
    // Action to clear checkout state after order is placed
    clearCheckout: (state) => {
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
      return { shippingAddress: {}, paymentMethod: 'COD' };
    }
  },
});

export const { saveShippingAddress, savePaymentMethod, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;