<template>
  <div>
    <input placeholder="输入要发送的消息" v-model="msg" />
    <button @click="sendMsg"></button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      msg: "",
    };
  },
  computed: {
    ...mapState(["ws"]),
  },
  methods: {
    sendMsg() {
      // 通过websocket发送一个消息
      this.ws.sendMsg({
        type: "message",
        data: this.msg,
      });
    },
  },
};
</script>

<style>
</style>