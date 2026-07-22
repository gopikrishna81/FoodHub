import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://127.0.0.1:8000/api/"
    : "https://foodhub-backend-z40u.onrender.com/api/",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;