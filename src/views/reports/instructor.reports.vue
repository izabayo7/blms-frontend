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
              returnCourseName(item.target)
            }}</router-link
          >
        </template>
        <template v-slot:item.chapter_name="{ item }">
          <router-link
            class="normal--text"
            to="/"
            >{{
              returnChapterName(item.target)
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
        <!-- display the date of submission -->
        <!-- <template v-slot:item.dateOfSubmission="{ item }">
          <span class="normal--text">{{ item.createdAt | formatDate }}</span>
        </template>
        <template v-slot:item.marked="{ item }">
          <span
            :class="`font-weight-bold ${item.marked ? 'green--text' : ''}`"
            >{{ item.marked ? "Marked" : "Pending.." }}</span
          >
        </template> -->
        <!-- display the grades -->
        <!-- <template v-slot:item.grade="{ item }">
          <span class="normal--text">{{
            (item.marked ? item.total_marks : "") + "/" + item.quiz.total_marks
          }}</span>
        </template> -->
        <template v-slot:no-data>
          <span class="text-h6">Oops You have no submissions.</span>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
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
        { text: "Status", value: "marked", align: "center" },
        { text: "Grade", value: "grade", align: "center" },
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
    returnCourseName(quiz_target) {
      if (quiz_target.type === "faculty_college_year") {
        return "No course";
      }
      else if(quiz_target.type == 'chapter'){
        return quiz_target.chapter.course.name;
      }
      else if(quiz_target.type == 'course'){
        return quiz_target.course.name;
      }
    },
    returnChapterName(quiz_target) {
      if(quiz_target.type == 'chapter'){
        return quiz_target.chapter.name;
      }
      else {
        return '-';
      }
    },
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