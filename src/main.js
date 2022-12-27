import Vue from "vue";
// import { Row, Button } from "element-ui";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./api/mock";

Vue.config.productionTip = false;

// 按需引入
// Vue.use(Button);
// Vue.use(Row);

// 全局引入
Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
  router,
  store,
  created() {
    store.commit("addMenu", router);
  },
}).$mount("#app");
