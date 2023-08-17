// zzh: 药品查询
<script>
import axios from 'axios';
// import doctorList from '../components/DoctorList.vue'
// import SearchBox from '../components/SearchBox.vue'

export default {
  components: {
    // doctorList,
    // SearchBox
  },
  methods: {
    search() {
      console.log(this.searchKeyword);
      axios.get('http://124.223.143.21:4999/Instructor')
      .then((response) => {
        console.log(response);
        this.title_visible = true;
        this.doctorList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
      this.filterDoctors();
    },
    updateSubDepartments() {
      // 根据选择的一级科室，更新二级科室列表
      this.subDepartments = this.departmentMap[this.selectedDepartment] || [];
      // 重置已选择的二级科室
      this.selectedSubDepartment = '';
    },
    filterDoctors() {
      // 根据选择的科室和搜索关键词过滤医生列表
      const selectedDepartment = this.selectedDepartment;
      const selectedSubDepartment = this.selectedSubDepartment;
      const searchKeyword = this.searchKeyword;

      var res = this.doctors.filter(doctor => {
        const departmentMatch = !selectedDepartment || !doctor.department.localeCompare(selectedDepartment, "zh-CN");
        const subDepartmentMatch = !selectedSubDepartment || !doctor.subDepartment.localeCompare(selectedSubDepartment, "zh-CN");
        const searchMatch = !searchKeyword || !doctor.name.localeCompare(searchKeyword, "zh-CN");
        return departmentMatch && subDepartmentMatch && searchMatch;
      });
      console.log(res);
      this.filteredDoctors = res;
    },
    doctorCardClicked(selectedName) { // 当医生被选中时，存储被选中的医生姓名并返回预约界面
      console.log(selectedName);
      this.$emit('doctor-selected', selectedName);
      this.$router.push('/appointment-success');
    },
  },
  data() {
    return {
      doctorList: [
        // {'name': 'undefined', 'description': 'undefined', 'img_link': ''}
      ],
      title_visible: false,
      searchKeyword: '', // 用于接收搜索框的数据
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
          name: '沈璐',
          department: '内科', 
          subDepartment: '神经内科', 
          expertise: '神经退行性疾病特别是老年期痴呆的基础与临床研究', 
          photoUrl: 'https://www.xiangya.com.cn/upload/images/2021/11/8cd959b5a3921b1d.png' 
        },
        { 
          name: '雷光华',
          department: '外科',
          subDepartment: '骨科', 
          expertise: '擅长人工关节置换、翻修和关节镜微创手术', 
          photoUrl: 'https://www.xiangya.com.cn/upload/images/2021/9/aa61543ee1181e57.jpeg' 
        },
        { 
          name: '祖雄兵',
          department: '外科',
          subDepartment: '泌尿外科', 
          expertise: '肾癌、膀胱癌、前列腺疾病、泌尿外科微创技术', 
          photoUrl: 'https://www.xiangya.com.cn/upload/images/2022/1/2e1d7ff02e9b5c49.jpg' 
        },
        { 
          name: '易斌',
          department: '医技',
          subDepartment: '检验科', 
          expertise: '肿瘤生化免疫实验诊断、临床实验室质量管理及自动化仪器应用', 
          photoUrl: 'https://www.xiangya.com.cn/upload/images/2021/1/661f25095b0c0100.png' 
        },
        // 其他医生信息
      ],
      filteredDoctors: [],
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
        <!-- <SearchBox 
          :input_width="inputWidth" :input_data="inputData" 
          @SearchBoxValueToParent="handleSearchValue">
        </SearchBox> -->
        <va-card class="search-card">
          <div class="search-container">
            <va-input v-model="searchKeyword" placeholder="输入关键词进行搜索"></va-input>
            <va-button color="primary" @click="search">搜索</va-button>
          </div>
        </va-card>
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
        <va-card v-for="doctor in filteredDoctors" :key="doctor.name" class="doctor-card" @click="doctorCardClicked(doctor.name)">
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
  cursor: pointer;
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
