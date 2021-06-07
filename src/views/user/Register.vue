<template></template>

<script>
import * as user from "@/api/user.js";
export default {
  data() {
    return {
      registerInfo: {
        userName: "xxx",
        password: "123456",
        checkPass: "123456",
      },
    };
  },
  methods: {
    // 注册不是公共的接口，可以直接放在组件里面调用
    async register() {
      try {
        await user.register(this.registerInfo);
        this.$router.push("/login");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>