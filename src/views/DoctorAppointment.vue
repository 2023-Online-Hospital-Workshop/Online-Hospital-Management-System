
<template>
  <div id="main-page" class="parent-box">
    <h1 class="va-h3">门诊预约挂号</h1>
    <div>
      <va-card color="primary" class="card" id="kp">
        <img class="image-left" src="../assets/yuyue.png" />
        <div class="text">
          <va-card-content>预约科室 : {{ section }}</va-card-content>
          <va-card-content>同济大学校医院 {{ doctor }}医生</va-card-content>
          <va-card-content>医生简介： </va-card-content>
        </div>
      </va-card>
    </div>

    <!--<div class="button-group">
      <va-button-toggle
        size="large"
        v-model="model"
        preset="secondary"
        border-color="primary"
        @click="fetchData(model)"
        :options="options"
      ></va-button-toggle>
    </div>-->

    <div class="flex flex-wrap gap-5">
    <va-card square outlined stripe class="promptcard">
      <div class="title">预约挂号须知</div>
      <va-card-content >
        <span style="font-size: large;margin:5px;">1.该医生挂号费用为&nbsp;元，挂号费及收费标准与医院现场挂号相同，本平台不额外收取任何费用。<br><br></span>
        <span style="font-size: large;margin:5px;">2.就诊当日超时未取号患者号源自动取消（上午号11:00前，下午号17:00前）<br><br></span>
        <span style="font-size: large;margin:5px;">3.为避免爽约造成号源浪费，取消预约至少在预约就诊前一个工作日按照原预约渠道办理，以免影响您下次预约和就诊<br><br></span>
      </va-card-content>
    </va-card>
  
    <div class="flex gap-5 flex-wrap date-picker">
      <va-date-picker stateful 
        v-model="value"
        @click="fetchData(value)"
        class="date"/>
    </div>
  </div>

    <va-button-group preset="primary" class="time">
      <va-button id="time1" class="time-slot" @click="onButtonClick(0)" hover-behavior="opacity"
      :hover-opacity="0.4"  >
        <span style="margin-right: 100px">&nbsp;&nbsp;8:00-&nbsp;&nbsp;9:00</span>{{ number[0] }}/10
      </va-button>
      <va-button id="time2" class="time-slot" @click="onButtonClick(1)">
        <span style="margin-right: 100px"> &nbsp;&nbsp;9:00-10:00</span>{{ number[1] }}/10
      </va-button>
      <va-button id="time3" class="time-slot" @click="onButtonClick(2)">
        <span style="margin-right: 100px">10:00-11:00</span>{{ number[2] }}/10
      </va-button>
      <va-button id="time4" class="time-slot" @click="onButtonClick(3)">
        <span style="margin-right: 100px">13:00-14:00</span>{{ number[3] }}/10
      </va-button>
    </va-button-group>

    <va-button-group preset="primary" class="row">
      <va-button id="time5" class="time-slot" @click="onButtonClick(4)">
        <span style="margin-right: 100px">14:00-15:00</span>{{ number[4] }}/10
      </va-button>
      <va-button id="time6" class="time-slot" @click="onButtonClick(5)">
        <span style="margin-right: 100px">15:00-16:00</span>{{ number[5] }}/10
      </va-button>
      <va-button id="time7" class="time-slot" @click="onButtonClick(6)">
        <span style="margin-right: 100px">16:00-17:00</span>{{ number[6] }}/10
      </va-button>
    </va-button-group>
    
  </div>

</template>

<script >
import axios from "axios";
export default {
  data() {
    return {
      currentDate: "",
      nextDates: [],
      fetchedData: [],
      number: [0, 0, 0, 0, 0, 0, 0],
      options: [],
      model: "two",
      value:new Date(),
    };
  },

  mounted() {
    this.getCurrentDate();
    this.generateNextDates();
    this.options = this.options.concat(
      this.nextDates.map((date) => ({ label: date, value: date }))
    );
  },
  methods: {
    getCurrentDate() {
      const now = new Date();
      const day = now.getDate();
      this.currentDate = String(day);
      this.options.push({ label: this.currentDate, value: this.currentDate });
    },
    generateNextDates() {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 1); // Start from tomorrow
      for (let i = 0; i < 6; i++) {
        const nextDate = new Date(
          startDate.getTime() + i * 24 * 60 * 60 * 1000
        );
        const day = nextDate.getDate();
        this.nextDates.push(String(day));
      }
    },

    onButtonClick(num) {
      this.$vaModal.confirm("你确定要预约当前时间段吗?").then((ok) => {
        if (ok) {
          if (this.number[num] < 10) {
            alert("预约成功");
            this.sendData();
          } else {
            alert("无可预约位置，预约失败");
          }
        }
      });
    },
    isWeekend(date) {
      const dayOfWeek = new Date(date).getDay(); // 0: Sunday, 6: Saturday
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      return isWeekend;
    },

    fetchData(date) {
      var self = this; // 存储当前对象的引用
      self.number = [0, 0, 0, 0, 0, 0, 0];
      const d=date.getDate();
      const m=date.getMonth()+1;
      const formattedDate = `2023-${m}-${d}`;
      console.log(formattedDate);

      // 新增部分
      axios
        .get("http://124.223.143.21/Registration/GetRegist?", {
          params: {
            date: formattedDate,
          },
        })
        .then(function (response) {
          self.fetchedData = response.data;
          console.log(self.fetchedData);
          for (let i = 0; i < self.fetchedData.length; i++) {
            self.number[i] = self.fetchedData[i].Count;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    sendData() {
      const url = "http://124.223.143.21:4999/Registration/regist";
      const data = {
        PatientId: "2151895",
        DoctorId: "23001",
        Time: "2023-08-30T07:22:13.624Z",
        Period: 2,
      };
      // 新增部分
      axios
        .post(url, data)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.error("Error message:", error.message);
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-page {
  margin-left: 14%;
  margin-right: 20%;
}
#kp {
  display: flex;
}
.date-picker{
  display: flex;
}
.date{
  --va-date-picker-line-height:50px;
  --va-date-picker-font-size:15px;
  --va-date-picker-cell-size:35px;
}
.card {
  margin-bottom: 20px;
  padding: 20px;
}
.promptcard{
  width:100px;

}
.flex{
  display: flex;
}

.image-left {
  flex: 0 0 auto;
  width: 140px;
  height: 100px;
}
.text {
  flex: 1 1 auto;
  font-weight: bold;
  font-size: larger;
}
.title{
  font-weight: bold;
  font-size: larger;
  margin-top:20px;
  margin-left:20px;

}
.time {
  display: flex;
  flex-wrap: wrap;
}
.row {
  display: flex;
  flex-wrap: wrap;
  
}
.time-slot {
  width: calc(50% - 10px);
  height: 65px;
  /*flex-basis: 25%;*/
  --va-button-group-button-margin:10px;
}
</style>

