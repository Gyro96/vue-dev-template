import loadable from "../utils/loadable";

export default [
  {
    path: "/",
    component: () =>
      loadable(import(/*webpackChunkName:'home'*/ "@/views/Home.vue")),
    meta: {
      needLogin: true, // 标记当前页面需要登录才能访问
    },
  },
  {
    // 就算你在路由表中将 * 匹配的路由不放到最后，Vue 内部会做处理，将它放到最后
    path: "*",
    component: () =>
      loadable(import(/*webpackChunkName:'404'*/ "@/views/404.vue")),
  },
  {
    path: "/manager",
    component: () =>
      loadable(
        import(/*webpackChunkName:'manager'*/ "@/views/manager/index.vue")
      ),
    meta: {
      needLogin: true, // 标记当前页面需要登录才能访问
    },
  },
];
