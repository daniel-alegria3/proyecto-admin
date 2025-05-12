<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto' }}</h3>
          <button class="close-btn" @click="close">&times;</button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Nombre del Proyecto</label>
              <input 
                id="name" 
                v-model="formData.name" 
                type="text" 
                required
              >
            </div>
            
            <div class="form-group">
              <label for="description">Descripción</label>
              <textarea 
                id="description" 
                v-model="formData.description" 
                rows="3"
              ></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="status">Estado</label>
                <select id="status" v-model="formData.status">
                  <option value="active">Activo</option>
                  <option value="pending">Pendiente</option>
                  <option value="completed">Completado</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="dueDate">Fecha Límite</label>
                <input 
                  id="dueDate" 
                  v-model="formData.dueDate" 
                  type="date" 
                  required
                >
              </div>
            </div>
            
            <div class="form-group">
              <label for="teamSize">Tamaño del Equipo</label>
              <input 
                id="teamSize" 
                v-model.number="formData.teamSize" 
                type="number" 
                min="1"
                required
              >
            </div>
            
            <div class="modal-actions">
              <button type="button" class="btn-secondary" @click="close">
                Cancelar
              </button>
              <button type="submit" class="btn-primary">
                {{ isEditing ? 'Actualizar' : 'Crear' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    project: {
      type: Object,
      default: null
    }
  })
  
  const emit = defineEmits(['close', 'save'])
  
  const isEditing = ref(false)
  const formData = ref({
    name: '',
    description: '',
    status: 'active',
    dueDate: '',
    teamSize: 1
  })
  
  // Inicializar con datos del proyecto si estamos editando
  watch(() => props.project, (project) => {
    if (project) {
      isEditing.value = true
      formData.value = { ...project }
    } else {
      isEditing.value = false
      resetForm()
    }
  }, { immediate: true })
  
  const resetForm = () => {
    formData.value = {
      name: '',
      description: '',
      status: 'active',
      dueDate: '',
      teamSize: 1
    }
  }
  
  const close = () => {
    emit('close')
    resetForm()
  }
  
  const handleSubmit = () => {
    emit('save', { ...formData.value })
    close()
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-container {
    background: white;
    border-radius: 8px;
    width: 90%;
    max-width: 600px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .modal-header h3 {
    margin: 0;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .form-group textarea {
    resize: vertical;
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
  }
  
  .form-row .form-group {
    flex: 1;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
  
  .btn-primary {
    background-color: #0052cc;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-secondary {
    background-color: #f4f5f7;
    color: #5e6c84;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #0065ff;
  }
  
  .btn-secondary:hover {
    background-color: #ebecf0;
  }
  </style>