<template>
  <template>
    <va-modal v-model="showModal" ok-text="确认" cancel-text="取消">
      <p></p>
      <p>
        {{ alertText }}
      </p>
    </va-modal>
  </template>

  <div id="main-page">
    <div style="margin:5px;font-size: xx-large;font-weight: bold;"><span>扫码报到</span></div>
    <div style="margin:50px;"><va-input outline placeholder="扫码输入" class="mb-6" id="scannedData"
        v-model="scannedDataInput" @keydown.enter="sendData()" /></div>
    <div class="my-8"><va-divider /></div>
    <div style="margin:20px;font-size: xx-large;font-weight: bold;"><span>手动报到</span></div>
    <div style="margin:50px;"><va-input outline placeholder="请输入患者ID" class="mb-6" id="studentid"
        v-model="patientId" /><va-button @click="FetchData()">search</va-button></div>

    <div>
      <el-table v-if="CheckinInfo.length > 0" :data="CheckinInfo" style="width: 100%" max-height="400">
        <el-table-column fixed prop="patientName" label="患者姓名" width="150" />
        <el-table-column prop="doctorName" label="就诊医生姓名" width="150" />
        <el-table-column prop="doctorDepartment" label="就诊科室" width="150" />
        <el-table-column prop="appointmentDate" label="预约日期" width="180" />
        <el-table-column prop="period" label="预约时间段" width="180" />
        <el-table-column prop="registrationFee" label="挂号费" width="80" />

        <el-table-column prop="checkin" label="状态" width="100">
            <template #default="scope">
              <el-tag :type="scope.row.checkin === '未报到' ? 'danger' : ''">{{ scope.row.checkin }}</el-tag>
            </template>
          </el-table-column>
          
        <el-table-column fixed="right" label="点击报到" width="100">
          <template #default="scope">
            <el-button type="primary" size="small" @click.prevent="manual(scope.$index)">
              报到
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div v-else>
        <!-- 显示表头或其他提示 -->
        <el-table style="width: 100%">
          <!-- 表格列配置 -->
          <el-table-column fixed prop="patientName" label="患者姓名" width="120" />
          <el-table-column prop="doctorName" label="就诊医生姓名" width="120" />
          <el-table-column prop="doctorDepartment" label="就诊科室" width="120" />
          <el-table-column prop="appointmentDate" label="预约日期" width="120" />
          <el-table-column prop="period" label="预约时间段" width="120" />
          <el-table-column prop="registrationFee" label="挂号费" width="80" />
          <el-table-column prop="checkin" label="状态" width="100"/>
            
          
          <el-table-column fixed="right" label="点击报到" width="100">
            
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      scannedDataInput: '', // 用于绑定输入框的数据
      patientId: '',
      CheckinInfo: [],
      uploadSuccess: false, // 控制是否显示上传成功消息
      showModal: false,
      alertText: '', // 用于显示提示消息
    };
  },
  methods: {

    //自动扫码挂号
    sendData() {

      const scannedData = this.scannedDataInput;
      console.log(scannedData);

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
          .put("http://124.223.143.21/api/Registration/Checkin", data)
          .then((response) => {
            this.alertText = "报到成功！" + "时间：" + time + " " + response.data;
            this.uploadSuccess = true;
            console.log('报到成功');

            this.showModal = true;

          })
          .catch(function (error) {
            alert("报到失败！");
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
    },
    
    //获取今日对应id用户的全部挂号信息
    FetchData() {
      // 发送请求
      axios
        .get("http://124.223.143.21/api/Registration/OfflineCheckin?", {
          params: {
            patientId: this.patientId,
          },
        })
        .then((response) => { // 使用箭头函数
          this.CheckinInfo = [];
          console.log(response.data[1]);
          for (let i = 0; i < response.data.length; ++i) { // 修改这里的response.data.length
            const checkinStatus = response.data[i].checkin === 1 ? '已报到' : (response.data[i].checkin === 0 ? '未报到' : '其他状态'); // 其他状态可自行定义
            const periodValue = response.data[i].period;
            let periodText = '';
            switch (periodValue) {
              case 1:
                periodText = '8:00-9:00';
                break;
              case 2:
                periodText = '9:00-10:00';
                break;
              // 添加其他 period 值的映射
              case 3:
                periodText = '10:00-11:00';
                break;
              case 4:
                periodText = '13:00-14:00';
                break;
              case 5:
                periodText = '14:00-15:00';
                break;
              case 6:
                periodText = '15:00-16:00';
                break;
              case 7:
                periodText = '16:00-17:00';
                break;

              default:
                periodText = '未知时间段';
                break;
            }
            this.CheckinInfo.push({
              "patientName": response.data[i].patientName,
              "doctorName": response.data[i].doctorName,
              "doctorDepartment": response.data[i].doctorDepartment,
              "appointmentDate": response.data[i].appointmentDate.substring(0, 10),
              "period": periodText,
              "registrationFee": response.data[i].registrationFee,
              "checkin": checkinStatus,
              "doctorId":response.data[i].doctorId,
            });
          }
          console.log(this.CheckinInfo);
        })
        .catch(function (error) {
          console.error(error);
        });

    },
 
    //手动报到
    manual(index) {
      console.log(this.CheckinInfo[index]);
      // 构建请求数据对象
      let periodText = this.CheckinInfo[index].period
      let period=0;
      switch (periodText) {
        case '8:00-9:00':
          period = 1;
          break;
        case '9:00-10:00':
          period = 2;
          break;
        case '10:00-11:00':
          period = 3;
          break;
        case '13:00-14:00':
          period = 4;
          break;
        case '14:00-15:00':
          period = 5;
          break;
        case '15:00-16:00':
          period = 6;
          break;
        case '16:00-17:00':
          period = 7;
          break;

        default:
          periodText = '未知时间段';
          break;
      }
      const data = {
        patientId: this.patientId,
        doctorId: this.CheckinInfo[index].doctorId,
        time: this.CheckinInfo[index].appointmentDate,
        period:period,
      };
      console.log(data)

      // 发送请求
      axios
        .put("http://124.223.143.21/api/Registration/Checkin", data)
        .then((response) => {
          this.alertText = response.data + "！";
          this.uploadSuccess = true;
          console.log('报到成功');
          this.FetchData();

          this.showModal = true;
        })
        .catch(function (error) {
          alert("报到失败！");
          console.error("Error message:", error.message);
          if (error.message == "Network Error") return;
          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
          }
        });

    },
  },
});



</script>
<style scoped>
#main-page {
  margin-top: 5%;
}


.va-table-responsive {
  overflow: auto;
}
.el-tag--danger {
  background-color: red; /* 设置背景色为红色 */
  color: white; /* 设置文本颜色为白色 */
}

* {
  /* 应用字体 */
  font-family: AliRegular;
  --va-font-family: AliRegular;
}
</style>