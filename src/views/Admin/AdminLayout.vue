<template>
    <el-container>
      <el-aside width="250px">
        <NavSidebar></NavSidebar>
      </el-aside>
      <router-view></router-view>
    </el-container>
</template>

<script>
import NavSidebar from '../../components/Admin/NavSidebar.vue'
export default {
  components: {
    NavSidebar,
  }
}
</script>

<style scoped>
</style>