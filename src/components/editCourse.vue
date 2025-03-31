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
                v-model="course.facilityCollegeYear"
                :items="facilityCollegeYearNames"
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
                <img
                  :src="`http://161.35.199.197:7070/kurious/file/courseCoverPicture/${$route.params.id}`"
                  alt="avatar"
                />
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
                @click="updateCourse()"
              >update Course</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-col>
      <v-col v-else class="col-12 pr-12">
        <v-row v-if="activeChapter > -1">
          <v-col class="col-12 col-md-3 px-0 text-left">
            <v-btn
              v-for="(chapter, i) in chapters"
              :key="i"
              :color="activeChapter === i ? '#ffd248': ''"
              width="90%"
              :class="`${activeChapter === i ? 'white--text': ''} d-block my-4 pt-5 pb-8 text-wrap`"
              @click="activeChapter=i"
            >{{trimString(chapter.name, 20)}}</v-btn>
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
                            v-model="chapters[activeChapter].name"
                            placeholder="Enter Chapter Name"
                            class="chapter-name"
                            solo
                          ></v-text-field>
                          <h4>Description</h4>
                          <textarea
                            v-model="chapters[activeChapter].description"
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
                            <v-col v-if="chapters[activeIndex].mainVideo" class="col-12" id="video">
                              <vue-plyr>
                                <video
                                  :src="`http://161.35.199.197:7070/kurious/file/chapterMainVideo/${chapters[activeIndex]._id}`"
                                ></video>
                              </vue-plyr>
                            </v-col>
                            <v-col class="col-12">
                              <kurious-file-picker
                                :allowedTypes="['video']"
                                @updateFile="updateVideo"
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
                                @updateFile="updateAttachment"
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
                                v-if="selectedQuizName !== 'None'"
                                class="quiz-details pa-4 quiz-select"
                              >
                                <v-col class="col-6">
                                  Name
                                  <span class="font-weight-bold">{{quizes[activeIndex].name}}</span>
                                </v-col>
                                <v-col class="col-6">
                                  Number of questions
                                  <span
                                    class="font-weight-bold"
                                  >{{quizes[activeIndex].containedQuestions}}</span>
                                </v-col>
                                <v-col class="col-6">
                                  Course
                                  <span
                                    class="font-weight-bold"
                                  >{{quizes[activeIndex].course}}</span>
                                </v-col>
                                <v-col class="col-6">
                                  Duration
                                  <span
                                    class="font-weight-bold"
                                  >{{quizes[activeIndex].duration}}</span>
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-card>
                        <v-btn color="primary" class="mr-4" @click="e6=5">Next</v-btn>
                        <v-btn text class="py-6 mt-n3" @click="reset('chapter')">Reset Chapter</v-btn>
                      </v-stepper-content>

                      <v-stepper-step :complete="e6 > 5" step="5">update Chapter {{activeIndex + 1}}</v-stepper-step>

                      <v-stepper-content step="5">
                        <v-btn color="primary" class="mr-4" @click="updateChapter()">update Chapter</v-btn>
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
    <kurious-dialog :show="show" :message="message" :modal="modal" :status="status">
      <!-- <v-icon slot="icon" size="55" dark>mdi-clipboard-text-multiple-outline</v-icon> -->
      <v-icon slot="icon" size="55" dark>mdi-barley</v-icon>
      <v-row slot="actions">
        <v-col class="col-6 mx-auto my-0">
          <v-btn color="mx-2" to="/courses">Go to Courses</v-btn>
          <v-btn
            v-if="type === 'details'"
            color="mx-2"
            @click="type = 'chapters'; show = false"
          >Update Chapters</v-btn>
          <v-btn v-else color="mx-2" @click="reset();show = false">Update Another Chapter</v-btn>
        </v-col>
      </v-row>
    </kurious-dialog>
  </v-app>
</template>

  <script>
import Apis from "@/services/apis";
import axios from "axios";
export default {
  name: "NewClass",

  data: () => ({
    e6: 1,
    facilityCollegeYearNames: [],
    facilityCollegeYearCodes: [],
    activeChapter: -1,
    quizNames: ["None"],
    selectedQuizName: "None",
    coverPicture: undefined,
    quizes: [],
    attachments: [],
    modal: true,
    type: "details",
    mode: "",
    show: false,
    message: "",
    status: 200,
    course: {},
    chapters: [],
    activeIndex: 0,
    chapter: {
      _id: "",
      name: "",
      description: "",
      video: undefined,
    },
    content: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length > 2 || "Name is too short",
    ],
    simpleRules: [(v) => !!v || "This field is required"],
  }),
  watch: {
    activeChapter() {
      this.mode = "";
      this.getChapterDocument();
    },
    e6() {
      if (this.e6 === 2) {
        document.querySelector(".ProseMirror").focus();
      }
    },
    selectedQuizName() {
      if (this.selectedQuizName !== "None") {
        this.activeIndex = this.quizNames.indexOf(this.selectedQuizName) - 1;
      }
    },
    type() {
      if (this.type === "chapters") {
        this.activeChapter = 0;
        this.getQuizes();
      }
    },
  },
  beforeMount() {
    this.getFaculties();
    this.getEsssentials();
  },
  methods: {
    trimString(string, length) {
      if (string.length < length) {
        return string;
      } else {
        let trimedString = string.substring(0, length);
        trimedString = trimedString.split(" ");
        trimedString.splice(trimedString.length - 1, 1);
        trimedString = trimedString.join(" ") + " ...";
        return trimedString;
      }
    },
    async getChapterDocument() {
      try {
        this.content = "";
        const response = await Apis.get(
          `file/chapterDocument/${this.chapters[this.activeChapter]._id}`
        );
        this.content = response.data;
        this.mode = "edit";
      } catch (error) {
        if (error.response) {
          this.status = 404;
          this.message = "Content Was Not Found";
          this.show = true;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.show = true;
        }
        this.modal = false;
      }
    },
    async getFaculties() {
      try {
        const response = await Apis.get(
          `facility-college-year/college/${this.$store.state.user.college}`
        );
        for (const facultyCollegeYear of response.data) {
          this.facilityCollegeYearNames.push(facultyCollegeYear.name);
          this.facilityCollegeYearCodes.push(facultyCollegeYear._id);
        }
      } catch (error) {
        if (error.request && !error.response) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
        }
      }
    },
    async getEsssentials() {
      try {
        const course = await Apis.get(`course/${this.$route.params.id}`);
        this.course = course.data;
        this.course.facilityCollegeYear = this.facilityCollegeYearNames[
          this.facilityCollegeYearCodes.indexOf(this.course.facilityCollegeYear)
        ];
        const chapters = await Apis.get(`chapter/course/${this.course._id}`);
        this.chapters = chapters.data;
      } catch (error) {
        console.log(error);
        if (error.response) {
          this.status = error.response.status;
          this.message = "Course No Found";
          this.show = true;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.show = true;
        }
      }
    },
    async getAttachments() {
      this.attachments = [];
      try {
        const response = await Apis.get(
          `file/getAttachments/${this.chapters[this.activeChapter]._id}`
        );
        this.attachments = response.data;
      } catch (error) {
        if (error.response) {
          this.message = error.response.data;
        } else if (error.request) {
          this.message = "Service Unavailable";
        }
      }
    },
    async getQuizes() {
      try {
        const response = await Apis.get("quiz");
        for (const quiz of response.data) {
          if (!quiz.target) {
            const newQuiz = {
              _id: quiz._id,
              name: quiz.name,
              course: "nyuma",
              usage: 0,
              containedQuestions: quiz.questions.length,
              instructor: quiz.instructor,
              questions: quiz.questions,
              duration: `${quiz.duration.hh === "" ? "00" : quiz.duration.hh}:${
                quiz.duration.mm === "" ? "00" : quiz.duration.mm
              }:${quiz.duration.ss === "" ? "00" : quiz.duration.ss}`,
              date: quiz.createdAt.split("T")[0].split("-").reverse().join("/"),
            };
            this.quizes.push(newQuiz);
            this.quizNames.push(newQuiz.name);
          }
        }
      } catch (error) {
        if (error.request && !error.response) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
        }
      }
    },
    updateAttachment(file) {
      this.attachments.push(file);
    },
    removeAttachment(index) {
      this.attachments.splice(index, 1);
    },
    updateVideo(file) {
      this.chapter.video = file;
    },
    removeVideo() {
      this.chapter.video = undefined;
    },
    switchMode(mode) {
      this.mode = "";
      this.content = document.querySelector(".ProseMirror").innerHTML;
      document
        .querySelector(".ProseMirror")
        .setAttribute("contenteditable", mode === "edit");
      this.mode = mode;
    },
    pickfile() {
      document.getElementById("picture").click();
    },
    handleFileUpload() {
      this.coverPicture = this.$refs.file.files[0];
    },
    async updateCourse() {
      try {
        this.message = "";
        this.course.facilityCollegeYear = this.facilityCollegeYearCodes[
          this.facilityCollegeYearNames.indexOf(this.course.facilityCollegeYear)
        ];
        let response = await Apis.update("course", this.course._id, {
          name: this.course.name,
          instructor: this.$store.state.user._id,
          description: this.course.description,
          facilityCollegeYear: this.course.facilityCollegeYear,
        });
        this.message = "Course was updated successfuly";
        this.show = true;
        this.course._id = response.data._id;

        const formData = new FormData();

        if (this.coverPicture) {
          formData.append("file", this.coverPicture);

          response = await axios.put(
            `http://161.35.199.197:7070/kurious/file/updateCourseCoverPicture/${this.course._id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          setTimeout(() => {
            this.message = "Cover Picture was updated successfully";
          }, 1000);
        }
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false;
        this.show = true;
      }
    },
    async attachQuiz(type, id) {
      try {
        const quiz = this.quizes[this.activeIndex];
        this.message = "";
        const splitDuration = quiz.duration.split(":");
        await Apis.update("quiz", this.quizes[this.activeIndex]._id, {
          name: quiz.name,
          questions: quiz.questions,
          duration: {
            hh: splitDuration[0],
            mm: splitDuration[1],
            ss: splitDuration[2],
          },
          instructor: quiz.instructor,
          target: {
            type: type,
            id: id,
          },
        });
        this.message = "Quiz was updated attached";
        this.show = true;
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false;
        this.show = true;
      }
    },
    async updateChapter() {
      try {
        this.message = "";
        let response = await Apis.create("chapter", {
          name: this.chapter.name,
          course: this.course._id,
          // course: "5f410bc8f1cd91290c28a696",
          description: this.chapter.description,
        });
        this.message = "Course was updated successfuly";
        this.show = true;
        this.chapter._id = response.data._id;

        response = await Apis.create(
          `file/updateChapterContent/${this.chapter._id}`,
          {
            content: this.$refs.editor.getHTML(),
          }
        );
        this.chapters++;
        setTimeout(() => {
          this.message = "Chapter content was updated successfuly";
        }, 1000);
        if (this.attachments.length > 0) {
          const formData = new FormData();
          for (const i in this.attachments) {
            formData.append("files[" + i + "]", this.attachments[i]);
          }
          response = await axios.post(
            `http://161.35.199.197:7070/kurious/file/UpdateAttachments/${this.chapter._id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          setTimeout(() => {
            this.message = "Attachments were updated successfuly";
          }, 1000);
        }
        if (this.chapter.video) {
          const formData = new FormData();
          formData.append("file", this.chapter.video);
          response = await axios.post(
            `http://161.35.199.197:7070/kurious/file/updateMainVideo/${this.chapter._id}`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          setTimeout(() => {
            this.message = "Video was updated successfuly";
          }, 1000);
        }
        if (this.selectedQuizName !== "None") {
          this.attachQuiz("Chapter", this.chapter._id);
        }
      } catch (error) {
        if (error.response) {
          this.status = error.response.status;
          this.message = error.response.data;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
        }
        this.modal = false;
        this.show = true;
      }
    },
    reset(type) {
      if (type === "course") {
        this.course = {
          _id: undefined,
          name: "",
          facilityCollegeYear: "",
          description: "",
          coverPicture: undefined,
        };
      } else {
        this.chapter = {
          _id: "",
          name: "",
          description: "",
        };
        this.content = undefined;
        this.attachments = [];
        const closeButtons = document.querySelectorAll(".remove--button");
        this.mode = "";
        this.e6 = 1;
        this.$nextTick(function () {
          this.mode = "edit";
        });
        for (const button of closeButtons) {
          button.click();
        }
      }
    },
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