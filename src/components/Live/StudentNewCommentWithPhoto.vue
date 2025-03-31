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
            <v-avatar size="30">
              <img
                v-if="$store.state.user.user.profile"
                :src="`${$store.state.user.user.profile}?width=100`"
                alt="profile picture"
              />
              <div v-else class="text">{{ user_full_names | computeText }}</div>
            </v-avatar>
          </div>
          <div class="input ml-3 pl-3 py-1">
            <expandable-input v-model="comment"/>
          </div>
        </div>
        <div class="action-btn" >

          <div class="cancel">
            <button-ui  class-list="px-5 py-1">
              <template #content>CANCEL</template>
            </button-ui>
          </div>
          <div class="send ml-4">
            <button-ui fill class-list="px-5 py-1"  @click="send_comment">
              <template #content>COMMENT</template>
            </button-ui>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/services/apis";
import { empty } from "../../services/global_functions";
import ExpandableInput from "../reusable/ui/ExpandableInput";
import ButtonUi from "../reusable/ui/button-ui";

export default {
  name: "StudentNewCommentWithPhoto",
  components: {ButtonUi, ExpandableInput},
  props:{
    isLive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    ...mapGetters("chat", ["socket"]),
    ...mapGetters("live_session", ["participants"]),
    ...mapGetters("user", ["user_full_names", "username"]),
    ...mapGetters("courses", ["selectedChapter", "totalComments"]),
    comment_object() {
      return {
        sender: this.username,
        target: { type: this.isLive? "live_session" : "chapter", id: this.isLive? "609ab8838fc73f303874e10e" : this.selectedChapter },
        content: this.comment,
      };
    },
    comment_empty() {
      return empty(this.comment);
    },
  },
  methods: {
    async send_comment() {
      console.log("ahaaaa",this.comment)
      if (empty(this.comment)) return;

      try {
        if(!this.isLive) {
          let {data} = await api.create("comment", this.comment_object);
          data.data.replies = [];
          this.$store.commit(
              "courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER",
              this.totalComments == "" ? 1 : this.totalComments + 1
          );
          this.$emit("sent", data.data);
          this.comment = "";
        } else{
          this.socket.emit("comment/new", {
            receivers: this.participants,
            comment: this.comment_object,
          });
          this.socket.on("res/comment/new", (result)=>{
            console.log("\n\n\nyagiye weeeeeeeeeeeeeeeeeeeee\n\n\n", result)
            // this.$store.commit(
            //     "courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER",
            //     this.totalComments == "" ? 1 : this.totalComments + 1
            // );
            result.replies = [];
            this.$emit("sent", result);
            this.comment = "";
          });
        }
      } catch (err) {
        console.log(err);
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
      .message-row{
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
      .action-btn{
        display: flex;
        justify-content: flex-end;
        margin-top:1rem;
        button{
          font-size: .8rem;
          margin:.1rem .4rem;
          padding:.2rem .8rem;
          border-radius: 1px;
        }
        .send {
          background-color: $primary;
          color:$main;
          &:hover {
            background-color: darken($primary, 5);
          }

        }

        .cancel{
          background-color: $secondary;
        }
      }
    }
  }
}
</style>