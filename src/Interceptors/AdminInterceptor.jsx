import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const AdminInstance = axios.create({
  baseURL: BASE_URL,
});

AdminInstance.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("admintoken");
    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AdminInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      if (error.response.status === 401) {
        toast.error("Unauthorized. Check your authentication credentials.");
      
      } else {
        toast.error(error.response.data.message || "Error fetching data.");
      }
    } else if (error.request) {
      console.error("Request Error:", error.request);
      toast.error("No response received from the server.");
    } else {
      console.error("Error:", error.message);
      toast.error("An error occurred.");
    }
    return Promise.reject(error);
  }
);

export default AdminInstance;
