<template>
    <h6>On click</h6>
    <va-carousel  class="va-carousel "
      v-model="value"
      :items="items"
      indicators
    />
  
    <h6>On hover</h6>
    <va-carousel class="va-carousel "
      v-model="value"
      :items="items"
      indicators
      indicator-trigger="hover"
    />
  </template>
  
  <script>
  export default {
    
    props:{}, 
    data() {
      return {
        value: 0,
        items: [
          "https://picsum.photos/1500",
          "https://picsum.photos/1501",
          "https://picsum.photos/1502",
          "https://picsum.photos/1503",
          "https://picsum.photos/1504",
        ],
      };
    },
  };
  </script>
  
<style lang="less" scoped>

va-carousel {
  width: 100%; /* 设定宽度为容器的100% */
  height: 300px; /* 设定一个固定的高度，例如300px */
  background-color: red;
}


</style>
