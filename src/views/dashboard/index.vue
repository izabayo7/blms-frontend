<template>
  <router-view v-if="$store.state.user.isLoggedIn" />
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
import { chatMixins } from "@/services/mixins";

export default {
  name: "Index",
  mixins: [chatMixins],
  computed: {
    ...mapGetters("chat", ["socket"]),
    ...mapState("chat", ["currentDisplayedUser", "loadedMessages"]),
  },
  methods: {
    ...mapMutations("notification", ["addNotification"]),
    ...mapMutations("courses", ["addCourse"]),
    ...mapMutations("chat", ["CHANGE_MESSAGE_READ_STATUS"]),
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

    // listen to new course
    this.socket.on("user_limit_reached", () => {
      alert('upgrade papa !')
    });

    // listen if the new message was sent
    this.socket.on("res/message/sent", (message) => {
      setTimeout(this.scrollChatToBottom, 1);
      message.sender.sur_name = "You";
      this.$store.commit("chat/ADD_ONGOING_MESSAGE", message);
    });

    //when new message is received scroll to the bottom
    this.socket.on("res/message/new", () => {
      //scroll to bottom
      setTimeout(this.scrollChatToBottom, 1);
      this.CHANGE_MESSAGE_READ_STATUS(this.currentDisplayedUser.id); //read all messages
    });

    // Message from server
    this.socket.on("res/message/new", (message) => {
      this.scrollChatToBottom();
      if (this.loadedMessages.length > 0)
        // if messages have loaded
        this.$store.commit("chat/ADD_INCOMING_MESSAGE", message);
    });

    // listen if the new conversation was created
    this.socket.on("res/message/conversation_created", (conversation_id) => {
      this.$router.push(`/messages/${conversation_id}`);
    });

    //handle errors
    this.socket.on("error", (error) => {
      console.log("ikibazo broda", error);
      // alert(error);
    });
  },
};
</script>