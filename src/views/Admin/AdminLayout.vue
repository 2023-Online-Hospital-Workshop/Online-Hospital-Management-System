<template>
  <SideBar :role="2"/>
  <el-header>
    <Header/>
  </el-header>
  <router-view/>
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

<style scoped>
* {
  font-family: AliRegular;
  --va-font-family: AliRegular;
  /* 应用字体 */
}
</style>