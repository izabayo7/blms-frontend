  <template>
  <v-app>
    <v-row class="new-class-form ml-10 mt-10">
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
        <form>
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
        </form>
      </v-col>
      <v-col v-else class="col-12 pr-12">
        <v-row v-if="activeChapter > -1">
          <v-col class="col-12 col-md-3 px-0 text-left">
            <v-btn
              v-for="(chapter, i) in course.chapters"
              :key="i"
              :color="activeChapter === i ? '#ffd248': ''"
              width="90%"
              :class="`${activeChapter === i ? 'white--text': ''} d-block my-4 pt-5 pb-8 text-wrap`"
              @click="activeChapter=i"
            >{{chapter.name | trimString(20)}}</v-btn>
            <v-btn width="90%" class="py-6" @click="addChapter()">
              <v-icon>mdi-plus</v-icon>New Chapter
            </v-btn>
          </v-col>
          <v-col class="col-12 col-md-9 px-0">
            <form>
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

                            <v-col v-if="mode === 'preview'" class="col-12 title">{{chapter.name}}</v-col>
                            <v-col
                              v-if="mode === 'preview'"
                              class="col-12 subtitle"
                            >{{chapter.description}}</v-col>
                            <v-col class="col-12">
                              <kurious-editor
                                v-if="mode !== ''"
                                ref="editor"
                                :mode="`${mode === 'edit' ? mode : 'preview'}`"
                                :defaultContent="content"
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
                              <div v-if="attachments.length > 0" class="attachments">
                                <div
                                  v-for="(attachment, key) in attachments"
                                  :key="key"
                                  class="file-listing d-flex"
                                >
                                  <v-btn
                                    class="pa-6 mb-4"
                                    color="deep-purple accent-4"
                                    outlined
                                    @click="downloadAttachment(attachment._id)"
                                  >
                                    <v-icon
                                      color="#ffd248"
                                      x-large
                                    >mdi-file{{findIcon(attachment.name)}}-outline</v-icon>
                                    <span class="filename text-truncate">{{attachment.name}}</span>
                                  </v-btn>
                                </div>
                              </div>
                            </v-col>
                            <v-col class="col-12">
                              <kurious-file-picker
                                multiple
                                @addFile="adddAttachment"
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
                                <v-col class="col-6">
                                  Name
                                  <span class="font-weight-bold">{{selectedQuiz.name}}</span>
                                </v-col>
                                <v-col class="col-6">
                                  Number of questions
                                  <span
                                    class="font-weight-bold"
                                  >{{selectedQuiz.questions.length}}</span>
                                </v-col>
                                <v-col class="col-6">
                                  Course
                                  <span class="font-weight-bold">{{course.name}}</span>
                                </v-col>
                                <v-col class="col-6">
                                  Duration
                                  <span class="font-weight-bold">{{selectedQuiz.duration}}</span>
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
                          color="primary"
                          class="mr-4"
                          @click="saveChapterChanges"
                        >update Chapter</v-btn>
                        <v-btn text class="py-6 mt-n3" @click="reset('chapter')">Reset Chapter</v-btn>
                      </v-stepper-content>
                    </v-stepper>
                  </v-col>
                </v-row>
              </div>
            </form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <kurious-dialog template="info" />
  </v-app>
</template>

  <script>
// import Apis from "@/services/apis";
import { mapActions, mapGetters } from "vuex";
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
    course: undefined,
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
    ...mapGetters("faculties", ["facultyCollegeYearNames"]),
    ...mapGetters("quiz", ["quizNames"]),
    selectedFacultyCollegeYearCode() {
      return this.$store.getters["faculties/facultyCollegeYear"](
        this.selectedFacultyCollegeYearName
      )._id;
    },
    selectedQuiz() {
      return this.$store.getters["quiz/quizNames"](this.selectedQuizName);
    },
  },
  watch: {
    activeChapter() {
      this.mode = "";
      this.content = "";
      this.getChapterMainContent(
        this.course.chapters[this.activeChapter]._id
      ).then((data) => {
        this.mode = "edit";
        this.content = data;
      });
      if (this.course.chapters[this.activeChapter].quiz.length > 0) {
        this.selectedQuizName = this.course.chapters[
          this.activeChapter
        ].quiz[0].name;
        //  this.selectedQuiz = this.$store.getters["faculties/facultyCollegeYear"](
        //       this.selectedQuizName
        //   );
      }
    },
    e6() {
      if (this.e6 === 2) {
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
    ]),
    ...mapActions("faculties", ["getFacultyCollegeYears"]),
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
    adddAttachment(file) {
      this.attachments.push(file);
    },
    removeAttachment(index) {
      this.attachments.splice(index, 1);
    },
    updateVideo(file) {
      console.log(file)
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
      console.log({
        chapter: {
          name: this.course.chapters[this.activeChapter].name,
          number: this.activeChapter + 1,
          course: this.course._id,
          description: this.course.chapters[this.activeChapter].description,
        },
        content: this.$refs.editor.getHTML(),
        video: this.chapterVideo,
        attachments: this.attachments,
      });
      // this.updateChapter({
      //   chapter: {
      //     name: this.course.chapters[this.activeChapter].name,
      //     number: this.activeChapter + 1,
      //     course: this.course._id,
      //     description: this.course.chapters[this.activeChapter].description,
      //   },
      //   content: this.$refs.editor.getHTML(),
      //   video: this.chapterVideo,
      //   attachments: this.attachments,
      // }).then(() => {
      //   this.chapters.length - 1 == this.activeChapter
      //     ? (this.type = "course")
      //     : (this.activeChapter += 1);
      // });
    },
  },
  created() {
    this.getFacultyCollegeYears(this.$store.state.user.college);
    this.findCourseByName({
      userCategory: this.$store.state.user.category.toLowerCase(),
      userId: this.$store.state.user._id,
      courseName: this.$route.params.name,
    }).then((course) => {
      this.course = course;
      this.selectedFacultyCollegeYearName = `${this.course.facultyCollegeYear.facultyCollege.faculty.name} ${this.course.facultyCollegeYear.collegeYear.digit}`;
    });
  },
};
</script>

  <style>
.ProseMirror:focus {
  outline: none;
}
.chapter-button {
  background-color: #f5f5f5;
}
.chapter-active-button {
  background-color: #ffd248;
  color: #fff;
}
</style>