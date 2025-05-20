import api from '@/utils/api';

export default {
  async getAll() {
    try {
      const response = await api.get('/proyectos');
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/proyectos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async create(proyecto) {
    try {
      const response = await api.post('/proyectos', proyecto);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async update(id, proyecto) {
    try {
      const response = await api.put(`/proyectos/${id}`, proyecto);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async delete(id) {
    try {
      const response = await api.delete(`/proyectos/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  async getByResponsable(id) {
    try {
      const response = await api.get(`/proyectos/responsable/${id}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
};
