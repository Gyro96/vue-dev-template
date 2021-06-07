// axios 二次封装
import config from "@/config";
import axios from "axios";
import { getLocal } from "@/utils/localStorage";

/**
 * axios 封装
 * request 请求方法，axios 实例
 * setInterceptors 设置拦截器
 * mergeOptions 合并默认选项和用户传的选项
 * get get请求
 * post post请求
 */
class HttpRequest {
  constructor() {
    // 此处可增加实例属性，后台接口的路径（分为开发模式和生产模式）
    this.baseURL = config.baseURL;
    this.timeout = 3000; // 3s 后请求超时

    this.queue = {}; // 专门用来维护请求队列的
  }
  setInterceptors(instance, url) {
    instance.interceptors.request.use((config) => {
      /**
       * * 开启loading
       * 维护一个全局的 loading，当当前页面所有请求都完成后，才取消loading的显示
       * （一个页面多个请求，只产生一个loading）
       * 默认第一个请求开启 loading，第二个请求时length就不是 0 了，不需要重复开启 loading
       */
      if (Object.keys(this.queue).length == 0) {
        // 显示 loading 相关代码
      }

      // * 每个请求都携带 token
      let token = getLocal("token");
      if (token) config.headers.authorization = token;

      /**
       * * 记录请求的取消函数
       * 同步将取消方法存到 vuex 中，页面切换，组件销毁时执行
       * c 就是当前取消请求的token
       */
      let CancelToken = axios.CancelToken;
      config.cancelToken = new CancelToken((c) => {
        store.commit(Types.SET_CANCEL_TOKEN, c);
      });
      this.queue[url] = true;

      return config;
    });

    instance.interceptors.response.use(
      (res) => {
        // 请求一旦响应了，就从队列删除
        delete this.queue[url];
        if (Object.keys(this.queue).length == 0) {
          // 关闭 loading 相关代码
        }

        if (res.status == 200) {
          // 服务端返回的结果会放在 data 中
          // err = 0 表示获取数据正常，1 表示获取数据出错
          if (res.data.err === 0) {
            return res.data.data;
          } else {
            return Promise.reject(rea.data.data);
          }
        } else {
          // 失败了后台会在返回的结果中增加一个 data 字段来说明失败的原因
          return Promise.reject(res.data.data);
        }
      },
      (err) => {
        // 单独处理其他的状态异常
        switch (err.response.status) {
          case "401":
            break;
          default:
            break;
        }
        return Promise.reject(err);
      }
    );
  }
  mergeOptions(options) {
    return {
      baseURL: this.baseURL,
      timeOut: this.timeout,
      ...options,
    };
  }
  request(options) {
    const instance = axios.create(); // 每次请求创建新的实例
    this.setInterceptors(instance, options.url);
    const opts = this.mergeOptions(options);
    return instance(opts);
  }
  get(url, config) {
    return this.request({
      method: "get",
      url,
      ...config, // get请求参数直接展开
    });
  }
  post(url, data) {
    return this.request({
      method: "post",
      url,
      data, // post需要传入data属性
    });
  }
}

export default new HttpRequest();
