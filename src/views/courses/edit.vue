  <template>
  <v-app>
    <v-row v-if="course != undefined" class="new-class-form ml-10 mt-10">
      <v-col class="col-12">
        <h1 class="d-block">EDIT COURSE</h1>
        <div class="new-class-btns mb-5">
          <v-btn
            rounded
            text
            color="#000"
            dark
            :class="`details-btn ${type=='details' ? 'new-active-btn' : ''}`"
            @click="type='details'"
          >Course Details</v-btn>
          <v-btn
            rounded
            text
            color="#000"
            dark
            :class="`chapters-btn ${type=='chapters' ? 'new-active-btn' : ''}`"
            @click="type='chapters'"
          >Course Chapters</v-btn>
        </div>
      </v-col>
      <v-col v-if="type=='details'" class="col-12">
        <v-form>
          <v-row>
            <v-col class="col-12 col-md-8">
              <h3>Course Name</h3>
              <v-text-field
                v-model="course.name"
                required
                :rules="nameRules"
                placeholder="Type course name..."
                outlined
                class="course-input"
              ></v-text-field>
              <h3>Student Group</h3>
              <v-select
                v-model="selectedFacultyCollegeYearName"
                :items="facultyCollegeYearNames"
                chips
                :rules="simpleRules"
                outlined
                class="group-select"
              ></v-select>
              <h3>Course Description</h3>
              <textarea
                v-model="course.description"
                class="kurious--textarea mb-4"
                cols="60"
                rows="8"
              ></textarea>
            </v-col>
            <v-col class="col-12 col-md-4">
              <v-avatar size="245" class="user-profile ml-2 mt-6 d-block">
                <img v-if="displayPicture" :src="course.coverPicture" alt="avatar" />
              </v-avatar>
              <v-btn
                fab
                small
                color="#828282"
                class="white--text course-image mt-4 mb-6 mr-4"
                @click="pickfile()"
              >
                <v-icon>mdi-paperclip</v-icon>
              </v-btn>
              <span>{{course.coverPicture === undefined ? 'Upload Course CoverPicture' : coverPicture ? coverPicture.name : "Update Course CoverPicture" }}</span>
              <input
                ref="file"
                type="file"
                hidden
                accept="image/*"
                id="picture"
                class="d-none my-6"
                @change="handleFileUpload()"
              />
            </v-col>
            <v-col class="col-12 text-center">
              <v-btn
                rounded
                color="#3CE970"
                class="white--text mb-6"
                @click="saveCourseChanges"
              >update Course</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col v-else class="col-12 pr-12">
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
                fab
                color="error"
                class="ml-n2 mt-n2 remove--button"
                slot="badge"
                @click="ask_confirmation('DELETE_CHAPTER',{ id: chapter._id})"
              >
                <v-icon color="#fff">mdi-window-close</v-icon>
              </v-btn>

              <button
                class="chapter-button"
                :class="`${activeChapter === i ? 'white--text active-chapter': ''}`"
                @click="activeChapter=i"
              >{{chapter.name | trimString(20)}}</button>
            </v-badge>
            <v-btn width="90%" class="py-6" @click="addNewChapter">
              <v-icon>mdi-plus</v-icon>New Chapter
            </v-btn>
          </v-col>
          <v-col class="col-12 col-md-9 px-0">
            <v-form>
              <div class="class-chapters">
                <v-row>
                  <v-col class="col-12">
                    <v-stepper v-model="e6" vertical>
                      <v-stepper-step
                        :complete="e6 > 1"
                        step="1"
                        editable
                      >Chapter {{activeChapter + 1}} -name & description</v-stepper-step>

                      <v-stepper-content step="1">
                        <v-card class="mb-12 pa-6 elevation-0" height="300px">
                          <h4 class="#f8f8f8--text">Name</h4>
                          <v-text-field
                            v-model="course.chapters[activeChapter].name"
                            placeholder="Enter Chapter Name"
                            class="chapter-name"
                            solo
                          ></v-text-field>
                          <h4>Description</h4>
                          <textarea
                            v-model="course.chapters[activeChapter].description"
                            class="mt-1 kurious--textarea mb-4"
                            cols="72"
                            rows="5"
                            placeholder="Enter Chapter Description"
                          ></textarea>
                        </v-card>
                        <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                      </v-stepper-content>

                      <v-stepper-step
                        :complete="e6 > 2"
                        step="2"
                        editable
                      >Chapter {{activeChapter + 1}} - update video</v-stepper-step>

                      <v-stepper-content step="2">
                        <v-card class="mb-12 pa-6 elevation-0" height="auto">
                          <v-row>
                            <v-col
                              v-if="course.chapters[activeChapter].mainVideo"
                              class="col-12"
                              id="video"
                            >
                              <vue-plyr>
                                <video :src="course.chapters[activeChapter].mainVideo"></video>
                              </vue-plyr>
                            </v-col>
                            <v-col class="col-12">
                              <kurious-file-picker
                                v-if="mode !== ''"
                                :allowedTypes="['video']"
                                @addFile="updateVideo"
                                @removeFile="removeVideo"
                              />
                            </v-col>
                          </v-row>
                        </v-card>
                        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                      </v-stepper-content>

                      <v-stepper-step
                        :complete="e6 > 3"
                        step="3"
                        editable
                      >Chapter {{activeChapter + 1}} - update content</v-stepper-step>

                      <v-stepper-content step="3">
                        <v-card class="mb-12 elevation-0">
                          <v-row>
                            <v-col class="col-12 actions-container">
                              <v-row>
                                <v-col
                                  :class="`col-6 text-center ${mode=='edit' ? 'yellow white--text' : ''}`"
                                  @click="switchMode('edit')"
                                >Edit mode</v-col>
                                <v-col
                                  :class="`col-6 text-center ${mode=='preview' ? 'yellow white--text' : ''}`"
                                  @click="switchMode('preview')"
                                >View mode</v-col>
                              </v-row>
                            </v-col>

                            <v-col
                              v-if="mode === 'preview'"
                              class="col-12 title"
                            >{{course.chapters[activeChapter].name}}</v-col>
                            <v-col
                              v-if="mode === 'preview'"
                              class="col-12 subtitle"
                            >{{chapter.description}}</v-col>
                            <v-col class="col-12">
                              <kurious-editor
                                v-if="mode !== ''"
                                ref="editor"
                                :mode="`${mode === 'edit' ? mode : 'preview'}`"
                                :defaultContent="course.chapters[activeChapter]._id ? content : undefined"
                              />
                            </v-col>
                          </v-row>
                        </v-card>
                        <v-btn color="primary" class="mr-4" @click="e6=4">Continue</v-btn>
                        <v-btn text class="py-6 mt-n3" @click="reset('chapter')">Reset Chapter</v-btn>
                      </v-stepper-content>

                      <v-stepper-step
                        :complete="e6 > 4"
                        step="4"
                        editable
                      >Chapter {{activeChapter + 1}} - update attachments</v-stepper-step>

                      <v-stepper-content step="4">
                        <v-card class="mb-12 elevation-0">
                          <v-row>
                            <v-col class="col-12">
                              <div
                                v-if="course.chapters[activeChapter].attachments.length > 0"
                                class="attachments"
                              >
                                <div
                                  v-for="(attachment, key) in course.chapters[activeChapter].attachments"
                                  :key="key"
                                  class="file-listing d-flex"
                                >
                                  <div class="downloadable_attachment vertically--centered">
                                    <v-icon
                                      color="#000000"
                                      x-large
                                    >mdi-file{{findIcon(attachment.name)}}-outline</v-icon>
                                    <span class="filename text-truncate">{{attachment.name}}</span>
                                    <button @click.prevent="deleteAttachment(attachment._id)">
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
                              <kurious-file-picker
                                v-if="mode !== ''"
                                multiple
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
                                <v-col class="col-6">
                                  Name
                                  <span class="font-weight-bold caption">{{selectedQuiz.name}}</span>
                                </v-col>
                                <v-col class="col-6">
                                  Number of questions
                                  <span
                                    class="font-weight-bold"
                                  >{{selectedQuiz.questions.length}}</span>
                                </v-col>
                                <v-col class="col-6">
                                  Course
                                  <span class="font-weight-bold caption">{{course.name}}</span>
                                </v-col>
                                <v-col class="col-6">
                                  Duration
                                  <span
                                    class="font-weight-bold caption"
                                  >{{selectedQuiz.duration}}</span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-card>
                        <v-btn color="primary" class="mr-4" @click="e6=5">Next</v-btn>
                        <v-btn text class="py-6 mt-n3" @click="reset('chapter')">Reset Chapter</v-btn>
                      </v-stepper-content>

                      <v-stepper-step
                        :complete="e6 > 5"
                        step="5"
                      >update Chapter {{activeChapter + 1}}</v-stepper-step>

                      <v-stepper-content step="5">
                        <v-btn
                          v-if="course.chapters[activeChapter]._id"
                          color="primary"
                          class="mr-4"
                          @click="saveChapterChanges"
                        >update Chapter</v-btn>
                        <v-btn v-else color="primary" class="mr-4" @click="saveChapter">save Chapter</v-btn>
                        <v-btn text class="py-6 mt-n3" @click="reset('chapter')">Reset Chapter</v-btn>
                      </v-stepper-content>
                    </v-stepper>
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- <kurious-dialog template="information" /> -->
    <!-- <kurious-dialog template="confirmation" :action="action" /> -->
  </v-app>
</template>

  <script>
// import Apis from "@/services/apis";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "editCourse",

  data: () => ({
    e6: 1,
    displayPicture: true,
    activeChapter: -1,
    selectedQuizName: "",
    selectedFacultyCollegeYearName: "",
    quizes: [],
    attachments: [],
    type: "details",
    mode: "",
    action: "delete_chapter",
    content: "",
    coverPicture: undefined,
    chapterVideo: undefined,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length > 2 || "Name is too short",
    ],
    simpleRules: [(v) => !!v || "This field is required"],
  }),
  computed: {
    // get the current course
    ...mapGetters("courses", ["course"]),
    ...mapGetters("faculties", ["facultyCollegeYearNames"]),
    selectedFacultyCollegeYearCode() {
      return this.$store.getters["faculties/facultyCollegeYear"](
        this.selectedFacultyCollegeYearName
      )._id;
    },
    quizNames() {
      let quizNames = this.$store.getters["quiz/quizNames"];
      if (this.course.chapters[this.activeChapter].quiz.length > 0) {
        quizNames.push(this.course.chapters[this.activeChapter].quiz[0].name);
      }
      return quizNames;
    },
    selectedQuiz() {
      return this.$store.getters["quiz/quiz"](this.selectedQuizName);
    },
  },
  watch: {
    activeChapter() {
      this.mode = "";
      this.content = "";
      this.selectedQuizName = "";
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
    },
    e6() {
      if (this.e6 === 3) {
        document.querySelector(".ProseMirror").focus();
      } else if (
        this.course.chapters[this.activeChapter].documentContent != this.content
      ) {
        this.course.chapters[
          this.activeChapter
        ].documentContent = this.$refs.editor.getHTML();
      }
    },
    type() {
      if (this.type === "chapters") {
        this.activeChapter = 0;
      }
    },
  },
  methods: {
    ...mapActions("courses", [
      "findCourseByName",
      "getChapterMainContent",
      "updateCourse",
      "updateChapter",
      "deleteAttachment",
      "initialise_new_chapter",
      "addChapter",
    ]),
    ...mapActions("faculties", ["getFacultyCollegeYears"]),
    ...mapActions("quiz", ["getQuizes"]),
    ...mapMutations("modal", [
      "toogle_visibility",
      "update_modal_template",
      "update_confirmation_action",
      "update_confirmation_method",
      "update_title",
      "update_message",
    ]),
    // pick coverPicture
    pickfile() {
      document.getElementById("picture").click();
    },
    // keep the coverPicture
    handleFileUpload() {
      this.coverPicture = this.$refs.file.files[0];
    },
    // failing
    reloadPicture() {
      this.displayPicture = false;
      this.$nextTick(function () {
        this.displayPicture = true;
      });
    },
    addAttachment(file) {
      this.attachments.push(file);
    },
    removeAttachment(index) {
      this.attachments.splice(index, 1);
    },
    updateVideo(file) {
      console.log(file);
      this.chapterVideo = file;
    },
    removeVideo() {
      this.chapterVideo = undefined;
    },
    switchMode(mode) {
      this.mode = "";
      this.content = document.querySelector(".ProseMirror").innerHTML;
      document
        .querySelector(".ProseMirror")
        .setAttribute("contenteditable", mode === "edit");
      this.mode = mode;
    },
    saveCourseChanges() {
      this.updateCourse({
        course: {
          name: this.course.name,
          instructor: this.$store.state.user._id,
          description: this.course.description,
          facultyCollegeYear: this.selectedFacultyCollegeYearCode,
        },
        coverPicture: this.coverPicture,
      }).then(() => {
        this.course.name != this.$route.params.name
          ? this.$router.push(`/courses/edit/${this.course.name}`)
          : this.coverPicture
          ? this.reloadPicture()
          : undefined;
      });
    },
    saveChapterChanges() {
      this.updateChapter({
        chapter: {
          name: this.course.chapters[this.activeChapter].name,
          number: this.activeChapter + 1,
          course: this.course._id,
          description: this.course.chapters[this.activeChapter].description,
        },
        content: this.$refs.editor.getHTML(),
        video: this.chapterVideo,
        attachments: this.attachments,
        quiz: this.selectedQuiz,
      }).then(() => {
        this.chapterVideo = undefined;
        this.attachments = [];
        if (this.course.chapters.length - 1 == this.activeChapter)
          this.type = "course";
        else this.activeChapter += 1;
      });
    },
    saveChapter() {
      this.addChapter({
        chapter: {
          name: this.course.chapters[this.activeChapter].name,
          number: this.activeChapter + 1,
          course: this.course._id,
          description: this.course.chapters[this.activeChapter].description,
        },
        content: this.$refs.editor.getHTML(),
        video: this.chapterVideo,
        attachments: this.attachments,
        quiz: this.selectedQuiz,
      }).then(() => {
        this.chapterVideo = undefined;
        this.attachments = [];
        if (this.course.chapters.length - 1 == this.activeChapter)
          this.type = "course";
        else this.activeChapter += 1;
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
      const len = this.course.chapters.length;
      this.initialise_new_chapter().then(() => {
        this.activeChapter = len - 1;
      });
    },
    removeQuiz() {
      this.selectedQuizName = "";
      this.course.chapters[this.activeChapter].quiz = [];
    },
    // handle dialogs
    ask_confirmation(action, credentials) {
      if (action == "DELETE_CHAPTER") {
        this.update_confirmation_action("delete_chapter");
        this.update_confirmation_method({
          action: "courses/delete_chapter",
          parameters: { id: credentials.id },
        });
        this.update_modal_template("action_confirmation");
        this.update_title("Delete Chapter");
        this.update_message("Are you sure you want to delete this chapter?");
        this.toogle_visibility();
      }
      console.log(credentials);
    },
    deleteChapter(chapterId) {
      console.log(chapterId);
    },
  },
  created() {
    this.getFacultyCollegeYears(this.$store.state.user.college);
    this.findCourseByName({
      userCategory: this.$store.state.user.category.toLowerCase(),
      userId: this.$store.state.user._id,
      courseName: this.$route.params.name,
    }).then(() => {
      this.selectedFacultyCollegeYearName = `${this.course.facultyCollegeYear.facultyCollege.faculty.name} ${this.course.facultyCollegeYear.collegeYear.digit}`;
    });
    this.getQuizes({
      userCategory: this.$store.state.user.category.toLowerCase(),
      userId: this.$store.state.user._id,
    });
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
</style>