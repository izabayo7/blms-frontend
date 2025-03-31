<template>
  <section class="my-chat" ref="my-chat">
    <div ref="chat-header" class="chat-header">
      <chat-header>
        <!--        profile picture of the current chatter-->
        <template #pic>
          <img
            v-if="currentDisplayedUser.image"
            :src="currentDisplayedUser.image+'?height=50'"
            :alt="`${currentDisplayedUser.name}'s profile picture`"
          />
          <v-avatar v-else size="50" class="avatar">
            {{ currentDisplayedUser.name | computeText }}
          </v-avatar></template
        >
        <!--        name of the current chatter-->
        <template #name>{{ currentDisplayedUser.name }}</template>
      </chat-header>
    </div>
    <div ref="messages-list" class="messages-list">
      <div class="messages-container" id="chat-holder">
        <div class="messages-loading" v-if="conversationLoading">
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </div>
        <chat-messaging :data="currentMessages" v-else />
      </div>
    </div>
    <div ref="send-message" class="send-message">
      <send-message></send-message>
    </div>
  </section>
</template>

<script>
import ChatHeader from "@/components/messages/Chat-header";
import SendMessage from "@/components/messages/Send-message";
import ChatMessaging from "@/components/messages/Chat-messaging";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import { on } from "@/services/event_bus";
import { chatMixins } from "@/services/mixins";

export default {
  name: "Chat",
  mixins: [chatMixins],
  components: {
    ChatHeader,
    SendMessage,
    ChatMessaging,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("chat", [
      "currentDisplayedUser",
      "username",
      "loadedMessages",
      "incomingMessages",
    ]),
    ...mapGetters("chat", ["socket", "conversationLoading", "currentMessages"]),
  },
  methods: {
    ...mapActions("chat", ["setUsername", "loadMessages", "isUsertyping"]),
    ...mapMutations("chat", ["ADD_TYPIST", "REMOVE_TYPIST", "SET_DISPLAYED_USER"]),
    doneTyping() {
      this.typing.typist = "";
    },
  },
  mounted() {
    on("message-received", () => {
      this.scrollChatToBottom();
    });
  },

  beforeMount() {
    this.socket.emit("message/conversation_id", {
      conversation_id: this.$route.params.username,
    });
    this.socket.on("res/message/conversation_id", (username_valid) => {
      if (username_valid) {
        //load user since the route have changed
        this.setUsername(this.$route.params.username).then((username) => {
          this.loadMessages(username);
          if (this.currentDisplayedUser.id == username) {
            this.incomingMessages.map((d) => {
              if (this.$route.params.username == d.id) {
                this.SET_DISPLAYED_USER(d);
              }
            });
          }
        });
      }
      // else {
      //
      // }
    });
  },
  beforeRouteUpdate(to, from, next) {
    //since username has changed let us also load new chat
    this.setUsername(to.params.username);
    //   .then((username) => {
    // // console.log(username);
    // });

    next();
  },
};
</script>

<style lang="scss" scoped>
.my-chat {
  background-color: $main;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .chat-header {
    width: 100%;
    align-self: flex-start;
    justify-self: flex-start;
  }

  .messages-list {
    width: 100%;
    position: relative;
    flex-grow: 1;
    //height: 60%;

    .messages-container {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;

      .messages-loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .lds-ripple {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .lds-ripple div {
          position: absolute;
          border: 4px solid $primary;
          opacity: 1;
          border-radius: 50%;
          animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .lds-ripple div:nth-child(2) {
          animation-delay: -0.5s;
        }
        @keyframes lds-ripple {
          0% {
            top: 36px;
            left: 36px;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: 0px;
            left: 0px;
            width: 72px;
            height: 72px;
            opacity: 0;
          }
        }
      }
    }
  }

  .send-message {
    width: 100%;
    align-self: flex-end;
    justify-self: flex-end;
  }
}
</style>
