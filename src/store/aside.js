export default {
  state: {
    aside_data: [
        {
          path: '/home',
          name: 'Home',
          label: '首页',
          icon: 'House',
          url: '/home'
        },
        {
          path: '/callService',
          name: 'CallService',
          label: '校医院就诊流程',
          icon: 'Guide',
          url: '/callService'
        },
        {
          path: '/DoctorAppointment',
          name: 'DoctorAppointment',
          label: '预约挂号',
          icon: 'Edit',
          url: '/DoctorAppointment',
        },
        {
          path: '/CareServiceMine',
          name: 'CareServiceMine',
          label: '常见病信息',
          icon: 'Help',
          url: '/care/CareServiceMine',
        },
        {
          path: '/CareServiceMine',
          name: 'CareServiceMine',
          label: '药品信息',
          icon: 'View',
          url: '/care/CareServiceMine',
        },
        {
          path: '/MedicalHistory',
          name: 'MedicalHistory',
          label: '就诊历史',
          icon: 'View',
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
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    }
  }
}
