export default [
  {
    path: "/register",
    component: () =>
      import(/*webpackChunkName:'register'*/ "@/views/user/Register.vue"),
  },
  {
    path: "/login",
    component: () =>
      import(/*webpackChunkName:'login'*/ "@/views/user/Login.vue"),
  },
];
