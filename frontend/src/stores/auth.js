import { defineStore } from 'pinia'
import { useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),
  
  actions: {
    async login(credentials) {
      const { post } = useApi()
      const router = useRouter()
      
      try {
        const response = await post('/auth/login', credentials)
        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true
        localStorage.setItem('auth_token', response.token)
        router.push('/dashboard')
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al iniciar sesión')
      }
    },
    
    async register(userData) {
      const { post } = useApi()
      const router = useRouter()
      
      try {
        const response = await post('/auth/register', userData)
        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true
        localStorage.setItem('auth_token', response.token)
        router.push('/dashboard')
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Error al registrarse')
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_token')
      router.push('/auth')
    },
    
    initialize() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.token = token
        this.isAuthenticated = true
        this.fetchUser()
      }
    },
    
    async fetchUser() {
      const { get } = useApi()
      try {
        const response = await get('/auth/me')
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    }
  }
})