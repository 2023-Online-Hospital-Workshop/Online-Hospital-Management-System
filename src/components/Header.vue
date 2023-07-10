<template>
  <header class="header">
    <h1>{{ title }}</h1>
  </header>
</template>

<script>
export default {
  name: 'CommonHeader',
  data() {
    return {
      title: 'My Vue App',
    }
  }
}
</script>

<style scoped>
.header {
  width: 100%;
  height: 50px;
  background-color: #007bff;
  color: white;
  /* 添加你需要的样式... */
}
</style>
