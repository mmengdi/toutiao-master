import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/PageView.vue'
import Smoothfrom from '@/views/smooth/index.vue'
import Agreement from '@/views/agreement/index.vue'
import Privacy from '@/views/privacy/index.vue'
import Error from '@/views/error/index.vue'
import Aweme from '@/views/aweme/index.vue'
import Wechat from '@/views/wechat/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/smooth',
      name: 'smooth',
      component: Smoothfrom
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: Agreement
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: Privacy
    },
    {
      path: '/aweme',
      name: 'aweme',
      component: Aweme
    },
    {
      path: '/wechat',
      name: 'wechat',
      component: Wechat
    },
    {
      path: '/:catchAll(.*)', // 匹配所有路径
      component: Error // 指定404错误页面组件
    }
   
  ]
})

export default router
