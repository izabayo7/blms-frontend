<template>
  <div id="create-quiz">
    <div v-if="assignment" id="quiz-info">
      <div class="label">Assignment creation wizzard</div>
      <div class="input-group assesment_type">
        <label>Title</label>
        <input v-model="assignment.title" class="quiz-title" type="text">
      </div>
      <div class="input-group my-margin">
        <select-ui
            class="bold-border"
            name="role"
            :options="['course','chapter']"
            id="target_type"
            :label="assignment.target.type"
            @input="
            (e) => {
              assignment.target.type = e;
            }
          "
        />
      </div>
      <div class="input-group my-margin">
        <select-ui
            class="bold-border"
            name="role"
            :options="courseNames"
            id="course"
            :label="`${selected_course === '' ? 'Select course' : selected_course}`"
            @input="
            (e) => {
              selected_course = e;
            }
          "
        />
      </div>
      <div v-if="assignment.target.type === 'chapter'"
           class="input-group my-margin">
        <select-ui
            :label="`${selected_chapter === '' ? 'Select chapter' : selected_chapter}`"
            class="bold-border"
            id="chapter"
            name="role"
            :options="chapterNames"
            @input="
            (e) => {
              selected_chapter = e;
            }
          "
        />
      </div>
      <div class="flex d-block d-md-flex">
        <div class="input-group">
          <label for="assignment-marks">Total-marks</label>
          <input id="assignment-marks" v-model="assignment.total_marks" type="number">
        </div>
        <div class="input-group ml-auto">
          <label for="assignment-pass-marks">Pass-marks (%)</label>
          <input id="assignment-pass-marks" v-model="assignment.passMarks" type="number">
        </div>
      </div>
      <div class="input-group assesment_type">
        <label for="assessment-time">Expiration date & time</label>
        <input v-model="assignment.dueDate" id="assessment-time" type="datetime-local">
      </div>
      <div class="input-group">
        <label class="assessment-label">Details (optional)</label>
        <div class="quiz-instructions">
          <Editor
              v-if="showEditor"
              ref="editor"
              mode="edit"
              :defaultContent="`${ assignment.details || '<p>Type in your assignments information</p>'}`"
          />
        </div>
      </div>
      <div class="input-group">
        <label class="assessment-label">Upload a file with assigment tasks (optional)</label>
        <div class="mb-6 pa-0">
          <div>
            <FilePicker
                :ref="`picker`"
                template="attachment-files"
                :multiple="true"
                :defaultFiles="assignment.attachments"
                @addFile="addAssignmentAttachment"
                @removeFile="removeAssignmentAttachment"
            />
          </div>
        </div>
      </div>
      <div class="input-group mb-4 d-md-flex align-center">
        <label for="assessment-time">Submission mode:</label>
        <div class="type align-center d-flex align-center hint ml-md-4">
          <input type="radio" v-model="assignment.submissionMode" name="submission_mode" class="mb-0 mr-2"
                 value='textInput'/>
          Text input
        </div>
        <div class="type align-center d-flex hint ml-md-4">
          <input type="radio" v-model="assignment.submissionMode" class="mb-0 mr-2" name="submission_mode"
                 value='fileUpload'/>
          File upload
        </div>
      </div>
      <div v-if="assignment.submissionMode === 'fileUpload'"
           class="input-group mb-4">
        <div class="type align-center d-flex hint">
          <checkbox
              @check_it="assignment.allowMultipleFilesSubmission = !assignment.allowMultipleFilesSubmission"
              :check="assignment.allowMultipleFilesSubmission"
          />
          allow student to submit multiple files
        </div>
      </div>
      <div v-if="assignment.submissionMode === 'fileUpload'" class="input-group">
        <div class="file-upload">
          <label>Choose file types that students can upload</label>
          <div class="allowed-files d-md-flex flex-wrap align-center">
            <div class="type">
              <checkbox
                  @check_it="fileTypeClicked('Pdf', -1)"
                  :check="allowed_submission_file_types.includes('Pdf')"
              />
              Pdf
            </div>
            <div class="type ml-md-4">
              <checkbox
                  @check_it="fileTypeClicked('Word document', -1)"
                  :check="allowed_submission_file_types.includes('Word document')"
              />
              Word document
            </div>
            <div class="type ml-md-4">
              <checkbox
                  @check_it="fileTypeClicked('Powerpoint file', -1)"
                  :check="allowed_submission_file_types.includes('Powerpoint file')"
              />
              Powerpoint file
            </div>
            <div class="type ml-md-4">
              <checkbox
                  @check_it="fileTypeClicked('text', -1)"
                  :check="allowed_submission_file_types.includes('text')"
              />
              text
            </div>
            <div class="type ml-md-4">
              <checkbox
                  @check_it="fileTypeClicked('Zip', -1)"
                  :check="allowed_submission_file_types.includes('Zip')"
              />
              Zip
            </div>
            <div class="type ml-md-4">
              <checkbox
                  @check_it="fileTypeClicked('image', -1)"
                  :check="allowed_submission_file_types.includes('image')"
              />
              image
            </div>
            <div class="type ml-md-4">
              <checkbox
                  @check_it="fileTypeClicked('Video', -1)"
                  :check="allowed_submission_file_types.includes('Video')"
              />
              Video
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="quiz-actions" class=" d-flex mb-12 mt-6">
      <button class="quiz-action cancel" @click="
                      set_modal({
                        template: 'action_confirmation',
                        title: 'Cancel quiz',
                        message: 'Are you sure you want to Cancel this assignments?',
                      })
">Cancel
      </button>
      <button class="quiz-action" @click="validate">Save assignment</button>
      <!--      <button class="quiz-action success" v-if="assessment_type === 'assignment'" @click="validate">Publish assignment-->
      <!--      </button>-->
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import Apis from "@/services/apis";

export default {
  name: "CreateAssignment",
  components: {
    checkbox: () => import("@/components/reusable/ui/Checkbox"),
    FilePicker: () => import("@/components/reusable/FilePicker"),
    Editor: () => import("@/components/reusable/Editor"),
    SelectUi: () => import("@/components/reusable/ui/select-ui"),
  },
  data: () => ({
    allowed_submission_file_types: [],
    selected_chapter: "",
    selected_course: "",
    showEditor: true,
    error: "",
    assignment: undefined,
    assignmentAttachments: []
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
  computed: {
    ...mapGetters("courses", ["courses", "loaded"]),
    courseNames() {
      let res = [];
      for (const i in this.courses) {
        res.push(this.courses[i].name);
      }
      return res;
    },
    chapterNames() {
      let res = [];
      for (const i in this.courses) {
        if (this.courses[i].name === this.selected_course) {
          for (const k in this.courses[i].chapters) {
            res.push(this.courses[i].chapters[k].name);
          }
        }
      }
      return res;
    },
  },
  created() {
    this.getCourses(!this.loaded);
    this.computeAssignment();
  },
  methods: {
    ...mapActions("courses", ["getCourses"]),
    ...mapActions("modal", ["set_modal"]),
    ...mapActions("quiz", ["getAssignment"]),
    ...mapMutations("quiz", ["addAssignment"]),
    async computeAssignment() {
      const res = await this.getAssignment({id: this.$route.params.id})
      this.assignment = {
        title: res.title,
        target: {
          type: res.target.type,
          id: res.target.id,
        },
        dueDate: res.dueDate.substring(0,16),
        details: res.details,
        submissionMode: res.submissionMode,
        allowMultipleFilesSubmission: res.allowMultipleFilesSubmission,
        attachments: res.attachments,
        passMarks: res.passMarks,
        total_marks: res.total_marks,
        allowed_files: res.allowed_files || []
      }
      this.allowed_submission_file_types = res.allowed_files || []
      this.selected_course = res.target.course.name
      if (res.target.type === 'chapter')
        this.selected_chapter = res.target.chapter.name
      this.assignmentAttachments = res.attachments.map(x => {
        return {name: x.src}
      })
    },
    validate() {
      if (this.assignment.title === "")
        return this.error = "Title is required"

      if (this.assignment.title.length < 3)
        return this.error = "Title is too short"
      if (this.assignment.target.type === 'Select assignment target type')
        return this.error = "Target type is required"
      if (this.selected_course === 'Select course')
        return this.error = "Course is required"
      if (this.assignment.target.type === 'chapter' && this.selected_chapter === 'Select chapter')
        return this.error = "Chapter is required"
      if (this.assignment.total_marks < 1)
        return this.error = "Invalid total marks"
      if (this.assignment.passMarks < 1)
        return this.error = "Invalid pass marks"
      if (this.assignment.dueDate === "")
        return this.error = "dueDate is required"
      if (this.assignment.submissionMode === 'fileUpload' && !this.allowed_submission_file_types.length)
        return this.error = "Please select allowed submission file types"
      this.saveAssignment()

    },
    addAssignmentAttachment(file) {
      this.assignmentAttachments.push(file)
    },
    removeAssignmentAttachment(index) {
      this.assignmentAttachments.splice(index, 1)
    },
    async saveAssignment() {

      const editorContent = this.$refs.editor.getHTML();
      if (editorContent !== '<p>Type in your assignments information</p>')
        this.assignment.details = editorContent
      if (this.assignmentAttachments.length)
        this.assignment.attachments = this.assignmentAttachments.map(x => {
          return {
            src: x.name
          }
        })
      this.assignment.allowed_files = this.allowed_submission_file_types
      if (this.assignment.details === "")
        this.assignment.details = undefined

      for (const i in this.courses) {
        if (this.courses[i].name == this.selected_course) {
          if (this.assignment.target.type === 'course')
            this.assignment.target.id = this.courses[i]._id
          else
            for (const k in this.courses[i].chapters) {
              if (this.courses[i].chapters[k].name == this.selected_chapter) {
                this.assignment.target.id = this.courses[i].chapters[k]._id
              }
            }
        }
      }

      Apis.create('assignments', this.assignment).then(async (res) => {
        if (res.data.status !== 201) {
          this.$store.dispatch("app_notification/SET_NOTIFICATION", {
            message: res.data.message,
            status: "danger",
            uptime: 5000,
          }).then(() => {
            this.error = ""
          })
        } else {
          if (this.assignmentAttachments.length) {
            const formData = new FormData()
            let index = 0;
            for (const i in this.assignmentAttachments) {
              formData.append("files[" + index + "]", this.assignmentAttachments[i]);
              index++
            }
            // set the dialog
            this.$store.dispatch('modal/set_modal', {
              template: 'display_information',
              title: 'Creating assignment',
              message: 'uploading attachments'
            })

            await Apis.create(`assignments/${res.data.data._id}/attachment`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              },
              onUploadProgress: (progressEvent) => {
                this.$store.dispatch('modal/set_progress', parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100)))
              }
            })
          }
          this.addAssignment(res.data.data)
          this.$store.dispatch("app_notification/SET_NOTIFICATION", {
            message: "Assignment creation succeded",
            status: "success",
            uptime: 5000,
          })
          this.$router.push('/quiz')
        }
      })
    },
  }
};
</script>
<style lang="scss">
@import '../../assets/sass/imports/createQuiz';
</style>
