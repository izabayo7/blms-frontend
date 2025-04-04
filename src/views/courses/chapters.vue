<template>
  <v-container v-if="course !== undefined" fluid>
    <v-row v-if="activeChapter > -1">
      <v-col class="col-12 col-md-3 px-0 text-left">
        <v-badge
            v-for="(chapter, i) in course.chapters"
            :key="i"
            overlap
            color="transparent"
            class="d-block mb-4 chapter-badges"
        >
          <v-btn
              v-if="course.chapters.length > 1"
              fab
              color="error"
              class="ml-n2 mt-n2 remove--button"
              slot="badge"
              @click="
              set_modal({
                template: 'action_confirmation',
                method: {
                  action: 'courses/delete_chapter',
                  parameters: { id: chapter._id }
                },
                title: 'Delete Chapter',
                message: 'Are you sure you want to delete this chapter?',
              }).then(() => {
                updateActiveChapter();
              })
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path fill="none" d="M0 0h24v24H0z"/>
              <path
                  d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
                  fill="rgba(255,255,255,1)"/>
            </svg>
          </v-btn>

          <button
              class="chapter-button"
              :class="`${
              activeChapter === i ? 'white--text active-chapter' : ''
            } ${limit ? course.chapters[i]._id > limit ? 'disabled' : '' : ''}`"
              @click="activeChapter = i"
          >
            {{ course.chapters[i].name | trimString(20) }}
          </button>
        </v-badge>
        <v-btn :disabled="course.chapters.length === 1 && !uploadedCourse && $route.path === '/courses/new'" width="90%"
               class="py-6" @click="addNewChapter">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"/>
          </svg>
          New Chapter
        </v-btn>
      </v-col>
      <v-col class="col-12 col-md-9 px-0">
        <v-form>
          <div class="class-chapters">
            <v-row>
              <v-col class="col-12">
                <v-stepper color="#fff" v-model="stepCounter" vertical>
                  <v-stepper-step :complete="stepCounter > 1" step="1" editable
                  >Chapter {{ activeChapter + 1 }} -name & description
                  </v-stepper-step>

                  <v-stepper-content step="1">
                    <v-card class="mb-12 pa-6 elevation-0" height="300px">
                      <h4 class="#f8f8f8--text">Name</h4>
                      <input
                          v-model="course.chapters[activeChapter].name"
                          type="text"
                          class="course_input"
                          placeholder="Enter chapter name..."
                      />
                      <h4>Description</h4>
                      <textarea
                          v-model="course.chapters[activeChapter].description"
                          class="mt-1 kurious--textarea mb-4"
                          rows="5"
                          placeholder="Enter Chapter Description"
                      ></textarea>
                    </v-card>
                    <div class="d-flex">
                      <v-btn class="primary-button"
                             @click="validate(course.chapters[activeChapter]._id ? 'update' : 'create', true).then((res)=>{
                             if(res == 'Passed')
                              stepCounter = 2;
                           })"
                      >Continue
                      </v-btn>
                      <div class="d-flex">
                        <v-btn class="primary-button ml-4" :class="{disabled:course.chapters[activeChapter].status}"
                               @click="changeLimit"
                        >{{ course.chapters[activeChapter].status ? 'Make' : 'Remove' }} limit
                        </v-btn>
                        <div class="hint px-4">If you limit students won't be able to view chapters below this</div>
                      </div>
                    </div>
                  </v-stepper-content>

                  <v-stepper-step :complete="stepCounter > 2" step="2" editable
                  >{{
                      `Chapter ${activeChapter + 1} - ${
                          action == "update" ? action : "add"
                      } video`
                    }}
                  </v-stepper-step>

                  <v-stepper-content step="2">
                    <v-card class="mb-12 pa-6 elevation-0" height="auto">
                      <v-row>
                        <v-col
                            v-if="course.chapters[activeChapter].uploaded_video"
                            class="col-12"
                            id="video"
                        >
                          <vue-plyr>
                            <video
                                :src="`${
                                course.chapters[activeChapter].uploaded_video
                              }?token=${$session.get('jwt')}`"
                            ></video>
                          </vue-plyr>
                        </v-col>
                        <v-col class="col-12">
                          <file-picker
                              v-if="this.mode != ''"
                              :ref="`picker${activeChapter}2`"
                              :boundIndex="activeChapter"
                              allowedTypes="video/*"
                              :multiple="false"
                              @addFile="updateVideo"
                              @removeFile="removeVideo"
                          />
                        </v-col>
                      </v-row>
                    </v-card>
                    <div class="d-flex">
                      <v-btn class="primary-button" @click="stepCounter = 3"
                      >Continue
                      </v-btn>
                      <v-btn v-if="course.chapters[activeChapter].uploaded_video" class="primary-button danger ml-4"
                             @click.prevent="
                                    set_modal({
                                      template: 'action_confirmation',
                                      method: {
                                        action: 'courses/deleteVideo',
                                      },
                                      title: 'Delete video',
                                      message:
                                        'Are you sure you want to delete this chapter\'s video?',
                                    })
                                  "
                      >Remove video
                      </v-btn>
                    </div>
                  </v-stepper-content>

                  <v-stepper-step :complete="stepCounter > 3" step="3" editable
                  >{{
                      `Chapter ${activeChapter + 1} - ${
                          action === "update" ? action : "add"
                      } content`
                    }}
                  </v-stepper-step>

                  <v-stepper-content step="3">
                    <v-card class="mb-12 elevation-0">
                      <v-row class="ma-0">
                        <v-col class="col-12 actions-container">
                          <v-row class="ma-0">
                            <v-col
                                :class="`col-6 text-center ${
                                mode == 'edit' ? 'active-mode white--text' : ''
                              }`"
                                @click="switchMode('edit')"
                            >Edit mode
                            </v-col>
                            <v-col
                                :class="`col-6 text-center ${
                                mode == 'preview'
                                  ? 'active-mode white--text'
                                  : ''
                              }`"
                                @click="switchMode('preview')"
                            >View mode
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col v-if="mode === 'preview'" class="col-12 title"
                        >{{ course.chapters[activeChapter].name }}
                        </v-col>
                        <v-col class="col-12">
                          <editor
                              v-if="mode !== ''"
                              ref="editor"
                              :mode="`${mode === 'edit' ? mode : 'preview'}`"
                              @addmathlive="addSpecialInput"
                              :defaultContent="
                              course.chapters[activeChapter]._id
                                ? content
                                : undefined
                            "
                          />
                          <div v-if="course.chapters[activeChapter].uploaded_content" class="relative">
                            <vue-pdf-app class="pdf-viewer" :config="config"
                                         :pdf="`${course.chapters[activeChapter].uploaded_content_url}?token=${$session.get('jwt')}`">
                            </vue-pdf-app>
                          </div>
                        </v-col>
                        <div @click="clickButton" class="col-12 cursor-pointer">
                          <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.3346 17.6667C9.30797 17.6667 7.66797 16.0267 7.66797 14.0001L7.66797 7.00008C7.66797 5.52675 8.8613 4.33342 10.3346 4.33342C11.808 4.33342 13.0013 5.52675 13.0013 7.00008L13.0013 12.6667C13.0013 13.5867 12.2546 14.3334 11.3346 14.3334C10.4146 14.3334 9.66797 13.5867 9.66797 12.6667L9.66797 7.66675L11.0013 7.66675L11.0013 12.7267C11.0013 13.0934 11.668 13.0934 11.668 12.7267L11.668 7.00008C11.668 6.26675 11.068 5.66675 10.3346 5.66675C9.6013 5.66675 9.0013 6.26675 9.0013 7.00008L9.0013 14.0001C9.0013 15.2867 10.048 16.3334 11.3346 16.3334C12.6213 16.3334 13.668 15.2867 13.668 14.0001L13.668 7.66675L15.0013 7.66675L15.0013 14.0001C15.0013 16.0267 13.3613 17.6667 11.3346 17.6667Z"
                                fill="#193074"/>
                            <circle cx="11" cy="11" r="10.5" stroke="#193074"/>
                          </svg>
                          {{ (chapterContent ? chapterContent.name : null) || course.chapters[activeChapter].uploaded_content || 'Upload document' }} <span>(pdf only)</span>
                          <input
                              type="file"
                              id="chapterContent"
                              accept="application/pdf"
                              hidden
                              @change="handleFileUpload()"
                          />
                        </div>
                      </v-row>
                    </v-card>

                    <v-btn class="mr-4 mt-4 primary-button" @click="stepCounter = 4"
                    >Continue
                    </v-btn>
                    <v-btn v-if="course.chapters[activeChapter].uploaded_content"
                           class="primary-button danger ml-4 mt-4"
                           @click.prevent="
                                    set_modal({
                                      template: 'action_confirmation',
                                      method: {
                                        action: 'courses/deleteChapterDocument',
                                      },
                                      title: 'Delete Chapter Document',
                                      message:
                                        'Are you sure you want to remove this document?',
                                    })
                                  "
                    >Remove document
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-step :complete="stepCounter > 4" step="4" editable
                  >{{
                      `Chapter ${activeChapter + 1} - ${
                          action === "update" ? action : "add"
                      } attachments`
                    }}
                  </v-stepper-step>

                  <v-stepper-content step="4">
                    <v-card class="mb-12 elevation-0">
                      <v-row>
                        <v-col class="col-12">
                          <div
                              v-if="
                              course.chapters[activeChapter].attachments
                                .length > 0
                            "
                              class="attachments"
                          >
                            <div
                                v-for="(attachment, key) in course.chapters[
                                activeChapter
                              ].attachments"
                                :key="key"
                                class="file-listing d-flex"
                            >
                              <div
                                  class="downloadable_attachment vertically--centered"
                              >
                                <v-icon color="#000000" x-large
                                >mdi-file{{
                                    findIcon(attachment.name)
                                  }}-outline
                                </v-icon>
                                <span class="filename text-truncate">{{
                                    attachment.name
                                  }}</span>
                                <button
                                    @click.prevent="
                                    set_modal({
                                      template: 'action_confirmation',
                                      method: {
                                        action: 'courses/deleteAttachment',
                                        parameters: attachment.name,
                                      },
                                      title: 'Delete Attachment',
                                      message:
                                        'Are you sure you want to delete this attachment?',
                                    })
                                  "
                                >
                                  <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="45"
                                      height="45"
                                      viewBox="0 0 69 69"
                                  >
                                    <circle
                                        id="Ellipse_225"
                                        data-name="Ellipse 225"
                                        cx="34.5"
                                        cy="34.5"
                                        r="34.5"
                                        fill="#fc6767"
                                    />
                                    <path
                                        id="Icon_material-delete"
                                        data-name="Icon material-delete"
                                        d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21V6Z"
                                        transform="translate(16.5 16.5)"
                                        fill="none"
                                        stroke="#fff"
                                        stroke-width="2"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </v-col>
                        <v-col class="col-12">
                          <file-picker
                              v-if="this.mode != ''"
                              :ref="`picker${activeChapter}1`"
                              :boundIndex="activeChapter"
                              :multiple="true"
                              @addFile="addAttachment"
                              @removeFile="removeAttachment"
                          />
                        </v-col>
                        <v-col class="col-12">
                          <h3>Quiz</h3>
                          <v-select
                              v-model="selectedQuizName"
                              :items="quizNames"
                              chips
                              dense
                              outlined
                              class="quiz-select"
                          ></v-select>
                          <v-row
                              v-if="selectedQuizName !== ''"
                              class="quiz-details pa-4 quiz-select"
                          >
                            <v-col class="col-12 px-0">
                              <button @click.prevent="removeQuiz">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="45"
                                    height="45"
                                    viewBox="0 0 69 69"
                                >
                                  <circle
                                      id="Ellipse_225"
                                      data-name="Ellipse 225"
                                      cx="34.5"
                                      cy="34.5"
                                      r="34.5"
                                      fill="#fc6767"
                                  />
                                  <path
                                      id="Icon_material-delete"
                                      data-name="Icon material-delete"
                                      d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21V6Z"
                                      transform="translate(16.5 16.5)"
                                      fill="none"
                                      stroke="#fff"
                                      stroke-width="2"
                                  />
                                </svg>
                              </button>
                            </v-col>
                            <v-col class="col-6 px-0">
                              Name
                              <span class="font-weight-bold caption">{{
                                  selectedQuiz.name
                                }}</span>
                            </v-col>
                            <v-col class="col-6 px-0">
                              Number of questions
                              <span class="font-weight-bold">{{
                                  selectedQuiz.questions.length
                                }}</span>
                            </v-col>
                            <v-col class="col-6 px-0">
                              Course
                              <span class="font-weight-bold caption">{{
                                  course.name
                                }}</span>
                            </v-col>
                            <v-col class="col-6 px-0">
                              Duration
                              <span class="font-weight-bold caption">{{
                                  new Date(selectedQuiz.duration * 1000)
                                      .toISOString()
                                      .substr(11, 8)
                                }}</span>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-btn class="mr-4 primary-button" @click="stepCounter = 5"
                    >Next
                    </v-btn>
                  </v-stepper-content>

                  <v-stepper-step :complete="stepCounter > 5" step="5"
                  >update Chapter {{ activeChapter + 1 }}
                  </v-stepper-step>

                  <v-stepper-content step="5">
                    <v-row class="ma-0">
                      <v-btn
                          v-if="course.chapters[activeChapter]._id"
                          class="mr-4 primary-button"
                          @click="validate('update')"
                      >update Chapter
                      </v-btn>
                      <v-btn
                          v-else
                          class="mr-4 primary-button"
                          @click="validate('create')"
                      >save Chapter
                      </v-btn>
                      <v-btn text class="py-6" @click="$router.push('/courses')"
                      >Cancel
                      </v-btn>
                    </v-row>
                    <v-row>
                      <span
                          :class="`m${
                          $vuetify.breakpoint.name == 'lg' ? 'l' : 'x'
                        }-auto`"
                      >
                        {{ message }}
                      </span>
                    </v-row>
                  </v-stepper-content>
                </v-stepper>
              </v-col>
            </v-row>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import '@/assets/js/mathlive'
import colors from "@/assets/sass/imports/_colors.scss";

const getSidebar = () => ({
  viewThumbnail: true,
  viewOutline: true,
  viewAttachments: true,
});
const getSecondaryToolbar = () => ({
  secondaryPresentationMode: true,
  secondaryOpenFile: true,
  secondaryPrint: true,
  secondaryDownload: true,
  secondaryViewBookmark: true,
  firstPage: true,
  lastPage: true,
  pageRotateCw: true,
  pageRotateCcw: true,
  cursorSelectTool: true,
  cursorHandTool: true,
  scrollVertical: true,
  scrollHorizontal: true,
  scrollWrapped: true,
  spreadNone: true,
  spreadOdd: true,
  spreadEven: true,
  documentProperties: true,
});
const getToolbarViewerLeft = () => ({
  findbar: true,
  previous: true,
  next: true,
  pageNumber: true,
});
const getToolbarViewerRight = () => ({
  presentationMode: true,
  openFile: false,
  print: false,
  download: false,
  viewBookmark: false,
});
const getToolbarViewerMiddle = () => ({
  zoomOut: true,
  zoomIn: true,
  scaleSelectContainer: true,
});
const getToolbar = () => ({
  toolbarViewerLeft: getToolbarViewerLeft(),
  toolbarViewerRight: getToolbarViewerRight(),
  toolbarViewerMiddle: getToolbarViewerMiddle(),
});
export default {
  name: "edit_chapters",
  props: {
    action: {
      type: String,
      default: "insert",
    },
  },
  data: () => ({
    stepCounter: 1,
    activeChapter: -1,
    uploadedCourse: false,
    selectedQuizName: "",
    primary: colors.primary,
    quizes: [],
    quizNames: [],
    attachments: [],
    message: "",
    mode: "",
    content: "",
    chapterContent: undefined,
    error: "",
    chapterVideo: undefined,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length > 2 || "Name is too short",
    ],
    simpleRules: [(v) => !!v || "This field is required"],
    config: {
      sidebar: getSidebar(),
      secondaryToolbar: getSecondaryToolbar(),
      toolbar: getToolbar(),
      errorWrapper: true,
    },
  }),
  components: {
    FilePicker: () => import("@/components/reusable/FilePicker"),
    Editor: () => import("@/components/reusable/Editor"),
    // vuePdfApp: () => import("vue-pdf-app")
  },
  computed: {
    // get the current course
    ...mapGetters("courses", ["course"]),
    // get all quizes
    ...mapGetters("quiz", ["all_quiz"]),
    selectedQuiz() {
      return this.all_quiz.length
          ? this.all_quiz.filter((quiz) => quiz.name == this.selectedQuizName)[0]
          : undefined;
    },
    limit() {
      const chapter = this.course.chapters.filter(x => x.status === 0)
      return chapter.length ? chapter[chapter.length - 1]._id : undefined
    }
  },
  watch: {
    activeChapter() {
      this.mode = "";
      this.content = "";
      this.selectedQuizName = "";
      this.stepCounter = 1;
      if (this.course.chapters[this.activeChapter]._id) {
        this.getChapterMainContent(
            this.course.chapters[this.activeChapter]._id
        ).then((data) => {
          this.mode = "edit";
          this.content = data;
        });
      } else {
        this.mode = "edit";
      }
      if (this.course.chapters[this.activeChapter].quiz.length > 0) {
        this.selectedQuizName = this.course.chapters[
            this.activeChapter
            ].quiz[0].name;
      }
      this.video = undefined;
      this.attachments = [];
    },
    stepCounter() {
      const callback = (event) => {
        const element = document.getElementById("vuePdfApp")
        console.log(element)

        if (element)
          if (element.contains(event.target)) {
            event.preventDefault()
            // Chrome requires returnValue to be set.
            event.returnValue = ""
          }
      }
      if (this.stepCounter == 3) {
        document.querySelector(".ProseMirror").focus();
        window.addEventListener("click", callback)
      } else {
        window.removeEventListener("click", callback)
      }
      if (this.stepCounter == 4) {
        this.calculateQuizNames();
      }
    },
    message() {
      if (this.message != "") {
        setTimeout(() => {
          this.message = "";
        }, 2000);
      }
    },
    error() {
      if (this.error != "") {
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: this.error,
          status: "danger",
          uptime: 2000,
        }).then(() => {
          this.error = ""
        })
      }
    },
  },
  methods: {
    addSpecialInput() {
      const el = document.querySelector('.ProseMirror')
      const newElement = document.createElement('math-field')
      newElement.setAttribute('virtual-keyboard-mode', 'manual')
      newElement.setAttribute('role', 'textbox')
      newElement.setAttribute('tabindex', '0')
      setTimeout(() => {
        console.log('harahiye', newElement)
        console.log(
            newElement.addEventListener('input', (ev) => {
              console.log(newElement.innerHTML, ev.target.value)
              newElement.innerText = ev.target.value
              console.log(newElement.innerHTML, ev.target.value)
            })
        )
        console.log(newElement)
        newElement.innerText = "x=\\frac{-b\\pm \\sqrt{b^2-4ac}}{2a}"
      }, 10000)
      const paragraphElement = document.createElement('p')
      paragraphElement.appendChild(newElement)
      el.appendChild(paragraphElement)
    },
    clickButton() {
      document.getElementById('chapterContent').click();
    },
    handleFileUpload() {
      this.chapterContent = document.getElementById('chapterContent').files[0];
    },
    ...mapActions("courses", [
      "getChapterMainContent",
      "updateChapter",
      "deleteAttachment",
      "initialise_new_chapter",
      "createChapter",
      "deleteVideo"
    ]),
    ...mapActions("quiz", ["getQuizes"]),
    ...mapActions("modal", ["set_modal"]),
    changeLimit() {
      for (let i in this.course.chapters) {
        i = parseInt(i)
        if (i === this.activeChapter) {
          this.course.chapters[i].status = this.course.chapters[i].status ? 0 : 1
        } else if (this.course.chapters[i].status === 0) {
          this.course.chapters[i].status = 1
        }
      }
    },
    async validate(type, validateOnly = false) {
      if (this.course.chapters[this.activeChapter].name === "") {
        return (this.error = "name is required");
      } else if (this.course.chapters[this.activeChapter].name.length < 3) {
        return (this.error = "name is too short");
      }
      if (this.course.chapters[this.activeChapter].description === "") {
        return (this.error = "description is required");
      } else if (
          this.course.chapters[this.activeChapter].description.length < 10
      ) {
        return (this.error = "description is too short");
      }
      if (validateOnly) {
        return "Passed"
      } else {
        if (type === "update") {
          this.saveChapterChanges();
        } else {
          this.saveChapter();
        }
      }
    },
    calculateQuizNames() {
      let quizNames = [];
      if (this.all_quiz) {
        let quizes = JSON.parse(JSON.stringify(this.all_quiz));
        if (quizes) {
          for (const i in quizes) {
            let addName = false;
            if (!quizes[i].target) {
              addName = true;
            } else if (
                this.course.chapters[this.activeChapter].quiz.length > 0
            ) {
              if (
                  quizes[i].name ==
                  this.course.chapters[this.activeChapter].quiz[0].name
              ) {
                addName = true;
              }
            }

            if (addName) {
              quizNames.push(quizes[i].name);
            }
          }
        }
      }
      this.quizNames = quizNames;
    },
    updateActiveChapter() {
      if (this.activeChapter === 0 && this.course.chapters.length === 0) {
        this.addNewChapter();
      } else {
        if (this.course.chapters.length - 1 > this.activeChapter) {
          this.activeChapter += 1;
        } else {
          this.activeChapter = 0;
        }
      }
    },
    addAttachment(file) {
      this.attachments.push(file);
    },
    removeAttachment(index) {
      this.attachments.splice(index, 1);
    },
    updateVideo(file) {
      this.chapterVideo = file;
    },
    removeVideo() {
      this.chapterVideo = undefined;
    },
    switchMode(mode) {
      this.mode = "";
      this.content = this.$refs.editor.getHTML();
      document
          .querySelector(".ProseMirror")
          .setAttribute("contenteditable", mode === "edit");
      this.$nextTick(function () {
        this.mode = mode;
      });
    },
    saveChapterChanges() {
      const content = this.$refs.editor.getHTML();
      this.updateChapter({
        chapter: {
          name: this.course.chapters[this.activeChapter].name,
          number: this.activeChapter + 1,
          course: this.course._id,
          description: this.course.chapters[this.activeChapter].description,
          status: this.course.chapters[this.activeChapter].status
        },
        content:
            content === `<p>Type or paste your content here</p>` || content === ""
                ? undefined
                : content,
        video: this.chapterVideo,
        attachments: this.attachments,
        quiz: this.selectedQuiz,
        chapterContent: this.chapterContent
      }).then(() => {
        this.chapterVideo = undefined;
        this.attachments = [];
        // this.updateActiveChapter();
        this.content = "";
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "Chapter was successfully updated",
          status: "success",
          uptime: 2000,
        });
      });
    },
    saveChapter() {
      const content = this.$refs.editor.getHTML();
      this.createChapter({
        chapter: {
          name: this.course.chapters[this.activeChapter].name,
          number: this.activeChapter + 1,
          course: this.course._id,
          description: this.course.chapters[this.activeChapter].description,
          status: this.course.chapters[this.activeChapter].status,
        },
        content:
            content === `<p>Type or paste your content here</p>` || content === ""
                ? undefined
                : content,
        video: this.chapterVideo,
        attachments: this.attachments,
        quiz: this.selectedQuiz,
        chapterContent: this.chapterContent
      }).then(() => {
        this.chapterVideo = undefined;
        this.attachments = [];
        this.uploadedCourse = true
        // this.updateActiveChapter();
        this.content = "";
        this.$store.dispatch("app_notification/SET_NOTIFICATION", {
          message: "Chapter was added successfully",
          status: "success",
          uptime: 2000,
        });
      });
    },
    findIcon(name) {
      const type = name.split(".")[name.split(".").length - 1];
      if (type.includes("video")) {
        return "-video";
      } else if (type.includes("audio")) {
        return "-music";
      } else if (type.includes("word")) {
        return "-word";
      } else {
        return "";
      }
    },
    addNewChapter() {
      this.content = "";
      this.mode = "";
      const len = this.course.chapters.length;
      this.initialise_new_chapter().then(() => {
        this.activeChapter = len;
      });
    },
    removeQuiz() {
      this.selectedQuizName = "";
    },
  },
  created() {
    // load quizes
    this.getQuizes({
      user_name: this.$store.state.user.user.user_name,
    });
    // automatically add one chapter if there are no chapters
    if (this.course.chapters.length == 0) {
      this.addNewChapter();
    }
    //   start on the first chapter
    else if (this.activeChapter === -1) {
      {
        this.activeChapter = 0;
      }
    }
  },
};
</script>
<style lang="scss">
.ProseMirror:focus {
  outline: none;
}

.chapter-button {
  background-color: #f5f5f5;
  width: 100%;
  height: 50px;
}

.pdf-viewer {
  height: 200px;
}

.chapter-badges {
  width: 85%;
  height: 50px;

  .chapter-active-button {
    background-color: #ffd248;
    color: #fff;
  }

  .active-chapter {
    background-color: $primary;
  }
}

.active-mode {
  background-color: $primary;
}

.v-stepper__step.v-stepper__step--active.v-stepper__step--editable {
  span.v-stepper__step__step {
    background-color: #6daefc !important;
  }
}

.primary-button {
  background-color: $primary !important;
  color: white !important;

  &.danger {
    background-color: red !important;
  }
}
</style>
