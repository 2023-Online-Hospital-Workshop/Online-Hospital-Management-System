<template>
  <el-container>
    <el-aside width="256px">
      <SideBar />
    </el-aside>
    <router-view></router-view>
  </el-container>
  <Header />
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import Header from "@/components/Header.vue";
export default {
  components: {
    SideBar,
    Header,
  },
};
</script>

<style scoped>
</style>