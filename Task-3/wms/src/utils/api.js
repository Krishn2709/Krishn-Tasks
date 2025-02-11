import axios from "axios";

const BASE_URL = "https://i-stage.mkwms.dev";

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
      config.headers.Location = `1`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
