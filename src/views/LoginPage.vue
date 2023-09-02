<template>
  <div class="logincontent">
    <div class="centered-text">济康同行</div>
    <div class="centered-text-2">Online Hospital Management System</div>
    <div class="login-box">
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login-form" label-position="left" label-width="80px">
        <h3 class="login-title">登录</h3>

        <el-form-item :prop="username" class="input-box" label="账号">
          <el-tooltip class="item" effect="dark" content="账号即为注册时的手机号码" placement="right">
            <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="请输入账号"></el-input>
          </el-tooltip>
        </el-form-item>

        <el-form-item :prop="password" class="input-box" label="密码">
          <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-radio-group v-model="roleCheckBox" size="small" class="radio-group">
          <el-radio-button class="radio-item" v-for="(role_text, role_index) in roles_text" :label="role_text" :key="role_index" @change="roleChange(role_index)" :class="{ 'is-active': role_index === role_num }">
            {{ role_text }}
          </el-radio-button>
        </el-radio-group>

        <div class="button-group">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="toRegister">注册</el-button>
        </div>

        <div class="bottom-actions">
          <el-radio v-model="isStayLogin" :label="true" @click.prevent="onRadioChange(true)">3天内自动登录</el-radio>
          <el-button type="text" @click="applyInsButtonClick">申请护理机构</el-button>
        </div>
      </el-form>
    </div>
    <div class="el-login-footer">
      <span>Copyright © 2018-2023 济康同行 All Rights Reserved.</span>
    </div>
  </div>
</template>

  <script>
  import axios from "axios";
  import { useRouter } from 'vue-router'
  import {useStore} from "vuex";
  import  userInfo from '../store/user.js'

  export default {
    name: "LoginPage",
    data() {
      return {
        router : useRouter(),
        store : useStore(),
        access_token: null,
        headers: {},

        //登录表单数据绑定
        loginForm: {
          username: "",
          password: "",
        },
        //表单的验证规则
        loginFormRules: {
          //验证用户ID是否合法
          username: [
            { required: true, message: "请输入账号", trigger: "blur" },
            {
              min: 11,
              max: 11,
              message: "用户账号必须是11位",
              trigger: "blur",
            },
          ],
          //    验证密码是否合法
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            {
              min: 1,
              max: 50,
              message: "密码必须在1-50个字符之间",
              trigger: "blur",
            },
          ],
          userToken: "",
        },
        //是否保持登录
        isStayLogin: false,
        //身份多选框文字
        roles_text: ["普通用户", "医生", "管理员"],
        role_checkBox: "普通用户",
        role_num: "0",
        administratorId: "23202",
      };
    },
    //回车登录操作
    created() {

    },
    methods: {
      login() {
          let LoginURL = ["PatientLogin", "DoctorLogin", "AdminLogin"]
          let AfterLogin = ['/home', '/doctor-operator', '/admin-layout']
          axios
          .get("http://124.223.143.21/api/Login/" + LoginURL[this.role_num] + "/", {
            params: {
              ID: this.loginForm.username,
              password: this.loginForm.password,
            },
          })
          .then(response => {
            console.log(response.data)
            if (response.data) {
              // 登录成功, 你可以做一些后续的处理，比如导航到其他页面等
              console.log("登录成功");
              this.router.push({
                path: AfterLogin[this.role_num],
              });

              //hcr更改，存储用户账号信息到user.js
              userInfo.state.userID=this.loginForm.username;
              userInfo.state.role=this.role_num;
            } else {
              // 登录失败
              console.error("登录失败");
            }
          })
          .catch(error => {
            console.error(error);
          });
      },

      toRegister() {
        this.router.push({
          path: '/register',
        });
      },

      roleChange(index) {
        this.role_num = index
        this.role_checkBox = this.roles_text[index];
        console.log(this.role_num)
        console.log(this.role_checkBox)
      }
    },
  };
  </script>

<style lang="less" scoped>

.logincontent {
  display: flex;
  flex-direction: column;
  background-image: url("../assets/login-background.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;

  width: 100%;
  height: 100%;
  min-width: 900px;
  min-height: 1000px;

  justify-content: center;
  align-items: center;
}
.centered-text {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 4em;
  font-weight: bold;
  z-index: 2;
}
.centered-text-2 {
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2em;
  font-weight: bold;
  z-index: 2;
  font-family: '楷体', KaiTi, sans-serif;
}
.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 400px;
  padding: 20px;
  margin: 50px auto;
  background-color: #f3f3f3;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .login-form {
    display: flex;
    flex-direction: column;

    .login-title {
      text-align: center;
      font-family: "Microsoft YaHei";
      font-weight: bold;
      font-size: 25px;
      color: #002FA7; /* Klein Blue */
      margin-bottom: 20px;
    }

    .input-box .el-input {
      border-radius: 5px;
      border-color: #002FA7; /* Klein Blue */
      &:hover {
        border-color: darken(#002FA7, 10%);
      }
    }

    .radio-group {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      .el-radio-button {
        border-color: #002FA7; /* Klein Blue */
        color: #002FA7; /* Klein Blue */
        &:hover {
          background-color: lighten(#002FA7, 10%);
        }
      }
      .el-radio-button.is-active {
        background-color: #002FA7; /* Klein Blue */
        border-color: #002FA7; /* Klein Blue */
        color: white;
      }

    }

    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .el-button {
        background-color: #002FA7; /* Klein Blue */
        border-color: #002FA7; /* Klein Blue */
        &:hover {
          background-color: darken(#002FA7, 10%);
          border-color: darken(#002FA7, 10%);
        }
      }
    }

    .bottom-actions {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;
    }
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>
