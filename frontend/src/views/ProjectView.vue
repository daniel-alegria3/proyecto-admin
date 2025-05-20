<template>
    <div class="projects-view">
      <BaseCard class="projects-header">
        <template #header>
          <div class="header-content">
            <h2>Mis Proyectos</h2>
            <button @click="showCreateModal = true" class="btn-primary">
              <i class="fas fa-plus"></i> Nuevo Proyecto
            </button>
          </div>
        </template>
      </BaseCard>

      <div class="projects-grid">
        <BaseCard
          v-for="project in projects"
          :key="project.id_proyecto"
          class="project-card"
          hover-effect
        >
          <template #header>
            <h3>{{ project.titulo }}</h3>
            <span class="status-badge" :class="project.status">{{ project.status }}</span>
          </template>

          <p>{{ project.description }}</p>

          <div class="meta-info">
            <span><i class="fas fa-calendar-alt"></i> {{ formatDate(project.fecha_inicio) }}</span>
            <span><i class="fas fa-calendar-alt"></i> {{ formatDate(project.fecha_fin) }}</span>
            <!-- <span><i class="fas fa-users"></i> {{ project.teamSize }}</span> -->
          </div>

          <template #footer>
            <div class="card-actions">
              <button @click="editProject(project)" class="btn-icon">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="deleteProject(project.id_proyecto)" class="btn-icon danger">
                <i class="fas fa-trash"></i>
              </button>
              <button @click="expandProject(project.id_proyecto)" class="btn-icon">
                <i class="fas fa-expand"></i> Expandir
              </button>
            </div>
          </template>
        </BaseCard>
      </div>

      <!-- Modal para crear/editar proyectos -->
      <ProjectModal
        v-if="showCreateModal"
        :project="currentProject"
        @close="closeModal"
        @save="saveProject"
      />
    </div>
  </template>

<script setup>
  import { ref, onMounted } from 'vue'
  import BaseCard from '@/components/ProjectBaseCard.vue'
  import ProjectModal from '@/components/ProjectModal.vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios';

  const router = useRouter()
  const projects = ref([])

  onMounted(() => {
    axios.get('http://localhost:3000/users/cliente/proyectos')
    .then(res => {
      projects.value = res.data
    })
    .catch(error => {
      console.error('API error:', error)
    })
  })


  const showCreateModal = ref(false)
  const currentProject = ref(null)
  const isEditing = ref(false)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  const editProject = (project) => {
    currentProject.value = { ...project }
    isEditing.value = true
    showCreateModal.value = true
  }

  const deleteProject = (id) => {
    if (confirm('¿Estás seguro de eliminar este proyecto?')) {
      projects.value = projects.value.filter(p => p.id_proyecto !== id)
    }
  }

  const expandProject = (id) => {
    router.push({ name: 'ProjectTask', params: {projectId: id} })
  }

  const saveProject = (projectData) => {
    if (isEditing.value) {
      // Actualizar proyecto existente
      const index = projects.value.findIndex(p => p.id_proyecto === projectData.id_proyecto)
      if (index !== -1) {
        projects.value[index] = projectData
      }
    } else {
      // Crear nuevo proyecto
      const newProject = {
        ...projectData,
        id_proyecto: Math.max(...projects.value.map(p => p.id_proyecto)) + 1
      }
      projects.value.push(newProject)
    }
    closeModal()
  }

  const closeModal = () => {
    showCreateModal.value = false
    currentProject.value = null
    isEditing.value = false
  }

  </script>

  <style scoped>
  .projects-view {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .projects-header {
    margin-bottom: 2rem;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .project-card {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .project-card h3 {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: capitalize;
  }

  .status-badge.active {
    background-color: #e3fcef;
    color: #36b37e;
  }

  .status-badge.pending {
    background-color: #fffae6;
    color: #ffab00;
  }

  .status-badge.completed {
    background-color: #f4f5f7;
    color: #5e6c84;
  }

  .meta-info {
    margin-top: auto;
    display: flex;
    justify-content: space-between;
    color: #6b778c;
    font-size: 0.9rem;
  }

  .card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .btn-primary {
    background-color: #0052cc;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .btn-icon {
    background: none;
    border: none;
    cursor: pointer;
    color: #5e6c84;
    padding: 0.5rem;
  }

  .btn-icon.danger {
    color: #ff5630;
  }

  .btn-icon:hover {
    color: #0052cc;
  }

  .btn-icon.danger:hover {
    color: #de350b;
  }
  </style>
