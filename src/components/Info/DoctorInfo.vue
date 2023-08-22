<template>
  <div class="avatar-dropdown">
    <va-button
      @click="toggleInfo"
      class="info-btn"
      background-color="warning"
      gradient
    >
      <i class="material-icons">account_circle</i>&nbsp;&nbsp;个人信息
    </va-button>

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
            label="编号"
            readonly
            class="info-input"
            placeholder="请输入5位数的编号"
            background="rgb(223,234,250)"
          />
          <va-input
            v-model.lazy="name"
            label="姓名"
            placeholder="请输入你的姓名"
            class="info-input"
            :background="input_bg"
            :readonly="readonly"
          />
          <va-input
            v-model="gender"
            label="性别"
            class="info-input"
            placeholder="请输入男/女/其他"
            :background="input_bg"
            :readonly="readonly"
          />
          <va-input
            v-model="contact"
            label="电话"
            class="info-input"
            placeholder="请输入11位的电话号码"
            :background="input_bg"
            :readonly="readonly"
          />
          <va-input
            v-model="title"
            label="职称"
            class="info-input"
            placeholder="请输入你的职称"
            :background="input_bg"
            :readonly="readonly"
          />
          <va-input
            v-model="secondaryDepartment"
            label="科室"
            stacked="false"
            class="info-input"
            placeholder="请输入你新科室的名称"
            :background="input_bg"
            :readonly="readonly"
          />
        </div>
        <div id="info-btn">
          <va-button @click="edit">
            <i class="material-icons">{{ getIcon }}</i
            >&nbsp;&nbsp;{{ editStates }}
          </va-button>
          &nbsp;&nbsp;
          <va-button @click="exit">
            <i class="material-icons">exit_to_app</i> &nbsp;&nbsp;退出
          </va-button>
        </div>
      </div>
    </div>
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
      doctorId: "23002",
      name: "",
      gender: "",
      contact: "",
      title: "",
      secondaryDepartment: "",
      birthdate: "",
      photourl: "",

      //控制修改的相关属性
      editStates: "编辑",
      input_bg: "rgb(223,234,250)",
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
        this.input_bg = "rgb(223,234,250)";
        this.readonly = true;
        this.editStates = "编辑";
        this.putServer();
      }
    },
    exit() {
      //接跳转到首页的路由
    },
    toggleInfo() {
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
        this.input_bg = "rgb(223,234,250)";
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
.avatar-dropdown {
  position: absolute;
  align-items: center;
  width: 20%;
  right: 0px;
  text-align: right;
}

.info-btn {
  position: relative;
  cursor: pointer;
  display: block;
  align-items: right;
  margin: 0 auto;
}

.info-content {
  display: block;
}

#info {
  margin-right: 0;
  text-align: center;
  background-color: rgb(223, 234, 250);

  border-radius: 0 0 0 5px;
  box-shadow: 0 0 2px 2px #dae4f4;
}

#info-avatar {
  border-top: 10px;
  padding-top: 10px;
}

.info-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 30px;
}

.info-input {
  margin-bottom: 10px;
  width: 60%;
  margin-left: 20%;
  /* add a padding to increase the distance between label and input */
  --va-input-container-label-font-size: 0.4rem;
  --va-input-container-label-line-height: 0.75;
  --va-input-font-size: 15px;
  --va-input-line-height: 30px;
}

#info-btn {
  justify-content: center;
  align-items: center;
  gap: 20%;
  padding-top: 30px;
  scale: 0.75;
  padding-bottom: 30px;
}
</style>