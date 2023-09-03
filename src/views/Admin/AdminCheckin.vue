<template>
  <div id="main-page">
    <div style="margin:50px;font-size: xx-large;"><span>患者报到</span></div>
    <div style="margin:50px;"><input id="scannedData" v-model="scannedDataInput" @keydown.enter="sendData()" /></div>

  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      scannedDataInput: '', // 用于绑定输入框的数据
      uploadSuccess: false, // 控制是否显示上传成功消息
      alertText: '', // 用于显示提示消息
    };
  },
  methods: {
    sendData() {

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


        // 发送请求，以下内容就看你的函数怎么写，这里就怎么写了
        axios
          .put("http://124.223.143.21/Registration/Checkin", data)
          .then((response) => {
            this.alertText = "报到成功！" + "时间：" + time + " " + response.data;
            this.uploadSuccess = true;
            console.log('报到成功');
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
    /*sendData() {
        
        const scannedData = this.scannedDataInput;
        
        // 检查是否有扫描到数据
        if (scannedData) {
          
  
          // 构建请求数据对象
          const data = {
            "patientId":"2151678",
            "doctorId":"23004",
            "time":"2023-09-03",
            "period":2
          };
  
  
          // 发送请求，以下内容就看你的函数怎么写，这里就怎么写了
          axios
        .put("http://124.223.143.21/Registration/Checkin", data)
            .then((response) => {
              this.alertText = "报到成功！"+ "时间：" + " " + response.data;
              console.log('报到成功');
              this.uploadSuccess = true;
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
      },*/
  },
};

</script>
<style scoped>
#main-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#main-page>div {
  text-align: center;
}
</style>