import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    product_type: "Goods",
    product_name: "",
    is_active: true,
    transaction_units: {
      purchase_unit: 1,
      sales_unit: 1,
      transfer_unit: 1,
    },
    packaging_units: {
      dosage_form: "",
      package_type: "",
      uom: "",
      package_size: "",
    },
    combination: {
      molecules: [],
    },
    is_discontinued: false,
    is_refrigerated: false,
    can_sell_online: true,
    is_chronic: true,
    is_rx_required: true,
    is_assured: false,
    is_banned: false,
    is_hidden_from_alternate_products: false,
    taxes: {
      gst_type: "",
      hsn_code: "",
    },
    sales_category: {
      b2b_category: "",
      b2c_category: "",
      sales_trend_category: "",
      return_type: "",
      purchase: 90,
      purchase_return: -60,
      transfer_out: 60,
      transfer_in: -120,
      franchise_out: 90,
      franchise_in: 0,
      b2c_out: 120,
      b2c_in: 0,
    },
    manufacturer: {},
    mis_reporting_category: "",
    mis_warehouse_category: "",
    mrp: "",
  },
};

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { key, value } = action.payload;

      // Safely update the form data
      if (key) {
        state.formData = {
          ...state.formData,
          [key]: value,
        };
      }
    },
    clearFormData: (state) => {
      state.formData = initialState.formData;
    },
  },
});

export const { updateFormData, clearFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
