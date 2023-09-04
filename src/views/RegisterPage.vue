<template>
  <div class="registercontent">
    <div class="centered-text">济康同行</div>
    <div class="centered-text-2">Online Hospital Management System</div>
    <div class="register-box">

      <!-- Step Indicator -->
      <div class="steps">
        <div class="circle" :class="{active: step === 1}" @click="changeStep(1)">1</div>
        <div class="circle" :class="{active: step === 2}" @click="changeStep(2)">2</div>
        <div class="circle" :class="{active: step === 3}" @click="changeStep(3)">3</div>
        <div class="circle" :class="{active: step === 4}" @click="changeStep(4)">4</div>
      </div>

      <!-- Step 1: Name & Phone -->
      <el-form v-if="step === 1" ref="registerFormRef" :model="registerForm" label-position="left" label-width="80px">

        <el-form-item label="姓名">
          <el-input type="text" v-model="registerForm.name" auto-complete="off" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="registerForm.gender">
            <el-radio label="true">男</el-radio>
            <el-radio label="false">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="出生日期">
          <el-date-picker v-model="registerForm.birthdate" type="date" placeholder="选择出生日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="注册身份">
          <el-select v-model="registerForm.identity" placeholder="请选择注册身份类别" >
            <el-option label="普通用户" value="identity1"></el-option>
            <el-option label="医生" value="identity2"></el-option>
            <el-option label="管理员" value="identity3"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-form>

      <!-- Step 2: Password -->
      <el-form v-if="step === 2" ref="registerFormRef" :model="registerForm" label-position="left" label-width="80px">
        <el-form-item v-if="registerForm.identity == 'identity1'" label="学校">
          <el-input type="text" v-model="registerForm.university" auto-complete="off" placeholder="同济大学" disabled></el-input>
        </el-form-item>
        <el-form-item v-if="registerForm.identity == 'identity1'" label="学号">
          <el-input type="flex" v-model="registerForm.patientId" auto-complete="off" placeholder="请输入学号"></el-input>
        </el-form-item>

        <el-form-item v-if="registerForm.identity == 'identity2'" label="医生ID">
          <el-input type="flex" v-model="registerForm.doctorId" auto-complete="off" placeholder="请输入医生ID"></el-input>
        </el-form-item>
        <el-form-item v-if="registerForm.identity == 'identity2'" label="职称">
          <el-input type="text" v-model="registerForm.title" auto-complete="off" placeholder="请输入职称"></el-input>
        </el-form-item>
        <el-form-item v-if="registerForm.identity == 'identity2'" label="一级科室">
          <el-input type="text" v-model="registerForm.firstDepartment" auto-complete="off" placeholder="请输入一级科室"></el-input>
        </el-form-item>
        <el-form-item v-if="registerForm.identity == 'identity2'" label="二级科室">
          <el-input type="text" v-model="registerForm.secondDepartment" auto-complete="off" placeholder="请输入一级科室"></el-input>
        </el-form-item>

        <el-form-item v-if="registerForm.identity == 'identity3'" label="管理员ID">
          <el-input type="flex" v-model="registerForm.patientId" auto-complete="off" placeholder="请输入管理员ID"></el-input>
        </el-form-item>

        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-form>

      <!-- Step 3: Password -->
      <el-form v-if="step === 3" ref="registerFormRef" :model="registerForm" label-position="left" label-width="80px">
        <el-form-item label="手机号码">
          <el-input type="password" v-model="registerForm.phoneNumber" auto-complete="off" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-row type="flex" justify="space-between">
              <el-col :span="13">
                  <el-input type="text" v-model="registerForm.verificationCode" auto-complete="off" placeholder="请输入验证码" class="short-input"></el-input>
              </el-col>
              <el-col :span="11">
                  <el-text type="text" @click="sendVerificationCode" class="verification-btn">发送验证码</el-text>
              </el-col>
          </el-row>
        </el-form-item>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </el-form>

      <!-- Step 4: ... (You can fill in other details here) -->
      <el-form v-if="step === 4" ref="registerFormRef" :model="registerForm" label-position="left" label-width="100px">
        <!-- Other form items here -->
        <el-form-item label="请输入密码">
          <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="请重复密码">
          <el-input type="password" v-model="registerForm.password" auto-complete="off" placeholder="请重复输入密码"></el-input>
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

export default {
  name: "RegisterPage",
  data() {
    return {
      step: 1,  // current step
      registerForm: {
        name: '',
        gender: '',
        birthdate: '',
        phoneNumber: '',
        verificationCode: '',
        password: '',
        patientId: '',
        university: '同济大学',
        doctorId: '',
        title: '',
        firstDepartment: '',
        secondDepartment: '',
        administratorId: '',
        identity: 'identity1',
      }
    }
  },
  methods: {
    changeStep(step) {
      this.step = step
    },
    nextStep() {
      let state = false;
      if (this.step == 3) {
        console.log(this.registerForm.phoneNumber.toString())
        console.log(this.registerForm.verificationCode.toString())
        axios
        .get("http://124.223.143.21:4999/api/Login/verify", {
              params: {
                PhoneNumber: this.registerForm.phoneNumber.toString(),
                code: this.registerForm.verificationCode.toString(),
              },
            })
        .then(response => {
          console.log(response.data)
          if (response.data) {
            // 登录成功, 可以做一些后续的处理，比如导航到其他页面等
            this.$message.success('验证通过');
            state = true;
          } else {
            // 登录失败
            this.$message.error('验证失败');
          }
        })
        .catch(error => {
          console.error(error);
        });
      }

      if (this.step < 4 & !state) {
        this.step++;
      }

      if (this.registerForm.identity == 'identity1' && this.step == 4) {
        axios
        .post("http://124.223.143.21:4999/api/Enroll/PatientEnroll", {
              params: {
                patientId: this.registerForm.patientId.toString(),
                name: this.registerForm.name.toString(),
                gender: this.registerForm.gender,
                birthdate: this.registerForm.birthdate,
                university: this.registerForm.university,
                contact: this.registerForm.phoneNumber,
                password: this.registerForm.password,
              },
            })
        .then(response => {
          console.log(response.data)
          if (response.data) {
            this.$message.success('注册成功');
            console.log('注册成功')
          } else {
            this.$message.error('注册失败');
            console.log('注册失败')
          }
        })
        .catch(error => {
          console.error(error);
        });
      }

      if (this.registerForm.identity == 'identity2' && this.step == 4) {
        axios
        .post("http://124.223.143.21:4999/api/Enroll/DoctorEnroll", {
              params: {
                doctorId: this.registerForm.doctorId.toString(),
                name: this.registerForm.name.toString(),
                gender: this.registerForm.gender,
                birthdate: this.registerForm.birthdate,
                contact: this.registerForm.phoneNumber,
                secondDepartment: this.registerForm.secondDepartment,
                password: this.registerForm.password,
              },
            })
        .then(response => {
          console.log(response.data)
          if (response.data) {
            this.$message.success('注册成功');
            console.log('注册成功')
          } else {
            this.$message.error('注册失败');
            console.log('注册失败')
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
      
      if (this.registerForm.identity == 'identity3' && this.step == 4) {
        axios
        .post("http://124.223.143.21:4999/api/Enroll/AdminEnroll", {
              params: {
                administratorId: this.registerForm.administratorId.toString(),
                name: this.registerForm.name.toString(),
                gender: this.registerForm.gender,
                birthdate: this.registerForm.birthdate,
                contact: this.registerForm.phoneNumber,
              },
            })
        .then(response => {
          console.log(response.data)
          if (response.data) {
            this.$message.success('注册成功');
            console.log('注册成功')
          } else {
            this.$message.error('注册失败');
            console.log('注册失败')
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    },
    submitForm() {
      // Implement form submission here
      console.log(this.registerForm)
    },
    sendVerificationCode() {
      console.log(this.registerForm.phoneNumber.toString())
      axios
      .get("http://124.223.143.21:4999/api/Login/generate/", {
            params: {
              PhoneNumber: this.registerForm.phoneNumber,
            },
          })
      .then(response => {
        console.log(response.data)
        if (response.data) {
          // 登录成功, 你可以做一些后续的处理，比如导航到其他页面等
          console.log("登录成功");
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

</style>
