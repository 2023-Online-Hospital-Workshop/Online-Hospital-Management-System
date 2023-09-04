<template>
  <SideBar />
  <router-view></router-view>
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