import store from "@/store";
import * as Types from "@/store/action-types";

// * 登录权限校验和登录状态持久化
const loginPermission = async function(to, from, next) {
  // to.matched 会匹配访问路径的所有层级组件，比如 /home/a 会访问到 home 和 a
  // 用户是否需要登录才能访问的标识
  let needLogin = to.matched.some((item) => item.meta.needLogin);

  /**
   * 当前是否已经登录
   * 两种情况 hasPermission 为 false
   * 1. 第一次进入程序
   * 2. 用户刷新后 token 还在 localStorage，但是 vuex 中的数据已经丢了
   */
  if (!store.state.user.hasPermission) {
    let isLogin = await store.dispatch(`user/${Types.USER_VALIDATE}`);
    // 没登录，访问的页面需要登录
    if (needLogin) {
      if (isLogin) {
        // 需要登录，并且已登录，继续即可
        next();
      } else {
        // 需要登录，没登录，跳转到登录页
        next("/login");
      }
    } else {
      // 访问页面不需要登录
      next();
    }
  } else {
    // 已登录，访问的是登录页，跳转到首页，其他页不影响
    if (to.path === "/login") {
      next("/");
    } else {
      next();
    }
  }
};

/**
 * * 动态添加路由
 * 当前加载页面时，
 * 如果用户已登录，我们需要查看一下是否已经做过了菜单权限，没有则动态添加路由；
 * 未登录，则不管
 */
const menuPermission = async function(to, from, next) {
  // 未登录时不管
  if (store.state.user.hasPermission) {
    // 已经添加过路由就不需要在添加了
    if (!store.state.user.menuPermission) {
      store.dispatch(`user/${Types.ADD_ROUTE}`);
      // 路由动态加载，此时组件时异步加载，希望等待组件加载完毕后跳转过去
      // 所以让页面重新跳了一次
      // ...to 会结构出 path，replace 表示用此次覆盖上次记录（使用的是H5的 replaceState）
      next({ ...to, replace: true });
    } else {
      next();
    }
  } else {
    next();
  }
};

// 执行所有 cancelToken，取消当前页面的所有请求
const clearCancelToken = function(to, from, next) {
  store.commit(Types.CLEAR_CANCEL_TOKEN); // 清空token
  next();
};

// 创建 websocket
const createWebsocket = async function(to, from, next) {
  // 登录了但是没有创建websocket
  if (store.state.user.hasPermission && !store.state.ws) {
    store.dispatch(`${Types.CREATE_WEBSOCKET}`);
    next();
  } else {
    next();
  }
};

export default {
  loginPermission,
  clearCancelToken,
  menuPermission,
  createWebsocket,
};
