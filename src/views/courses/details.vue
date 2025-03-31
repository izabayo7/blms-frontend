<template>
  <v-container class="mx-0 pa-0" fluid>
    <v-row v-if="course && activeIndex > -1" id="courseDetails">
      <!-- button to show chapters list in small devices -->
      <v-btn
        @click="showActions = true"
        class="hidden-md-and-up mr-n8 white--text"
        :color="primary"
        right
        bottom
        rounded
        fixed
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <!-- the chapters list for big devices only -->
      <v-col class="col-3 hidden-sm-and-down pt-0">
        <kurious-chapter-list
          @change-chapter="changeActiveChapter"
          :chapters="course.chapters"
          :currentIndex="activeIndex"
          :maximumIndex="maximumIndex"
          :progress="
            userCategory === 'Instructor' ? 0 : course.progress.progress
          "
        />
      </v-col>
      <!-- chapters list for small devices -->
      <kurious-page-actions
        v-on:hideActions="showActions = false"
        :visible="showActions"
        class="hidden-md-and-up"
      >
        <kurious-chapter-list
          @changeChapter="changeActiveChapter"
          :chapters="course.chapters"
          :currentIndex="activeIndex"
          :maximumIndex="maximumIndex"
          :progress="
            userCategory === 'Instructor' ? 0 : course.progress.progress
          "
        />
      </kurious-page-actions>
      <!-- the course main content -->
      <v-col class="col-12 col-md-9 course-content customScroll pa-3">
        <v-row>
          <v-col class="col-12 title d-block pt-0">{{ course.name }}</v-col>
          <v-col
            v-if="course.chapters[activeIndex].mainVideo"
            class="col-8 pt-0"
            id="video"
          >
            <vue-plyr>
              <video :src="course.chapters[activeIndex].mainVideo"></video>
            </vue-plyr>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-8">
            <!-- <span v-if="course !== undefined">{{course.name}}</span> -->
            <v-tabs background-color="white" color="#ffd248" right>
              <v-tab id="content-tab">
                <v-icon class="mx-2">mdi-book-open-variant</v-icon>Chapter
              </v-tab>
              <v-tab>
                <v-icon class="mx-2">mdi-chat-outline</v-icon>Discussions
              </v-tab>
              <v-tab>
                <v-icon class="mx-2">mdi-file-download-outline</v-icon>Downloads
              </v-tab>

              <v-tab-item v-for="n in 3" :key="n">
                <v-container fluid>
                  <v-row v-if="course.chapters.length > 0 && n === 1">
                    <v-col class="col-12 title d-block"
                      >Chapter {{ activeIndex + 1 }}:
                      {{ course.chapters[activeIndex].name }}
                    </v-col>
                    <!-- <v-col class="col-6"></v-col> -->
                    <v-col class="col-12">
                      <loader v-if="editorContent == ''" type="2" class="vertically--centered" />
                      <kurious-editor
                        v-if="editorContent !== ''"
                        :defaultContent="editorContent"
                      />
                    </v-col>
                    <v-col
                      v-if="Math.round(maximumIndex) === activeIndex"
                      class="col-6 mx-auto"
                    >
                      <v-btn
                        v-if="
                          course.chapters[activeIndex].quiz.length > 0 &&
                          !selected_quiz_submission
                        "
                        :color="primary"
                        class="white--text next-chapter"
                        :to="`/quiz/attempt/${course.chapters[activeIndex].quiz[0].name}`"
                        rounded
                        >Take Quiz</v-btn
                      >
                      <v-btn
                        v-else-if="userCategory === 'Student' && course.progress.progress < 100"
                        :color="primary"
                        class="white--text"
                        @click="
                          finish_chapter($store.state.user.user._id).then(
                            (d) => {
                              maximumIndex = Math.round(
                                (d.progress * course.chapters.length) / 100
                              );
                            }
                          )
                        "
                        >Mark as complete</v-btn
                      >
                    </v-col>
                    <v-col class="col-12">
                      <v-row>
                        <v-col class="col-6">
                          <v-btn
                            v-if="activeIndex > 0"
                            rounded
                            @click="changeActiveChapter(activeIndex - 1)"
                            elevation="0"
                            >Previous chapter</v-btn
                          >
                        </v-col>
                        <v-col class="text-right col-6">
                          <v-btn
                            v-if="
                              activeIndex < maximumIndex &&
                              activeIndex < course.chapters.length - 1
                            "
                            :color="primary"
                            class="white--text next-chapter"
                            @click="changeActiveChapter(activeIndex + 1)"
                            rounded
                            >Next chapter</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row v-else-if="course.chapters.length === 0"
                    >There are no chapters in {{ course.name }}</v-row
                  >
                  <v-row v-else-if="n === 2">
                    <kurious-comments />
                  </v-row>
                  <v-row v-else-if="n === 3">
                    <div
                      v-if="course.chapters[activeIndex].attachments.length > 0"
                      class="attachments"
                    >
                      <div
                        v-for="(attachment, key) in course.chapters[activeIndex]
                          .attachments"
                        :key="key"
                        class="file-listing d-flex"
                      >
                        <div
                          class="downloadable_attachment vertically--centered"
                        >
                          <v-icon color="#000000" x-large
                            >mdi-file{{
                              findIcon(attachment.name)
                            }}-outline</v-icon
                          >
                          <span class="filename text-truncate">{{
                            attachment.name
                          }}</span>
                          <button @click="downloadAttachment(attachment._id)">
                            <svg
                              class="attachment-download"
                              xmlns="http://www.w3.org/2000/svg"
                              width="45"
                              height="45"
                              viewBox="0 0 58 58"
                            >
                              <circle
                                id="Ellipse_215"
                                data-name="Ellipse 215"
                                cx="29"
                                cy="29"
                                r="29"
                                fill="#ffd248"
                              />
                              <g
                                id="Icon_feather-download"
                                data-name="Icon feather-download"
                                transform="translate(16.954 16.954)"
                              >
                                <path
                                  id="Path_1937"
                                  data-name="Path 1937"
                                  d="M28.592,22.5v5.354a2.677,2.677,0,0,1-2.677,2.677H7.177A2.677,2.677,0,0,1,4.5,27.854V22.5"
                                  transform="translate(-4.5 -6.438)"
                                  fill="none"
                                  stroke="#fff"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="3"
                                />
                                <path
                                  id="Path_1938"
                                  data-name="Path 1938"
                                  d="M10.5,15l6.692,6.692L23.885,15"
                                  transform="translate(-5.146 -5.631)"
                                  fill="none"
                                  stroke="#fff"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="3"
                                />
                                <path
                                  id="Path_1939"
                                  data-name="Path 1939"
                                  d="M18,20.562V4.5"
                                  transform="translate(-5.954 -4.5)"
                                  fill="none"
                                  stroke="#fff"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="3"
                                />
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <span v-else
                      >Chapter {{ course.chapters[activeIndex].name }} have no
                      attachments</span
                    >
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "course_details",
  components:{
    loader: ()=> import('@/components/loaders'),
  },
  data: () => ({
    primary: colors.primary,
    activeIndex: -1,
    progressId: "",
    maximumIndex: -1,
    attachments: [],
    showActions: false,
    editorContent: "",
  }),
  computed: {
    ...mapGetters("courses", ["course"]),
    ...mapGetters("quiz_submission", ["selected_quiz_submission"]),
    userCategory() {
      return this.$store.state.user.user.category;
    },
  },
  watch: {
    maximumIndex() {
      if (this.userCategory === "Student") {
        this.activeIndex = this.maximumIndex;
      }
    },
    activeIndex() {
      this.editorContent = "";
      console.log(this.activeIndex);
      this.getChapterMainContent(
        this.course.chapters[this.activeIndex]._id
      ).then((data) => {
        this.editorContent = data;
      });
      if (this.course.chapters[this.activeIndex].quiz.length > 0) {
        this.findQuizSubmissionByStudentAndQuizNames({
          studentName: `${this.$store.state.user.user.surName}_${this.$store.state.user.user.otherNames}`,
          quizName: this.course.chapters[this.activeIndex].quiz[0].name,
        });
      }
    },
  },
  methods: {
    ...mapActions("courses", [
      "findCourseByName",
      "getChapterMainContent",
      "finish_chapter",
    ]),
    ...mapActions("quiz_submission", [
      "findQuizSubmissionByStudentAndQuizNames",
    ]),
    async downloadAttachment(id) {
      const url = `${process.env.VUE_APP_api_service_url}/kurious/file/downloadAttachment/${id}`;
      window.location.href = url;
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
    changeActiveChapter(index) {
      this.activeIndex = index;
      // go to contents
      document.getElementById("content-tab").click();
    },
  },
  created() {
    this.findCourseByName({
      userCategory: this.userCategory.toLowerCase(),
      userId: this.$store.state.user.user._id,
      courseName: this.$route.params.name,
    }).then((course) => {
      if (this.userCategory === "Instructor") {
        this.maximumIndex = this.course.chapters.length - 1;
        this.activeIndex = 0;
      } else {
        this.maximumIndex = Math.round(
          (course.progress.progress * course.chapters.length) / 100
        );
        if (this.maximumIndex > course.chapters.length - 1) {
          this.maximumIndex = course.chapters.length - 1
        }
      }
    });
  },
};
</script>