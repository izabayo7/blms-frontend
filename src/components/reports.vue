<template>
  <v-app id="reports-page">
    <h1>My Reports</h1>
    <div class="table-one">
      <h3>Submissions</h3>
      <v-data-table
        :headers="submissionHeaders"
        :items="submissions"
        :items-per-page="5"
        sort-by="dateOfSubmission"
        class="data-table"
      >
        <template v-slot:item.name="{ item }">
          <router-link
            v-if="item.marked || $store.state.user.category === 'Instructor'"
            class="normal--text"
            :to="`/reports/submission/`+item._id"
          >{{item.name}}</router-link>
        </template>
        <template v-slot:item.marked="{ item }">
          <span :class="item.marked ? 'green--text' : ''">{{item.marked ? 'Marked' : 'Pending..'}}</span>
        </template>
        <template v-slot:no-data>
          <span class="text-h6">Oops You have no submissions.</span>
        </template>
      </v-data-table>
    </div>
    <div v-if="$store.state.user.category === 'Student'" class="table-two">
      <h3>Courses</h3>
      <v-data-table :headers="coursesHeaders" :items="courses" sort-by="name" class="data-table">
        <template v-slot:item.name="{ item }">
          <router-link class="normal--text" :to="`/courses/`+item._id">{{item.name}}</router-link>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="view-icon"
            @click="$router.push(`reports/submissions/${item.name}`)"
          >mdi-eye</v-icon>
        </template>
        <template v-slot:item.status="{ item }">
          <span v-if="item.status === 1">Pending..</span>
          <v-btn v-else rounded small color="#8ceda9">passed</v-btn>
        </template>
        <template v-slot:item.progress="{ item }">
          <v-progress-linear
            :active="false"
            :value="item.progress"
            color="#ffc100"
            class="mt-6 kurious--progressbar"
          />
          <p class="text-caption mb-0 text-left ml-1">{{Math.round(item.progress)}}%</p>
        </template>
        <template v-slot:no-data>
          <span class="text-h6">Oops You have not yet created a quiz.</span>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>
<script>
import Apis from "@/services/apis";
export default {
  data: () => ({
    dialog: false,
    options: { rowsPerPage: 5 },
    progresses: [],
    submissions: [],
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
    courses: [],
  }),
  computed: {
    submissionHeaders() {
      return [
        {
          text: `${
            this.$store.state.user.category === "Student" ? "Course" : "Student"
          } Name`,
          align: "start",
          sortable: false,
          value: "name",
        },
        {
          text: "Name of submission",
          value: "submissionName",
          align: "center",
        },
        {
          text: "Date of submission",
          value: "dateOfSubmission",
          align: "center",
        },
        { text: "Status", value: "marked", align: "center" },
        { text: "Grade", value: "grade", sortable: false, align: "center" },
      ];
    },
  },
  beforeMount() {
    if (this.$store.state.user.category === "Student") {
      this.getCourses();
    }
    this.getSubmissions();
  },
  methods: {
    async getStudentProgresses() {
      try {
        for (const i in this.courses) {
          let response = await Apis.get(
            `studentProgress/${this.$store.state.user._id}/${this.courses[i]._id}`
          );
          this.courses[i].progress = response.data.progress;
        }
      } catch (error) {
        if (error.response) {
          this.maximumIndex = 0;
          this.progress = 0;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
        }
      }
    },
    async getStudentNames() {
      try {
        for (const i in this.submissions) {
          let response = await Apis.get(`student/${this.submissions[i].name}`);
          this.submissions[
            i
          ].name = `${response.data.surName} ${response.data.otherNames}`;
        }
      } catch (error) {
        if (error.response) {
          this.maximumIndex = 0;
          this.progress = 0;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
        }
      }
    },
    // add the total required marks
    async getStudentGrades() {
      try {
        for (const i in this.submissions) {
          let response = await Apis.get(`quiz/${this.submissions[i].quiz}`);
          this.submissions[i].grade += response.data.totalMarks;
        }
      } catch (error) {
        if (error.response) {
          this.maximumIndex = 0;
          this.progress = 0;
        } else if (error.request) {
          this.status = 503;
          this.message = "Service Unavailable";
          this.modal = false;
          this.show = true;
        }
      }
    },
    async getCourses() {
      try {
        let response;
        let facilityCollegeYear = "";
        if (this.$store.state.user.category === "Student") {
          response = await Apis.get(
            `student-facility-college-year/student/${this.$store.state.user._id}`
          );
          facilityCollegeYear = response.data.facilityCollegeYear;
        }
        const url =
          this.$store.state.user.category === "Instructor"
            ? `course/instructor/${this.$store.state.user._id}`
            : this.$store.state.user.category === "Student"
            ? `course/facility-college-year/${facilityCollegeYear}`
            : undefined;
        const courses = await Apis.get(url);
        for (const i in courses.data) {
          this.courses.push({
            _id: courses.data[i]._id,
            name: courses.data[i].name,
            dateStarted: "12/02/2020",
            progress: 0,
            status: i % 2 === 0 ? 1 : 2,
            grade: i % 2 === 0 ? "78/100" : "N/A",
          });
        }
        this.getStudentProgresses();
      } catch (error) {
        console.log(error);
      }
    },
    async getSubmissions() {
      try {
        const url = `quizSubmission/${this.$store.state.user.category.toLowerCase()}/${
          this.$store.state.user._id
        }`;
        const submissions = await Apis.get(url);
        for (const i in submissions.data) {
          this.submissions.push({
            _id: submissions.data[i]._id,
            quiz: submissions.data[i].quiz,
            name:
              this.$store.state.user.category === "Student"
                ? "Economics Basics"
                : submissions.data[i].student,
            submissionName: "Biology Year 1",
            dateOfSubmission: submissions.data[i].createdAt
              .split("T")[0]
              .split("-")
              .reverse()
              .join("/"),
            marked: submissions.data[i].marked,
            grade: submissions.data[i].marked
              ? submissions.data[i].totalMarks + "/"
              : "x/",
          });
        }
        this.getStudentGrades();
        if (this.$store.state.user.category === "Instructor") {
          this.getStudentNames();
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>