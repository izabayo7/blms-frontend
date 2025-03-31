<template>
  <v-container class="mx-0 pa-0" fluid>
    <v-row v-if="course && activeIndex > -1" id="courseDetails">
      <!-- button to show chapters list in small devices -->
      <v-btn
          @click="$store.commit('sidebar_navbar/TOGGLE_PAGE_ACTIONS_VISIBILITY')"
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
        <chapter-list
            @change-chapter="changeActiveChapter"
            :chapters="course.chapters"
            :currentIndex="activeIndex"
            :maximumIndex="maximumIndex"
            :progress="
            userCategory === 'INSTRUCTOR' || userCategory === 'ADMIN' ? 0 : course.progress.progress
          "
        />
      </v-col>
      <!-- chapters list for small devices -->
      <page-actions
          class="hidden-md-and-up"
      >
        <chapter-list
            @change-chapter="changeActiveChapter"
            :chapters="course.chapters"
            :currentIndex="activeIndex"
            :maximumIndex="maximumIndex"
            :progress="
            userCategory === 'INSTRUCTOR' || userCategory === 'ADMIN' ? 0 : course.progress.progress
          "
        />
      </page-actions>
      <!-- the course main content -->
      <v-col class="col-12 col-md-9 course-content customScroll pa-3">
        <!--        <chapter-details :activeIndex="activeIndex" />-->
        <router-view
            @changeActiveChapter="changeActiveChapter"
            @changeMaximumIndex="changeMaximumIndex"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import colors from "@/assets/sass/imports/_colors.scss";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "course_details",
  components: {
    ChapterList: () => import("@/components/reusable/ChapterList"),
    PageActions: () => import("@/components/reusable/PageActions"),
  },
  data: () => ({
    primary: colors.primary,
    activeIndex: -1,
    progressId: "",
    maximumIndex: -1,
    attachments: [],
  }),
  computed: {
    ...mapGetters("courses", ["course", "selectedChapter"]),
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    limit() {
      const chapter = this.course.chapters.filter(x => x.status === 0)
      return chapter.length ? chapter[chapter.length - 1]._id : undefined
    }
  },
  watch: {
    maximumIndex() {
      if (this.userCategory === "STUDENT") {
        this.activeIndex = this.maximumIndex;
        //route to active index
        const id = this.course.chapters[this.maximumIndex]._id;

        const path = `/courses/${this.$route.params.name}/chapter/${this.maximumIndex}/${id}`;
        if (this.$route.fullPath != path) {
          this.$router.push(path);
        }
      }
    },
  },
  methods: {
    ...mapActions("courses", [
      "findCourseByName",
      "getChapterMainContent",
      "finish_chapter",
    ]),
    changeMaximumIndex(index) {
      if (index == this.course.chapters.length) this.$router.push("/courses");
      else this.maximumIndex = index;
    },
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
    changeActiveChapter({index, id}) {
      this.activeIndex = index;
      const path = `/courses/${this.$route.params.name}/chapter/${index}/${id}`;
      if (this.$route.fullPath != path) {
        this.$router.push(path);
      }
    },
  },
  created() {
    // const {index,id} = this.$route.params

    this.findCourseByName({
      user_name: this.$store.state.user.user.user_name,
      courseName: this.$route.params.name,
    }).then((course) => {
      const total_chapters = course.chapters.length;
      if (this.userCategory === "INSTRUCTOR" || this.userCategory === 'ADMIN') {
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

      const index = this.userCategory == "STUDENT" ? this.maximumIndex : 0;
      const path = `/courses/${this.$route.params.name}/chapter/0/${course.chapters[index]._id}`;
      if (this.$route.fullPath !== path) this.$router.push(path);
      this.$store.commit(
          "courses/set_selected_chapter",
          course.chapters[index]._id
      );
    });
  },
};
</script>
