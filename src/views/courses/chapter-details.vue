<template>
  <div class="my-chapter-details">
    <v-row>
      <v-col class="col-12 title d-block pt-0">{{ course.name }}</v-col>
      <v-col
          v-if="course.chapters[activeIndex].uploaded_video || recorded_video != ''"
          class="col-12 pt-0 col-md-8"
          id="video"
      >
        <!--
        wrong date in recorder
        -->
        <vue-plyr>
          <video
              :src="recorded_video == '' ? `${
              course.chapters[activeIndex].uploaded_video
            }?token=${$session.get('jwt')}` : recorded_video"
          ></video>
        </vue-plyr>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-12"
             :class="{'col-md-8' : !course.chapters[activeIndex].uploaded_content}">
        <!-- <span v-if="course !== undefined">{{course.name}}</span> -->
        <v-tabs background-color="white" color="#ffd248" right v-model="selectedTab">
          <v-tab :key="0" id="content-tab">
            <v-icon class="mx-md-2">mdi-book-open-variant</v-icon>
            Chapter
          </v-tab>
          <v-tab :key="1">
            <v-icon class="mx-md-2">mdi-chat-outline</v-icon>
            Discussions
            {{ totalComments }}
          </v-tab>
          <v-tab :key="2">
            <v-icon class="mx-md-2">mdi-file-download-outline</v-icon>
            Downloads
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
                  <loader
                      v-if="editorContent === undefined"
                      type="2"
                      class="vertically--centered"
                  />
                  <editor
                      v-if="editorContent !== '' && editorContent"
                      :defaultContent="editorContent"
                  />
                  <div v-if="course.chapters[activeIndex].uploaded_content" class="relative">
                    <vue-pdf-app class="pdf-viewer" :config="config"
                                 :pdf="`${course.chapters[activeIndex].uploaded_content_url}?token=${$session.get('jwt')}`">
                    </vue-pdf-app>
                  </div>
                </v-col>
                <v-col class="col-6 mx-auto text-center">
                  <v-btn
                      v-if="
                      course.chapters[activeIndex].quiz.length > 0 &&
                      userCategory === 'STUDENT' &&
                      !selected_quiz_submission
                    "
                      :color="primary"
                      class="white--text next-chapter mb-8"
                      :to="`/quiz/preview/${course.chapters[activeIndex].quiz[0].name}`"
                      rounded
                  >Take Quiz
                  </v-btn
                  >
                  <v-btn
                      v-else-if="Math.round(maximumIndex) === activeIndex && course.chapters[activeIndex].status"
                      :color="primary"
                      class="white--text"
                      @click="markAsCompleted"
                  >Mark as complete
                  </v-btn
                  >
                </v-col>
                <v-col class="col-12">
                  <v-row class="mb-12 mb-md-0">
                    <v-col class="col-6">
                      <v-btn
                          v-if="activeIndex > 0"
                          rounded
                          @click="
                          $emit('changeActiveChapter', {
                            index: activeIndex - 1,
                            id: prevChapter(activeIndex),
                          })
                        "
                          elevation="0"
                      >Previous chapter
                      </v-btn
                      >
                    </v-col>
                    <v-col class="text-right col-6">
                      <v-btn
                          v-if="
                          activeIndex < maximumIndex ||
                          userCategory == 'INSTRUCTOR'
                        "
                          :color="primary"
                          class="white--text next-chapter"
                          @click="
                          $emit('changeActiveChapter', {
                            index: activeIndex + 1,
                            id: nextChapter(activeIndex),
                          })
                        "
                          rounded
                      >Next chapter
                      </v-btn
                      >
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row v-else-if="course.chapters.length === 0"
              >There are no chapters in {{ course.name }}
              </v-row
              >
              <v-row v-else-if="n === 2">
                <unreal-time-discussion-board/>
              </v-row>
              <v-row v-else-if="n === 3">
                <div
                    v-if="course.chapters[activeIndex].attachments.length > 0"
                    class="attachments col col-12"
                >
                  <div
                      v-for="(attachment, key) in course.chapters[activeIndex]
                      .attachments"
                      :key="key"
                      class="file-listing d-flex"
                  >
                    <div class="downloadable_attachment vertically--centered">
                      <v-icon color="#000000" x-large
                      >mdi-file{{ findIcon(attachment.src) }}-outline
                      </v-icon
                      >
                      <span class="filename text-truncate">{{
                          attachment.src
                        }}</span>
                      <button
                          @click="downloadAttachment(attachment.download_link+'?token='+$session.get('jwt'))"
                      >
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
                              :fill="primary"
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
                <div v-else class="col col-12 text-center">
                  <span>There are no attachments</span>
                </div>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UnrealTimeDiscussionBoard from "../../components/Live/UnrealTimeDiscussionBoard";
import {downloadAttachment} from "@/services/global_functions"
import colors from "@/assets/sass/imports/_colors.scss";
import {emit} from "../../services/event_bus";
import Apis from "../../services/apis";

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
  name: "chapter-details",
  components: {
    UnrealTimeDiscussionBoard,
    loader: () => import("@/components/loaders"),
    Editor: () => import("@/components/reusable/Editor"),
  },
  data() {
    return {
      activeIndex: -1,
      editorContent: undefined,
      maximumIndex: -1,
      selectedTab: -1,
      primary: colors.primary,
      chapters: [],
      recorded_video: "",
      config: {
        sidebar: getSidebar(),
        secondaryToolbar: getSecondaryToolbar(),
        toolbar: getToolbar(),
        errorWrapper: true,
      },
    };
  },
  watch: {
    maximumIndex() {
      if (this.userCategory === "STUDENT") {
        this.activeIndex = this.maximumIndex;
      }
    },
    currentRoute() {
      this.immediateFunction();
    },
  },
  computed: {
    ...mapGetters("courses", ["course", "totalComments"]),
    ...mapGetters("quiz_submission", ["selected_quiz_submission"]),

    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    currentRoute() {
      return this.$route.params.id;
    },
  },
  methods: {
    downloadAttachment,
    ...mapActions("courses", [
      "findCourseByName",
      "getChapterMainContent",
      "finish_chapter",
    ]),
    ...mapActions("quiz_submission", ["findQuizSubmissionByUserAndQuizNames"]),
    findRecordedClass() {
      const sessions = this.course.chapters[this.activeIndex].live_sessions.filter(e => e.status == 'FINISHED' && e.record_session)
      if (sessions.length)
        this.recorded_video = `https://recordings.kurious.rw/video/stream/webm/${sessions[0].date.split('T')[0]}-${sessions[0]._id}`
      else this.recorded_video = ""
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
    changeActiveChapter({index, id}) {
      this.activeIndex = index;
      const path = `/courses/${this.$route.params.name}/chapter/${index}/${id}`;
      if (this.$route.fullPath != path) {
        this.$router.push(path);
      }
    },
    nextChapter(idx) {
      return idx < this.course.chapters.length
          ? this.course.chapters[idx + 1]._id
          : null;
    },
    prevChapter(idx) {
      return idx > 0 ? this.course.chapters[idx - 1]._id : idx === 0 ? 0 : null;
    },
    markAsCompleted() {
      this.finish_chapter(this.$store.state.user.user.user_name).then((d) => {
        this.maximumIndex = Math.round(
            (d.progress * this.course.chapters.length) / 100
        );
        this.$emit("changeMaximumIndex", this.activeIndex + 1);
        this.$emit("changeActiveChapter", {
          index: this.activeIndex + 1,
          id: this.nextChapter(this.activeIndex),
        });
      });
    },
    async immediateFunction() {
      const {index, id} = this.$route.params;
      this.activeIndex = index;

      // find course based on the id
      this.findCourseByName({
        user_name: this.$store.state.user.user.user_name,
        courseName: this.$route.params.name,
      }).then((course) => {
        const total_chapters = this.course.chapters.length;
        if (this.userCategory === "STUDENT") {
          this.maximumIndex = Math.round(
              (this.course.progress.progress * total_chapters) / 100
          );
          if (this.maximumIndex > total_chapters - 1) {
            this.maximumIndex = total_chapters - 1;
          }
        }

        let index = 0;
        for (const i in course.chapters) {
          if (course.chapters[i]._id == this.$route.params.id) {
            this.$store.commit(
                "courses/SET_TOTAL_COMMENTS_ON_A_CHAPTER",
                course.chapters[i].commentsLength
            );
            index = parseInt(i);
            break;
          }
        }
        this.activeIndex = index;
      });
      if (this.course.chapters[this.activeIndex].quiz.length) {
        // find quiz_submission
        this.findQuizSubmissionByUserAndQuizNames({
          userName: this.$store.state.user.user.user_name,
          quizName: this.course.chapters[this.activeIndex].quiz[0].name,
        });
      }
      this.editorContent = undefined;
      //getting chapter content
      this.getChapterMainContent(id).then((d) => {
        this.editorContent = d;
      });

      this.findRecordedClass();
      // go to contents
      // document.getElementById("content-tab").click();
      await Apis.create('user_logs', {course_id: this.course._id})
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.commit("courses/DELETE_TOTAL_COMMENTS_ON_A_CHAPTER"); //delete comments number to make sure that next comments doesn't have previously chapter comments number
    emit("routeUpdate", to.params.id);
    next();
  },
  created() {
    this.immediateFunction();
  },
  beforeMount() {
    this.selectedTab = this.$route.query.tab == 'discussion' ? 1 : 0
  },
  mounted() {
    this.chapters = this.course.chapters.map((x) => x._id);
  },
};
</script>

<style lang="scss">
.pdf-viewer {
  height: 540px;
  width: 100%;

  .toolbar {
    display: none;
  }

  #viewerContainer {
    top: 0px
  }

  .pdfViewer .page {
    border: none;
  }
}
</style>
