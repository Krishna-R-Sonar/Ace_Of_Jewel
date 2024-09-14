import axios from "axios";

// create an instance of axios with default settings
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5173/api", // default api base url
  timeout: 10000, // timeout of 10 seconds for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// adding an interceptor to attach token to every request (if available)
api.interceptors.request.use(
  (config) => {
    // retrive token from localStorage (or any other storage methoud you're using)
    const token = localStorage.getItem("authToken");
    if (token) {
      // if token exists, attach it to the headers
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handling response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // globally error handling logic (e.g, redirect to login on 401 Unauthorized)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("authToken"); // remove token if it's invalid
      window.location.href = "/login"; // redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
