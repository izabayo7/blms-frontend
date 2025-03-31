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
        <!--        <div class="unread-indicator"><hr /></div>-->
        <!--        picture of the message sender-->
        <div class="picture">
          <img
            v-if="msgs.image"
            :src="msgs.image"
            :alt="`${msgs.from}'s profile picture`"
          />
          <v-avatar min-width="20px" v-else class="avatar">
            {{ msgs.from | computeText }}
          </v-avatar>
        </div>
        <div>
          <div v-if="!msgGoing(msgs.from) && currentDisplayedUser.is_group" class="sender_name">{{msgs.from}}</div>
          <!--        list of messages sent or received-->
          <div class="msgs">
            <div class="msg" v-for="(msg, i) in msgs.messages" :key="i">
              <!--            //for better html elements readability-->
              <div :inner-html.prop="msg.content | urlify" />
            </div>
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
import { mapState, mapGetters, mapMutations } from "vuex";
// import {on} from "@/services/event_bus";
import { chatMixins } from "@/services/mixins";

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
    ...mapState("chat", ["currentDisplayedUser", "incomingMessages"]),
    ...mapGetters("chat", ["socket"]),
  },
  methods: {
    ...mapMutations("chat", ["CHANGE_MESSAGE_READ_STATUS"]),
    // is message going or coming
    msgGoing(owner) {
      return owner && owner.toLowerCase() === "me";
    },
    //read messages
    readMessages() {
      const e = document.getElementById("my-chat-messaging");
      const scrollHeight = e.scrollHeight - e.offsetHeight; //scrollable length
      const scrollTop = e.scrollTop; //current scrolled length

      //if the are no more space to scroll means we are on bottom
      //send event that all messages read
      if (scrollTop === scrollHeight) {
        //emit on server that we read all messages
        this.socket.emit("message/all_messages_read", {
          conversation_id: this.currentDisplayedUser.id,
        });

        //mark messages in front end that we read them
        this.CHANGE_MESSAGE_READ_STATUS(this.currentDisplayedUser.id);
      }
    },
  },
  mounted() {
    // Someone typing to me
    let timeout = undefined;

    this.socket.on("message/typing", (typist) => {
      if (this.currentDisplayedUser.is_group) {
        // const user = this.currentDisplayedUser.members.some(el => el._id === typist)
      }
      //if the typist is the one we are chatting with
      if (this.currentDisplayedUser.id === typist) {
        this.typing = true;

        clearTimeout(timeout); // before setting new timeout lets create old one

        //if 5 seconds exceeds without new event of typing stop typing
        timeout = setTimeout(() => {
          this.typing = false;
        }, 5000);

        this.scrollChatToBottom(); //scroll chat to bottom
        this.CHANGE_MESSAGE_READ_STATUS(this.currentDisplayedUser.id); //read all messages
      }
    });

    //track scroll so that we can determine if use has read new messages
    let scrollableDiv = document.getElementById("my-chat-messaging");
    console.log(scrollableDiv.offsetHeight, scrollableDiv.scrollTop);
    scrollableDiv.addEventListener("scroll", this.readMessages);

    //when message came stop typing
    this.socket.on("message/new", () => {
      this.typing = false;
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
  scrollbar-track-color: transparent;
  scrollbar-face-color: red;

  @include scroll-bar;

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

      .sender_name {
        font-size: 13px;
        color: #00000066;
        padding-left: 0.8rem;
      }

      //css for the image of the sender
      .picture {
        display: flex;
        place-items: flex-end;
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

          div {
            color: inherit;
          }
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
