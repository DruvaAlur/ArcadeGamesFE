// src/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // your backend URL
  withCredentials: true,            // include cookies with every request
});

api.interceptors.response.use(
    (response) => response, // return successful response
    (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token has expired or is invalid, logout user     
        window.location.href = '/login';  // Redirect to login page
      }
      return Promise.reject(error);
    }
);

export default api;