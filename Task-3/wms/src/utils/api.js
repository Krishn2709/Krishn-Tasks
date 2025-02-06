import axios from "axios";

const BASE_URL = "https://i-stage.mkwms.dev";

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `/api/v1/login`,
    LOGOUT: `/api/v1/logout`,
    REFRESH_TOKEN: `/api/v1/refresh-token`,
  },
  PRODUCTS: {
    UNPUBLISHED: `/api/v1/master/products/unpublished`,
    CREATE: `/api/v1/master/products`,
    UPDATE: (id) => `/api/v1/master/products/${id}`,
    DELETE: (id) => `/api/v1/master/products/${id}`,
  },
  MANUFACTURERS: {
    LIST: `/api/v1/master/manufacturers`,
    SEARCH: (query) => `/api/v1/master/manufacturers?search=${query},name`,
  },
  MOLECULES: {
    LIST: `/api/v1/master/molecules`,
    SEARCH: (query) => `/api/v1/master/molecules?search=${query},name`,
  },
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
    create: (data) => api.post(ENDPOINTS.PRODUCTS.CREATE, data),
    update: (id, data) => api.put(ENDPOINTS.PRODUCTS.UPDATE(id), data),
    delete: (id) => api.delete(ENDPOINTS.PRODUCTS.DELETE(id)),
  },
  manufacturers: {
    search: (query) => api.get(ENDPOINTS.MANUFACTURERS.SEARCH(query)),
    list: () => api.get(ENDPOINTS.MANUFACTURERS.LIST),
  },
  molecules: {
    search: (query) => api.get(ENDPOINTS.MOLECULES.SEARCH(query)),
    list: () => api.get(ENDPOINTS.MOLECULES.LIST),
  },
};

export default api;
