<template>
  <div class="marking_feedback">
    <div class="d-flex">
      <div class="col-12 col-md-9 pa-0">
        <div
            v-if="$store.state.user.user.category.name !== 'INSTRUCTOR'"
            class="feedback_sender text-right"
        >
          Instructor feedback
        </div>
        <div
            v-if="$store.state.user.user.category.name == 'INSTRUCTOR' || content != ''"
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
          class="col-3 col-md-1 vertically--centered pa-0"
      >
        <div v-if="content !== '' || showDelete" class="actions">
          <svg @click="removeFeedback()" class="cursor-pointer" width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
              <path d="M7.0026 22.2848C7.0026 23.5682 8.0526 24.6182 9.33594 24.6182H18.6693C19.9526 24.6182 21.0026 23.5682 21.0026 22.2848V8.28483H7.0026V22.2848ZM22.1693 4.78483H18.0859L16.9193 3.61816H11.0859L9.91927 4.78483H5.83594V7.11816H22.1693V4.78483Z" fill="#FF0808"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="28" height="28" fill="white" transform="translate(0 0.119141)"/>
              </clipPath>
            </defs>
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
    <div class="save_feedback d-flex col-12 col-md-9 pa-0">
      <div v-if="isFileUpload && $store.state.user.user.category.name === 'INSTRUCTOR'" class="d-flex file-feedback">
        <div>
          <div>
            <button class="pick-file file-picked" @click="pickfile(index)">
              Choose file
            </button>
            <input
                type="file"
                :id="`file${index}`"
                hidden
                @change="handleFileUpload(index)"
            />
          </div>
          <div v-if="!feedback_name" class="hint">Upload a file (optional )</div>
          <button v-else class="hint"
                  @click="downloadAttachment(`${backend_url}/api/quiz_submission/${submission_id}/attachment/${feedback_name}/download?token=${$session.get('jwt')}`)">
            {{ feedback_name }}
          </button>
        </div>
        <div v-if="file || message != ''">
          <div v-if="file" class="file-name">{{ file.name }}</div>
          <div v-if="upload_status == 1" class="spining">
            uploading
          </div>
          <div v-else-if="upload_status == 2 || message != ''" class="status text-right">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M5.24909 9.45091L2.79909 7.00091L1.98242 7.81758L5.24909 11.0842L12.2491 4.08424L11.4324 3.26758L5.24909 9.45091Z"
                  fill="#289448"/>
            </svg>
            {{ message == '' ? 'Saved successfuly' : message }}
          </div>
        </div>
      </div>
      <div v-else-if="isFileUpload" class="d-block d-md-flex  file-feedback col-12 pa-0">
        <button class="pick-file saved file-picked mx-auto ml-0"
                @click="downloadAttachment(`${backend_url}/api/quiz_submission/${submission_id}/attachment/${feedback_name}/view?token=${$session.get('jwt')}`)">
          {{ feedback_name }}
        </button>
        <button class="download-attachment mx-auto mr-0"
                @click="downloadAttachment(`${backend_url}/api/quiz_submission/${submission_id}/attachment/${feedback_name}/download?token=${$session.get('jwt')}`)">
          Download attachment
        </button>
      </div>
      <v-btn
          v-if="$store.state.user.user.category.name === 'INSTRUCTOR' && showSave"
          @click="saveChanges"
          class="primary-bg px-6 py-4 mt-4 ml-auto"
          rounded
      >Save
      </v-btn
      >
    </div>
  </div>
</template>

<script>
import Apis from "@/services/apis";
import {mapMutations} from "vuex";
import {downloadAttachment} from "@/services/global_functions"

export default {
  props: {
    content: {
      type: String,
      required: true,
    },
    feedback_name: {
      type: String
    },
    answerId: {
      type: String,
      required: true,
    },
    feedbackId: {
      type: String,
      required: true,
    },
    index: {
      type: Number,
      default: 0
    },
    submission_id: {
      type: String
    },
    isFileUpload: {
      type: Boolean
    }
  },
  data: () => ({
    element: undefined,
    showSave: false,
    showDelete: false,
    upload_status: 0,
    message: "",
    file: null
  }),
  computed: {
    backend_url() {
      return process.env.VUE_APP_api_service_url
    },
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
        this.showSave = false;
        setTimeout(() => {
          this.message = "";
        }, 2000);
      }
    },
  },
  methods: {
    downloadAttachment,
    upoadFeedback() {
      const formData = new FormData()
      formData.append("file", this.file)
      this.upload_status = 1;
      Apis.create(`quiz_submission/feedback/${this.submission_id}/${this.answerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      }).then(() => {
        this.upload_status = 2
      })
    },
    saveChanges() {
      if (this.file) {
        this.upoadFeedback()
      }
      if (this.content != '')
        this.editFeedback()
      else
        this.addFeedback()
    },
    pickfile(index) {
      document.getElementById(`file${index}`).click();
    },
    handleFileUpload(index) {
      this.file = document.getElementById(
          `file${index}`
      ).files[0];
      this.showSave = true;
      // send feedback_src

    },
    ...mapMutations("quiz_submission", [
      "add_answer_feedback",
      "remove_answer_feedback",
    ]),
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
    removeNonBreakingSpace(text) {
      return text.replace(/&nbsp;/g, "");
    },
    async addFeedback() {
      let content = this.removeNonBreakingSpace(this.feedbackContent());

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

      // add the feedback in state
      this.add_answer_feedback({
        answer_id: this.answerId,
        feedback: response.data.data,
      });

      let element = this.$refs.feedback_input;
      element.className += " saved_feedback";
      this.message = "feedback successfuly saved";
      this.showDelete = true;
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

      // update the feedback in state
      this.add_answer_feedback({
        answer_id: this.answerId,
        feedback: response.data.data,
      });

      this.message = "feedback successfuly updated";
    },
    async removeFeedback() {
      const response = await Apis.delete("comment", this.feedbackId);
      console.log(response);
      let element = this.$refs.feedback_input;
      element.innerHTML = "";
      element.className = element.className.replace(
          "saved_feedback",
          "empty_feedback"
      );
      this.message = "feedback successfuly removed";
      this.showDelete = false;

      // remove the feedback from the state
      this.remove_answer_feedback({
        answer_id: this.answerId,
      });
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
  .feedback_sender {
    color: black;
    font-weight: 700;
  }

  .feedback_input {
    border: 2px solid #d2d2d2;
    padding: 15px;
    border-radius: 9px;
    min-height: 140px;
    overflow-wrap: anywhere;
    max-width: 100%;
    width: 100%;

    &.saved_feedback {
      color: black;
      background-color: #e1e1e1;
      // box-shadow: 3px 6px 10px rgb(0, 0, 0, 0.16);
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

  .remove_feedback {
    cursor: pointer;
  }

  .file-feedback {
    margin-top: 14px;

    .status {
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 10px;
      line-height: 26px;
      /* identical to box height, or 262% */


      color: #289448;
    }

    .file-name {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 13.0899px;
      line-height: 34px;
      /* or 262% */

      display: flex;
      align-items: center;

      color: #193074;

    }
  }

  .pick-file {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 10.6667px;
    line-height: 35px;
    /* or 328% */
    margin-bottom: 7px;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #3C3C3C;

    width: 102.67px;
    height: 32px;

    background: #FFFFFF;
    border: 1.33333px solid #BABABC;
    box-sizing: border-box;
    box-shadow: 0px 5.33333px 5.33333px rgba(25, 48, 116, 0.25);
    border-radius: 9.33333px;

    &.saved {
      font-style: normal;
      font-weight: 500;
      font-size: 13.0899px;
      line-height: 34px;
      /* or 262% */
      border: none;
      display: flex;
      align-items: center;
      box-shadow: none;
      color: #193074;


      width: 214px;
      height: 29px;

      background: rgba(25, 48, 116, 0.14);
      border-radius: 8px;
    }
  }

  .download-attachment {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 15px;
    line-height: 34px;
    /* or 229% */

    display: flex;
    align-items: center;

    color: #193074;
  }
}
</style>