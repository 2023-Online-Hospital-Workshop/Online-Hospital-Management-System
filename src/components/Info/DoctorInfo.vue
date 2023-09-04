<template>
  <div class="avatar-dropdown">
    <va-icon
      name="account_circle"
      @click="toggleInfo"
      class="header-icon"
    ></va-icon>

    <el-collapse-transition>
      <div v-if="showInfo" class="info-content">
        <div id="info">
          <div id="info-avatar">
            <va-avatar class="mr-6" font-size="30px" size="large">{{
              getAvatar
            }}</va-avatar>
          </div>

          <div class="info-container">
            <va-input
              v-model="doctorId"
              readonly
              class="info-input"
              placeholder="请输入5位数的编号"
              background="rgb(255,255,255)"
              ><template #prepend> 编号： </template></va-input
            >
            <va-input
              v-model.lazy="name"
              placeholder="请输入你的姓名"
              class="info-input"
              :background="input_bg"
              :readonly="readonly"
              ><template #prepend> 姓名： </template></va-input
            >
            <va-input
              v-model="gender"
              class="info-input"
              placeholder="请输入男/女/其他"
              :background="input_bg"
              :readonly="readonly"
              ><template #prepend> 性别： </template></va-input
            >
            <va-input
              v-model="contact"
              class="info-input"
              placeholder="请输入11位的电话号码"
              :background="input_bg"
              :readonly="readonly"
              ><template #prepend> 电话： </template></va-input
            >
            <va-input
              v-model="title"
              class="info-input"
              placeholder="请输入你的职称"
              :background="input_bg"
              :readonly="readonly"
              ><template #prepend> 职称： </template></va-input
            >
            <va-input
              v-model="secondaryDepartment"
              stacked="false"
              class="info-input"
              placeholder="请输入你新科室的名称"
              :background="input_bg"
              :readonly="readonly"
              ><template #prepend> 科室： </template></va-input
            >
          </div>
          <va-button-group grow preset="primary" id="btn-group">
            <va-button @click="edit">
              <i class="material-icons">{{ getIcon }}</i
              >&nbsp;&nbsp;{{ editStates }}
            </va-button>
            <va-button @click="exit">
              <i class="material-icons">exit_to_app</i> &nbsp;&nbsp;退出
            </va-button>
          </va-button-group>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DoctorInfo",
  data() {
    return {
      showInfo: false,

      //医生属性
      doctorId: "",
      name: "",
      gender: "",
      contact: "",
      title: "",
      secondaryDepartment: "",
      birthdate: "",
      photourl: "",

      //控制修改的相关属性
      editStates: "编辑",
      input_bg: "rgb(255,255,255)",
      readonly: true,
    };
  },
  computed: {
    getIcon() {
      return this.editStates === "编辑" ? "edit" : "save";
    },
    getAvatar() {
      // 返回 name 的第一个字符
      return this.name.charAt(0);
    },
  },
  methods: {
    edit() {
      //使得可编辑
      if (this.editStates === "编辑") {
        this.input_bg = "rgb(236,240,241)";
        this.readonly = false;
        this.editStates = "保存";
      } else {
        this.input_bg = "rgb(255,255,255)";
        this.readonly = true;
        this.editStates = "编辑";
        this.putServer();
      }
    },
    exit() {
      //接跳转到首页的路由
      this.$router.push("/");
      this.showInfo = !this.showInfo;
    },
    toggleInfo() {
      this.doctorId = sessionStorage.getItem('userID');
      this.showInfo = !this.showInfo;
      if (this.showInfo === true) {
        var self = this;
        axios
          .get("http://124.223.143.21:4999/api/Doctors/id?", {
            params: {
              id: this.doctorId,
            },
          })
          .then(function (response) {
            console.log(response);
            self.name = response.data.name;
            self.gender = response.data.Gender === true ? "男" : "女";
            self.contact = response.data.contact;
            self.title = response.data.title;
            self.secondaryDepartment = response.data.secondaryDepartment;
            self.birthdate = response.data.birthdate;
            self.photourl = response.data.photourl;
          })
          .catch(function (error) {
            console.error(error);
          });
      } else {
        this.input_bg = "rgb(255,255,255)";
        this.readonly = true;
        this.editStates = "编辑";
      }
    },
    putServer() {
      const url = "http://124.223.143.21:4999/api/Doctors/update";
      const doctor = {
        doctorId: this.doctorId,
        name: this.name,
        gender: this.gender === "男",
        birthdate: this.birthdate,
        title: this.title,
        contact: this.contact,
        secondaryDepartment: this.secondaryDepartment,
        photourl: this.photourl,
      };

      console.log(JSON.stringify(doctor));

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(doctor),
      })
        .then((response) => {
          // 如果响应没有成功，抛出错误
          if (!response.ok) {
            return response.text().then((text) => {
              console.error("Server returned error:", text);
              throw new Error("HTTP error " + response.status);
            });
          }

          // 否则，尝试解析返回的JSON
          return response.text().then((text) => {
            if (text) {
              // 如果有返回内容
              try {
                return JSON.parse(text);
              } catch (error) {
                console.error("Failed to parse JSON:", text);
                throw new Error("Invalid JSON response");
              }
            }
          });
        })
        .then((data) => {
          if (data) {
            console.log(data); // 如果有数据，打印出来
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
};
</script>

<style scoped>
.header-icon {
  cursor: pointer;
  color: white; /* 根据需要设置颜色 */
  font-size: 24px; /* 调整大小 */
  margin-right: 100px; /* 如果需要，可以添加边距 */
  align-content: center;
}
.avatar-dropdown {
  position: absolute;
  align-items: center;
  width: 15%;
  right: 0px;
  text-align: right;
}

.info-content {
  display: block;
  width: 100%;
  color: #154ec1;
  font-weight: bold;
  padding-bottom: 20px;
  position: absolute;
  top: 45px;
}

#info {
  margin-right: 0;
  text-align: center;
  background-color: rgb(255, 255, 255);

  border-radius: 0 0 0 5px;
  box-shadow: 0 0 2px 2px #fbfbfb;
}

#info-avatar {
  border-top: 10px;
  padding-top: 10px;
  margin-bottom: 15px;
}

.info-container {
  width: 100%; /* 设定宽度为100% */
  margin: 0; /* 确保外部间距为0 */
  padding: 0; /* 确保内部间距为0 */
  box-sizing: border-box; /* 确保宽度包括内部间距和边框 */
}

.info-input {
  margin-bottom: 10px;
  width: 85%;
  /* add a padding to increase the distance between label and input */
  --va-input-container-label-font-size: 0.4rem;
  --va-input-container-label-line-height: 0.75;
  --va-input-font-size: 15px;
  --va-input-line-height: 30px;
}

#btn-group {
  padding-top: 10px;
}
</style>