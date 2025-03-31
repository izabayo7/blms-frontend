<template>
  <main class="my-chat-messaging customScroll" id="my-chat-messaging">
    <!--    messages container-->
    <div class="msg-container" @scroll="loadMoreMessages" id="msg-container" ref="msg-container">
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
              <circle cx="18.5" cy="18.5" r="18.5" fill="#FFD248"/>
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
                :id="msg._id"
                :class="`msg-cntnr ${
                !msg.content || msg.content === '' ? 'noBg' : ''
              } d-flex`"
                v-for="(msg, i) in msgs.messages"
                :key="i"
            >
              <div
                  class="msg mx-auto"
                  v-if="msg.content && msgs.from === 'SYSTEM'"
                  :inner-html.prop="msg.content | injectTime"
              />
              <div v-else class="actions">
                <div class="d-flex">
                  <div class="action tooltip">
                    <div class="icon">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.136 7.99989C15.136 11.9412 11.941 15.1363 7.99965 15.1363C4.05834 15.1363 0.863281 11.9412 0.863281 7.99989C0.863281 4.05858 4.05834 0.863525 7.99965 0.863525C11.941 0.863525 15.136 4.05858 15.136 7.99989Z"
                            stroke="#BABABC"/>
                        <path d="M4.72656 10.1819C6.90838 12.3637 9.0902 12.3637 11.272 10.1819H4.72656Z"
                              fill="#BABABC"/>
                        <path
                            d="M5.81886 8.21828C6.54185 8.21828 7.12795 7.63218 7.12795 6.90919C7.12795 6.1862 6.54185 5.6001 5.81886 5.6001C5.09587 5.6001 4.50977 6.1862 4.50977 6.90919C4.50977 7.63218 5.09587 8.21828 5.81886 8.21828Z"
                            fill="#BABABC"/>
                        <path
                            d="M10.1821 8.21828C10.9051 8.21828 11.4912 7.63218 11.4912 6.90919C11.4912 6.1862 10.9051 5.6001 10.1821 5.6001C9.45915 5.6001 8.87305 6.1862 8.87305 6.90919C8.87305 7.63218 9.45915 8.21828 10.1821 8.21828Z"
                            fill="#BABABC"/>
                      </svg>

                    </div>
                    <div class="tooltip-text">
                      Add reaction
                    </div>
                  </div>
                  <div class="action tooltip">
                    <div class="icon">
                      <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7 0V4C14 5 17 10 18 15C15.5 11.5 12 9.9 7 9.9V14L0 7L7 0ZM5 4.83L2.83 7L5 9.17V7.9H7C9.07 7.9 10.93 8.28 12.66 8.85C11.26 7.46 9.46 6.37 6.72 6L5 5.73V4.83Z"
                            fill="#BABABC"/>
                      </svg>

                    </div>
                    <div class="tooltip-text">
                      Reply message
                    </div>
                  </div>
                  <div class="action tooltip">
                    <div @click="setmsgTDlt(msg._id)" class="icon cursor-pointer">
                      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                            fill="#BABABC"/>
                      </svg>

                    </div>
                    <div class="tooltip-text">
                      Delete message
                    </div>
                  </div>
                  <div class="action tooltip">
                    <div class="icon">
                      <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11 0V4C4 5 1 10 0 15C2.5 11.5 6 9.9 11 9.9V14L18 7L11 0ZM13 4.83L15.17 7L13 9.17V7.9H11C8.93 7.9 7.07 8.28 5.34 8.85C6.74 7.46 8.54 6.37 11.28 6L13 5.73V4.83Z"
                            fill="#BABABC"/>
                      </svg>

                    </div>
                    <div class="tooltip-text">
                      Forward message
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="(msg.content || msg.attachments) && msgs.from !== 'SYSTEM'">
                <div
                    v-if="msg.content"
                    class="msg"
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
              <Modal v-if="msgTDlt === msg._id" template="delete_message_confirmation" @close="setmsgTDlt(undefined)">
                <div>
                  <div
                      class="sender_name text-left"
                  >
                    {{ msgs.messages[0].createdAt | getTimeDifference }}
                  </div>
                  <div
                      v-if="msg.content"
                      class="msg"
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
              </Modal>
            </div>
          </div>
          <div v-else class="msgs">
            <div class="announcement-container">
              <div class="d-flex">
                <div class="col-5">
                  <img
                      :src="$store.state.sidebar_navbar.college.logo"
                      alt=""
                      class="college-logo"
                  />
                </div>
                <div class="col-7 vertically--centered justify-start">
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
                <div class="announcer">{{ msgs.sender.sur_name }} {{ msgs.sender.other_names }}</div>
                <div class="category">{{ msgs.sender.category.toLowerCase() }}</div>
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
import {mapState, mapGetters, mapMutations, mapActions} from "vuex";
// import {on} from "@/services/event_bus";
import {chatMixins} from "@/services/mixins";

export default {
  name: "Chat-messaging",
  mixins: [chatMixins],
  components: {
    Editor: () => import("@/components/reusable/Editor"),
    Modal: () => import("@/components/shared/Dialog"),
  },
  props: {
    // data: {type: [Array, Boolean], required: true},
  },
  data() {
    return {
      typing: false,
      typers: [],
      topmsg: undefined,
      msgTDlt: undefined,
    };
  },
  computed: {
    ...mapState("chat", ["currentDisplayedUser", "incomingMessages"]),
    ...mapGetters("chat", ["socket"]),
    data() {
      return this.$store.getters["chat/currentMessages"]
    },
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
  // watch: {
  //   $route() {
  //     this.scrollChatToBottom(); //scroll chat to bottom
  //   }
  // },
  methods: {
    ...mapMutations("chat", ["CHANGE_MESSAGE_READ_STATUS"]),
    ...mapActions("chat", ["loadMessages"]),
    findTotalMessages() {
      let i = 0
      for (const k in this.data) {
        i += this.data[k].messages.length
      }
      return i
    },
    setmsgTDlt(id){
      this.msgTDlt = id
    },
    loadMoreMessages() {
      const el = document.querySelector('.msg-container');
      if (el.scrollTop === 0 && this.data[0].from !== "SYSTEM") {
        const id = document.querySelector('.msg-cntnr').id
        this.loadMessages({id: this.$route.params.username, lastMessage: this.data[0].messages[0]._id})

        setTimeout(() => {
          const msg = document.getElementById(id)
          const height = msg.parentElement.parentElement.parentElement.scrollHeight
          if (height > 20)
            msg.parentElement.parentElement.parentElement.parentElement.scrollTo({
              top: height - 20
            })
        }, 50)
      }

    },
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
      const e = document.querySelector('.msg-container');
      if (!e)
        return
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
    if (this.findTotalMessages() < 11)
      this.scrollChatToBottom();
  },
};
</script>

<style lang="scss" scoped>
.my-chat-messaging {
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
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
    overscroll-behavior: contain;

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

        .announcer {
          font-weight: bold;
        }

        .category {
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

      .actions {
        display: none;

        .action {
          display: flex;
          justify-content: center;
          align-content: center;
          width: 24px;
          height: 24px;
        }

        .tooltip-text {
          background: #A8A7A7;
          z-index: 9;

          &::after {
            border-color: #A8A7A7 transparent transparent transparent;
          }
        }
      }

      .msg-cntnr {
        align-items: center;
        &:hover {
          .actions {
            display: initial;
          }
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
      .msg-cntnr {
        flex-direction: row-reverse;
        justify-content: flex-end;
      }

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
