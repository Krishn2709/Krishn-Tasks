// addProdSlice.js
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
  name: "addProduct",
  initialState,
  reducers: {
    // Product Master Data
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

    // Manufacturers
    fetchManufacturers: (state) => {
      state.loading.manufacturers = true;
      state.error.manufacturers = null;
    },
    fetchManufacturersSuccess: (state, action) => {
      state.loading.manufacturers = false;
      state.manufacturers = action.payload;
      state.error.manufacturers = null;
    },
    fetchManufacturersFailure: (state, action) => {
      state.loading.manufacturers = false;
      state.error.manufacturers = action.payload;
    },
    searchManufacturers: (state, action) => {
      state.loading.manufacturers = true;
      state.error.manufacturers = null;
    },

    // Molecules
    fetchMolecules: (state) => {
      state.loading.molecules = true;
      state.error.molecules = null;
    },
    fetchMoleculesSuccess: (state, action) => {
      state.loading.molecules = false;
      state.molecules = action.payload;
      state.error.molecules = null;
    },
    fetchMoleculesFailure: (state, action) => {
      state.loading.molecules = false;
      state.error.molecules = action.payload;
    },
    searchMolecules: (state, action) => {
      state.loading.molecules = true;
      state.error.molecules = null;
    },

    // Add Product
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    updateProductField: (state, action) => {
      const { field, value } = action.payload;
      state.product[field] = value;
    },
    resetProduct: (state) => {
      state.product = {};
      state.loading = false;
      state.error = null;
    },
    submitProductRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    submitProductSuccess: (state) => {
      state.loading = false;
    },
    submitProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Reset state
    resetAddProduct: () => initialState,
  },
});

export const {
  fetchProductMasterData,
  fetchProductMasterDataSuccess,
  fetchProductMasterDataFailure,
  fetchManufacturers,
  fetchManufacturersSuccess,
  fetchManufacturersFailure,
  searchManufacturers,
  fetchMolecules,
  fetchMoleculesSuccess,
  fetchMoleculesFailure,
  searchMolecules,
  setProduct,
  updateProductField,
  resetProduct,
  submitProductRequest,
  submitProductSuccess,
  submitProductFailure,
  resetAddProduct,
} = addProductSlice.actions;

export default addProductSlice.reducer;
