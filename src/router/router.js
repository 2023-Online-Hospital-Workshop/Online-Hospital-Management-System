import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DoctorQuery from '../views/DoctorQuery.vue'

// import { use } from 'vue/types/umd'
import MedicalHistory from '../components/MedicalHistory.vue'

import RegisterVue from '@/views/Register.vue'

// 路由配置项
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/doctor-query',
    name: 'DoctorQuery',
    component: DoctorQuery,
  },
  {
    path: '/medical-history',
    name: 'MedicalHistory',
    component: MedicalHistory,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterVue,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
