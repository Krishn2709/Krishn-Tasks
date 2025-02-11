import api from "./api";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `/api/v1/login`,
    LOGOUT: `/api/v1/logout`,
    REFRESH_TOKEN: `/api/v1/refresh-token`,
  },
  PRODUCTS: {
    UNPUBLISHED: `/api/v1/master/products/unpublished`,
    CREATE: `/api/v1/master/products`,
    GET: (id) => `/api/v1/master/products/unpublished/${id}`,
    UPDATE: (id) => `/api/v1/master/products/${id}`,
    DELETE: (id) => `/api/v1/master/products/${id}`,
    MASTER_DATA: `/api/v1/master-data/productMasterData`,
  },
  MANUFACTURERS: {
    LIST: `/api/v1/master/manufacturers`,
    SEARCH: (query) => `/api/v1/master/manufacturers?search=${query},name`,
  },
  MOLECULES: {
    LIST: `/api/v1/master/molecules`,
    SEARCH: (query) => `/api/v1/master/molecules?search=${query},name`,
  },
  B2C_PRODUCTS: {
    LIST: `/api/v1/master/b2c-template`,
    SEARCH: (query) => `/api/v1/master/b2c-template?search=${query},name`,
  },
};

export const buildProductFilterUrl = (filters, sorting, pagination) => {
  const baseUrl = ENDPOINTS.PRODUCTS.UNPUBLISHED;
  const params = new URLSearchParams();

  params.append("sort_by", `${sorting.field},${sorting.direction}`);
  params.append("page", pagination.currentPage);

  if (filters.searchText) {
    params.append("search", `${filters.searchText},${filters.searchField}`);
  }
  if (filters.isAssured) {
    params.append("is_assured", filters.isAssured);
  }
  if (filters.isRefrigerated) {
    params.append("is_refrigerated", filters.isRefrigerated);
  }
  if (filters.status) {
    params.append("publish_status", filters.status);
  }
  if (filters.manufacturer) {
    params.append("manufacturer", filters.manufacturer);
  }
  if (filters.combination) {
    params.append("combination", filters.combination);
  }

  return `${baseUrl}?${params.toString()}`;
};

export const apiMethods = {
  auth: {
    login: (email, password) =>
      api.post(
        ENDPOINTS.AUTH.LOGIN,
        { email, password },
        { headers: { macaddress: "F44EE3CE252F" } }
      ),
    logout: () => api.post(ENDPOINTS.AUTH.LOGOUT),
    refreshToken: (token) => api.post(ENDPOINTS.AUTH.REFRESH_TOKEN, { token }),
  },
  products: {
    fetchUnpublished: (filters, sorting, pagination) =>
      api.get(buildProductFilterUrl(filters, sorting, pagination)),
    fetchEditUnpublished: (id) => api.get(ENDPOINTS.PRODUCTS.GET(id)),
    create: (data) => api.post(ENDPOINTS.PRODUCTS.CREATE, data),
    update: (id, data) => api.put(ENDPOINTS.PRODUCTS.UPDATE(id), data),
    delete: (id) => api.delete(ENDPOINTS.PRODUCTS.DELETE(id)),
    masterData: () => api.get(ENDPOINTS.PRODUCTS.MASTER_DATA),
  },
  manufacturers: {
    search: (query) => api.get(ENDPOINTS.MANUFACTURERS.SEARCH(query)),
    list: () => api.get(ENDPOINTS.MANUFACTURERS.LIST),
  },
  molecules: {
    search: (query) => api.get(ENDPOINTS.MOLECULES.SEARCH(query)),
    list: () => api.get(ENDPOINTS.MOLECULES.LIST),
  },
  b2cProducts: {
    search: (query) => api.get(ENDPOINTS.B2C_PRODUCTS.SEARCH(query)),
    list: () => api.get(ENDPOINTS.B2C_PRODUCTS.LIST),
  },
};
