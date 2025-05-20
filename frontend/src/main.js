import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index' // Añade '/index' para ser explícito
import './style.css'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// import axios from 'axios';
//
// axios.post('http://localhost:3000/login', {
//   email: 'correo@ejemplo.com',
//   password: '123456'
// })
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error(error);
// });
