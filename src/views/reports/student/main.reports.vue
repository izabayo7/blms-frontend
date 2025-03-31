<template>
  <v-app id="reports-page">
    <div class="table-one">
      <div class="d-flex">
        <h3 class="mr-4" :class="{active : currentView === 'quiz'}" @click="currentView = 'quiz'">Quiz
          Submissions({{ quiz_submissions.length }})</h3>
        <h3 class="mr-4" :class="{active : currentView === 'assignments'}" @click="currentView = 'assignments'">Assignment
          Submissions ({{ assignment_submissions.length }})</h3>
        <h3 :class="{active : currentView === 'exams'}" @click="currentView = 'exams'">Exam
          Submissions ({{ exam_submissions.length }})</h3>
      </div>
      <v-data-table
          :headers="submissionHeaders"
          :items="currentView === 'quiz' ? quiz_submissions : currentView === 'assignments' ? assignment_submissions : exam_submissions"
          :items-per-page="5"
          sort-by="last_submitted"
          class="data-table"
          @click:row="handleRowClick"
      >
        <!-- display user name as a link to the submission -->
        <template v-slot:item.course="{ item }">
          {{ item.name }}
        </template>
        <!-- display the quiz name as alink to that quiz -->
        <template v-slot:item.submission="{ item }">
          {{ item.submissions.length }}
        </template>
        <!-- display the date of submission -->
        <template v-slot:item.last_submitted="{ item }">
          <span class="normal--text">{{
              item.last_submitted | formatDate
            }}</span>
        </template>
        <template v-slot:item.marking_satus="{ item }">
          {{ Math.round(item.marking_status.split('%')[0]) }}%
        </template>
        <!-- display the grades -->
        <template v-slot:item.unread_results="{ item }">
          <div class="unread_results">
            <div
                :class="`${
                item.unread_results ? 'number' : ''
              } vertically--centered`"
            >
              {{ item.unread_results }}
            </div>
            <svg
                v-if="item.unread_results"
                xmlns="http://www.w3.org/2000/svg"
                class="vertically--centered"
                width="29.91"
                height="29.25"
                viewBox="0 0 29.91 29.25"
            >
              <path
                  id="Icon_material-notifications-active"
                  data-name="Icon material-notifications-active"
                  d="M11.37,6.12,9.225,3.975A15.638,15.638,0,0,0,3.045,15.75h3A12.668,12.668,0,0,1,11.37,6.12Zm18.585,9.63h3a15.733,15.733,0,0,0-6.18-11.775L24.645,6.12a12.743,12.743,0,0,1,5.31,9.63ZM27,16.5c0-4.6-2.46-8.46-6.75-9.48V6a2.25,2.25,0,0,0-4.5,0V7.02C11.445,8.04,9,11.88,9,16.5V24L6,27v1.5H30V27l-3-3ZM18,33a2.628,2.628,0,0,0,.6-.06,3.044,3.044,0,0,0,2.16-1.77A3.012,3.012,0,0,0,20.985,30h-6A3.022,3.022,0,0,0,18,33Z"
                  transform="translate(-3.045 -3.75)"
                  fill="red"
              />
            </svg>
          </div>
        </template>
        <template v-slot:no-data>
          <span class="text-h6">Submission list is empty</span>
        </template>
      </v-data-table>
    </div>
    <div v-if="userCategory === 'STUDENT'" class="table-two">
      <h3>Courses</h3>
      <v-data-table
          :headers="coursesHeaders"
          :items="activeCourses"
          class="data-table"
          @click:row="handleRowClick"
      >
        <template v-slot:item.name="{ item }">
          {{ item.name }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
              small
              class="view-icon"
              @click="$router.push(`reports/submissions/${item.name}`)"
          >mdi-eye
          </v-icon
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
              :class="`mt-6 kurious--progressbar reports ${
              item.progress.progress === 100
                ? 'completed-progress'
                : 'ongoing-progress'
            }`"
          />
          <p class="text-caption mb-0 text-left ml-1">
            {{ Math.round(item.progress.progress) }}%
          </p>
        </template>
        <template v-slot:item.grade="{ item }">
          <span>{{ Math.round(item.score) || 0 }}%</span>
        </template>
        <template v-slot:no-data>
          <span class="text-h6">Course list is empty</span>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>
<script>
import {mapGetters, mapActions} from "vuex";

export default {
  data: () => ({
    currentView: 'quiz',
    options: {rowsPerPage: 5},
    coursesHeaders: [
      {
        text: "Course Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      {text: "Date started", value: "dateStarted", align: "center"},
      {text: "Progress", value: "progress", align: "center"},
      {
        text: "Exam Status",
        value: "status",
        sortable: false,
        align: "center",
      },
      {text: "Grade", value: "grade", sortable: false, align: "center"},
    ],
  }),
  computed: {
    submissionHeaders() {
      return [
        {
          text: "Courses",
          align: "start",
          sortable: false,
          value: "course",
        },
        {
          text: "Submissions",
          value: "submission",
          align: "center",
        },
        {
          text: "Last submission date",
          value: "last_submitted",
          align: "center",
        },
        {text: "Marking status", value: "marking_satus", align: "center"},
        {text: "Unread results", value: "unread_results", align: "center"},
      ];
    },
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    ...mapGetters("courses", ["courses"]),
    ...mapGetters("quiz_submission", ["quiz_submissions", "assignment_submissions",'exam_submissions']),
    // only display courses we started
    activeCourses() {
      return this.courses.filter((course) => course.progress);
    },
  },
  methods: {
    ...mapActions("courses", ["getCourses"]),
    ...mapActions("quiz_submission", ["getQuizSubmissions"]),
    handleRowClick(value) {
      if (value.progress)
        this.$router.push(`/courses/preview/${value.name}`)
      else

        this.$router.push(`/reports/${value._id}${value.submissions[0].assignment ? '/assignments' : value.submissions[0].exam ? '/exams' : ''}`)
    },
    returnCourseName(quiz) {
      if (quiz.target.type === "facultyCollegeyear") {
        return "No course";
      }
      for (const i in this.courses) {
        if (
            quiz.target.type === "course" &&
            this.courses[i]._id === quiz.target.id
        ) {
          return this.courses[i].name;
        } else {
          for (const k in this.courses[i].chapters) {
            if (
                quiz.target.type === "chapter" &&
                this.courses[i].chapters[k]._id === quiz.target.id
            ) {
              return this.courses[i].name;
            }
          }
        }
      }
    },
  },
  created() {
    //get courses on page load
    this.getCourses();
    //get submissions on page load
    this.getQuizSubmissions();
  },
};
</script>

<style lang="scss">
.unread_results {
  display: flex;

  svg {
    height: 20px;
  }

  .number {
    color: #ff0000;
    font-weight: 700;
    font-size: 1.1rem;
  }
}
</style>