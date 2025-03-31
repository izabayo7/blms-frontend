<template>
  <router-view v-if="$store.state.user.isLoggedIn"/>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import {chatMixins} from "@/services/mixins";
import apis from "@/services/apis";
import {playSound} from "../../services/global_functions";

const sound = require("../../assets/audio/msg.mp3");
export default {
  name: "Index",
  mixins: [chatMixins],
  computed: {
    ...mapGetters("chat", ["socket"]),
    ...mapState("sidebar_navbar", {unreads: "total_unread_messages"}),
    ...mapState("chat", ["currentDisplayedUser", "loadedMessages"]),
  },
  methods: {
    ...mapMutations("notification", ["addNotification"]),
    ...mapMutations("courses", ["addCourse"]),
    ...mapMutations("chat", ["CHANGE_MESSAGE_READ_STATUS"]),
    ...mapMutations("sidebar_navbar", {update_unread: "SET_TOTAL_UNREAD"}),
  },
  async created() {
    await apis.create('user_logs', {online: true})
  },
  mounted() {
    // listen to new notifications
    this.socket.on("new-notification", ({notification}) => {
      this.addNotification(notification);
    });

    // listen if the new message was sent
    this.socket.on("res/message/sent", (message) => {
      setTimeout(this.scrollChatToBottom, 1);
      message.sender.sur_name = "You";
      this.$store.commit("chat/ADD_ONGOING_MESSAGE", message);
    });

    this.socket.emit("messages/unread");

    this.socket.on("res/messages/unread", (number) => {
      this.update_unread(number)
    });

    // listen to new course
    this.socket.on("new-course", (course) => {
      this.addCourse(course);
    });

    // listen to new course
    this.socket.on("user_limit_reached", () => {
      alert('upgrade papa !')
    });

    // Message from server
    this.socket.on("res/message/new", (message) => {
      this.update_unread(this.unreads + 1)
      playSound(sound)
      if (this.$route.name === "chatingRoom") {
        //scroll to bottom
        setTimeout(this.scrollChatToBottom, 1);
        this.CHANGE_MESSAGE_READ_STATUS(this.currentDisplayedUser.id); //read all messages

        if (message.sender !== "SYSTEM")
          if (this.$route.params.username === message.sender.user_name)
            this.socket.emit("message/all_messages_read", {
              conversation_id: this.currentDisplayedUser.id,
            });
      }
      if (this.loadedMessages.length > 0)
          // if messages have loaded
        this.$store.commit("chat/ADD_INCOMING_MESSAGE", message);
    });

    // listen if the new conversation was created
    this.socket.on("res/message/conversation_created", (conversation_id) => {
      setTimeout(() => {
        this.$router.push(this.$route.path !== `/messages/${conversation_id}` ? `/messages/${conversation_id}` : '/messages');
      }, 500)
    });

    //handle errors
    this.socket.on("error", (error) => {
      console.log("ikibazo broda", error);
      // alert(error);
    });
  },
};
</script>