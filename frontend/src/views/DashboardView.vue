<template>
    <div class="dashboard">
      <AppHeader />
      
      <div class="dashboard-layout">
        <AppSidebar />
        
        <main class="dashboard-content">
          <h1>Bienvenido, {{ user.nombre_completo }}</h1>
          
          <div class="stats-grid">
            <BaseCard title="Proyectos Activos" :value="stats.projects" icon="📋" />
            <BaseCard title="Tareas Pendientes" :value="stats.tasks" icon="✅" />
            <BaseCard title="Archivos Subidos" :value="stats.files" icon="📁" />
          </div>
          
          <div class="recent-projects">
            <h2>Tus Proyectos Recientes</h2>
            <div v-if="loading">Cargando...</div>
            <div v-else-if="projects.length === 0">No tienes proyectos aún</div>
            <ul v-else class="project-list">
              <li v-for="project in projects" :key="project.id_proyecto" class="project-item">
                <h3>{{ project.titulo }}</h3>
                <p>{{ project.descripcion }}</p>
                <span>Fecha fin: {{ formatDate(project.fecha_fin) }}</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import AppHeader from '@/components/UI/AppHeader.vue'
  import AppSidebar from '@/components/UI/AppSidebar.vue'
  import BaseCard from '@/components/UI/BaseCard.vue'
  import { useApi } from '@/composables/useApi'
  
  const { get } = useApi()
  const authStore = useAuthStore()
  const user = authStore.user
  
  const stats = ref({
    projects: 0,
    tasks: 0,
    files: 0
  })
  
  const projects = ref([])
  const loading = ref(true)
  
  onMounted(async () => {
    try {
      // Obtener estadísticas
      const statsResponse = await get('/dashboard/stats')
      stats.value = statsResponse.data
      
      // Obtener proyectos recientes
      const projectsResponse = await get('/projects/recent')
      projects.value = projectsResponse.data
      
    } catch (error) {
      console.error('Error al cargar dashboard:', error)
    } finally {
      loading.value = false
    }
  })
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString()
  }
  </script>
  
  <style scoped>
  .dashboard {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .dashboard-layout {
    display: flex;
    flex: 1;
  }
  
  .dashboard-content {
    flex: 1;
    padding: 2rem;
    background-color: #f8f9fa;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
  }
  
  .recent-projects {
    margin-top: 3rem;
  }
  
  .project-list {
    list-style: none;
    padding: 0;
    margin-top: 1rem;
  }
  
  .project-item {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    margin-bottom: 1rem;
  }
  
  .project-item h3 {
    margin: 0 0 0.5rem 0;
    color: #2c3e50;
  }
  
  .project-item p {
    margin: 0 0 0.5rem 0;
    color: #7f8c8d;
  }
  
  .project-item span {
    font-size: 0.9rem;
    color: #95a5a6;
  }
  </style>