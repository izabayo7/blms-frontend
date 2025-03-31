<template>
  <main class="my-chat-messaging customScroll" id="my-chat-messaging">
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
          system_message: systemMsg(msgs.from),
          receiving: !msgGoing(msgs.from),
        }"
      >
        <!--        <div class="unread-indicator"><hr /></div>-->
        <!--        picture of the message sender-->
        <div v-if="!systemMsg(msgs.from)" class="picture mt-4">
          <div
            v-if="currentDisplayedUser.id === 'announcements'"
            class="announcement"
          >
            <svg
              width="37"
              height="37"
              viewBox="0 0 37 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18.5" cy="18.5" r="18.5" fill="#FFD248" />
              <path
                d="M18.5012 26.5437C19.386 26.5437 20.1099 25.8198 20.1099 24.935H16.8925C16.8925 25.8198 17.6164 26.5437 18.5012 26.5437ZM23.3273 21.7176V17.6958C23.3273 15.2265 22.0162 13.1593 19.7077 12.6124V12.0654C19.7077 11.3978 19.1688 10.8589 18.5012 10.8589C17.8336 10.8589 17.2947 11.3978 17.2947 12.0654V12.6124C14.9942 13.1593 13.6751 15.2185 13.6751 17.6958V21.7176L12.0664 23.3263V24.1306H24.936V23.3263L23.3273 21.7176ZM21.7186 22.5219H15.2838V17.6958C15.2838 15.7011 16.4984 14.0763 18.5012 14.0763C20.504 14.0763 21.7186 15.7011 21.7186 17.6958V22.5219Z"
                fill="#343434"
              />
            </svg>
          </div>
          <img
            v-else-if="msgs.image"
            :src="msgs.image + '?height=50'"
            :alt="`${msgs.from}'s profile picture`"
          />
          <v-avatar min-width="40" min-height="40" v-else class="avatar">
            {{ msgs.from | computeText }}
          </v-avatar>
        </div>
        <div class="msg-block">
          <div
            v-if="currentDisplayedUser.id === 'announcements'"
            class="sender_name"
          >
            {{ msgs.sender.sur_name }} {{ msgs.sender.other_names }} {{ msgs.createdAt | getTimeDifference }}
          </div>
          <div
            v-else-if="
              !msgGoing(msgs.from) &&
              currentDisplayedUser.is_group &&
              !systemMsg(msgs.from)
            "
            class="sender_name"
          >
            {{ msgs.from }} {{ msgs.messages[0].createdAt | getTimeDifference }}
          </div>
          <div
            v-else
            class="sender_name"
            :class="msgs.from ? msgs.from.toLowerCase() : 'announcements'"
          >
            <p>{{ msgs.messages[0].createdAt | getTimeDifference }}</p>
          </div>
          <!--        list of messages sent or received-->
          <div v-if="currentDisplayedUser.id !== 'announcements'" class="msgs">
            <div
              :class="`msg-cntnr ${
                !msg.content || msg.content === '' ? 'noBg' : ''
              }`"
              v-for="(msg, i) in msgs.messages"
              :key="i"
            >
              <!--            //for better html elements readability-->
              <div
                class="msg mx-auto"
                v-if="msg.content && msgs.from === 'SYSTEM'"
                :inner-html.prop="msg.content | injectTime"
              />
              <div
                class="msg"
                v-else-if="msg.content"
                :inner-html.prop="msg.content | urlify "
              />
              <div
                v-if="msg.attachments"
                :class="`attachments-cotainer ${msg.content ? 'pushed' : ''} ${
                  msg.attachments.length > 1
                    ? msg.attachments.length > 2
                      ? 'more'
                      : 'two'
                    : ''
                }`"
              >
                <div
                  v-for="(attachment, k) in msg.attachments"
                  :key="k"
                  class="attachment"
                >
                  <img
                    v-if="fileType(attachment) === 'image'"
                    :src="attachment.src + `?token=${$session.get('jwt')}`"
                    alt=""
                  />
                  <!--                  <audio v-if="fileType(attachment) === 'audio'" :src="attachment.src+ `?token=${$session.get('jwt')}`"></audio>-->
                  <vue-plyr v-if="fileType(attachment) === 'audio'">
                    <audio controls crossorigin playsinline>
                      <source
                        :src="attachment.src + `?token=${$session.get('jwt')}`"
                        type="audio/mp3"
                      />
                    </audio>
                  </vue-plyr>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="msgs">
            <div class="announcement-container">
              <div class="d-flex">
                <div class="col-4">
                  <img
                    :src="$store.state.sidebar_navbar.college.logo"
                    alt=""
                    class="college-logo"
                  />
                </div>
                <div class="col-8 vertically--centered justify-start">
                  {{ msgs.title }}
                </div>
              </div>
              <div class="col-12">
                <Editor
                  ref="editor"
                  mode="view"
                  class="editor-container"
                  :inverted="true"
                  :defaultContent="msgs.content"
                />
              </div>
              <div class="col-12">
                <div class="announcer">{{msgs.sender.sur_name}} {{msgs.sender.other_names}}</div>
                <div class="category">{{msgs.sender.category.toLowerCase()}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="receiving" v-if="typing">
        <!-- <div class="receiving" v-if="1"> -->
        <div
          v-if="currentDisplayedUser.is_group"
          class="sender_name text-center"
        >
          <span v-for="(member, i) in typing_members" :key="i"
            >{{ `${i > 0 ? "," : ""} ${member}` }}
          </span>
          <span>{{ typing_members.length > 1 ? " are " : " is " }} typing</span>
        </div>
        <div v-else class="typing">
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
  components: {
    Editor: () => import("@/components/reusable/Editor"),
  },
  props: {
    data: { type: [Array, Boolean], required: true },
  },
  data() {
    return {
      typing: false,
      typers: [],
    };
  },
  computed: {
    ...mapState("chat", ["currentDisplayedUser", "incomingMessages"]),
    ...mapGetters("chat", ["socket"]),
    typing_members() {
      let names = [];
      for (const i in this.typers) {
        const user = this.currentDisplayedUser.members.filter(
          (m) => m.data.user_name == this.typers[i]
        );
        names.push(user[0].data.sur_name);
      }
      return names;
    },
  },
  methods: {
    ...mapMutations("chat", ["CHANGE_MESSAGE_READ_STATUS"]),
    // is message going or coming
    msgGoing(owner) {
      return owner && owner.toLowerCase() === "me";
    },
    fileType(attachment) {
      if (attachment.src.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        return "image";
      } else if (attachment.src.match(/\.(MP3|mp3|wav|WAV)$/)) {
        return "audio";
      } else {
        return "others";
      }
    },
    systemMsg(owner) {
      return owner && owner === "SYSTEM";
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

    this.socket.on("res/message/typing", (typist, group) => {
      if (!this.currentDisplayedUser) return;

      if (this.currentDisplayedUser.is_group) {
        // const user = this.currentDisplayedUser.members.some(el => el._id === typist)
      }
      if (!this.typers.includes(typist)) this.typers.push(typist);
      //if the typist is the one we are chatting with
      if (
        this.currentDisplayedUser.id === typist ||
        this.currentDisplayedUser.id === group
      ) {
        this.typing = true;

        clearTimeout(timeout); // before setting new timeout lets create old one

        //if 5 seconds exceeds without new event of typing stop typing
        timeout = setTimeout(() => {
          this.typing = false;
          this.typers.splice(this.typers.indexOf(typist), 1);
        }, 5000);

        this.scrollChatToBottom(); //scroll chat to bottom
        this.CHANGE_MESSAGE_READ_STATUS(this.currentDisplayedUser.id); //read all messages
      }
    });

    //track scroll so that we can determine if use has read new messages
    // let scrollableDiv = document.getElementById("my-chat-messaging");
    // scrollableDiv.addEventListener("scroll", this.readMessages);
    this.readMessages();
    //when message came stop typing
    this.socket.on("res/message/new", () => {
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

  // design sender name
  .sender_name {
    font-size: 11px;
    color: #00000066;
    font-weight: 500;
    margin-bottom: 6px;
    font-family: Poppins;
    width: 100%;

    p {
      margin: 0;
      color: inherit;
    }
  }

  @include scroll-bar;

  .msg-container {
    margin: 0 10px;
    overflow: auto;
    height: 100%;

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
        display: flex;
        place-items: flex-start;

        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-top: 20px;
          margin-right: 20px;
        }
      }
      .announcement-container {
        max-width: 90%;
        width: 100%;
        margin-left: 18px;
        padding: 21px 15px;
        background: #e7ecf0;
        border-radius: 10px;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 25px;
        /* or 167% */


        color: #3C3C3C;
        .announcer{
          font-weight: bold;
        }
        .category{
          text-transform: capitalize !important;
        }
        img {
          max-width: 225px;
          max-height: 57px;
        }
      }

      //whole msg bar css
      .msg {
        max-width: 28rem;
        padding: 0.5rem 1.7rem;
        margin: 1.5px;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        width: fit-content;
        font-size: 0.8rem;
        font-weight: 400;
        font-family: Poppins;
        word-break: break-word;
        position: relative;

        &.noBg {
          background: transparent !important;
        }
      }

      .attachments-cotainer {
        //position: absolute;
        display: flex;
        flex-wrap: wrap;
        &.pushed {
          margin-top: 0.5rem;
        }
        .attachment {
          width: fit-content;
          padding: 0;
          background: transparent;

          img {
            max-width: 402px;
            width: 100%;
            object-fit: cover;
            max-height: 199px;
            border-radius: 10px;
            border: 1px solid #193074;
          }
        }
        &.two {
          img {
            max-width: 201px;
            margin: 0px 5px;
          }
        }
        &.more {
          .attachment img {
            max-width: 130px;
            height: 108px;
            margin: 0px 5px;
          }
        }
      }
    }
    .msg-block {
      width: 100%;
    }

    // design system message
    .msgs-block.system_message.receiving {
      text-align: center;

      .msg {
        background-color: #fff;
        max-width: 100%;
      }

      .attachments-cotainer {
        left: 0;
      }
    }

    //css for the only sending msgs
    .sending {
      .picture {
        display: none;
      }

      .msg-block {
        .sender_name {
          display: flex;
          justify-content: flex-end;
          padding-right: 0.4rem;
        }

        .msgs {
          align-self: flex-end;
          display: flex;
          flex-direction: column;
          position: relative;

          .msg-cntnr {
            align-self: flex-end;
            .attachments-cotainer {
              right: 0;
              justify-content: flex-end;
            }
          }

          .msg {
            align-self: flex-end;
            margin-left: auto;
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
    }

    //css for the only receiving msgs
    .receiving {
      display: flex;
      flex-direction: row;
      margin-top: 22px;
      // .sender_name {
      //   font-size: 13px;
      //   color: #00000066;
      //   padding-left: 0.8rem;
      // }

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
    margin-top: 1px;
    background-color: $primary;
    color: white;
    cursor: pointer;
  }
}
</style>
