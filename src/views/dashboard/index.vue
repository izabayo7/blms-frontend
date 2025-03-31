<template>
  <router-view />
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { chatMixins } from "@/services/mixins";

export default {
  name: "Index",
  mixins: [chatMixins],
  computed: {
    ...mapGetters("chat", ["socket"]),
  },
  methods: {
    ...mapMutations("notification", ["addNotification"]),
    ...mapMutations("courses", ["addCourse"]),
  },
  mounted() {
    // listen to new notifications
    this.socket.on("new-notification", ({ notification }) => {
      this.addNotification(notification);
    });
    // listen to new course
    this.socket.on("new-course", (course) => {
      this.addCourse(course);
    });

    // listen to if the new message was sent
    this.socket.on("message-sent", (message) => {
      console.log('in index.js')
      setTimeout(this.scrollChatToBottom, 1);
      this.$store.commit("chat/ADD_ONGOING_MESSAGE", message);
    });
  },
};
</script>