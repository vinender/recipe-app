// http.js

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/router';


 const http = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:5000',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    // You can add other common headers here
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    const token = response.data.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response && error.response.status === 401) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          const router = useRouter();
          router.push('/login');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default http;
