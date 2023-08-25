<template>
    <!-- img alt="Vue logo" src="./assets/logo.png"-->
    <va-navbar color=prime>
      <template #left>
        <va-navbar-item class="navbar-item-slot">
        </va-navbar-item>
      </template>
      <template #right>
        <va-navbar-item class="navbar-item-slot">
        </va-navbar-item>
      </template>
      <va-navbar-item class="navbar-item-slot">
      </va-navbar-item>
    </va-navbar>
  
    <div class="main">
      <div>
        <div style="text-align: center; margin-top:70px; margin-bottom:30px">
          <label id="title"> 患者挂号信息 </label>
        </div>
        <div style="text-align: left;">
          <va-scroll-container id="register" class="max-h-52" vertical>
            <va-list>
  
  
              <va-list-item v-for="(pt, index) in patients" :key="index" class="list__item">
                <va-list-item-section avatar>
                  <va-avatar>
                    <!--img :src="assets/patient.png" alt=""-->
                  </va-avatar>
                </va-list-item-section>
  
                <va-list-item-section>
                  <va-list-item-label>
                    {{ pt.number }}号：{{ pt.fullName }}
                  </va-list-item-label>
  
                  <va-list-item-section>
                    {{ pt.state }}
                  </va-list-item-section>
                </va-list-item-section>
              </va-list-item>
            </va-list>
          </va-scroll-container>
          <div style="text-align: center;">
          <va-button id="re-button" preset="primary" class="mr-6 mb-2" @click="nextPatient()">
            叫号
          </va-button>
          </div>
        </div>
      </div>
  
  
      <div id="diagnostic">
  
        <h1 class="myh1">同济大学校医院门诊病历</h1>
        <table id="info">
          <tr>
            <td>姓名：</td>
            <td>性别：</td>
            <td>年龄：</td>
          </tr>
          <tr>
            <td>电话：</td>
            <td>费别：</td>
            <td>监护人：</td>
          </tr>
        </table>
  
        主诉： <input type="text" name="firstname" placeholder="请输入">
        <br><br>现疾史： <input type="text" name="firstname" placeholder="请输入">
        <br><br>既往史： <input type="text" name="firstname" placeholder="请输入">
        <br><br>体征：<input type="text" name="firstname" placeholder="请输入">
        <br><br>诊断： <input type="text" name="firstname" placeholder="请输入">
        <br><br>处方: <input type="text" name="firstname" placeholder="请输入">
  
        <va-checkbox v-model="value" :label="label" />
  
      </div>
    </div>
  </template>
  
  
  <script>   
  export default {
    name: 'App',
    data() {
      return {
        patients: [
          { number: 1, fullName: "huang", state: "就诊完成" },
          { number: 2, fullName: "zhang", state: "就诊完成" },
          { number: 3, fullName: "huang", state: "正在就诊" },
          { number: 4, fullName: "zhang", state: "等待就诊" },
          { number: 5, fullName: "zhang", state: "等待就诊" },
          { number: 6, fullName: "huang", state: "等待就诊" },
          { number: 7, fullName: "zhang", state: "等待就诊" },
        ],
        value: "请输入",
        label: "是否打印假条"
      }
    },
    methods: {
      nextPatient() {
  
      },
    },
  }
  
  
  </script>
  
  <style scoped>
  .navbar-item-slot>a {
    border: 1px dashed var(--va-secondary);
    padding: 6px 10px;
    color: aliceblue
  }
  
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  
  
  /* 主元素*/
  .main {
    display: flex;
    flex-wrap: wrap;
    /*在容器内的子元素超出容器宽度时换行*/
    margin-left: 300px;
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
  
  
  .register #re-button {
    position: absolute;
    left: 20px;
  
  }
  
  .highlight {
    background-color: #89bcef;
    /* font-weight: bold; */
  }
  
  /*就诊单*/
  #diagnostic {
    float: right;
    width: 700px;
    height: 800px;
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
  </style>
  