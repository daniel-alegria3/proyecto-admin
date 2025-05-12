<template>
    <div class="app-sidebar">
      <!-- Contenido de tu sidebar aquí -->
      <nav>
        <ul>
          <li>Menú Item 1</li>
          <li>Menú Item 2</li>
          <li>Menú Item 3</li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AppSidebar'
  }
  </script>
  
  <style scoped>
  .app-sidebar {
    width: 250px;
    height: 100vh;
    background: #2c3e50;
    color: white;
    padding: 1rem;
  }
  
  .app-sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .app-sidebar li {
    padding: 0.5rem 0;
    cursor: pointer;
  }
  
  .app-sidebar li:hover {
    color: #42b983;
  }
  </style>