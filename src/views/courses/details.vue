<template>
  <v-container class="mx-0 pa-0" fluid>
    <v-row v-if="course !== undefined" id="courseDetails">
      <!-- button to show chapters list in small devices -->
      <v-btn
        @click="showActions=true"
        class="hidden-md-and-up mr-n8 white--text"
        color="#FFC100"
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
          @changeChapter="changeActiveChapter"
          :chapters="course.chapters"
          :currentIndex="activeIndex"
          :maximumIndex="maximumIndex"
          :progress="course.progress.progress"
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
          :progress="course.progress.progress"
        />
      </kurious-page-actions>
      <!-- the course main content -->
      <v-col class="col-12 col-md-9 course-content customScroll pa-3">
        <v-row>
          <v-col class="col-12 title d-block">{{course.name}}</v-col>
          <v-col v-if="course.chapters[activeIndex].mainVideo" class="col-12" id="video">
            <vue-plyr>
              <video :src="course.chapters[activeIndex].mainVideo"></video>
            </vue-plyr>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
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
                  <v-row v-if="course.chapters.length > 0 && n===1">
                    <v-col
                      class="col-12 title d-block"
                    >Chapter {{activeIndex + 1}}: {{course.chapters[activeIndex].name }}</v-col>
                    <v-col class="col-12 description">
                      <p class="my-4">{{course.chapters[activeIndex].description}}</p>
                    </v-col>
                    <v-col class="col-12">
                      <kurious-editor v-if="editorContent !== ''" :defaultContent="editorContent" />
                    </v-col>
                    <v-col
                      v-if="Math.round(maximumIndex) === activeIndex"
                      class="col-6 col-md-4 mx-auto"
                    >
                      <v-btn
                        v-if="course.chapters[activeIndex].quiz.length > 0"
                        color="#FFC100"
                        class="white--text next-chapter"
                        @click="changeActiveChapter(activeIndex + 1)"
                        rounded
                      >Take Quiz</v-btn>
                      <v-btn
                        v-else
                        color="green"
                        class="white--text"
                        @click="proceed"
                      >Mark as complete</v-btn>
                    </v-col>
                    <v-col class="col-12">
                      <v-row>
                        <v-col class="col-6">
                          <v-btn
                            v-if="activeIndex > 0"
                            rounded
                            @click="changeActiveChapter(activeIndex - 1)"
                            elevation="0"
                          >Previous chapter</v-btn>
                        </v-col>
                        <v-col class="text-right col-6">
                          <v-btn
                            v-if="activeIndex < maximumIndex && activeIndex < course.chapters.length - 1"
                            color="#FFC100"
                            class="white--text next-chapter"
                            @click="changeActiveChapter(activeIndex + 1)"
                            rounded
                          >Next chapter</v-btn>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                  <v-row
                    v-else-if="course.chapters.length === 0"
                  >There are no chapters in {{course.name}}</v-row>
                  <v-row v-else-if="n === 2">
                    <kurious-comments />
                  </v-row>
                  <v-row v-else-if="n === 3">
                    <div
                      v-if="course.chapters[activeIndex].attachments.length > 0"
                      class="attachments"
                    >
                      <div
                        v-for="(attachment, key) in course.chapters[activeIndex].attachments"
                        :key="key"
                        class="file-listing d-flex"
                      >
                        <div class="downloadable_attachment vertically--centered">
                          <v-icon
                            color="#000000"
                            x-large
                          >mdi-file{{findIcon(attachment.name)}}-outline</v-icon>
                          <span class="filename text-truncate">{{attachment.name}}</span>
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
                    <span v-else>Chapter {{course.chapters[activeIndex].name}} have no attachments</span>
                  </v-row>
                </v-container>
              </v-tab-item>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <kurious-dialog :show="show" :message="message" :status="status">
      <!-- <v-icon slot="icon" size="55" dark>mdi-clipboard-text-multiple-outline</v-icon> -->
      <v-icon slot="icon" size="55" dark>mdi-barley</v-icon>
      <v-row slot="actions">
        <v-col class="col-6 mx-auto my-0">
          <v-btn color="mx-2" @click="show = false">Go to Back</v-btn>
          <v-btn color="mx-2" @click="show = false">Reload</v-btn>
        </v-col>
      </v-row>
    </kurious-dialog>
  </v-container>
</template>

<script>
import Apis from "@/services/apis";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CourseDetails",
  data: () => ({
    activeIndex: undefined,
    maximumIndex: 0,
    show: false,
    message: "",
    progress: -1,
    progressId: "",
    modal: true,
    attachments: [],
    status: 200,
    showActions: false,
    editorContent: "",
  }),
  computed: {
    ...mapGetters("courses", ["course"])
    },
  watch: {
    activeIndex() {
      this.maximumIndex =
        (this.course.progress.progress * this.course.chapters.length) / 100;
      this.editorContent = "";
      this.getChapterMainContent(
        this.course.chapters[this.activeIndex]._id
      ).then((data) => {
        this.editorContent = data;
      });
    },
  },
  methods: {
    ...mapActions("courses", ["findCourseByName", "getChapterMainContent"]),
    async proceed() {
      try {
        let response;
        if (this.maximumIndex === 0) {
          response = await Apis.create("studentProgress", {
            student: this.$store.state.user._id,
            course: this.$route.params.id,
            chapter: this.chapters[this.activeIndex]._id,
          });
          this.progressId = response.data._id;
        } else {
          response = await Apis.update("studentProgress", this.progressId, {
            student: this.$store.state.user._id,
            course: this.$route.params.id,
            chapter: this.chapters[this.activeIndex]._id,
          });
        }
        this.progress = response.data.progress;
        this.maximumIndex++;
        this.changeActiveChapter(this.activeIndex + 1);
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
    async downloadAttachment(id) {
      const url = `http://localhost:7070/kurious/file/downloadAttachment/${id}`;
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
      userCategory: this.$store.state.user.category.toLowerCase(),
      userId: this.$store.state.user._id,
      courseName: this.$route.params.name,
    }).then((course) => {
      this.course = course;
      console.log(this.course);
      this.activeIndex = 0;
    });
  },
};
</script>