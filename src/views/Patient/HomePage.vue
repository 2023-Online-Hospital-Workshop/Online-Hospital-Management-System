<template>
<<<<<<< HEAD:src/views/Patient/Home.vue
  <div>
    <SideBar :role="0" />
    <Header />
    <div class="ncontainer">
      <img src="@/assets/bg4.png" class="bgImage" alt="" />
      <el-carousel height="258px">
        <el-carousel-item v-for="(item, index) in list" :key="index">
          <img :src="item.imgUrl" alt="" class="bannerImg" />
        </el-carousel-item>
      </el-carousel>
      <div class="content">
        <div class="c-title">校医院简介</div>
        <div class="c-bottom">
          <div class="detail">
            校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍校医院历史介绍。
          </div>
          <div class="detail">
            <img src="@/assets/img1.png" alt="">
          </div>
        </div>
      </div>
      <div class="content">
        <div class="c-title">校医院就诊流程</div>
        <div class="c-bottom">


          <img style="width: 80%;margin: 0 auto;" src="@/assets/bg5.png" alt="">


        </div>
      </div>
      <div class="content">
        <div class="c-title">校医院地图</div>
        <div class="c-bottom">
          <img style="width: 90%;margin: 0 auto;" src="@/assets/bg6.png" alt="">
        </div>
      </div>
    </div>
=======
  <div>1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>

  <div>
    <SideBar :role="0" />
    <Header />
    <News />
  </div>
  <div class="center-image">
    <img src="../../assets/call.png" alt="Description" :style="{ width: '1200px', height: '800px' }"  >
>>>>>>> dcbb78be86c1bddfad15ffa30d0b508e693c2720:src/views/Patient/HomePage.vue
  </div>
</template>

<script>
<<<<<<< HEAD:src/views/Patient/Home.vue
import { ref, computed, onMounted } from 'vue'
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/Header.vue'
import { useStore } from 'vuex'
import img1 from '@/assets/img.png'  // 这边引入图片
=======
import News from "@/components/News.vue";
import { ref, computed, onMounted } from "vue";
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";
import { useStore } from "vuex";

>>>>>>> dcbb78be86c1bddfad15ffa30d0b508e693c2720:src/views/Patient/HomePage.vue
export default {
  name: 'HomePage',
  components: {
    News,
    SideBar,
    Header,
   
  },
  setup() {
    const store = useStore()
    const Height = ref(1000)
    // 轮播图图片
    const list = [
      {
        imgUrl: img1,
      },
      {
        imgUrl: img1,
      },
    ]

    const isCollapse = computed(() => store.state.aside.isCollapse)

    onMounted(() => {
      //动态设置内容高度 让footer始终居底
      Height.value = document.documentElement.clientHeight - 100
      //监听浏览器窗口变化
<<<<<<< HEAD:src/views/Patient/Home.vue
      window.addEventListener('resize', () => {
        Height.value = document.documentElement.clientHeight - 100
      })
    })

    return { Height, isCollapse, list }
  },
}
</script>

<style lang="scss" scoped>
.ncontainer {
  width: 70vw;
  min-width: 1330px;
  margin: 100px auto 50px;
  .bgImage {
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: -1;
}
  .bannerImg {
=======
      window.addEventListener("resize", () => {
        Height.value = document.documentElement.clientHeight - 100;
      });
    });
 
    return { Height, isCollapse };
  },

  data() {
    return {
      value: 0,
      items: [
        "https://picsum.photos/1500",
        "https://picsum.photos/1501",
        "https://picsum.photos/1502",
        "https://picsum.photos/1503",
        "https://picsum.photos/1504",
      ],
    };
  }



};
</script>

<style lang="less" scoped>
.views {
  .center-image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    top: 500px;
  }
  //Header
  .header {
    background-color: #ffffff;
    padding: 0;
  }

  //Aside
  .right-main-box-fold {
    display: block;
    position: relative;
    margin-left: 200px;
  }

  .right-main-box-unfold {
    display: block;
    position: relative;
    margin-left: 64px;
  }

  //Main
  .main {
    border-top: solid #b2b2b2 2px;
  }

  //Footer
  .footer {
>>>>>>> dcbb78be86c1bddfad15ffa30d0b508e693c2720:src/views/Patient/HomePage.vue
    width: 100%;
    height: 100%;
  }
  .content {
    margin: 30px 10px 0;
    padding-bottom: 10px;
    background: #FFFFFF;
    box-shadow: -1px 4px 10px 0px rgba(142,151,176,0.61);
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
    .c-bottom {
      display: flex;
      margin: 48px 33px;
      justify-content: space-between;
      .detail {
        width: 47%;
        font-weight: 500;
        color: #000000;
        line-height: 32px;
        font-size: 22px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }


}

// va-carousel {
//   width: 100%; /* 设定宽度为容器的100% */
//   height: 300px; /* 设定一个固定的高度，例如300px */
//   background-color: red;
// }
</style>
