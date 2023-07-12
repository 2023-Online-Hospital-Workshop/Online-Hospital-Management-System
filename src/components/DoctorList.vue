<template>

    <va-list-label style="width: 900px" id="title" v-show="title_visible"> Search Results </va-list-label>
    <va-list class="doctor-list">
      
      <va-list-item
        v-for="(content, index) in doctorList"
        :key="index"
        class="list__item"
      >
        <va-list-item-section avatar>
          <va-avatar>
            <img :src="content.img_link">
          </va-avatar>
        </va-list-item-section>
  
        <va-list-item-section>
          <va-list-item-label>
            {{ content.name }}
          </va-list-item-label>
  
          <va-list-item-label>          
            {{ content.description }}
          </va-list-item-label>
        </va-list-item-section>
  
        <!-- <va-list-item-section icon>
          <va-icon
            name="remove_red_eye"
            color="background"
          />
        </va-list-item-section> -->
      </va-list-item>
    </va-list>
  </template>
  <script>
  export default {
    props: ['doctorList', 'title_visible'],
  };
  </script>
<style lang="scss">
.doctor-list {
  margin-right: 10%;
}
.list__item + .list__item {
  margin-top: 20px;
}
</style>
