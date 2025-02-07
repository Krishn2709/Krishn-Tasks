import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: false,
};

const editProductSlice = createSlice({
  name: "editProduct",
  initialState,
  reducers: {
    // Fetch product details
    fetchProductDetails: (state) => {
      state.loading = true;
      state.error = null;
      state.productData = null;
    },
    fetchProductDetailsSuccess: (state, action) => {
      state.loading = false;
      state.productData = action.payload;
    },
    fetchProductDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update product
    updateProduct: (state) => {
      state.updateLoading = true;
      state.updateError = null;
      state.updateSuccess = false;
    },
    updateProductSuccess: (state) => {
      state.updateLoading = false;
      state.updateSuccess = true;
    },
    updateProductFailure: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
      state.updateSuccess = false;
    },

    // Reset states
    resetUpdateStatus: (state) => {
      state.updateLoading = false;
      state.updateError = null;
      state.updateSuccess = false;
    },
    resetEditProduct: () => initialState,
  },
});

export const {
  fetchProductDetails,
  fetchProductDetailsSuccess,
  fetchProductDetailsFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
  resetUpdateStatus,
  resetEditProduct,
} = editProductSlice.actions;

// Selectors
export const selectProductData = (state) => state.editProduct.productData;
export const selectLoading = (state) => state.editProduct.loading;
export const selectError = (state) => state.editProduct.error;
export const selectUpdateLoading = (state) => state.editProduct.updateLoading;
export const selectUpdateError = (state) => state.editProduct.updateError;
export const selectUpdateSuccess = (state) => state.editProduct.updateSuccess;

export default editProductSlice.reducer;
