<template>
  <SideBar :role="0" />
  <Header />
</template>


<script>
import { ref, computed, onMounted } from "vue";
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";
import { useStore } from "vuex";

export default {
  name: "HomePage",
  components: {
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
};
</script>

<style lang="less" scoped>
.views {
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
</style>
