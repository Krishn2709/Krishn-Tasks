import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  b2cProducts: [],
  loading: {
    b2cProducts: false,
    addProduct: false,
  },
  error: {
    b2cProducts: null,
    addProduct: null,
  },
};

const productSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    postProductRequest: (state) => {
      state.loading.addProduct = true;
      state.success = false;
      state.error.addProduct = null;
    },
    postProductSuccess: (state) => {
      state.loading.addProduct = false;
      state.success = true;
      state.error.addProduct = null;
    },
    postProductFailure: (state, action) => {
      state.loading.addProduct = false;
      state.success = false;
      state.error.addProduct = action.payload;
    },

    fetchB2CProducts: (state) => {
      state.loading.b2cProducts = true;
      state.error.b2cProducts = null;
    },
    fetchB2CProductsSuccess: (state, action) => {
      state.loading.b2cProducts = false;
      state.b2cProducts = action.payload;
      state.error.b2cProducts = null;
    },
    fetchB2CProductsFailure: (state, action) => {
      state.loading.b2cProducts = false;
      state.error.b2cProducts = action.payload;
    },
    searchB2CProducts: (state, action) => {
      state.loading.b2cProducts = true;
      state.error.b2cProducts = null;
    },
  },
});

export const {
  postProductRequest,
  postProductSuccess,
  postProductFailure,
  fetchB2CProducts,
  fetchB2CProductsSuccess,
  fetchB2CProductsFailure,
  searchB2CProducts,
} = productSlice.actions;
export default productSlice.reducer;
