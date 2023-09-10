<style scoped lang="scss">
.app-container {
  background: #eef8fa;
  padding-bottom: 20px;
}

.header {
  position: fixed;
  /* 使其始终在屏幕顶部 */
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #002fb0;
  height: 60px;
  /* 为Header设置一个固定高度 */
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  /* 为Header添加轻微的阴影效果 */
  z-index: 100;
  /* 确保Header始终位于其他内容之上 */
  padding: 0 20px;
  /* 两侧添加一些边距 */
}

.header1 {
  position: fixed;
  /* 使其始终在屏幕顶部 */
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: url("~@/assets/bg-header.png");
  background-size: 100% 100%;
  height: 80px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;

  .header-left {
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #ffffff;
    font-size: 28px;

    .logo {
      margin-right: 20px;
    }
  }

  .header-right {
    display: flex;
    justify-content: flex-end;

    // margin-right: 200px;
    .item {
      display: flex;
      align-items: center;

      .item-name {
        display: flex;
        color: #fff;
        align-items: center;
        margin-left: 20px;
        font-size: 24px;
        cursor: pointer;
      }

      .icon {
        width: 30px;
        margin-right: 5px;
      }

      position: relative;

      .box {
        box-shadow: -1px 4px 18px 0px rgba(123, 132, 154, 0.47);
        background: #fff;
        border-radius: 10px;
        overflow: auto;
        display: block;
        width: 250px;
        color: #154ec1;
        font-weight: bold;
        padding-bottom: 20px;
        position: absolute;
        top: 65px;
        left: 50%;
        transform: translateX(-50%);

        .btns {
          display: flex;
          align-items: center;
          justify-content: center;

          .btn-item {
            font-size: 16px;
            display: flex;
            align-items: center;
            margin: 20px;
            cursor: pointer;
          }
        }
      }

      .box2 {
        padding: 30px;
        height: 600px;
        width: auto;
        overflow-y: scroll;

        .qj-item {
          width: 340px;
          border-radius: 20px;
          background: #f1f3f5;
          overflow: hidden;
          margin-bottom: 20px;
          display: flex;

          .line1 {
            width: 6px;
            height: 270px;
            flex-shrink: 0;
            background: #0a33a9;
          }

          .qj-item-top {
            padding: 20px;
            width: 340px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #0a33a9;
          }

          .title1 {
            padding-left: 20px;
            font-weight: 500;
            color: #0a33a9;
            font-size: 21px;
            position: relative;

            &::before {
              position: absolute;
              left: 0;
              top: 0;
              width: 7px;
              height: 20px;
              background: #0a33a9;
              border-radius: 4px;
              content: "";
            }
          }

          .qj-line {
            padding: 0 20px;
            color: #3e4f84;
            margin-bottom: 10px;
            font-size: 16px;
          }

          .btns1 {
            display: flex;
            margin-right: 20px;
            justify-content: flex-end;
          }
        }

        .qj-item1 {
          .line1 {
            height: 200px;
          }
        }
      }

      .box3 {
        width: 350px;
        padding: 20px 20px 0;

        .mzBtns {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;

          .mzBtn {
            width: 45%;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;

            background: #2e53ba;
            border-radius: 27px;
            color: #fff;
            font-size: 16px;
          }

          .mzBtn1 {
            background: #adb5c9;
          }
        }
      }
    }
  }
}

.patient-info {
  display: flex;
  justify-content: space-between;
  /* 患者姓名和患者ID水平排列 */
}

.application-time {
  font-size: 12px;
  /* 设置申请时间的字体大小 */
  margin-top: 10px;
  /* 控制申请时间的上外边距 */
}

* {
  font-family: AliRegular;
  --va-font-family: AliRegular;
  /* 应用字体 */
}

.logo {
  height: 40px;
  /* Adjust the height as necessary */
  margin-right: 10px;
  /* Adjust the margin as necessary */
}

.main-title {
  flex-grow: 1;
  text-align: center;
  font-size: 24px;
  /* 增大字体大小 */
  margin: 0;
  /* 移除所有边距 */
  color: white;
  /* 设置标题颜色为白色 */
}

.navbar-item-slot > a {
  border: 1px dashed var(--va-secondary);
  padding: 6px 10px;
  color: aliceblue;
}

.btn2 {
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  height: 1400px;
}

/* 主元素*/
.main {
  display: flex;
  flex-wrap: wrap;
  height: 1500px;
  /*在容器内的子元素超出容器宽度时换行*/
  margin-left: 300px;
  margin-top: 50px;
}

.container {
  width: 1400px;
  margin: 100px auto 0;
  display: flex;

  .title1 {
    padding-left: 20px;
    font-weight: 500;
    color: #0a33a9;
    font-size: 18px;
    position: relative;

    &::before {
      position: absolute;
      left: 0;
      top: 0;
      width: 7px;
      height: 22px;
      background: #0a33a9;
      border-radius: 4px;
      content: "";
    }

    &::v-deep .el-input-number {
      .el-input__wrapper {
        background: #f5f5f5;
      }

      .el-input-number__decrease,
      .el-input-number__increase {
        background: #819ff4;

        .el-icon {
          color: #fff;
        }
      }
    }
  }

  .registe {
    height: calc(100vh - 120px);
    width: 350px;
    padding: 30px 25px;
    background: #fff;
    box-shadow: -1px 4px 10px 0px rgba(142, 151, 176, 0.13);
    border-radius: 20px;

    .registe-list {
      margin-top: 30px;
      height: calc(100vh - 220px);
      overflow: auto;

      .registe-item {
        margin-bottom: 26px;
        display: flex;
        align-items: center;
        height: 80px;
        background: #f5f9fc;
        border-radius: 16px;
        overflow: hidden;

        .line {
          width: 8px;
          height: 100%;
          background: #4865ce;
        }

        &:nth-of-type(1) {
          .line {
            background: #4865ce;
          }
        }

        img {
          width: 55px;
          margin: 0 20px 0 10px;
        }

        .user-info {
          font-size: 16px;
          font-weight: 500;
          color: #000000;

          .status {
            font-size: 20px;
            margin-top: 5px;
            font-weight: 500;
            color: #50bc80;
          }
        }
      }

      .btn1 {
        display: flex;
        justify-content: center;
      }
    }
  }

  /*就诊单*/
  .diagnostic {
    flex: 1;
    margin-left: 20px;
    text-align: left;
    padding: 0 100px 30px 25px;
    background: url("~@/assets/yisheng.png") right bottom no-repeat;
    background-size: 150px;
    background-color: #fff;
    box-shadow: -1px 4px 10px 0px rgba(142, 151, 176, 0.13);
    border-radius: 20px;

    .c-title {
      width: 526px;
      height: 51px;
      margin: 0 auto;
      background: #2e53ba;
      border-radius: 0 0 60px 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32px;
      color: #f0f0f0;
      font-weight: bold;
      font-size: 25px;
    }

    .base {
      margin-top: 20px;
    }

    .base-box {
      padding: 20px;

      .base-line {
        display: flex;
        margin-bottom: 20px;

        .base-btn {
          cursor: pointer;
          width: 175px;
          height: 44px;
          background: #edf0f2;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 40px;

          font-size: 18px;

          color: #2e53ba;
        }

        .base-btn1 {
          color: #fff;
          background: #2e53ba;
        }

        .base-item {
          width: 33%;
          display: flex;
          align-items: center;

          .base-item-title {
            color: #000000;
            font-size: 22px;
          }

          .base-item-value {
            width: 188px;
            height: 33px;
            line-height: 33px;
            background: #f1f3f5;
            border-radius: 5px;
            padding-left: 10px;
            color: #666;
          }
        }
      }
    }

    .textarea {
      margin: 10px 0 20px;

      &::v-deep .el-textarea__inner {
        width: 95%;
        background: #f1f3f5;
        border: none;
        font-size: 20px;
      }
    }

    .font {
      margin: 10px 0 20px;

      &::v-deep .el-textarea__inner {
        width: 95%;
        background: #f1f3f5;
        border: none;
        font-size: 13px;
      }
    }

    &::v-deep .el-table {
      .el-table__header th {
        background-color: #f5f5f5;
      }

      .el-table__body td {
        background-color: #f1f3f5;
      }
    }
  }
}

/*叫号*/
#title {
  text-align: center;
  /* 居中文本 */
  font-size: 20px;
  /* 设置字体大小为 30px */
  font-weight: bold;
}

.list__item + .list__item {
  margin-top: 20px;
}

#register {
  width: 300px;
  height: 400px;
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
  border-spacing: 10px 10px;
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

.chatBox {
  position: relative;
  /* margin:12px; */
  padding: 5px 8px;
  word-break: break-all;
  background: #ffffff;
  border: 1px solid #989898;
  border-radius: 5px;
  max-width: 180px;
}

.chatBox-left {
  float: left;
}

.chatBox-right {
  float: right;
}

.chatBox-left::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  left: -20px;
  top: 5px;
  border: 10px solid;
  border-color: transparent #002fb0 transparent transparent;
  float: left;
}

.chatBox-right::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  right: -20px;
  top: 5px;
  border: 10px solid;
  border-color: transparent transparent transparent #002fb0;
  float: right;
}

.chatBox-right::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  right: -20px;
  top: 5px;
  border: 10px solid;
  border-color: transparent transparent transparent #002fb0;
  float: right;
}

.gh {
  color: rgb(255, 0, 0) !important;
}
</style>

<template>
  <div class="app-container">
    <!-- <header class="header">
      <img src="@/assets/logo.jpg" alt="Logo" class="logo" />
      <h1 class="main-title">济康同行</h1>
      <DoctorInfo />
      <el-button
        type="primary"
        class="custom-button trapezoid-button"
        @click="drawer = true"
      >
        <span class="vertical-text">请假申请</span>
      </el-button>

      <el-drawer v-model="drawer" title="I am the title" :with-header="false">
        <va-card
          v-for="(i, index) in leave_app"
          :key="index"
          style="margin-bottom: 30px"
        >
          <va-card-title>请假申请</va-card-title>
          <va-card-content>
            诊断：{{ i.treatmentRecord.clinicdia }}

          
            <div class="patient-info">
              <div>
                <div class="patient-info-item">
                  患者姓名: {{ i.patientName.name }}
                </div>
                <div class="patient-info-item">
                  患者ID: {{ i.patientName.patientId }}
                </div>
              </div>

              <div class="application-time">
                申请时间：{{ i.leaveApplication.leaveApplicationTime }}
              </div>
            </div>

            <br />诊断时间：{{ i.treatmentRecord.diagnoseTime }}
            <br />开始时间：{{ i.leaveApplication.leaveStartDate }}
            <br />结束时间：{{ i.leaveApplication.leaveEndDate }}

            <va-card-actions
              align="stretch"
              style="
                justify-content: flex-end; /* 将按钮右对齐 */
                margin-right: 10px; /* 添加右侧间距 */
              "
            >
              <va-button
                icon="clear"
                color="danger"
                class="mr-3 mb-2"
                @click="fail(i.leaveApplication.leaveNoteId)"
              >
                驳回
              </va-button>
              <va-button
                icon-right="arrow_forward"
                icon-color="#ffffff50"
                class="mr-3 mb-2"
                @click="agree(i.leaveApplication.leaveNoteId)"
              >
                同意
              </va-button>
            </va-card-actions>
          </va-card-content>
        </va-card>
      </el-drawer>

      <el-button
        type="primary"
        class="custom-button trapezoid-button"
        @click="openDrawer2()"
      >
        <span class="vertical-text">在线复诊</span>
      </el-button>

    

      <el-button
        type="primary"
        class="custom-button trapezoid-button"
        @click="drawer3 = true"
      >
        <span class="vertical-text">门诊单模板</span>
      </el-button>

      <el-drawer v-model="drawer3" title="I am the title" :with-header="false">
        <el-button
          type="primary"
          class="custom-button trapezoid-button"
          v-for="(buttonText, index) in template"
          :key="index"
          @click="handle(index)"
        >
          {{ buttonText }}
        </el-button>
        <el-button type="primary" class="custom-button trapezoid-button">
          发烧
        </el-button>
        <el-button type="primary" class="custom-button trapezoid-button">
          增加模板
        </el-button>
        <el-button type="primary" class="custom-button trapezoid-button">
          删除模板
        </el-button>
        <el-button type="primary" class="custom-button trapezoid-button">
          修改模板
        </el-button>
      </el-drawer>
    </header> -->

    <header class="header1">
      <div class="header-left">
        <img src="@/assets/logo.jpg" alt="Logo" class="logo" />
        <div>济康同行</div>
      </div>
      <div class="header-right">
        <DoctorInfo />
        <div class="item">
          <div class="item-name" @click="drawer = !drawer">
            <img src="@/assets/icon7.png" alt="" class="icon" />
            请假申请
          </div>

          <el-collapse-transition>
            <div class="box box2" v-if="drawer">
              <div v-for="(i, index) in leave_app" :key="index" class="qj-item">
                <div class="line1"></div>
                <div>
                  <div class="qj-item-top">
                    <div class="title1">请假申请</div>
                    <div>{{ i.leaveApplication.leaveApplicationTime }}</div>
                  </div>
                  <div class="qj-line">
                    诊断：{{ i.treatmentRecord.clinicdia }}
                  </div>
                  <div class="qj-line">患者姓名: {{ i.patientName.name }}</div>
                  <div class="qj-line">
                    患者ID: {{ i.patientName.patientId }}
                  </div>
                  <div class="qj-line" style="margin-top: 20px">
                    诊断时间：{{ i.treatmentRecord.diagnoseTime }}
                  </div>
                  <div class="qj-line">
                    开始时间：{{ i.leaveApplication.leaveStartDate }}
                  </div>
                  <div class="qj-line">
                    结束时间：{{ i.leaveApplication.leaveEndDate }}
                  </div>
                  <div class="btns1">
                    <va-button
                      color="danger"
                      class="mr-3 mb-2"
                      @click="fail(i.leaveApplication.leaveNoteId)"
                    >
                      驳回
                    </va-button>
                    <va-button
                      icon-color="#ffffff50"
                      class="mr-3 mb-2"
                      @click="agree(i.leaveApplication.leaveNoteId)"
                    >
                      同意
                    </va-button>
                  </div>
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
        <div class="item">
          <div class="item-name" @click="openNewDrawer2">
            <img src="@/assets/icon8.png" alt="" class="icon" />
            消息列表
          </div>

          <el-collapse-transition>
            <div class="box box2" style="width: 400px" v-if="drawer2">
              <div
                v-for="(i, index) in treatmentChats"
                :key="index"
                class="qj-item qj-item1"
              >
                <div class="line1"></div>
                <div>
                  <div class="qj-item-top">
                    <div class="title1">诊疗记录</div>
                  </div>

                  <div class="qj-line">患者姓名: {{ i.patientName }}</div>
                  <div class="qj-line">患者ID: {{ i.patientID }}</div>
                  <div class="qj-line" style="margin-top: 20px">
                    诊断时间：{{ i.date.slice(0, 10) }}
                  </div>

                  <div class="btns1">
                    <va-button
                      icon-color="#ffffff50"
                      class="mr-3 mb-2"
                      @click="showChat(i.diagnoseId, i.patientID)"
                      v-if="unreadPrompts[index]"
                    >
                      解答
                    </va-button>
                  </div>
                </div>
              </div>
              <!-- <va-card
                v-for="(i, index) in treatmentChats"
                :key="index"
                style="margin-bottom: 30px"
              >
                <va-card-title>诊疗记录</va-card-title>
                <va-card-content>
                  <div class="patient-info">
                    <div>
                      <div class="patient-info-item">
                        患者姓名: {{ i.patientName }}
                      </div>
                      <div class="patient-info-item">
                        患者ID: {{ i.patientID }}
                      </div>
                    </div>
                  </div>

                  <br />诊断时间：{{ i.date.slice(0, 10) }}
                  <div class="btn2">
                    <el-button type="primary"  @click="showChat(i.diagnoseId, i.patientID)" round>解答</el-button>
                  </div>
              
                </va-card-content>
              </va-card> -->
            </div>
          </el-collapse-transition>
        </div>
        <div class="item">
          <div class="item-name" @click="drawer3 = !drawer3">
            <img src="@/assets/icon9.png" alt="" class="icon" />
            门诊模板
          </div>
          <el-collapse-transition>
            <div class="box box3" v-if="drawer3">
              <div class="mzBtns">
                <div
                  class="mzBtn"
                  v-for="(buttonText, index) in template"
                  :key="index"
                  @click="handle(index)"
                >
                  {{ buttonText }}
                </div>
                <div class="mzBtn mzBtn1">+</div>
              </div>

              <div class="btns">
                <div class="btn-item" @click="edit">
                  <i class="material-icons">edit</i>&nbsp;&nbsp;编辑
                </div>
                <div class="btn-item" @click="exit">
                  <i class="material-icons">delete</i>&nbsp;&nbsp;删除
                </div>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>
    </header>

    <va-modal v-model="chatShown" hide-default-actions="true">
      <div style="width: 500px; height: 600px">
        <div style="overflow: auto; height: 80%">
          <div class="chat-box">
            <table
              class="chat-box"
              style="margin-left: 5%; height: 70%; width: 90%"
            >
              <tr v-for="(message, index) in chatMessages" :key="index">
                <div
                  :class="{
                    chatBox: true,
                    'chatBox-left': message.senderType === 0,
                    'chatBox-right': message.senderType !== 0,
                  }"
                >
                  <td>
                    {{ message.message }}
                  </td>
                </div>
                <br />
              </tr>
            </table>
          </div>
        </div>
        <va-input
          v-model="newMessage"
          class="mb-6"
          type="textarea"
          :min-rows="3"
          :max-rows="3"
          style="width: 100%"
        >
        </va-input>
        <va-button style="width: 100%" @click="sendMessage()"> 发送 </va-button>
      </div>
    </va-modal>

    <div class="container">
      <va-button @click="nextPatient()"> 叫号 </va-button>
      <div class="registe">
        <div class="title1">患者挂号信息</div>
        <div class="registe-list">
          <div
            class="registe-item"
            v-for="(pt, index) in patients"
            :key="index"
            :id="'item' + index"
          >
            <div class="line"></div>
            <img src="@/assets/icon11.png" alt="" />
            <div class="user-info">
              <div>{{ pt.number }}号：{{ pt.name }}</div>
              <div
                class="status"
                :class="{ gh: pt.treatmentState === '未就诊' }"
              >
                {{ pt.treatmentState }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div id="registe">
      <div style="text-align: center; margin-top: 70px; margin-bottom: 30px">
        <label id="title"> 患者挂号信息 </label>
      </div>
      <div style="text-align: left">
        <va-scroll-container class="max-h-52" vertical>
          <va-list>
            <va-list-item v-for="(pt, index) in patients" :key="index" :id="'item' + index" gradient="true"
              class="list__item">
              <va-list-item-section avatar>
                <va-avatar>
                  <img src="../../assets/patient.png" alt="" />
                </va-avatar>
              </va-list-item-section>

              <va-list-item-section>
                <va-list-item-label>
                  {{ pt.number }}号：{{ pt.name }}
                </va-list-item-label>

                <va-list-item-section>
                  {{ pt.treatmentState }}
                </va-list-item-section>
              </va-list-item-section>
            </va-list-item>
          </va-list>
        </va-scroll-container>
      </div>
    </div> -->

      <div class="diagnostic">
        <h1 class="c-title">同济大学校医院门诊病历</h1>
        <div class="title1">内科 日期:{{ date }}</div>
        <div class="title1 base">基本信息</div>
        <div class="base-box">
          <div class="base-line">
            <div class="base-item">
              <div class="base-item-title">姓名：</div>
              <div class="base-item-value">{{ name }}</div>
            </div>
            <div class="base-item">
              <div class="base-item-title">性别：</div>
              <div class="base-item-value">{{ gender }}</div>
            </div>
            <div class="base-item">
              <div class="base-item-title">年龄：</div>
              <div class="base-item-value">{{ age }}</div>
            </div>
          </div>
          <div class="base-line">
            <div class="base-item">
              <div class="base-item-title">卡号：</div>
              <div class="base-item-value">{{ ID }}</div>
            </div>
            <div class="base-item">
              <div class="base-item-title">电话：</div>
              <div class="base-item-value">{{ contact }}</div>
            </div>
            <div class="base-item">
              <div class="base-item-title">辅导员：</div>
              <div class="base-item-value">{{ counsellor }}</div>
            </div>
          </div>
          <div class="base-line">
            <div class="base-item" style="width: 40%">
              <div class="base-item-title">初诊/复诊：</div>
              <div class="base-item-value">{{ isfirst }}</div>
            </div>
            <div
              id="isfirst_button"
              class="base-btn base-btn1"
              @click="showModal = !showModal"
            >
              查看就诊历史
            </div>
          </div>
        </div>
        <va-modal
          v-model="showModal"
          fullscreen
          :message="message"
          hide-default-actions
        >
          <div class="diagnose">
            <h1 class="myh1">同济大学校医院病人就诊历史</h1>
            <label>日期：{{ his_rep.records[p].record.diagnoseTime }} </label>
            <table id="info">
              <tr>
                <td>姓名：{{ his_rep.patientInfo.name }}</td>
              </tr>
              <tr>
                <td>性别：{{ his_rep.patientInfo.gender }}</td>
              </tr>
              <tr>
                <td>年龄：{{ his_rep.patientInfo.birthDate }}</td>
              </tr>
              <tr>
                <td>卡号：{{ his_rep.patientInfo.patientId }}</td>
              </tr>
              <tr>
                <td>
                  科室：{{ his_rep.records[p].doctor.secondaryDepartment }}
                </td>
              </tr>
              <tr>
                <td>医生：{{ his_rep.records[p].doctor.name }}</td>
              </tr>
              <div>
                主诉：{{ his_rep.records[p].record.selfreported }}
                <br /><br />现病史：
                {{ his_rep.records[p].record.presenthis }}
                <br /><br />既往史：
                {{ his_rep.records[p].record.anamnesis }}
                <br /><br />体征：{{ his_rep.records[p].record.sign }}
                <br /><br />门诊诊断：
                {{ his_rep.records[p].record.clinicdia }}
                <br /><br />诊疗建议: {{ his_rep.records[p].record.advice }}
                <br /><br />处方：
                <el-table
                  :data="his_rep.records[p].medicineDescriptions"
                  stripe
                  style="width: 100%"
                  max-height="500"
                >
                  <el-table-column prop="medicineName" label="药品" width="100">
                  </el-table-column>
                  <el-table-column
                    prop="specification"
                    label="规格"
                    width="130"
                  >
                  </el-table-column>
                  <el-table-column prop="singledose" label="剂量" width="80">
                  </el-table-column>
                  <el-table-column prop="frequency" label="频率" width="80">
                  </el-table-column>
                  <el-table-column
                    prop="attention"
                    label="注意事项"
                    width="190"
                  >
                  </el-table-column>
                </el-table>
              </div>
              <div class="example-pagination-block">
                <el-pagination
                  @current-change="changeReport"
                  layout="prev, pager, next"
                  :total="total_p"
                />
              </div>
            </table>
            <label> </label>
          </div>
        </va-modal>

        <div class="title1">主诉：</div>
        <el-input
          type="textarea"
          :rows="4"
          class="textarea"
          placeholder="请输入"
          v-model="problem"
        >
        </el-input>

        <div class="title1">现病史：</div>

        <el-input
          type="textarea"
          :rows="4"
          class="textarea"
          name="firstname"
          placeholder="请输入"
          v-model="illness"
        >
        </el-input>
        <div class="title1">既往史：</div>

        <el-input
          type="textarea"
          :rows="4"
          class="textarea"
          name="firstname"
          placeholder="请输入"
          v-model="past_illness"
        >
        </el-input>
        <div class="title1">体征：</div>

        <el-input
          type="textarea"
          :rows="4"
          class="textarea"
          name="firstname"
          placeholder="请输入"
          v-model="symptom"
        >
        </el-input>
        <div class="title1">门诊诊断：</div>
        <el-input
          type="textarea"
          :rows="4"
          class="textarea"
          name="firstname"
          placeholder="请输入"
          v-model="diagnose"
        >
        </el-input>
        <div class="title1">诊疗建议：</div>
        <el-input
          type="textarea"
          :rows="4"
          class="textarea"
          name="firstname"
          placeholder="请输入"
          v-model="prescription"
        >
        </el-input>
        <div class="title1">
          处方：
          <el-autocomplete v-model="select_medi" :fetch-suggestions="querySearch" clearable class="inline-input w-50"
            placeholder="从药品库中选择药品" @select="selectMedicine" />
        </div>

        <el-table
          :data="medicine"
          stripe
          style="width: 100%; margin: 20px 0"
          max-height="500"
        >
          <el-table-column prop="name" label="药品"> </el-table-column>
          <el-table-column prop="spec" label="规格"> </el-table-column>
          <el-table-column label="单次剂量" width="120">
            <template #default="scope">
              <el-input
                type="textarea"
                :rows="4"
                class="textarea font"
                name="firstname"
                placeholder="请输入"
                v-model="all_med[scope.$index].single"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="用法" width="70">
            <template #default="scope">
              <input
                class="input2"
                type="text"
                v-model="all_med[scope.$index].ad"
                name="firstname"
                placeholder=""
              />
            </template>
          </el-table-column>
          <el-table-column label="频率" width="100">
            <template #default="scope">
              <input
                class="input2"
                type="text"
                v-model="all_med[scope.$index].fre"
                name="firstname"
                placeholder=""
              />
            </template>
          </el-table-column>
          <el-table-column label="数量" width="110">
            <template #default="scope">
              <el-input-number
                v-model="all_med[scope.$index].count"
                :min="1"
                :max="30"
                size="large"
                controls-position="right"
                style="width: 70px"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="注意事项" width="140">
            <template #default="scope">
              <el-input
                type="textarea"
                :rows="4"
                class="textarea font"
                name="firstname"
                placeholder="请输入"
                v-model="all_med[scope.$index].tips"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="编辑" width="80">
            <template #default="scope">
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <div class="title1" style="margin: 20px 0">
          同意开具假条天数为：<el-input-number
            v-model="leave_day"
            class="mx-4"
          />
        </div>
        <el-button type="primary" @click="open">确认</el-button>
      </div>

      <div id="cebian"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
//import userInfo from "../../store/user.js";
import DoctorInfo from "../../components/Info/DoctorInfo.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import PinyinMatch from 'pinyin-match'


export default {
  name: 'App',
  // mlj修改：自动填充
  watch: {
    'all_med': {
      deep: true,
      handler() {
        console.log('Medicine changed');
        console.log(this.all_med.pre)

        this.all_med.forEach((medItem, medIndex) => {
          this.pre_abbreviations.forEach((abbr, abbrIndex) => {
            const regex = new RegExp(`${abbr}`, "gi");
            if (medItem.fre && typeof medItem.fre === 'string') {
              this.all_med[medIndex].fre = medItem.fre.replace(regex, this.pre_fullNames[abbrIndex]);
            }
          });
          this.use_abbreviations.forEach((abbr, abbrIndex) => {
            const regex = new RegExp(`${abbr}`, "gi");
            if (medItem.ad && typeof medItem.ad === 'string') {
              this.all_med[medIndex].ad = medItem.ad.replace(regex, this.use_fullNames[abbrIndex]);
            }
          });
        });
      }
    }
  },

  data() {
    return {
      // zzh添加：
      // 该医生进行过的所有诊断记录

      treatmentRecords: [],
      // 复诊聊天记录列表
      treatmentChats: [],
      // 暂存当前复诊聊天记录
      chatMessages: [],
      newMessage: "",
      chatShown: false,

      curPatientId: "",
      // 提示有新消息的红点状态
      unreadPrompts: [],
      pre_abbreviations: [
        "qd", "bid", "tid", "qid", "qn", "qod", "qw", "biw", "q2h", "g4h", "g8h"
      ],
      pre_fullNames: [
        "1日1次", "1日2次", "1日3次", "1日4次", "每晚睡前1次", "隔日1次", "每周1次", "1周2次", "每2小时1次",
        "每4小时1次", "每8小时1次"
      ],
      use_abbreviations: [
        "sig", "PR.", "l.D", "l.V", "I.V.GTT.", "IH", "IM", "P.O"
      ],
      use_fullNames: [
        "用法", "灌肠", "皮内注射", "静脉注射", "静脉点滴", "皮下注射", "肌肉注射", "此药口服"
      ],

      //hcr:
      patients: [],
      value: "请输入",
      //病人信息
      period: 0,
      name: "",
      gender: "",
      age: "",
      ID: "",
      contact: "",
      counsellor: "",
      num: 0, //当前就诊患者的序号
      doctorId: sessionStorage.getItem("userID"),
      dept: "普通外科",

      //处方药品
      all_medicine: [], //药房中所有药品,包含medicineName和specification属性
      stocks: [], //在checkbox中选择药品，存储所有药品的全称
      stockList: [],
      medicine: [], //辅助在表格前端显示，只有name和spec两个属性
      all_num: 0, //现在已有药品数量
      select_medi: "",

      //就诊单
      problem: "",
      illness: "",
      past_illness: "",
      symptom: "",
      diagnose: "",
      prescription: "",

      //就诊历史
      isfirst: "",
      his_rep: {},
      showModal: false,
      showModal2: false,
      p: 0, //当前显示的就诊历史页面
      total_p: 0, //就诊历史总页面数量

      //病假信息
      leave_app: [],
      leave_day: 0,
      drawer: false,
      drawer2: false,
      drawer3: false,

      //处方模板
      template: ["感冒", "浅表性胃炎"],
      content: [
        {
          problem: "喉咙痛，流鼻涕，打喷嚏，咳嗽，轻微头疼",
          illness: "无",
          past_illness: "体健",
          symptom: "喉咙红，体温",
          diagnose: "感冒",
          prescription:
            "注意休息、多喝水,维持良好的卫生习惯，或者出现其他严重症状（如高烧、呼吸急促、胸痛等）及时复诊",
          medicine: ["清开灵颗粒", "板蓝根颗粒"],
        },
        {
          problem: "胀气，腹部紧张，打嗝频繁",
          illness: "无",
          past_illness: "体健",
          symptom: "无",
          diagnose: "胃胀",
          prescription: "多吃蔬菜，少喝碳酸饮料，少食多餐，避免吞气",
          medicine: ["酪酸梭菌活菌胶囊"],
        },
      ],

      //今日日期
      date: "",

      //显示自定义提示框
      showDialog: false,
    };
  },
  components: {
    DoctorInfo,
  },
  setup() {
    let med = [];
    for (let i = 0; i < 15; i++) {
      let one_med = {
        name: "",
        spec: "", //药品规格
        single: "", //药品一次剂量
        ad: "", //药品用法
        fre: "", //使用频率
        count: 1, //药品数量
        tips: "", //注意事项
      };
      med.push(one_med);
    }
    let all_med = reactive(med);

    return {
      all_med, //已经选择的所有的药品和药品属性
    };
  },

  mounted() {
    this.initial(); //初始化
    this.nextPatient();
  },
  methods: {
    querySearch(queryString, callback) {
      const emailList = this.stockList;
      let queryList = [];

      emailList.forEach(item => {
        const emailValue = item.value;
        if (emailValue.includes(queryString)||PinyinMatch.match(emailValue, queryString)) {
          queryList.push({ value: emailValue });
        }
      });

      callback(queryList);
      console.log(PinyinMatch); 
    },

    openNewDrawer2() {
      this.drawer2 = !this.drawer2;
      if (this.drawer2) {
        this.openDrawer2();
      } else {
        setTimeout(() => {
          this.treatmentChats = [];
        }, 1500);
      }
    },
    async openDrawer2() {
      this.drawer2 = true;
      //获得诊断历史
      const url4 =
        "http://124.223.143.21/api/Registration/GetPatientInfoByDoctorID/" +
        this.doctorId;
      var requestOptions4 = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url4, requestOptions4);
        const result = await response.json();
        this.treatmentRecords = result;
        // console.log(this.treatmentRecords, "record", this.treatmentRecords.length);
      } catch (error) {
        console.log("error", error);
      }

      for (let i = 0; i < this.treatmentRecords.length; i++) {
        this.unreadPrompts[i] = false;

        this.treatmentRecords[i].diagnoseId = `${this.treatmentRecords[
          i
        ].appointmentDate
          .replace("-", "")
          .split("T")[0]
          .replace("-", "")}${this.treatmentRecords[i].patientID}${
          this.doctorId
        }${this.treatmentRecords[i].period}`;
        // this.getMessages(this.treatmentRecords[i].diagnoseId);

        const url =
          "http://124.223.143.21/api/Chatrecord/getChatRecord?RecordId=" +
          this.treatmentRecords[i].diagnoseId;
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        this.chatMessages = [];
        try {
          const response = await fetch(url, requestOptions);
          const result = await response.json();
          for (let i = 0; i < result.length; i++) {
            this.chatMessages.push(result[i]);
          }
        } catch (error) {
          console.log("error", error);
        }
        // console.log(this.chatMessages.length, "len");
        if (this.chatMessages.length !== 0) {
          if (
            this.chatMessages[this.chatMessages.length - 1].senderType == 0 &&
            this.chatMessages[this.chatMessages.length - 1].readStatus == 0
          ) {
            // 最后一条信息未读且为患者发送
            this.unreadPrompts[i] = true;
            console.log(this.chatMessages);
          }
        }
        this.treatmentChats.push({
          date: this.treatmentRecords[i].appointmentDate,
          patientID: this.treatmentRecords[i].patientID,
          patientName: this.treatmentRecords[i].patientName,
          period: this.treatmentRecords[i].period,
          diagnoseId: this.treatmentRecords[i].diagnoseId,
        });
      }
    },

    time(inputString) {
      if (typeof inputString !== "string" || inputString.length === 0) {
        return ""; // 如果输入为空或不是字符串，则返回空字符串
      }

      return inputString.slice(0, 10);
    },

    //初始化
    async initial() {
      //获取医生id
      console.log(this.doctorId);
      //获取日期
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, "0"); // 月份从0开始，所以要加1
      const day = currentDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      this.date = formattedDate;
      //初始化今日挂号病人
      let api =
        "http://124.223.143.21:4999/api/Registration/commit?doctorId=" +
        this.doctorId;
      try {
        const response = await fetch(api);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
          this.patients.push(data[i].patient);
          this.patients[i].number = i + 1;
          this.patients[i].treatmentState = "未就诊";
          this.patients[i].period = data[i].period;
        }
      } catch (error) {
        console.error("Error:", error);
      }
      //初始化药品,获得药品名称和药品规格
      const url = "http://124.223.143.21/api/Medicine/GetAllMedicinesInfo";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.all_medicine = data;
        for (let i = 0; i < data.length; i++) {
          this.stocks.push(data[i].medicineName);
          this.stockList.push({ value: data[i].medicineName });
        }
      } catch (error) {
        console.error("Error:", error);
      }
      console.log(this.all_medicine);

      //获得病假申请
      const url3 =
        "http://124.223.143.21/api/Leave/GetLeaveApplicationsByDoctor?doctorId=" +
        this.doctorId;
      var requestOptions3 = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url3, requestOptions3);
        const result = await response.json();
        this.leave_app = result;
      } catch (error) {
        console.log("error", error);
      }
      for (let i = 0; i < this.leave_app.length; i++) {
        this.leave_app[i].leaveApplication.leaveApplicationTime = this.time(
          this.leave_app[i].leaveApplication.leaveApplicationTime
        );
        this.leave_app[i].leaveApplication.leaveStartDate = this.time(
          this.leave_app[i].leaveApplication.leaveStartDate
        );
        this.leave_app[i].leaveApplication.leaveEndDate = this.time(
          this.leave_app[i].leaveApplication.leaveEndDate
        );
        this.leave_app[i].treatmentRecord.diagnoseTime = this.time(
          this.leave_app[i].treatmentRecord.diagnoseTime
        );
      }
      //获得诊断历史
      const url4 =
        "http://124.223.143.21/api/Registration/GetPatientInfoByDoctorID/" +
        this.doctorId;
      var requestOptions4 = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url4, requestOptions4);
        const result = await response.json();
        this.treatmentRecords = result;
        // console.log(this.treatmentRecords, "record", this.treatmentRecords.length);
      } catch (error) {
        console.log("error", error);
      }

      for (let i = 0; i < this.treatmentRecords.length; i++) {
        this.unreadPrompts[i] = false;

        this.treatmentRecords[i].diagnoseId = `${this.treatmentRecords[
          i
        ].appointmentDate
          .replace("-", "")
          .split("T")[0]
          .replace("-", "")}${this.treatmentRecords[i].patientID}${
          this.doctorId
        }${this.treatmentRecords[i].period}`;
        // this.getMessages(this.treatmentRecords[i].diagnoseId);

        const url =
          "http://124.223.143.21/api/Chatrecord/getChatRecord?RecordId=" +
          this.treatmentRecords[i].diagnoseId;
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        this.chatMessages = [];
        try {
          const response = await fetch(url, requestOptions);
          const result = await response.json();
          for (let i = 0; i < result.length; i++) {
            this.chatMessages.push(result[i]);
          }
        } catch (error) {
          console.log("error", error);
        }
        // console.log(this.chatMessages.length, "len");
        if (this.chatMessages.length !== 0) {
          if (
            this.chatMessages[this.chatMessages.length - 1].senderType == 0 &&
            this.chatMessages[this.chatMessages.length - 1].readStatus == 0
          ) {
            // 最后一条信息未读且为患者发送
            this.unreadPrompts[i] = true;
            console.log(this.chatMessages);
          }
        }
        this.treatmentChats.push({
          date: this.treatmentRecords[i].appointmentDate,
          patientID: this.treatmentRecords[i].patientID,
          patientName: this.treatmentRecords[i].patientName,
          period: this.treatmentRecords[i].period,
          diagnoseId: this.treatmentRecords[i].diagnoseId,
        });
      }

      //自动叫号
      this.nextPatient();
    },

    async showChat(id, patientId) {
      this.chatShown = true;
      this.curRecordId = id;
      this.curPatientId = patientId;
      this.getMessages(id);
      // for (let i = 0; i < this.treatmentChats.length; i++) {
      //   if (this.treatmentChats[i].diagnoseId === id) {
      //     this.unreadPrompts[i] = false;
      //   }
      // }
      // console.log("Yes");
      // console.log(this.chatMessages);
    },

    async getMessages(recordId) {
      this.chatMessages = [];

      const url =
        "http://124.223.143.21/api/Chatrecord/getChatRecord?RecordId=" +
        recordId;
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        for (let i = 0; i < result.length; i++) {
          this.chatMessages.push(result[i]);
        }
      } catch (error) {
        console.log("error", error);
      }

      // axios.get("http://124.223.143.21/api/Chatrecord/getChatRecord?", {
      //   params: {
      //     RecordId: recordId,
      //   },
      // })
      //   .then((response) => {
      //     // console.log(response);
      //     for (let i = 0; i < response.data.length; i++) {
      //       this.chatMessages.push(response.data[i]);
      //     }
      //     // console.log(this.chatMessages, "abc", this.chatMessages.length);
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    },

    async sendMessage() {
      // console.log(this.chatMessages);
      if (this.newMessage == "") {
        alert("不能发送空白消息！");
        return;
      }
      this.chatMessages.push({ message: this.newMessage, senderType: 1 });

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        recordId: this.curRecordId,
        doctorId: this.doctorId,
        patientId: this.curPatientId,
        message: this.newMessage,
        senderType: 1,
        timeStamp: new Date().toISOString(),
        readStatus: 0,
      });
      console.log(raw);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "http://124.223.143.21/api/Chatrecord/addChatRecord",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      axios
        .post("", this.newMessage)
        .then((response) => {
          console.warn(response);
          this.getMessages(this.curRecordId);
          this.newMessage = "";
        })
        .catch((error) => {
          console.log(error);
          this.newMessage = "";
        });
    },

    //叫号
    async nextPatient() {
      let i = this.num + 1; //当前就诊患者序号

      //判断今日所有病人是否已经就诊完成
      if (i === this.patients.length + 1) {
        return;
      }
      this.num = i;

      //改变就诊列表
      let j = i - 1;
      const item = document.getElementById("item" + j);
      item.style.color = "red";
      console.log(this.num);
      //把正在就诊的病人状态改为已就诊
      this.patients[this.num - 1].treatmentState = "已就诊";

      //显示当前就诊病人信息
      i = i - 1;
      this.name = this.patients[i].name;
      if (this.patients[i].gender) {
        //gender是true则为男
        this.gender = "男";
      } else {
        this.gender = "女";
      }
      const originalString = this.patients[i].birthDate;
      const extractedSubstring = originalString.substring(0, 4);
      const extractedNumber = parseInt(extractedSubstring);
      this.age = 2023 - extractedNumber;
      this.contact = this.patients[i].contact;
      this.counsellor = this.patients[i].counsellor;
      this.ID = this.patients[i].patientId;
      this.period = this.patients[i].period;

      //获取当前就诊病人的就诊历史
      this.getHistory();
    },

    //添加药品
    selectMedicine() {
      this.all_num = this.all_num + 1; //增加现有药品数量
      //避免药品重复
      let name = this.select_medi;
      const r = this.medicine.find((item) => item.name === this.select_medi);
      if (r !== undefined) {
        return;
      }

      //foundElement是当前选中的药品,属性和数据库中一样
      let foundElement = null;
      for (let i = 0; i < this.all_medicine.length; i++) {
        if (this.all_medicine[i].medicineName === name) {
          foundElement = this.all_medicine[i];
          break;
        }
      }

      //将药品的所有属性添加进all_med
      this.all_med[this.all_num - 1].name = foundElement.medicineName;
      this.all_med[this.all_num - 1].spec = foundElement.specification;
      this.all_med[this.all_num - 1].single = foundElement.singledose;
      this.all_med[this.all_num - 1].ad = foundElement.administration;
      this.all_med[this.all_num - 1].tips = foundElement.attention;
      this.all_med[this.all_num - 1].fre = foundElement.frequency;

      //在medicine中添加药品
      let a = {
        name: foundElement.medicineName,
        spec: foundElement.specification,
      };
      this.medicine.push(a);
    },

    //删除一个药品
    handleDelete(index) {
      // 将要删除的药品与最后一个药品交换
      let temp = this.medicine[index];
      this.medicine[index] = this.medicine[this.medicine.length - 1];
      this.medicine[this.medicine.length - 1] = temp;

      let temp2 = this.all_med[index];
      this.all_med[index] = this.all_med[this.medicine.length - 1];
      this.all_med[this.medicine.length - 1] = temp2;

      //删除最后一个药品
      this.medicine.pop();
      this.all_med[this.all_num - 1].name = "";
      this.all_med[this.all_num - 1].spec = "";
      this.all_med[this.all_num - 1].single = "";
      this.all_med[this.all_num - 1].ad = "";
      this.all_med[this.all_num - 1].fre = "";
      this.all_med[this.all_num - 1].count = 1;
      this.all_med[this.all_num - 1].tips = "";

      this.all_num = this.all_num - 1;

      console.log(this.medicine);
    },

    //确认处方按钮
    open() {
      ElMessageBox.confirm("请问您是否确认提交处方?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.enter();
          ElMessage({
            type: "success",
            message: "处方提交成功",
          });
          this.delete();
          this.nextPatient(); //自动叫号
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消提交",
          });
        });
    },

    //清空处方
    delete() {
      this.problem = "";
      this.illness = "";
      this.past_illness = "";
      this.symptom = "";
      this.diagnose = "";
      this.prescription = "";
      this.all_num = 0; //现在已有药品数量
      this.select_medi = ""; //在选择框中已经选择的药品
      this.medicine = []; //辅助在表格前端显示，只有name和spec两个属性
      for (let j = 0; j < 15; j++) {
        this.all_med[j].name = "";
        this.all_med[j].spec = "";
        this.all_med[j].single = "";
        this.all_med[j].ad = "";
        this.all_med[j].tips = "";
        this.all_med[j].fre = "";
      }
      //删除就诊人信息
      this.name = "";
      this.age = 0;
      this.contact = "";
      this.counsellor = "";
      this.ID = "";
      this.period = "";
    },

    //确认处方
    enter() {
      let a = "";
      for (let i = 0; i < this.all_num; i++) {
        a =
          a +
          this.all_med[i].name +
          "*" +
          this.all_med[i].count +
          "+" +
          this.all_med[i].fre +
          "#" +
          this.all_med[i].tips +
          ";";
      }
      let data = {
        patientId: this.patients[this.num - 1].patientId,
        doctorId: this.doctorId.toString(),
        period: this.period,
        selfReported: this.problem,
        presentHis: this.illness,
        anamnesis: this.past_illness,
        sign: this.symptom,
        clinicDia: this.diagnose,
        advice: this.prescription,
        medicine: a,
      };
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify(data);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      fetch("http://124.223.143.21/api/Confirm", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      console.log(data);
    },

    //得到就诊历史
    async getHistory() {
      const url =
        "http://124.223.143.21/api/DiagnosedHistory/GetDetailPre?patientId=" +
        this.patients[this.num - 1].patientId;
      //const testurl="http://124.223.143.21/api/DiagnosedHistory/GetDetailPre?patientId=2151895"
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      try {
        const response = await fetch(url, requestOptions);
        const result = await response.json();
        this.his_rep = result;
      } catch (error) {
        console.log("error", error);
      }

      if (
        this.his_rep.records === undefined ||
        this.his_rep.records.length === 0
      ) {
        this.isfirst = "初诊";
      } else {
        this.isfirst = "复诊";
        if (this.his_rep.patientInfo.gender) {
          this.his_rep.patientInfo.gender = "男";
        } else {
          this.his_rep.patientInfo.gender = "女";
        }
        const birthDate = this.his_rep.patientInfo.birthDate;
        const yearSubstring = birthDate.substring(0, 4); // 提取前四位子串
        const yearAsNumber = parseInt(yearSubstring); // 转换为数字
        const age = 2023 - yearAsNumber;
        this.his_rep.patientInfo.birthDate = age;

        for (let i = 0; i < this.his_rep.records.length; i++) {
          const diagnoseTime = this.his_rep.records[i].record.diagnoseTime;
          const shortenedTime = diagnoseTime.substring(0, 10); // 提取前10位子串
          this.his_rep.records[i].record.diagnoseTime = shortenedTime;
        }

        this.total_p = this.his_rep.records.length * 10;

        console.log(this.his_rep);
      }

      //发送假条数据
      var requestOptions2 = {
        method: "POST",
        redirect: "follow",
      };
      const url2 =
        "http://124.223.143.21/api/Leave/Offline?patientId=" +
        this.patientId +
        "&doctorId=" +
        this.doctorId +
        "&period=" +
        this.period +
        "&leaveDays=" +
        this.leave_day;

      fetch(url2, requestOptions2)
        .then((response) => {
          console.log(response);
          return response.text();
        })
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },

    //就诊历史翻页
    changeReport(np) {
      //np是newpage
      this.p = np - 1;
    },

    //同意或反对病假申请
    agree(id) {
      var requestOptions = {
        method: "PUT",
        redirect: "follow",
      };
      console.log(id);
      const url =
        "http://124.223.143.21/api/Leave/ratify?leaveNoteId=" +
        id +
        "&status=1";
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));

      this.leave_app.shift();
    },
    fail(id) {
      var requestOptions = {
        method: "PUT",
        redirect: "follow",
      };
      const url =
        "http://124.223.143.21/api/Leave/ratify?leaveNoteId=" +
        id +
        "&status=0";
      fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      this.leave_app.shift();
    },

    //假条模板
    handle(index) {
      for (let j = 0; j < 15; j++) {
        this.all_med[j].name = "";
        this.all_med[j].spec = "";
        this.all_med[j].single = "";
        this.all_med[j].ad = "";
        this.all_med[j].tips = "";
        this.all_med[j].fre = "";
      }
      console.log(this.medicine.length);
      while (this.medicine.length > 0) {
        this.medicine.pop();
      }
      console.log(this.medicine.length);

      this.problem = this.content[index].problem;
      this.illness = this.content[index].illness;
      this.past_illness = this.content[index].past_illness;
      this.symptom = this.content[index].symptom;
      this.diagnose = this.content[index].diagnose;
      this.prescription = this.content[index].prescription;
      this.all_num = this.content[index].medicine.length;

      let foundElement = null;
      for (let j = 0; j < this.all_num; j++) {
        let name = this.content[index].medicine[j];
        //foundElement是当前选中的药品
        for (let i = 0; i < this.all_medicine.length; i++) {
          if (this.all_medicine[i].medicineName === name) {
            foundElement = this.all_medicine[i];
            break;
          }
        }
        let a = {
          name: foundElement.medicineName,
          spec: foundElement.specification,
        };
        this.medicine.push(a);
        this.all_med[j].name = foundElement.medicineName;
        this.all_med[j].spec = foundElement.specification;
        this.all_med[j].single = foundElement.singledose;
        this.all_med[j].ad = foundElement.administration;
        this.all_med[j].tips = foundElement.attention;
        this.all_med[j].fre = foundElement.frequency;
      }

      console.log(index);
    },
  },
};
</script>
