<template>
  <div class="row justify-center" cols="12" sm="6" md="4" lg="3" v-for="(person, index) in people" :key="index" >
    <va-card class="person-card" elevation="10" color="#ECF0F1">
       <!-- 第一行 -->
      <!-- (标题) -->
      <va-card-title class="first-row">
        <div class="row justify-start"><span class="title-status text-error">{{ person.status }}</span></div>
        <span class="title-date">{{ person.date }}</span>
        &nbsp;
        <span class="title-dept">{{ person.department }}</span>
      </va-card-title>
      <!-- 第二行 -->
      <va-card-content class="info-row">
        <span class="info-label">预约号码:</span>
        <span class="info-value">{{ person.appointmentNumber }}</span>
      </va-card-content>
      <!-- 第三行 -->
      <va-card-content class="info-row">
        <span>就诊医生: {{ person.doctor }}</span>
      </va-card-content>
      <!-- 第四行 -->
      <va-card-content class="info-row">
        <span>预约时间段: {{ person.appointmentTime }}</span>
      </va-card-content>
      <!-- 第五行 -->
      <va-card-content class="info-row">
        <span>前方等待人数: {{ person.waitingCount }}</span>
      </va-card-content>
      <!-- 按钮 -->
      <va-card-content class="button-row">
        <va-button color="error" class="button" @click="cancelAppointment(person)">
          取消挂号
        </va-button>
        <va-button color="primary" class="button" @click="viewPrescription(person)">
          查看处方
        </va-button>
        <va-button color="primary" class="button" @click="makePayment(person)">
          缴费
        </va-button>
        <va-button color="primary" class="button" @click="giveFeedback(person)">
          反馈评价
        </va-button>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: [
        {
          date: '2023-5-6',
          department: '内科',
          status: '待就诊',
          appointmentNumber: '123456',
          doctor: '张医生',
          appointmentTime: '上午',
          waitingCount: 5
        },
        // 其他人的信息
      ]
    };
  },
  methods: {
    cancelAppointment(person) {
      console.log(person.status)
      // 取消挂号逻辑
    },
    viewPrescription(person) {
      console.log(person.status)

      // 查看处方逻辑
    },
    makePayment(person) {
      console.log(person.status)

      // 缴费逻辑
    },
    giveFeedback(person) {
      console.log(person.status)

      // 反馈评价逻辑
    }
  }
};
</script>

<style scoped>
.person-card {
  margin-bottom: 20px;
  border-radius: 10px;
  width: 60%;
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

.person-card .first-row .title-status{
  font-size: 20px; /* 你想要设置的字号大小 */
}


</style>