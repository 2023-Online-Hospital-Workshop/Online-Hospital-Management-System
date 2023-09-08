<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bgImage {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -1;
}
.parent-box {
  width: 70%;
  margin: 80px auto 0;
  height: 200px;

  .card-box {
    background: url('~@/assets/bg.png') left center no-repeat;
    background-size: 100% 100%;
    height: 302px;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    .card-content {
      margin-left: 315px;
      font-size: 30px;
      font-weight: bold;
      color: #ffffff;
      padding: 56px 56px 0;
      div {
        margin-bottom: 25px;
      }
    }
  }
  .nmain {
    display: flex;
    justify-content: space-between;

    .main-item {
      width: 56%;
      display: flex;
      align-items: center;
      padding: 0 30px;
      flex-direction: column;
      height: 423px;
      background: #ffffff;
      box-shadow: -1px 4px 10px 0px rgba(142, 151, 176, 0.61);
      border-radius: 20px;
      &:nth-of-type(2) {
        width: 40%;
        background: url('~@/assets/bg3.png') right bottom no-repeat;
        background-color: #fff;
      }
      .ndate {
        padding: 20px;
        width: 100%;
        &::v-deep .va-date-picker__picker-wrapper {
          .va-day-picker__calendar__day-wrapper {
            margin-bottom: 18px;
          }
          .va-date-picker-cell {
            width: 32px;
            height: 32px;
            border-radius: 16px;
          }
          .va-day-picker__weekday {
            margin-bottom: 5px;
          }
          .va-date-picker-cell:after,
          .va-date-picker-cell:before {
            border-radius: 16px;
          }
        }
        &::v-deep .va-date-picker-header {
          margin-bottom: 10px;
        }
      }
      .main-item-title {
        width: 526px;
        height: 51px;
        background: #2e53ba;
        border-radius: 0 0 60px 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 32px;
        color: #f0f0f0;
        font-weight: bold;
        font-size: 25px;
      }
      .main-content {
        div {
          margin-bottom: 10px;
        }
        font-weight: 500;
        color: #000000;
        line-height: 35px;
        font-size: 20px;
      }
    }
  }
  .nbtns {
    margin-top: 40px;
    .btn-line {
      display: flex;
      padding-left: 140px;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
      .type {
        width: 78px;
        height: 68px;
        background: #ffffff;
        border: 4px solid #163cb0;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: bold;
        color: #163cb0;
      }
      .line {
        display: flex;
        gap: 20px;
        .btn {
          width: 240px;
          height: 70px;
          background: url('~@/assets/bg2.png') left top no-repeat;
          background-size: 100% 100%;
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 22px;
          color: #ffffff;
          font-size: 17px;
          justify-content: space-between;
        }
      }
    }
  }
}

.image-left {
  width: 140px;
  min-height: 140px;
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
  width: 100%;
}

.hide {
  color: transparent;
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
  color: #1a5a99;
}
#main-page {
  margin-right: 20%;
  margin-left: 17%;
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
}
</style>


<template>
  <div class="parent-box">
    <img src="@/assets/bg4.png" class="bgImage" alt="" />
    <div class="card-box">
      <div class="card-content">
        <div>预约科室： {{ this.$route.params.selectedDep }}</div>
        <div>
          同济大学校医院 &nbsp;{{ this.$route.params.selectedDoctor }}&nbsp;医生
        </div>
      </div>
    </div>
    <div class="nmain">
      <div class="main-item">
        <div class="main-item-title">预约挂号须知</div>
        <div class="main-content">
          <div>
            1.该医生挂号费用为<span style="font-weight: bold"
              >{{ fee[this.$route.params.doctorTitle] }}元</span
            >，挂号费及收费标准与医院现场挂号相同，本平台不额外收取任何费用。
          </div>
          <div>2.就诊当日超时未取号患者号源自动取消</div>
          <div>
            3.为避免爽约造成号源浪费，取消预约至少在预约就诊前一个工作日按照原预约渠道办理
          </div>
          <div>
            4.成功预约后请在当日预约时间前往同济大学校医院，于对应科室管理员处出示预约二维码进行报到
          </div>
        </div>
      </div>
      <div class="main-item">
        <va-date-picker
          stateful
          v-model="value"
          @click="fetchData(value)"
          class="ndate data"
          :allowed-days="
            (date) =>
              (workday.indexOf(String(date.getDate())) !== -1 &&
                date.getDate() >= currentDate &&
                date.getMonth() == currentMonth) ||
              date.getMonth() > currentMonth
          "
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-5">
      <!-- <va-card square outlined stripe class="promptcard">
        <div class="title">预约挂号须知</div>
        <va-card-content>
          <span style="font-size: large; margin: 5px; line-height: 20px"
            >1.该医生挂号费用为<span style="font-weight: bold"
              >{{ fee[this.$route.params.doctorTitle] }}元</span
            >，挂号费及收费标准与医院现场挂号相同，本平台不额外收取任何费用。<br /><br
          /></span>
          <span style="font-size: large; margin: 5px; line-height: 20px"
            >2.就诊当日超时未取号患者号源自动取消<br /><br
          /></span>
          <span style="font-size: large; margin: 5px; line-height: 20px"
            >3.为避免爽约造成号源浪费，取消预约至少在预约就诊前一个工作日按照原预约渠道办理<br /><br
          /></span>
          <span style="font-size: large; margin: 5px; line-height: 20px"
            >4.成功预约后请在当日预约时间前往同济大学校医院，于对应科室管理员处出示预约二维码进行报到<br /><br
          /></span>
        </va-card-content>
      </va-card> -->

      <!-- <div class="flex gap-5 flex-wrap date-picker">
        <va-date-picker
          stateful
          v-model="value"
          @click="fetchData(value)"
          class="date"
          :allowed-days="
            (date) =>
              (workday.indexOf(String(date.getDate())) !== -1 &&
                date.getDate() >= currentDate &&
                date.getMonth() == currentMonth) ||
              date.getMonth() > currentMonth
          "
        />
      </div> -->
    </div>
    <div class="button-groups nbtns" v-if="isWorkday()">
      <div class="btn-line">
        <div class="type">上午</div>
        <div class="line">
          <div class="btn" @click="onButtonClick(0)">
            <div class="btn-time">8:00-9:00</div>
            <div class="num">{{ number[0] }}/10</div>
          </div>
          <div class="btn" @click="onButtonClick(1)">
            <div class="btn-time">9:00-10:00</div>
            <div class="num">{{ number[1] }}/10</div>
          </div>
          <div class="btn" @click="onButtonClick(2)">
            <div class="btn-time">10:00-11:00</div>
            <div class="num">{{ number[2] }}/10</div>
          </div>
        </div>
      </div>
      <div class="btn-line">
        <div class="type">下午</div>
        <div class="line">
          <div class="btn" @click="onButtonClick(3)">
            <div class="btn-time">13:00-14:00</div>
            <div class="num">{{ number[3] }}/10</div>
          </div>
          <div class="btn" @click="onButtonClick(4)">
            <div class="btn-time">14:00-15:00</div>
            <div class="num">{{ number[4] }}/10</div>
          </div>
          <div class="btn" @click="onButtonClick(5)">
            <div class="btn-time">15:00-16:00</div>
            <div class="num">{{ number[5] }}/10</div>
          </div>
          <div class="btn" @click="onButtonClick(6)">
            <div class="btn-time">16:00-17:00</div>
            <div class="num">{{ number[6] }}/10</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="button-groups" v-if="isWorkday()">
      <va-button-group preset="primary" class="time">
        <div style="display: inline-block; margin-top: 30px; font-weight: bold">
          上午：
        </div>
        <va-button
          id="time1"
          class="time-slot"
          @click="onButtonClick(0)"
          hover-behavior="opacity"
          :hover-opacity="0.4"
        >
          <span style="margin-right: 100px"
            >&nbsp;&nbsp;8:00-&nbsp;&nbsp;9:00</span
          >{{ number[0] }}/10
        </va-button>
        <va-button id="time2" class="time-slot" @click="onButtonClick(1)">
          <span style="margin-right: 100px"> &nbsp;&nbsp;9:00-10:00</span
          >{{ number[1] }}/10
        </va-button>
        <va-button id="time3" class="time-slot" @click="onButtonClick(2)">
          <span style="margin-right: 100px">10:00-11:00</span>{{ number[2] }}/10
        </va-button>
      </va-button-group>

      <va-button-group preset="primary" class="time">
        <div style="display: inline-block; margin-top: 30px; font-weight: bold">
          下午：
        </div>
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
    </div> -->

    <div class="center-text" v-else>
      <p>当日无可预约时间</p>
    </div>
    <template>
      <va-modal v-model="showModal" ok-text="确认" cancel-text="取消">
        <p></p>
        <p v-html="alertText"></p>
        <p style="text-align: center"><img :src="imgUrl" alt="图片" /></p>
      </va-modal>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      currentDate: '',
      currentMonth: '',
      formattedDate: '',
      nextDates: [],
      fetchedData: [],
      number: [0, 0, 0, 0, 0, 0, 0],
      options: [],
      model: 'two',
      value: new Date(),
      showModal: false,
      alertText: '',
      imgUrl: '',
      fee: {
        主任医师: '9',
        副主任医师: '7',
        主治医师: '6',
        住院医师: '4',
        医师: '4',
      },
      DoctorInfo: '',
      DoctorFee: '',
      worktime: {},
      workday: [],
    }
  },

  async mounted() {
    this.getCurrentDate()
    this.generateNextDates()
    this.fetchData(new Date())
    await this.GetDoctorInfo()
    console.log('workday:')
    console.log(this.workday)
    this.options = this.options.concat(
      this.nextDates.map((date) => ({ label: date, value: date }))
    )
    // console.log("curDate:"+this.currentDate.toString());
  },
  methods: {
    getCurrentDate() {
      const now = new Date()
      const day = now.getDate()
      const month = now.getMonth()
      this.currentDate = String(day)
      this.currentMonth = String(month)
      this.options.push({ label: this.currentDate, value: this.currentDate })
    },
    generateNextDates() {
      const startDate = new Date()
      startDate.setDate(startDate.getDate() + 1) // Start from tomorrow
      for (let i = 0; i < 6; i++) {
        const nextDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
        const day = nextDate.getDate()
        this.nextDates.push(String(day))
      }
    },

    onButtonClick(num) {
      this.$vaModal.confirm('你确定要预约当前时间段吗?').then((ok) => {
        if (ok) {
          if (this.number[num] < 10) {
            // alert("预约成功");
            this.sendData(num)
          } else {
            alert('无可预约位置，预约失败')
          }
        }
      })
    },
    isWorkday() {
      // 获取当前日期，假设 workday 是一个包含工作日的数组，例如 ["4", "7", "9", "10", "11"]
      const today = this.value.getDate().toString() // 获取当前日期的日份并转为字符串
      return this.workday.includes(today)
    },

    fetchData(date) {
      var self = this // 存储当前对象的引用
      self.number = [0, 0, 0, 0, 0, 0, 0]
      const d = date.getDate()
      const m = date.getMonth() + 1
      this.formattedDate = `2023-${m}-${d}`
      // console.log(formattedDate);

      const formattedMonth = m.toString().padStart(2, '0')
      const formattedDay = d.toString().padStart(2, '0')
      this.formattedDate = `2023-${formattedMonth}-${formattedDay}`

      // 新增部分
      axios
        .get('http://124.223.143.21/Registration/GetRegist?', {
          params: {
            date: this.formattedDate,
            doctorId: this.$route.params.selectedId,
          },
        })
        .then(function (response) {
          self.fetchedData = response.data
          console.log(self.fetchedData)
          for (let i = 0; i < self.fetchedData.length; i++) {
            self.number[self.fetchedData[i].Period - 1] =
              self.fetchedData[i].Count
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    },

    // sendData(per) {
    //   console.log("id: " + this.$route.params.selectedId);
    //   if (this.formattedDate == undefined) {
    //     alert("请选择就诊日期！");
    //     return;
    //   }
    //   const url = "http://124.223.143.21/Registration/regist";
    //   const data = {
    //     patientId: sessionStorage.getItem('userID'),
    //     doctorId: this.$route.params.selectedId,
    //     // doctorId: "23008",
    //     // Time: "2023-08-30T07:22:13.624Z",
    //     time: this.formattedDate,
    //     // period: 2,
    //     period: per + 1,
    //   };
    //   console.log(data);
    //   axios
    //     .post(url, data)
    //     .then((response) => {
    //       const dataString = sessionStorage.getItem('userID') + this.$route.params.selectedId + this.formattedDate + (per + 1);
    //       console.log(dataString);
    //       // 在axios请求成功的回调函数内部调用Generate函数
    //       this.Generate(dataString, () => {
    //         console.log(this.imgUrl); // 在这里访问imgUrl
    //         this.alertText = "预约 " + this.$route.params.selectedDoctor + " 医生成功！\n" + "时间：" + this.formattedDate + " " + response.data + "<br>预约二维码：";
    //         this.showModal = true;
    //         this.fetchData(this.value);
    //       });
    //     })
    //     .catch(function (error) {
    //       if (error.response) {
    //       console.error(error.response.status);
    //       console.error("Error message:", error.message);
    //       if (error.response.status == 400) {
    //          alert("预约失败！今日已预约该医生该时间段，请重新选择时间段！");
    //        }
    //       //alert("预约失败！该时间段没有剩余名额，请重新选择时间段！");
    //       else if (error.message == "Network Error"){
    //         alert("网络错误，请检查您的网络连接！");
    //         return;
    //       }
    //       else{
    //         alert("预约失败，发生未知错误！");
    //       }
    //       // if (error.response) {
    //       //   console.error("Response data:", error.response.data);
    //       //   console.error("Response status:", error.response.status);
    //       // }
    //       }
    //     });
    // },
    sendData(per) {
      console.log('id: ' + this.$route.params.selectedId)
      if (this.formattedDate == undefined) {
        alert('请选择就诊日期！')
        return
      }

      const self = this // 存储当前对象的引用
      const dataString =
        sessionStorage.getItem('userID') +
        this.$route.params.selectedId +
        this.formattedDate +
        (per + 1)

      // 生成二维码
      this.Generate(dataString, (qrCodeSuccess) => {
        if (!qrCodeSuccess) {
          alert('生成二维码失败！')
          return
        }

        const url = 'http://124.223.143.21/Registration/regist'
        const data = {
          patientId: sessionStorage.getItem('userID'),
          doctorId: this.$route.params.selectedId,
          time: this.formattedDate,
          period: per + 1,
          qrCodeUrl: this.imgUrl,
        }
        console.log(data)

        // 调用挂号的 API
        axios
          .post(url, data)
          .then((response) => {
            // 在axios请求成功的回调函数内部
            self.alertText =
              '预约 ' +
              self.$route.params.selectedDoctor +
              ' 医生成功！\n' +
              '时间：' +
              self.formattedDate +
              ' ' +
              response.data +
              '<br>预约二维码：'
            self.showModal = true
            self.fetchData(self.value)
          })
          .catch(function (error) {
            if (error.response) {
              console.error(error.response.status)
              console.error('Error message:', error.message)
              if (error.response.status == 400) {
                alert('预约失败！今日已预约该医生该时间段，请重新选择时间段！')
              } else if (error.message == 'Network Error') {
                alert('网络错误，请检查您的网络连接！')
              } else {
                alert('预约失败，发生未知错误！')
              }
            }
          })
      })
    },

    Generate(dataString, callback) {
      var self = this
      var formData = new FormData()
      formData.append('showapi_appid', '1475668')
      formData.append('showapi_sign', '2c780d7234d547a49d4df8a0e9331f2d') //这两个不用改

      formData.append('content', dataString) //这里放二维码内容
      formData.append('size', '8') //这里可以修改图片大小
      formData.append('imgExtName', 'jpg') //这里修改图片格式
      // 发送POST请求
      axios
        .post('http://route.showapi.com/887-1', formData)
        .then(function (response) {
          self.imgUrl = response.data.showapi_res_body.imgUrl
          if (callback) {
            callback(true) // 调用回调函数
          }
        })
        .catch(function (error) {
          console.error(error)
          alert('生成预约二维码失败!')
        })
    },

    async GetDoctorInfo() {
      var self = this // 存储当前对象的引用
      // 新增部分
      axios
        .get('http://124.223.143.21/api/Doctors/fee?', {
          params: {
            doctorId: this.$route.params.selectedId,
          },
        })
        .then(function (response) {
          self.DoctorInfo = response.data.consultationInfos
          self.DoctorFee = response.data.fee
          // console.log(self.DoctorInfo);

          // 创建一个Set来跟踪已经记录的日期
          const recordedDates = new Set()
          // 遍历排班信息数组，将日期和period值添加到字典中
          self.DoctorInfo.forEach((info) => {
            const dateTime = info.dateTime.substring(8, 10)
            const period = info.period

            if (!recordedDates.has(dateTime)) {
              recordedDates.add(dateTime)
              self.worktime[dateTime] = []
              self.workday.push(dateTime)
            }

            // 将period值添加到对应日期的数组中
            self.worktime[dateTime].push(period)
          })

          // 现在，workday对象包含了所有日期对应的period值
          // console.log(self.worktime);
          // console.log("workday:"+self.workday);
          for (let day in self.workday) {
            if (self.workday[day][0] == '0') {
              self.workday[day] = self.workday[day].slice(1, 2)
              console.log(self.workday[day])
            }
          }
        })
        .catch(function (error) {
          console.error(error)
        })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bgImage {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -1;
}
.parent-box {
  width: 70%;
  margin: 80px auto 0;
  height: 200px;

  .card-box {
    background: url('~@/assets/bg.png') left center no-repeat;
    background-size: 100% 100%;
    height: 302px;
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    .card-content {
      margin-left: 315px;
      font-size: 30px;
      font-weight: bold;
      color: #ffffff;
      padding: 56px 56px 0;
      div {
        margin-bottom: 25px;
      }
    }
  }
  .nmain {
    display: flex;
    justify-content: space-between;

    .main-item {
      width: 56%;
      display: flex;
      align-items: center;
      padding: 0 30px;
      flex-direction: column;
      height: 423px;
      background: #ffffff;
      box-shadow: -1px 4px 10px 0px rgba(142, 151, 176, 0.61);
      border-radius: 20px;
      &:nth-of-type(2) {
        width: 40%;
        background: url('~@/assets/bg3.png') right bottom no-repeat;
        background-color: #fff;
      }
      .ndate {
        padding: 20px;
        width: 100%;
        &::v-deep .va-date-picker__picker-wrapper {
          .va-day-picker__calendar__day-wrapper {
            margin-bottom: 18px;
          }
          .va-date-picker-cell {
            width: 32px;
            height: 32px;
            border-radius: 16px;
          }
          .va-day-picker__weekday {
            margin-bottom: 5px;
          }
          .va-date-picker-cell:after,
          .va-date-picker-cell:before {
            border-radius: 16px;
          }
        }
        &::v-deep .va-date-picker-header {
          margin-bottom: 10px;
        }
      }
      .main-item-title {
        width: 526px;
        height: 51px;
        background: #2e53ba;
        border-radius: 0 0 60px 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 32px;
        color: #f0f0f0;
        font-weight: bold;
        font-size: 25px;
      }
      .main-content {
        div {
          margin-bottom: 10px;
        }
        font-weight: 500;
        color: #000000;
        line-height: 35px;
        font-size: 20px;
      }
    }
  }
  .nbtns {
    margin-top: 40px;
    .btn-line {
      display: flex;
      padding-left: 140px;
      align-items: center;
      gap: 20px;
      margin-bottom: 20px;
      .type {
        width: 78px;
        height: 68px;
        background: #ffffff;
        border: 4px solid #163cb0;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        font-weight: bold;
        color: #163cb0;
      }
      .line {
        display: flex;
        gap: 20px;
        .btn {
          width: 240px;
          height: 70px;
          background: url('~@/assets/bg2.png') left top no-repeat;
          background-size: 100% 100%;
          border-radius: 12px;
          display: flex;
          align-items: center;
          padding: 0 22px;
          color: #ffffff;
          font-size: 17px;
          justify-content: space-between;
        }
      }
    }
  }
}

.image-left {
  width: 140px;
  min-height: 140px;
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
  width: 100%;
}

.hide {
  color: transparent;
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
  color: #1a5a99;
}
#main-page {
  margin-right: 20%;
  margin-left: 17%;
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
}
</style>
