<script src="../../services/event_bus.js"></script>
<template>
  <div class="my-reply-comment">
    <div class="my-reply-comment-container">
      <form @submit.prevent="reply" action="" class="reply-comment">
        <div class="profile-pic">
          <v-avatar size="30">
            <img
                v-if="user.profile"
                :src="`${user.profile}?width=30`"
                alt="profile picture"
            />
            <div v-else class="text">
              {{ user_full_names | computeText }}
            </div>
          </v-avatar>
        </div>
        <div class="ml-4 input-holder">
          <div class="input"><input v-model="reply_comment" type="text" placeholder="write-something"></div>
          <div class="send px-1" @click="reply">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="none" d="M0 0h24v24H0z"/>
                <path
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"/>
              </svg>
              <svg class="live" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.906 0.935573L0.341237 7.28379C0.283643 7.31157 0.235234 7.35531 0.201762 7.4098C0.168289 7.46429 0.15116 7.52724 0.152407 7.59117C0.153655 7.65511 0.173228 7.71734 0.208801 7.77048C0.244374 7.82362 0.294452 7.86544 0.353087 7.89096L4.29293 10.1171C4.40667 10.1812 4.53742 10.2087 4.66736 10.1959C4.79731 10.1831 4.92015 10.1305 5.01916 10.0454L12.7877 3.34789C12.839 3.30444 12.962 3.22093 13.01 3.26833C13.058 3.31573 12.9824 3.43761 12.9383 3.49066L6.21714 11.0611C6.12586 11.1635 6.0703 11.2927 6.0588 11.4294C6.0473 11.5661 6.08049 11.7028 6.15338 11.8189L8.72765 15.9495C8.75584 16.0058 8.79932 16.053 8.8531 16.0857C8.90688 16.1185 8.96879 16.1354 9.03174 16.1346C9.09468 16.1337 9.15613 16.1152 9.20903 16.0811C9.26194 16.047 9.30416 15.9986 9.33087 15.9416L15.3546 1.37628C15.3834 1.31379 15.3922 1.24392 15.3799 1.17623C15.3675 1.10854 15.3345 1.04632 15.2854 0.998098C15.2363 0.949871 15.1735 0.917983 15.1056 0.906791C15.0377 0.8956 14.968 0.905652 14.906 0.935573Z"
                    fill="#636363"/>
              </svg>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {empty} from "../../services/global_functions";
import api from "@/services/apis"

export default {
  name: "NewReplyComment",
  props: {
    reply_id: {required: true},
    isLive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reply_comment: "",
    }
  },
  computed: {
    ...mapGetters("chat", ["socket"]),
    ...mapGetters("live_session", ["participants"]),
    ...mapGetters('user', ['user_full_names', 'username', 'user']),
    ...mapGetters("courses", ['selectedChapter']),
    reply_comment_object() {
      return {
        sender: this.username,
        target: {
          type: this.isLive ? "live_session" : "chapter",
          id: this.isLive ? "609ab8838fc73f303874e10e" : this.selectedChapter
        },
        content: this.reply_comment,
        reply: this.reply_id
      }
    }
  },
  methods: {
    async reply() {
      if (empty(this.reply_comment)) return

      try {
        if (!this.isLive) {
          let {data} = await api.create('comment', this.reply_comment_object)
          this.$emit('sent', {_id: this.reply_id, data: data.data})
          this.reply_comment = ""
        } else {
          this.socket.emit("comment/new", {
            receivers: this.participants,
            comment: this.reply_comment_object,
          });
          this.socket.on("res/comment/new", (result) => {
            console.log("\n\n\nyagiye weeeeeeeeeeeeeeeeeeeee\n\n\n", result)
            // this.$store.commit(
            //     "courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER",
            //     this.totalComments == "" ? 1 : this.totalComments + 1
            // );
            this.$emit('sent', {_id: this.reply_id, data: result})
            this.reply_comment = "";
            this.socket.off('res/comment/new');
          });
        }
      } catch (err) {
        console.log(err)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.my-reply-comment {
  .my-reply-comment-container {
    display: flex;
    align-items: center;
    margin-bottom: .3rem;
    margin-top: .3rem;

    .reply-comment {
      display: flex;
      flex-grow: 1;

      .profile-pic {
        display: flex;

        .v-avatar {
          align-self: center;
          background-color: $primary;
          color: $main;
        }
      }

      .input-holder {
        border-radius: 3px;
        border: 2px solid $secondary;
        display: flex;
        flex-grow: 1;

        .input {
          flex-grow: 1;
          padding-top: .2rem;
          padding-bottom: .2rem;
          padding-left: .4rem;


          input {
            width: 100%;
            padding-right: .3rem;
            font-size: .8rem;
          }
        }

        .send {
          cursor: pointer;

          &:hover {
            background-color: $secondary;
          }

          .icon {
            svg {
              transform: scale(.7) translateY(5.5px);
            }

            .live {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>