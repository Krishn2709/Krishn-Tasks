import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    total: 0,
    currentPageRecord: 0,
  },
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsRequest: (state, action) => {
      console.log("hi there : ", action.payload);
      state.loading = true;
      state.error = null;

      if (action.payload) {
        state.pagination.currentPage = action.payload;
      }
    },
    fetchProductsSuccess: (state, action) => {
      console.log("Products Fetched:", action.payload);
      state.loading = false;
      state.products = action.payload.products ?? [];

      if (action.payload.meta) {
        state.pagination = {
          currentPage:
            action.payload.meta.current_page ?? state.pagination.currentPage,
          perPage: action.payload.meta.per_page ?? state.pagination.perPage,
          lastPage: action.payload.meta.last_page ?? state.pagination.lastPage,
          total: action.payload.meta.total ?? state.pagination.total,
          currentPageRecord:
            action.payload.meta.current_page_record ??
            state.pagination.currentPageRecord,
        };
      }
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error =
        action.payload || "An error occurred while fetching products";
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
