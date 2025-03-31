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
          @click:row="handleRowClick"
      >
        <template v-slot:item.course_name="{ item }">
          <span class="normal--text d-block">{{
              item.target.course.name
            }}</span>
          <span class="normal--text small">{{
              item.target.course.user_group.name
            }}</span>
        </template>
        <template v-slot:item.chapter_name="{ item }">
          <span class="normal--text">{{
              item.target.chapter.name
            }}</span>
        </template>
        <template v-slot:item.total_marks="{ item }">
          <span class="normal--text">{{ item.total_marks }}</span>
        </template>
        <template v-slot:item.marking_status="{ item }">
          <span class="normal--text">{{ Math.round(item.marking_status.split('%')[0]) }}%</span>
        </template>
        <template v-slot:item.total_submissions="{ item }">
          <span class="normal--text">{{ item.submissions.length }}</span>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-row class="actions pa-0">
            <v-col class="pa-0 px-1 py-1">
              <v-btn
                  color="#02A617"
                  class="white--text"
                  :disabled="item.status == 2"
                  @click.stop="
                  set_modal({
                    template: 'action_confirmation',
                    method: {
                      action: 'quiz/release_marks',
                      parameters: { id: item._id, quizName: item.name,user_group: item.target.course.user_group._id},
                    },
                    title: 'Release Marks',
                    message: 'Are you sure you want to release marks for this quiz?',
                  })
                "
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
      <h3>Courses</h3>
      <v-data-table
          :headers="courseHeaders"
          :items="courses"
          :items-per-page="5"
          sort-by="dateOfSubmission"
          class="data-table courses"
          @click:row="handleRowClick"
      >
        <template v-slot:item.course_name="{ item }">{{
            item.name
          }}
        </template>
        <template v-slot:item.student_group="{ item }">{{
            item.user_group.name
          }}
        </template>
        <template v-slot:item.total_students="{ item }">
          <span class="normal--text semi_bold_text">{{
              item.attendedStudents
            }}</span>
        </template>
        <template v-slot:item.last_updated="{ item }">
          <span class="normal--text semi_bold_text">{{
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
              </v-btn>
            </v-col
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
import {mapGetters, mapActions} from "vuex";
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
          sortable: false,
        },
        {
          text: "Submissions",
          value: "total_submissions",
          sortable: false,
        },
        {
          text: "Maximum Marks",
          value: "total_marks",
          sortable: false,
        },
        {
          text: "Marking status",
          value: "marking_status",
          sortable: false,
          align: "center",
        },
        {text: "", value: "actions", align: "center", sortable: false},
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
        {text: "Evaluations", value: "evaluations", align: "center"},
        {text: "Success rate", value: "success_rate", align: "center"},
        {text: "", value: "actions", align: "center", sortable: false},
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
    ...mapActions("modal", ["set_modal"]),
    ...mapActions("quiz_submission", ["getQuizSubmissions"]),
    handleRowClick(value) {
      if (value.attendedStudents)
        this.$router.push(`/courses/preview/${value.name}`)
      else
        this.$router.push(`/reports/${value._id}`)
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
.instructor_reports {
  // font-family: Poppins;
  .normal--text {
    font-size: 14px;
    font-weight: 500;

    &.small {
      font-size: 12px;
      font-weight: 400;
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
        font-size: 12px;
        font-weight: 500;
      }

      .semi_bold_text {
        font-weight: 700;
      }
    }
  }
}
</style>