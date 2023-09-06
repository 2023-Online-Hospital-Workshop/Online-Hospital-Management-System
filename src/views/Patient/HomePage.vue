<template>
  <div>1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</div>

  <div>
    <SideBar :role="0" />
    <Header />
    <News />
  </div>
  <div class="center-image">
    <img src="../../assets/call.png" alt="Description" :style="{ width: '1200px', height: '800px' }"  >
  </div>
</template>

<script>
import News from "@/components/News.vue";
import { ref, computed, onMounted } from "vue";
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";
import { useStore } from "vuex";

export default {
  name: "HomePage",
  components: {
    News,
    SideBar,
    Header,
   
  },
  setup() {
    const store = useStore();
    const Height = ref(1000);

    const isCollapse = computed(() => store.state.aside.isCollapse);

    onMounted(() => {
      //动态设置内容高度 让footer始终居底
      Height.value = document.documentElement.clientHeight - 100;
      //监听浏览器窗口变化
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
    width: 100%;
    background-color: #fafcfb;
    margin-left: -8px;
  }


}

// va-carousel {
//   width: 100%; /* 设定宽度为容器的100% */
//   height: 300px; /* 设定一个固定的高度，例如300px */
//   background-color: red;
// }
</style>
