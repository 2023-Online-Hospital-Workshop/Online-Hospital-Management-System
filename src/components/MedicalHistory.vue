<template>
  <div style="margin-left:200px;margin-top:50px">
    <div class="row justify-center" cols="12" sm="6" md="4" lg="3" v-for="(person, index) in displayedPeople "
      :key="index">
      <va-card class="person-card" elevation="10" color="#ECF0F1">
        <!-- 第一行 -->
        <!-- (标题) -->
        <va-card-title class="first-row">
          <div class="row justify-start"><span class="title-status"
              :style="{ color: person.status === '待就诊' ? '#3498db' : '#e74c3c' }">{{ person.status }}</span></div>
          <span class="title-date">{{ person.date }}</span>
          &nbsp;
          <span class="title-dept">{{ person.department }}</span>
        </va-card-title>

        <!-- 第二行 -->
        <va-card-content class="info-row">
          <div class="row justify-start">
            <span class="flex flex-col xs3">预约号码:</span>
            <span class="flex flex-col xs3">{{
              person.appointmentNumber
            }}</span>
          </div>
        </va-card-content>
        <!-- 第三行 -->
        <va-card-content class="info-row">
          <div class="row justify-start">
            <span class="flex flex-col xs3">就诊医生:</span>
            <span class="flex flex-col xs3">{{ person.doctor }}</span>
          </div>
        </va-card-content>
        <!-- 第四行 -->
        <va-card-content class="info-row">
          <div class="row justify-start">
            <span class="flex flex-col xs3">预约时间段:</span>
            <span class="flex flex-col xs3">{{ person.appointmentTime }}</span>
          </div>
        </va-card-content>
        <!-- 第五行 -->
        <va-card-content class="info-row">
          <div class="row justify-start">
            <span class="flex flex-col xs3">前方等待人数:</span>
            <span class="flex flex-col xs3">{{ person.waitingCount }}</span>
          </div>
        </va-card-content>
        <!-- 按钮 -->
        <va-card-content class="button-row">
          <va-button
            :disabled="person.status === '已就诊'"
            color="primary"
            class="button"
            @click="cancelAppointment(person)"
          >
            取消挂号
          </va-button>
          <va-button
            :disabled="person.status === '待就诊'"
            color="primary"
            class="button"
            @click="makePayment(person)"
          >
            缴费
          </va-button>
          <va-button
            :disabled="person.status === '待就诊'"
            color="primary"
            class="button"
            @click="viewPrescription(person)"
          >
            查看处方
          </va-button>
          <va-button
            :disabled="person.status === '待就诊'"
            color="primary"
            class="button"
            @click="giveFeedback(person)"
          >
            反馈评价
          </va-button>
        </va-card-content>
      </va-card>
    </div>
    <div class="pagination">
      <va-pagination v-model="currentPage" :total="totalPages" @change="changePage" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      people: [],
      itemsPerPage: 4,
      currentPage: 1,
    };
  },
  computed: {
    displayedPeople() {
      // 通过调整起始索引和结束索引，我们可以选择要在当前页面显示的特定人员。
      // 这样，当用户切换页面时，我们可以动态地更新要显示的人员列表
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.people.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.people.length / this.itemsPerPage);
    },
  },
  mounted() {
    axios.get('http://124.223.143.21:4999/api/Patient/AllPatients')
      .then((response) => {
        console.log(response.data);
        const newData = response.data; // 获取响应数据
        // 将新数据转化为 person 对象并添加到 people 数组中
        this.people = newData.map(item => ({
          id: item.patientId,
          name: item.name,
          gender: item.gender,
          date: item.birthDate,
        }));
        console.log("people");

        console.log(this.people);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    cancelAppointment(person) {
      console.log(person.status)
      const inputModel = {
        "PatientId": person.id,
        "DoctorId": "23001",
        "Time": "2023-04-20T07:22:13.624Z",
        "Period": 1
      };

      fetch('http://124.223.143.21/Registration/cancel', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputModel)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
          }
          return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.error(error));
    },
    viewPrescription(person) {
      console.log(person.status)
      console.log(person.status);
      // 执行查看处方逻辑
      // 跳转到查看处方
      this.$router.push({ name: 'DoctorQuery' }); // 跳转到DoctorQuery页面
    },
    makePayment(person) {
      console.log(person.status)
      // 缴费逻辑
    },
    giveFeedback(person) {
      console.log(person.status);
      // 反馈评价逻辑
    },
    changePage(page) {
      // 切换页面
      this.currentPage = page;
    },
  },
};
</script>

<style scoped>
* {
  font-family: SFRegular; /* 应用字体 */
}

.person-card {
  margin-bottom: 20px;
  border-radius: 10px;
  width: 80%;
}

.info-row {
  margin-bottom: 5px;
}

.info-label {
  width: 100px;
  display: inline-block;
}

.info-value {
  display: inline-block;
}

.button-row {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.button {
  width: 20%;
}

.person-card .first-row .title-status {
  font-size: 20px;
}

.person-card .first-row .title-date {
  font-size: 14px;
}

.person-card .first-row .title-dept {
  font-size: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
}

</style>