<template>
  <v-app id="grades-page" class="pa-0 instructor_grades">

    <div class="table-one">
      <div class="d-flex">
        <h3 class="mr-4" :class="{active : currentView === 'quiz'}" @click="currentView = 'quiz'">Quiz
          Submissions({{ quiz_submissions.length }})</h3>
        <h3 class="mr-4" :class="{active : currentView === 'assignments'}" @click="currentView = 'assignments'">
          Assignment
          Submissions ({{ assignment_submissions.length }})</h3>
        <h3 :class="{active : currentView === 'exams'}" @click="currentView = 'exams'">Exam
          Submissions ({{ exam_submissions.length }})</h3>
      </div>
      <v-data-table
          :headers="submissionHeaders"
          :items="currentView === 'quiz' ? quiz_submissions : currentView === 'assignments' ? assignment_submissions : exam_submissions"
          :items-per-page="5"
          sort-by="dateOfSubmission"
          class="data-table"
          @click:row="handleRowClick"
      >
        <template v-slot:item.course_name="{ item }">
          <span class="normal--text d-block">{{
              currentView === 'exams' ? item.course.name : item.target.course.name
            }}</span>
          <span class="normal--text small">{{
              item.target ? item.target.course.user_group.name : item.course.user_group.name
            }}</span>
        </template>
        <template v-slot:item.chapter_name="{ item }">
          <span v-if="item.target.chapter" class="normal--text">{{
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
                  :disabled="item.status ===  (item.submissionMode ? 'RELEASED' : 2)"
                  @click.stop="
                  set_modal({
                    template: 'action_confirmation',
                    method: item.submissionMode ? {
                      action: 'quiz/change_assignment_status',
                      parameters: { id: item._id, status: 'RELEASED', user_group: item.target.course.user_group._id, name: item.title },
                    } : item.target ?{
                      action: 'quiz/release_marks',
                      parameters: { id: item._id, quizName: item.name,user_group: item.target.course.user_group._id},
                    } : {
                      action: 'quiz/change_exam_status',
                      parameters: { id: item._id, status: 'RELEASED', user_group: item.course.user_group._id, name: item.name },
                    },
                    title: 'Release Marks',
                    message: `Are you sure you want to release marks for this ${item.submissionMode ? 'assignment' : item.target ? 'quiz' : 'exam'}?`,
                  })
                "
              >
                Release marks
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-slot:no-data>
          <span class="text-h6">Submission list is empty</span>
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
        <template v-slot:no-data>
          <span class="text-h6">Course list is empty</span>
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
    currentView: 'quiz',
  }),
  computed: {
    submissionHeaders() {
      const headers = [
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
      ]
      if (this.currentView === 'quiz')
        headers.unshift({
          text: "Chapter",
          value: "chapter_name",
          sortable: false,
        })

      headers.unshift({
        text: "Courses",
        align: "start",
        sortable: false,
        value: "course_name",
      },)
      return headers

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
        {text: "", value: "actions", align: "center", sortable: false},
      ];
    },
    // get the userCategory
    userCategory() {
      return this.$store.state.user.user.category.name;
    },
    ...mapGetters("courses", ["courses"]),
    ...mapGetters("quiz_submission", ["quiz_submissions", "assignment_submissions", "exam_submissions"]),
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
        this.$router.push(`/grades/${value._id}${value.submissions[0].assignment ? '/assignments' : value.submissions[0].exam ? '/exams' : ''}`)
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
.instructor_grades {
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