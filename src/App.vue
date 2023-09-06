
<template>
  <div id="app">
    <router-view></router-view>
    <div style="position:fixed; width: 120px; height: 200px; background-color: #999999; top: 68vh; left:180vh; opacity: 0"
         @click="redirectToHome"></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  components: {},
  setup() {
    const router = useRouter();
    function redirectToHome() {
      router.push({
        path: '/Patient/ask-ai'
      });
    }
    return {
      redirectToHome
    };
  },

  created() {
    setTimeout(() => {
      window.L2Dwidget.init({
        pluginRootPath: '../live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-koharu/assets/',
        tagMode: false,
        debug: false,
        model: {jsonPath: '/live2dw/live2d-widget-model-haruto/assets/haruto.model.json'},
        display: {position: 'right', width: 150, height: 300},
        mobile: {show: true},
        log: false
      });
    })
  }
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
