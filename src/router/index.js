import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main";
import Login from "../views/Login";
// import NotFound from "../views/NotFound";

// 1.创建路由表
// 2.将路由和组件进行映射
// 3.创建router实例
const routes = [
  {
    path: "/",
    component: Main,
    name: "Main",
    redirect: "/home",
    children: [
      // { path: "home", name: "home", component: Home },
      // { path: "user", name: "user", component: User },
      // { path: "mall", name: "mall", component: Mall },
      // { path: "page1", name: "page1", component: PageOne },
      // { path: "page2", name: "page2", component: PageTwo },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  // {
  //   path: "*",
  //   component: NotFound,
  // },
];

const router = new VueRouter({
  routes,
});

export default router;

Vue.use(VueRouter);
