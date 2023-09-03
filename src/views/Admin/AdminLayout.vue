<template>
    <el-container>
      <!-- <el-aside width="256px">
        <NavSidebar></NavSidebar>
      </el-aside> -->
    </el-container>
    
    <el-container>
      <Header></Header>
      <router-view></router-view>
    </el-container>
</template>

<script>
// import NavSidebar from '../../components/Admin/NavSidebar.vue';
import Header from "../../components/Header.vue";

export default {
  components: {
    // NavSidebar,
    Header,
  }
}
</script>

<style scoped>
</style>