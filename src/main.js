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
import 'material-icons/iconfont/material-icons.css';
import '../src/assets/font/font.css';
// import Chat from 'vue3-beautiful-chat';


const store = createStore({
    state: aside,
}); // 创建 Vuex store 实例

const app = createApp(App)
app.use(
    createVuestic({
        config: {
            colors: {
                variables: {
                    // Default colors
                    primary: "#154EC1", // 主色
                    secondary: "#1a5a99", // 辅助色，深蓝色
                    success: "#40e583", // 成功色，保持原绿色
                    info: "#2c82e0", // 信息色，与主色一致
                    danger: "#e34b4a", // 危险色，保持原红色
                    warning: "#ffc200", // 警告色，保持原黄色
                    gray: "#babfc2", // 灰色，用于不活跃的文本和边框
                    dark: "#34495e", // 深色，用于重要的文本和UI元素
                    background: "#f0f4f8", // 背景色，亮灰色，与主色形成对比
                    // Custom colors
                    lightBlue: "#89bcef", // 自定义浅蓝色，可以用作高亮和焦点色
                },
            },
        },
    })
)
app.use(router)
app.use(store)
app.use(createVuestic())
app.use(ElementPlus);
// app.use(Chat);
for (const iconName in ElIcons) {
    app.component(iconName, ElIcons[iconName])
}

app.provide('$store', store)
app.mount('#app')
