import axios from "axios";

const userInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL
});

userInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default userInstance;