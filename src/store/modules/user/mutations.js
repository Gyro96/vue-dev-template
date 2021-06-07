import * as Types from "@/store/action-types";
import { setLocal } from "@/utils/localStorage";
import userActions from "./actions";

const userMutations = {
  // 设置用户信息用户
  [Types.SET_USER](state, userInfo) {
    state.userInfo = userInfo;
    if (userInfo && userInfo.token) {
      // 将 token 存入 localStorage
      setLocal("token", userInfo.token);
    } else {
      localStorage.clear("token");
    }
  },
  // 设置用户是否登录
  [Types.SET_PERMISSION](state, has) {
    state.hasPermission = has;
  },
  // 设置菜单权限
  [Types.SET_MENU_PERMISSION](state, has) {
    state.menuPermission = has;
  },
};
export default userActions;