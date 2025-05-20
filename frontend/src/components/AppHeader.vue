<template>
    <header class="app-header">
      <div class="header-content">
        <div class="logo">
          <slot name="logo">
            <h1>Mi Aplicación</h1>
          </slot>
        </div>
        
        <nav class="navigation">
          <ul>
            <li v-for="(item, index) in navItems" :key="index">
              <a :href="item.link">{{ item.text }}</a>
            </li>
          </ul>
        </nav>
        
        <div class="user-actions">
          <slot name="user-actions"></slot>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  const props = defineProps({
    navItems: {
      type: Array,
      default: () => [
        { text: 'Inicio', link: '/' },
        { text: 'Dashboard', link: '/dashboard' },
        { text: 'Configuración', link: '/settings' }
      ]
    }
  })
  </script>
  
  <style scoped>
  .app-header {
    background-color: #2c3e50;
    color: white;
    padding: 1rem 2rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .logo h1 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .navigation ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .navigation li {
    margin-left: 1.5rem;
  }
  
  .navigation a {
    color: white;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .navigation a:hover {
    color: #42b983;
  }
  
  .user-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  </style>