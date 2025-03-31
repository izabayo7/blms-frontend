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
          <router-link class="normal--text" :to="'/'+item.name">{{item.name}}</router-link>
        </template>
        <template v-slot:item.marked="{ item }">
          <span :class="item.marked ? 'green--text' : ''">{{item.marked ? 'Marked' : 'Pending..'}}</span>
        </template>
      </v-data-table>
    </div>
    <div class="table-two">
      <h3>Courses</h3>
      <v-data-table :headers="coursesHeaders" :items="courses" sort-by="name" class="data-table">
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
          <v-progress-linear :active="false" :value="item.progress" color="#ffc100" class="mt-6 kurious--progressbar" />
          <p class="text-caption mb-0 text-left ml-1">{{item.progress}}%</p>
        </template>
      </v-data-table>
    </div>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    options: { rowsPerPage: 5 },
    submissionHeaders: [
      {
        text: "Course Name",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Name of submission", value: "submissionName", align: "center" },
      {
        text: "Date of submission",
        value: "dateOfSubmission",
        align: "center",
      },
      { text: "Status", value: "marked", align: "center" },
      { text: "Grade", value: "grade", sortable: false, align: "center" },
    ],
    submissions: [
      {
        name: "Economics Basics",
        submissionName: "Biology Year 1",
        dateOfSubmission: "12/01/2020",
        marked: true,
        grade: "20/30",
      },
      {
        name: "Computer Science",
        submissionName: "Chemistry year 1",
        dateOfSubmission: "14/01/2020",
        marked: false,
        grade: "N/A",
      },
      {
        name: "Economics Basics",
        submissionName: "Biology Year 1",
        dateOfSubmission: "12/01/2020",
        marked: true,
        grade: "20/30",
      },
      {
        name: "Computer Science",
        submissionName: "Chemistry year 1",
        dateOfSubmission: "14/01/2020",
        marked: false,
        grade: "N/A",
      },
      {
        name: "Economics Basics",
        submissionName: "Biology Year 1",
        dateOfSubmission: "12/01/2020",
        marked: true,
        grade: "20/30",
      },
    ],
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
    courses: [
      {
        name: "Economics Basics",
        dateStarted: "12/01/2020",
        progress: "80",
        status: 1,
        grade: "N/A",
      },
      {
        name: "Computer Science",
        dateStarted: "12/02/2020",
        progress: "100",
        status: 2,
        grade: "78/100",
      },
    ],
  }),
};
</script>