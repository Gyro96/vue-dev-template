// 动态路由：根据后台返回的路由表做匹配然后动态渲染
export default [
  {
    path: "addUser",
    component: () =>
      import(/*webpackChunkName:'manager'*/ "@/views/manager/index.vue"),
    meta: {
      needLogin: true,
      auth: "addUser",
    },
  },
];
