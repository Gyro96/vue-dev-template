<template>
<div>登录</div>
</template>

<script>
import * as Types from "@/store/action-types";
import { createNamespacedHelpers } from "vuex";
let { mapActions } = createNamespacedHelpers("user");
export default {
  data() {
    return {
      loginInfo: {
        userName: "xxx",
        password: "123456",
      },
    };
  },
  methods: {
    ...mapActions([Types.USER_LOGIN]),
    submit() {
      this.Types.USER_LOGIN(this.loginInfo);
    },
  },
};
</script>

<style>
</style>