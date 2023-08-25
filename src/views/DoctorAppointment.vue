
<template>
  <div id="mainPage" class="parent-box">
    <div class="hide">kongge</div>
    <div>
     
      <va-card color="primary" gradient class="parent-box">
      <img class="image-left" src="../assets/yuyue.png">

      <div class="text">
      <va-card-content>预约科室   {{ section }}</va-card-content>
      <va-card-content>同济大学校医院  {{doctor}}医生</va-card-content>
      </div>
      </va-card>
    </div>

   
    <div class="button-group">
    <va-button-toggle size="large" v-model="model" preset="secondary" border-color="primary" @click="fetchData(model)" :options="options"></va-button-toggle>
    </div>
    
  
    <va-button-group preset="primary" class="time">
    <button id="time1" class="time-slot" @click="onButtonClick(0)"><span style="margin-right: 100px;">8:00-9:00</span>{{number[0]}}/10</button>
    <button id="time2" class="time-slot" @click="onButtonClick(1)"><span style="margin-right: 100px;">9:00-10:00</span>{{number[1]}}/10</button>
    <button id="time3" class="time-slot" @click="onButtonClick(2)"><span style="margin-right: 100px;">10:00-11:00</span>{{number[2]}}/10</button>
    <button id="time4" class="time-slot" @click="onButtonClick(3)"><span style="margin-right: 100px;">13:00-14:00</span>{{number[3]}}/10</button>
    <button id="time5" class="time-slot" @click="onButtonClick(4)"><span style="margin-right: 100px;">14:00-15:00</span>{{number[4]}}/10</button>
    <button id="time6" class="time-slot" @click="onButtonClick(5)"><span style="margin-right: 100px;">15:00-16:00</span>{{number[5]}}/10</button>
    <button id="time7" class="time-slot" @click="onButtonClick(6)"><span style="margin-right: 100px;">16:00-17:00</span>{{number[6]}}/10</button>  
    </va-button-group>
    
    
  </div>
</template>

<script >
// import { sliderButtonEmits } from 'element-plus/es/components/slider/src/button';

 
  /*import axios from 'axios'*/
  export default {
    data() {
      return {
        currentDate: '',
        nextDates: [],
        fetchedData:[],
        number:[0,0,0,0,0,0,0],
        options:[],
        model:"two",
      };
    },
    mounted() {
      this.getCurrentDate();
      this.generateNextDates();
      this.options=this.options.concat(this.nextDates.map(date => ({ label: date, value: date })));
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
          const nextDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
          const day = nextDate.getDate();
          this.nextDates.push(String(day));
        }
      },
    
      onButtonClick(num) {
       this.$vaModal.confirm('你确定要预约当前时间段吗?')
        .then((ok) => {
          if (ok) {
            if (this.number[num] < 10) {
              // alert('预约成功');
              this.sendData();
            } else {
              alert('无可预约位置，预约失败');
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
  
        const formattedDate = `2023-07-${date}`;
        console.log(formattedDate);
  
        fetch(`http://124.223.143.21:4999/Registration?date=2023-07-13`)
          .then(response => response.json())
          .then(data => {
            self.fetchedData = data;
            console.log(self.fetchData);
            for (let i = 0; i < self.fetchedData.length; i++) {
              self.number[i] = self.fetchedData[i].Count;
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },

      /*sendData(){
          const newData = {
            patientId: "2151895",
            doctorId: "54321",
            appointmentTime: "2023-07-11T01:22:45.161Z",
            period: 3
          };
          axios.post('http://124.223.143.21:4999/Registration',newData,{
  headers: {
    'Content-Type': 'Access-Control-Allow-Origin' // 添加自定义的响应头
  }
})
            .then(function(response){
              console.log('成功插入数据',response.data);
            })
            .catch(function(error) {
               console.error('插入数据时出现错误:', error);
            }); 
        },*/
        sendData() {
            console.log("ID: "+this.$route.params.doctorId);
            const url = "http://124.223.143.21/Registration/regist";
            const data = {
              patientId: "2151895",
              doctorId: this.$route.params.doctorId,
              time: "2023-07-11",
              period: 3
            };
            const jsonData = JSON.stringify(data);
            console.log(JSON.stringify(data))
            fetch(url, {
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json',
                    
                },
                // body: JSON.stringify({ data: JSON.parse(jsonData) })
                body: jsonData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('HTTP error ' + response.status);
                    }
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.error('Error:', error);
                });
        }
    },
  };
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parent-box {
  width:100%;
  height:200px;
  
}
.image-left {
  width:140px;
  height:100px;
  
}
.text{
  font-weight: bold;
  font-size: larger;
}
.button-group{
  width: 100%; /* 设置按钮组的宽度为100% */
  display: flex;
  height: 50px; /* 设置按钮组的高度为50像素（可根据需要进行调整） */
  justify-content: center;
  align-items: center;
  margin:20px;
}
.button{
  width:100%
}
.hide{
  color:transparent
}
.time{
  width: 100%;
  display:flex;
  margin: 20px;
  flex-wrap: wrap; 
}
.time-slot{
  width: 45%;
  height: 65px;
  /*flex-basis: 50%;*/
  margin:20px;
  background-color:#f0f4f8;
  border-color: #89bcef;
  box-shadow: 0 0px 0px;
  font-size: large;
  font-weight: bold;
  color:#1a5a99
}

</style>

