<template>
  <div id="app">
    <img src="../assets/robot2.gif" style="position:fixed; width: 250px; height: 250px; top: 67vh; left:160vh"
         @click="redirectToHome">
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "RobotAI2",
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