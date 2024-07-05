import axios from "axios";

const adminInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
});

adminInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('admintoken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminInstance;