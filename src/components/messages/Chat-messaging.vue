<template>
  <main class="my-chat-messaging" id="my-chat-messaging">
    <!--    messages container-->
    <div class="msg-container" id="msg-container" ref="msg-container">
      <!--      if there are no messages-->
      <div class="no-msgs" v-if="!data">
        you have not yet started conversation with
        {{ currentDisplayedUser.name }}.
      </div>

      <!--      block of messages -->
      <div
        class="msgs-block"
        v-for="(msgs, i) in data"
        :key="i"
        :class="{
          sending: msgGoing(msgs.from),
          receiving: !msgGoing(msgs.from),
        }"
      >
        <div class="unread-indicator"><hr /></div>
        <!--        picture of the message sender-->
        <div class="picture">
          <img
            v-if="msgs.image"
            :src="msgs.image"
            :alt="`${msgs.from}'s profile picture`"
          />
          <v-avatar min-width="20px" @click="logout" v-else class="avatar">
            {{ msgs.from | computeText }}
          </v-avatar>
        </div>
        <!--        list of messages sent or received-->
        <div class="msgs">
          <div class="msg" v-for="(msg, i) in msgs.messages" :key="i">
            {{ msg.content }}
          </div>
        </div>
      </div>
      <div class="receiving" v-if="typing">
        <div class="typing">
          <div class="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from "vuex";
// import {on} from "@/services/event_bus";
import { chatMixins } from "@/services/mixins";
import { on } from "@/services/event_bus";

export default {
  name: "Chat-messaging",
  mixins: [chatMixins],
  props: {
    data: { type: [Array, Boolean], required: true },
  },
  data() {
    return {
      typing: false,
    };
  },
  computed: {
    ...mapState("chat", ["currentDisplayedUser"]),
    ...mapGetters("chat", ["socket"]),
  },
  methods: {
    // is message going or coming
    msgGoing(owner) {
      return owner && owner.toLowerCase() === "me";
    },
  },
  mounted() {
    // Someone typing to me
    let timeout = undefined;

    this.socket.on("typing", (typist) => {
      //if the typist is the one we are chatting with
      if (this.currentDisplayedUser.id === typist) {
        this.typing = true;

        clearTimeout(timeout); // before setting new timeout lets create old one

        //if 5 seconds exceeds without new event of typing stop typing
        timeout = setTimeout(() => {
          this.typing = false;
        }, 5000);

        this.scrollChatToBottom();
      }
    });

    //when new message is received scroll to the bottom
    this.socket.on("receive-message", () => {
      this.typing = false;
      this.scrollChatToBottom();
    });

    //when the chatting user send message let us scroll to the bottom
    on("message-sent", () => {
      setTimeout(this.scrollChatToBottom, 1);
    });
    /*
    when this component is mounted Immediately scroll to the bottom
    the reason we call this function the end is that we need to wait for the all message to be rendered
    so that we can scroll them
     */
    this.scrollChatToBottom();
  },
};
</script>

<style lang="scss" scoped>
.my-chat-messaging {
  display: block;
  overflow: auto;
  position: relative;
  height: 100%;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track:hover {
    background-color: lighten($secondary, 4);
  }

  &::-webkit-scrollbar-thumb {
    background-color: lighten($font, 40);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: lighten($font, 30);
  }
  .msg-container {
    margin: 0 10px;
    overflow: auto;
    //height: 100vh;

    .typing {
      height: fit-content;
      width: fit-content;
      .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 80px;
        height: 1rem;
        padding: 0.5rem;
        margin-left: 50px;
        margin-top: 10px;
        //background-color: lighten($font,20);
      }
      .lds-ellipsis div {
        position: absolute;
        top: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: $secondary;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
      }
      .lds-ellipsis div:nth-child(1) {
        left: 5px;
        animation: lds-ellipsis1 0.6s infinite;
      }
      .lds-ellipsis div:nth-child(2) {
        left: 5px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      .lds-ellipsis div:nth-child(3) {
        left: 20px;
        animation: lds-ellipsis2 0.6s infinite;
      }
      .lds-ellipsis div:nth-child(4) {
        left: 40px;
        animation: lds-ellipsis3 0.6s infinite;
      }
      @keyframes lds-ellipsis1 {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }
      }
      @keyframes lds-ellipsis3 {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(0);
        }
      }
      @keyframes lds-ellipsis2 {
        0% {
          transform: translate(0, 0);
        }
        100% {
          transform: translate(24px, 0);
        }
      }
    }

    .no-msgs {
      font-size: 0.8rem;
      font-style: italic;
      text-align: center;
      margin-top: 4rem;
      color: lighten($font, 20);
    }
    //css for the whole msg block
    .msgs-block {
      margin: 5px 0;
      display: flex;
      flex-direction: column;

      //css for the image of the sender
      .picture {
        img {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 20px;
        }
      }
      //whole msg bar css
      .msg {
        max-width: 20rem;
        padding: 0.3rem 0.5rem;
        margin: 1.5px;
        width: fit-content;
        font-size: 0.8rem;
        font-weight: 400;
        word-break: break-word;
      }
    }

    //css for the only sending msgs
    .sending {
      .picture {
        display: none;
      }
      .msgs {
        align-self: flex-end;
        display: flex;
        flex-direction: column;

        .msg {
          align-self: flex-end;
          background-color: $primary;
          color: $main;
          border-radius: 15px 0 0 15px;

          &:last-child {
            border-bottom-right-radius: 15px;
          }

          &:first-child {
            border-top-right-radius: 15px;
          }
        }

        &:last-child {
        }
      }
    }

    //css for the only receiving msgs
    .receiving {
      display: flex;
      flex-direction: row;
      .msg {
        border-radius: 0 15px 15px 0;
        background-color: $secondary;
        padding-left: 10px;

        &:last-child {
          border-bottom-left-radius: 15px;
        }

        &:first-child {
          border-top-left-radius: 15px;
        }
      }
    }
  }
  .avatar {
    width: 30px !important;
    height: 30px !important;
    margin-right: 20px;
    margin-top: 0px;
    background-color: $primary;
    color: white;
    cursor: pointer;
  }
}
</style>
