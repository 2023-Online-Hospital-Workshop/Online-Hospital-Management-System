<template>
  <el-container>
    <SideBar :role="2"></SideBar>
    <el-container>
    </el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>

<script>
import SideBar from '../../components/SideBar.vue';
import Header from "../../components/Header.vue";

export default {
  components: {
    SideBar,
    Header,
  },
}
</script>

<style scoped></style>