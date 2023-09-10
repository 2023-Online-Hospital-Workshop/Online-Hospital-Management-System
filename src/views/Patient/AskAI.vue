 
<template>
  <div class="container">
    <div class="main">
      <div class="box">
        <div class="title" style="margin-left: 15%">
          <span class="title-hn" style="vertical-align:middle;font-size: 25px;font-family: AliRegular;">AI小济-您的人工智能小助理</span>
        </div>
        <div id="content" class="content">
          <div v-for="(item,index) in info" :key="index">
            <div class="info_r info_default" v-if="item.type == 'leftinfo'">
              <img src="../../assets/talk.png" class="pic_r" />
              <img v-if="item.is_image"
             :src="require(`@/assets/${item.content}`)"
             :style="{ 'verticalAlign': 'top', 'marginTop': '-25px', 'width': item.width, 'height': item.height, 'margin-left': '30px' }" />
              <div  v-else class="con_r con_text">
                <div style="font-family: AliRegular;white-space: pre-line;">{{item.content}}</div>
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
                  <img src="../../assets/icon11.png" class="pic_l" />
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
          style="height: 68px;width: 100%;resize:none;padding-right:80px;outline: none;border-radius:5px;"
          id="text"
          v-model="customerText"
          @keyup.enter="sentMsg()"
        ></textarea>
        <button @click="sentMsg()" class="setproblems">
          <img src="@/assets/send.png" style="width:25px;height:25px;margin-top:10px;margin-left:-5px;margin-top:12px"/>
        </button>
      </div>
    </div>
  </div>
  <RobotAI2 />
</template>
<script>
import RobotAI2 from "@/components/Robot2.vue"
  export default {
    name: "AskAI",
    components: {
      RobotAI2,
    },
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
          {
            type: "leftinfo",
            time: this.getTodayTime(),
            name: "robot",
            content: "hello.gif",
            width: '200px',
            height: '200px',
            question: [],
            is_image: true,
          },
        ],
        timer: null,
        robotQuestion: [
          { id: 1, content: "我感觉不舒服，但不确定是否需要看医生？", index: 1 },
          { id: 2, content: "如何预约专家门诊？", index: 2 },
          { id: 3, content: "如果我对医生的诊断有疑虑，我可以要求复查或咨询其他医生吗？", index: 3 },
          {
            id: 4,
            content: "我应该如何准备我的初次就诊？",
            index: 4,
          },
          { id: 5, content: "我错过了我的预约时间，怎么办？", index: 5 }
        ],
        keyWords: [
          { id: 1, content: "是否需要看医生？是否就医", index: 1 },
          { id: 2, content: "预约专家门诊线上预约", index: 2 },
          { id: 3, content: "有疑虑复查咨询", index: 3 },
          {
            id: 4,
            content: "初次就诊",
            index: 4,
          },
          { id: 5, content: "错过了", index: 5 },
          { id: 6, content: "喉咙痛喉咙难受喉咙疼嗓子痛嗓子疼嗓子难受咳嗽严重一直咳嗽", index: 6 },
          { id: 7, content: "我头疼我头痛最近头", index: 7 },
          { id: 8, content: "肚子痛腹部疼痛腹部痛？", index: 8 },
          { id: 9, content: "小腿抽筋", index: 9 },
          { id: 10, content: "心跳加速心跳快", index: 10 },
          { id: 11, content: "挂什么科", index: 11 },
          { id: 12, content: "科室位置在哪里", index: 12 },
          { id: 13, content: "感冒发烧", index: 13 },
          { id: 14, content: "就医流程", index: 14 },
        ],
        robotAnswer: [
          {
            id: 1,
            content:
              "如果您感到身体不适，建议您先询问小济。根据自检结果，我们会为您提供相应的建议，如是否需要及时就医、采取何种治疗方法等。",
            index: 1,
            is_image: false,
          },
          { id: 2, content: "您可以通过我们的在线预约系统选择您需要的专家类型并查看其可用时间，然后根据您的方便选择合适的时间进行预约。请确保您在预约的时间内到达，以便医生为您提供服务。", index: 2, is_image: false},
          { id: 3, content: "当然可以。我们鼓励病人在治疗过程中积极参与并提出疑问。如果您对诊断有任何疑虑，可以要求复查或请求转诊给另一位专家。", index: 3, is_image: false },
          {
            id: 4,
            content: "请确保您带上所有与您的症状和疾病史相关的文件，如早前的医疗报告、药物清单等。同时，请务必提前10分钟到达，这样我们可以为您安排所有必要的检查和服务。",
            index: 4,
            is_image: false,
          },
          { id: 5, content: "如果您错过了预约，建议您尽快联系我们的客户服务部门。我们将尝试为您重新安排预约时间或推荐其他可用时间。", index: 5, is_image: false },
          { id: 6, content: "咳嗽可以由多种原因引起。如果你的症状严重或持续存在，你应该立即咨询医生或其他医疗专家。以下是一些常见的咳嗽原因：" +
                "\n" +
                "感冒或流感：这是最常见的原因之一。\n" +
                "支气管炎：长时间的咳嗽可能是由于支气管炎，特别是如果伴随有黄绿色的痰。\n" +
                "哮喘：可以引起干咳，特别是在夜间或早晨。\n" +
                "过敏：如花粉、尘螨或动物皮屑等过敏源引起的。\n" +
                "肺部感染：例如肺炎或肺结核。\n" +
                "胃酸反流病：胃酸流回食道可能导致咳嗽。\n" +
                "其他原因：吸烟、某些药物的副作用、肺部疾病等都可能导致咳嗽。\n" +
                "持续的、严重的咳嗽或伴随其他症状如胸痛、呼吸困难、发热、体重下降等，都应该尽快寻求医疗关注。特别是在流感季节或COVID-19等疾病流行期间，如果出现相关症状，应该尽快就医并遵循医生的建议。", index: 6, is_image: false },
          { id: 7, content: "头疼有多种原因，缺少睡眠确实可能是其中之一。其他可能的原因包括应激、脱水、长时间在电脑前、眼睛疲劳等。如果您觉得可能是因为睡眠不足，尝试调整您的作息时间和改善睡眠环境。若持续，请前往神经内科或疼痛科就诊。\n", index: 7, is_image: false },
          { id: 8, content: "腹部疼痛可能有很多原因，如胃炎、食物中毒、结肠炎、肠胃痉挛等。如果疼痛是轻微的并且短暂的，可能不必过于担心，但如果疼痛持续或增强，建议您咨询消化内科医生。", index: 8, is_image: false },
          { id: 9, content: "小腿抽筋可能由以下几点原因：脱水、电解质失衡（如钙、钾、镁缺乏）、过度劳累或运动、不当的坐、站或躺姿。确保摄入足够的水分和电解质，适当休息，如有需要，请前往神经内科或骨科咨询。", index: 9, is_image: false },
          { id: 10, content: "心跳加速可能与多种情况相关，如焦虑、恐惧、运动后、饮酒、咖啡因摄入过多、某些药物、疾病等。如果心跳加速是突然出现或者频繁发生，建议您前往心内科就诊。", index: 10, is_image: false },
          { id: 11, content: "如果你时常咳嗽并且严重，建议你首先考虑去以下几个科室：\n" +
                "呼吸内科：他们专门处理与肺部和呼吸有关的问题，如感冒、流感、支气管炎、哮喘、肺炎等。\n" +
                "耳鼻喉科：如果咳嗽是由上呼吸道感染、鼻炎、喉炎等引起的，可以考虑这个科室。\n" +
                "消化内科：如果你怀疑咳嗽与胃酸反流有关，那么消化内科可能更为合适。\n" +
                "根据您的症状，建议您先去耳鼻喉科挂号，系统可以为您提供挂号预约服务。", index: 11, is_image: false },
          { id: 12, content: "bg6.png", index: 12, is_image: true, width: '500px', height: '200px', },
          { id: 13, content: "很抱歉听说您不舒服。根据您提供的症状，您可能患有流感或其他上呼吸道感染。以下是一些建议的自我护理措施：\n" +
                "1. 保持充足的休息。\n" +
                "2. 多喝水和其他流质饮料，以保持水分。\n" +
                "3. 服用退烧药，如扑热息痛或布洛芬，但请遵循包装上的说明，并确保没有其他医学上的禁忌。\n" +
                "4. 如有咳嗽症状，可以考虑使用咳嗽药水。\n" +
                "5. 保持良好的手部卫生，避免与他人接触以减少病毒传播的风险。\n" +
                "6. 如果症状持续超过几天或恶化，请尽快咨询医生或医疗专家以获得进一步的建议。" + "\n" +
                "此外，我为您提供的建议仅供参考，并不能替代医生的专业建议。", index: 13, is_image: false },
          { id: 14, content: "bg5.png", index: 14, is_image: true, width: '600px', height: '300px', },
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
            is_image: false,
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
          let flag = false;
          let is_image = false;
          let width = '';
          let height = '';

          for (let i = 0; i < this.keyWords.length; i++) {
              const question = this.keyWords[i].content;
              const answer = this.robotAnswer[i].content;

              // 判断是否存在3个或更多的连续字符
              for (let j = 0; j < text.length - 2; j++) {
                  const substring = text.substring(j, j + 3); // 提取3个字符的子字符串
                  const regex = new RegExp(substring, 'i');   // 创建一个正则表达式
                  if (regex.test(question)) {                   // 检查是否匹配
                      flag = true;
                      answerText = answer;
                      is_image = this.robotAnswer[i].is_image;
                      width = this.robotAnswer[i].width;
                      height = this.robotAnswer[i].height;
                      break;
                  }
              }

              if (flag) break;
          }

          if (flag) {
            let obj = {}
            if (is_image) {
                obj = {
                  type: "leftinfo",
                  time: this.getTodayTime(),
                  name: "robot",
                  content: answerText,
                  question: [],
                  is_image: is_image,
                  width: width,
                  height:height,
                }
              }
              else {
                obj = {
                  type: "leftinfo",
                  time: this.getTodayTime(),
                  name: "robot",
                  content: answerText,
                  question: [],
                  is_image: is_image,
                }
              }
              this.info.push(obj);
          }
          else {
              answerText = "您可能想问：";
              let obj = {
                  type: "leftinfo",
                  time: this.getTodayTime(),
                  name: "robot",
                  content: answerText,
                  question: this.robotQuestion.slice(0,5),
                  is_image: false,
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
          content: "很高兴为您服务！有什么问题可以继续咨询小济",
          question: [],
        };
        this.info.push(happyEnding);
        this.$nextTick(() => {
          var contentHeight = document.getElementById("content");
            if (contentHeight) {
              contentHeight.scrollTop = contentHeight.scrollHeight;
            }
        });

      },
      showTimer() {
        this.timer = setTimeout(this.endMsg, 1000*180);
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
    overflow: hidden;
    .box {
      width: 100%;
      /* width: 680px; */
      height: 65vh;
      position: relative;
      padding: 1.25rem;
      position: relative;
      #content {
        height: 100%;
        overflow-y: scroll;
        font-size: 16px;
        font-family: AliRegular;
        width: 100%;
        margin-top: 30px;
        .con_text {
          color: #333;
          font-family: AliRegular;
          margin-bottom: 5px;
        }
        .con_que {
          color: #1c88ff;
          height: 30px;
          line-height: 30px;
          font-family: AliRegular;
          cursor: pointer;
        }
        .info_r {
          position: relative;
          margin-top: 30px;
          font-family: AliRegular;
          .circle_r {
            position: absolute;
            left: 0%;
          }
          .pic_r {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin-left: 15%;
          }
          .con_r {
            display: inline-block;
            /* max-width: 253px; */
            width: 40%;
            min-height: 55px;
            /* min-height: 20px; */
            background-color: #e2e2e2;
            border-radius: 6px;
            padding: 10px;
            margin-left: 20px;
            top: 0px;
            line-height: 20px;
            font-size: 16px;
            font-family: AliRegular;
            vertical-align: top;
          }
          .time_r {
            margin-left: 20%;
            color: #999999;
            font-size: 12px;
            font-family: AliRegular;
          }
        }
        .info_l {
          text-align: right;
          // margin-right: 20px;
          color: #3163C5;
          margin-top: 10px;
          font-size: 16px;
          font-family: AliRegular;

          // .circle_l {
          //   // vertical-align: -10px;
          // }
          .pic_l {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 13px;
            margin-top: 9px;
          }
          .time_l {
            margin-right: 90px;
            color: #999999;
            font-size: 12px;
            margin-top: 5px;
          }
          .con_l {
            display: inline-block;
            width: 40%;
            min-height: 51px;
            background-color: #3163C5;
            border-radius: 6px;
            padding: 10px;
            text-align: left;
            color: #fff;
            margin-right: 5px;
            line-height: 20px;
            font-family: AliRegular;
          }
        }
        #question {
          cursor: pointer;
        }
      }
    }
  }
  .setproblem {
    bottom: 0%;
    width: 60%;
    height: 20%;
    position: absolute;
    margin-top: 3.75rem;
    margin-left: 15%;

  }
  .setproblem textarea {
    color: black;
    top: 15%;
    box-sizing: border-box;
    position: absolute;
    border:5px solid #C0D3FF;
    font-family: AliRegular;
  }
  .setproblem button {
    width: 3rem;
    height: 3rem;
    line-height: 2.5rem;
    background: #3163C5;
    opacity: 1;
    border-radius: 4px;
    font-size: 10px;
    font-family: AliRegular;
    color: #ffffff;
    position: absolute;
    right: -8%;
    top: 20%;
    cursor: pointer;
    border: none;
    border-radius: 50%;
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
    font-family: AliRegular;
  }

  .czkj-question-msg {
    float: left;
    font-size: 16px;
    font-family: AliRegular;
    color: #3163C5;
  }

  .bgImage {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -1;
 }
  *{
    font-family: AliRegular;
  }
</style>