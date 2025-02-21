import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
import { createPinia } from 'pinia'
const pinia = createPinia()


app.use(pinia)

app.use(router)
app.mount('#app')
