<template>
  <div class="my-unreal-time-discussion-board">
    <div class="unreal-time-discussion-bord-container px-3 py-5">
      <div class="head mb-5" v-if="head_visible">
        <discussion-head content="Economics Basics part II" :live="true" />
      </div>
      <div class="student-new-comment mb-5">
        <student-new-comment-with-photo @sent="sent" />
      </div>
      <div class="unreal-time-discussions-holder">
        <loader v-if="commentsLoading" />
        <div v-else class="unreal-time-discussions">
          <div v-if="comments.length > 0" class="discussions-container">
            <div
              class="discussion"
              v-for="comment in comments"
              :key="comment._id"
            >
              <discussion
                :content="comment"
                :verified="comment.sender.category !== 'STUDENT'"
                @replied="replied"
              />
            </div>
          </div>
          <div v-else class="no-discussions-message">
            <p>No current discussion on this chapter :)</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import NewComment from "./NewComment";
import Discussion from "./Discussion";
import DiscussionHead from "./DiscussionHead";
import StudentNewCommentWithPhoto from "./StudentNewCommentWithPhoto";
import api from "@/services/apis";
import { mapGetters } from "vuex";
import { on } from "../../services/event_bus";
import Loader from "../loaders";

export default {
  name: "UnrealTimeDiscussionBoard",
  props: {
    head_visible: { default: false, type: Boolean },
  },
  components: {
    Loader,
    StudentNewCommentWithPhoto,
    // NewComment,
    Discussion,
    DiscussionHead,
  },
  data() {
    return {
      comments: [],
      commentsLoading: false,
    };
  },
  computed: {
    ...mapGetters("courses", ["selectedChapter"]),
  },
  methods: {
    async get_comments() {
      this.commentsLoading = true;
      const comments = await api.get(`comment/chapter/${this.selectedChapter}`);
      this.comments = comments.data.data;

      const total = this.comments.length > 0 ? this.comments.length : "";
      this.$store.commit("courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER", total); //set total comments number
      this.commentsLoading = false;
    },
    sent(comment) {
      this.comments.unshift(comment);
    },
    replied(data) {
      this.comments.map((comment) => {
        if (comment._id === data._id) comment.replies.push(data.data);
      });
    },
  },
  mounted() {
    this.get_comments();
  },
  created() {
    on("routeUpdate", (nextId) => {
      this.$store.commit("courses/set_selected_chapter", nextId);
      this.get_comments();
    });
  },
};
</script>

<style lang="scss" scoped>
.my-unreal-time-discussion-board {
  width: 100%;
  .unreal-time-discussion-bord-container {
    background-color: $main;
  }
}
</style>