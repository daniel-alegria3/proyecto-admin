import axios from 'axios';

export default {
  async getCurrentUser() {
    try {
      const response = await axios.post('/users/logged_in');
      return response.data.id_usuario
    } catch (error) {
      throw error.response ? error.response.data : error;
      return false;
    }
  },

  async isAuthenticated() {
    return true;
    try {
      const response = await axios.post('/users/logged_in');
      if (response.data.loggedIn) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error.response ? error.response.data : error;
      return false;
    }
  },
};
