import api from '@/utils/api';

export default {
  async login(email, password) {
    try {
      const response = await api.post('/auth/loginForm', { email, password });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
