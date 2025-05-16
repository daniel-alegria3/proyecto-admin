<template>
  <div class="login-box">
    <div class="form-content">
      <div class="camera-icon-container">
        <div class="camera-icon-circle">
          <i class="fas fa-camera camera-icon"></i>
        </div>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-container">
          <span class="icon-box">
            <i class="fas fa-user"></i>
          </span>
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="Email"
          />
        </div>

        <div class="input-container">
          <span class="icon-box">
            <i class="fas fa-lock"></i>
          </span>
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Contraseña"
          />
        </div>

        <button type="submit" class="login-btn">INGRESAR</button>

        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import authService from '@/services/authService';

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
    const response = await authService.login(email.value, password.value);
    
    // Guardar token y datos del usuario
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.usuario));
    
    // Redirigir al dashboard
    router.push({ name: 'Dashboard' });
    
  } catch (err) {
    error.value = err.message || 'Error en el inicio de sesión';
    console.error('Error de login:', err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

body {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to bottom, #041428, #072142);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}

.login-box {
  width: 100%;
  max-width: 360px;
  background-color: rgba(15, 66, 107, 0.5);
  border-radius: 28px;
  padding: 40px 30px;
  box-shadow: 0 0 30px rgba(0, 186, 255, 0.15);
  border: 1px solid rgba(0, 195, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.login-box::after {
  content: '';
  position: absolute;
  bottom: -15px;
  right: -15px;
  width: 100px;
  height: 200px;
  background: radial-gradient(ellipse at center, rgba(15, 51, 61, 0.4) 0%, rgba(15, 66, 107, 0) 70%);
  z-index: 0;
  border-radius: 50%;
  filter: blur(10px);
}

.camera-icon-container {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.camera-icon-circle {
  width: 90px;
  height: 90px;
  border: 2px solid rgba(0, 195, 255, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.camera-icon {
  font-size: 35px;
  color: rgba(0, 195, 255, 0.9);
}

.input-container {
  position: relative;
  margin-bottom: 15px;
}

.icon-box {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #ffffff;
  font-size: 16px;
}

.form-control {
  background-color: rgb(6, 41, 59);
  border: none;
  height: 50px;
  border-radius: 5px;
  padding-left: 45px;
  width: 100%;
  box-sizing: border-box;
  color: white;
  font-size: 15px;
}

.form-control::placeholder {
  color: #a8b5c5;
}

.login-btn {
  background-color: #0d4d81;
  border: none;
  color: white;
  height: 50px;
  border-radius: 8px;
  font-weight: 500;
  letter-spacing: 1px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
  margin-top: 30px;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.login-btn:hover {
  background-color: rgb(83, 173, 241);
}

.error-message {
  color: red;
  text-align: center;
  font-size: 14px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
</style>
