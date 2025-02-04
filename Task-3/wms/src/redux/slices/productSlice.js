import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
  filters: {
    searchText: "",
    searchField: "product_code",
    isAssured: "",
    isRefrigerated: "",
    status: "",
    manufacturer: "",
    combination: "",
    showFilters: false,
  },
  sorting: {
    field: "ws_code",
    direction: "d",
  },
  pagination: {
    currentPage: 1,
    perPage: 10,
    lastPage: 1,
    total: 0,
    currentPageRecord: 0,
  },
  manufacturers: [],
  molecules: [],
  loadingManufacturers: false,
  loadingMolecules: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      if (action.payload) {
        state.pagination.currentPage = action.payload;
      }
    },
    fetchProductsSuccess: (state, action) => {
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
    setSearchFilter: (state, action) => {
      state.filters.searchText = action.payload.searchText;
      state.filters.searchField = action.payload.searchField;
    },
    setFilter: (state, action) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    toggleFilters: (state) => {
      state.filters.showFilters = !state.filters.showFilters;
    },
    clearFilters: (state) => {
      state.filters = {
        ...initialState.filters,
        showFilters: state.filters.showFilters,
      };
    },
    setSorting: (state, action) => {
      state.sorting = action.payload;
    },

    searchManufacturers: (state, action) => {
      state.loadingManufacturers = true;
    },
    searchMolecules: (state, action) => {
      state.loadingMolecules = true;
    },
    fetchManufacturersSuccess: (state, action) => {
      state.manufacturers = action.payload;
      state.loadingManufacturers = false;
    },
    fetchMoleculesSuccess: (state, action) => {
      state.molecules = action.payload;
      state.loadingMolecules = false;
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
  setSearchFilter,
  setFilter,
  toggleFilters,
  clearFilters,
  setSorting,
  searchManufacturers,
  searchMolecules,
  fetchManufacturersSuccess,
  fetchMoleculesSuccess,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
