import axios from "axios";

const API = axios.create({
  // Fixed: Forcing the communication path straight to your active server port channel
  baseURL: "http://localhost:8085", 
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
