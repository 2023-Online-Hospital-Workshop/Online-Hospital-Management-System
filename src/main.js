import { createApp } from 'vue'
import { createStore } from 'vuex';
import App from './App.vue'
import router from "@/router/router";
import aside from './store/aside.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";

const store = createStore({
    state: aside,
}); // 创建 Vuex store 实例

const app = createApp(App)
app.use(router)
app.use(store)
app.use(createVuestic())
app.use(ElementPlus);
for (const iconName in ElIcons) {
    console.log(iconName)
    app.component(iconName, ElIcons[iconName])
}

app.provide('$store', store)
app.mount('#app')
