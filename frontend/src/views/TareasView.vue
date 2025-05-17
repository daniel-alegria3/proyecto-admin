<template>
  <div class="app-container">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="user-info">
        <img class="user-photo" src="https://i.pravatar.cc/100" alt="Usuario" />
        <p class="user-name">Juan Pérez</p>
      </div>

      <nav class="menu">
        <button 
          :class="{ active: vista === 'usuarios' }" 
          @click="vista = 'usuarios'">Usuarios</button>
        <button 
          :class="{ active: vista === 'proyectos' }" 
          @click="vista = 'proyectos'">Proyectos</button>
        <button 
          :class="{ active: vista === 'tareas' }" 
          @click="mostrarListaTareas">Tareas</button>
      </nav>
    </aside>

    <!-- Contenido principal -->
    <main class="main-content">
      <!-- Vista Usuarios y Proyectos: solo un texto placeholder -->
      <div v-if="vista === 'usuarios'">
        <h2>Gestión de Usuarios</h2>
        <p>Esta sección está en construcción...</p>
      </div>

      <div v-else-if="vista === 'proyectos'">
        <h2>Gestión de Proyectos</h2>
        <p>Esta sección está en construcción...</p>
      </div>

      <!-- Vista Tareas: Lista o Formulario -->
      <div v-else-if="vista === 'tareas'">
        <!-- Lista de tareas -->
        <div v-if="modo === 'lista'">
          <div class="tareas-header">
            <h2>Tareas</h2>
            <button class="btn-agregar" @click="modo = 'agregar'; resetFormulario()">+ Agregar</button>
          </div>

          <table v-if="tareas.length" class="tareas-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Descripción</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>ID Proyecto</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tarea in tareas" :key="tarea.id_tarea">
                <td>{{ tarea.titulo }}</td>
                <td>{{ tarea.descripcion }}</td>
                <td>{{ formatDate(tarea.fecha_inicio) }}</td>
                <td>{{ formatDate(tarea.fecha_fin) }}</td>
                <td>{{ tarea.id_proyecto }}</td>
                <td><button @click="editarTarea(tarea)">✏ Editar</button></td>
                <td><button @click="eliminarTarea(tarea.id_tarea)">🗑 Eliminar</button></td>
              </tr>
            </tbody>
          </table>
          <p v-else>No hay tareas registradas.</p>
        </div>

        <!-- Formulario agregar o editar -->
        <div v-else>
          <h2>{{ modo === 'agregar' ? 'Agregar Tarea' : 'Editar Tarea' }}</h2>
          <h3 v-if="modo === 'editar'">Título: {{ nuevaTarea.titulo }}</h3>

          <form @submit.prevent="guardarTarea" class="formulario-form">
            <input v-model="nuevaTarea.titulo" placeholder="Título" required />
            <input v-model="nuevaTarea.descripcion" placeholder="Descripción" required />
            <input type="date" v-model="nuevaTarea.fecha_inicio" required />
            <input type="date" v-model="nuevaTarea.fecha_fin" required />
            <input type="number" v-model="nuevaTarea.id_proyecto" placeholder="ID del proyecto" required />
            
            <div class="form-buttons">
              <button type="submit">{{ modo === 'agregar' ? 'Agregar' : 'Guardar Cambios' }}</button>
              <button type="button" @click="cancelarAccion">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      vista: 'tareas', // usuarios, proyectos, tareas
      modo: 'lista', // lista, agregar, editar

      tareas: [],
      nuevaTarea: {
        titulo: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        id_proyecto: ''
      },
      idEditando: null
    };
  },
  mounted() {
    this.cargarTareas();
  },
  methods: {
    formatearFechaParaInput(fecha) {
  if (!fecha) return '';
  const partes = fecha.split('/');
  if (partes.length !== 3) return '';
  const [dia, mes, anio] = partes;
  return `${anio}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
},
    async cargarTareas() {
      try {
        const res = await axios.get('http://localhost:3000/tareas');
        this.tareas = res.data;
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      }
    },

    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString();
    },

    mostrarListaTareas() {
      this.vista = 'tareas';
      this.modo = 'lista';
      this.cargarTareas();
    },

    resetFormulario() {
      this.nuevaTarea = {
        titulo: '',
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        id_proyecto: ''
      };
      this.idEditando = null;
    },

    guardarTarea() {
      if (this.modo === 'agregar') {
        this.crearTarea();
      } else if (this.modo === 'editar') {
        this.actualizarTarea();
      }
    },

    async crearTarea() {
      try {
        await axios.post('http://localhost:3000/tareas', this.nuevaTarea);
        this.resetFormulario();
        this.modo = 'lista';
        await this.cargarTareas();
      } catch (error) {
        console.error('Error al crear tarea:', error);
      }
    },

   editarTarea(tarea) {
  this.nuevaTarea = { ...tarea };
  this.idEditando = tarea.id_tarea;
  this.modo = 'editar';
},

    async actualizarTarea() {
      try {
        await axios.put(`http://localhost:3000/tareas/${this.idEditando}`, this.nuevaTarea);
        this.resetFormulario();
        this.modo = 'lista';
        await this.cargarTareas();
      } catch (error) {
        console.error('Error al actualizar tarea:', error);
      }
    },

    async eliminarTarea(id) {
      if (confirm('¿Deseas eliminar esta tarea?')) {
        try {
          await axios.delete(`http://localhost:3000/tareas/${id}`);
          await this.cargarTareas();
        } catch (error) {
          console.error('Error al eliminar tarea:', error);
        }
      }
    },

    cancelarAccion() {
      this.resetFormulario();
      this.modo = 'lista';
    }
  }
};
</script>

<style scoped>
/* Container general con sidebar + contenido */
.app-container {
  display: flex;
  height: 100vh;
  background-color: #f8f8f8;
}

/* Sidebar */
.sidebar {
  background-color: #7f9db4;
  width: 220px;
  padding: 2rem 1rem;
  border-radius: 0 30px 30px 0;
  box-shadow: 5px 0 10px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
}

.user-info {
  text-align: center;
}

.user-photo {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 3px solid white;
}

.user-name {
  margin-top: 0.5rem;
  font-weight: 600;
  color: white;
}

.menu button {
  display: block;
  width: 100%;
  padding: 0.75rem 0;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  border-radius: 12px;
  transition: background-color 0.3s;
  margin-bottom: 0.7rem;
}

.menu button:hover,
.menu button.active {
  background-color: #003b75;
}

/* Contenido principal */
.main-content {
  flex-grow: 1;
  padding: 2rem 3rem;
  overflow-y: auto;
}

.tareas-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-agregar {
  background-color: #0d4a89;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn-agregar:hover {
  background-color: #003b75;
}

.tareas-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #f1f1f1;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  overflow: hidden;
}

.tareas-table th,
.tareas-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  color: #333;
}

.tareas-table th {
  background-color: #d0e1ee;
  font-weight: 600;
}

.tareas-table tr:hover {
  background-color: #e9f0f5;
}

.formulario-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  max-width: 600px;
}

.formulario-form input {
  padding: 0.7rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.form-buttons {
  grid-column: span 2;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.form-buttons button {
  padding: 0.7rem 1.4rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-buttons button[type="submit"] {
  background-color: #0d4a89;
  color: white;
}

.form-buttons button[type="submit"]:hover {
  background-color: #003b75;
}

.form-buttons button[type="button"] {
  background-color: #ccc;
  color: #333;
}

.form-buttons button[type="button"]:hover {
  background-color: #aaa;
}
</style>
