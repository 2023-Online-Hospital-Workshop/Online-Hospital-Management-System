<template>
  <div id="app">
    <SideBar />
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';
export default {
  components: {
    SideBar,
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
