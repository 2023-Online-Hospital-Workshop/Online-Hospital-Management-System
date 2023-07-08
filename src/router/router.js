// 7-30叶登旭 添加医生主页路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)
import cookies from "vue-cookies";
import axios from 'axios'
// import { use } from 'vue/types/umd'

//此VueRouter是自己自定义引入暴露出来的，即是自定义的，以下的VueRouter同样
// 解决两次访问相同路由地址报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}



//路由配置项
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router