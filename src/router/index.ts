import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/PageView.vue'
import SmoothView from '../views/SmoothView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/smooth',
      name: 'smooth',
      component: SmoothView
    },
  ]
})

export default router
