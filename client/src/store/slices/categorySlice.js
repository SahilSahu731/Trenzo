import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  loading: false,
  error: null,
  success: false, // For tracking success of CUD operations
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoryRequestStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    categoryRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    },
    createCategorySuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.categories.push(action.payload);
    },
    resetCategoryState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
    // We will add deleteCategorySuccess later
  },
});

export const {
  categoryRequestStart,
  categoryRequestFail,
  getCategoriesSuccess,
  createCategorySuccess,
  resetCategoryState,
} = categorySlice.actions;

export default categorySlice.reducer;