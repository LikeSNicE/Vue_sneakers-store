import './assets/main.css'
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

import router from './routes/router'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)
app.use(pinia)
app.mount('#app')
