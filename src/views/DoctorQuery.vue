// zzh: 药品查询
<script>
import axios from 'axios';
// import doctorList from '../components/DoctorList.vue'
import SearchBox from '../components/SearchBox.vue'

export default {
  components: {
    // doctorList,
    SearchBox
  },
  methods: {
    handleSearchValue(value) {
      console.log(value);

      axios.get('http://124.223.143.21:4999/Instructor')
      .then((response) => {
        console.log(response);
        this.title_visible = true;
        this.doctorList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    updateSubDepartments() {
      // 根据选择的一级科室，更新二级科室列表
      this.subDepartments = this.departmentMap[this.selectedDepartment] || [];
      // 重置已选择的二级科室
      this.selectedSubDepartment = '';
    },
    filteredDoctors() {
      // 根据选择的科室和搜索关键词过滤医生列表
      const selectedDepartment = this.selectedDepartment;
      const selectedSubDepartment = this.selectedSubDepartment;
      // const searchKeyword = this.searchKeyword.toLowerCase();

      return this.doctors.filter(doctor => {
        const departmentMatch = !selectedDepartment || doctor.department.localeCompare(selectedDepartment, "zh-CN");
        const subDepartmentMatch = !selectedSubDepartment || doctor.subDepartment.localeCompare(selectedSubDepartment, "zh-CN");
        // const searchMatch = !searchKeyword || doctor.name.toLowerCase().includes(searchKeyword) || doctor.expertise.toLowerCase().includes(searchKeyword);
        return departmentMatch && subDepartmentMatch; 
        // && searchMatch;
      });
    }
  },
  data() {
    return {
      doctorList: [
        // {'name': 'undefined', 'description': 'undefined', 'img_link': ''}
      ],
      title_visible: false,
      inputData: [], // 用于接收搜索框的数据
      inputWidth: '800px',
      selection: [], // 用于接收筛选框的选项
      departments: ["内科", "外科", "医技"],  // 一级科室列表
      selectedDepartment: '', // 选中的一级科室
      selectedSubDepartment: '',
      subDepartments: [],
      departmentMap: {
        "内科": ['消化内科', '皮肤科', '神经内科'],
        "外科": ['消化外科', '骨科', '泌尿外科'],
        "医技": ['放射科', '超声科', '检验科']
        // 其他一级科室和对应的二级科室列表
      },
      doctors: [
        { 
          name: '宾睦',
          department: '内科', 
          subDepartment: '消化内科', 
          expertise: '胃肠病优化治疗', 
          photoUrl: 'https://faculty.tongji.edu.cn/_resources/group1/M00/00/03/wKhyGGCWAWiAWN0vAACDLAAhQ28337.png' 
        },
        { 
          name: '江晴石',
          department: '外科',
          subDepartment: '骨科', 
          expertise: '粉碎性骨折诊疗', 
          photoUrl: 'https://faculty.tongji.edu.cn/_resources/group1/M00/00/20/wKhyGGGu-q6AcFlTAAG0hrBfcAo492.png' 
        },
        // 其他医生信息
      ]
    };
  },
}

// 7.6 测试端口通信
// var myText = "Nah"
// axios.post('http://124.223.143.21:5000/Login', {user_id: '12345'})
//   .then(
//     function(response) {
//       console.log(response);
//       myText = response;
//     })
</script>

<template>
  <div id="main-page">
    <h1 class="va-h3">Doctor Query</h1>
    <div>
    
      <va-card class="department-card">
      
      <div class="flex flex-row">
        <SearchBox 
          :input_width="inputWidth" :input_data="inputData" 
          @SearchBoxValueToParent="handleSearchValue">
        </SearchBox>
      </div>

      <div class="department-selectors">
        <div class="department-selector">
          <label for="firstDepartment">一级科室：</label>
          <select id="firstDepartment" v-model="selectedDepartment" @change="updateSubDepartments">
            <option value="">请选择一级科室</option>
            <option value="内科">内科</option>
            <option value="外科">外科</option>
            <option value="医技">医技</option>
          </select>
        </div>

        <div class="department-selector">
          <label for="secondDepartment">二级科室：</label>
          <select id="secondDepartment" v-model="selectedSubDepartment">
            <option value="">请选择二级科室</option>
            <option v-for="subDept in subDepartments" :key="subDept" :value="subDept">{{ subDept }}</option>
          </select>
        </div>
      </div>

      <div class="doctors-list">
        <va-card v-for="doctor in filteredDoctors" :key="doctor.name" class="doctor-card">
          <div class="doctor-photo">
            <img :src="doctor.photoUrl" alt="Doctor Photo">
          </div>
          <div class="doctor-details">
            <h3>{{ doctor.name }}</h3>
            <p>科室: {{ doctor.subDepartment }}</p>
            <p>擅长领域: {{ doctor.expertise }}</p>
          </div>
        </va-card>
      </div>
    </va-card>

  </div>
    
    <!-- <va-option-list
      v-model="listValue"
      type="radio"
      :options="['Option 1', 'Option 2', 'Option 3']"
    /> -->
    <!-- <doctorList :title_visible="title_visible" :doctorList="doctorList" /> -->
  </div>
</template>

<style scoped>

.department-card {
  margin-bottom: 20px;
  padding: 20px;
}

.department-selectors {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.department-selector {
  margin-right: 20px;
  border-color: BackgroundBorder;
  color: TextInverted;
}

.department-card {
  margin-bottom: 20px;
  padding: 20px;
}

.doctors-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.doctor-card {
  width: 200px;
  margin-right: 20px;
  margin-bottom: 20px;
}

.doctor-photo img {
  width: 100%;
  height: auto;
}

.doctor-details h3 {
  margin-top: 10px;
  margin-bottom: 5px;
}

.doctor-details p {
  margin-bottom: 5px;
}

#main-page {
  margin-left: 24%;
}

header {
  line-height: 1.5;
}

.flex {
  margin-top: 10px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

@import url('https://fonts.cdnfonts.com/css/sf-pro-display'); /* 引入远程字体 */
body {
  font-family: 'SF Pro Display', sans-serif; /* 应用字体 */
}

</style>
