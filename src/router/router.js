import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MedicalHistory from '../components/MedicalHistory.vue'

// 路由配置项
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/medical-history',
    name: 'MedicalHistory',
    component: MedicalHistory,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
