<template>
  <v-app id="reports-page" class="pa-0 instructor_reports">
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
          <router-link class="normal--text d-block" to="/">{{
            item.target.course.name
          }}</router-link>
          <router-link class="normal--text small" to="/">{{
            `${item.target.faculty_college_year.faculty_college.faculty.name} year ${item.target.faculty_college_year.college_year.digit}`
          }}</router-link>
        </template>
        <template v-slot:item.chapter_name="{ item }">
          <router-link class="normal--text" to="/">{{
            item.target.chapter.name
          }}</router-link>
        </template>
        <template v-slot:item.total_marks="{ item }">
          <span class="normal--text" to="/">{{ item.total_marks }}</span>
        </template>
        <template v-slot:item.marking_status="{ item }">
          <span class="normal--text" to="/">{{ item.marking_status }}</span>
        </template>
        <template v-slot:item.total_submissions="{ item }">
          <span class="normal--text">{{ item.submissions.length }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-row class="actions pa-0">
            <v-col class="pa-0 pr-1 py-1">
              <v-btn
                class="white--text"
                :color="primary"
                :to="`/reports/${item._id}`"
              >
                View submissions
              </v-btn></v-col
            >
            <v-col class="pa-0 pl-1 py-1">
              <v-btn
                color="#02A617"
                class="white--text"
                :to="`/submissions/${item.name}`"
              >
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
    <div class="table-one">
      <h3>Classes</h3>
      <v-data-table
        :headers="courseHeaders"
        :items="courses"
        :items-per-page="5"
        sort-by="dateOfSubmission"
        class="data-table courses"
      >
        <template v-slot:item.course_name="{ item }">
          <router-link class="normal--text d-block" to="/">{{
            item.name
          }}</router-link>
        </template>
        <template v-slot:item.student_group="{ item }">
          <router-link class="normal--text" to="/">{{
            `${item.faculty_college_year.faculty_college.faculty.name} year ${item.faculty_college_year.college_year.digit}`
          }}</router-link>
        </template>
        <template v-slot:item.total_students="{ item }">
          <span class="normal--text semi_bold_text" to="/">{{
            item.attendedStudents
          }}</span>
        </template>
        <template v-slot:item.last_updated="{ item }">
          <span class="normal--text semi_bold_text" to="/">{{
            item.updatedAt | formatDate
          }}</span>
        </template>
        <template v-slot:item.evaluations="{ item }">
          <span class="normal--text semi_bold_text"
            >200 Marks{{ "" + item ? "" : "nope" }}</span
          >
        </template>
        <template v-slot:item.success_rate="{ item }">
          <span class="normal--text semi_bold_text"
            >65%{{ "" + item ? "" : "nope" }}</span
          >
        </template>
        <template v-slot:item.actions="{ item }">
          <v-row class="actions pa-0">
            <v-col class="pa-0 py-1">
              <v-btn
                class="white--text"
                :color="primary"
                :to="`/submissions/${item.name}`"
              >
                Make announcement
              </v-btn></v-col
            >
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
        },
        {
          text: "Submissions",
          value: "total_submissions",
        },
        {
          text: "Maximum Marks",
          value: "total_marks",
        },
        { text: "Marking status", value: "marking_status", align: "center" },
        { text: "", value: "actions", align: "center", sortable: false },
      ];
    },
    courseHeaders() {
      return [
        {
          text: "Course name",
          align: "start",
          sortable: false,
          value: "course_name",
        },
        {
          text: "Students group",
          value: "student_group",
        },
        {
          text: "Students",
          value: "total_students",
        },
        {
          text: "Last Updated",
          value: "last_updated",
        },
        { text: "Evaluations", value: "evaluations", align: "center" },
        { text: "Success rate", value: "success_rate", align: "center" },
        { text: "", value: "actions", align: "center", sortable: false },
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
<style lang="scss">
.instructor_reports {
  // font-family: Poppins;
  .normal--text {
    font-size: 18px;
    font-weight: 500;
    &.small {
      font-size: 12px;
    }
  }
  // .actions {
  //   .white--text {
  //     font-size: 0.6rem;
  //   }
  // }
  .data-table {
    &.courses {
      .normal--text {
        font-size: 14px;
        font-weight: 500;
      }
      .semi_bold_text {
        font-weight: 700;
      }
    }
  }
}
</style>