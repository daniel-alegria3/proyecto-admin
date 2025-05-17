<!-- src/views/LoginView.vue -->
<template>
  <div class="fondo">
    <div class="login-container">
      <div class="icono">
        <i class="fas fa-camera"></i>
      </div>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Contraseña" />
      <button>INGRESAR</button>
      
    </div>
  </div>
</template>

<script setup>
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
