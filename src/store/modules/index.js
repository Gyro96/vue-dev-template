const files = require.context(".", true, /\.js$/);
// console.log(files);
const modules = {};
files.keys().forEach((key) => {
  // path = home/state
  const path = key.replace(/\.\/|\.js/g, "");
  // 自己不做任何处理
  if (path == "index") return;

  // [home, state]
  let [namespace, type] = path.split("/");
  if (!modules[namespace]) {
    modules[namespace] = {
      namespaced: true, // 增加命名空间
    };
  }
  // {home:{namespaced:true,state:{...}, mutations:{...}, actions:{...}}}
  modules[namespace][type] = files(key).default; // 获取文件导出的结果
});
export default modules;
