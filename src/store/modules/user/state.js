const userState = {
  userInfo: {}, // 用户信息
  hasPermission: false, // 用户权限（是否登录）
  authList: [], // 登陆后 =》  菜单权限列表
  menuPermission: false, // 菜单权限
  btnPermission: ["edit", "remove"], // 权限列表
};

export default userState;
