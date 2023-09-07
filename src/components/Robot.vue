<template>
  <div id="app">
    <img src="../assets/robot.gif" style="position:fixed; width: 200px; height: 200px; top: 68vh; left:160vh"
         @click="redirectToHome">
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "RobotAI",
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
}
</script>