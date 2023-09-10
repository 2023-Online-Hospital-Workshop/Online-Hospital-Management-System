<template>
  <div class="registercontent">
    <div class="centered-text">济康同行</div>
    <div class="centered-text-2">Online Hospital Management System</div>
    <div class="register-box">

      <div class="steps">
        <el-text style="color:#002fb0" @click="returnLogin">返回登录</el-text>
        <div class="circle" :class="{active: step === 1}" @click="changeStep(1)">1</div>
        <div class="circle" :class="{active: step === 2}" @click="changeStep(2)">2</div>
        <div class="circle" :class="{active: step === 3}" @click="changeStep(3)">2</div>
      </div>

      <el-form v-if="step === 1" ref="registerFormRef" :model="registerForm" label-position="left" label-width="80px">
        <el-form-item label="注册身份">
          <el-select v-model="registerForm.identity" placeholder="请选择注册身份类别" >
            <el-option label="普通用户" value="/resetPatientPassword"></el-option>
            <el-option label="医生" value="/resetDoctorPassword"></el-option>
            <el-option label="管理员" value="/resetAdminPassword"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="账号ID">
          <el-input type="flex" v-model="registerForm.ID" auto-complete="off" placeholder="请输入医生ID"></el-input>
        </el-form-item>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-form>

      <el-form v-if="step === 2" ref="registerFormRef" :model="registerForm" label-position="left" label-width="80px">
        <el-form-item label="手机号码">
          <el-input type="flex" v-model="registerForm.phoneNumber" auto-complete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-row type="flex" justify="space-between">
              <el-col :span="13">
                  <el-input type="text" v-model="registerForm.verificationCode" auto-complete="off" placeholder="请输入验证码" class="short-input"></el-input>
              </el-col>
              <el-col :span="11">
                <el-text type="text" @click="sendVerificationCode" class="verification-btn" ref="verificationBtn" :style="{ color: countdown > 0 ? '#89A9FB' : '#002FA7' }">
                  {{ countdown > 0 ? `${countdown}s 后重试` : '发送验证码' }}
                </el-text>
              </el-col>
          </el-row>
        </el-form-item>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-form>

      <el-form v-if="step === 3" ref="registerFormRef" :model="registerForm" label-position="left" label-width="100px">
        <!-- Other form items here -->
        <el-form-item label="请输入密码">
          <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="请重复密码">
          <el-input type="password" v-model="registerForm.password2" auto-complete="off" placeholder="请重复输入密码"></el-input>
        </el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form>

    </div>
    <div class="el-login-footer">
      <span>Copyright © 2018-2023 济康同行 All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {useRouter} from "vue-router";

export default {
  name: "ForgetPassword",
  data() {
    return {
      router: useRouter(),
      step: 1,
      countdown: 0,
      registerForm: {
        phoneNumber: '',
        verificationCode: '',
        password: '',
        password2: '',
        ID: '',
        identity: '/resetPatientPassword',
      }
    }
  },
  methods: {
    returnLogin() {
      this.router.push({
        path: '/',
      });
    },

    changeStep(step) {
      if (this.step >= step) {
        this.step = step
      }
    },
    nextStep() {
      if (this.step == 1) {
        if (this.registerForm.ID == '') {
          this.$msgbox.alert("ID不能为空").catch(e => {
              console.error("Error with message box:", e);
          });
        } else {
          this.step++;
        }
      }
      else if (this.step == 2) {
        console.log(this.registerForm.phoneNumber.toString())
        console.log(this.registerForm.verificationCode.toString())
        axios
        .get("http://124.223.143.21:4999/api/Login/verifyCode", {
              params: {
                PhoneNumber: this.registerForm.phoneNumber.toString(),
                Code: this.registerForm.verificationCode.toString(),
              },
            })
        .then(response => {
          console.log(response.data)
          if (response.data) {
            // 登录成功, 可以做一些后续的处理，比如导航到其他页面等
            this.$message.success('验证通过');
            this.step++;
          } else {
            // 登录失败
            this.$message.error('验证失败');
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    },
    submitForm() {
      // Implement form submission here
      console.log(this.registerForm);
      if (this.registerForm.password == this.registerForm.password2) {
        console.log(this.registerForm.ID.toString())
        console.log(this.registerForm.password.toString())
         axios
        .put("http://124.223.143.21:4999/api/Login" + this.registerForm.identity, {
              ID: this.registerForm.ID.toString(),
              NewPassword: this.registerForm.password.toString(),
            })
        .then(response => {
          console.log(response.data)
          if (response.data) {
            this.$message.success("修改密码成功")
            this.router.push({
              path: '/',
            });
          } else {
            // 登录失败
            console.error("修改密码失败");
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
      else {
        this.$msgbox.alert("两次输入密码不一致")
      }


    },
    sendVerificationCode() {
      console.log(this.registerForm.phoneNumber.toString())
      console.log(this.$refs.verificationBtn);
      if (this.countdown != 0)
        return;
      axios
      .get("http://124.223.143.21:4999/api/Login/generateVerifyCode/", {
            params: {
              PhoneNumber: this.registerForm.phoneNumber,
            },
          })
      .then(response => {
        console.log(response.data)
        if (response.data) {

          this.countdown = 60;

          // 启动定时器
          let timer = setInterval(() => {
            if (this.countdown > 0) {
              this.countdown--;
            } else {
              // 倒计时结束，重置计数并启用按钮点击
              this.countdown = 0;

              clearInterval(timer);
            }
          }, 1000);
        } else {
          // 登录失败
          console.error("登录失败");
        }
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
}
</script>

<style lang="less" scoped>
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

.registercontent {
  display: flex;
  flex-direction: column;
  background-image: url("../assets/login-background.jpg");  // 假设您有另一个背景图片
  background-size: 100% 100%;
  background-attachment: fixed;

  width: 100%;
  height: 100%;
  min-width: 900px;
  min-height: 1000px;

  justify-content: center;
  align-items: center;

  .register-box {
    position: relative;
    text-align: center;
    width: 400px;
    padding: 20px;
    background-color: #f3f3f3;
    border: 1px solid #d0d0d0;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    .steps {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;

      .circle {
          width: 20px;
          height: 20px;
          background-color: #dae4f4;
          border-radius: 50%;
          transition: background-color 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #002FA7;

        &.active {
          background-color: #002FA7; /* Klein Blue */
          color: white;
        }
      }
    }

    .el-form {
      display: flex;
      flex-direction: column;

      .el-form-item {
        margin-bottom: 20px;

        .el-input .el-input__inner {
          border-radius: 5px;
          border-color: #002FA7; /* Klein Blue */
          &:hover {
            border-color: darken(#002FA7, 10%);
          }
          &:focus {
            outline: none;
            border-color: #002FA7; /* Klein Blue */
          }
        }

        .verification-btn {
          height: 30px;
          font-size: 14px;
          color: #002FA7;
        }
      }

      .el-button {
        background-color: #002FA7; /* Klein Blue */
        border-color: #002FA7; /* Klein Blue */
        &:hover {
          background-color: darken(#002FA7, 10%);
          border-color: darken(#002FA7, 10%);
        }
      }
    }
  }

  .register-footer {
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
* {
    font-family: AliRegular;
    --va-font-family: AliRegular;
}

</style>
