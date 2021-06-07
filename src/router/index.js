import Vue from "vue";
import VueRouter from "vue-router";
import hooks from "./hooks";
// console.log(hooks);
Vue.use(VueRouter);

const routes = [];
// 读取当前文件夹下所有以 .router.js 结尾的文件
const files = require.context("./", false, /\.router.js$/);
files.keys().forEach((key) => {
  // key = ./index.router.js
  // files(key).default = 文件导出的内容
  // 因为导出的是数组，所以需要展开
  routes.push(...files(key).default);
});

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 设置 beforeEach 钩子
Object.values(hooks).forEach((hook) => {
  router.beforeEach(hook.bind(router));
});

export default router;
