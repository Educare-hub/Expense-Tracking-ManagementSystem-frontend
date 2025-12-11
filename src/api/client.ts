// src/api/client.ts
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, 
  headers: { "Content-Type": "application/json" },
});

// REQUEST INTERCEPTOR - Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("expensepro_token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token attached to request:", token.substring(0, 20) + "...");
    } else {
      console.log("No token found in localStorage");
    }
    
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR - Handle 401 errors (token expired/invalid)
api.interceptors.response.use(
  (response) => {
    // Just return successful responses
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Token invalid or expired");
      
      // Clear invalid auth data
      localStorage.removeItem("expensepro_token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
      
      // Redirect to login
      window.location.href = "/auth/login";
    }
    
    return Promise.reject(error);
  }
);

export default api;