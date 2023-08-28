import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DoctorQuery from '../views/DoctorQuery.vue'
import DoctorAppointment from '../views/DoctorAppointment.vue'
import DiseaseInquiry from '../views/DiseaseInquiry.vue'
import DoctorOperator from '../views/DoctorOperator.vue'

import AdminLayout from '../views/Admin/AdminLayout.vue'
import AdminOrder from '../views/Admin/AdminOrder.vue'
import AdminMedicine from '../views/Admin/AdminMedicine.vue'
import AdminDoctor from '../views/Admin/AdminDoctor.vue'

// import { use } from 'vue/types/umd'
import MedicalHistory from '../components/MedicalHistory.vue'
import AppointmentSuccess from '../views/AppointmentSuccess.vue'


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
    path: '/doctor-appointment/:selectedDoctor/:selectedId', // 在此处定义参数
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
    path: '/Admin',
    name: 'AdminLayout',
    component: AdminLayout, 
    redirect:'/Admin/order',
    children: [
      {
        path: 'order',
        name: 'AdminOrder',
        component: AdminOrder,
      },
      {
        path: 'medicine',
        name: 'AdminMedicine',
        component: AdminMedicine,
      },
      {
        path: 'doctor',
        name: 'AdminDoctor',
        component: AdminDoctor,
      },
    ],
  },  {
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
