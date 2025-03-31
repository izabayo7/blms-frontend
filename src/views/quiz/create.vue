<template>
  <div id="create-quiz">
    <div id="quiz-info">
      <div class="label">Assesment creation wizzard</div>
      <div class="input-group assesment_type">
        <label>Select assesment type</label>
        <div class="d-flex">
          <button @click="assessment_type = 'quiz'" :class="{active:assessment_type === 'quiz'}">Quiz</button>
          <button @click="assessment_type = 'assignment'" :class="{active:assessment_type === 'assignment'}">
            Assignment
          </button>
        </div>
      </div>
      <div class="input-group assesment_type">
        <label>Title</label>
        <input v-if="assessment_type === 'assignment'" v-model="assignment.title" class="quiz-title" type="text">
        <input v-else v-model="title" class="quiz-title" type="text">
      </div>
      <div v-if="assessment_type === 'assignment'" class="input-group my-margin">
        <select-ui
            class="bold-border"
            name="role"
            :options="['course','chapter']"
            id="target_type"
            label="Select assignment target type"
            @input="
            (e) => {
              assignment.target.type = e;
            }
          "
        />
      </div>
      <div v-if="assessment_type === 'assignment'" class="input-group my-margin">
        <select-ui
            class="bold-border"
            name="role"
            :options="courseNames"
            id="course"
            label="Select course"
            @input="
            (e) => {
              selected_course = e;
            }
          "
        />
      </div>
      <div v-if="assessment_type === 'assignment' && assignment.target.type === 'chapter'"
           class="input-group my-margin">
        <select-ui
            label="Select chapter"
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
      <div v-if="assessment_type === 'assignment'" class="flex d-block d-md-flex">
        <div class="input-group">
          <label for="assignment-marks">Total-marks</label>
          <input id="assignment-marks" v-model="assignment.total_marks" type="number">
        </div>
        <div class="input-group ml-auto">
          <label for="assignment-pass-marks">Pass-marks (%)</label>
          <input id="assignment-pass-marks" v-model="assignment.passMarks" type="number">
        </div>
      </div>
      <div v-if="assessment_type === 'assignment'" class="input-group assesment_type">
        <label for="assessment-time">Expiration date & time</label>
        <input v-model="assignment.dueDate" id="assessment-time" type="datetime-local">
      </div>
      <div v-if="assessment_type === 'quiz'" class="input-group">
        <label>Instructions</label>
        <div class="quiz-instructions">
          <Editor
              v-if="showEditor"
              ref="editor"
              mode="edit"
              defaultContent="<ol><li><p>Write your custom instructions</p></li></ol>"
          />
        </div>
      </div>
      <div v-else class="input-group">
        <label class="assessment-label">Details (optional)</label>
        <div class="quiz-instructions">
          <Editor
              v-if="showEditor"
              ref="editor"
              mode="edit"
              defaultContent="<p>Type in your assignments information</p>"
          />
        </div>
      </div>
      <div v-if="assessment_type === 'assignment'" class="input-group">
        <label class="assessment-label">Upload a file with assigment tasks (optional)</label>
        <div class="mb-6 pa-0">
          <div>
            <FilePicker
                :ref="`picker`"
                template="attachment-files"
                :multiple="true"
                @addFile="addAssignmentAttachment"
                @removeFile="removeAssignmentAttachment"
            />
          </div>
        </div>
      </div>
      <div v-if="assessment_type === 'assignment'" class="input-group mb-4 d-md-flex align-center">
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
      <div v-if="assessment_type === 'assignment' && assignment.submissionMode === 'fileUpload'"
           class="input-group mb-4">
        <div class="type align-center d-flex hint">
          <checkbox
              @check_it="assignment.allowMultipleFilesSubmission = !assignment.allowMultipleFilesSubmission"
              :check="assignment.allowMultipleFilesSubmission"
          />
          allow student to submit multiple files
        </div>
      </div>
      <div v-if="assessment_type === 'assignment' && assignment.submissionMode === 'fileUpload'" class="input-group">
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
      <div v-if="assessment_type === 'quiz'" class="flex d-block d-md-flex">
        <div class="input-group">
          <label for="quiz-duration">Duration</label>
          <div class="duration-input" id="quiz-duration">
            <input class="inner-input" v-model="hours" type="number"> hrs : <input v-model="minutes" class="inner-input"
                                                                                   type="number"> mins
          </div>
        </div>
        <div class="input-group ml-auto">
          <label for="quiz-pass-marks">Pass-marks (%)</label>
          <input id="quiz-pass-marks" v-model="passMarks" type="number">
        </div>
      </div>
    </div>
    <div v-if="assessment_type === 'quiz'" id="quiz-questions">
      <div v-for="(question, i) in questions" :key="question.name" class="question mb-5">
        <div class="question-number">{{ i + 1 }}</div>
        <div class="question-content">
          <div class="row">
            <div class="col-12 col-md-6">
              <select-ui
                  label="Select question type"
                  name="question-type"
                  id="question-type"
                  class="mb-15px"
                  :options="questions_types"
                  @input="
                (e) => {
                  question.type = e;
                  handleTypeChange(i);
                }
              "
              />
            </div>
            <div class="col-12 col-md-2">
              <div class="required mb-15px d-flex">
                <div class="text">Required</div>
                <switch-ui :active="question.required"
                           @input="
                (e) => {
                  question.required = e;
                }
              "
                />
              </div>
            </div>
            <div class="col-12 col-md-3 text-md-right pt-0">
              <div class="marks mb-15px ml-auto">
                <div class="input-group">
                  <label>Marks</label>
                  <input class="question-marks" v-model="question.marks" type="number">
                </div>
              </div>
            </div>
            <div class="col-12 col-md-1">
              <div v-if="questions.length > 1" class="delete-question mb-15px">
                <svg @click="removeQuestion(i)" class="cursor-pointer" width="28" height="28" viewBox="0 0 28 28"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0)">
                    <path
                        d="M7.0026 22.1657C7.0026 23.449 8.0526 24.499 9.33594 24.499H18.6693C19.9526 24.499 21.0026 23.449 21.0026 22.1657V8.16569H7.0026V22.1657ZM22.1693 4.66569H18.0859L16.9193 3.49902H11.0859L9.91927 4.66569H5.83594V6.99902H22.1693V4.66569Z"
                        fill="#FF0808"/>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="28" height="28" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

              </div>
            </div>
          </div>
          <div class="question-details d-block">
            <div class="input-group">
              <label>Question text</label>
              <textarea
                  v-model="question.details"
                  placeholder="Type your question here ..."
                  class="kurious--textarea mb-4 customScroll"
                  rows="8"
              ></textarea>
            </div>
          </div>
          <div v-if="question.type.includes('text')" class="text-select">
            <div
                v-for="(option, k) in question.options.choices"
                :key="k"
                class="option d-block d-md-flex">
              <div class="details">
                              <textarea
                                  :placeholder="`option ${k+1}`"
                                  v-model="option.text"
                                  class="kurious--textarea mb-4 customScroll"
                                  rows="8"
                              ></textarea>
              </div>
              <div class="status mx-auto">
                <label>Correct</label>
                <!--                <transition name="fade" >-->
                <svg v-if="option.right" @click="handleOptionClick(i, k)" width="18" height="20" viewBox="0 0 18 20"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.613894" y="5.7721" width="13.5057" height="13.5057" rx="1.84168" stroke="#828282"
                        stroke-width="1.22779"/>
                  <path d="M3.68555 10.0695L7.36891 16.2084L16.5773 2.08887" stroke="#828282" stroke-width="2.45558"
                        stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <svg v-else @click="handleOptionClick(i, k)" width="15" height="15" viewBox="0 0 15 15" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.613894" y="0.72034" width="13.5057" height="13.5057" rx="1.84168" stroke="#828282"
                        stroke-width="1.22779"/>
                </svg>

                <!--                </transition>-->
              </div>
              <button v-if="question.options.choices.length > 2" class="delete" @click="removeOption(i, k)">Delete
                option
              </button>
            </div>
            <button class="add-option" @click="addOption(i)">Add option</button>
          </div>
          <div v-if="question.type.includes('image')" class="image-select">
            <label>Maximum 4 images ( 1 Megabyte maximum size for each)</label>
            <FilePicker
                :ref="`picker${i}`"
                :boundIndex="i"
                template="quiz-files"
                hint="Click on an image to designate it as the correct  choice"
                :allowedTypes="['image']"
                :multiple="true"
                @addFile="addPicture"
                @removeFile="removePicture"
                @fileClicked="handleOptionClick"
            />
          </div>
          <div v-if="question.type == 'File upload'" class="file-upload">
            <label>Max file size 2 MB</label>
            <div class="allowed-files">
              <div class="type">
                <checkbox
                    @check_it="fileTypeClicked('Pdf', i)"
                    :check="question.allowed_files.includes('Pdf')"
                />
                Pdf
              </div>
              <div class="type">
                <checkbox
                    @check_it="fileTypeClicked('Word document', i)"
                    :check="question.allowed_files.includes('Word document')"
                />
                Word document
              </div>
              <div class="type">
                <checkbox
                    @check_it="fileTypeClicked('Powerpoint file', i)"
                    :check="question.allowed_files.includes('Powerpoint file')"
                />
                Powerpoint file
              </div>
              <div class="type">
                <checkbox
                    @check_it="fileTypeClicked('text', i)"
                    :check="question.allowed_files.includes('text')"
                />
                text
              </div>
              <div class="type">
                <checkbox
                    @check_it="fileTypeClicked('Zip', i)"
                    :check="question.allowed_files.includes('Zip')"
                />
                Zip
              </div>
              <div class="type">
                <checkbox
                    @check_it="fileTypeClicked('image', i)"
                    :check="question.allowed_files.includes('image')"
                />
                image
              </div>
              <div class="type">
                <checkbox
                    @check_it="fileTypeClicked('Video', i)"
                    :check="question.allowed_files.includes('Video')"
                />
                Video
              </div>
            </div>
            <!--            <checkbox-->
            <!--                :disabled="false"-->
            <!--                @check_it="toogleIsAdminStatus"-->
            <!--                v-model=""-->
            <!--            />-->
          </div>

        </div>
      </div>
    </div>
    <button @click="addQuestion()" class="quiz-action full mt-4" v-if="questions.length && assessment_type === 'quiz'">
      Add question
    </button>
    <div id="quiz-actions" class=" d-flex mb-12 mt-6">
      <button class="quiz-action cancel" @click="
                      set_modal({
                        template: 'action_confirmation',
                        title: 'Cancel quiz',
                        message: 'Are you sure you want to Cancel this quiz?',
                      })
">Cancel
      </button>
      <button class="quiz-action" v-if="!questions.length && assessment_type === 'quiz'" @click="recreate">Add
        questions
      </button>
      <button class="quiz-action" v-else @click="validate">Save {{ assessment_type }}</button>
      <!--      <button class="quiz-action success" v-if="assessment_type === 'assignment'" @click="validate">Publish assignment-->
      <!--      </button>-->
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Apis from "@/services/apis";

export default {
  name: "CreateQuiz",
  components: {
    checkbox: () => import("@/components/reusable/ui/Checkbox"),
    FilePicker: () => import("@/components/reusable/FilePicker"),
    Editor: () => import("@/components/reusable/Editor"),
    SelectUi: () => import("@/components/reusable/ui/select-ui"),
    SwitchUi: () => import("@/components/reusable/ui/switcher")
  },
  data: () => ({
    questions_types: [
      "Open ended",
      "Single text select",
      "Multiple text select",
      "Single image select",
      "Multiple image select",
      "File upload",
    ],
    allowed_submission_file_types: [],
    pictures: [[], []],
    assessment_type: "quiz",
    selected_chapter: "",
    hours: 0,
    selected_course: "",
    minutes: 0,
    showEditor: true,
    questions: [],
    error: "",
    title: "",
    passMarks: 0,
    assignment: {
      title: "",
      target: {
        type: "course",
        id: "",
      },
      dueDate: "",
      details: "",
      submissionMode: "textInput",
      allowMultipleFilesSubmission: false,
      attachments: [],
      passMarks: 50,
      total_marks: 100,
      allowed_files: []
    },
    assignmentAttachments: []
  }),
  watch: {
    assessment_type() {
      this.showEditor = false
      setTimeout(() => {
        this.showEditor = true
      }, 500)
    },
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
    if (this.$route.query.assignment)
      this.assessment_type = 'assignment'
  },
  methods: {
    ...mapActions("courses", ["getCourses"]),
    fileTypeClicked(type, index) {
      if (index === -1) {
        if (this.allowed_submission_file_types.includes(type))
          this.allowed_submission_file_types.splice(this.allowed_submission_file_types.indexOf(type), 1)
        else
          this.allowed_submission_file_types.push(type)
      } else {
        if (this.questions[index].allowed_files.includes(type)) {
          this.questions[index].allowed_files.splice(this.questions[index].allowed_files.indexOf(type), 1)
        } else {
          this.questions[index].allowed_files.push(type)
        }
      }
    },
    ...mapActions("modal", ["set_modal"]),
    validate() {
      if (this.assessment_type === 'quiz') {
        if (this.title == "")
          return this.error = "Title is required"

        if (this.title.length < 3)
          return this.error = "Title is too short"

        if (this.hours == 0 && this.minutes == 0)
          return this.error = "Duration is required"

        if (this.passMarks == 0)
          return this.error = "PassMarks is required"

        for (const i in this.questions) {
          if (this.questions[i].details == "")
            return this.error = `Question ${parseInt(i) + 1} must have question text`

          if (this.questions[i].details.length < 5)
            return this.error = `Question ${parseInt(i) + 1} question text too short`

          if (this.questions[i].type == "Select question type")
            return this.error = `Question ${parseInt(i) + 1} type is required`

          if (this.questions[i].marks == "")
            return this.error = `Question ${parseInt(i) + 1} marks are required`

          if (this.questions[i].type.includes('select')) {
            let right_choice_found = false;

            if (this.questions[i].type.includes('image')) {
              if (this.questions[i].options.choices.length < 2)
                return this.error = `Question ${parseInt(i) + 1}, must have atleast options,pick files`
            }

            if (this.questions[i].type.includes('upload')) {
              if (!this.questions[i].allowed_files.length)
                return this.error = `Question ${parseInt(i) + 1}, must have atleast one file type allowed`
            }

            for (const k in this.questions[i].options.choices) {

              if (this.questions[i].options.choices[k].right)
                right_choice_found = true;

              if (this.questions[i].type.includes('text')) {
                if (this.questions[i].options.choices[k].text == "")
                  return this.error = `Question ${parseInt(i) + 1}, option ${parseInt(k) + 1} text is required`
              }
            }
            if (!right_choice_found)
              return this.error = `Question ${parseInt(i) + 1} must have a right choice`
          }


        }

        this.saveQuiz();
      } else {
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
      }
    },
    ...mapActions("quiz", ["create_quiz"]),
    addPicture(file, boundIndex) {
      this.pictures[boundIndex].push(file);
      this.questions[boundIndex].options.choices.push({
        src: file.name,
        right: false,
      });
    },
    addAssignmentAttachment(file) {
      this.assignmentAttachments.push(file)
    },
    removeAssignmentAttachment(index) {
      this.assignmentAttachments.splice(index, 1)
    },
    removePicture(index, boundIndex) {
      this.pictures[boundIndex].splice(index, 1);
      this.questions[boundIndex].options.choices.splice(index, 1);
    },
    recreate() {
      this.questions = [
        {
          type: "Open ended",
          marks: 0,
          required: false,
          details: "",
          options: {
            choices: [],
          },
        },
      ];
      this.pictures = [[], []];
    },
    handleOptionClick(questionIndex, optionIndex) {
      let rightChoices = [];

      for (const k in this.questions[questionIndex].options.choices) {
        if (k == optionIndex) {
          this.questions[questionIndex].options.choices[k].right = !this
              .questions[questionIndex].options.choices[k].right;
        } else if (this.questions[questionIndex].type.includes("Single")) {
          this.questions[questionIndex].options.choices[k].right = false;
        }
        if (this.questions[questionIndex].options.choices[k].right) {
          rightChoices.push(k);
        }
      }
      if (this.questions[questionIndex].type.includes("image")) {
        this.$refs[`picker${questionIndex}`][0].showRightFiles(
            questionIndex,
            rightChoices
        );
      }
    },
    handleTypeChange(index) {
      if (this.questions[index].type.includes("text")) {
        this.questions[index].options = {
          choices: [
            {text: "", right: false},
            {text: "", right: false},
          ],
        };
      } else if (
          this.questions[index].type.includes("image") &&
          this.questions[index].type.includes("select")
      ) {
        this.questions[index].options = {
          choices: [],
        };
      }
      if (this.questions[index].type == "File upload") {
        this.questions[index].allowed_files = []
      }
      this.pictures[index] = [];
    },
    addQuestion() {
      this.questions.push({
        type: "Open ended",
        marks: 0,
        details: "",
        options: {
          choices: [],
        },
      });
      this.pictures.push([]);
    },
    addOption(index) {
      this.questions[index].options.choices.push({text: "", right: false});
    },
    removeOption(index, index1) {
      this.questions[index].options.choices.splice(index1, 1);
    },
    removeQuestion(index) {
      this.questions.splice(index, 1);
      this.pictures.splice(index, 1);
    },
    calculateSeconds() {
      return parseInt(this.minutes) * 60 + parseInt(this.hours) * 3600;
    },
    async saveQuiz() {
      let questions = [];
      for (const index in this.questions) {
        this.questions[index].type = this.questions[index].type
            .toLowerCase()
            .split(" ")
            .join("_");
        if (!this.questions[index].type.includes("select")) {
          this.questions[index].options = undefined;
        }
        questions.push(this.questions[index]);
      }

      const editorContent = this.$refs.editor.getHTML();

      this.create_quiz({
        quiz: {
          name: this.title,
          instructions:
              editorContent ==
              `<ol><li><p>Write your custom instructions</p></li></ol>`
                  ? undefined
                  : editorContent,
          duration: this.calculateSeconds(),
          user: this.$store.state.user.user.user_name,
          questions: questions,
          passMarks: this.passMarks
        },
        pictures: this.pictures,
      }).then(() => {
        this.$router.push("/quiz");
      }).catch((e) => {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: e.message,
          status: "danger",
          uptime: 5000,
        }).then(() => {
          this.error = ""
        })
      })
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
