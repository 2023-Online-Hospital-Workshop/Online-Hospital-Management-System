<template>
  <SideBar :role="0" />
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
* {
  font-family: AliRegular;
  --va-font-family: AliRegular;
  /* 应用字体 */
}
</style>