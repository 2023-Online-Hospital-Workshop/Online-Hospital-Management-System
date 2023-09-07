<template>
  <!-- <chat-box v-if="chatShown" style="z-index: 999;"></chat-box> -->
  <va-modal v-model="chatShown" hide-default-actions="true">
    <div style="width: 500px; height: 600px;">
      <div style="overflow: auto; height: 80%;">
        <div class="chat-box">
          <!-- <span class="chatBox chatBox-left">
            你好
          </span>
          <br>
          <span class="chatBox chatBox-right">
            你好
          </span> -->
          <table class="chat-box" style="margin-left: 5%; height: 80%; width: 90%;">
            <tr v-for="(message, index) in chatMessages" :key="index">
              <div
                :class="{ 'chatBox': true, 'chatBox-left': message.userId === 2, 'chatBox-right': message.userId === 1 }">
                <td>
                  {{ message.text }}
                </td>
              </div>
              <br>
            </tr>
          </table>
        </div>
      </div>
      <va-input v-model="message" class="mb-6" type="textarea" :min-rows="3" style="width:100%;">

      </va-input>
      <va-button style="width: 100%;" @click="sendMessage()">
        发送
      </va-button>
    </div>
  </va-modal>
  <div style="margin-top:80px">
    <div class="row justify-center" cols="12" sm="6" md="4" lg="3" v-for="(record, index) in displayedAllRecords "
      :key="index">
      <va-modal v-model="modalShown[realIndex(index)]" class="feedbackBox" hide-default-actions>
        <center>
          <span v-for="star in 5" :key="star" class="star"
            :class="{ active: feedbacks[realIndex(index)].hoverRating >= star || feedbacks[realIndex(index)].selectedRating >= star }"
            @mouseover="setHoverRating(realIndex(index), star)" @mouseout="setHoverRating(realIndex(index), 0)"
            @click.stop="setSelectedRating(realIndex(index), star)">
            ★
          </span>
        </center>
        <p style="height: 10px;"></p>
        <va-input v-model="feedbacks[realIndex(index)].comment" class="mb-6" type="textarea" placeholder="请在此输入您的评论..."
          :min-rows="3" :max-rows="3" @click.stop />
        <!-- <textarea v-model="feedbacks[realIndex(index)].comment" placeholder="请在此输入您的评论..." @click.stop></textarea> -->
        <p>
          <va-button style="width: 100%;" @click="submitFeedback(realIndex(index))">
            提交
          </va-button>
        </p>
      </va-modal>
      <va-card class="record-card" elevation="10" color="#ECF0F1">
        <!-- 第一行 -->
        <!-- (标题) -->
        <va-card-title class="first-row">
          <div class="row justify-start"><span class="title-status"
              :style="{ color: record.status === 0 ? '#3498db' : record.status === -1 ? '#e74c3c' : '#2451c0' }">{{
                record.status === 0 ? '待就诊' : record.status === -1 ? '已取消' : '已就诊' }}</span>
          </div>

          <va-button round icon="close" v-if="record.status == 0" color="#f6f2c8" border-color="#9d7013"
            text-color="#9d7013" @click="cancelAppointment(record, realIndex(index))">
            取消
          </va-button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span class="title-date">{{ record.date }}</span>
        </va-card-title>

        <!-- 第二行 -->
        <!-- <va-card-content class="info-row" v-if="record.status === 1">
          <div class="row justify-start">
            <span class="flex flex-col xs3">预约号码:</span>
            <span class="flex flex-col xs3">{{
              record.appointmentNumber
            }}</span>
          </div>
        </va-card-content> -->

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
            <span class="flex flex-col xs3">{{ this.periodDict[record.appointmentTime] }}</span>
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
          <va-button :disabled="record.status != 1" color="primary" class="button" @click="viewPrescription(record)">
            查看处方
          </va-button>

          <va-button :disabled="record.status != 1" color="primary" class="button" @click="payBill(record)">
            支付账单
          </va-button>

          <va-button :disabled="record.status != 1 || feedbacks[realIndex(index)].isSubmitted == true" color="primary"
            class="feedback-button" @click="modalShown[realIndex(index)] = !modalShown[realIndex(index)]">
            反馈评价
          </va-button>

          <va-button color="primary" class="button" @click="showChat()">
            在线复诊
          </va-button>

          <va-popover placement="left" trigger="click">
            <va-button :disabled="record.status != 1 || leaveNotes[realIndex(index)].isSubmitted == true" color="primary"
              class="feedback-button">
              提交假条
            </va-button>
            <template #body>
              <div>
                <input v-model="leaveNotes[realIndex(index)].leaveNoteInput" type="number" placeholder="请输入请假天数"
                  @click.stop />
              </div>
              <div>
                <va-button color="primary" @click="submitExcuse(realIndex(index))">
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
// import ChatBox from "./ChatBox.vue";

export default {
  el: '#app',
  data() {

    return {
      allRecords: [],
      feedbacks: [],
      leaveNotes: [],
      currentPage: 1,
      itemsPerPage: 6,
      periodDict: {},
      // 显示反馈评价窗口
      modalShown: [],
      // 显示聊天窗口
      chatShown: false,
      // 聊天记录
      chatMessages: [
        { userId: 1, text: '你好' },
        { userId: 2, text: '你好' },
        { userId: 1, text: '是中国人就说阿涅亚塞哟' },
        { userId: 1, text: '是不是犟嘴了？' },
        { userId: 2, text: '一得阁拉米' },
        { userId: 1, text: '一得阁拉米' },
        { userId: 2, text: '一得阁拉米' },
        { userId: 1, text: '一得阁拉米' },
        { userId: 2, text: '一得阁拉米' },
        { userId: 1, text: '一得阁拉米' },
        { userId: 2, text: '一得阁拉米' },
        { userId: 2, text: '一得阁拉米' },
        { userId: 1, text: '一得阁拉米' },
        { userId: 2, text: '一得阁拉米' },
        { userId: 1, text: '一得阁拉米' },
        { userId: 2, text: '一得阁拉米' },
        { userId: 1, text: '一得阁拉米' },
        { userId: 1, text: '一得阁拉米' },
      ],
      // 聊天框内的信息
      message: "",

      //hcr添加
      userID: sessionStorage.getItem('userID'),
    };
  },
  computed:
  {
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
    for (let i = 1; i <= 3; i++) {
      this.periodDict[i] = `${i + 7}:00-${i + 8}:00`;
    }
    for (let i = 4; i <= 7; i++) {
      this.periodDict[i] = `${i + 9}:00-${i + 10}:00`;
    }


    // 这个要改成轮询
    axios.get(`http://124.223.143.21:4999/Registration/Patient/${this.userID}`)
      .then((response) => {
        console.log(response.data);
        const newData = response.data; // 获取响应数据
        // 将新数据转化为 record 对象并添加到 allRecords 数组中
        this.allRecords = newData.map(item => ({
          patient: item.patient.name,
          // patientID: this.userID,
          patientID: this.userID,
          patientGender: item.patient.gender ? "男" : "女",
          patientBirth: item.patient.birthDate,
          doctor: item.doctor.name,
          doctorID: item.doctor.doctorId,
          date: item.date.split('T')[0],
          appointmentTime: item.period,
          waitingCount: item.queueCount,
          status: item.state,
          diagnoseId: `${item.date.replace('-', '').split('T')[0].replace('-', '')}${this.userID}${item.doctor.doctorId}${item.period}`,
        }));
        this.allRecords.sort((record1, record2) => {
          const date1 = new Date(record1.date);
          const date2 = new Date(record2.date);
          return date2 - date1; // 比较结果决定排序顺序
        });
        console.log(this.allRecords);
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
        for(let i = 0; i <this.allRecords.length; i++)
        {
          this.modalShown[i]=false;
        }

        axios.get('http://124.223.143.21:4999/api/Leave/leaveApplications', {
          params: {
            PatientId: this.userID
          }
        })
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
        axios.get('http://124.223.143.21:4999/api/Comment/whether', {
          params: {
            PatientId: this.userID
          }
        })
          .then((response) => {
            console.log("checkComment");
            console.log(response);
            for (let idData of response.data) {
              let tmp = idData;
              let selectedObject = this.feedbacks.find(feedback => feedback.diagnoseId === tmp);
              if (selectedObject) {
                console.log("found");
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
    payBill(record) {
      axios.get('http://124.223.143.21/api/DiagnosedHistory/payBill', {
        params: {
          diagnosedId: record.diagnoseId
        }
      })
        .then((response) => {
          // Create a new window
          console.log(response);
          const newWindow = window.open("", "_blank");
          const htmlString = response.data;
          // // Write the fetched HTML content into the new window
          newWindow.document.write(htmlString);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    realIndex(index) {
      return index + (this.currentPage - 1) * this.itemsPerPage;
    },
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
      axios.get('http://124.223.143.21/api/Prescription/GetPrescription', {
        params: {
          diagnoseId: record.diagnoseId
        }
      })
        .then((response) => {
          let prescriptionData = response.data;
          const PAGE_MARGIN = 5;
          const doc = new jsPDF({
            unit: "mm",
            format: "a6",
            orientation: "landscape", // 页面方向，portrait: 纵向，landscape: 横向
          });
          doc.addFileToVFS("MyFont.ttf", myFont);
          doc.addFont("MyFont.ttf", "MyFont", "normal");
          doc.setFont("MyFont");
          var penHeight = PAGE_MARGIN;
          const pageWidth = doc.internal.pageSize.width; // 获取页面宽度
          const pageHeight = doc.internal.pageSize.height; // 获取页面宽度
          // 添加标题
          doc.setFontSize(12);
          const text = "同济大学校医院";
          const textWidth = doc.getTextDimensions(text).w; // 获取文本的宽度
          const centerX = (pageWidth - textWidth) / 2; // 计算居中位置的 x 坐标
          penHeight += doc.getTextDimensions(text).h;
          doc.text(text, centerX, penHeight); // 在居中位置显示文本
          // 添加副标题
          doc.setFontSize(10);
          const subtitle = "门 诊 处 方";
          const subtitleTextWidth = doc.getTextDimensions(subtitle).w;
          const subtitleCenterX = (pageWidth - subtitleTextWidth) / 2;
          penHeight += doc.getTextDimensions(subtitle).h + 2;
          doc.text(subtitle, subtitleCenterX, penHeight); //  
          // 在副标题下方绘制一条直线
          doc.setLineWidth(0.2); // 设置直线的宽度
          var lineY = penHeight + doc.getTextDimensions(subtitle).h + 6; // 计算直线的纵坐标
          doc.line(8, lineY, pageWidth - 8, lineY); // 绘制直线，横坐标范围：20 到 pageWidth - 20
          // 打印基本信息
          doc.setFontSize(6);
          const birthYear = new Date(record.patientBirth).getFullYear();
          const currentYear = new Date().getFullYear();
          const basics = `姓名：${record.patient}    性别：${record.patientGender}    年龄：${currentYear - birthYear}    患者编号：${record.patientID}    科室：${prescriptionData.doctor.secondaryDepartment}    就诊时间：${prescriptionData.diagnoseTime.replace('T', ' ')}`;
          const basicsStart = 25 - doc.getTextDimensions(subtitle).w / 2;
          penHeight += doc.getTextDimensions(basics).h + PAGE_MARGIN;
          doc.text(basics, basicsStart, penHeight);
          // 打印表格
          const printData = [
            [`诊断记录：  ${record.diagnoseId}`],
            [`诊断医生：  ${prescriptionData.doctor.name}`],
            [`既往病史：  ${prescriptionData.anamnesis}`],
            [`体征检查：  ${prescriptionData.sign}`],
            [`初步诊断：  ${prescriptionData.clinicdia}`],
          ];
          doc.autoTable({
            theme: 'plain',
            startY: penHeight + PAGE_MARGIN,
            body: printData,
            styles: {
              font: 'MyFont',
              fontSize: 7,
              cellPadding: { top: 0, right: 2, bottom: 1, left: 0 }
            },
          });
          penHeight += 35;
          var tmpMedicines = prescriptionData.medicines;
          console.log(tmpMedicines);
          // 打印基本信息
          doc.setFontSize(9);
          const info = "处方：";
          doc.text(info, PAGE_MARGIN + 9, penHeight + 1);
          // 打印药品
          const medicineData = [
            ["药品名称", "药品价格(元)", "药品数量(盒)", "服用剂量", "服用建议"],
          ];
          tmpMedicines.forEach(medicine => {
            console.log(medicine);
            const medicationName = medicine.medicineName;
            const medicinePrice = medicine.medicinePrice;
            const medicineQuantity = medicine.quantity;
            const medicineDose = medicine.medicationInstruction.split("#")[0];
            const medicineAdvice = medicine.medicationInstruction.split("#")[1];
            medicineData.push([medicationName, medicinePrice, medicineQuantity, medicineDose, medicineAdvice]);
          });
          medicineData.push([`总价：${prescriptionData.totalPrice}`]);
          console.log(medicineData);

          const totalWidth = doc.internal.pageSize.width - PAGE_MARGIN * 2; // 获取页面宽度
          const columnWidth1 = totalWidth * 0.14; // 前四列宽度各14%
          const columnWidth5 = totalWidth * 0.40; // 第五列宽度40%
          doc.autoTable({
            theme: 'plain',
            startY: penHeight + PAGE_MARGIN,
            body: medicineData,
            styles: {
              font: 'MyFont',
              fontSize: 6,
              cellPadding: { top: 0, right: 4, bottom: 8 / (tmpMedicines.length + 1), left: 0 }
            },
            columnStyles: {
              0: { columnWidth: columnWidth1 },
              1: { columnWidth: columnWidth1 },
              2: { columnWidth: columnWidth1 },
              3: { columnWidth: columnWidth1 },
              4: { columnWidth: columnWidth5 },
            },
          });
          // 打印时间
          doc.setFontSize(6);
          const currentDate = new Date(); // 获取当前时间
          const formattedTime = `打印时间：${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;
          const timeTextWidth = doc.getTextDimensions(formattedTime).w;
          const timeX = pageWidth - PAGE_MARGIN * 2 - timeTextWidth; // 计算时间文本的横坐标，使其在右侧对齐
          const finalHeight = pageHeight - doc.getTextDimensions(formattedTime).h;
          doc.text(formattedTime, timeX, finalHeight);
          doc.line(8, finalHeight - 3, pageWidth - 8, finalHeight - 3); // 绘制直线，横坐标范围：20 到 pageWidth - 20
          // 加入印章
          const imgData = require("../assets/stamp.jpg");
          doc.addImage({
            imageData: imgData,
            x: pageWidth - 35,
            y: pageHeight - 32,
            width: 25,
            height: 25,
            format: "jpg"
          });

          // doc.save("example.pdf");
          const blob = doc.output('blob');
          const url = URL.createObjectURL(blob);
          window.open(url, '_blank'); // 在新窗口中打开 PDF 文件
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
        this.modalShown[recordIndex] = false;
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
            leaveNote.isSubmitted = true;
          })
          .catch(error => {
            console.error(error);
          });
        console.log(`Index为 ${recordIndex} 的记录提交了 ${leaveNote.leaveNoteInput}的请假天数`);
      }
    },
    showChat() {
      this.chatShown = true;

    },
    sendMessage() {
      axios.post("", this.message)
        .then(function (response) {
          this.chatMessages = [];
          for (let i = 0; i < response.data.length; i++) {
            this.chatMessages.append(response.data[i]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  // components: { ChatBox }
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

.feedbackBox {
  box-shadow: none;
}

.chatBox {
  position: relative;
  /* margin:12px; */
  padding: 5px 8px;
  word-break: break-all;
  background: #ffffff;
  border: 1px solid #989898;
  border-radius: 5px;
  max-width: 180px;
}

.chatBox-left {
  float: left;
}

.chatBox-right {
  float: right;
}

.chatBox-left::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  top: 5px;
  border: 10px solid;
  border-color: transparent #002fb0 transparent transparent;
  float: left;
}

.chatBox-right::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  right: -20px;
  top: 5px;
  border: 10px solid;
  border-color: transparent transparent transparent #002fb0;
  float: right;
}

.chatBox {
  position: relative;
  /* margin:12px; */
  padding: 5px 8px;
  word-break: break-all;
  background: #ffffff;
  border: 1px solid #989898;
  border-radius: 5px;
  max-width: 180px;
}

.chatBox-left {
  float: left;
}

.chatBox-right {
  float: right;
}

.chatBox-left::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  top: 5px;
  border: 10px solid;
  border-color: transparent #002fb0 transparent transparent;
  float: left;
}

.chatBox-right::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  right: -20px;
  top: 5px;
  border: 10px solid;
  border-color: transparent transparent transparent #002fb0;
  float: right;
}
</style>