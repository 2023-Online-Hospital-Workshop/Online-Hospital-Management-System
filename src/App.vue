<template>
  <div id="app">
    <SideBar/>
    <router-view></router-view>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
// import axios from 'axios'

// axios.get('http://124.223.143.21:4999/WenhaoYan_test')
//       .then((response) => {
//         console.log(response);
//         this.title_visible = true;
//         this.doctorList = response.data;
//       })
//       .catch((error) => {
//         console.log(error);
//       });

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
