import './assets/style/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/style/element-plus/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
