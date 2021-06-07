const path = require("path");
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "scss", // (表示作用于 scss)自动引入
      patterns: [path.resolve(__dirname, "src/assets/common.scss")], // 在当前每个scss页面中导入common.scss（这里面主要存放全局变量）
    },
  },
};
