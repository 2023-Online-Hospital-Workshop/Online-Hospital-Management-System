<template>
  <div id="app">
    <SideBar />
    <PatientInfo />
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
import PatientInfo from './components/Info/PatientInfo.vue';
export default {
  components: {
    SideBar,
    PatientInfo
  }
}
</script>

<style>
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
