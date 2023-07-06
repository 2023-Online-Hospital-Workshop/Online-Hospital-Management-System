// 7-30修改医生的主页面侧边栏

// 左侧导航栏数据
export default {
  state: {
    aside_data: [],
    aside_title: '颐养通',//导航栏标题
    isCollapse: false
  },
  mutations: {
    //清空
    clearAsideData (state) {
      state.aside_data = []
    },
    //设置用户的导航栏
    SetClientAsideData (state) {
      state.aside_title = '颐养通';
      state.aside_data = [
        {
          path: '/home',
          name: 'Home',
          label: '个人首页',
          icon: 's-home',
          url: '/home'
        },
        {
          path: '/callService',
          name: 'CallService',
          label: '新的呼叫',
          icon: 'setting',
          url: '/callService'
        },
        {
          path: '/CareServiceMine',
          name: 'CareServiceMine',
          label: '护理服务',
          icon: 'discover',
          url: '/care/CareServiceMine',
        },
        {
          label: '医疗服务',
          icon: 'discover',
          path: '/medical',
          children: [
            {
              path: '/hReport',
              name: 'HReport',
              label: '健康报告',
              icon: 'setting',
              url: '/medical/hReport',
            },
            {
              path: '/doctorComment',
              name: 'DoctorComment',
              label: '评价投诉',
              icon: 'setting',
              url: '/medical/doctorComment',
            },
            {
              path: '/medicalServiceHistory',
              name: 'MedicalServiceHistory',
              label: '医疗记录',
              icon: 'setting',
              url: '/medical/medicalServiceHistory',
            }
          ]
        },
        {
          label: '个人中心',
          icon: 'user',
          path: '/user',
          children: [
            {
              path: '/userInfor',
              name: 'UserInfor',
              label: '个人信息',
              icon: 'setting',
              url: '/user/userInfor',
            },
            {
              path: '/historyDisease',
              name: 'HistoryDisease',
              label: '既往病史',
              icon: 'setting',
              url: '/user/historyDisease',
            },

          ]
        }
      ]
    }
    ,
    SetNurseAsideData (state) {
      state.aside_data = [
        {
          name: 'NurseHome',
          label: '首页',
          icon: 's-home',
          path: '/nursehome'
        },
        {
          label: '订单中心',
          name: 'TakeOrder',
          icon: 'finished',
          path: '/takeorder',
          children: [
            {
              label: '分配顶单',
              name: 'TakeOrderApply',
              icon: 'setting',
              path: '/takeorderapply'
            },
            {
              label: '历史记录',
              name: 'TakeOrderMine',
              icon: 'setting',
              path: '/takeordermine'
            }
          ]
        },
        {
          label: '信息中心',
          name: 'Nurser',
          icon: 's-custom',
          path: '/nurser',
          children: [
            {
              name: 'NurserInfor',
              label: '个人信息',
              icon: 'setting',
              path: '/nurserinfor'
            },
            {
              name: 'NurseAdminSearch',
              label: '用户管理',
              icon: 'setting',
              path: '/nurseAdminSearch'
            },
            {
              name: 'NurserQualification',
              label: '资质核验',
              icon: 'setting',
              path: '/nurserqualification'
            },
            {
              name: 'NurseReportHandle',
              label: '投诉管理',
              icon: 'setting',
              path: '/nurseReportHandle'
            }
          ]
        },
      ]
    },
    SetDoctorAsideData (state) {
      state.aside_data = [
        {
          name: 'DoctorHome',
          label: '系统首页',
          icon: 's-home',
          path: '/doctorHome',
          url: '/doctorHome'
        },
        {
          label: '医疗服务',
          name: 'MedicalUnit',
          icon: 'discover',
          path: '/medicalUnit',
          children: [
            {
              label: '服务申请受理',
              name: 'MedicalOrderApply',
              icon: 'setting',
              path: '/medicalUnit/medicalOrderApply'
            },
            {
              label: '健康报告管理',
              name: 'HealthReport',
              icon: 'setting',
              path: '/medicalUnit/healthReport'
            },
            {
              label: '查看服务评价',
              name: 'ServiceComment',
              icon: 'setting',
              path: '/medicalUnit/serviceComment'
            },
            {
              label: '申请人员归档',
              name: 'ClientManagement',
              icon: 'setting',
              path: '/medicalUnit/clientManagement'
            }
          ]
        },
        {
          label: '信息中心',
          name: 'DoctorSelf',
          icon: 'discover',
          path: '/doctorSelf',
          children: [
            {
              name: 'DoctorInfor',
              label: '个人信息',
              icon: 'setting',
              path: '/doctorInfor'
            },
            {
              name: 'Search',
              label: '用户管理',
              icon: 'setting',
              path: '/search'
            },
            {
              name: 'DoctorQualification',
              label: '资质管理',
              icon: 'setting',
              path: '/doctorQualification'
            },
            {
              name: 'ReportHandle',
              label: '投诉管理',
              icon: 'setting',
              path: '/reportHandle'
            },
            {
              name: 'AdminHistoryDisease',
              label: '病史管理',
              icon: 'setting',
              path: '/adminHistoryDisease'
            }
          ]
        }
      ]
    },
    //管理员侧边栏数据
    SetAdminAsideData (state) {
      state.aside_data = [
        {
          name: 'Console',
          label: '个人首页',
          icon: 's-home',
          path: '/admin/console',
          url: '/admin/console'
        },
        {
          name: 'CareService',
          label: '呼叫服务',
          icon: 'search',
          path: '/admin/careService',
          url: '/admin/careService'
        },
        {
          name: 'CareCall',
          label: '我的呼叫',
          icon: 'user',
          path: '/careCall',
          url: '/careCall'
        },
        {
          name: 'CarerQualify',
          label: '护理历史',
          icon: 'user',
          path: '/carerQualify',
          url: '/carerQualify'
        },
        {
          name: 'OrgQualify',
          label: '医疗历史',
          icon: 'setting',
          path: '/orgQualify',
          url: '/orgQualify'
        },
        {
          name: 'ReportScan',
          label: '既往病史',
          icon: 'chat-dot-square',
          path: '/reportScan',
          url: '/reportScan'
        },
        {
          name: 'AdminUserInfor',
          label: '个人信息',
          icon: 'user-solid',
          path: '/admin/AdminUserInfor',
          url: '/admin/AdminUserInfor'
        },
      ]
    },
    collapseMenu (state) {
      state.isCollapse = !state.isCollapse
    }
  }
}
