import api from '../utils/api';

export default {
  async getAll() {
    try {
      const response = await api.get('/usuarios');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async create(usuario) {
    try {
      const response = await api.post('/usuarios', usuario);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async update(id, usuario) {
    try {
      const response = await api.put(`/usuarios/${id}`, usuario);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};