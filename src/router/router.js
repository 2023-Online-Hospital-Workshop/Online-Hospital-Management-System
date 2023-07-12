import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
<<<<<<< HEAD
import DoctorQuery from '../views/DoctorQuery.vue'
// import { use } from 'vue/types/umd'
=======
import MedicalHistory from '../components/MedicalHistory.vue'
>>>>>>> 044ab82871435c6474b4d0164120ca6aade7b78a

// 路由配置项
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
<<<<<<< HEAD
    path: '/doctor-query',
    name: 'DoctorQuery',
    component: DoctorQuery,
  }
=======
    path: '/medical-history',
    name: 'MedicalHistory',
    component: MedicalHistory,
  },
>>>>>>> 044ab82871435c6474b4d0164120ca6aade7b78a
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
