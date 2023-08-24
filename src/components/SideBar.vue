<template>
  <el-menu
    default-active="1-4-1"
    class="sidebar"
    :unique-opened="true"
    :collapse="isCollapse"
    background-color="#002fa7"
    text-color="#fff"
    active-text-color="#000"
  >
    <h3 class="headerText" v-if="!isCollapse">{{ aside_title }}</h3>

    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
    >
      <el-icon>
       <component :is="item.icon" class="yellowIcon"/>
      </el-icon>
      <span class="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.name">

      <template class="title">
        <i :class="'el-icon-' + item.icon" style="color: #ffc107"></i>
        <span class="title">{{ item.label }}</span>
      </template>

      <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
        <el-menu-item :index="subItem.path" @click="clickMenu(subItem)">
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>


<script>
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

export default {
  name: "SideBar",
  setup() {
    const store = useStore()
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
    };

    watch(menu, (new_val, old_val) => {
      console.log(new_val, old_val);
    }, { immediate: true });
    return { isCollapse, menu, aside_title, noChildren, hasChildren, clickMenu };
  }
};
</script>

<style scoped>
.title {
  color: white;
  display: flex;
  justify-content: center;
  font-size: 16px;
  padding-left: 20px;
}

.headerText {
  color: white;
  display: flex;
  justify-content: center;
  font-size: 28px;
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
