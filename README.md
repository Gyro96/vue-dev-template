# vue-dev-template

# 主要实现如下功能的配置

## 引入 composition-api

- [组合式 API 文档](https://github.com/vuejs/composition-api/blob/master/README.zh-CN.md)

## 添加 element-ui

- 增加按需导入

## 登录权限

- 验证是否登录
- 路由钩子鉴权
- 根据是否登录增加校验
- 登录状态持久化

## 路由权限

- 根据后台返回的路由表，过滤本地路由表，动态添加路由

## 菜单权限

- 从后台拿到菜单路由，然后过滤成树状结构，使用 jsx 的写法封装 element 的菜单组件

## 自动注入指定样式文件到每个页面

- 使用 style-resources-loader 自动将指定样式文件注入到每个页面（主要是为了方便注入变量）

## 处理异步组件加载白屏 - 增加 loading

- 因为组件是懒加载的，页面切换时会有白屏，为了处理这个白屏，所以页面切换时需要增加 loading 状态（注意这个 loading 不是数据请求的 loading，是路由切换异 步加载页面组件时的 loading）

## axios

- 页面切换，取消请求
- 整页维护一个 loading

## websocket 封装

- 通过 Vuex 创建 WebSocket
- Vuex 中存放 WebSocket 信息
- 实现心跳检测和断线重连

## Vue-router、Vuex 的规范化和习惯配置

- 具体规范见各自文件夹下的配置说明
