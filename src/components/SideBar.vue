<template>
  <div class="mb-6 h-64 sidebar">
    <va-sidebar color="primary" gradient minimized-width="64px" width="15rem">
      <h3 class="headerText" v-if="!isCollapse">{{ aside_title }}</h3>
      <va-sidebar-item
        @click="clickMenu(item)"
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
        active-color="backgroundPrimary"
      >
        <va-sidebar-item-content>
          <va-icon :name="item.icon" />
          <va-sidebar-item-title>
            {{ item.label }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>


<script>
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SideBar",
  setup() {
    const store = useStore();
    const router = useRouter();

    const isCollapse = computed(() => store.state.state.isCollapse);
    const menu = computed(() => store.state.state.aside_data);
    const aside_title = computed(() => store.state.state.aside_title);

    const noChildren = computed(() => {
      return menu.value.filter((item) => {
        return !item.children;
      });
    });

    const hasChildren = computed(() => {
      return menu.value.filter((item) => {
        return item.children;
      });
    });

    const clickMenu = (item) => {
      router.push({
        name: item.name,
      });
      console.log(router);
    };

    watch(
      menu,
      (new_val, old_val) => {
        console.log(new_val, old_val);
      },
      { immediate: true }
    );
    return {
      isCollapse,
      menu,
      aside_title,
      noChildren,
      hasChildren,
      clickMenu,
    };
  },
};
</script>

<style scoped>
.headerText {
  color: white;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin: 10px;
  margin-bottom: 20px;
}

.yellowIcon {
  color: orange;
  font-size: 28px;
}

.sidebar {
  width: 200px;
  height: 100vh;
  font-weight: semi-bold;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  background-color: #002fb0;
}

.el-menu-item {
  margin-bottom: 16px;
}

* {
  font-family: SFRegular; /* 应用字体 */
}
</style>
