<template>
  <div
    class="mb-6 h-64 sidebar"
    :style="{
      backgroundColor: 'transparent',
      'pointer-events': is_expand ? 'none' : 'auto',
    }"
  >
    <va-sidebar
      color="primary"
      gradient
      minimized-width="64px"
      :width="is_expand ? '0px' : '220px'"
    >
      <va-sidebar-item
        @click="clickMenu(item)"
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
        active-color="backgroundPrimary"
      >
        <va-sidebar-item-content
          :class="{
            selectedStyle: item.path === selectedItem,
            unselectedStyle: item.path !== selectedItem,
          }"
        >
          <div>
            <i class="material-icons">{{ item.icon }}</i>
          </div>
          <va-sidebar-item-title style="font-size: 18px">
            {{ item.label }}
          </va-sidebar-item-title>
        </va-sidebar-item-content>
      </va-sidebar-item>
      <img src="../assets/dun.png" style="margin-top: 80px" />
    </va-sidebar>
  </div>
</template>


<script>
import { computed, watch, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SideBar",
  props: {
    role: String,
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const isCollapse = computed(() => store.state.state.isCollapse);
    const menu = computed(() => store.state.state.aside_data[props.role]);
    const aside_title = computed(
      () => store.state.state.aside_title[props.role]
    );
    const is_expand = ref(store.state.state.is_expand);
    const selectedItem = ref("");

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
      console.log(item.path);
      selectedItem.value = item.path;
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
    watch(
      () => store.state.state.is_expand,
      (newValue) => {
        is_expand.value = newValue;
      }
    );
    return {
      isCollapse,
      menu,
      aside_title,
      noChildren,
      hasChildren,
      clickMenu,
      is_expand,
      selectedItem,
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
  top: 60px;
  background-color: #002fb0;
}

.el-menu-item {
  margin-bottom: 16px;
}

* {
  font-family: AliRegular;
  /* 应用字体 */
  --va-font-family: AliRegular;
}
.selectedStyle {
  background-color: #fafafa;
  height: 25px;
  border-radius: 5px;
  color: #002fb0;
}
.unselectedStyle {
}
</style>
