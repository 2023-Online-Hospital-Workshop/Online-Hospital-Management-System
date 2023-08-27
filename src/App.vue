
<template>
  <div id="app">
    <SideBar />
    <router-view></router-view>
    <AdministratorInfo />
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
// import PatientInfo from './components/Info/PatientInfo.vue';
// import DoctorInfo from './components/Info/DoctorInfo.vue';
import AdministratorInfo from "./components/Info/AdministratorInfo.vue";

export default {
  components: {
    SideBar,
    // PatientInfo,
    //DoctorInfo,
    AdministratorInfo,
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
