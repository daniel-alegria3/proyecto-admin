<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Login</h1>
      
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model.trim="username"
            type="text"
            id="username"
            required
            autocomplete="username"
            placeholder="Enter your username"
          >
        </div>
        
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model.trim="password"
            type="password"
            id="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
          >
        </div>
        
        <div class="form-options">
          <div class="remember-me">
            <input
              v-model="rememberMe"
              type="checkbox"
              id="rememberMe"
            >
            <label for="rememberMe">Remember me</label>
          </div>
          <a href="#" class="forgot-password" @click.prevent="$emit('forgot-password')">
            Forgot password?
          </a>
        </div>
        
        <button type="submit" class="login-button">
          Login
        </button>
      </form>
      
      <div class="register-link">
        Don't have an account? 
        <a href="#" @click.prevent="$emit('switch-form')">Register</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const emit = defineEmits(['submit', 'switch-form', 'forgot-password'])

const handleSubmit = () => {
  emit('submit', {
    username: username.value,
    password: password.value,
    rememberMe: rememberMe.value
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: #555;
  font-weight: 500;
}

.form-group input {
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #646cff;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remember-me input {
  width: 16px;
  height: 16px;
}

.remember-me label {
  font-size: 13px;
  color: #555;
  cursor: pointer;
}

.forgot-password {
  font-size: 13px;
  color: #646cff;
  text-decoration: none;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #535bf2;
  text-decoration: underline;
}

.login-button {
  background-color: #646cff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 14px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
}

.login-button:hover {
  background-color: #535bf2;
}

.register-link {
  text-align: center;
  margin-top: 25px;
  font-size: 14px;
  color: #555;
}

.register-link a {
  color: #646cff;
  text-decoration: none;
  transition: color 0.3s;
}

.register-link a:hover {
  color: #535bf2;
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-card {
    padding: 30px 20px;
  }
  
  .login-title {
    font-size: 24px;
    margin-bottom: 25px;
  }
  
  .login-form {
    gap: 16px;
  }
}
</style>