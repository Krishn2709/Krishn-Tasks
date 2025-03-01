import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: {},
  productMasterData: {
    product_type: [],
    dosage_form: [],
    package_type: [],
    uom: [],
    schedule_type_code: [],
    gst_type: [],
    b2b_category: [],
    sales_trend_category: [],
    product_return_type: [],
    product_return_details: {
      RETURNABLE: {},
      NON_RETURNABLE: {},
    },
    mis_reporting_category: [],
    mis_warehouse_category: [],
  },
  manufacturers: [],
  molecules: [],
  loading: {
    masterData: false,
    manufacturers: false,
    molecules: false,
    addProduct: false,
  },
  error: {
    masterData: null,
    manufacturers: null,
    molecules: null,
    addProduct: null,
  },
};

const addProductSlice = createSlice({
  name: "productMaster",
  initialState,
  reducers: {
    fetchProductMasterData: (state) => {
      state.loading.masterData = true;
      state.error.masterData = null;
    },
    fetchProductMasterDataSuccess: (state, action) => {
      state.loading.masterData = false;
      state.productMasterData = action.payload;
      state.error.masterData = null;
    },
    fetchProductMasterDataFailure: (state, action) => {
      state.loading.masterData = false;
      state.error.masterData = action.payload;
    },
  },
});

export const {
  fetchProductMasterData,
  fetchProductMasterDataSuccess,
  fetchProductMasterDataFailure,
  setProduct,
  updateProductField,
  resetProduct,
} = addProductSlice.actions;

export default addProductSlice.reducer;
