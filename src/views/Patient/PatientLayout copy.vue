<template>
  <div class="ncontainer">
    <div class="nleft" :style="{ width: is_expand ? '200px' : '0px' }">
      <div class="ntitle" @click="toggleSidebar">济康同行</div>
      <SideBar :role="0" />
    </div>
    <div class="nright">
      <router-view></router-view>
    </div>
    <Header />
  </div>

 
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
// import Header from "@/components/Header.vue";
export default {
  components: {
    SideBar,
    // Header,
  },
  setup() {
    const store = useStore()
    setTimeout(() => {
      store.state.state.is_expand = true
    }, 2000)
    
    const is_expand = ref(store.state.state.is_expand)
    const toggleSidebar = () => {
      console.log(store.state.state.is_expand);
      store.state.state.is_expand = !store.state.state.is_expand;
    };
    return {
      is_expand,
      toggleSidebar
    }
  },
}
</script>

<style scoped lang="scss">
.ncontainer {
  width: 100vw;
  height: 100vh;
  display: flex;

  .nleft {
    display: flex;
    flex-direction: column;
  }
  .nright {
    flex: 1;
  }
}
.ntitle {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #0047c7;
  font-size: 35px;
  font-weight: bold;
}
</style>
