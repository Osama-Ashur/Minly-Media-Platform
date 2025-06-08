// services/api.ts
import axios from "axios";
import { getToken } from "./expo-secure-store";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token dynamically before each request
api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      alert(
        "Unauthorized - token may be expired or invalid - please log in again."
      );
    }
    return Promise.reject(error);
  }
);

export default api;
