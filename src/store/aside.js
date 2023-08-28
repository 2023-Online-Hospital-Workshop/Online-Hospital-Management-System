export default {
  state: {
    is_expand: true,
    aside_data: [
      {
        path: '/home',
        name: 'Home',
        label: '首页',
        icon: 'home',
        url: '/home'
      },
      {
        path: '/callService',
        name: 'CallService',
        label: '校医院就诊流程',
        icon: 'account_tree',
        url: '/callService'
      },
      {
        path: '/doctor-query',
        name: 'DoctorQuery',
        label: '预约挂号',
        icon: 'insert_invitation',
        url: '/doctor-query',
      },
      {
        path: '/disease-inquiry',
        name: 'DiseaseInquiry',
        label: '常见病信息',
        icon: 'coronavirus',
        url: '/care/CareServiceMine',
      },
      {
        path: '/CareServiceMine',
        name: 'CareServiceMine',
        label: '药品信息',
        icon: 'medical_services',
        url: '/care/CareServiceMine',
      },
      {
        path: '/medical-history',
        name: 'MedicalHistory',
        label: '就诊历史',
        icon: 'calendar_month',
        url: '/MedicalHistory',
      },
      // {
      //   label: '就诊历史',
      //   icon: 'Help',
      //   path: '/medical',
      //   children: [
      //     {
      //       path: '/hReport',
      //       name: 'HReport',
      //       label: '1',
      //       icon: 'setting',
      //       url: '/medical/hReport',
      //     },
      //     {
      //       path: '/doctorComment',
      //       name: 'DoctorComment',
      //       label: '2',
      //       icon: 'setting',
      //       url: '/medical/doctorComment',
      //     },
      //     {
      //       path: '/medicalServiceHistory',
      //       name: 'MedicalServiceHistory',
      //       label: '3',
      //       icon: 'setting',
      //       url: '/medical/medicalServiceHistory',
      //     },
      //   ]
      // },
    ],
    aside_title: '济康同行',//导航栏标题
    isCollapse: false
  },

  mutations: {
    //设置数据
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse
    }
  }
}
