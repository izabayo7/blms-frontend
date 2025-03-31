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
                :src="`${$store.state.user.user.profile}?width=30`"
                alt="profile picture"
              />
              <div v-else class="text">{{ user_full_names | computeText }}</div>
            </v-avatar>
          </div>
          <div class="input mx-3 px-3 py-1">
            <textarea
              v-model="comment"
              type="text"
              placeholder="Add a comment ..."
            >
            </textarea>
          </div>
        </div>
        <div class="action-btn" >
          <button class="cancel">CANCEL</button>
          <button class="send"  @click="send_comment">COMMENT</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import api from "@/services/apis";
import { empty } from "../../services/global_functions";

export default {
  name: "StudentNewCommentWithPhoto",
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    ...mapGetters("user", ["user_full_names", "username"]),
    ...mapGetters("courses", ["selectedChapter", "totalComments"]),
    comment_object() {
      return {
        sender: this.username,
        target: { type: "chapter", id: this.selectedChapter },
        content: this.comment,
      };
    },
    comment_empty() {
      return empty(this.comment);
    },
  },
  methods: {
    async send_comment() {
      if (empty(this.comment)) return;

      try {
        let { data } = await api.create("comment", this.comment_object);
        data.data.replies = [];
        this.$store.commit(
          "courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER",
          this.totalComments == "" ? 1 : this.totalComments + 1
        );
        this.$emit("sent", data.data);
        this.comment = "";
      } catch (err) {
        console.log(err);
      }
    },
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
          width: 90%;
          display: flex;
          justify-items: center;
          border-bottom: 3px solid $secondary;

          textarea {
            width: 100%;
          }
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