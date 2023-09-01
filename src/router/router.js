import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DoctorQuery from '../views/DoctorQuery.vue'
import DoctorAppointment from '../views/DoctorAppointment.vue'
import DiseaseInquiry from '../views/DiseaseInquiry.vue'
import DoctorOperator from '../views/DoctorOperator.vue'

// import { use } from 'vue/types/umd'
import MedicalHistory from '../components/MedicalHistory.vue'
import AppointmentSuccess from '../views/AppointmentSuccess.vue'
import LoginPage from '../views/LoginPage.vue'


// 路由配置项
const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/home',
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
    path: '/doctor-appointment/:selectedId', // 在此处定义参数
    name: 'DoctorAppointment',
    component: DoctorAppointment,
  },
  {
    path: '/disease-inquiry',
    name: 'DiseaseInquiry',
    component: DiseaseInquiry,
  },
  {
    path: '/doctor-operator',
    name: 'DoctorOperator',
    component: DoctorOperator,
  },
  {
    path: '/appointment-success',
    name: 'AppointmentSuccess',
    component: AppointmentSuccess,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
