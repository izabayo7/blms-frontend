<template>
  <v-app id="reports-page" class="pa-0">
    <div class="table-one">
      <h3>Submissions</h3>
      <v-data-table
        :headers="submissionHeaders"
        :items="quiz_submissions"
        :items-per-page="5"
        sort-by="dateOfSubmission"
        class="data-table"
      >
        <template v-slot:item.course_name="{ item }">
          <router-link
            class="normal--text"
            to="/"
            >{{
              item.target.course.name
            }}</router-link
          >
        </template>
        <template v-slot:item.chapter_name="{ item }">
          <router-link
            class="normal--text"
            to="/"
            >{{
              item.target.chapter.name
            }}</router-link
          >
        </template>
        <template v-slot:item.total_submissions="{ item }">
          <span
            class="normal--text"
            >{{
              item.submissions.length
            }}</span
          >
        </template>
        <template v-slot:item.actions="{ item }">
          <v-row class="actions">
           <v-col>
            <v-btn class="white--text" :color="primary" :to="`/submissions/${item.name}`">
              View submissions
            </v-btn></v-col>
            <v-col>
            <v-btn color="#3CE970" class="white--text" :to="`/submissions/${item.name}`">
              Release marks
            </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:no-data>
          <span class="text-h6">Oops You have no submissions.</span>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import colors from "@/assets/sass/imports/_colors.scss";
export default {
    data: () => ({
    primary: colors.primary,
  }),
  computed: {
    submissionHeaders() {
      return [
        {
          text: "Courses",
          align: "start",
          sortable: false,
          value: "course_name",
        },
        {
          text: "Chapter",
          value: "chapter_name",
          align: "center",
        },
        {
          text: "Submissions",
          value: "total_submissions",
          align: "center",
        },
        {
          text: "Maximum Marks",
          value: "total_marks",
          align: "center",
        },
        { text: "Marking status", value: "marking_status", align: "center" },
        { text: "", value: "actions", align: "center" },
      ];
    },
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    ...mapGetters("courses", ["courses"]),
    ...mapGetters("quiz_submission", ["quiz_submissions"]),
    // only display courses we started
    activeCourses() {
      return this.courses.filter((course) => course.progress);
    },
  },
  methods: {
    ...mapActions("courses", ["getCourses"]),
    ...mapActions("quiz_submission", ["getQuizSubmissions"]),
  },
  created() {
    //get courses on page load
    this.getCourses({
      user_name: this.$store.state.user.user.user_name,
    });
    //get submissions on page load
    this.getQuizSubmissions({
      user_name: this.$store.state.user.user.user_name,
    });
  },
};
</script>