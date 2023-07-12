<template>
  <div id="app">
<<<<<<< HEAD
    <SideBar/>
=======
    <SideBar />
>>>>>>> 044ab82871435c6474b4d0164120ca6aade7b78a
    <router-view></router-view>
  </div>
</template>

<script>
<<<<<<< HEAD
import SideBar from './components/SideBar.vue'
import axios from 'axios'

axios.get('http://124.223.143.21:4999/WenhaoYan_test')
      .then((response) => {
        console.log(response);
        this.title_visible = true;
        this.doctorList = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

=======
import SideBar from './components/SideBar.vue';
>>>>>>> 044ab82871435c6474b4d0164120ca6aade7b78a
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
