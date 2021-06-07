import * as Types from "@/store/action-types";
import { login, validate } from "@/api/user";
import { getLocal } from "@/utils/localStorage";
import permission from "@/router/permission";
import router from "@/router/index";

const filterRouter = (authList) => {
  // 递归遍历符合条件的路由
  authList = authList.map((item) => item.auth);
  function filter(permission) {
    let result = permission.filter((route) => {
      if (authList.includes(route.meta.auth)) {
        if (route.children) {
          route.children = filter(route.children);
        }
        return route;
      }
    });
    return result;
  }
  return filter(permission);
};

const userActions = {
  // 设置用户信息
  async [Types.SET_USER]({ commit }, { payload, permission }) {
    commit(Types.SET_USER, payload);
    commit(Types.SET_PERMISSION, permission);
  },
  // 用户登录
  async [Types.USER_LOGIN]({ dispatch }, payload) {
    try {
      let result = await login(payload);
      dispatch(Types.SET_USER, { payload: result, permission: true });
    } catch (err) {
      // 登录失败，抛出错误
      return Promise.reject(err);
    }
  },
  // 权限验证和状态持久化
  async [Types.USER_VALIDATE]({ dispatch }) {
    // 如果没 token 就不用发请求了，肯定没登录
    if (!getLocal("token")) return false;
    
    try {
      // 校验成功，重新设置数据
      let result = await validate();
      dispatch(Types.SET_USER, { payload: result, permission: true });
      return true;
    } catch (error) {
      // 校验失败，清空之前数据
      dispatch(Types.SET_USER, { payload: {}, permission: false });
      return false;
    }
  },
  /**
   * * 退出登录
   */
  async [Types.USER_LOGOUT]({ dispatch }) {
    dispatch(Types.SET_USER, { payload: {}, permission: false });
  },
  /**
   * * 动态添加路由
   */
  async [Types.ADD_ROUTE]({ commit, state }) {
    let authList = state.userInfo.authList; // 后端返回的用户权限列表
    if (authList) {
      // 通过权限过滤当前用户的路由
      let routes = filterRouter(authList);
      // 给某一个模块（这里是manager）添加二级路由
      let route = router.options.routes.find(
        (item) => item.path === "/manager"
      );
      route.children = routes;
      router.addRoutes([route]); // 动态添加
      commit(Types.SET_MENU_PERMISSION, true); // 权限设置
    }
  },
};
export default userActions;
