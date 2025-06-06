import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Ajusta según tu configuración
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para añadir el token a las peticiones
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor para manejar errores globales
api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    // Token expirado o no válido - redirigir a login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default api;