<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import { ref, reactive, toRefs } from "@vue/composition-api";
import * as Types from "@/store/action-types";
import { createNamespacedHelpers } from "vuex";
let { mapActions } = createNamespacedHelpers("user");
export default {
  setup() {
    let state = reactive({ name: "jojo" });
    function changeName() {
      state.name = "Dio";
    }
    return {
      ...toRefs(state),
      changeName,
    };
  },
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

<style lang="scss">
#size {
  color: $color;
  background: $background;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>