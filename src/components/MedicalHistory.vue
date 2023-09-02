<template>
  <div style="margin-top:80px">
    <div class="row justify-center" cols="12" sm="6" md="4" lg="3" v-for="(record, index) in displayedAllRecords "
      :key="index">
      <va-card class="record-card" elevation="10" color="#ECF0F1">
        <!-- 第一行 -->
        <!-- (标题) -->
        <va-card-title class="first-row">
          <div class="row justify-start"><span class="title-status"
              :style="{ color: record.status === 0 ? '#3498db' : record.status === -1 ? '#e74c3c' : '#2451c0' }">{{
                record.status === 0 ? '待就诊' : record.status === -1 ? '已取消' : '已就诊' }}</span></div>
          <span class="title-date">{{ record.date }}</span>
          &nbsp;
          <span class="title-dept">{{ record.department }}</span>
        </va-card-title>

        <!-- 第二行 -->
        <va-card-content class="info-row" v-if="record.status === 1">
          <div class="row justify-start">
            <span class="flex flex-col xs3">预约号码:</span>
            <span class="flex flex-col xs3">{{
              record.appointmentNumber
            }}</span>
          </div>
        </va-card-content>

        <!-- 第三行 -->
        <va-card-content class="info-row">
          <div class="row justify-start">
            <span class="flex flex-col xs3">就诊医生:</span>
            <span class="flex flex-col xs3">{{ record.doctor }}</span>
          </div>
        </va-card-content>
        <!-- 第四行 -->
        <va-card-content class="info-row">
          <div class="row justify-start">
            <span class="flex flex-col xs3">预约时间段:</span>
            <span class="flex flex-col xs3">{{ record.appointmentTime }}</span>
          </div>
        </va-card-content>
        <!-- 第五行 -->
        <va-card-content class="info-row">
          <div class="row justify-start">
            <span class="flex flex-col xs3">前方等待人数:</span>
            <span class="flex flex-col xs3">{{ record.waitingCount }}</span>
          </div>
        </va-card-content>
        <!-- 按钮，如果是已经取消或者已经就诊完就不能取消挂号 -->
        <va-card-content class="button-row">
          <va-button :disabled="record.status != 0" color="primary" class="button"
            @click="cancelAppointment(record, index + (this.currentPage - 1) * this.itemsPerPage)">
            取消挂号
          </va-button>

          <va-button :disabled="record.status != 1" color="primary" class="button" @click="viewPrescription(record)">
            查看处方
          </va-button>

          <va-popover placement="left" trigger="click">
            <va-button :disabled="record.status != 1 || feedbacks[index].isSubmitted == true" color="primary"
              class="feedback-button">
              反馈评价
            </va-button>
            <template #title>
              <p>请填写反馈评价</p>
            </template>
            <template #icon>
              <va-button icon="create" size="small" />
            </template>
            <template #body>
              <div class="stars">
                <span v-for="star in 5" :key="star" class="star"
                  :class="{ active: feedbacks[index].hoverRating >= star || feedbacks[index].selectedRating >= star }"
                  @mouseover="setHoverRating(index, star)" @mouseout="setHoverRating(index, 0)"
                  @click.stop="setSelectedRating(index, star)">
                  ★
                </span>
              </div>
              <div>
                <textarea v-model="feedbacks[index].comment" placeholder="请在此输入您的评论..." @click.stop></textarea>
              </div>
              <div>
                <va-button v-if="!feedbacks[index].isSubmitted" @click="submitFeedback(index)">
                  提交
                </va-button>
              </div>
            </template>
          </va-popover>


          <va-popover placement="left" trigger="click">
            <va-button :disabled="record.status != 1 || leaveNotes[index].isSubmitted == true" color="primary"
              class="feedback-button">
              提交假条
            </va-button>
            <template #body>
              <div>
                <input v-model="leaveNotes[index].leaveNoteInput" type="number" placeholder="请输入请假天数" @click.stop />
              </div>
              <div>
                <va-button color="primary" @click="submitExcuse(index)">
                  提交假条
                </va-button>
              </div>
            </template>
          </va-popover>


        </va-card-content>
      </va-card>
    </div>
    <div class="pagination">
      <va-pagination v-model="currentPage" :pages="totalPages" @change="changePage" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { myFont } from "../assets/font/myfont-normal"

export default {
  data() {
    return {
      allRecords: [],
      feedbacks: [],
      leaveNotes: [],
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    displayedAllRecords() {
      // 通过调整起始索引和结束索引，我们可以选择要在当前页面显示的特定人员。
      // 这样，当用户切换页面时，我们可以动态地更新要显示的人员列表
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.allRecords.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.allRecords.length / this.itemsPerPage);
    },
  },
  mounted() {
    axios.get('http://124.223.143.21:4999/Registration/Patient/2151895')
      .then((response) => {
        console.log(response.data);
        const newData = response.data; // 获取响应数据
        // 将新数据转化为 record 对象并添加到 allRecords 数组中
        this.allRecords = newData.map(item => ({
          patientID: "2151895",
          doctor: item.doctor.name,
          doctorID: item.doctor.doctorId,
          date: item.date.replace('T', ' '),
          appointmentTime: item.period,
          waitingCount: item.queueCount,
          status: item.state,
          diagnoseId: `${item.date.replace('-', '').split('T')[0].replace('-', '')}${2151895}${item.doctor.doctorId}${item.period}`,
        }));

        this.feedbacks = this.allRecords.map(item => ({
          diagnoseId: item.diagnoseId,
          hoverRating: 0,
          selectedRating: 0,
          comment: '',
          isSubmitted: false
        }));

        this.leaveNotes = this.allRecords.map(item => ({
          diagnoseId: item.diagnoseId,
          leaveNoteInput: '',
          isSubmitted: false
        }));

        axios.get('http://124.223.143.21:4999/api/Leave/leaveApplications?PatientId=2151895')
          .then((response) => {
            for (let idData of response.data) {
              let tmp = idData.substring(0, idData.length - 3);
              let selectedObject = this.leaveNotes.find(leaveNote => leaveNote.diagnoseId === tmp);
              if (selectedObject) {
                selectedObject.isSubmitted = true;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });

        axios.get('http://124.223.143.21:4999/api/Comment/whether?PatientId=2151895')
          .then((response) => {
            for (let idData of response.data) {
              let tmp = idData;
              let selectedObject = this.feedbacks.find(feedback => feedback.diagnoseId === tmp);
              if (selectedObject) {
                // console.log("found");
                selectedObject.isSubmitted = true;
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });


      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    cancelAppointment(record, index) {
      const inputModel = {
        "PatientId": record.patientID,
        "DoctorId": record.doctorID,
        "Time": record.date.replace(' ', 'T'),
        "Period": record.appointmentTime,
      };
      console.log(inputModel);
      console.log(index);

      axios.put('http://124.223.143.21/Registration/cancel', inputModel)
        .then(response => {
          if (response.status === 200) {
            this.allRecords[index].status = -1; // Update status to '已取消'
          }
        })
        .catch(error => {
          console.error(error);
        });
    },

    viewPrescription(record) {
      axios.get('http://124.223.143.21/api/Prescription/GetPrescription?diagnoseId=202309012151895230012')
        .then((response) => {
          let prescriptionData = response.data;
          console.log(prescriptionData);
          console.log(record);
          const PAGE_MARGIN = 10;
          const doc = new jsPDF();

          doc.addFileToVFS("MyFont.ttf", myFont);
          doc.addFont("MyFont.ttf", "MyFont", "normal");
          doc.setFont("MyFont");

          const text = "济康同行打印单";
          // 添加第一页内容
          doc.text(text, PAGE_MARGIN, PAGE_MARGIN);

          const data = [
            ["ID", "Name", "Age", "City"],
            [1, "诊断记录", 30, "New York"],
            [2, "Jane Smith", 25, "Los Angeles"],
            [3, "Bob Johnson", 45, "Chicago"],
            [4, "Lisa Chen", 35, "San Francisco"],
            [5, "Mike Lee", 50, "Miami"]
          ];

          const textHeight = doc.getTextDimensions(text).h;

          doc.autoTable({
            startY: textHeight + PAGE_MARGIN, // 开始渲染表格的高度位置
            head: [data[0]],
            body: data.slice(1),
            margin: { top: PAGE_MARGIN }, // 上边距
            styles: {
              font: 'MyFont', // 设置表格字体
              fontStyle: 'normal', // 设置表格字体样式
            },
          });

          doc.save("example.pdf");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changePage(page) {
      // 切换页面
      this.currentPage = page;
    },
    setHoverRating(recordIndex, rating) {
      if (this.feedbacks[recordIndex]) {
        this.feedbacks[recordIndex].hoverRating = rating;
      }
    },
    setSelectedRating(recordIndex, rating) {
      if (this.feedbacks[recordIndex]) {
        this.feedbacks[recordIndex].selectedRating = rating;
      }
    },
    submitFeedback(recordIndex) {
      const feedback = this.feedbacks[recordIndex];
      if (feedback) {
        const inputData = {
          diagnoseId: this.allRecords[recordIndex].diagnoseId,
          evaluation: feedback.comment,
          treatmentScore: feedback.selectedRating,
        };
        console.log("Feedback inputData");
        console.log(inputData);

        axios.post('http://124.223.143.21/api/Comment', null, { params: inputData })
          .then(response => {
            console.log('POST request successful:', response.data);
            feedback.isSubmitted = true;
          })
          .catch(error => {
            console.error(error);
          });
        console.log(`Index为 ${recordIndex} 的记录选了 ${feedback.selectedRating} 颗星星，评论内容：${feedback.comment}`);
      }
    },
    submitExcuse(recordIndex) {
      const leaveNote = this.leaveNotes[recordIndex];
      if (leaveNote) {
        const inputData = {
          diagnosedId: this.allRecords[recordIndex].diagnoseId,
          leaveDays: leaveNote.leaveNoteInput,
        };
        console.log("leaveNote inputData");
        console.log(inputData);

        axios.post('http://124.223.143.21/api/Leave', null, { params: inputData })
          .then(response => {
            console.log('POST request successful:', response.data);
          })
          .catch(error => {
            console.error(error);
          });
        console.log(`Index为 ${recordIndex} 的记录提交了 ${leaveNote.leaveNoteInput}的请假天数`);
        leaveNote.isSubmitted = true;
      }
    }
  },
};
</script>

<style scoped>
* {
  font-family: AliRegular;
  --va-font-family: AliRegular;
  /* 应用字体 */
}

.record-card {
  margin-bottom: 20px;
  border-radius: 10px;
  width: 70%;
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
  width: 15%;
}

.feedback-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
}

.record-card .first-row .title-status {
  font-size: 20px;
}

.record-card .first-row .title-date {
  font-size: 14px;
}

.record-card .first-row .title-dept {
  font-size: 16px;
}

.pagination {
  display: flex;
  justify-content: center;
}

.star {
  font-size: 24px;
  cursor: pointer;
  color: #ddd;
  /* 默认的星星颜色 */
  transition: color 0.3s;
}

.star.active {
  color: gold;
  /* 亮起的星星颜色 */
}
</style>