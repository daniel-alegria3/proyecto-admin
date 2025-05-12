<template>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input v-model="name" type="text" id="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="email" type="email" id="email" required>
      </div>
      
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input v-model="password" type="password" id="password" required>
      </div>
      
      <div class="form-group">
        <label for="confirmPassword">Confirmar Contraseña</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" required>
      </div>
      
      <button type="submit" class="btn-primary">Registrarse</button>
      
      <p class="auth-link">
        ¿Ya tienes cuenta? 
        <a href="#" @click.prevent="$emit('switch-form')">Inicia sesión aquí</a>
      </p>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const confirmPassword = ref('')
  
  const emit = defineEmits(['submit', 'switch-form'])
  
  const handleSubmit = () => {
    if (password.value !== confirmPassword.value) {
      alert('Las contraseñas no coinciden')
      return
    }
    
    emit('submit', {
      name: name.value,
      email: email.value,
      password: password.value
    })
  }
  </script>
  
  <style scoped>
  /* Los estilos son los mismos que en el LoginForm para mantener consistencia */
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #34495e;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .btn-primary {
    width: 100%;
    padding: 0.75rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
  }
  
  .btn-primary:hover {
    background-color: #2980b9;
  }
  
  .auth-link {
    text-align: center;
    margin-top: 1rem;
    color: #7f8c8d;
  }
  
  .auth-link a {
    color: #3498db;
    text-decoration: none;
  }
  
  .auth-link a:hover {
    text-decoration: underline;
  }
  </style>