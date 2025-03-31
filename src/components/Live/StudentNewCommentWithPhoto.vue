<template>
  <div class="my-student-new-comment-with-photo">
    <div class="my-student-new-comment-container-with-photo">
      <form
          @submit.prevent="send_comment"
          action=""
          class="new-comment-with-photo"
      >
        <div class="message-row">
          <div class="profile-pic">
            <v-avatar size="30" :class="{'my-1 ml-1':isInVideo}">
              <img
                  v-if="$store.state.user.user.profile"
                  :src="`${$store.state.user.user.profile}?width=100`"
                  alt="profile picture"
              />
              <div v-else class="text">{{ user_full_names | computeText }}</div>
            </v-avatar>
          </div>
          <div v-if="isInVideo" class="input ml-3 pl-3 pt-1 d-flex">
            <expandable-input @focused="enableControls" @endfocus="disableControls" v-model="comment"/>
            <button @click="send_comment" class="send"><svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.7582 1.01102C15.7644 0.987706 15.7675 0.964324 15.7677 0.940173C15.7678 0.929838 15.7684 0.91998 15.7674 0.909614C15.764 0.875616 15.7566 0.841949 15.7408 0.810151C15.7251 0.778327 15.7028 0.752064 15.6778 0.728808C15.6701 0.721563 15.6618 0.716062 15.6534 0.709804C15.6343 0.695544 15.614 0.684003 15.592 0.674817C15.582 0.670658 15.5726 0.666386 15.5622 0.663419C15.5361 0.655862 15.5092 0.652475 15.4814 0.652602C15.475 0.652629 15.469 0.650899 15.4626 0.651311C15.4612 0.651409 15.46 0.650942 15.4586 0.651091L1.0741 1.87141C0.963967 1.88082 0.868892 1.95252 0.829563 2.05584C0.790093 2.15908 0.81346 2.27585 0.889567 2.35609L4.63607 6.31072L5.51151 11.6872C5.5287 11.7927 5.60274 11.8797 5.70353 11.9137C5.707 11.9149 5.71046 11.9161 5.71412 11.917C5.82009 11.9484 5.93467 11.9161 6.0089 11.8341L15.6963 1.13098C15.6972 1.13004 15.6975 1.12883 15.6983 1.12786C15.7026 1.12301 15.7049 1.1171 15.7089 1.11204C15.7259 1.08989 15.7395 1.06631 15.7494 1.04087C15.7532 1.03095 15.7555 1.02121 15.7582 1.01102ZM1.71866 2.39444L13.9967 1.35288L4.96871 5.82473L1.71866 2.39444ZM5.98364 11.0044L5.22416 6.34045L14.2526 1.8684L5.98364 11.0044Z" fill="#292929"/>
            </svg>
            </button>
          </div>
          <div v-else class="input ml-3 pl-3 py-1">
            <expandable-input @focused="enableControls" @endfocus="disableControls" v-model="comment"/>
          </div>
        </div>
        <div v-if="!isInVideo" class="action-btn" v-show="showControls">

          <div class="cancel">
            <button-ui @click="cancelCommenting" class-list="px-5 py-1">
              <template #content>CANCEL</template>
            </button-ui>
          </div>
          <div class="send ml-4">
            <button-ui fill class-list="px-5 py-1" @click="send_comment">
              <template #content>COMMENT</template>
            </button-ui>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import api from "@/services/apis";
import {empty} from "../../services/global_functions";
import ExpandableInput from "../reusable/ui/ExpandableInput";
import ButtonUi from "../reusable/ui/button-ui";

export default {
  name: "StudentNewCommentWithPhoto",
  components: {ButtonUi, ExpandableInput},
  props: {
    isLive: {
      type: Boolean,
      default: false
    },
    isInVideo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      comment: "",
      showControls: false,
    };
  },
  computed: {
    ...mapGetters("chat", ["socket"]),
    ...mapGetters("courses", ["course"]),
    ...mapGetters("live_session", ["participants"]),
    ...mapGetters("user", ["user_full_names", "username"]),
    ...mapGetters("courses", ["selectedChapter", "totalComments"]),
    comment_object() {
      return {
        sender: this.username,
        target: {
          type: this.isLive ? "live_session" : "chapter",
          id: this.isLive ? this.$route.params.liveSessionId : this.selectedChapter
        },
        content: this.comment,
      };
    },
    comment_empty() {
      return empty(this.comment);
    },
  },
  mounted() {
    let span = document.querySelector('.message-row span')
    span.innerText = 'write comment'
    span.onfocus = () => {
      if (span.innerText == 'write comment') {
        span.innerText = ""
      }
    }
    span.onblur = () => {
      if (span.innerText == "") {
        span.innerText = 'write comment'
      }
    }
  },
  methods: {
    cancelCommenting(){
      let span = document.querySelector('.message-row span')
      span.innerText = 'write comment'
      this.showControls = false
    },
    enableControls() {
      if (!this.showControls)
        this.showControls = true;
    },
    disableControls() {
      let span = document.querySelector('.message-row span')
      if (this.showControls && span.innerText == "")
        this.showControls = false;
    },
    async send_comment() {
      if (empty(this.comment)) return;

      try {
        if (!this.isLive) {
          let {data} = await api.create("comment", this.comment_object);
          this.socket.emit('chapter-comment', {
            userName: this.course.user.user_name,
            route: this.$route.path + data.data._id + '?tab=discussion',
            content: 'commentend on chapter ' + this.course.chapters[this.$route.params.index].name
          })
          data.data.replies = [];
          this.$store.commit(
              "courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER",
              this.totalComments == "" ? 1 : this.totalComments + 1
          );
          this.$emit("sent", data.data);
          this.comment = "";
        } else {
          this.socket.emit("comment/new", {
            receivers: this.participants,
            comment: this.comment_object,
          });
          this.socket.on("res/comment/new", (result) => {
            // this.$store.commit(
            //     "courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER",
            //     this.totalComments == "" ? 1 : this.totalComments + 1
            // );
            result.replies = [];
            this.$emit("sent", result);
            this.comment = "";
            this.socket.off('res/comment/new');
          });
        }
        let span = document.querySelector('.message-row span')
        span.innerText = 'write comment'
        this.showControls = false;
      } catch (err) {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: err,
          status: "danger",
          uptime: 2000,
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.my-student-new-comment-with-photo {
  .my-student-new-comment-container-with-photo {
    form {
      background-color: $main;
      padding: 0.5rem;

      .disabled {
        opacity: 0.5;
      }

      .message-row {
        display: flex;
        justify-items: center;
        align-items: center;

        .profile-pic {
          .v-avatar {
            background-color: $primary;

            .text {
              color: $main;
            }

            width: 25px;
            height: 25px;
          }
        }

        .input {
          width: 100%;
          display: flex;
          justify-items: center;

        }
      }

      .action-btn {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;

        button {
          font-size: .8rem;
          margin: .1rem .4rem;
          padding: .2rem .8rem;
          border-radius: 1px;
        }

        .send {
          background-color: $primary;
          color: $main;

          &:hover {
            background-color: darken($primary, 5);
          }

        }

        .cancel {
          background-color: $secondary;
        }
      }
    }
  }
}
</style>
