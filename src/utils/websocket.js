import { getLocal } from "./localStorage";
import * as Types from "@/store/action-types";
import store from '@/store/index'
class WS {
  constructor(config = {}) {
    this.url = config.url || "localhost";
    this.port = config.port || 4000;
    this.protocol = config.protocol || "ws";
    // 心跳检测
    this.time = config.time || 30 * 1000;
    this.ws = null;
  }
  create() {
    // 新建一个 websocket 实例
    this.ws = new WebSocket(`${this.protocol}://${this.url}:${this.port}`);
    this.ws.onopen = this.onOpen;
    this.ws.onmessage = this.onMessage;
    this.ws.onerror = this.onError;
    this.ws.onclose = this.onClose;
  }
  // 发送消息
  sendMsg = (msg) => {
    this.ws.send(JSON.stringify(msg));
  };
  onOpen = () => {
    // 首先我们会和后台商量好，发送的必须是对象，对象里包含两个字段：type data
    // 打开的时候做一次鉴权
    this.ws.sendMsg({
      type: "auth",
      data: getLocal("token"),
    });
  };
  onMessage = (e) => {
    let { type, data } = JSON.parse(e.data);
    switch (type) {
      case "noAuth": // 判断第一的鉴权
        console.log("没有权限");
        break;
      case "heartCheck": // 回应心跳检测
        this.checkServer();
        this.ws.sendMsg({ type: "heartCheck" });
        break;
      default:
        // console.log("message", data);
        store.commit(Types.SET_WS_MESSAGE, data)
    }
  };
  onError = () => {
    // 发生错误，一秒后重新启动一个ws
    setTimeout(() => {
      this.create();
    });
  };
  onClose = () => {
    this.ws.close();
  };
  // 检测连接是否还正常
  // 40秒后还没给我发消息，就关闭然后重新连接
  checkServer() {
    clearTimeout(this.timer);
    // 断线重连
    this.timer = setTimeout(() => {
      this.onClose();
      this.onError();
    }, this.time + 10 * 1000);
  }
}

export default WS;
