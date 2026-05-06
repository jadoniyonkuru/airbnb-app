import axios from 'axios';

// Single shared axios instance — all API calls use this
// baseURL comes from .env file — VITE_API_URL=https://your-api.com
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// REQUEST INTERCEPTOR — runs before every request
// Reads token from localStorage and attaches it as Bearer token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Attach token so protected API routes recognize the user
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR — runs after every response
// Catches 401 Unauthorized — token expired or invalid
api.interceptors.response.use(
  // Pass successful responses through unchanged
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token and send user back to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;