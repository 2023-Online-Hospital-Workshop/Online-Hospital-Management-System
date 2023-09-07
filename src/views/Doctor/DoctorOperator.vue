<style scoped>
.header {
  position: fixed;
  /* 使其始终在屏幕顶部 */
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #002fb0;
  height: 60px;
  /* 为Header设置一个固定高度 */
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  /* 为Header添加轻微的阴影效果 */
  z-index: 100;
  /* 确保Header始终位于其他内容之上 */
  padding: 0 20px;
  /* 两侧添加一些边距 */
}

.patient-info {
  display: flex;
  justify-content: space-between;
  /* 患者姓名和患者ID水平排列 */
}

.application-time {
  font-size: 12px;
  /* 设置申请时间的字体大小 */
  margin-top: 10px;
  /* 控制申请时间的上外边距 */
}

* {
  font-family: AliRegular;
  --va-font-family: AliRegular;
  /* 应用字体 */
}

.logo {
  height: 40px;
  /* Adjust the height as necessary */
  margin-right: 10px;
  /* Adjust the margin as necessary */
}

.main-title {
  flex-grow: 1;
  text-align: center;
  font-size: 24px;
  /* 增大字体大小 */
  margin: 0;
  /* 移除所有边距 */
  color: white;
  /* 设置标题颜色为白色 */
}

.navbar-item-slot>a {
  border: 1px dashed var(--va-secondary);
  padding: 6px 10px;
  color: aliceblue;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 1400px;
}

/* 主元素*/
.main {
  display: flex;
  flex-wrap: wrap;
  /*在容器内的子元素超出容器宽度时换行*/
  margin-left: 300px;
  margin-top: 50px;
}

/*叫号*/
#title {
  text-align: center;
  /* 居中文本 */
  font-size: 20px;
  /* 设置字体大小为 30px */
  font-weight: bold;
}

.list__item+.list__item {
  margin-top: 20px;
}

#register {
  width: 300px;
  height: 400px;
}

/*就诊单*/
.diagnostic {
  float: right;
  width: 700px;
  height: 1300px;
  margin: 40px 0px 0px 60px;
  text-align: left;
  padding-left: 30px;
  /* 设置文本左侧缩进为 30px */
  font-weight: 500;
  /* 设置字体粗细 */
  color: #000000;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
}

input {
  border: none;
  /* 取消边框 */
  outline: none;
  /* 取消获取焦点时的边框和阴影 */
  width: 600px;
  height: 70px;
  /* 设置高度为 30px */
  background-color: rgb(255, 255, 255);
  /* 设置背景颜色为 "input"（请确保颜色名称正确） */
  padding: 5px 10px;
  /* 添加内边距以提供一些间隔 */
}

.myh1 {
  text-align: center;
  font-size: 20px;
  /* 设置字体大小为 20px */
  margin: 20px;
  /* 设置下边距为 30px */
}

#info {
  border-spacing: 40px 10px;
  /* 设置单元格之间的间距 */
  border-collapse: separate;
  /* 设置表格边框合并模式 */
}

#test {
  background: "input";
  color: "input";
  border: none;
}

.myform {
  margin: 5px;
}
.chatBox{
  position: relative;
  /* margin:12px; */
  padding:5px 8px;
  word-break: break-all;
  background: #ffffff;
  border: 1px solid #989898;
  border-radius: 5px;
  max-width:180px;
}
.chatBox-left {
  float: left;
}
.chatBox-right {
  float: right;
}
.chatBox-left::before{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  top:5px;
  border: 10px solid;
  border-color: transparent #002fb0 transparent transparent ;
  float:left;
}
.chatBox-right::before{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  right: -20px;
  top:5px;
  border: 10px solid;
  border-color: transparent transparent transparent #002fb0;
  float: right;
}
/*侧边栏按钮*/
/* #cebian {
  width: 120px;
  height: 0;
  margin: 100px 10px;
  border-left: 80px solid transparent;
  border-top: 150px solid #00C1AE;
} */
</style>
  


<template>
  <header class="header">
    <img src="@/assets/logo.jpg" alt="Logo" class="logo" />
    <h1 class="main-title">济康同行</h1>
    <DoctorInfo />
    <el-button type="primary" class="custom-button trapezoid-button" @click="drawer = true">
      <span class="vertical-text">请假申请</span>
    </el-button>

    <el-drawer v-model="drawer" title="I am the title" :with-header="false">
      <va-card v-for="(i, index) in leave_app" :key="index" style="margin-bottom: 30px;">
        <va-card-title>请假申请</va-card-title>
        <va-card-content>
          <!-- 诊断 -->
          诊断：{{ i.treatmentRecord.clinicdia }}

          <!-- 患者信息和申请时间 -->
          <div class="patient-info">
            <div>
              <!-- 患者姓名和患者ID放在右下角 -->
              <div class="patient-info-item">
                患者姓名: {{ i.patientName.name }}
              </div>
              <div class="patient-info-item">
                患者ID: {{ i.patientName.patientId }}
              </div>
            </div>

            <!-- 申请时间放在右下角 -->
            <div class="application-time">
              申请时间：{{ i.leaveApplication.leaveApplicationTime }}
            </div>
          </div>

          <!-- 时间信息 -->
          <br />诊断时间：{{ i.treatmentRecord.diagnoseTime }}
          <br />开始时间：{{ i.leaveApplication.leaveStartDate }}
          <br />结束时间：{{ i.leaveApplication.leaveEndDate }}

          <va-card-actions align="stretch"
            style="justify-content: flex-end; /* 将按钮右对齐 */margin-right: 10px; /* 添加右侧间距 */">
            <va-button icon="clear" color="danger" class="mr-3 mb-2" @click="fail(i.leaveApplication.leaveNoteId)">
              驳回
            </va-button>
            <va-button icon-right="arrow_forward" icon-color="#ffffff50" class="mr-3 mb-2"
              @click="agree(i.leaveApplication.leaveNoteId)">
              同意
            </va-button>
          </va-card-actions>

        </va-card-content>
      </va-card>
    </el-drawer>

    <el-button type="primary" class="custom-button trapezoid-button" @click="openDrawer2()">
      <span class="vertical-text">在线复诊</span>
    </el-button>

    <el-drawer v-model="drawer2" title="I am the title" :with-header="false">
      <va-card v-for="(i, index) in treatmentChats" :key="index" style="margin-bottom: 30px;">
        <va-card-title>诊疗记录</va-card-title>
        <va-card-content>

          <!-- 患者信息和申请时间 -->
          <div class="patient-info">
            <div>
              <!-- 患者姓名和患者ID放在右下角 -->
              <div class="patient-info-item">
                患者姓名: {{ i.patientName }}
              </div>
              <div class="patient-info-item">
                患者ID: {{ i.patientID }}
              </div>
            </div>

          </div>

          <!-- 诊断信息 -->
          <br />诊断时间：{{ i.date.slice(0, 10) }}
          <!-- <br />就诊记录编号：{{ i.diagnoseId }} -->

          <va-card-actions align="stretch"
            style="justify-content: flex-end; /* 将按钮右对齐 */margin-right: 10px; /* 添加右侧间距 */">
            <va-button icon-right="info" icon-color="#ffffff90" class="mr-3 mb-2"
              @click="showChat(i.diagnoseId, i.patientID)" v-if="unreadPrompts[index]">
              解答
            </va-button>
          </va-card-actions>

        </va-card-content>
      </va-card>
    </el-drawer>

    <el-button type="primary" class="custom-button trapezoid-button" @click="drawer3 = true">
      <span class="vertical-text">门诊单模板</span>
    </el-button>

    <el-drawer v-model="drawer3" title="I am the title" :with-header="false">
      <el-button type="primary" class="custom-button trapezoid-button" v-for="(buttonText, index) in template"
        :key="index" @click="handle(index)">
        {{ buttonText }}
      </el-button>
    </el-drawer>
  </header>

  
  <va-modal v-model="chatShown" hide-default-actions="true">
    <div style="width: 500px; height: 600px;">
      <div style="overflow: auto; height: 80%;">
        <div class="chat-box">
          <table class="chat-box" style="margin-left: 5%; height: 70%; width: 90%;">
            <tr v-for="(message, index) in chatMessages" :key="index">
              <div :class="{'chatBox': true, 'chatBox-left': message.senderType === 0, 'chatBox-right': message.senderType !== 0}">
                <td>
                  {{ message.message }}
                </td>
              </div> 
              <br>       
            </tr>
          </table>
        </div>
      </div>
      <va-input v-model="newMessage" class="mb-6" type="textarea" :min-rows="3" :max-rows="3" style="width:100%;">

      </va-input>
      <va-button style="width: 100%;" @click="sendMessage()">
        发送
      </va-button>
    </div>
  </va-modal>

  <div class=" main">
    <div id="registe">
      <div style="text-align: center; margin-top: 70px; margin-bottom: 30px">
        <label id="title"> 患者挂号信息 </label>
      </div>
      <div>这里：{{ test }}</div>
      <div style="text-align: left">
        <va-scroll-container id="register" class="max-h-52" vertical>
          <va-list>
            <va-list-item v-for="(pt, index) in patients" :key="index" :id="'item' + index" gradient="true"
              class="list__item">
              <va-list-item-section avatar>
                <va-avatar>
                  <img src="../../assets/patient.png" alt="" />
                </va-avatar>
              </va-list-item-section>

              <va-list-item-section>
                <va-list-item-label>
                  {{ pt.number }}号：{{ pt.name }}
                </va-list-item-label>

                <va-list-item-section>
                  {{ pt.treatmentState }}
                </va-list-item-section>
              </va-list-item-section>
            </va-list-item>
          </va-list>
        </va-scroll-container>
        <div style="text-align: center">
          <va-button id="re-button" preset="primary" class="mr-6 mb-2" @click="nextPatient()">
            叫号
          </va-button>
        </div>
      </div>
    </div>

    <div class="diagnostic">
      <h1 class="myh1">同济大学校医院门诊病历</h1>
      <label>内科 日期</label>
      <table id="info">
        <tr>
          <td>姓名：{{ name }}</td>
          <td>性别：{{ gender }}</td>
          <td>年龄：{{ age }}</td>
        </tr>
        <tr>
          <td>卡号：{{ ID }}</td>
          <td>电话：{{ contact }}</td>
          <td>辅导员：{{ counsellor }}</td>
        </tr>
        <tr>
          <td>初诊/复诊：</td>
          <va-button @click="getHistory()" type="submit" preset="primary" class="mt-3">
            获得就诊历史
          </va-button>
          <td>
            <va-button @click="showModal = !showModal">
              查看就诊历史
            </va-button>
          </td>
          <va-modal v-model="showModal" fullscreen :message="message" hide-default-actions>
            <div class="diagnose">
              <h1 class="myh1">同济大学校医院病人就诊历史</h1>
              <label>日期：{{ his_rep.records[p].record.diagnoseTime }} </label>
              <table id="info">
                <tr>
                  <td>姓名：{{ his_rep.patientInfo.name }}</td>
                  <td>性别：{{ his_rep.patientInfo.gender }}</td>
                  <td>年龄：{{ his_rep.patientInfo.birthDate }}</td>
                </tr>
                <tr>
                  <td>卡号：{{ his_rep.patientInfo.patientId }}</td>
                  <td>
                    科室：{{ his_rep.records[p].doctor.secondaryDepartment }}
                  </td>
                  <td>医生：{{ his_rep.records[p].doctor.name }}</td>
                </tr>
                <div>
                  主诉：{{ his_rep.records[p].record.selfreported }}
                  <br /><br />现病史：
                  {{ his_rep.records[p].record.presenthis }}
                  <br /><br />既往史：
                  {{ his_rep.records[p].record.anamnesis }} <br /><br />体征：{{
                    his_rep.records[p].record.sign
                  }}
                  <br /><br />门诊诊断：
                  {{ his_rep.records[p].record.clinicdia }}
                  <br /><br />诊疗建议: {{ his_rep.records[p].record.advice }}
                  <br /><br />处方：
                </div>
                <div class="example-pagination-block">
                  <el-pagination @current-change="changeReport" layout="prev, pager, next" :total="total_p" />
                </div>
              </table>
              <label> </label>
            </div>
          </va-modal>
        </tr>
      </table>
      <va-form class="w-[300px]" tag="form" @submit.prevent="enter">
        主诉：
        <input type="text" v-model="problem" name="firstname" placeholder="请输入" />
        <br /><br />现病史：
        <input type="text" v-model="illness" name="firstname" placeholder="请输入" />
        <br /><br />既往史：
        <input type="text" v-model="past_illness" name="firstname" placeholder="请输入" />
        <br /><br />体征：<input type="text" v-model="symptom" name="firstname" placeholder="请输入" />
        <br /><br />门诊诊断：
        <input type="text" v-model="diagnose" name="firstname" placeholder="请输入" />
        <br /><br />诊疗建议:
        <input type="text" v-model="prescription" name="firstname" placeholder="请输入" />
        <br /><br />处方:

        <el-select v-model="select_medi" @change="selectMedicine()" filterable placeholder="从药品库中选择药品">
          <el-option v-for="(item, index) in stocks" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
        <el-table :data="medicine" stripe style="width: 100%" max-height="500">
          <el-table-column prop="name" label="药品" width="80">
          </el-table-column>
          <el-table-column prop="spec" label="规格" width="80">
          </el-table-column>
          <el-table-column label="单次剂量" width="120">
            <template #default="scope">
              <input class="input2" type="text" v-model="all_med[scope.$index].single" name="firstname" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="用法" width="70">
            <template #default="scope">
              <input class="input2" type="text" v-model="all_med[scope.$index].ad" name="firstname" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="频率" width="100">
            <template #default="scope">
              <input class="input2" type="text" v-model="all_med[scope.$index].fre" name="firstname" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="数量" width="110">
            <template #default="scope">
              <el-input-number v-model="all_med[scope.$index].count" :min="1" :max="30" size="large"
                controls-position="right" style="width: 70px"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="注意事项" width="140">
            <template #default="scope">
              <input class="input2" type="text" v-model="all_med[scope.$index].tips" name="firstname" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="编辑" width="80">
            <template #default="scope">
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        同意开具假条天数为：<el-input-number v-model="leave_day" class="mx-4" />

        <!-- <va-button @click="showModal2 = !showModal2">
                    确认处方
                </va-button>

                <va-modal v-model="showModal2" ok-text="Apply">
                    <h3 class="va-h3">
                        您是否确认提交现有处方，请注意处方一旦提交不能更改
                    </h3>
                    <va-button id="re-button" type="submit" preset="primary" class="mt-3">
                        确认
                    </va-button>
                </va-modal> -->
        <br />
        <va-button id="re-button" type="submit" preset="primary" class="mt-3">
          确认
        </va-button>
      </va-form>
    </div>

    <div id="cebian">
    </div>


  </div>
</template>


<script>
import axios from "axios";
import { reactive } from "vue";
//import userInfo from "../../store/user.js";
import DoctorInfo from "../../components/Info/DoctorInfo.vue";

export default {
  name: "App",
  data() {
    return {

      // zzh添加：
      // 该医生进行过的所有诊断记录
      treatmentRecords: [],
      // 复诊聊天记录列表
      treatmentChats: [],
      // 暂存当前复诊聊天记录
      chatMessages: [],
      newMessage: "",
      chatShown: false,

      curPatientId: "",
      // 提示有新消息的红点状态
      unreadPrompts: [],

      patients: [],
      value: "请输入",
      //病人信息
      period: 0,
      name: "",
      gender: "",
      age: "",
      ID: "",
      contact: "",
      counsellor: "",
      num: 0, //当前就诊患者的序号
      doctorId: sessionStorage.getItem('userID'),
      //doctorId: userInfo.state.userID,
      dept: "普通外科",

      //处方药品
      all_medicine: [], //存储药房中所有药品,包含medicineName和specification属性
      stocks: [], //在checkbox中选择药品，存储所有药品的全称
      medicine: [], //辅助在表格前端显示，只有name和spec两个属性
      all_num: 0, //现在已有药品数量
      select_medi: "",

      //就诊单
      problem: "",
      illness: "",
      past_illness: "",
      symptom: "",
      diagnose: "",
      prescription: "",

      //就诊历史
      his_rep: {},
      showModal: false,
      showModal2: false,
      p: 0, //当前显示的就诊历史页面
      total_p: 0, //就诊历史总页面数量

      //病假信息
      leave_app: [],
      leave_day: 0,
      drawer: false,
      drawer2: false,
      drawer3: false,

      //处方模板
      template: ["感冒", "浅表性胃炎"],
      content: [{
        "problem": "喉咙痛，流鼻涕，打喷嚏，咳嗽，轻微头疼",
        "illness": "无",
        "past_illness": "体健",
        "symptom": "喉咙红，体温",
        "diagnose": "感冒",
        "prescription": "注意休息、多喝水,维持良好的卫生习惯，或者出现其他严重症状（如高烧、呼吸急促、胸痛等）及时复诊",
        "medicine": ["清开灵颗粒", "板蓝根颗粒"],
      },
      {
        "problem": "胀气，腹部紧张，打嗝频繁",
        "illness": "无",
        "past_illness": "体健",
        "symptom": "无",
        "diagnose": "胃胀",
        "prescription": "多吃蔬菜，少喝碳酸饮料，少食多餐，避免吞气",
        "medicine": ["酪酸梭菌活菌胶囊"],
      },
      ]
    };
  },
  components: {
    DoctorInfo,
  },
  setup() {
    let med = [];
    for (let i = 0; i < 15; i++) {
      let one_med = {
        name: "",
        spec: "", //药品规格
        single: "", //药品一次剂量
        ad: "", //药品用法
        fre: "", //使用频率
        count: 1, //药品数量
        tips: "", //注意事项
      };
      med.push(one_med);
    }
    let all_med = reactive(med);

    return {
      all_med, //处方中所有的药品和药品属性
    };
  },

  mounted() {
    this.initial(); //初始化
  },
  methods: {
    async openDrawer2() {
      this.drawer2 = true;
      //获得诊断历史
      const url4 = "http://124.223.143.21/Registration/GetPatientInfoByDoctorID/" + this.doctorId;
      var requestOptions4 = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url4, requestOptions4);
        const result = await response.json();
        this.treatmentRecords = result;
        // console.log(this.treatmentRecords, "record", this.treatmentRecords.length);
      } catch (error) {
        console.log("error", error);
      }

      for (let i = 0; i < this.treatmentRecords.length; i++) {
        this.unreadPrompts[i] = false;

        this.treatmentRecords[i].diagnoseId = `${this.treatmentRecords[i].appointmentDate.replace('-', '').split('T')[0].replace('-', '')}${this.treatmentRecords[i].patientID}${this.doctorId}${this.treatmentRecords[i].period}`;
        // this.getMessages(this.treatmentRecords[i].diagnoseId);

        const url = "http://124.223.143.21/api/Chatrecord/getChatRecord?RecordId=" + this.treatmentRecords[i].diagnoseId;
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        this.chatMessages = [];
        try {
          const response = await fetch(url, requestOptions);
          const result = await response.json();
          for (let i = 0; i < result.length; i++) {
            this.chatMessages.push(result[i]);
          }
        } catch (error) {
          console.log("error", error);
        }
        // console.log(this.chatMessages.length, "len");
        if (this.chatMessages.length !== 0) {
          if (this.chatMessages[this.chatMessages.length - 1].senderType == 0 
            && this.chatMessages[this.chatMessages.length - 1].readStatus == 0) {// 最后一条信息未读且为患者发送
            this.unreadPrompts[i] = true;
            console.log(this.chatMessages);
          }
        }          
        this.treatmentChats.push({date: this.treatmentRecords[i].appointmentDate, patientID: this.treatmentRecords[i].patientID, 
          patientName: this.treatmentRecords[i].patientName, period: this.treatmentRecords[i].period, diagnoseId: this.treatmentRecords[i].diagnoseId});
      }
    },

    time(inputString) {
      if (typeof inputString !== 'string' || inputString.length === 0) {
        return ''; // 如果输入为空或不是字符串，则返回空字符串
      }

      return inputString.slice(0, 10);
    },

    //初始化
    async initial() {
      //获取医生id
      console.log(this.doctorId);
      //初始化今日挂号病人
      let api =
        "http://124.223.143.21:4999/Registration/commit?doctorId=" +
        this.doctorId;
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
          this.patients.push(data[i].patient);
          this.patients[i].number = i;
          this.patients[i].treatmentState = "已挂号";
          this.patients[i].period = data[i].period;
        }
      } catch (error) {
        console.error("Error:", error);
      }
      //初始化药品,获得药品名称和药品规格
      const url = "http://124.223.143.21/api/Medicine/GetAllMedicinesInfo";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.all_medicine = data;
        for (let i = 0; i < data.length; i++) {
          this.stocks.push(data[i].medicineName);
        }
      } catch (error) {
        console.error("Error:", error);
      }

      //获得病假申请
      const url3 = "http://124.223.143.21/api/Leave/GetLeaveApplicationsByDoctor?doctorId=" + this.doctorId;
      var requestOptions3 = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url3, requestOptions3);
        const result = await response.json();
        this.leave_app = result;
      } catch (error) {
        console.log("error", error);
      }
      for (let i = 0; i < this.leave_app.length; i++) {
        this.leave_app[i].leaveApplication.leaveApplicationTime = this.time(this.leave_app[i].leaveApplication.leaveApplicationTime);
        this.leave_app[i].leaveApplication.leaveStartDate = this.time(this.leave_app[i].leaveApplication.leaveStartDate);
        this.leave_app[i].leaveApplication.leaveEndDate = this.time(this.leave_app[i].leaveApplication.leaveEndDate);
        this.leave_app[i].treatmentRecord.diagnoseTime = this.time(this.leave_app[i].treatmentRecord.diagnoseTime);
      }
      //获得诊断历史
      const url4 = "http://124.223.143.21/Registration/GetPatientInfoByDoctorID/" + this.doctorId;
      var requestOptions4 = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url4, requestOptions4);
        const result = await response.json();
        this.treatmentRecords = result;
        // console.log(this.treatmentRecords, "record", this.treatmentRecords.length);
      } catch (error) {
        console.log("error", error);
      }

      for (let i = 0; i < this.treatmentRecords.length; i++) {
        this.unreadPrompts[i] = false;

        this.treatmentRecords[i].diagnoseId = `${this.treatmentRecords[i].appointmentDate.replace('-', '').split('T')[0].replace('-', '')}${this.treatmentRecords[i].patientID}${this.doctorId}${this.treatmentRecords[i].period}`;
        // this.getMessages(this.treatmentRecords[i].diagnoseId);

        const url = "http://124.223.143.21/api/Chatrecord/getChatRecord?RecordId=" + this.treatmentRecords[i].diagnoseId;
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        this.chatMessages = [];
        try {
          const response = await fetch(url, requestOptions);
          const result = await response.json();
          for (let i = 0; i < result.length; i++) {
            this.chatMessages.push(result[i]);
          }
        } catch (error) {
          console.log("error", error);
        }
        // console.log(this.chatMessages.length, "len");
        if (this.chatMessages.length !== 0) {
          if (this.chatMessages[this.chatMessages.length - 1].senderType == 0 
            && this.chatMessages[this.chatMessages.length - 1].readStatus == 0) {// 最后一条信息未读且为患者发送
            this.unreadPrompts[i] = true;
            console.log(this.chatMessages);
          }
        }          
        this.treatmentChats.push({date: this.treatmentRecords[i].appointmentDate, patientID: this.treatmentRecords[i].patientID, 
          patientName: this.treatmentRecords[i].patientName, period: this.treatmentRecords[i].period, diagnoseId: this.treatmentRecords[i].diagnoseId});
      }
    },

    async showChat(id, patientId) {
      this.chatShown = true;
      this.curRecordId = id;
      this.curPatientId = patientId;
      this.getMessages(id);
      // for (let i = 0; i < this.treatmentChats.length; i++) {
      //   if (this.treatmentChats[i].diagnoseId === id) {
      //     this.unreadPrompts[i] = false;
      //   }
      // }
      // console.log("Yes");
      // console.log(this.chatMessages);
    },

    async getMessages(recordId) {       
      this.chatMessages = [];

      const url = "http://124.223.143.21/api/Chatrecord/getChatRecord?RecordId=" + recordId;
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        for (let i = 0; i < result.length; i++) {
          this.chatMessages.push(result[i]);
        }
      } catch (error) {
        console.log("error", error);
      }

      // axios.get("http://124.223.143.21/api/Chatrecord/getChatRecord?", {
      //   params: {
      //     RecordId: recordId,
      //   },
      // })
      //   .then((response) => {
      //     // console.log(response);
      //     for (let i = 0; i < response.data.length; i++) {
      //       this.chatMessages.push(response.data[i]);
      //     }
      //     // console.log(this.chatMessages, "abc", this.chatMessages.length);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },

    async sendMessage() {
      // console.log(this.chatMessages);
      if (this.newMessage == "") {
        alert("不能发送空白消息！");
        return;
      }
      this.chatMessages.push({message: this.newMessage, senderType: 1});

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "recordId": this.curRecordId,
        "doctorId": this.doctorId,
        "patientId": this.curPatientId,
        "message": this.newMessage,
        "senderType": 1,
        "timeStamp": new Date().toISOString(),
        "readStatus": 0
      });
      console.log(raw);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://124.223.143.21/api/Chatrecord/addChatRecord", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
          axios.post("", this.newMessage)
        .then(response => {
          console.warn(response);
          this.getMessages(this.curRecordId);
          this.newMessage = "";
        }) 
        .catch(error => {
          console.log(error);
          this.newMessage = "";
        });
    },

    //叫号
    async nextPatient() {
      let i = this.num + 1; //当前就诊患者序号
      //判断今日所有病人是否已经就诊完成
      if (i === this.patients.length + 1) {
        return;
      }
      this.num = i;

      //改变就诊列表
      let j = i - 1;
      const item = document.getElementById("item" + j);
      item.style.color = "red";

      //显示当前就诊病人信息
      i = i - 1;
      this.name = this.patients[i].name;
      if (this.patients[i].gender) {
        //gender是true则为男
        this.gender = "男";
      } else {
        this.gender = "女";
      }
      const originalString = this.patients[i].birthDate;
      const extractedSubstring = originalString.substring(0, 4);
      const extractedNumber = parseInt(extractedSubstring);
      this.age = 2023 - extractedNumber;
      this.contact = this.patients[i].contact;
      this.counsellor = this.patients[i].counsellor;
      this.ID = this.patients[i].patientId;
      this.period = this.patients[i].period;
      console.log(this.patients[i].period);
    },

    //添加药品
    selectMedicine() {
      this.all_num = this.all_num + 1; //增加现有药品数量
      //避免药品重复
      let name = this.select_medi;
      const r = this.medicine.find((item) => item.name === this.select_medi);
      if (r !== undefined) {
        return;
      }

      //foundElement是当前选中的药品,属性和数据库中一样
      let foundElement = null;
      for (let i = 0; i < this.all_medicine.length; i++) {
        if (this.all_medicine[i].medicineName === name) {
          foundElement = this.all_medicine[i];
          break;
        }
      }

      //将药品的所有属性添加进all_med
      this.all_med[this.all_num - 1].name = foundElement.medicineName;
      this.all_med[this.all_num - 1].spec = foundElement.specification;
      this.all_med[this.all_num - 1].single = foundElement.singledose;
      this.all_med[this.all_num - 1].ad = foundElement.administration;
      this.all_med[this.all_num - 1].tips = foundElement.attention;
      this.all_med[this.all_num - 1].fre = foundElement.frequency;

      //在medicine中添加药品
      let a = {
        name: foundElement.medicineName,
        spec: foundElement.specification,
      };
      this.medicine.push(a);
    },

    //删除一个药品
    handleDelete(index) {
      // 将要删除的药品与最后一个药品交换
      let temp = this.medicine[index];
      this.medicine[index] = this.medicine[this.medicine.length - 1];
      this.medicine[this.medicine.length - 1] = temp;

      let temp2 = this.all_med[index];
      this.all_med[index] = this.all_med[this.medicine.length - 1];
      this.all_med[this.medicine.length - 1] = temp2;

      //删除最后一个药品
      this.medicine.pop();
      this.all_med[this.all_num - 1].name = "";
      this.all_med[this.all_num - 1].spec = "";
      this.all_med[this.all_num - 1].single = "";
      this.all_med[this.all_num - 1].ad = "";
      this.all_med[this.all_num - 1].fre = "";
      this.all_med[this.all_num - 1].count = 1;
      this.all_med[this.all_num - 1].tips = "";

      this.all_num = this.all_num - 1;

      console.log(this.medicine);
    },

    //确认处方
    enter() {    //一旦已经就诊就无法再次发送处方
      //把正在就诊的病人状态改为已就诊
      //this.patients[this.num - 1].treatmentState = "已就诊";

      // //向后端发送已经就诊的病人和对应的医生id
      // var requestOptions = {
      //     method: 'POST',
      //     redirect: 'follow'
      // };
      // const url = "http://124.223.143.21/api/Confirm?doctorId=23002&patientId=" + this.patients[this.num - 1].patientId;
      // fetch(url, requestOptions)
      //     .then(response => response.text())
      //     .then(result => console.log(result))
      //     .catch(error => console.log('error', error));

      //向后端发送就诊单
      // let a = ""; //处方信息
      // for (let i = 0; i < this.all_num; i++) {
      //     a = a + this.all_med[i].name + "+" + this.all_med[i].spec + "#" + this.all_med[i].single + "@" + this.all_med[i].ad;
      //     a = a + "!" + this.all_med[i].fre + "$" + this.all_med[i].count + "%" + this.all_med[i].tips + ";";
      // }
      let a = "";
      for (let i = 0; i < this.all_num; i++) {
        a =
          a +
          this.all_med[i].name +
          "*" +
          this.all_med[i].count +
          "+" +
          this.all_med[i].fre +
          "#" +
          this.all_med[i].tips +
          ";";
      }
      let data = {
        patientId: this.patients[this.num - 1].patientId,
        doctorId: this.doctorId.toString(),
        period: this.period,
        selfReported: this.problem,
        presentHis: this.illness,
        anamnesis: this.past_illness,
        sign: this.symptom,
        clinicDia: this.diagnose,
        advice: this.prescription,
        medicine: a,
      };
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(data);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("http://124.223.143.21/api/Confirm", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      console.log(data);
    },

    //得到就诊历史
    async getHistory() {
      const url =
        "http://124.223.143.21/api/DiagnosedHistory/GetDetailPre?patientId=" +
        this.patients[this.num - 1].patientId;
      //const testurl="http://124.223.143.21/api/DiagnosedHistory/GetDetailPre?patientId=2151895"
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        this.his_rep = result;
      } catch (error) {
        console.log("error", error);
      }
      //数据修正
      if (this.his_rep.patientInfo.gender) {
        this.his_rep.patientInfo.gender = "男";
      } else {
        this.his_rep.patientInfo.gender = "女";
      }
      const birthDate = this.his_rep.patientInfo.birthDate;
      const yearSubstring = birthDate.substring(0, 4); // 提取前四位子串
      const yearAsNumber = parseInt(yearSubstring); // 转换为数字
      const age = 2023 - yearAsNumber;
      this.his_rep.patientInfo.birthDate = age;

      for (let i = 0; i < this.his_rep.records.length; i++) {
        const diagnoseTime = this.his_rep.records[i].record.diagnoseTime;
        const shortenedTime = diagnoseTime.substring(0, 10); // 提取前10位子串
        this.his_rep.records[i].record.diagnoseTime = shortenedTime;
      }

      this.total_p = this.his_rep.records.length * 10;

      console.log(this.his_rep);

      //发送假条数据
      var requestOptions2 = {
        method: 'POST',
        redirect: 'follow'
      };
      const url2 = "http://124.223.143.21/api/Leave/Offline?patientId=" + this.patientId + "&doctorId=" + this.doctorId + "&period=" + this.period + "&leaveDays=" + this.leave_day;

      fetch(url2, requestOptions2)
        .then(response => { console.log(response); return response.text(); })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    },

    //就诊历史翻页
    changeReport(np) {
      //np是newpage
      this.p = np - 1;
    },

    //同意或反对病假申请
    agree(id) {
      var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      };
      console.log(id);
      const url = "http://124.223.143.21/api/Leave/ratify?leaveNoteId=" + id + "&status=1";
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      this.leave_app.shift();
    },
    fail(id) {
      var requestOptions = {
        method: 'PUT',
        redirect: 'follow'
      };
      const url = "http://124.223.143.21/api/Leave/ratify?leaveNoteId=" + id + "&status=0";
      fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      this.leave_app.shift();
    },

    //假条模板
    handle(index) {
      for (let j = 0; j < 15; j++) {
        this.all_med[j].name = "";
        this.all_med[j].spec = "";
        this.all_med[j].single = "";
        this.all_med[j].ad = "";
        this.all_med[j].tips = "";
        this.all_med[j].fre = "";
      }
      console.log(this.medicine.length);
      while (this.medicine.length > 0) {
        this.medicine.pop();
      }
      console.log(this.medicine.length);

      this.problem = this.content[index].problem;
      this.illness = this.content[index].illness;
      this.past_illness = this.content[index].past_illness;
      this.symptom = this.content[index].symptom;
      this.diagnose = this.content[index].diagnose;
      this.prescription = this.content[index].prescription;
      this.all_num = this.content[index].medicine.length;

      let foundElement = null;
      for (let j = 0; j < this.all_num; j++) {
        let name = this.content[index].medicine[j];
        //foundElement是当前选中的药品
        for (let i = 0; i < this.all_medicine.length; i++) {
          if (this.all_medicine[i].medicineName === name) {
            foundElement = this.all_medicine[i];
            break;
          }
        }
        let a = {
          "name": foundElement.medicineName,
          "spec": foundElement.specification
        };
        this.medicine.push(a);
        this.all_med[j].name = foundElement.medicineName;
        this.all_med[j].spec = foundElement.specification;
        this.all_med[j].single = foundElement.singledose;
        this.all_med[j].ad = foundElement.administration;
        this.all_med[j].tips = foundElement.attention;
        this.all_med[j].fre = foundElement.frequency;
      }

      console.log(index);
    }
  },
};
</script>
  
