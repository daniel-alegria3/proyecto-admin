import { createRouter, createWebHistory } from 'vue-router';
import authService from '@/services/authService';

const routes = [
  {
    path: '/',
    redirect: '/projects',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'), // Ruta corregida
    meta: { requiresAuth: false }
  },
  {
    // path: '/projects/:projectId',
    path: '/projects',
    name: 'Project',
    component: () => import('@/views/ProjectView.vue'),
    //meta: { requiresAuth: true }
  },
  {
    // path: '/projects/:projectId/tasks/:taskId',
    path: '/projects/:projectId',
    name: 'ProjectTask',
    component: () => import('@/views/ProjectTaskView.vue'),
    //meta: { requiresAuth: true }
  },

];

// router.push({ name: 'ProjectTask', params: { projectId: '123', taskId: '456' } })

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !authService.isAuthenticated()) {
    next('/login');
  } else if (to.path === '/login' && authService.isAuthenticated()) {
    next('/projects');
  } else {
    next();
  }
});


export default router;
