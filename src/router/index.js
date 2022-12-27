import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import User from "../views/User";
import Main from "../views/Main";
import Mall from "../views/Mall";
import PageOne from "../views/PageOne";
import PageTwo from "../views/PageTwo";
import Login from "../views/Login";

// 1.创建路由表
// 2.将路由和组件进行映射
// 3.创建router实例
const routes = [
  {
    path: "/",
    component: Main,
    redirect: "/home",
    children: [
      { path: "home", name: "home", component: Home },
      { path: "user", name: "user", component: User },
      { path: "mall", name: "mall", component: Mall },
      { path: "page1", name: "page1", component: PageOne },
      { path: "page2", name: "page2", component: PageTwo },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

Vue.use(VueRouter);
