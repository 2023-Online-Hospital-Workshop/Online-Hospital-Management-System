// zzh: 药品查询
<script>
import axios from 'axios'
// import doctorList from '../components/DoctorList.vue'
// import SearchBox from '../components/SearchBox.vue'

export default {
  components: {
    // doctorList,
    // SearchBox
  },
  methods: {
    search() {
      this.filteredDoctors = []
      axios
        .get('http://124.223.143.21:4999/Instructor')
        .then((response) => {
          // console.log(response);
          this.title_visible = true
          this.doctorList = response.data
        })
        .catch((error) => {
          console.log(error)
        })
      // this.filterDoctors();
      this.httpGetDoctors(this.selectedDepartment)
    },
    httpGetDepts() {
      this.departments = []
      axios
        .get('http://124.223.143.21:4999/api/Department2')
        .then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            const item = response.data[i]
            this.departments.push(item.departmentName)
          }
          this.doctorList = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    httpGetDoctors(dep = null) {
      if (dep == null) {
        // 情况一：页面初始化
        // console.log("key:"+this.searchKeyword)
        for (let d of this.departments) {
          console.log('di:' + d)
          axios({
            method: 'GET',
            url: 'http://124.223.143.21/api/Consultationinfo',
            params: {
              department: d,
              keyword: this.searchKeyword,
            },
          })
            .then((response) => {
              for (let j = 0; j < response.data.length; j++) {
                this.filteredDoctors[this.filteredDoctors.length] = {}
                for (let key in response.data[j]) {
                  this.filteredDoctors[this.filteredDoctors.length - 1][key] =
                    response.data[j][key]
                }
                this.filteredDoctors[this.filteredDoctors.length - 1][
                  'department'
                ] = d
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }

        return
      }
      // 情况二：筛选
      axios({
        method: 'get',
        url: 'http://124.223.143.21/api/Consultationinfo',
        params: {
          department: dep,
          keyword: this.searchKeyword,
        },
      })
        .then((response) => {
          console.log('return doctors: ' + response.data)
          for (let i = 0; i < response.data.length; i++) {
            this.filteredDoctors.push(response.data[i])
            this.filteredDoctors[this.filteredDoctors.length - 1][
              'department'
            ] = this.selectedDepartment
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    doctorCardClicked(doctor) {
      // 当医生被选中时，存储被选中的医生姓名并返回预约界面

      console.log('selected: ' + doctor.doctorId)
      this.$router.push({
        name: 'DoctorAppointment',
        params: {
          selectedDoctor: doctor.doctorName,
          selectedId: doctor.doctorId,
          selectedDep: doctor.department,
          doctorTitle: doctor.title,
        },
      })
    },
  },
  mounted() {
    // console.log("mounted!");
    this.httpGetDepts()
    setTimeout(() => {
      this.httpGetDoctors()
    }, 2000)
  },
  watch: {
    selectedDepartment() {
      console.log('watch!')
      this.search()
    },
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
      value: 0,
      items: [
         'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/1250655/pexels-photo-1250655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg?auto=compress&cs=tinysrgb&w=1600',
        'https://images.pexels.com/photos/7230227/pexels-photo-7230227.jpeg?auto=compress&cs=tinysrgb&w=1600',
      ],
    }
  },
}
</script>

<template>
  <div id="main-page">
    <h1 class="va-h3">选择医生</h1>
    <div>
      <va-carousel
        v-model="value"
        :items="items"
        indicators
        indicator-trigger="hover"
        style="margin-bottom: 10px"
      />
      <va-card class="department-card">
        <div class="flex flex-row">
          <!-- <SearchBox 
          :input_width="inputWidth" :input_data="inputData" 
          @SearchBoxValueToParent="handleSearchValue">
        </SearchBox> -->
          <!-- <va-card class="search-card"> -->

          <div class="search-container">
            <va-input
              class="search-input"
              v-model="searchKeyword"
              placeholder="输入医生姓名进行搜索"
            ></va-input>
            <va-button color="primary" @click="search">搜索</va-button>
          </div>

          <!-- </va-card> -->

          <!-- <va-select v-model="selectedDepartment" class="mb-6" placeholder="请选择对应科室" :options="departments" /> -->
          <!-- <div class="department-selector">
          <label for="firstDepartment">科室：</label>
          <select id="firstDepartment" v-model="selectedDepartment" @click="httpGetDepts" @change="updateSubDepartments">
            <option value="">请选择科室</option>
            <option v-for="dept in this.departments" :key="dept" :value="dept">{{ dept }}</option>
          </select>
        </div> -->
        </div>
        <div style="margin-top: 20px">
          <div style="font-weight: bold">按科室查询：</div>
          <va-tabs v-model="selectedDepartment" grow>
            <template #tabs>
              <va-tab :name="null" @click="httpGetDoctors"> 所有科室 </va-tab>
              <va-tab
                v-for="department in departments"
                :key="department"
                :name="department"
              >
                {{ department }}
              </va-tab>
            </template>
          </va-tabs>
        </div>

        <!-- <div class="department-selectors">
        <div class="department-selector">
          <label for="firstDepartment">科室：</label>
          <select id="firstDepartment" v-model="selectedDepartment" @click="httpGetDepts" @change="updateSubDepartments">
            <option value="">请选择科室</option>
            <option v-for="dept in this.departments" :key="dept" :value="dept">{{ dept }}</option>
          </select>
        </div> -->

        <!-- <div class="department-selector">
          <label for="secondDepartment">二级科室：</label>
          <select id="secondDepartment" v-model="selectedSubDepartment">
            <option value="">请选择二级科室</option>
            <option v-for="subDept in subDepartments" :key="subDept" :value="subDept">{{ subDept }}</option>
          </select>
        </div> -->
        <!-- </div> -->
      </va-card>
      <div class="doctors-list">
        <div
          v-for="doctor in filteredDoctors"
          :key="doctor.doctorName"
          class="doctor-card"
          @click="doctorCardClicked(doctor)"
        >
          <div class="doctors-top">
            <img src="@/assets/start.png" alt="" />
            5.0
          </div>
          <div class="doctors-content">
            <div class="doctors-left">
              <div class="img-box">
                <img :src="doctor.photoUrl" alt="Doctor Photo" />
                <va-button class="btn">预约</va-button>
              </div>
            </div>
            <div class="doctors-right">
              <div class="doctors-name">
                <span class="big">{{ doctor.doctorName }}</span> /
                <span>{{ doctor.title }}</span>
              </div>
              <div class="title1">科室</div>
              <div class="ks">{{ doctor.department }}</div>
              <div class="title1">医学擅长</div>
              <div class="info">{{ doctor.skiledIn }}</div>
            </div>
          </div>

          <!-- <div class="center"><img :src="doctor.photoUrl" alt="Doctor Photo" class="doctor-photo" /></div>
          <div class="doctor-details">
            <div class="center" style="font-size: xx-large;font-weight: bold;margin-bottom: 10px;">{{ doctor.doctorName }} </div>
            <div class="center"><va-chip outline square size="small">{{ doctor.title }}</va-chip></div>
           

            <div class="center">科室: &nbsp; {{ doctor.department }} &nbsp;综合评分： 5.0</div>
            <div class="center" style="font-weight: light;margin-top: 10px;">{{ doctor.skiledIn }}</div>
            
        </div>  -->
        </div>

        <!-- <va-card v-for="doctor in filteredDoctors" :key="doctor.name" class="doctor-card" @click="doctorCardClicked(doctor.name)">
          <div class="doctor-details">
            <h3>{{ doctor.name }}</h3>
            <p>科室: {{ doctor.subDepartment }}</p>
            <p>擅长领域: {{ doctor.expertise }}</p>
          </div>
          <div class="doctor-photo">
            <img src="doctor.photoUrl" alt="Doctor Photo"/>
          </div>
        </va-card> -->
      </div>
    </div>

    <!-- <va-option-list
      v-model="listValue"
      type="radio"
      :options="['Option 1', 'Option 2', 'Option 3']"
    /> -->
    <!-- <doctorList :title_visible="title_visible" :doctorList="doctorList" /> -->
  </div>
</template>

<style scoped lang="scss">
.department-card {
  width: 100%;
  margin-bottom: 20px;
  padding: 20px;
  /* display: flex; */
}

.search-input {
  width: 92%;
}

.search-container {
  width: 100%;
}

.mb-6 {
  width: 50%;
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
  gap: 20px;
}

/*
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
  margin-left: 5px;
  margin-right: auto;
  max-width: 100px;
  height: 120px;
}

.doctor-details {
  margin-top: 10px;
  margin-right: 10%;
  margin-bottom: 5px;
}
*/
.doctor-card {
  min-width: 31%;
    flex: 1;
  height: 350px;
  
  border-radius: 10px;
  background: url('~@/assets/bg7.png');
  background-size: 100% 100%;
  padding: 20px;
  .doctors-content {
    display: flex;
    gap: 20px;
    align-items: flex-start;
  }

  .doctors-top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 17px;
    font-weight: bold;
    color: #1839ab;
    margin-bottom: 20px;
    img {
      width: 22px;
      margin-right: 10px;
      position: relative;
      top: -2px;
    }
  }
  .doctors-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 84px;
    flex-shrink: 0;
    .img-box {
      width: 80px;
      height: 110px;
      border: 1px solid #11349d;
      img {
        width: 100%;
        height: 100%;
        position: relative;
        top: -6px;
        left: 6px;
      }
    }
    .btn {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      width: 72px;
      height: 30px;
      background: #1839ab;
      border-radius: 13px;
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .doctors-right {
    flex: 1;
    .title1 {
      padding-left: 10px;
      font-weight: 500;
      color: #0a33a9;
      font-size: 17px;
      position: relative;
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        width: 5px;
        height: 15px;
        background: #0a33a9;
        border-radius: 3px;
        content: '';
      }
    }
    .ks {
      font-size: 18px;
      font-weight: bold;
      margin: 10px 20px 16px;
    }
    .info {
      margin: 10px 10px 10px 20px;
      font-size: 17px;
      line-height: 1.4;
      display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 6;
      font-weight: 500;
      color: #090909;
      
    }
    .doctors-name {
      font-size: 18px;
      font-weight: 500;
      color: #282828;
      margin-bottom: 20px;
      .big {
        position: relative;
        top: -10px;
        font-size: 24px;
        font-weight: bold;
        color: #0f44c0;
      }
    }
  }
}

.doctor-photo {
  margin-top: 10px;
  margin-bottom: 10px;

  max-width: 150px;
  height: 120px;
  border: 2px solid #ccc; /* 添加边框样式 */
  padding: 5px; /* 可选，为边框添加内边距 */
}

.text {
  font-size: large;
  font-weight: bold;
  margin: 5px;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
  margin-bottom: 10px;
  margin-left: 10%;
  margin-right: 10%;
  /* max-width: 120px; */
}

#main-page {
  margin-left: 16%;
  margin-right: 12%;
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
  font-family: AliRegular;
  --va-font-family: AliRegular;
  /* 应用字体 */
}
</style>
