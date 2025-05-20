<!-- src/views/LoginView.vue -->
<template>
  <div class="fondo">
    <div class="login-container">
      <div class="icono">
        <i class="fas fa-camera"></i>
      </div>
      <input type="email" placeholder="Email" v-model="email"/>
      <input type="password" placeholder="Contraseña" v-model="password"/>
      <button @click="handleSubmit">INGRESAR</button>

      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//import authService from '@/services/authService';
import axios from 'axios';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  error.value = '';
  isLoading.value = true;

  if (!email.value || !password.value) {
    error.value = 'Por favor, complete todos los campos.';
    isLoading.value = false;
    return;
  }

  try {
    //const response = await authService.login(email.value, password.value);

    //const res = await axios.post('http://localhost:3000/users/login', {
    //    email: email.value, contraseña: password.value
    //}, { withCredentials: true });
    // Redirigir al dashboard
    router.push({ path: `/projects/${id}` })

  } catch (err) {
    error.value = err.message || 'Error en el inicio de sesión';
    console.error('Error de login:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

.fondo {
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  background-color: #7f9db4;
  padding: 2rem;
  border-radius: 30px;
  box-shadow: 20px 20px 60px #6b8aa0, -20px -20px 60px #9bb6ce;
  width: 400px;
  text-align: center;
}

.icono {
  font-size: 50px;
  color: #00c3ff;
  margin-bottom: 20px;
}

input {
  display: block;
  width: 100%;
  padding: 1rem;
  margin: 10px 0;
  border: none;
  border-radius: 8px;
  background-color: #001f2f;
  color: white;
}

button {
  width: 100%;
  padding: 1rem;
  background-color: #0d4a89;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  margin-top: 15px;
  transition: 0.3s;
}

button:hover {
  background-color: #003b75;
}
</style>
