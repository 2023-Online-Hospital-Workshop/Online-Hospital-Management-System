<template>
  <div class="sidebar">
    <va-sidebar color="primary" gradient>
      <h3 class="title">{{ title }}</h3>
      <va-sidebar-item
        @click="clickItem(item)"
        v-for="item in items"
        :index="item.path"
        :key="item.path"
        active-color="backgroundPrimary"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.name }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      title : "济康同行-管理员端",
      items : {
        0 : {
          icon: "list",
          name: "处方订单管理",
          path: "/Admin/order",
        },
        1 : {
          icon: "list",
          name: "药品库存管理",
          path: "/Admin/medicine",
        },
        2 : {
          icon: "list",
          name: "坐诊医生管理",
          path: "/Admin/doctor",
        },
      },
    }
  },
  methods: {
    clickItem(item) {
      this.$router.push({
        path: item.path,
      })
    }
  }
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  font-weight: semi-bold;
  position: fixed;
  background-color: #002fb0;
  user-select: none;
  z-index: 99999;
}
.title {
  color: white;
  display: flex;
  justify-content: center;
  font-size: 22px;
  margin: 10px;
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
}

* {
  font-family: AliRegular; /* 应用字体 */
  --va-font-family: AliRegular;
}
</style>
  