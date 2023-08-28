
<template>
  <div id="app">
    <SideBar />
    <router-view></router-view>
    <Header />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import Header from "./components/Header.vue";
// import PatientInfo from './components/Info/PatientInfo.vue';
// import DoctorInfo from './components/Info/DoctorInfo.vue';
//import DoctorInfo from "./components/Info/DoctorInfo.vue";

export default {
  components: {
    SideBar,
    // PatientInfo,
    //DoctorInfo,
    Header,
  },
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
}

.main {
  display: flex;
}

.router-view {
  margin-left: 200px;
}
</style>
