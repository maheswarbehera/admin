import axios from 'axios';

// Constants for configuration
const API_BASE_URL = "http://localhost:8080/api/v1" ; // Replace with your API base URL 
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json', // Default headers for all requests
};


// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: DEFAULT_HEADERS,
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authentication token if available
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  error => {
    // Handle errors globally
    if (error.response) {
      console.error(`Error: ${error.response.status} - ${error.response.data.message || 'An error occurred'}`);
      // localStorage.removeItem('jwtToken');
    }
    return Promise.reject(error);
  }
)

export default axiosInstance;
  