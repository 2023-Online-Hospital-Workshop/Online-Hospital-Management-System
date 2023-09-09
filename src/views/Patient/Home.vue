<template style="font-family: AliRegular;">
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
          <div class="detail" style="line-height:1.5em">
            <p>济康同行医院是一所<span class="my-text">综合性医疗机构</span>，位于上海市嘉定区，作为同济大学医学院的重要教学医院，校医院拥有丰富的经验和杰出的医疗团队。<br><br></p>

            <p>本医院设有<span
                class="my-text">多个临床科室和医疗中心</span>，涵盖了内科、外科、眼科、耳鼻喉科等各个医疗领域，以确保为患者提供高质量的医疗服务。<br><br>
            </p>

            <p>本医院注重<span class="my-text">医疗教育和科研工作</span>，与同济大学医学院紧密合作，培养了一大批医学人才和科研精英。<br><br></p>
            <p>济康同行医院还积极参与<span class="my-text">国际医疗合作与交流</span>，与多个国际医疗机构建立了合作关系。<br><br></p>
            

            <div><span class="my-text">济康同行医院地址：</span>上海市嘉定校区曹安公路4800号</div>
            <div><span class="my-text">负责人联系电话：</span>13744558454</div>

          </div>
          <div class="detail">
            <img src="@/assets/img1.png" alt="">
          </div>
        </div>
      </div>
      <div style="text-align: center; margin:150px; transform: scale(1.5);">



          <img style="width: 80%;margin: 0 auto;" src="@/assets/bg5.png" alt="">


      </div>
      <div class="content">
        <div class="c-title">校医院地图</div>
        <div class="c-bottom">
          <img style="width: 90%;margin: 0 auto;" src="@/assets/bg6.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/Header.vue'
import { useStore } from 'vuex'
import img1 from '@/assets/img.png'  // 这边引入图片
import news1 from '@/assets/list1.jpeg'
import news3 from '@/assets/list3.png'
export default {
  name: 'HomePage',
  components: {
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
        imgUrl: news1,
      },
      {
        imgUrl: news3,
      },
    ]
    

    const isCollapse = computed(() => store.state.aside.isCollapse)

    onMounted(() => {
      //动态设置内容高度 让footer始终居底
      Height.value = document.documentElement.clientHeight - 100
      //监听浏览器窗口变化
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
  //min-width: 1330px;
  min-height: 400px;
  margin: 100px auto 50px;

  .bgImage {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  .bannerImg {
    width: 100%;
    height: 100%;
  }

  .content {
    margin: 30px 10px 0;
    padding-bottom: 10px;
    background: #FFFFFF;
    box-shadow: -1px 4px 10px 0px rgba(142, 151, 176, 0.61);
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

.my-text {
  font-weight: bold;
}</style>
