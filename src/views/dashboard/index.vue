<template>
  <router-view />
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Index",
  computed: {
    ...mapGetters("chat", ["socket"]),
  },
  mounted() {
    //  
    this.socket.on("receive-message", (message) => {
      console.log(message, "og kbx");
    });
  },
};
</script>