import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionAPI from "@vue/composition-api";
import setupElement from "@/element-ui/index.js";
import "@/utils/request.js";

Vue.config.productionTip = false;

Vue.use(VueCompositionAPI);
Vue.use(setupElement);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
