import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  page: 1,
  pages: 1,
  total: 0,
  loading: false,
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // --- Reducers to manage the lifecycle of API calls ---
    productRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    productRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // --- Reducers for successful data fetching (Read) ---
    getProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
      state.total = action.payload.total;
    },
    getProductDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },

    // --- Reducers for successful data modification (Create, Update, Delete) ---
    createProductSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.products.push(action.payload);
    },
    updateProductSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      // Find and update the product in the list
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      // Filter out the deleted product from the list
      // The payload here will be the ID of the deleted product
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    resetProductState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
  },
});

export const {
  productRequestStart,
  productRequestFail,
  getProductsSuccess,
  getProductDetailsSuccess,
  createProductSuccess,
  updateProductSuccess,
  deleteProductSuccess,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
