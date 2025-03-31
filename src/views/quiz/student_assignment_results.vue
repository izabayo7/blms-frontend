<template>
  <v-container id="view-assignments" class="px-6 pl-lg-14 pr-md-2 pt-6" fluid>
    <v-row>
      <v-col v-if="assignment" class="col-12">
        <div class="upper">
          <div>Assignments</div>
          <div>{{ assignment.title }}</div>
          <div>Due on {{ assignment.dueDate | formatDate }}, before {{
              new Date(assignment.dueDate).toLocaleTimeString()
            }}
          </div>
          <div v-if="assignment_submission._id">Submitted on {{ assignment_submission.createdAt | formatDate }}, at {{
              new Date(assignment_submission.createdAt).toLocaleTimeString()
            }}
          </div>
          <div
              v-if="assignment_submission._id && assignment_submission.createdAt !== assignment_submission.updatedAt && !assignment_submission.marked">
            Last edited on {{ assignment_submission.updatedAt | formatDate }}, at {{
              new Date(assignment_submission.updatedAt).toLocaleTimeString()
            }}
          </div>
        </div>
        <div class="lower">
          <div v-if="assignment.details" class="description">
            <Editor
                ref="editor"
                mode="view"
                :defaultContent="assignment.details"
            />
          </div>
          <div v-if="assignment.submissionMode === 'fileUpload'" class="attachment-container">
            <div v-if="assignment.attachments.length" class="file-container row ma-0">
              <div class="indicator mb-2 col-12 pa-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M9 0C4.03763 0 0 4.03763 0 9C0 13.9624 4.03763 18 9 18C13.9624 18 18 13.9624 18 9C18 4.03763 13.9624 0 9 0ZM9 16.875C4.6575 16.875 1.125 13.3425 1.125 9C1.125 4.6575 4.6575 1.125 9 1.125C13.3425 1.125 16.875 4.6575 16.875 9C16.875 13.3425 13.3425 16.875 9 16.875Z"
                      fill="#193074"/>
                  <path d="M9 4.1543L9 10.1543" stroke="#193074" stroke-width="1.5" stroke-linecap="round"/>
                  <circle cx="9" cy="13" r="1" fill="#193074"/>
                </svg>
                <span class="ml-1">Click on file to open</span>
              </div>
              <div class="col-12">
                <div class="row ma-0" v-for="(attachment, i) in assignment.attachments" :key="i">
                  <div class="pick-file col-12 col-md-8 d-flex px-4">
                    <button
                        @click="downloadAttachment(`${backend_url}/api/assignments/${$route.params.id}/attachment/${attachment.src}?&token=${$session.get('jwt')}`)"
                        class="file-name">
                      {{ attachment.src }}
                    </button>
                    <!--                    <div class="file-size mx-auto">-->
                    <!--                      26kb-->
                    <!--                    </div>-->
                    <div class="file-type ml-auto">
                      {{ attachment.src.split('.')[attachment.src.split('.').length - 1] }}
                    </div>

                  </div>
                  <div class="col-12 col-md-4 py-0">
                    <button
                        @click="downloadAttachment(`${backend_url}/api/assignments/${$route.params.id}/attachment/${attachment.src}?download=true&token=${$session.get('jwt')}`)"
                        class="download-attachment">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="indicator mb-2 mt-6 col-12 pa-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                  <path
                      d="M11.7809 0C5.28521 0 0 5.28521 0 11.7809C0 18.2766 5.28521 23.5618 11.7809 23.5618C18.2766 23.5618 23.5618 18.2766 23.5618 11.7809C23.5618 5.28521 18.2766 0 11.7809 0ZM11.7809 22.0892C6.09662 22.0892 1.47261 17.4652 1.47261 11.7809C1.47261 6.09662 6.09662 1.47261 11.7809 1.47261C17.4652 1.47261 22.0892 6.09662 22.0892 11.7809C22.0892 17.4652 17.4652 22.0892 11.7809 22.0892Z"
                      fill="#FC6767"/>
                  <path d="M11.7812 5.4375L11.7813 13.2914" stroke="#FC6767" stroke-width="1.96348"
                        stroke-linecap="round"/>
                  <circle cx="11.7816" cy="17.016" r="1.30899" fill="#FC6767"/>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="23.5618" height="23.5618" fill="white"/>
                  </clipPath>
                </defs>
              </svg>

              <span class="ml-1">Upload your submission bellow ( {{
                  assignment.allowed_files.join(' ,')
                }} format only)</span>
            </div>
            <div class="submission">
              <FilePicker
                  v-if="!assignment_submission._id || userCategory === 'STUDENT'"
                  :ref="`picker`"
                  template="attachment-files"
                  :allowedTypes="findAcceptedFiles()"
                  :multiple="assignment.allowMultipleFilesSubmission"
                  :defaultFiles="assignment_submission.attachments"
                  @addFile="addAssignmentAttachment"
                  @removeFile="removeAssignmentAttachment"
              />
              <div v-else class="col-12">
                <div class="row ma-0" v-for="(attachment, i) in assignment_submission.attachments" :key="i">
                  <div class="pick-file col-12 col-md-8 d-flex px-4">
                    <button
                        @click="downloadAttachment(`${backend_url}/api/assignment_submission/${assignment_submission._id}/attachment/${attachment.src}/view?&token=${$session.get('jwt')}`)"
                        class="file-name">
                      {{ attachment.src }}
                    </button>
                    <!--                    <div class="file-size mx-auto">-->
                    <!--                      26kb-->
                    <!--                    </div>-->
                    <div class="file-type ml-auto">
                      {{ attachment.src.split('.')[attachment.src.split('.').length - 1] }}
                    </div>

                  </div>
                  <div class="col-12 col-md-4 py-0">
                    <button
                        @click="downloadAttachment(`${backend_url}/api/assignment_submission/${assignment_submission._id}/attachment/${attachment.src}/download?token=${$session.get('jwt')}`)"
                        class="download-attachment">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="text-input">
            <Editor
                ref="editor"
                :mode="userCategory === 'STUDENT'? 'edit': 'view'"
                :defaultContent="assignment_submission.details || '<p>Type your answer here</p>'"
            />
          </div>
          <Feedback
              class="mt-4 feedback_container"
              v-if="(assignment_submission.feedback_src && assignment.status === 'RELEASED') || userCategory === 'INSTRUCTOR'"
              :submission_id="assignment_submission._id"
              :feedback_name="assignment_submission.feedback_src"
              :feedbackId="
                    assignment_submission.feedback
                      ? assignment_submission.feedback._id
                      : ''
                  "
              :content="assignment_submission.feedback ? assignment_submission.feedback.content : ''"
              type="assignment"
              :isFileUpload="assignment.submissionMode === 'fileUpload'"
              @feedbackDeleted="assignment_submission.feedback_src = undefined"
              @feedbackUploaded="(name)=>{
                assignment_submission.feedback_src = name
              }"
          />
          <div
              v-if="(assignment_submission.marked && assignment.status === 'RELEASED') || userCategory === 'INSTRUCTOR' "
              class="marks mt-6">
            <div class="label mb-2">Marks:</div>
            <div>
              <div class="cool-box marks total grey-color mt-n1">
                <input
                    class="marks-input"
                    v-model="total_marks"
                    type="text"
                />
                <span>{{ `/${assignment.total_marks}` }}</span>
              </div>
            </div>
          </div>
          <div id="quiz-actions" class=" d-flex mb-12 mt-6">
            <button @click="$router.push(`/${userCategory==='STUDENT' ? 'assignments':'quiz'}`)"
                    class="quiz-action cancel">
              Cancel
            </button>
            <button v-if="userCategory === 'STUDENT' || $route.params.user_name" class="quiz-action" @click="validate">
              {{ assignment_submission._id ? 'Save' : 'Submit' }}
            </button>
            <button v-if="userCategory === 'STUDENT' && assignment_submission._id && !assignment_submission.marked"
                    class="quiz-action delete" @click="
                  set_modal({
                    template: 'action_confirmation',
                    method: {
                      action: 'quiz/delete_assignment_submission',
                      parameters: { id: assignment_submission._id },
                    },
                    title: 'Delete assignment submission',
                    message: 'Are you sure you want to delete this submission?',
                  })
                ">
              Delete
            </button>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {downloadAttachment} from "@/services/global_functions"
import Apis from "@/services/apis";

export default {
  data: () => ({
    assignment: undefined,
    error: "",
    total_marks: 0,
    submissionAttachments: [],
    assignment_submission: {
      assignment: "",
      details: undefined,
      attachments: []
    },
  }),
  watch: {
    error() {
      if (this.error != "")
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: this.error,
          status: "danger",
          uptime: 2000,
        }).then(() => {
          this.error = ""
        })
    },
  },
  components: {
    Editor: () => import("@/components/reusable/Editor"),
    Feedback: () => import("@/components/courses/Feedback"),
    FilePicker: () => import("@/components/reusable/FilePicker"),
  },
  computed: {
    backend_url() {
      return process.env.VUE_APP_api_service_url
    },
    ...mapGetters("user", ["userCategory", "username"]),
    // get the current course
    ...mapGetters("quiz", ["all_quiz"]),
    // format the quiz to fit in the table
    formated_quiz() {
      let formated_quiz = [];
      for (const quiz of this.all_quiz) {
        formated_quiz.push({
          _id: quiz._id,
          name: quiz.name,
          course: quiz.course ? quiz.course.name : "Not yet Attached",
          usage: quiz.usage,
          containedQuestions: quiz.questions.length,
          duration: new Date(quiz.duration * 1000).toISOString().substr(11, 8),
          date: quiz.createdAt.split("T")[0].split("-").reverse().join("/"),
        });
      }
      return formated_quiz;
    },
  },
  methods: {
    downloadAttachment,
    ...mapActions("quiz", ["getAssignment"]),
    ...mapActions("modal", ["set_modal"]),
    async getSubmission() {
      const res = await Apis.get(`assignment_submission/user/${this.userCategory === 'STUDENT' ? this.username : this.$route.params.user_name}/${this.$route.params.id}`, this.assignment_submission)
      if (res.data.data) {
        this.assignment_submission = res.data.data
        this.submissionAttachments = res.data.data.attachments.map(x => {
          return {name: x.src}
        })
        this.total_marks = res.data.data.total_marks
      }

      this.assignment = await this.getAssignment({id: this.$route.params.id})
      if (this.assignment) {
        let date = new Date(this.assignment.dueDate)
        date.setMinutes(date.getUTCMinutes())
        date.setHours(date.getUTCHours())
        this.assignment.dueDate = new Date(date).toISOString()
      }
    },
    validate() {

      if (this.userCategory === 'INSTRUCTOR')
        return this.saveMarks()

      if (this.assignment.submissionMode === 'textInput') {
        if (this.$refs.editor.getHTML() === "<p>Type your answer here</p>")
          return this.error = "Please provide the requested details"
      } else if (this.assignment.submissionMode === 'fileUpload') {
        if (this.submissionAttachments.length === 0)
          return this.error = "Please upload the requested files"
        if (this.submissionAttachments.length > 1 && !this.assignment.allowMultipleFilesSubmission)
          return this.error = "You can only upload one file"
      }
      if (this.assignment_submission._id)
        this.saveAssignmentSubmission()
      else
        this.createAssignmentSubmission()

    },
    addAssignmentAttachment(file) {
      this.submissionAttachments.push(file)
    },
    removeAssignmentAttachment(index) {
      this.submissionAttachments.splice(index, 1)
    },
    findAcceptedFiles() {
      if (!this.assignment.allowed_files)
        return "*"

      let allowed_types = []
      if (this.assignment.allowed_files.includes('image'))
        allowed_types.push('image/*')

      if (this.assignment.allowed_files.includes('Pdf'))
        allowed_types.push('application/pdf')

      if (this.assignment.allowed_files.includes('Word document'))
        allowed_types.push('application/msword')

      if (this.assignment.allowed_files.includes('Powerpoint file'))
        allowed_types.push('application/vnd.ms-powerpoint')

      if (this.assignment.allowed_files.includes('Zip'))
        allowed_types.push('application/zip,application/x-zip,application/x-zip-compressed,application/octet-stream')

      if (this.assignment.allowed_files.includes('image'))
        allowed_types.push('.txt')

      if (this.assignment.allowed_files.includes('Video'))
        allowed_types.push('video/*')

      return allowed_types.join(',')

    },
    createAssignmentSubmission() {
      this.assignment_submission.assignment = this.$route.params.id
      if (this.assignment.submissionMode === 'textInput')
        this.assignment_submission.details = this.$refs.editor.getHTML()
      if (this.submissionAttachments.length)
        this.assignment_submission.attachments = this.submissionAttachments.map(x => {
          return {
            src: x.name
          }
        })
      Apis.create('assignment_submission', this.assignment_submission).then(async (res) => {
        if (res.data.status !== 201) {
          this.error = res.data.message
        } else {
          if (this.submissionAttachments.length) {
            const formData = new FormData()
            let index = 0;
            for (const i in this.submissionAttachments) {
              formData.append("files[" + index + "]", this.submissionAttachments[i]);
              index++
            }
            // set the dialog
            this.$store.dispatch('modal/set_modal', {
              template: 'display_information',
              title: 'Creating assignment submission',
              message: 'uploading attachments'
            })

            await Apis.create(`assignment_submission/${res.data.data._id}/attachment`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: (progressEvent) => {
                this.$store.dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)))
              }
            })
          }
          // this.addAssignment(res.data.data)
          this.$store.dispatch("app_notification/SET_NOTIFICATION", {
            message: "Assignment submission creation succeded",
            status: "success",
            uptime: 5000,
          })
          this.$router.push('/assignments')
        }
      })
    },
    saveMarks() {
      Apis.update('assignment_submission', this.assignment_submission._id, {
        total_marks: this.total_marks,
      }).then(async (res) => {
        if (res.data.status !== 200) {
          this.error = res.data.message
        } else {
          this.$store.dispatch("app_notification/SET_NOTIFICATION", {
            message: "Submission marks were saved successfully",
            status: "success",
            uptime: 5000,
          })
          this.$router.push('/reports/' + this.$route.params.id)
        }
      })
    },
    saveAssignmentSubmission() {
      this.assignment_submission.assignment = this.$route.params.id
      if (this.assignment.submissionMode === 'textInput')
        this.assignment_submission.details = this.$refs.editor.getHTML()
      if (this.submissionAttachments.length)
        this.assignment_submission.attachments = this.submissionAttachments.map(x => {
          return {
            src: x.name
          }
        })
      Apis.update('assignment_submission', this.assignment_submission._id, {
        assignment: this.$route.params.id,
        details: this.assignment_submission.details,
        attachments: this.assignment_submission.attachments
      }).then(async (res) => {
        if (res.data.status !== 200) {
          this.error = res.data.message
        } else {
          if (this.submissionAttachments.filter(x => x.size).length) {
            const formData = new FormData()
            let index = 0;
            for (const i in this.submissionAttachments) {
              formData.append("files[" + index + "]", this.submissionAttachments[i]);
              index++
            }
            // set the dialog
            this.$store.dispatch('modal/set_modal', {
              template: 'display_information',
              title: 'Creating assignment submission',
              message: 'uploading attachments'
            })

            await Apis.create(`assignment_submission/${res.data.data._id}/attachment`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: (progressEvent) => {
                this.$store.dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)))
              }
            })
          }
          // this.addAssignment(res.data.data)
          this.$store.dispatch("app_notification/SET_NOTIFICATION", {
            message: "Assignment submission creation succeded",
            status: "success",
            uptime: 5000,
          })
          this.$router.push('/assignments')
        }
      })
    },
  },
  created() {
    this.getSubmission()
  },
};
</script>

<style lang="scss">
#view-assignments {
  .upper {
    div {
      font-family: Inter;
      font-weight: bold;
      font-size: 20px;
      line-height: 25px;
      color: #3C3C3C;

      &:first-child {
        font-weight: normal;
        font-size: 15px;
        color: #BABABC;
      }

      &:nth-child(3), &:nth-child(4), &:nth-child(5) {
        font-weight: bold;
        font-size: 13px;
        color: #193074;
      }

      &:nth-child(4), &:nth-child(5) {
        color: #1cc83f;
      }
    }
  }

  .lower {
    margin-left: 48px;

    .cool-box {
      padding: 4px 12px;
      text-align: center;
      font-size: 1.3rem;
      //width: 31.02px;
      //height: 21.71px;

      border: 0.775483px solid #717171;
      box-sizing: border-box;
      border-radius: 4.6529px;

      * {
        color: $primary;
      }

      display: inline-flex;
      font-weight: bold;
      // border-radius: 13px;
      &.marks {
        // border: 2px solid #cbcbcb;
        box-shadow: 0px 3px 6px rgb(0, 0, 0, 0.16);
      }

      &.total {
        border-radius: 11px;
      }

      p {
        margin: 0;
      }
    }

    .description {
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 26px;
      /* or 175% */
      max-width: 485px;;
      margin-top: 18px;
      color: #3C3C3C;
    }

    .attachment-container {
      max-width: 580px;
      margin-top: 40px;
    }

    .pick-file {
      width: 473.85px;
      height: 28.8px;

      background: rgba(25, 48, 116, 0.1);
      border-radius: 3.92697px;

      .file-type, .file-size {
        margin-top: -11px
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

    .file-picked {
      min-width: 100px;
      width: fit-content;
      max-width: 50%;
      height: 32px;

      background: #FFFFFF !important;
      border: 1px solid #BABABC;
      box-sizing: border-box;
      box-shadow: 0px 4px 4px rgba(25, 48, 116, 0.25);
      border-radius: 7px;

      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 11px;
      line-height: 26px;
      /* or 328% */

      display: flex;
      align-items: center;
      justify-content: center;

      color: #3C3C3C;
      margin-bottom: 9px;
    }

    .download-attachment {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 13.0899px;
      line-height: 34px;
      /* or 262% */

      display: flex;
      align-items: center;
      text-align: center;

      color: #193074;
    }

    .quiz-action {
      max-width: 237.16px;;
      width: 100%;
      min-height: 42px;
      border-radius: 6.23641px;
      background: #193074;
      margin-right: 28px;
      color: white;
      padding: 12px;

      &.cancel {
        background: #BABABC;
        max-width: 146px;
      }

      &.delete {
        background: #FC6767;
        max-width: 146px;
      }
    }

    .feedback_container {
      max-width: 580px;
    }

    .text-input {
      max-width: 580px;
      min-height: 134px;
      margin-top: 40px;
      height: fit-content;
      padding: 12px;
      border: 1.54684px solid #626262;
      background-color: white;

      .ProseMirror {

        min-height: 70px;
      }
    }
  }
}

/* Portrait phones and smaller */
@media (max-width: 700px) {
  #view-assignments {
    .lower {
      margin-left: 24px;
    }
  }
}
</style>


