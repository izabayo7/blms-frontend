<template>
  <router-view />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "Index",
  computed: {
    ...mapGetters("chat", ["socket"]),
  },
  methods: {
    ...mapMutations("notification", ["addNotification"]),
  },
  mounted() {
    // listen to new notifications
    this.socket.on("new-notification", ({ notification }) => {
      this.addNotification(notification);
    });
  },
};
</script>