import { createRouter, createWebHistory } from 'vue-router'

// 患者页面
import PatientLayout from '../views/Patient/PatientLayout.vue'
import Home from '../views/Patient/Home.vue'
import DoctorQuery from '../views/Patient/DoctorQuery.vue'
import DoctorAppointment from '../views/Patient/DoctorAppointment.vue'
import DiseaseInquiry from '../views/Patient/DiseaseInquiry.vue'
import MedicalHistory from '../views/Patient/MedicalHistory.vue'
import AppointmentSuccess from '../views/Patient/AppointmentSuccess.vue'
import AskAI from '../views/Patient/AskAI.vue'

// 管理员页面
import AdminMedicine from '../views/Admin/AdminMedicine.vue'
import AdminDoctor from '../views/Admin/AdminDoctor.vue'
import AdminLayout from '../views/Admin/AdminLayout.vue'
import AdminOrder from '../views/Admin/AdminOrder.vue'
import AdminFeedback from '../views/Admin/AdminFeedback.vue'
import AdminCheckin from '../views/Admin/AdminCheckin.vue'
import MedicineCount from '../views/Admin/MedicineCount.vue'


// import { use } from 'vue/types/umd'
// 登录注册页面
import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ForgetPassword from '../views/ForgetPassword.vue'

// 医生页面
import DoctorOperator from '../views/Doctor/DoctorOperator.vue'

// 路由配置项
const routes = [
  // 登录注册
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/forget',
    name: 'ForgetPassword',
    component: ForgetPassword,
  },

  // 患者路由
  {
    path: '/Patient',
    name: 'PatientLayout',
    component: PatientLayout,
    redirect: '/Patient/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
      },
      {
        path: 'doctor-query',
        name: 'DoctorQuery',
        component: DoctorQuery,
      },
      {
        path: 'medical-history',
        name: 'MedicalHistory',
        component: MedicalHistory,
      },
      {
        path: 'doctor-appointment/:selectedDoctor/:selectedId/:selectedDep/:doctorTitle', // 在此处定义参数
        name: 'DoctorAppointment',
        component: DoctorAppointment,
      },
      {
        path: 'disease-inquiry',
        name: 'DiseaseInquiry',
        component: DiseaseInquiry,
      },
      {
        path: 'appointment-success',
        name: 'AppointmentSuccess',
        component: AppointmentSuccess,
      },
      {
        path: 'ask-ai',
        name: 'AskAI',
        component: AskAI,
      }
    ]
  },

  // 管理员路由
  {
    path: '/Admin',
    name: 'AdminLayout',
    component: AdminLayout,
    redirect: '/Admin/order',
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
      {
        path: 'feedback',
        name: 'AdminFeedback',
        component: AdminFeedback,
      },
      {
        path: 'checkin',
        name: 'AdminCheckin',
        component: AdminCheckin,
      },
      {
        path: 'MedicineCount',
        name: 'MedicineCount',
        component: MedicineCount,
      }
    ],
  },

  // 医生路由
  {
    path: '/doctor-operator',
    name: 'DoctorOperator',
    component: DoctorOperator,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
