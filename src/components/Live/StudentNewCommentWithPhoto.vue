<template>
  <div class="my-student-new-comment-with-photo">
    <div class="my-student-new-comment-container-with-photo">
      <form
        @submit.prevent="send_comment"
        action=""
        class="new-comment-with-photo"
      >
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
        <div
          class="send"
          :class="{ disabled: comment_empty }"
          @click="send_comment"
        >
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
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
      display: flex;
      justify-items: center;
      background-color: $main;
      align-items: center;
      padding: 0.5rem;

      .disabled {
        opacity: 0.5;
      }

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
      .send {
        background-color: $primary;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          background-color: darken($primary, 5);
        }

        .icon {
          width: fit-content;
          height: fit-content;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;

          svg {
            transform: scale(0.8);
            fill: $main;
          }
        }
      }
    }
  }
}
</style>