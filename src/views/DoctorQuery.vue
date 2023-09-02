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
      this.filteredDoctors = [];
      axios.get('http://124.223.143.21:4999/Instructor')
      .then((response) => {
        // console.log(response);
        this.title_visible = true;
        this.doctorList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
      // this.filterDoctors();
      this.httpGetDoctors(this.selectedDepartment);
    },
    httpGetDepts() {
      this.departments = [];
      axios.get('http://124.223.143.21:4999/api/Department2')
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            const item = response.data[i];
            this.departments.push(item.departmentName);
          }
          this.doctorList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    httpGetDoctors(dep = null) {
      if (dep == null) { // 情况一：页面初始化
        // console.log("key:"+this.searchKeyword)
        for (let d of this.departments) {
          console.log("di:"+d);
          axios({
            method: 'GET',
            url: 'http://124.223.143.21/api/Consultationinfo', 
            params: {
              department: d,
              keyword: this.searchKeyword,
            }
          })
            .then(response => {
              for (let j = 0; j < response.data.length; j++) {
                this.filteredDoctors[this.filteredDoctors.length] = {};
                for (let key in response.data[j]) {
                  this.filteredDoctors[this.filteredDoctors.length - 1][key] = response.data[j][key];
                }
                this.filteredDoctors[this.filteredDoctors.length - 1]["department"] = d;
              }
            }
          )
          .catch((error) => {
            console.log(error);
          });
        }
        
        return ;
      }
      // 情况二：筛选
      axios({
        method: 'get',
        url: 'http://124.223.143.21/api/Consultationinfo', 
        params: {
          department: dep,
          keyword: this.searchKeyword,
        }
      })
        .then(response => {
          for (let j = 0; j < response.data.length; j++) {
            this.filteredDoctors[this.filteredDoctors.length] = {};
            for (let key in response.data[j]) {
              this.filteredDoctors[this.filteredDoctors.length - 1][key] = response.data[j][key];
            }
            this.filteredDoctors[this.filteredDoctors.length - 1]["department"] = dep;
          }
        }
      )
      .catch((error) => {
        console.log(error);
      });
    },
    doctorCardClicked(doctor) { // 当医生被选中时，存储被选中的医生姓名并返回预约界面
      console.log("selected: "+doctor.doctorId);
      this.$router.push({name: 'DoctorAppointment', params: {selectedDoctor: doctor.doctorName, selectedId: doctor.doctorId, selectedDep: doctor.department}});
    },    
  },
  mounted() {
    // console.log("mounted!");
    this.httpGetDepts();
    setTimeout(() => {
      this.httpGetDoctors();
    }, 2000);
  },
  watch: {
    selectedDepartment() {
      console.log("watch!");
      this.search();
    }
  },
  data() {
    return {
      doctorList: [
        // {'name': 'undefined', 'description': 'undefined', 'img_link': ''}
      ],
      title_visible: false,
      searchKeyword: '', // 用于接收搜索框的数据 
      departments: [], // 一级科室列表
      selectedDepartment: '', // 选中的一级科室
      filteredDoctors: [],
    }; 
  },
}
</script>

<template>
  <div id="main-page">
    <h1 class="va-h3"> 选择医生</h1>
    <div>
      <va-card class="department-card">
      
        <div class="flex flex-row">
          <div class="search-container">
            <va-input class="search-input" v-model="searchKeyword" placeholder="输入关键词进行搜索"></va-input>
            <va-button color="primary" @click="search">搜索</va-button>
          </div>

          <va-select
            v-model="selectedDepartment"
            class="mb-6"
            placeholder="请选择对应科室"
            :options="departments"
          />
        </div>

        <div class="doctors-list">
          <va-card v-for="doctor in filteredDoctors" :key="doctor.doctorName" class="doctor-card" @click="doctorCardClicked(doctor)">
            <div class="doctor-details">
              <h3>{{ doctor.doctorName }}</h3>
              <p>科室: {{ doctor.department }}</p>
              <p>职称: {{ doctor.title }}</p>
              <!-- <p>擅长领域: </p> -->
              <!-- <p>{{ doctor.expertise }}</p> -->
            </div>
            <img :src="doctor.photoUrl" alt="Doctor Photo" class="doctor-photo"/>
          </va-card>
        </div>
      </va-card>
    </div>  
  </div>
</template>

<style scoped>
.department-card {
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  /* display: flex; */
}
.search-input {
  width:50%;
}
.search-container {
  width:50%;
}
.mb-6 {
  width:50%;
}

.department-selectors {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.department-selector {
  /* margin-right: 20px; */
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
  width: 27%;
  height: 120px;
  margin-right: 5%;
  margin-bottom: 1%;
  flex-wrap: nowrap;
  display: flex;
  line-height: 30px;
}

.doctor-photo {
  margin-left: auto;
  margin-right: 5px;
  max-width: 100px;
  height: 120px;
}

.doctor-details {
  margin-top: 10px;
  margin-left: 10%;
  margin-bottom: 5px;
}

#main-page {
  margin-left: 20%;
}

header {
  line-height: 1.5;
}

.flex {
  margin-top: 10px;
  display: flex;
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

* {
  --va-font-family: AliRegular;
  font-family: AliRegular; /* 应用字体 */
}
</style>
