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
        <!-- display user name as a link to the submission -->
        <template v-slot:item.course_name="{ item }">
          <router-link
            class="normal--text"
            to="/"
            >{{
              returnCourseName(item.target)
            }}</router-link
          >
        </template>
        <!-- display user name as a link to the submission -->
        <template v-slot:item.chapter_name="{ item }">
          <router-link
            class="normal--text"
            to="/"
            >{{
              returnChapterName(item.target)
            }}</router-link
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
    <div v-if="userCategory === 'STUDENT'" class="table-two">
      <h3>Courses</h3>
      <v-data-table
        :headers="coursesHeaders"
        :items="activeCourses"
        class="data-table"
      >
        <template v-slot:item.name="{ item }">
          <router-link
            class="normal--text"
            :to="`/courses/preview/${item.name}`"
            >{{ item.name }}</router-link
          >
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="view-icon"
            @click="$router.push(`reports/submissions/${item.name}`)"
            >mdi-eye</v-icon
          >
        </template>
        <!-- display the date of starting the course -->
        <template v-slot:item.dateStarted="{ item }">
          <span class="normal--text">{{
            item.progress.dateStarted | formatDate
          }}</span>
        </template>
        <template v-slot:item.status="{ item }">
          <span v-if="item.status === 1">Pending..</span>
          <v-btn v-else rounded small color="#8ceda9">passed</v-btn>
        </template>
        <template v-slot:item.progress="{ item }">
          <v-progress-linear
            :active="false"
            :value="item.progress.progress"
            :class="`mt-6 kurious--progressbar ${
              item.progress.progress === 100
                ? 'completed-progress'
                : 'ongoing-progress'
            }`"
          />
          <p class="text-caption mb-0 text-left ml-1">
            {{ Math.round(item.progress.progress) }}%
          </p>
        </template>
        <template v-slot:no-data>
          <span class="text-h6">Oops You don't have a course.</span>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data: () => ({
    options: { rowsPerPage: 5 },
    coursesHeaders: [
      {
        text: "Course Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Date started", value: "dateStarted", align: "center" },
      { text: "Progress", value: "progress", align: "center" },
      {
        text: "Exam Status",
        value: "status",
        sortable: false,
        align: "center",
      },
      { text: "Grade", value: "grade", sortable: false, align: "center" },
    ],
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
          text: "Date of submission",
          value: "dateOfSubmission",
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