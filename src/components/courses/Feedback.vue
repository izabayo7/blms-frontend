<template>
  <div class="marking_feedback">
    <div class="d-flex">
      <div class="col-9 pa-0">
        <div
          ref="feedback_input"
          :class="`feedback_input ${
            content == '' ? 'empty_feedback' : 'saved_feedback'
          }`"
          :contenteditable="
            $store.state.user.user.category.name === 'INSTRUCTOR'
          "
          @keyup="computeFeedbackClass()"
        >
          {{ content }}
        </div>
      </div>
      <div
        v-if="
          mode == 'any' && $store.state.user.user.category.name === 'INSTRUCTOR'
        "
        class="col-3 vertically--centered pa-0"
      >
        <div v-if="content !== ''" class="actions">
          <svg
            @click="removeFeedback()"
            xmlns="http://www.w3.org/2000/svg"
            width="20.57"
            height="20.57"
            viewBox="0 0 20.57 20.57"
            class="mr-3 remove_feedback"
          >
            <path
              id="Icon_ionic-ios-close-circle"
              data-name="Icon ionic-ios-close-circle"
              d="M13.66,3.375A10.285,10.285,0,1,0,23.945,13.66,10.284,10.284,0,0,0,13.66,3.375Zm2.606,14.009L13.66,14.778l-2.606,2.606a.79.79,0,1,1-1.118-1.118l2.606-2.606L9.937,11.054a.79.79,0,0,1,1.118-1.118l2.606,2.606,2.606-2.606a.79.79,0,1,1,1.118,1.118L14.778,13.66l2.606,2.606a.794.794,0,0,1,0,1.118A.785.785,0,0,1,16.266,17.384Z"
              transform="translate(-3.375 -3.375)"
              fill="#fc6767"
            />
          </svg>
          <!-- <svg
            @click="editFeedback()"
            xmlns="http://www.w3.org/2000/svg"
            width="20.57"
            height="20.57"
            viewBox="0 0 20.57 20.57"
          >
            <path
              id="Icon_material-edit"
              data-name="Icon material-edit"
              d="M4.5,20.782v4.285H8.785L21.423,12.429,17.138,8.144ZM24.736,9.115a1.138,1.138,0,0,0,0-1.611L22.062,4.83a1.138,1.138,0,0,0-1.611,0L18.36,6.922l4.285,4.285,2.091-2.091Z"
              transform="translate(-4.5 -4.496)"
              fill="#3ce970"
            />
          </svg> -->
        </div>
      </div>
    </div>
    <div class="save_feedback d-flex">
      <v-btn
        v-if="$store.state.user.user.category.name === 'INSTRUCTOR' && showSave"
        @click="content != '' ? editFeedback() : addFeedback()"
        class="primary-bg px-6 py-4 mt-4"
        rounded
        >Save</v-btn
      >
      <div
        v-show="message != ''"
        class="mt-3 ml-5 text-right col-6 message_place"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
import Apis from "@/services/apis";
import { mapMutations } from "vuex";
export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    answerId: {
      type: String,
      required: true,
    },
    feedbackId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    element: undefined,
    showSave: false,
    message: "",
  }),
  computed: {
    refName() {
      return "feedback_" + Math.random() * 1000;
    },
    mode() {
      // console.log(this.feedbackContent());
      // return this.feedbackContent() == this.content ? "view" : "edit";
      return "any";
    },
    currentContent() {
      return this.$refs.feedback_input
        ? this.$refs.feedback_input.innerHTML
        : "";
    },
  },
  watch: {
    element() {
      console.log("hahiyeeeeee");
      this.computeFeedbackClass();
    },
    message() {
      if (this.message != "") {
        setTimeout(() => {
          this.message = "";
        }, 2000);
      }
    },
  },
  methods: {
    ...mapMutations("quiz_submission", ["add_answer_feedback"]),
    feedbackContent() {
      return this.$refs.feedback_input
        ? this.$refs.feedback_input.innerHTML
        : "";
    },
    computeFeedbackClass() {
      const element = this.$refs.feedback_input;
      if (element) {
        if (element.innerHTML == "") {
          element.className += " empty_feedback";
        } else {
          element.className = element.className.replace(" empty_feedback", "");
        }
      }
      // show or hide save button
      this.showSave = this.feedbackContent() != this.content;
    },
    async addFeedback() {
      const content = this.feedbackContent();
      if (content == "") {
        console.log("reka genda");
        return;
      }
      const response = await Apis.create("comment", {
        sender: this.$store.state.user.user.user_name,
        target: {
          type: "quiz_submission_answer",
          id: this.answerId,
        },
        content: content,
      });
      this.add_answer_feedback({
        answer_id: this.answerId,
        feedback: response.data.data,
      });

      let element = this.$refs.feedback_input;
      element.className += " saved_feedback";
      this.message = "feedback successfuly saved";
    },
    async editFeedback() {
      const content = this.feedbackContent();
      if (content == "") {
        console.log("reka genda");
        return;
      }
      const response = await Apis.update("comment", this.feedbackId, {
        content: content,
      });
      this.message = "feedback successfuly updated";
      console.log(response);
    },
    async removeFeedback() {
      const response = await Apis.delete("comment", this.feedbackId);
      this.message = "feedback successfuly removed";
      console.log(response);
    },
  },
  mounted() {
    // this.computeFeedbackClass();
    // setTimeout(() => {
    //   this.element = this.$refs.feedback_input;
    // }, 1000);
  },
};
</script>

<style lang="scss">
.marking_feedback {
  .feedback_input {
    border: 2px solid #d2d2d2;
    padding: 15px;
    border-radius: 9px;
    min-height: 140px;
    overflow-wrap: anywhere;
    max-width: 100%;
    &.saved_feedback {
      color: #989898;
      background-color: #f5f5f5;
      border: none;
    }
  }
  .feedback_input:focus {
    outline: none;
  }
  .empty_feedback::before {
    content: "Write feedback here";
  }
  .primary-bg {
    background-color: $primary !important;
    color: white !important;
  }
  .message_place {
    color: $primary;
  }
  .remove_feedback {
    cursor: pointer;
  }
}
</style>