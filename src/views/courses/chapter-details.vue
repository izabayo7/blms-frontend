<template>
  <div class="my-chapter-details">
    <v-row>
      <v-col class="col-12 title d-block pt-0">{{ course.name }}</v-col>
      <v-col
        v-if="course.chapters[activeIndex].uploaded_video"
        class="col-8 pt-0"
        id="video"
      >
        <vue-plyr>
          <video
            :src="`${
              course.chapters[activeIndex].uploaded_video
            }?token=${$session.get('jwt')}`"
          ></video>
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
            {{ totalComments }}
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
                  <loader
                    v-if="editorContent === undefined"
                    type="2"
                    class="vertically--centered"
                  />
                  <kurious-editor
                    v-if="editorContent !== '' && editorContent"
                    :defaultContent="editorContent"
                  />
                </v-col>
                <v-col
                  v-if="Math.round(maximumIndex) === activeIndex"
                  class="col-6 mx-auto text-center"
                >
                  <v-btn
                    v-if="
                      course.chapters[activeIndex].quiz.length > 0 &&
                      userCategory === 'STUDENT' &&
                      !selected_quiz_submission
                    "
                    :color="primary"
                    class="white--text next-chapter"
                    :to="`/quiz/attempt/${course.chapters[activeIndex].quiz[0].name}`"
                    rounded
                    >Take Quiz</v-btn
                  >
                  <v-btn
                    v-else-if="
                      userCategory === 'STUDENT' &&
                      course.progress.progress < 100
                    "
                    :color="primary"
                    class="white--text"
                    @click="markAsCompleted"
                    >Mark as complete</v-btn
                  >
                </v-col>
                <v-col class="col-12">
                  <v-row>
                    <v-col class="col-6">
                      <v-btn
                        v-if="activeIndex > 0"
                        rounded
                        @click="
                          changeActiveChapter({
                            index: activeIndex - 1,
                            id: prevChapter(activeIndex),
                          })
                        "
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
                        @click="
                          changeActiveChapter({
                            index: activeIndex + 1,
                            id: nextChapter(activeIndex),
                          })
                        "
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
                <unreal-time-discussion-board />
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
                        >mdi-file{{ findIcon(attachment.src) }}-outline</v-icon
                      >
                      <span class="filename text-truncate">{{
                        attachment.src
                      }}</span>
                      <button
                        @click="downloadAttachment(attachment.download_link)"
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
import { mapActions, mapGetters } from "vuex";
import UnrealTimeDiscussionBoard from "../../components/Live/UnrealTimeDiscussionBoard";
import colors from "@/assets/sass/imports/_colors.scss";
import { emit } from "../../services/event_bus";

export default {
  name: "chapter-details",
  components: {
    UnrealTimeDiscussionBoard,
    loader: () => import("@/components/loaders"),
  },
  data() {
    return {
      activeIndex: -1,
      editorContent: undefined,
      maximumIndex: -1,
      primary: colors.primary,
      chapters: [],
    };
  },
  watch: {
    maximumIndex() {
      if (this.userCategory === "STUDENT") {
        this.activeIndex = this.maximumIndex;
      }
    },
  },
  computed: {
    ...mapGetters("courses", ["course", "totalComments"]),
    ...mapGetters("quiz_submission", ["selected_quiz_submission"]),

    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
  methods: {
    ...mapActions("courses", [
      "findCourseByName",
      "getChapterMainContent",
      "finish_chapter",
    ]),
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
    changeActiveChapter({ index, id }) {
      this.activeIndex = index;
      this.$router.push(
        `/courses/${this.$route.params.name}/chapter/${index}/${id}`
      );
    },
    async downloadAttachment(url) {
      window.location.href = url;
    },
    nextChapter(idx) {
      const index = this.chapters.indexOf(idx);

      return index < this.chapter.length - 1
        ? this.chapters[index + 1]
        : index === this.chapter.length
        ? this.chapters[index]
        : null;
    },
    prevChapter(idx) {
      const index = this.chapters.indexOf(idx);
      return index > 0 ? this.chapters[index + 1] : index === 0 ? 0 : null;
    },
    markAsCompleted() {
      this.finish_chapter(this.$store.state.user.user.user_name).then((d) => {
        this.maximumIndex = Math.round(
          (d.progress * this.course.chapters.length) / 100
        );
        this.changeActiveChapter({
          index: this.activeIndex + 1,
          id: this.nextChapter(this.activeIndex),
        });
      });
    },
    immediateFunction() {
      const { index, id } = this.$route.params;
      this.activeIndex = index;

      // find course based on the id
      this.findCourseByName({
        user_name: this.$store.state.user.user.user_name,
        courseName: this.$route.params.name,
      }).then((course) => {
        const total_chapters = course.chapters.length;
        if (this.userCategory === "INSTRUCTOR" && !index && !id) {
          this.maximumIndex = total_chapters - 1;
          this.activeIndex = 0;
        } else {
          this.maximumIndex = Math.round(
            (course.progress.progress * total_chapters) / 100
          );
          if (this.maximumIndex > total_chapters - 1) {
            this.maximumIndex = total_chapters - 1;
          }
        }
      });

      //getting chapter content
      this.getChapterMainContent(id).then((d) => {
        this.editorContent = d;
      });

      // go to contents
      // document.getElementById("content-tab").click();
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.commit("courses/DELETE_TOTAL_COMMENTS_ON_A_CHAPTER"); //delete comments number to make sure that next comments doesn't have previously chapter comments number
    emit("routeUpdate", to.params.id);

      try{
        next();
      }catch (e) {
        console.log(e)
      }
  },
  created() {
    this.immediateFunction();
  },
  mounted() {
    this.chapters = this.course.chapters.map((x) => x._id);
  },
};
</script>

<style scoped>
</style>