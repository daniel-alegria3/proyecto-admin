import { createRouter, createWebHistory } from 'vue-router';
import AuthView from '@/views/AuthView.vue';
import DashboardView from '@/views/DashboardView.vue';
import authService from '@/services/authService';

import TareasView from '@/views/TareasView.vue'
const routes = [
  {
    path: '/',
    name: 'auth',
    component: AuthView,
    meta: { requiresGuest: true }, // Opcional: solo para usuarios no autenticados
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'), // Ruta corregida
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }, // Protege esta ruta
  },
  // ... otras rutas (ProjectsView, etc.)
  {
    //path: '/tareas/:id',
    path: '/tareas',
    name: 'Tareas',
    component: TareasView,
    props: true
  //meta: { requiresAuth: true }
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    next('/login');
  } else if (to.path === '/login' && authService.isAuthenticated()) {
    next('/dashboard');
  } else {
    next();
  }
});


export default router;
