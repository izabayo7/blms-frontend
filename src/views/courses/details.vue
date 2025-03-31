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
      <v-col class="col-3 hidden-sm-and-down pt-0 fill-height">
        <kurious-chapter-list
          @change-chapter="changeActiveChapter"
          :chapters="course.chapters"
          :currentIndex="activeIndex"
          :maximumIndex="maximumIndex"
          :progress="
            userCategory === 'INSTRUCTOR' ? 0 : course.progress.progress
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
            userCategory === 'INSTRUCTOR' ? 0 : course.progress.progress
          "
        />
      </kurious-page-actions>
      <!-- the course main content -->
      <v-col class="col-12 col-md-9 course-content customScroll pa-3">
        <!--        <chapter-details :activeIndex="activeIndex" />-->
        <router-view /> </v-col
      >>
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
import { mapActions, mapGetters } from "vuex";

// import ChapterDetails from "./chapter-details";
export default {
  name: "course_details",
  components: {
    // ChapterDetails,
  },
  data: () => ({
    primary: colors.primary,
    activeIndex: -1,
    progressId: "",
    maximumIndex: -1,
    attachments: [],
    showActions: false,
  }),
  computed: {
    ...mapGetters("courses", ["course", "selectedChapter"]),
    ...mapGetters("quiz_submission", ["selected_quiz_submission"]),
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
  },
  watch: {
    maximumIndex() {
      if (this.userCategory === "STUDENT") {
        this.activeIndex = this.maximumIndex;
        //route to active index
        const id = this.course.chapters[this.maximumIndex]._id;
        this.$router.push(
          `/courses/${this.$route.params.name}/chapter/${this.maximumIndex}/${id}`
        );
      }
    },
  },
  methods: {
    ...mapActions("courses", [
      "findCourseByName",
      "getChapterMainContent",
      "finish_chapter",
    ]),
    ...mapActions("quiz_submission", ["findQuizSubmissionByUserAndQuizNames"]),
    async downloadAttachment(url) {
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
    changeActiveChapter({ index, id }) {
      this.activeIndex = index;
      this.$router.push(
        `/courses/${this.$route.params.name}/chapter/${index}/${id}`
      );
    },
  },
  created() {
    // const {index,id} = this.$route.params

    this.findCourseByName({
      user_name: this.$store.state.user.user.user_name,
      courseName: this.$route.params.name,
    }).then((course) => {
      const total_chapters = course.chapters.length;
      if (this.userCategory === "INSTRUCTOR") {
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
      this.$router.push(
        `/courses/${this.$route.params.name}/chapter/0/${course.chapters[0]._id}`
      );
      this.$store.commit(
        "courses/set_selected_chapter",
        course.chapters[0]._id
      );
    });
  },
};
</script>