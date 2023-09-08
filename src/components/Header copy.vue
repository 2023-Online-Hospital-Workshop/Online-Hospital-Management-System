<template>
  <header class="header">
    <va-icon name="menu" class="header-icon" @click="toggleSidebar"></va-icon>
    <h1 class="main-title">济康同行</h1>
    <PatientInfo v-if="role === '0'" />
    <AdministratorInfo v-else />
  </header>
</template>

<script>
import { useStore } from "vuex";
import PatientInfo from "./Info/PatientInfo.vue";
import AdministratorInfo from "./Info/AdministratorInfo.vue";

export default {
  name: "CommonHeader",
  components: {
    PatientInfo,
    AdministratorInfo,
  },
  setup() {
    const title = "济康同行";
    const store = useStore();
    const role = sessionStorage.getItem('role');
    const toggleSidebar = () => {
      console.log(store.state.state.is_expand);
      store.state.state.is_expand = !store.state.state.is_expand;
    };

    return {
      title,
      toggleSidebar,
      role,
    };
  },
};
</script>

<style scoped>
.header {
  position: fixed; /* 使其始终在屏幕顶部 */
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #002fb0;
  height: 60px; /* 为Header设置一个固定高度 */
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16); /* 为Header添加轻微的阴影效果 */
  z-index: 100; /* 确保Header始终位于其他内容之上 */
  padding: 0 20px; /* 两侧添加一些边距 */
}

.main-title {
  flex-grow: 1;
  text-align: center;
  font-size: 24px; /* 增大字体大小 */
  margin: 0; /* 移除所有边距 */
  color: white; /* 设置标题颜色为白色 */
}

.header-icon {
  cursor: pointer;
  color: white; /* 根据需要设置颜色 */
  font-size: 24px; /* 调整大小 */
  margin-right: 10px; /* 如果需要，可以添加边距 */
}
</style>
