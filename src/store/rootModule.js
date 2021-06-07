import * as Types from "@/store/action-types";
import WS from "@/utils/websocket.js";

export default {
  state: {
    root: "root",
    cancelTokens: [], // 存放 cancelToken
    ws: null, // 存放 websocket 实例
    wsMsg: null, // 存放 websocket 接收的消息
  },
  mutations: {
    // 设置 cancelToken
    [Types.SET_CANCEL_TOKEN](state, c) {
      // 存储 cancelToken，页面切换可以让其依次执行
      state.cancelTokens = [...state.cancelTokens, c];
    },
    // 清除(执行)所有 cancelToken
    [Types.CLEAR_CANCEL_TOKEN](state) {
      state.cancelTokens.forEach((token) => token()); // 执行所有的取消方法
      state.cancelTokens = []; // 清空列表
    },
    // 保存 ws 实例
    [Types.CREATE_WEBSOCKET](state, ws) {
      state.ws = ws;
    },
    // 保存 ws 收到的消息
    [Types.SET_WS_MESSAGE](state, data) {
      state.wsMsg = data;
    },
  },
  actions: {
    async [Types.CREATE_WEBSOCKET]({ commit }) {
      let ws = new WS();
      ws.create();
      commit(Types.CREATE_WEBSOCKET, ws);
    },
  },
};
