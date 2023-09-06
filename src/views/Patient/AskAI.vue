 
<template>
  <div class="container">
    <div class="main">
      <div class="box">
        <div class="title">
          <span class="title-hn" style="vertical-align:middle">AI小济</span>
        </div>
        <div id="content" class="content">
          <div v-for="(item,index) in info" :key="index">
            <div class="info_r info_default" v-if="item.type == 'leftinfo'">
              <span src="../../assets/robot.png" class="circle circle_r">
                <img src="../../assets/robot.png" class="pic_r" />
              </span>
              <div class="con_r con_text">
                <div>{{item.content}}</div>
                <div v-for="(item2,index) in item.question" :key="index">
                  <div class="con_que" @click="clickRobot(item2.content,item2.id)">
                    <div class="czkj-question-msg">
                      {{item2.index}}
                      {{item2.content}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="time_r">{{item.time}}</div>
            </div>
 
            <div class="info_l" v-if="item.type == 'rightinfo'">
              <div class="con_r con_text">
                <span class="con_l">{{item.content}}</span>
                <span class="circle circle_l">
                  <img src="../../assets/user.png" class="pic_l" />
                </span>
              </div>
              <div class="time_l">{{item.time}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="setproblem">
        <textarea
          placeholder="请输入您的问题..."
          style="height: 68px;width: 100%;resize:none;padding-right:80px;outline: none;border-color:#ccc;border-radius:5px;"
          id="text"
          v-model="customerText"
          @keyup.enter="sentMsg()"
        ></textarea>
        <button @click="sentMsg()" class="setproblems">

          <span style="vertical-align: 4px;">发 送</span>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "AskAI",
    components: {},
    computed: {},
    data() {
      return {
        customerText: "",
        info: [
          {
            type: "leftinfo",
            time: this.getTodayTime(),
            name: "robot",
            content:
              "您好，欢迎来到济康同行，我是您的AI助手小济，您可以向我提问~",
            question: [],
          },
        ],
        timer: null,
        robotQuestion: [
          { id: 1, content: "客户资料完善后是由谁来审批", index: 1 },
          { id: 2, content: "客户资料审批一直不通过", index: 2 },
          { id: 3, content: "客户资料审批需要多长时间", index: 3 },
          {
            id: 4,
            content: "注册网站时需要一次填写完所有的客户资料吗",
            index: 4,
          },
          { id: 5, content: "注册时使用的手机号变更怎么办", index: 5 },
        ],
        robotAnswer: [
          {
            id: 1,
            content:
              "答案客户资料完善后是由谁来审批,答案客户资料完善后是由谁来审批,答案客户资料完善后是由谁来审批",
            index: 1,
          },
          { id: 2, content: "测试", index: 2 },
          { id: 3, content: "测试", index: 3 },
          {
            id: 4,
            content: "3333333",
            index: 4,
          },
          { id: 5, content: "44444444", index: 5 },
        ],
      };
    },
    created() {
      this.showTimer();
    },
    watch: {},
    methods: {
      // 用户发送消息
      sentMsg() {
        clearTimeout(this.timer);
        this.showTimer();
        let text = this.customerText.trim();
        if (text != "") {
          var obj = {
            type: "rightinfo",
            time: this.getTodayTime(),
            content: text,
          };
          this.info.push(obj);
          this.appendRobotMsg(this.customerText);
          this.customerText = "";
          this.$nextTick(() => {
            var contentHeight = document.getElementById("content");
            contentHeight.scrollTop = contentHeight.scrollHeight;
          });
        }
      },
      // 机器人回答消息
      appendRobotMsg(text) {
        clearTimeout(this.timer);
        this.showTimer();
        text = text.trim();
        let answerText = "";
        let flag;
        for (let i = 0; i < this.robotAnswer.length; i++) {
          if (this.robotAnswer[i].content.indexOf(text) != -1) {
            flag = true;
            answerText = this.robotAnswer[i].content;
            break;
          }
        }
        if (flag) {
          let obj = {
            type: "leftinfo",
            time: this.getTodayTime(),
            name: "robot",
            content: answerText,
            question: [],
          };
          this.info.push(obj);
        } else {
          answerText = "您可能想问：";
          let obj = {
            type: "leftinfo",
            time: this.getTodayTime(),
            name: "robot",
            content: answerText,
            question: this.robotQuestion,
          };
          this.info.push(obj);
        }
        this.$nextTick(() => {
          var contentHeight = document.getElementById("content");
          contentHeight.scrollTop = contentHeight.scrollHeight;
        });
      },
      sentMsgById(val, id) {
        clearTimeout(this.timer);
        this.showTimer();
 
        let robotById = this.robotAnswer.filter((item) => {
          return item.id == id;
        });
        let obj_l = {
          type: "leftinfo",
          time: this.getTodayTime(),
          name: "robot",
          content: robotById[0].content,
          question: [],
        };
        let obj_r = {
          type: "rightinfo",
          time: this.getTodayTime(),
          name: "robot",
          content: val,
          question: [],
        };
        this.info.push(obj_r);
        this.info.push(obj_l);
        this.$nextTick(() => {
          var contentHeight = document.getElementById("content");
          contentHeight.scrollTop = contentHeight.scrollHeight;
        });
      },
      // 点击机器人的单个问题
      clickRobot(val, id) {
        this.sentMsgById(val, id);
      },
      // 结束语
      endMsg() {
        let happyEnding = {
          type: "leftinfo",
          time: this.getTodayTime(),
          content: "退下吧",
          question: [],
        };
        this.info.push(happyEnding);
        this.$nextTick(() => {
          var contentHeight = document.getElementById("content");
          contentHeight.scrollTop = contentHeight.scrollHeight;
        });
 
      },
      showTimer() {
        this.timer = setTimeout(this.endMsg, 1000*60);
      },
      getTodayTime() {
        // 获取当前时间
        var day = new Date();
        let seconds = day.getSeconds();
        if (seconds < 10) {
          seconds = "0" + seconds;
        } else {
          seconds = seconds + "";
        }
        let minutes = day.getMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        } else {
          minutes = minutes + "";
        }
        let time =
          day.getFullYear() +
          "-" +
          (day.getMonth() + 1) +
          "-" +
          day.getDate() +
          " " +
          day.getHours() +
          ":" +
          minutes +
          ":" +
          seconds;
        return time;
      },
    },
    mounted() {},
    props: {},
    unmounted() {},
  };
</script>
<style lang="scss">
  .main {
    margin-top: 60px;
    width: 100%;
    height: 70vh;
    background: #fafafa;
    overflow: hidden;
    .box {
      width: 100%;
      /* width: 680px; */
      height: 65vh;
      background-color: #fafafa;
      position: relative;
      padding: 1.25rem;
      position: relative;
      #content {
        height: 100%;
        overflow-y: scroll;
        font-size: 14px;
        width: 100%;
        margin-top: 10px;
        .circle {
          display: inline-block;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #eff1f3;
        }
        .con_text {
          color: #333;
          margin-bottom: 5px;
        }
        .con_que {
          color: #1c88ff;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
        }
        .info_r {
          position: relative;
          .circle_r {
            position: absolute;
            left: 0%;
          }
          .pic_r {
            width: 30px;
            height: 30px;
            margin: 10px;
          }
          .con_r {
            display: inline-block;
            /* max-width: 253px; */
            width: 55%;
            min-height: 55px;
            /* min-height: 20px; */
            background-color: #e2e2e2;
            border-radius: 6px;
            padding: 10px;
            margin-left: 60px;
          }
          .time_r {
            margin-left: 60px;
            color: #999999;
            font-size: 12px;
          }
        }
        .info_l {
          text-align: right;
          // margin-right: 20px;
          color: #ffffff;
          color: #3163C5;
          margin-top: 10px;

          // .circle_l {
          //   // vertical-align: -10px;
          // }
          .pic_l {
            width: 23px;
            height: 30px;
            margin: 13px;
            margin-top: 9px;
          }
          .time_l {
            margin-right: 60px;
            color: #999999;
            font-size: 12px;
            margin-top: 5px;
          }
          .con_l {
            display: inline-block;
            width: 220px;
            min-height: 51px;
            background-color: #3163C5;
            border-radius: 6px;
            padding: 10px;
            text-align: left;
            color: #fff;
            margin-right: 5px;
          }
        }
        #question {
          cursor: pointer;
        }
      }
    }
  }
  .setproblem {
    bottom: 0;
    width: 100%;
    height: 20%;
    background-color: #ffffff;
    position: absolute;
    margin-top: 3.75rem;

  }
  .setproblem textarea {
    color: black;
    padding: 10px;
    box-sizing: border-box;
  }
  .setproblem button {
    width: 5.875rem;
    height: 2.5rem;
    line-height: 2.5rem;
    background: #3163C5;
    opacity: 1;
    border-radius: 4px;
    font-size: 10px;
    color: #ffffff;
    position: absolute;
    right: 10%;
    top: 60%;
    cursor: pointer;
    border: none;
  }
 
  .czkj-item-title {
    line-height: 25px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 5px;
  }
 
  .czkj-item-question {
    cursor: pointer;
    display: block;
    padding: 8px;
    position: relative;
    border-bottom: 1px dashed #ccc;
    line-height: 20px;
    min-height: 20px;
    overflow: hidden;
  }
 
  .czkj-question-msg {
    float: left;
    font-size: 14px;
    color: #3163C5;
  }
</style>
