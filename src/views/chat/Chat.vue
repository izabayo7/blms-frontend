<template>
  <section class="my-chat" ref="my-chat">
    <div v-if="currentDisplayedUser.name">
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
            </v-avatar>
          </template
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
          <chat-messaging :data="currentMessages" v-else/>
        </div>
      </div>
      <div ref="send-message" class="send-message">
        <send-message></send-message>
      </div>
    </div>
    <div v-else class="no-chat d-flex justify-center align-center">
      <div v-if="$route.params.username === 'no-conversation'" class="inner">
        <svg width="98" height="98" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0)">
            <path
                d="M87.7917 89.8333H10.2083C4.5815 89.8333 0 85.2559 0 79.625V51.0416C0 50.7558 0.06125 50.4659 0.179667 50.2045L16.3864 14.1895C18.0361 10.5309 21.6907 8.16663 25.6964 8.16663H72.3036C76.3093 8.16663 79.9639 10.5309 81.6136 14.1895L97.8203 50.2045C97.9388 50.4659 98 50.7558 98 51.0416V79.625C98 85.2559 93.4185 89.8333 87.7917 89.8333ZM4.08333 51.4785V79.625C4.08333 83.0019 6.83142 85.75 10.2083 85.75H87.7917C91.1686 85.75 93.9167 83.0019 93.9167 79.625V51.4785L77.8896 15.8596C76.9014 13.671 74.7087 12.25 72.3036 12.25H25.6964C23.2913 12.25 21.0986 13.671 20.1104 15.8637L4.08333 51.4785Z"
                fill="#193074"/>
            <path
                d="M68.6273 69.4167H29.3701C26.8303 69.4167 24.5273 67.8201 23.6371 65.4436L19.4966 54.4063C19.2026 53.6142 18.4349 53.0833 17.5856 53.0833H3.0612C1.9342 53.0833 1.01953 52.1687 1.01953 51.0417C1.01953 49.9147 1.9342 49 3.0612 49H17.5856C20.1255 49 22.4284 50.5966 23.3227 52.9731L27.4591 64.0103C27.7572 64.8025 28.5249 65.3333 29.3701 65.3333H68.6232C69.4725 65.3333 70.2402 64.8025 70.5342 64.0103L74.6706 52.9731C75.569 50.5966 77.872 49 80.4118 49H95.957C97.084 49 97.9987 49.9147 97.9987 51.0417C97.9987 52.1687 97.084 53.0833 95.957 53.0833H80.4118C79.5625 53.0833 78.7948 53.6142 78.5008 54.4063L74.3644 65.4436C73.4701 67.8201 71.163 69.4167 68.6273 69.4167Z"
                fill="#193074"/>
          </g>
          <defs>
            <clipPath id="clip0">
              <rect width="98" height="98" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div>
          <div class="title">Your messages will appear here</div>
          <div class="subtitle">
            Start conversations as you wish
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ChatHeader from "@/components/messages/Chat-header";
import SendMessage from "@/components/messages/Send-message";
import ChatMessaging from "@/components/messages/Chat-messaging";
import {mapGetters, mapState, mapActions, mapMutations} from "vuex";
import {on} from "@/services/event_bus";
import {chatMixins} from "@/services/mixins";

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
      this.socket.emit("message/all_messages_read", {
        conversation_id: this.currentDisplayedUser.id,
      });
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

  .no-chat {
    height: 100%;
    text-align: center;

    .title {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      /* or 4% */
      margin-bottom: 3px;

      /* primary color/ default */

      color: #193074;

    }

    .subtitle {
      font-family: Roboto;
      font-style: normal;
      font-weight: bold;
      font-size: 15px;
      line-height: 1px;
      /* or 5% */

      /* Type color / Default */

      color: #343434;
    }
  }

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
