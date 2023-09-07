
<template>
  <div id="app">
    <router-view></router-view>
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
