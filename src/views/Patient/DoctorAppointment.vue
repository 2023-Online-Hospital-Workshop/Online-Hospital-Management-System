<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parent-box {
  width: 70%;
  height: 200px;

}

.image-left {
  width: 140px;
  height: 100px;

}

.text {
  font-weight: lighter;
  font-size: larger;
  margin: 5px;
  line-height: 20px;
}

.button-group {
  width: 100%;
  /* 设置按钮组的宽度为100% */
  display: flex;
  height: 50px;
  /* 设置按钮组的高度为50像素（可根据需要进行调整） */
  justify-content: center;
  align-items: center;
  margin: 20px;
}

.button {
  width: 100%
}

.hide {
  color: transparent
}

.time {
  width: 100%;
  display: flex;
  margin: 20px;
  flex-wrap: wrap;
}

.time-slot {
  width: 45%;
  height: 65px;
  /*flex-basis: 50%;*/
  margin: 20px;
  background-color: #f0f4f8;
  border-color: #89bcef;
  box-shadow: 0 0px 0px;
  font-size: large;
  font-weight: bold;
  color: #1a5a99
}
</style>


<template>
  <template>
    <va-modal v-model="showModal" ok-text="确认" cancel-text="取消">
      <p></p>
      <p>
        {{ alertText }}
      </p>
      <p><img :src="imgUrl" alt="图片"></p>
    </va-modal>
  </template>
  <div id="main-page" class="parent-box">
    <h1 class="va-h3">门诊预约挂号</h1>
    <div>
      <va-card color="primary" class="card" id="kp">
        <img class="image-left" src="../../assets/yuyue.png" />
        <div class="text">
          <va-card-content>预约科室： {{ this.$route.params.selectedDep }}</va-card-content>
          <va-card-content>同济大学校医院 {{ this.$route.params.selectedDoctor }}医生</va-card-content>
          <!-- <va-card-content>医生姓名： {{ this.$route.params.selectedDoctor }}</va-card-content> -->
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
        <va-card-content>
          <span
            style="font-size: large;margin:5px;line-height: 20px;">1.该医生挂号费用为{{ fee[this.$route.params.doctorTitle] }}元，挂号费及收费标准与医院现场挂号相同，本平台不额外收取任何费用。<br><br></span>
          <span
            style="font-size: large;margin:5px;line-height: 20px;">2.就诊当日超时未取号患者号源自动取消（上午号11:00前，下午号17:00前）<br><br></span>
          <span
            style="font-size: large;margin:5px;line-height: 20px;">3.为避免爽约造成号源浪费，取消预约至少在预约就诊前一个工作日按照原预约渠道办理，以免影响您下次预约和就诊<br><br></span>
            <span
            style="font-size: large;margin:5px;line-height: 20px;">4.成功预约后请在当日预约时间前往同济大学校医院，于对应科室管理员处进行报道<br><br></span>
        </va-card-content>
      </va-card>

      <div class="flex gap-5 flex-wrap date-picker">
        <va-date-picker stateful v-model="value" @click="fetchData(value)" class="date"
        :allowed-days="(date) => (workday.indexOf(String(date.getDate())) !== -1 
                                  && date.getDate() >= currentDate 
                                  && date.getMonth() == currentMonth) 
                                || date.getMonth() > currentMonth" />
      </div>
    </div>
    <div class="button-groups">
      <va-button-group preset="primary" class="time">
        <div style="display: inline-block;margin-top: 30px;font-weight: bold;">上午：</div>
        <va-button id="time1" class="time-slot" @click="onButtonClick(0)" hover-behavior="opacity" :hover-opacity="0.4">
          <span style="margin-right: 100px">&nbsp;&nbsp;8:00-&nbsp;&nbsp;9:00</span>{{ number[0] }}/10
        </va-button>
        <va-button id="time2" class="time-slot" @click="onButtonClick(1)">
          <span style="margin-right: 100px"> &nbsp;&nbsp;9:00-10:00</span>{{ number[1] }}/10
        </va-button>
        <va-button id="time3" class="time-slot" @click="onButtonClick(2)">
          <span style="margin-right: 100px">10:00-11:00</span>{{ number[2] }}/10
        </va-button>

      </va-button-group>

      <va-button-group preset="primary" class="time">
        <div style="display: inline-block;margin-top: 30px;font-weight: bold;">下午：</div>
        <va-button id="time4" class="time-slot" @click="onButtonClick(3)">
          <span style="margin-right: 100px">13:00-14:00</span>{{ number[3] }}/10
        </va-button>
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
  </div>
  
</template>

<script >
import axios from "axios";
import UserState from "../../store/user.js"
export default {
  data() {
    return {
      currentDate: "",
      currentMonth: "",
      formattedDate: "",
      nextDates: [],
      fetchedData: [],
      number: [0, 0, 0, 0, 0, 0, 0],
      options: [],
      model: "two",
      value: new Date(),
      showModal: false,
      alertText: "",
      imgUrl:"",
      fee: {
        "主任医师": "25",
        "主任技师": "25",
        "副主任医师": "15",
        "副主任技师": "15",
      },
      DoctorInfo:"",
      DoctorFee:"",
      worktime:{},
      workday:[],
    };
  },

  async mounted() {
    this.getCurrentDate();
    this.generateNextDates();
    this.fetchData(new Date());
    await this.GetDoctorInfo();
    console.log("workday:");
    console.log(this.workday);
    this.options = this.options.concat(
      this.nextDates.map((date) => ({ label: date, value: date }))
    );
    // console.log("curDate:"+this.currentDate.toString());
  },
  methods: {
    getCurrentDate() {
      const now = new Date();
      const day = now.getDate();
      const month = now.getMonth();
      this.currentDate = String(day);
      this.currentMonth = String(month);
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
            // alert("预约成功");
            this.sendData(num);
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
      const d = date.getDate();
      const m = date.getMonth() + 1;
      this.formattedDate = `2023-${m}-${d}`;
      // console.log(formattedDate);

      const formattedMonth = m.toString().padStart(2, '0');
      const formattedDay = d.toString().padStart(2, '0');
      this.formattedDate = `2023-${formattedMonth}-${formattedDay}`;

      // 新增部分
      axios
        .get("http://124.223.143.21/Registration/GetRegist?", {
          params: {
            date: this.formattedDate,
            doctorId: this.$route.params.selectedId,
          },
        })
        .then(function (response) {
          self.fetchedData = response.data;
          console.log(self.fetchedData);
          for (let i = 0; i < self.fetchedData.length; i++) {    
            self.number[self.fetchedData[i].Period-1] = self.fetchedData[i].Count;
          }
        })
        .catch(function (error) {
          console.error(error);
        });
    },


    sendData(per) {

      console.log("id: " + this.$route.params.selectedId);
      if (this.formattedDate == undefined) {
        alert("请选择就诊日期！");
        return;
      }
      const url = "http://124.223.143.21/Registration/regist";
      const data = {
        patientId: UserState.state.userID,
        doctorId: this.$route.params.selectedId,
        // doctorId: "23008",
        // Time: "2023-08-30T07:22:13.624Z",
        time: this.formattedDate,
        // period: 2,
        period: per + 1,
      };
      console.log(data);
      axios
        .post(url, data)
        .then((response) => {
          const dataString = UserState.state.userID +this.$route.params.selectedId +this.formattedDate +(per + 1);
          console.log(dataString);
          // 在axios请求成功的回调函数内部调用Generate函数
      this.Generate(dataString, () => {
        console.log(this.imgUrl); // 在这里访问imgUrl
        this.alertText = "预约 " + this.$route.params.selectedDoctor + " 医生成功！\n" + "时间：" + this.formattedDate + " " + response.data +"\n预约二维码地址："+ this.imgUrl;
        this.showModal = true;
      });
        })
        .catch(function (error) {
          alert("预约失败！该时间段没有剩余名额，请重新选择时间段！");
          console.error("Error message:", error.message);
          if (error.message == "Network Error")
            return;
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
          }
          // if (error.response.status == 400) {
          //   alert("预约失败！该时间段没有剩余名额，请重新选择时间段！");
          // }
        });
    },
    closeModal() {
      this.showModal = false;
    },
    Generate(dataString,callback) {
       var self = this;
       var formData=new FormData();
       formData.append("showapi_appid", '1475668'); 
       formData.append("showapi_sign", '2c780d7234d547a49d4df8a0e9331f2d'); //这两个不用改
       
       formData.append("content", dataString);//这里放二维码内容
       formData.append("size", "8");//这里可以修改图片大小
       formData.append("imgExtName","jpg");//这里修改图片格式
       // 发送POST请求
       axios
         .post("http://route.showapi.com/887-1", formData)
         .then(function (response) {
           self.imgUrl =response.data.showapi_res_body.imgUrl;
           if (callback) {
             callback(); // 调用回调函数
            }
         })
         .catch(function (error) {
           console.error(error);
           alert("操作失败!");
         });
     },
    /*sendData() {
      const scannedData = this.scannedDataInput;
      
      // 检查是否有扫描到数据
      if (scannedData) {
        // 假设每个字段的长度是固定的
        const patientId = scannedData.substring(0, 7);
        const doctorId = scannedData.substring(7, 12);
        const time = scannedData.substring(12, 22);
        const period = scannedData.substring(22);

        // 构建请求数据对象
        const data = {
          patientId,
          doctorId,
          time,
          period,
        };

        // 发送请求
        axios
          .post("http://124.223.143.21/Registration/regist", data)
          .then((response) => {
            this.alertText = "预约 " + this.$route.params.selectedDoctor + " 医生成功！\n" + "时间：" + time + " " + response.data;
            this.uploadSuccess = true;
          })
          .catch(function (error) {
            alert("预约失败！该时间段没有剩余名额，请重新选择时间段！");
            console.error("Error message:", error.message);
            if (error.message == "Network Error") return;
            if (error.response) {
              console.error("Response data:", error.response.data);
              console.error("Response status:", error.response.status);
            }
          });

        // 清空输入框
        this.scannedDataInput = '';
      } else {
        alert('请先扫描数据！');
      }
    },*/
    async GetDoctorInfo() {
      var self = this; // 存储当前对象的引用
      // 新增部分
      axios
        .get("http://124.223.143.21/api/Doctors/fee?", {
          params: {
            doctorId: this.$route.params.selectedId,
          },
        })
        .then(function (response) {
          self.DoctorInfo = response.data.consultationInfos;
          self.DoctorFee =response.data.fee;
          // console.log(self.DoctorInfo);

          // 创建一个Set来跟踪已经记录的日期
          const recordedDates = new Set();
          // 遍历排班信息数组，将日期和period值添加到字典中
          self.DoctorInfo.forEach((info) => {
            const dateTime = info.dateTime.substring(8, 10);
            const period = info.period;

            if (!recordedDates.has(dateTime)) {
              recordedDates.add(dateTime);
              self.worktime[dateTime] = [];
              self.workday.push(dateTime);
            }

            // 将period值添加到对应日期的数组中
            self.worktime[dateTime].push(period);
          });

          // 现在，workday对象包含了所有日期对应的period值
          // console.log(self.worktime);
          // console.log("workday:"+self.workday);
          for (let day in self.workday) {
            if (self.workday[day][0] == '0') {
              self.workday[day] = self.workday[day].slice(1, 2);
              // console.log(self.workday[day]);
            }
          }

        })
        .catch(function (error) {
          console.error(error);
        });
      },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main-page {
  margin-right: 20%;
}

#kp {
  display: flex;
}

.date-picker {
  display: flex;
}

.date {
  --va-date-picker-line-height: 50px;
  --va-date-picker-font-size: 15px;
  --va-date-picker-cell-size: 35px;
}

.card {
  margin-bottom: 20px;
  padding: 20px;
}

.promptcard {
  width: 100px;

}

.flex {
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

.title {
  font-weight: bold;
  font-size: larger;
  margin-top: 20px;
  margin-left: 20px;

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
  --va-button-group-button-margin: 10px;
}

.button-groups {
  display: flex;
  /* 使用 Flex 布局 */
  flex-wrap: wrap;
  justify-content: flex-start;
  /* 对齐方式为左对齐 */
  gap: 10px;
  /* 间距为 10px */
}

* {
  font-family: AliRegular;
  /* 应用字体 */
  --va-font-family: AliRegular;
}</style>

