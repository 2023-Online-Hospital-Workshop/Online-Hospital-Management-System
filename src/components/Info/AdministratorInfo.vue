<template>
  <div class="avatar-dropdown">
    <el-avatar :size="40" @click="toggleInfo" :src="src1"></el-avatar>
    <span class="name" @click="toggleInfo">{{ name }}</span>

    <el-collapse-transition>
      <div v-if="showInfo" class="info-content">
        <div id="info">
          <div id="info-avatar">
            <el-avatar :size="70" :src="src1"></el-avatar>
            <div class="name1">{{ name }}</div>
          </div>

          <div class="info-container" v-if="getIcon !== 'edit'">
            <va-input
              v-model="administratorId"
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
              ><template #prepend>姓名：</template></va-input
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
          </div>
          <div class="info-container" v-else>
            <div class="info-line">
              <div class="label">编号：</div>
              <div class="info-value">{{ administratorId }}</div>
            </div>
            <div class="info-line">
              <div class="label">姓名：</div>
              <div class="info-value">{{ name }}</div>
            </div>
            <div class="info-line">
              <div class="label">性别：</div>
              <div class="info-value">{{ gender }}</div>
            </div>
            <div class="info-line">
              <div class="label">电话：</div>
              <div class="info-value">{{ contact }}</div>
            </div>
          </div>
          <div class="btns">
            <div class="btn-item" @click="edit">
              <i class="material-icons">{{ getIcon }}</i
              >&nbsp;&nbsp;{{ editStates }}
            </div>
            <div class="btn-item" @click="exit">
              <i class="material-icons">exit_to_app</i>&nbsp;&nbsp;退出
            </div>
          </div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  name: "AdminstratorInfo",
  data() {
    return {
      showInfo: false,
      src: require("@/assets/me.png"),
      src1: require("@/assets/icon11.png"),
      //管理员属性
      administratorId: "",
      name: "",
      gender: "",
      birthdate: "",
      contact: "",
      password: "",

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
  mounted() {
    this.getName();
  },
  methods: {
    setCookie(name, value, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toGMTString();
      document.cookie = name + "=" + value + "; " + expires;
    },
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
      this.setCookie("token", "", -1);
    },
    getName() {
      var self = this;
      this.administratorId = sessionStorage.getItem("userID");
      axios
        .get("http://124.223.143.21:4999/api/Administrators/id?", {
          params: {
            id: this.administratorId,
          },
        })
        .then(function (response) {
          self.name = response.data.name;
          self.password = response.data.password;
        });
    },
    toggleInfo() {
      this.administratorId = sessionStorage.getItem("userID");
      this.showInfo = !this.showInfo;
      if (this.showInfo === true) {
        var self = this;
        axios
          .get("http://124.223.143.21:4999/api/Administrators/id?", {
            params: {
              id: this.administratorId,
            },
          })
          .then(function (response) {
            console.log(response);
            self.name = response.data.name;
            self.gender = response.data.gender === true ? "男" : "女";
            self.contact = response.data.contact;
            self.birthdate = "2023-08-16T12:33:48.135Z";
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
      const url = "http://124.223.143.21:4999/api/Administrators/update";
      const doctor = {
        administratorId: this.administratorId,
        name: this.name,
        gender: this.gender === "男",
        birthdate: this.birthdate,
        contact: this.contact,
        Password: this.password,
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
  

<style scoped lang="scss">
.avatar-dropdown {
  display: inline-flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
  .name {
    margin-left: 10px;
    font-size: 16px;
    font-family: AliRegular;
  }
  position: relative;
}

.info-content {
  display: block;
  width: 300px;
  color: #154ec1;
  font-weight: bold;
  padding-bottom: 20px;
  position: absolute;
  top: 50px;
  transform: translateX(-50%);
  font-family: AliRegular;
  .info-line {
    padding: 23px 23px;
    display: flex;
    align-items: center;
    font-size: 16px;
    height: 36px;
    .info-value {
      color: #000;
      margin-left: 40px;
    }
  }
  &::v-deep .va-input-wrapper__prepend-inner,
  .label {
    padding-left: 10px;
    color: #0a33a9;
    position: relative;
    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 5px;
      height: 16px;
      background: #0a33a9;
      border-radius: 3px;
      content: "";
    }
  }
  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    .btn-item {
      display: flex;
      align-items: center;
      margin: 20px;
      cursor: pointer;
    }
  }
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
  .name1 {
    margin-top: 10px;
    font-size: 20px;
    font-family: AliRegular;
  }
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
